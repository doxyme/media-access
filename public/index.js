// import DoxyMe from '../mock'
import DoxyMe from '../'

console.log(DoxyMe);

DoxyMe.requestMediaAccess().then(stream => {
  console.log(stream)
}).catch(err => {
  console.error(err)
});

DoxyMe.on('localVolumeChange', volume => {
  console.log(volume)
});
