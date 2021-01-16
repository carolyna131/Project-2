(function () {
    const bideo = new Bideo();
    bideo.init({
      videoEl: document.querySelector("#background_video"),
      container: document.querySelector("body"),
      resize: true,
      autoplay: true, // true is default
      isMobile: window.matchMedia("(max-width: 768px)").matches,
      playButton: document.querySelector("#play"),
      pauseButton: document.querySelector("#pause"),
      src: [
        // {
        //   src: "https://assets.mixkit.co/videos/preview/mixkit-texture-of-a-short-flight-over-the-clouds-31582-large.mp4",
        //   type: "video/mp4",
        // },
        {
          src: "https://assets.mixkit.co/videos/preview/mixkit-pink-sunset-seen-from-a-plane-window-4204-large.mp4",
          type: "video/mp4",
        }
        
      ],
      // On video loaded
      onLoad: function () {
        document.querySelector("#video_cover").style.display = "none";
      },
    });
  }());