// particle quadrate bianche

getScript('/js/tsparticles.min.js', function()
{
tsParticles.load("tsparticles", {
  "autoPlay": true,
  "pauseOnOutsideViewport": true,
  "fpsLimit": 120,
  "prefer-riduced-motion": true,
  motion: {
    reduce: true,

  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onHover": {
        "enable": true,
        "mode": "grab",
        //"mode": "connect",
      },
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true,
    },
  },
  particles: {
    color: { 
      value: ["#ffffff","#fd5949","#ff6300","#ffb700","#ff725c"],
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
      //color: "#ffffff",
      //color: ["#fd5949","#ff6300","#ffb700","#ff725c"],
      color: ["#d62828","#f77f00","#fcbf49","#eae2b7"],
      distance: 190,
      enable: true,
      opacity: 0.2,
      width: 1.0
    },
    move: {
      enable: true,
      speed: 2,
      bounce: false,
      direction: "none",
      outMode: "out",
      random: false,
      straight: false,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
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
      type: "square"
    },
    size: {
      anim: { enable: true },
      random: true,
      value: 6
    }
  }
})
})//end getscript
