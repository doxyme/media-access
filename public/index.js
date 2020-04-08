// import DoxyMe from '../mock'
import DoxyMe from '../'

console.log(DoxyMe);

let videoEl = document.querySelector('video');
let button = document.querySelector('.startVideo')

button.addEventListener('click', () => {
  DoxyMe.requestMediaAccess().then(stream => {
    console.log(stream);
    videoEl.srcObject = stream
  }).catch(err => {
    console.error(err);
  });
})

DoxyMe.on('localVolumeChange', volume => {
  console.log(volume);
});
