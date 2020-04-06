import EventEmitter from 'wolfy87-eventemitter/EventEmitter'
import hark from 'hark';

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
      return waitForDeviceInfo().then(() => {
        return navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        }).then(stream => {
          return waitForDeviceInfo().then(userMediaStatus => {
            this.userMediaStatus = userMediaStatus;

            const speech = hark(stream, {
              interval: 500
            });
            speech.on('volume_change', volume => {
              emitter.emit('localVolumeChange', volume);
            });
            localStream = stream;
            return stream;
          });
        });
    });
  }
  
  on(...args) {
    return emitter.on(...args)
  }
}

/** @type MediaAccess */
export default new DoxymeMediaAccess();