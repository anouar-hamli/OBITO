// Load all HTML sections
async function loadSection(sectionId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        document.getElementById(sectionId).innerHTML = html;
        
        // Initialize navbar scroll effects after it's loaded
        if (sectionId === 'navbar-container') {
            setTimeout(initNavbarScroll, 100); // Small delay to ensure DOM is ready
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

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

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
    });
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
    // This will work even after content is loaded dynamically
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-links a') || e.target.closest('.nav-links a')) {
            e.preventDefault();
            const link = e.target.matches('.nav-links a') ? e.target : e.target.closest('.nav-links a');
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});