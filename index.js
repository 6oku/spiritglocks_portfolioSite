console.log("TEST")

const main = document.querySelector('main')
var imgs = document.querySelectorAll('.thing > img');
var open = false;

imgs.forEach(function(img){
  img.onclick = (e) =>{
    var target = e.target;
    console.log(target)
    openMe(target.src)
  }

  img.onmouseover = (e) =>{
    if(open==false){
      setTimeout(()=>{
        var src = e.target.src;
        var image = document.querySelector('.window img');
        image.src = src;
        console.log('yote')
      }, 500)
    }
  }
})

document.querySelector('.window').onclick = () =>{
  closeMe()
}

const openMe = (src) => {
  open = true;
  console.log("OPEN:", open)
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
      console.log("OPEN:", open)
      console.log("finished")
    }
  });
}
