// Dark Mode Toggle Functionality
class ThemeManager {
    constructor() {
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';

        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);

        // Add event listener
        this.darkModeToggle.addEventListener('click', () => this.toggleTheme());

        // Update icon
        this.updateToggleIcon();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateToggleIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateToggleIcon() {
        const icon = this.darkModeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-menu a');

        this.init();
    }

    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Smooth Scrolling with Offset for Fixed Header
class SmoothScrolling {
    constructor() {
        this.headerHeight = 70;
        this.init();
    }

    init() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - this.headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }

    init() {
        // Add animation classes to elements
        this.setupAnimations();

        // Create intersection observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observe all animated elements
        this.animatedElements.forEach(el => this.observer.observe(el));
    }

    setupAnimations() {
        // Hero content
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        if (heroText) {
            heroText.classList.add('slide-in-left');
            this.animatedElements.push(heroText);
        }
        if (heroImage) {
            heroImage.classList.add('slide-in-right');
            this.animatedElements.push(heroImage);
        }

        // Section titles
        document.querySelectorAll('.section-title').forEach(title => {
            title.classList.add('fade-in');
            this.animatedElements.push(title);
        });

        // Cards and timeline items
        document.querySelectorAll('.cert-card, .project-card, .timeline-item, .contact-card, .education-item, .skill-category, .summary-card').forEach(card => {
            card.classList.add('fade-in');
            this.animatedElements.push(card);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Skills Animation
class SkillsAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animated = new Set();
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.5,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        this.skillBars.forEach(bar => this.observer.observe(bar));
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.animated.has(entry.target)) {
                this.animateSkillBar(entry.target);
                this.animated.add(entry.target);
            }
        });
    }

    animateSkillBar(bar) {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = `${width}%`;
        }, 200);
    }
}

// Active Navigation Highlighting
class ActiveNavigation {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
        this.updateActiveLink(); // Initial call
    }

    updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// CV Download Functionality
class CVDownloader {
    constructor() {
        this.downloadButtons = document.querySelectorAll('#downloadCV, #downloadCVFooter');
        this.init();
    }

    init() {
        this.downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleDownload(e));
        });
    }

    handleDownload(e) {
        e.preventDefault();

        // Show message to user
        this.showDownloadMessage();

        // In a real implementation, you would:
        // 1. Generate a PDF version of the CV
        // 2. Trigger the download
        // For now, we'll just show a message

        // Example of how you might trigger a download:
        const link = document.createElement('a');
        link.target = '_blank';
        link.href = 'files/MARGARITA_AMBRIZ_ZUNIGA_CV.pdf';
        link.download = 'MARGARITA_AMBRIZ_ZUNIGA_CV.pdf';
        link.click();
    }

    showDownloadMessage() {
        const message = document.createElement('div');
        message.className = 'download-notification';
        message.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>CV disponible próximamente. Por favor, contacta directamente para solicitar el currículum.</span>
            </div>
        `;

        document.body.appendChild(message);

        // Style the notification
        Object.assign(message.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: 'var(--primary-color)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease',
            maxWidth: '350px'
        });

        // Animate in
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 5000);
    }
}

// Contact Links Handler
class ContactHandler {
    constructor() {
        this.init();
    }

    init() {
        // WhatsApp link handler
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add analytics or tracking here if needed
                console.log('WhatsApp contact initiated');
            });
        });

        // Email link handler
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add analytics or tracking here if needed
                console.log('Email contact initiated');
            });
        });

        // LinkedIn link placeholder
        const linkedinLink = document.getElementById('linkedinLink');
        if (linkedinLink) {
            linkedinLink.addEventListener('click', (e) => {
                e.preventDefault();
                // this.showLinkedInMessage();
                window.open('https://www.linkedin.com/in/margarita-ambriz-z%C3%BA%C3%B1iga-943569139/', '_blank');
            });
        }
    }

    showLinkedInMessage() {
        const message = document.createElement('div');
        message.className = 'linkedin-notification';
        message.innerHTML = `
            <div class="notification-content">
                <i class="fab fa-linkedin"></i>
                <span>Perfil de LinkedIn disponible próximamente. Mientras tanto, puedes contactar por email o WhatsApp.</span>
            </div>
        `;

        document.body.appendChild(message);

        // Style the notification
        Object.assign(message.style, {
            position: 'fixed',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--primary-color)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            zIndex: '10000',
            opacity: '0',
            transition: 'all 0.3s ease',
            maxWidth: '400px',
            textAlign: 'center'
        });

        // Animate in
        setTimeout(() => {
            message.style.opacity = '1';
        }, 100);

        // Remove after 4 seconds
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 4000);
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.setupLazyLoading();

        // Optimize scroll events
        this.setupScrollOptimization();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    setupScrollOptimization() {
        let ticking = false;

        function updateScrollEffects() {
            // Add any scroll-based effects here
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupReducedMotion();
    }

    setupKeyboardNavigation() {
        // Ensure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');

        interactiveElements.forEach(element => {
            if (!element.hasAttribute('tabindex') && element.tagName !== 'A') {
                element.setAttribute('tabindex', '0');
            }
        });

        // Add keyboard event handlers for custom buttons
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.classList.contains('btn') || e.target.id === 'darkModeToggle') {
                    e.preventDefault();
                    e.target.click();
                }
            }
        });
    }

    setupFocusManagement() {
        // Improve focus visibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupReducedMotion() {
        // Respect user's reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition', 'none');
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.documentElement.style.setProperty('--transition', 'none');
            } else {
                document.documentElement.style.removeProperty('--transition');
            }
        });
    }
}

// Analytics and Tracking (Optional)
class AnalyticsTracker {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageView();
        this.setupEventTracking();
    }

    trackPageView() {
        // Add your analytics code here (Google Analytics, etc.)
        console.log('Page view tracked');
    }

    setupEventTracking() {
        // Track button clicks
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = e.target.textContent.trim();
                this.trackEvent('Button Click', buttonText);
            });
        });

        // Track section views
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.trackEvent('Section View', sectionId);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    trackEvent(action, label) {
        // Add your event tracking code here
        console.log(`Event tracked: ${action} - ${label}`);
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            // You could send errors to a logging service here
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // You could send errors to a logging service here
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Core functionality
        new ThemeManager();
        new MobileNavigation();
        new SmoothScrolling();
        new ScrollAnimations();
        new SkillsAnimator(); // Add this line
        new ActiveNavigation();
        new CVDownloader();
        new ContactHandler();

        // Enhancements
        new PerformanceOptimizer();
        new AccessibilityEnhancer();
        new AnalyticsTracker();
        new ErrorHandler();

        console.log('Portfolio website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Add custom CSS for keyboard navigation
const keyboardNavigationCSS = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .notification-content i {
        font-size: 1.2rem;
    }
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = keyboardNavigationCSS;
document.head.appendChild(style);

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Get scroll position
    getScrollPosition: () => {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for potential use in other scripts
window.portfolioUtils = utils;
