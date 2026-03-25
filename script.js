document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Properly Wrap text in Spans for GSAP
    function revealToSpan() {
        document.querySelectorAll(".reveal").forEach(function (elem) {
            let tempContent = elem.innerHTML;
            elem.innerHTML = ""; 
            let parent = document.createElement("span");
            let child = document.createElement("span");
            parent.classList.add("parent");
            child.classList.add("child");
            child.innerHTML = tempContent;
            parent.appendChild(child);
            elem.appendChild(parent);
        });
    }

    revealToSpan();

    // 2. Timeline for Loader
    let tl = gsap.timeline();

    gsap.set(".parent .child", { y: "100%" });

    tl.to(".parent .child", {
        y: "0%",
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    })
    .to("#fs", { height: "100vh", duration: 0.8, ease: "expo.inOut", delay: 0.5 })
    .to("#white", { height: "100vh", duration: 0.8, ease: "expo.inOut" }, "-=0.6")
    .to("#elem", { height: "100vh", duration: 0.8, ease: "expo.inOut" }, "-=0.6")
    .to("#loader", { opacity: 0, duration: 0.2 }) 
    .to("#fs, #white, #elem", {
        height: "0%",
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.inOut",
        onComplete: () => {
            initScroll(); // Initialize scroll
            document.getElementById("loader").style.display = "none";
        }
    })
    .to("#green", { height: "100%", duration: 0.6, top: 0, ease: "circ.inOut" }, "-=1")
    .to("#green", { height: "0%", duration: 0.6, ease: "circ.inOut" });

    // 3. Initialize Locomotive Scroll & Sync GSAP
    function initScroll() {
        const scroller = document.querySelector("[data-scroll-container]");
        
        const scroll = new LocomotiveScroll({
            el: scroller,
            smooth: true,
            multiplier: 1, // Adjust scroll speed here
            lerp: 0.05 // Adjust smoothness (0.1 is default)
        });

        // Sync ScrollTrigger with Locomotive
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

        // VERY IMPORTANT: Tell ScrollTrigger to watch the Locomotive scroller
        ScrollTrigger.addEventListener("refresh", () => scroll.update());
        ScrollTrigger.refresh();
    }

    // 4. Update Time (Using the 24-hour format or 12-hour)
    function updateTime() {
        const timeElement = document.getElementById('localTime');
        if (timeElement) {
            const now = new Date();
            timeElement.innerText = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            }) + " INDIA — AVAILABLE";
        }
    }
    updateTime();
    setInterval(updateTime, 60000);

    // 5. Image Hover Parallax 
    // Optimization: Only animate if the element exists to avoid console errors
    const imgContainers = document.querySelectorAll(".imgcontainer");
    if(imgContainers.length > 0) {
        imgContainers.forEach((img, i) => {
            gsap.to(img, {
                y: (i + 1) * -15,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }
});