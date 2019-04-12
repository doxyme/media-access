import EventEmitter from 'wolfy87-eventemitter/EventEmitter'
import hark from 'hark';

import { getSystemInfo } from './lib/system-info'
import { waitForDeviceInfo } from './lib/devices'

const emitter = new EventEmitter;

/** @implements {GlobalSystemInfoObject} */
class DoxymeSystemInfo {
  constructor() {
    this.userMediaStatus = {};
    this.systemInfo = getSystemInfo();

    waitForDeviceInfo().then(userMediaStatus => {
      this.userMediaStatus = userMediaStatus;
    });

    emitter.on('localStream', stream => {
      const speech = hark(stream, {
        interval: 500
      });
      speech.on('volume_change', volume => {
        emitter.emit('localVolumeChange', volume);
      });
    })
  }

  requestMediaAccess() {
    return waitForDeviceInfo().then(deviceInfo => {
      return navigator.mediaDevices.getUserMedia({
        audio: deviceInfo.hasMicrophone,
        video: deviceInfo.hasCamera
      }).then(stream => {
        emitter.emit('localStream', stream);
        waitForDeviceInfo().then(userMediaStatus => {
          this.userMediaStatus = userMediaStatus;
        });
      });
    });
  }

  on(...args) {
    return emitter.on(...args)
  }
}

/** @type GlobalSystemInfoObject */
export default new DoxymeSystemInfo();