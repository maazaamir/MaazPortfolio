document.addEventListener("DOMContentLoaded", () => {
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

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const timeElement = document.getElementById('localTime');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('open');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function updateTime() {
        const now = new Date();
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = now.toLocaleTimeString('en-US', options);
        const currentHour = now.getHours();
        const isAvailable = currentHour >= 10 && currentHour < 19;
        
        if (timeElement) {
            timeElement.innerHTML = `${timeString} — ${isAvailable ? '<span class="textcolor">Available Now</span>' : 'Away'}`;
        }
    }
    updateTime();
    setInterval(updateTime, 60000);

    document.body.style.overflow = "hidden";
    let tl = gsap.timeline();

    tl.to("#fs", { height: "100vh", duration: 1.5, ease: "expo.inOut" })
      .to("#white", { height: "100vh", duration: 1.5, ease: "expo.inOut" }, "-=1")
      .to("#elem", { height: "100vh", duration: 1.5, ease: "expo.inOut" }, "-=1")
      .to("#fs", { height: 0, duration: 1, ease: "expo.inOut" })
      .to("#white", { height: 0, duration: 1, ease: "expo.inOut" }, "-=0.8")
      .to("#elem", { height: 0, duration: 1, ease: "expo.inOut" }, "-=0.8")
      .to(".parent .child", { y: "-100%", duration: 0.1 })
      .to(".parent .child", { y: "0%", duration: 1.4, stagger: 0.1, ease: "circ.inOut" })
      .to(".parent .child", { y: "100%", duration: 1.4, delay: 1, ease: "circ.inOut", stagger: 0.2 })
      .to("#loader", { height: 0, duration: 1, ease: "circ.inOut" })
      .to("#green", { height: "100%", duration: 1, marginTop: "-100%", ease: "circ.inOut" }, "-=1")
      .to("#green", { height: "0%", duration: 1, delay: 0.2, ease: "circ.inOut", onComplete: () => {
            document.body.style.overflow = "auto";
            
            const scroller = document.querySelector("[data-scroll-container]");
            const scroll = new LocomotiveScroll({
                el: scroller,
                smooth: true
            });

            gsap.registerPlugin(ScrollTrigger);
            scroll.on("scroll", ScrollTrigger.update);

            ScrollTrigger.scrollerProxy(scroller, {
                scrollTop(value) {
                    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                },
                pinType: scroller.style.transform ? "transform" : "fixed"
            });

            gsap.from("#images .cnt", {
                scrollTrigger: {
                    trigger: "#images",
                    scroller: scroller,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.2
            });

            ScrollTrigger.addEventListener("refresh", () => scroll.update());
            ScrollTrigger.refresh();
        }
    });

    gsap.to("#imgright .imgcontainer:nth-child(1)", { y: -20, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" });
    gsap.to("#imgright .imgcontainer:nth-child(2)", { y: -30, duration: 2.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
    gsap.to("#imgright .imgcontainer:nth-child(3)", { y: -25, duration: 3, repeat: -1, yoyo: true, ease: "power1.inOut" });
});