
function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    let parent = document.createElement("span");
    let child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

revealToSpan();

let tl = gsap.timeline();

tl.to("#fs", {
  height: "100vh",
  duration: 1.5,
  ease: "expo.inOut"
})
.to("#white", {
  height: "100vh",
  duration: 1.5,
  ease: "expo.inOut"
}, "-=1")
.to("#elem", {
  height: "100vh",
  duration: 1.5,
  ease: "expo.inOut"
}, "-=1")
.to("#fs", {
  height: 0,
  duration: 1,
  ease: "expo.inOut"
})
.to("#white", {
  height: 0,
  duration: 1,
  ease: "expo.inOut"
}, "-=0.8")
.to("#elem", {
  height: 0,
  duration: 1,
  ease: "expo.inOut"
}, "-=0.8")
.to("#loader", {
  opacity: 1,
  duration: 0.5
})
.to(".parent .child", {
  x: "-30",
  duration: 1.4,
  ease: "circ.inOut"
})
.to(".parent .child", {
  y: "100%",
  duration: 1.4,
  delay: 1,
  ease: "circ.inOut",
  stagger: 0.2
})
.to("#loader", {
  height: 0,
  duration: 1,
  ease: "circ.inOut"
})
.to("#green", {
  height: "100%",
  duration: 1,
  delay: -0.3,
  ease: "circ.inOut"
})
.to("#green", {
  height: "0%",
  duration: 1,
  ease: "circ.inOut"
});

window.addEventListener("load", function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
});

gsap.to("#imgright .imgcontainer:nth-child(1)", {
  y: -20,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

gsap.to("#imgright .imgcontainer:nth-child(2)", {
  y: -30,
  duration: 2.5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

gsap.to("#imgright .imgcontainer:nth-child(3)", {
  y: -25,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
