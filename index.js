import EventEmitter from 'wolfy87-eventemitter/EventEmitter'

import { waitForDeviceInfo } from './lib/devices'

const emitter = new EventEmitter;
let localStream = null;

/** @implements {MediaAccess} */
class DoxymeMediaAccess {
  constructor() {
    this.userMediaStatus = {};
    waitForDeviceInfo().then(userMediaStatus => {
      this.userMediaStatus = userMediaStatus;
    });
  }

  requestMediaAccess() {
    if(localStream) return Promise.resolve(localStream);
      return navigator.mediaDevices.getUserMedia({
        audio: this.userMediaStatus.hasMicrophone,
        video: this.userMediaStatus.hasCamera
      }).then(stream => {
        
        return waitForDeviceInfo().then( () => {
          navigator.mediaDevices.getUserMedia({ audio: true, video: true })
          .then(function(stream) {
            let audioContext, analyser, microphone, javascriptNode;
            var contextClass = (window.AudioContext || 
              window.webkitAudioContext || 
              window.mozAudioContext || 
              window.oAudioContext || 
              window.msAudioContext);
              if (contextClass) {
                  // Web Audio API is available.
                  audioContext = new contextClass();
              } else {
                  // Web Audio API is not available. Fallback
              }
      
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
          
            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;
          
            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);
            javascriptNode.onaudioprocess = function() {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var values = 0;
                var length = array.length;
                for (var i = 0; i < length; i++) {
                  values += (array[i]);
                }
                var average = values / length;
                emitter.emit('localVolumeChange', Math.round(average));
            }
            })
            .catch(function(err) {
              console.error(err);
              /* handle the error */
          });
          localStream = stream;
          return stream;
      });
    });
  }

  on(...args) {
    return emitter.on(...args)
  }
}

/** @type MediaAccess */
export default new DoxymeMediaAccess();