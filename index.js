const main = document.querySelector('main')
var imgs = document.querySelectorAll('.thing > img');
var open = false;
var currentIndex = -1;

var typeSection = document.getElementById('type');
var workImgs = Array.from(imgs).filter(function(img) {
  return !typeSection || (img.compareDocumentPosition(typeSection) & Node.DOCUMENT_POSITION_FOLLOWING);
});

imgs.forEach(function(img){
  img.onclick = (e) =>{
    var target = e.target;
    var idx = workImgs.indexOf(target);
    if (idx !== -1) currentIndex = idx;
    openMe(target.src)
  }

  img.onmouseover = (e) =>{
    if(open==false){
      setTimeout(()=>{
        var src = e.target.src;
        var image = document.querySelector('.window img');
        image.src = src;
      }, 500)
    }
  }
})

document.addEventListener('keydown', function(e) {
  if (!open || currentIndex === -1) return;
  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % workImgs.length;
    document.querySelector('.window img').src = workImgs[currentIndex].src;
  } else if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + workImgs.length) % workImgs.length;
    document.querySelector('.window img').src = workImgs[currentIndex].src;
  } else if (e.key === 'Escape') {
    closeMe();
  }
});

document.querySelector('.window').onclick = () =>{
  closeMe()
}

const openMe = (src) => {
  open = true;
  main.classList.add('focus')
  var image = document.querySelector('.window img');
  image.src = src;

  gsap.fromTo(".window",
    {
      opacity: 0,
      pointerEvents: "none",
    },
    {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
      pointerEvents: "auto",
      onStart: function() {
        var win = document.querySelector('.window');
        win.style.top = '0px';
        win.style.left = '0px';
        win.style.width = '100%';
        win.style.height = '100%';
        win.style.padding = '20px';
        win.classList.add('active');
      }
    }
  );
}

const closeMe = () =>{
  main.classList.remove('focus')

  gsap.to(".window", {
    opacity: 0,
    duration: 0.25,
    ease: "power2.in",
    pointerEvents: "none",
    onComplete: function() {
      var win = document.querySelector('.window');
      win.classList.remove('active');
      open = false;
    }
  });
}
