// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(2, 0, 0, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(2, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Enhanced skill bubble interactions
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 0;

        // Only apply scroll effects when hero is visible and not being hovered
        if (heroVisible) {
            skillBubbles.forEach((bubble, index) => {
                if (!bubble.matches(':hover')) {
                    const rotateAmount = scrolled * 0.05;
                    const currentTransform = bubble.style.transform || '';

                    // Preserve existing transform values and add rotation
                    if (currentTransform.includes('translateX')) {
                        const translateMatch = currentTransform.match(/translateX\([^)]+\)/);
                        const translateX = translateMatch ? translateMatch[0] : 'translateX(-50%)';
                        const translateY = currentTransform.includes('translateY') ?
                            currentTransform.match(/translateY\([^)]+\)/)?.[0] || 'translateY(0px)' : 'translateY(0px)';

                        bubble.style.transform = `${translateX} ${translateY} rotate(${rotateAmount}deg)`;
                    }
                }
            });
        }
    }
});

// Intersection Observer for fade-in animations
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

// Apply animation to sections and project cards
document.querySelectorAll('section, .project-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
});

// Form submission handling
document.querySelector('.send-button')?.addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value;
    const subject = document.querySelector('input[type="text"]').value;
    const message = document.querySelector('textarea').value;

    if (email && subject && message) {
        // Create mailto link
        const mailtoLink = `mailto:contact@tonyaziz.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;

        // Show success feedback
        this.style.background = '#4CAF50';
        setTimeout(() => {
            this.style.background = '#000';
        }, 2000);
    } else {
        // Show error feedback
        this.style.background = '#f44336';
        setTimeout(() => {
            this.style.background = '#000';
        }, 2000);
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Function to restart skill bubble animation
function restartSkillAnimation() {
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    skillBubbles.forEach(bubble => {
        bubble.style.animation = 'none';
        bubble.offsetHeight; // Trigger reflow
        bubble.style.animation = 'dropAndColor 4s ease-out forwards, colorChange 3s ease-in-out infinite 4s';
    });
}

// Restart animation when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        restartSkillAnimation();
    }, 500);
});

// Add keyboard shortcut to restart animation (press 'R' key)
document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
        restartSkillAnimation();
        console.log('🎯 Animation restarted! Press R to restart again.');
    }
});

// Console greeting
console.log('🎨 Welcome to Tony\'s Portfolio!');
console.log('✨ Design • Code • Create');
console.log('📧 Ready to collaborate? Let\'s get in touch!');
console.log('🎯 Press R to restart the skill bubble animation!');
