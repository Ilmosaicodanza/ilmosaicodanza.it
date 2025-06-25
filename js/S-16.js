// particle originali con spread on click

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
      color: "#ffff00",
      distance: 180,
      enable: false,
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
      value: 48
    },
    opacity: {
      animation: { enable: true },
      random: true,
      value: 0.5
    },
    shape: {
      type: "triangle"
    },
    size: {
      anim: { enable: true },
      random: true,
      value: 8
    }
  }
})
})//end getscript
