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

  enableWebcam() {
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).then(stream => {
      emitter.emit('localStream', stream);
    });
  }

  on(...args) {
    return emitter.on(...args)
  }
}

export default function() {
  return new DoxymeSystemInfo();
}