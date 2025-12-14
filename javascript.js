/**
 * Cancer Awareness & Support Website
 * Simple, clean JavaScript for functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Hope Together website loaded successfully.');
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('support-form');
    const successMessage = document.getElementById('success-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Clear previous errors
            [nameInput, emailInput, messageInput].forEach(input => {
                input.style.borderColor = '';
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = 'var(--error)';
                isValid = false;
            }
            
            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
                emailInput.style.borderColor = 'var(--error)';
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                messageInput.style.borderColor = 'var(--error)';
                isValid = false;
            }
            
            if (!isValid) {
                // Focus on first error
                const firstError = contactForm.querySelector('[style*="border-color"]');
                if (firstError) {
                    firstError.focus();
                }
                return;
            }
            
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
                newsletter: document.getElementById('newsletter').checked
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(function() {
                // Show success message
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
                
                // Log form data (for demo)
                console.log('Form submitted:', formData);
                console.log('Note: This is a frontend demo. No actual message was sent.');
            }, 1500);
        });
    }
    
    // ===== HIGHLIGHT ACTIVE NAV LINK ON SCROLL =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial call
    updateActiveNavLink();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===== ADD SIMPLE ANIMATIONS =====
    const animatedElements = document.querySelectorAll('.awareness-card, .support-item, .resource-card');
    
    function checkAnimation() {
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkAnimation);
    window.addEventListener('scroll', checkAnimation);
    
    // ===== UPDATE FOOTER YEAR =====
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    
    if (yearElement && yearElement.textContent.includes('2023')) {
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
    
    // ===== ADD KEYBOARD NAVIGATION SUPPORT =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // ===== LOADING ANIMATION =====
    // Add a simple loading animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-content {
            animation: fadeIn 1s ease;
        }
        
        .section > * {
            animation: fadeIn 0.8s ease;
        }
    `;
    document.head.appendChild(style);
});
// ===== REAL-TIME QUOTES API INTEGRATION =====

// DOM Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteTags = document.getElementById('quote-tags');
const newQuoteBtn = document.getElementById('new-quote-btn');
const autoRefreshBtn = document.getElementById('auto-refresh-btn');
const lastUpdated = document.getElementById('last-updated');
const apiStatus = document.getElementById('api-status');
const quoteCard = document.querySelector('.quote-card');

// State variables
let autoRefreshInterval = null;
let isAutoRefresh = false;
let lastFetchTime = null;

// API Configuration
const API_URL = 'https://api.quotable.io/quotes/random?maxLength=150';
const TAGS_TO_INCLUDE = ['inspirational', 'motivational', 'hope', 'strength', 'life', 'wisdom'];

// Format time display
function formatTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

// Update UI with new quote
function updateQuoteUI(quoteData) {
    // Add loading animation
    quoteCard.classList.add('loading');
    
    setTimeout(() => {
        // Update quote text and author
        quoteText.textContent = `"${quoteData.content}"`;
        quoteAuthor.textContent = `— ${quoteData.author}`;
        
        // Update tags
        quoteTags.innerHTML = '';
        if (quoteData.tags && quoteData.tags.length > 0) {
            quoteData.tags.slice(0, 3).forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                quoteTags.appendChild(tagElement);
            });
        } else {
            const defaultTag = document.createElement('span');
            defaultTag.className = 'tag';
            defaultTag.textContent = 'inspiration';
            quoteTags.appendChild(defaultTag);
        }
        
        // Update timestamp
        lastFetchTime = new Date();
        lastUpdated.textContent = formatTimeAgo(lastFetchTime);
        
        // Remove loading animation
        quoteCard.classList.remove('loading');
        
        // fade-in animation
        quoteCard.style.animation = 'fadeIn 0.5s ease';
        setTimeout(() => {
            quoteCard.style.animation = '';
        }, 500);
        
        // Update API status
        apiStatus.textContent = 'API Status: Connected';
        apiStatus.classList.remove('error');
    }, 300);
}

// Fetch new quote from API
async function fetchNewQuote() {
    try {
        // Show loading state
        apiStatus.textContent = 'API Status: Fetching...';
        
        // Build API URL with tags
        const tagsParam = TAGS_TO_INCLUDE.join('|');
        const url = `${API_URL}&tags=${tagsParam}`;
        
        // Fetch quote
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            updateQuoteUI(data[0]);
        } else {
            throw new Error('No quotes received');
        }
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        
        // Fallback to local quotes
        const fallbackQuotes = [
            {
                content: "Strength does not come from physical capacity. It comes from an indomitable will.",
                author: "Mahatma Gandhi",
                tags: ["strength", "inspiration"]
            },
            {
                content: "Hope is being able to see that there is light despite all of the darkness.",
                author: "Desmond Tutu",
                tags: ["hope", "light"]
            },
            {
                content: "You have power over your mind—not outside events. Realize this, and you will find strength.",
                author: "Marcus Aurelius",
                tags: ["strength", "wisdom"]
            },
            {
                content: "The human spirit is stronger than anything that can happen to it.",
                author: "C.C. Scott",
                tags: ["strength", "spirit"]
            }
        ];
        
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        updateQuoteUI(randomQuote);
        
        // Update API status to error
        apiStatus.textContent = 'API Status: Using fallback quotes';
        apiStatus.classList.add('error');
    }
}

// Toggle auto-refresh
function toggleAutoRefresh() {
    if (isAutoRefresh) {
        // Stop auto-refresh
        clearInterval(autoRefreshInterval);
        autoRefreshBtn.innerHTML = '<i class="fas fa-play"></i> Auto-Refresh (10s)';
        autoRefreshBtn.classList.remove('active');
        isAutoRefresh = false;
    } else {
        // Start auto-refresh
        autoRefreshBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Auto-Refresh';
        autoRefreshBtn.classList.add('active');
        isAutoRefresh = true;
        
        // Fetch immediately
        fetchNewQuote();
        
        // Set interval for every 10 seconds
        autoRefreshInterval = setInterval(fetchNewQuote, 5000);
    }
}

// Initialize quotes functionality
function initQuotesSection() {
    // Fetch first quote on page load
    fetchNewQuote();
    
    // Event listeners
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', fetchNewQuote);
    }
    
    if (autoRefreshBtn) {
        autoRefreshBtn.addEventListener('click', toggleAutoRefresh);
    }
    
    // Update timestamp every minute
    setInterval(() => {
        if (lastFetchTime) {
            lastUpdated.textContent = formatTimeAgo(lastFetchTime);
        }
    }, 60000);
}

// existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code...
    
    // Initialize quotes section
    initQuotesSection();
    
    
});
// ===== DARK/LIGHT MODE TOGGLE =====

// DOM Elements for mode toggle
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const modeText = document.getElementById('mode-text');

// Check for saved theme preference or default to light
function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

// Apply theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle button
    if (theme === 'dark') {
        modeIcon.className = 'fas fa-sun';
        modeText.textContent = 'Light Mode';
        modeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        modeIcon.className = 'fas fa-moon';
        modeText.textContent = 'Dark Mode';
        modeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    applyTheme(newTheme);
    
    //  animation class
    document.body.classList.add('theme-changing');
    setTimeout(() => {
        document.body.classList.remove('theme-changing');
    }, 300);
}

// Initialize theme on page load
function initTheme() {
    const preferredTheme = getThemePreference();
    applyTheme(preferredTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // event listener to toggle button
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleTheme);
        
        // Add keyboard support
        modeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
}

// this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code...
    
    // Initialize theme
    initTheme();
    
    // Initialize quotes section (from previous implementation)
    initQuotesSection();
    
    // Rest of your existing code...
});

// Optional: Add smooth transition for theme changes
const transitionStyle = document.createElement('style');
transitionStyle.textContent = `
    .theme-changing * {
        transition: background-color 0.3s ease, color 0.3s ease, 
                    border-color 0.3s ease, box-shadow 0.3s ease !important;
    }
`;
document.head.appendChild(transitionStyle);