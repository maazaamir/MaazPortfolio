document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Text Animation Wrappers
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

    // 2. Main Loader Timeline
    let tl = gsap.timeline();
    gsap.set(".parent .child", { y: "100%" });

    tl.to(".parent .child", {
        y: "0%", duration: 1, stagger: 0.2, ease: "power3.out"
    })
    .to("#fs", { height: "100vh", duration: 0.8, ease: "expo.inOut", delay: 0.5 })
    .to("#white", { height: "100vh", duration: 0.8, ease: "expo.inOut" }, "-=0.6")
    .to("#elem", { height: "100vh", duration: 0.8, ease: "expo.inOut" }, "-=0.6")
    .to("#loader", { opacity: 0, duration: 0.2, onComplete: () => {
        document.getElementById("loader").style.display = "none";
        initScroll(); 
    }}) 
    .to("#fs, #white, #elem", {
        height: "0%", duration: 0.8, stagger: 0.1, ease: "expo.inOut"
    });

    // 3. Locomotive Scroll Init with Height Fix
    let scroll;
    function initScroll() {
        const scroller = document.querySelector("[data-scroll-container]");
        
        scroll = new LocomotiveScroll({
            el: scroller,
            smooth: true, 
            multiplier: 1, 
            lerp: 0.05
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

        // REFRESH FIX: This watches for any height changes (like your new About section)
        const resizeObserver = new ResizeObserver(() => scroll.update());
        resizeObserver.observe(scroller);

        ScrollTrigger.addEventListener("refresh", () => scroll.update());
        ScrollTrigger.refresh();
    }

    // 4. Project Filter Logic
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filterValue = btn.getAttribute("data-filter");

            gsap.to(projectCards, {
                opacity: 0, scale: 0.9, duration: 0.3,
                onComplete: () => {
                    projectCards.forEach(card => {
                        const category = card.getAttribute("data-category");
                        if (filterValue === "all" || category === filterValue) {
                            card.style.display = "block";
                            gsap.to(card, { opacity: 1, scale: 1, duration: 0.4 });
                        } else {
                            card.style.display = "none";
                        }
                    });
                    // Tell Locomotive to recalculate after filtering
                    if(scroll) scroll.update();
                }
            });
        });
    });

    // 5. Dark/Light Mode Toggle Logic
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme + '-mode');
        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.replace('dark-mode', 'light-mode') || document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            gsap.to("body", { backgroundColor: "#f5f5f7", color: "#1d1d1f", duration: 0.5 });
        } else {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
            gsap.to("body", { backgroundColor: "#000", color: "#fff", duration: 0.5 });
        }
        if(scroll) scroll.update(); // Update scroll on theme change
    }
    if(toggleSwitch) toggleSwitch.addEventListener('change', switchTheme, false);

    // 6. Custom Cursor
    const cursor = document.querySelector("#cursor");
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.4 });
    });

    // 7. Milestone Toast Logic (10k Pulse)
    setTimeout(() => {
        const toast = document.querySelector("#milestone-toast");
        if (toast) {
            gsap.to(toast, { 
                bottom: "30px", 
                opacity: 1, 
                duration: 1, 
                ease: "expo.out" 
            });

            // Auto-hide after 6 seconds
            setTimeout(() => {
                gsap.to(toast, { bottom: "-100px", opacity: 0, duration: 1.5 });
            }, 6000);
        }
    }, 4000);

    // Close button logic
    const closeToast = document.querySelector(".close-toast");
    if(closeToast) {
        closeToast.addEventListener("click", () => {
            gsap.to("#milestone-toast", { bottom: "-100px", opacity: 0, duration: 0.5 });
        });
    }
});