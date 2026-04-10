import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    // Add subtle parallax effect to the polaroid
    const polaroid = document.getElementById('polaroid-image');
    
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 80;
        const y = (window.innerHeight / 2 - e.pageY) / 80;
        
        if (polaroid && window.innerWidth > 800) {
            polaroid.style.transform = `rotate(5deg) translate(${x}px, ${y}px)`;
        }
    });

    // Make the sections fade in gracefully
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});
