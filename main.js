import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Shrink Effect
    const header = document.getElementById('main-header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Intersection Observer for Scroll Reveals
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a skill item, animate the dots
                if (entry.target.classList.contains('skill-item')) {
                  animateDots(entry.target);
                }
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Staggered Item Animation
    const staggerItems = document.querySelectorAll('.experience-item, .project-card, .section');
    staggerItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        revealObserver.observe(item);
    });

    // 4. Skill Dots Animation Function
    function animateDots(container) {
        const dots = container.querySelectorAll('.dot.filled');
        dots.forEach((dot, index) => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
            dot.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            setTimeout(() => {
                dot.style.opacity = '1';
                dot.style.transform = 'scale(1)';
            }, index * 100);
        });
    }

    // 5. Parallax for Polaroid (Desktop Only)
    const polaroid = document.getElementById('polaroid-image');
    if (polaroid && window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            polaroid.style.transform = `rotate(5deg) translate(${x}px, ${y}px)`;
        });
    }

    // Initial check for scroll
    handleScroll();
});

// Adding a global transition mask for page navigation
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
});
