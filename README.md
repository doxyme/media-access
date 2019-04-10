## Installation

```bash
yarn add git://github.com/doxyme/sample-system-info
```

## Usage

```js
// Initialise

import systemInfo from 'doxyme-system-info';
window.DOXYME = systemInfo();

// Use

window.DOXYME.enableWebcam()
  .then(() => {
    // User allowed browser to access camera/microphone
  })
  .catch(err => {
    // There was error
    console.log(err);
  });

window.DOXYME.on('localStream', stream => {
  console.log(stream);
  
  // Attach stream to video element
  const video = document.querySelector('#dokbot-video');
  video.srcObject = stream;
});

window.DOXYME.on('localVolumeChange', volume => {
  console.log(volume);
});

```

```js
// Alternatively, import mocked version

import systemInfo from 'doxyme-system-info/mock';
window.DOXYME = systemInfo();

// Usage is the same
// ...
```