// var m = gsap.from('')

console.log("TEST")

const main = document.querySelector('main')
var imgs = document.querySelectorAll('.thing > img');

var current = {
  x: 0,
  y:0,
  w:0,
  h:0,
}

var open = false;

imgs.forEach(function(img){
  img.onclick = (e) =>{
    var target = e.target;
    var w = target.getBoundingClientRect().width;
    var h = target.getBoundingClientRect().height;
    var x = target.getBoundingClientRect().left;
    var y = target.getBoundingClientRect().top;
    // console.log(w, h, x, y)

    console.log(target)
    

    current.x = x;
    current.y = y;
    current.w = w;
    current.h = h;

    console.log(current)

    openMe(current.x,current.y,current.w,current.h,target.src)
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
  // if(open == true){
    closeMe(current.x,current.y,current.w,current.h)
  // }
}

const openMe = (x,y,w,h,src) => {
  open=true;
  console.log("OPEN:", open)
  main.classList.add('focus')
  var image = document.querySelector('.window img');
  image.src = src;

  var t = gsap.fromTo(".window", 
    {
      duration: 0.5, 
      x: x+'px',
      y: y+'px', 
      width: w+'px',
      height: h+'px',
      ease: "power3", 
      paused: true,
      padding: '0px',
      opacity: 1,
    },
    {
      duration: 0.5, 
      x: 0,
      y: 0, 
      width: '100%',
      height: '100%',
      ease: "power3",
      padding: '20px',
      opacity: 1,
      pointerEvents: "auto",
    },
  );


  t.play();
}

const closeMe = (x,y,w,h) =>{
  main.classList.remove('focus')
  var s = gsap.fromTo(".window", 
  {
    duration: 0.5, 
    x: 0,
    y: 0, 
    width: '100%',
    height: '100%',
    ease: "power3", 
    padding: '20px',
    paused: true,
  },
  {
    duration: 0.5, 
    x: x+'px',
    y: y+'px', 
    width: w+'px',
    height: h+'px',
    ease: "power3", 
    padding: '0px',
    paused: true,
    onComplete: finished,
  }
  );

  s.play();
}

const finished = () =>{
  var o = gsap.to('.window',
  {
    opacity: 0,
    duration: 0.3,
    // delay: 0.3,
    pointerEvents: "none",
    paused: true,
  })
  o.play();

  setTimeout(()=>{
    open=false;
    console.log("OPEN:", open)
    console.log("finished")
  }, 500)
}


