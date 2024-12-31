function locomotiveScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loadingAnime(){
    let tl = gsap.timeline();
tl.from("#line h1",{
    y:150,
    stagger:0.1,
    duration:0.6,
    delay:0.5
})
tl.from("#line1-part1",{
    opacity:0,
    onStart:function(){
        let h5 = document.querySelector("#line1-part1 h5");
let counter = 0;
let clear = setInterval(function(){
    if(counter<100){
        counter++;
        h5.textContent=counter
        console.log(counter)
    }
    else{
        clearInterval(clear)
    }

},27)
    }
})

tl.to("#line h2",{
    animationName:"anime",
    opacity:1
})
tl.from("#btmline h5",{
    opacity:0,
    delay:-0.4
})

tl.to("#loader",{
    opacity:0,
    duration:0.3,
    delay:2.4
})

tl.from("#page1",{
    delay:-0.5,
    y:1080,
    opacity:0,
    duration:1.9,
    ease: "circ.in"
})
tl.to("#loader",{
    display:"none"
})
tl.from("#hero h1",{
    y:120,
    stagger:0.2,
    delay:-0.6,
    duration:0.4
})
tl.from("#nav",{
    opacity:0,
    
},"-=2")
}


function cursorAnime(){
    Shery.mouseFollower("#crsr",{
        //Parameters are optional.
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
    
    
    Shery.makeMagnet("#nav-part3 h4,#nav-part1 svg" /* Element to target.*/, {
        //Parameters are optional.
        // ease: "cubic-bezier(0.25, 1.5, 0.325    , 1.5)",
        // duration: 1,
      });
      let videoContainer = document.querySelector("#video-container")
      let video = document.querySelector("#video-container video");
   videoContainer.addEventListener("mouseenter",function(){
        videoContainer.addEventListener("mousemove",function(dets){
            gsap.to("#video-crsr",{
                left:dets.x - 100,
                top:dets.y - 280
            })
        })
    })
//    videoContainer.addEventListener("mousemove",function(){
//     gsap.to(".mousefollower",{
//         display:"initial"
//     })
//     gsap.to("#video-crsr",{
//         left:"70%",
//         top:"-15%"
//     })
//    })
   let flag = 0
   videoContainer.addEventListener("click",function(){
    if(flag === 0){
        video.play();
        video.style.opacity=1
        document.querySelector("#video-crsr").innerHTML=` <i class="ri-pause-large-fill"></i>`
        gsap.to("#video-crsr",{
            scale:0.6
        })
        flag = 1
    }
    else{
        video.pause();
        video.style.opacity=0
        document.querySelector("#video-crsr").innerHTML=` <i class="ri-play-large-fill"></i>`
        gsap.to("#video-crsr",{
            scale:1
        })
        flag = 0
    }
   })
}
cursorAnime();
loadingAnime();
locomotiveScroll();

function sheryAnimation(){
    Shery.imageEffect("#image-div1,#image-div2,#image-div5,#image-div6,#image-div7,#image-div9",{
        style:5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4.21,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.24,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.53,"range":[0,10]},"metaball":{"value":0.41,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":11.45,"range":[0,100]}},
        gooey:true
    })
}
sheryAnimation()

document.addEventListener("mousemove",function(dets){
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y
    })
})
document.querySelector(".hero3 h1").addEventListener("mouseenter",function(){
    gsap.to("#flag",{
        opacity:1
    })
})
document.querySelector(".hero3 h1").addEventListener("mouseleave",function(){
    gsap.to("#flag",{
        opacity:0
    })
})

function page3Anime(){
    let tl2 = gsap.timeline({
        scrollTrigger:{
            trigger:"#page3",
            scroller:"#main",
            start:"top 50%",
            end:"top -10%",
            scrub:2
        }
    })
    
    tl2.from("#page3 #page3-content h1",{
        opacity:0,
        y:30,
        duration:0.8
    })
    tl2.from("#page3 #underline",{
        opacity:0,
        x:320
    })
    
    tl2.from("#page3 #imgp-div h1 ",{
        opacity:0,
        y:30
    })
    tl2.from("#page3-content #imgp-div #underline",{
        opacity:0
    })
}
page3Anime();

function page4Anime(){
    let tl3 = gsap.timeline({
        scrollTrigger:{
            trigger:"#page4",
            scroller:"#main",
            start:"top 50%",
            end:"top 0%",
            scrub:2
        }
    })
    tl3.from("#page4 #page4-content h1",{
        opacity:0,
        y:30,
        duration:0.8
    })
    tl3.from("#page4 #underline",{
        opacity:0,
        x:320
    })
    tl3.from("#page4 #page4-content h3",{
        opacity:0,
        y:30,
        duration:0.8,
        stagger:0.5
    })
    
}
page4Anime();

let open = document.querySelector("#open svg")
let close = document.querySelector("#close svg")
let tml = gsap.timeline(); 
tml.to("#menu",{
    top:0,
    duration:0.5
})

tml.from("#menu h1",{
    y:100,
    duration:0.4,
    stagger:0.2
})
tml.pause();

open.addEventListener("click",function(){
    
    tml.play();
    // alert("click huaa")
})
close.addEventListener("click",function(){
    
    tml.reverse();

    // alert("click huaa")
})


