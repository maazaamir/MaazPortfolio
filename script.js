document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Properly Wrap text in Spans for GSAP
    function revealToSpan() {
        document.querySelectorAll(".reveal").forEach(function (elem) {
            let tempContent = elem.innerHTML;
            elem.innerHTML = ""; // Clear existing to prevent duplicates
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

    // Initial state: ensure children are hidden
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
    .to("#loader", { opacity: 0, duration: 0.2 }) // Hide loader content
    .to("#fs, #white, #elem", {
        height: "0%",
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.inOut",
        onComplete: () => {
            initScroll(); // Only start scroll after loader is gone
            document.getElementById("loader").style.display = "none";
        }
    })
    .to("#green", { height: "100%", duration: 0.6, top: 0, ease: "circ.inOut" }, "-=1")
    .to("#green", { height: "0%", duration: 0.6, ease: "circ.inOut" });

    // 3. Initialize Locomotive Scroll
    function initScroll() {
        const scroller = document.querySelector("[data-scroll-container]");
        const scroll = new LocomotiveScroll({
            el: scroller,
            smooth: true
        });

        // Sync GSAP ScrollTrigger with Locomotive
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

        ScrollTrigger.refresh();
    }

    // 4. Update Time
    function updateTime() {
        const timeElement = document.getElementById('localTime');
        if (timeElement) {
            const now = new Date();
            timeElement.innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + " — AVAILABLE";
        }
    }
    updateTime();
    setInterval(updateTime, 60000);

    // 5. Image Hover Parallax (Simple)
    document.querySelectorAll(".imgcontainer").forEach((img, i) => {
        gsap.to(img, {
            y: (i + 1) * -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
});