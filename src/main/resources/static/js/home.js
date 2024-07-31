var homeAudio = document.getElementById('HomeAudio');
       var morningAudio = document.getElementById('WhenTheMorningComes');
	   var FanTasicAudio = document.getElementById('FantasticThinking');
	   

       var audioTracks = [homeAudio, morningAudio, FanTasicAudio];

       var playButton = document.getElementById('playButton');

       var currentAudio = null;

       function playRandomTrack() {
           currentAudio = audioTracks[Math.floor(Math.random() * audioTracks.length)];
           currentAudio.play();
           playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

           currentAudio.onended = function() {
               playRandomTrack();
           };
       }

       function toggleAudio() {
           if (currentAudio === null) {
               playRandomTrack();
           } else if (currentAudio.paused) {
               currentAudio.play();
               playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
           } else {
               currentAudio.pause();
               playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
           }
       }