## Installation

```bash
yarn add git://github.com/doxyme/sample-system-info
```

## Usage

```js
// Initialise

import doxymeSystemInfo from 'doxyme-system-info';
window.DOXYME = doxymeSystemInfo;

// Use

window.DOXYME.requestMediaAccess()
  .then(stream => {
    // User allowed browser to access camera/microphone
    console.log(stream);
      
    // Attach stream to video element
    const video = document.querySelector('#dokbot-video');
    video.srcObject = stream;
  })
  .catch(err => {
    // There was an error
    console.error(err);
  });

window.DOXYME.on('localVolumeChange', volume => {
  console.log(volume);
});

```

```js
// Alternatively, import mocked version

import doxymeSystemInfo from 'doxyme-system-info/mock';
window.DOXYME = doxymeSystemInfo;

// Usage is the same
// ...
```