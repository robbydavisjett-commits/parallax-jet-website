// Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.getAttribute('data-speed');
            const yOffset = scrollPosition * speed;
            
            element.style.transform = `translateY(${yOffset}px)`;
        });
        
        // Update hero background parallax
        const heroSection = document.querySelector('.hero');
        const parallaxBg = document.querySelector('.parallax-bg');
        const heroScrollPosition = heroSection.offsetTop - window.pageYOffset;
        
        if (window.pageYOffset < window.innerHeight) {
            parallaxBg.style.backgroundPosition = `center ${window.pageYOffset * 0.5}px`;
        }
    });
    
    // Smooth scroll for scroll indicator
    document.querySelector('.scroll-indicator').addEventListener('click', function() {
        document.querySelector('.engine').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Add interactive seat selection
    const seats = document.querySelectorAll('.seat');
    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
    
    // Add cabin door animation
    const cabinDoor = document.querySelector('.cabin-door');
    let isDoorOpen = false;
    
    cabinDoor.addEventListener('click', function() {
        isDoorOpen = !isDoorOpen;
        if (isDoorOpen) {
            this.style.transform = 'scaleX(0.05)';
            this.textContent = 'OPEN';
        } else {
            this.style.transform = 'scaleX(1)';
            this.textContent = 'Welcome';
        }
    });
    
    // Scroll animations - reveal sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Scroll progress indicator
    const scrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        // You can use this for a progress bar
        console.log(`Scroll progress: ${scrollPercent.toFixed(0)}%`);
    };
    
    window.addEventListener('scroll', scrollProgress);
    
    // Mouse position tracking for interactive effects
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply subtle movement to jet
        const jetContainer = document.querySelector('.jet-container');
        if (jetContainer) {
            jetContainer.style.transform = `translate(${(mouseX - 0.5) * 10}px, ${(mouseY - 0.5) * 10}px)`;
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
            window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        }
    });
    
    // Performance optimization - debounce scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Perform scroll calculations
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});

// Easter egg - click the jet to see it fly
document.addEventListener('DOMContentLoaded', function() {
    let jetClicks = 0;
    const jetSvg = document.querySelector('.jet-svg');
    
    jetSvg.addEventListener('click', function(e) {
        e.stopPropagation();
        jetClicks++;
        
        if (jetClicks === 3) {
            makeJetFly();
            jetClicks = 0;
        }
    });
    
    function makeJetFly() {
        const jetContainer = document.querySelector('.jet-container');
        jetContainer.style.animation = 'jetFly 3s ease-in-out';
        
        setTimeout(() => {
            jetContainer.style.animation = 'float 3s ease-in-out infinite';
        }, 3000);
    }
    
    // Add the animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes jetFly {
            0% {
                transform: translateX(0) translateY(0) scale(1);
                opacity: 1;
            }
            50% {
                transform: translateX(100px) translateY(-100px) scale(0.8);
                opacity: 0.8;
            }
            100% {
                transform: translateX(200px) translateY(-200px) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Progress bar at top of page
window.addEventListener('load', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #3498db, #e74c3c);
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});
