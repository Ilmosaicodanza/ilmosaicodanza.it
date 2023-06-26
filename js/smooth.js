const L0 = document.querySelectorAll('a[href^="#"]:not([href^="#fig"]):not([href^="#_"])');
L0.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const T = document.querySelector(link.getAttribute('href'));
    if (!T) return;
    const targetPos = T.offsetTop;
    window.scrollTo({
      top: targetPos,
      behavior: 'smooth'
    });
  });
});