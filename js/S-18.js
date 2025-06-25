// particle stelle gialle size 80 no interact

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

  "particles": {
    "number": {
      "value": 6,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      //"value": "#1b1e34"
      //"value": ["#ffffff","#fd5949","#ff6300","#ffb700"],
      "value": "#333"
    },
    "shape": {
      "type": "star",
      "stroke": {
        "width": 2,
        //"color": ["#ff6300","#ffffff","#fd5949","#ffb700"],
        //"color": "#ff6300",
        "color": "#ffb700",

      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "/img/logo-il-mosaico-danza-asd.svg",
        "width": 300,
        "height": 300
      }
    },
    "opacity": {
      "value": 0.8,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 60,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 10,
        "size_min": 20,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 1,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 8,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 0,
        "rotateY": 0
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true

})
})//end getscript
