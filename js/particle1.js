
getScript('/js/tsparticles.min.js', function()
{
tsParticles.load("tsparticles", {
  "autoPlay": true,
  fpsLimit: 120,
  "interactivity": {
    "events": {
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "onHover": {
        "enable": true,
        "mode": "connect",
        "parallax": {
          "force": 60
        }
      },
    },
  },
  particles: {
    color: { 
      value: "#EBEF9B"
      //value: "random"
    },
    //"links": {
    //  "color": {
    //    "value": "#ffffff"
    //  },
    //  "distance": 150,
    //  "opacity": 0.4
    //},
    lineLinked: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1.0
    },
    move: {
      bounce: false,
      direction: "none",
      enable: true,
      outMode: "out",
      random: false,
      speed: 2,
      straight: false
    },
    number: { 
      density: { enable: false },
      value: 32
    },
    opacity: {
      animation: { enable: false },
      random: false,
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      anim: { enable: true },
      random: true,
      value: 5
    }
  }
})
})//end getscript
