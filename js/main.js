// Load all HTML sections
async function loadSection(sectionId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        document.getElementById(sectionId).innerHTML = html;
        
        // Initialize navbar scroll effects and mobile menu after it's loaded
        if (sectionId === 'navbar-container') {
            setTimeout(() => {
                initNavbarScroll();
                initMobileMenu(); // Initialize mobile menu
            }, 100);
        }
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// Initialize navbar scroll effects
function initNavbarScroll() {
    const navbar = document.querySelector(".obito-navbar");
    
    // Check if navbar exists (for safety)
    if (!navbar) return;
    
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                // activate Akatsuki mode
                if (currentScroll > 120) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }

                // fade in / out
                if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.classList.add("hide");
                } else {
                    navbar.classList.remove("hide");
                }

                lastScroll = currentScroll;
                ticking = false;
            });

            ticking = true;
        }
    });
}

// Initialize mobile menu for responsive design
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.obito-navbar');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            
            // Prevent body scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                if (navbar) navbar.style.backdropFilter = 'none';
            } else {
                document.body.style.overflow = '';
                if (navbar && navbar.classList.contains('scrolled')) {
                    navbar.style.backdropFilter = 'blur(8px)';
                }
            }
        });
        
        // Close menu when clicking on a link
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
                document.body.style.overflow = '';
                
                // Restore blur effect if navbar is scrolled
                if (navbar && navbar.classList.contains('scrolled')) {
                    navbar.style.backdropFilter = 'blur(8px)';
                }
            }
        });
        
        // Close menu when clicking outside (only on mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!e.target.closest('.nav-container')) {
                    navLinks.classList.remove('active');
                    menuToggle.textContent = '☰';
                    document.body.style.overflow = '';
                    
                    // Restore blur effect if navbar is scrolled
                    if (navbar && navbar.classList.contains('scrolled')) {
                        navbar.style.backdropFilter = 'blur(8px)';
                    }
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
                document.body.style.overflow = '';
                
                // Restore blur effect if navbar is scrolled
                if (navbar && navbar.classList.contains('scrolled')) {
                    navbar.style.backdropFilter = 'blur(8px)';
                }
            }
        });
        
        // Close menu on window resize (if resized to desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
                document.body.style.overflow = '';
                
                // Restore blur effect if navbar is scrolled
                if (navbar && navbar.classList.contains('scrolled')) {
                    navbar.style.backdropFilter = 'blur(8px)';
                }
            }
        });
    }
}

// Function to close mobile menu if open
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.obito-navbar');
    
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuToggle) menuToggle.textContent = '☰';
        document.body.style.overflow = '';
        
        // Restore blur effect if navbar is scrolled
        if (navbar && navbar.classList.contains('scrolled')) {
            navbar.style.backdropFilter = 'blur(8px)';
        }
    }
}

// Load all sections when page loads
document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        { id: 'navbar-container', file: 'sections/navbar.html' },
        { id: 'intro-container', file: 'sections/intro.html' },
        { id: 'biography-container', file: 'sections/biography.html' },
        { id: 'timeline-container', file: 'sections/timeline.html' },
        { id: 'philosophy-container', file: 'sections/philosophy.html' },
        { id: 'abilities-container', file: 'sections/abilities.html' },
        { id: 'quotes-container', file: 'sections/quotes.html' },
        { id: 'relationships-container', file: 'sections/relationships.html' },
        { id: 'my-connection-container', file: 'sections/my-connection.html' },
        { id: 'conclusion-container', file: 'sections/conclusion.html' }
    ];

    // Load all sections
    sections.forEach(section => {
        loadSection(section.id, section.file);
    });

    // Smooth scrolling for navbar links (delegated event handler)
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-links a') || e.target.closest('.nav-links a')) {
            e.preventDefault();
            const link = e.target.matches('.nav-links a') ? e.target : e.target.closest('.nav-links a');
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu first
                closeMobileMenu();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.obito-navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
    
    // Initialize video controls if needed
    initVideoControls();
});

// Function to initialize video controls
function initVideoControls() {
    // This function can be used to initialize any video controls if needed
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Add loading="lazy" for better performance
        video.setAttribute('loading', 'lazy');
        
        // Pause video when not in viewport for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log("Autoplay prevented:", e));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video);
    });
}

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}