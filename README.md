## Installation

```bash
yarn add git://github.com/doxyme/media-access
```

## Usage

```js
import DoxyMe from '@doxyme/media-access'

try {
  const stream = await DoxyMe.requestMediaAccess()
  // User allowed browser to access camera/microphone
  console.log(stream)
      
  // Attach stream to video element
  const video = document.querySelector('#dokbot-video')
  video.srcObject = stream
} catch (err) {
  // There was an error, or the user rejected access, etc.
  console.error(err)
}

DoxyMe.on('localVolumeChange', volume => {
  console.log(volume)
})

```

```js
// Alternatively, import the mocked version

import DoxyMe from '@doxyme/media-access/mock'

// Usage is the same
// ...
```
