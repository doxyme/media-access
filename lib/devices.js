export function getMediaDevices() {
  if (navigator.mediaDevices) {
    return navigator.mediaDevices.enumerateDevices()
  }

  return Promise.resolve([])
}

export function waitForDeviceInfo() {
  return getMediaDevices().then(rawData => {
    const devices = (rawData || []).map(device => {
      return {
        deviceId: device.deviceId,
        kind: String(device.kind)
          .replace(/input$/, 'Input')
          .replace(/output$/, 'Output'),
        label: device.label,
      };
    });

    const cameras = devices.filter(item => item.kind === 'videoInput');
    const microphones = devices.filter(item => item.kind === 'audioInput');
    const speakers = devices.filter(item => item.kind === 'audioOutput');

    const hasCamera = cameras.length > 0;
    const hasMicrophone = microphones.length > 0;

    return {
      cameras,
      microphones,
      speakers,
      hasCamera,
      hasMicrophone,
      noDevices: !hasCamera && !hasMicrophone,
      hasMediaAccess: (hasCamera || hasMicrophone) && devices.some(d => !!d.label),
    };
  });
}