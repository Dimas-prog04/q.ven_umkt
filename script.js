document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                
                // Show nav links as mobile menu
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(15, 44, 122, 0.98)';
                navLinks.style.padding = '20px 24px';
                navLinks.style.gap = '16px';
                navLinks.style.backdropFilter = 'blur(12px)';
                navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                navLinks.style.zIndex = '999';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.right = '';
                navLinks.style.background = '';
                navLinks.style.padding = '';
                navLinks.style.gap = '';
                navLinks.style.backdropFilter = '';
                navLinks.style.boxShadow = '';
                navLinks.style.zIndex = '';
            }
        });
    }
    
    // ========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    mobileToggle.click();
                }
            }
        });
    });
    
    // ========================================
    // DOTS SLIDER INTERACTION (Visual Only)
    // ========================================
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });
    
    // ========================================
    // ORBIT AUTO-ROTATION (Subtle)
    // ========================================
    const orbitContainer = document.querySelector('.orbit-container');
    if (orbitContainer) {
        let rotation = 0;
        let isHovering = false;
        let animationId = null;
        
        orbitContainer.addEventListener('mouseenter', () => { isHovering = true; });
        orbitContainer.addEventListener('mouseleave', () => { isHovering = false; });
        
        function rotateOrbit() {
            if (!isHovering) {
                rotation += 0.08;
                orbitContainer.style.transform = `rotate(${rotation}deg)`;
                
                // Counter-rotate nodes to keep icons upright
                document.querySelectorAll('.orbit-node').forEach((node, i) => {
                    const baseAngle = [0, 51, 103, 154, 206, 257, 309][i];
                    const baseRadius = i % 2 === 0 ? 125 : 190;
                    node.style.transform = `rotate(${baseAngle}deg) translateX(${baseRadius}px) rotate(${-baseAngle - rotation}deg)`;
                });
                
                // Counter-rotate center
                const center = document.querySelector('.orbit-center');
                if (center) {
                    center.style.transform = `translate(-50%, -50%) rotate(${-rotation}deg)`;
                }
            }
            animationId = requestAnimationFrame(rotateOrbit);
        }
        
        // Start rotation
        rotateOrbit();
    }
    
    // ========================================
    // BUTTON HOVER EFFECT
    // ========================================
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });
    
    // ========================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ========================================
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ========================================
    // ACTIVE NAV LINK BASED ON SECTION
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    function setActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.style.color = '';
            link.style.fontWeight = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#ffffff';
                link.style.fontWeight = '700';
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();
});