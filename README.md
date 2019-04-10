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

window.DOXYME.enableWebcam();

window.DOXYME.on('localStream', stream => {
  console.log(stream);
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