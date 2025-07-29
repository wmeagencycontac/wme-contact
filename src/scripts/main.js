// WME Agency JavaScript

(function() {
    'use strict';

    // DOM Ready function
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    // Mobile Navigation Toggle
    function initMobileNav() {
        const toggleBtn = document.querySelector('.navbar-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');
        
        if (toggleBtn && navCollapse) {
            toggleBtn.addEventListener('click', function() {
                navCollapse.classList.toggle('show');
                
                // Animate hamburger bars
                const bars = toggleBtn.querySelectorAll('.navbar-toggler-bar');
                bars.forEach((bar, index) => {
                    if (navCollapse.classList.contains('show')) {
                        if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        bar.style.transform = '';
                    }
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!toggleBtn.contains(e.target) && !navCollapse.contains(e.target)) {
                    navCollapse.classList.remove('show');
                    const bars = toggleBtn.querySelectorAll('.navbar-toggler-bar');
                    bars.forEach(bar => bar.style.transform = '');
                }
            });
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchors = document.querySelectorAll('a[href^="#"]');
        
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Header scroll effect
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        if (header) {
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                    header.style.boxShadow = 'none';
                }
                
                lastScrollTop = scrollTop;
            });
        }
    }

    // Intersection Observer for animations
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe location items
        const locationItems = document.querySelectorAll('.location-item');
        locationItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    }

    // Contact form handling (if form exists)
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                try {
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        showMessage('Thank you for your message. We will get back to you soon.', 'success');
                        this.reset();
                    } else {
                        showMessage(result.error || 'Something went wrong. Please try again.', 'error');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    showMessage('Something went wrong. Please try again.', 'error');
                }
            });
        }
    }

    // Show message function
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type}`;
        messageDiv.textContent = message;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            z-index: 9999;
            transition: all 0.3s ease;
            ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }

    // Phone number formatting
    function initPhoneFormatting() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        
        phoneLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Track phone clicks for analytics
                if (window.gtag) {
                    gtag('event', 'phone_click', {
                        'phone_number': this.getAttribute('href').replace('tel:', ''),
                        'location': this.closest('.location-item')?.querySelector('.location-item-title')?.textContent || 'Unknown'
                    });
                }
            });
        });
    }

    // Email link tracking
    function initEmailTracking() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Track email clicks for analytics
                if (window.gtag) {
                    gtag('event', 'email_click', {
                        'email_address': this.getAttribute('href').replace('mailto:', ''),
                        'link_text': this.textContent
                    });
                }
            });
        });
    }

    // External link tracking
    function initExternalLinkTracking() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Track external link clicks
                if (window.gtag) {
                    gtag('event', 'external_link_click', {
                        'link_url': this.getAttribute('href'),
                        'link_text': this.textContent
                    });
                }
            });
        });
    }

    // Lazy load images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        
        // Send error to analytics if available
        if (window.gtag) {
            gtag('event', 'exception', {
                'description': e.error?.message || 'Unknown error',
                'fatal': false
            });
        }
    });

    // Initialize everything when DOM is ready
    ready(function() {
        initMobileNav();
        initSmoothScrolling();
        initHeaderScroll();
        initAnimations();
        initContactForm();
        initPhoneFormatting();
        initEmailTracking();
        initExternalLinkTracking();
        initLazyLoading();
        
        console.log('🚀 WME Agency website initialized');
    });

    // Expose some functions globally for potential external use
    window.WME = {
        showMessage: showMessage
    };

})();
