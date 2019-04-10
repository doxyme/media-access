var EventEmitter = require('wolfy87-eventemitter/EventEmitter');

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const emitter = new EventEmitter;

/** @implements GlobalSystemInfoObject */
function SystemInfo() {
  var self = this;

  emitter.on('localStream', function() {
    setInterval(function() {
      emitter.emit('localVolumeChange', Math.floor(Math.random() * -100));
    }, 500);
  });

  this.systemInfo = {
    platform: 'desktop',
    os: 'linux',
    browser: 'chrome',
    browserVersion: 73,
    isSupportedBrowser: true,
    isUpToDateBrowser: true
  };

  this.userMediaStatus = {};

  setTimeout(function () {
    self.userMediaStatus = {
      cameras: [
        { deviceId: uuid(), kind: 'videoInput', label: 'Fake camera 1' },
        { deviceId: uuid(), kind: 'videoInput', label: 'Fake camera 2' }
      ],
      microphones: [
        { deviceId: uuid(), kind: 'audioInput', label: 'Fake microphone 1' },
        { deviceId: uuid(), kind: 'audioInput', label: 'Fake microphone 2' }
      ],
      speakers: [
        { deviceId: uuid(), kind: 'audioInput', label: 'Fake speakers 1' },
        { deviceId: uuid(), kind: 'audioInput', label: 'Fake speakers 2' }
      ],
      hasCamera: true,
      hasMicrophone: true,
      hasMediaAccess: false,
    }
  }, 2000);

  this.enableWebcam = function enableWebcam() {
    return new Promise(function(resolve, reject) {
      if(confirm("Allow browser to access your microphone and camera?")) {
        self.userMediaStatus.hasMediaAccess = true;
        emitter.emit('localStream', new MediaStream());
        resolve();
      } else {
        var error = new Error("End user denied permission");
        error.name = "NotAllowedError";
        reject(error);
      }
    })
  };

  this.on = function() {
    return emitter.on.apply(emitter, Array.from(arguments));
  }
}

module.exports = function() {
  return new SystemInfo();
};
