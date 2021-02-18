const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".video-container video");

    // sounds
    var sounds = document.querySelectorAll(".sound-picker button");
    // display time
    const displayTime = document.querySelector(".display-time");
    var timeSelector = document.querySelectorAll(".time-select button")
    // get the lenght of the outline 
    const outlineLength = outline.getTotalLength();
    
    // fake Duration
    let fakeDuration = 600;
    
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    //pick different sound
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });
    
    //select sound
    timeSelector.forEach(option  => {
        option.addEventListener('click', function () {
            fakeDuration= this.getAttribute('data-time');
        displayTime.textContent=`${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`;

        });
    });

    // create specific func to play and stop the sounds
    const checkPlaying = song => {
      if (song.paused) {
          song.play();
          video.play();
          play.src="./svg/pause.svg";
      }else{
          song.pause();
          video.pause();
          play.src= "./svg/play.svg";
      }
    };

    // play sound 
    play.addEventListener('click' , () => {
        checkPlaying(song);
    });

    //animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed =fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //animate the text
        displayTime.textContent=`${minutes}: ${seconds}`;

        //animated
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset= progress;
        
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src= "./svg/play.svg";
            video.pause();
        }
    };

};
app();
