/**
 * Kids Nepal Montessori School - JavaScript
 * Handles: Mobile menu, Language toggle, Smooth scrolling, Animations, Form handling
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = mobileToggle.querySelectorAll('span');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll to top button visibility
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // ============================================
    // Scroll to Top
    // ============================================
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // Language Toggle (English / Nepali)
    // ============================================
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'en';

    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'np' : 'en';
            toggleLanguage(currentLang);
        });
    }

    function toggleLanguage(lang) {
        const elements = document.querySelectorAll('[data-en][data-np]');
        
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // Handle different element types
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update language button appearance
        const langEn = document.querySelector('.lang-en');
        const langNp = document.querySelector('.lang-np');
        
        if (langEn && langNp) {
            if (lang === 'en') {
                langEn.style.fontWeight = '700';
                langNp.style.fontWeight = '400';
            } else {
                langEn.style.fontWeight = '400';
                langNp.style.fontWeight = '700';
            }
        }

        // Update document title based on language
        if (lang === 'np') {
            document.title = 'किड्स नेपाल मोंटेसरी स्कूल - पोखरा | बाल शिक्षा | #रमाईलोसिकाई';
        } else {
            document.title = 'Kids Nepal Montessori School - Pokhara | Montessori Education | #learnbyfun';
        }
    }

    // ============================================
    // Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.about-card, .program-card, .gallery-item, .contact-card, .info-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.classList.add(`stagger-${(index % 5) + 1}`);
        observer.observe(el);
    });

    // ============================================
    // Admission Form Handling
    // ============================================
    const admissionForm = document.getElementById('admissionForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal-close');

    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (!data.childName || !data.childAge || !data.parentName || !data.phone) {
                alert('Please fill in all required fields');
                return;
            }

            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show the success modal
            console.log('Form submitted:', data);
            
            // Show success modal
            if (successModal) {
                successModal.classList.add('show');
            }
            
            // Reset form
            this.reset();
        });
    }

    // Close modal
    if (modalClose && successModal) {
        modalClose.addEventListener('click', function() {
            successModal.classList.remove('show');
        });

        // Close modal when clicking outside
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('show');
            }
        });
    }

    // ============================================
    // Gallery Lightbox (Simple Version)
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // In a full implementation, you would open a lightbox here
                // For now, we'll just log the image source
                console.log('Gallery image clicked:', img.src);
            }
        });
    });

    // ============================================
    // Parallax Effect for Hero (Optional)
    // ============================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }

    // ============================================
    // Counter Animation for Stats
    // ============================================
    const stats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const duration = 1500;
        const stepTime = duration / 30;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, stepTime);
    }

    // ============================================
    // Preloader (Optional)
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ============================================
    // Newsletter/Updates Animation
    // ============================================
    const floatingElements = document.querySelectorAll('.hero-decor');
    
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c🎓 Kids Nepal Montessori School', 'font-size: 24px; font-weight: bold; color: #4A90D9;');
    console.log('%cWelcome to our website! #learnbyfun #kidsnepalmonte', 'font-size: 14px; color: #5CB85C;');
    console.log('%c📍 Location: Dharapani, Parsyang-5, Pokhara, Nepal', 'font-size: 14px; color: #FF9F43;');
});
