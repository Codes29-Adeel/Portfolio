document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.display = 'none';
        });
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu when clicking a link
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // Initialize AOS Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Portfolio Filtering
    const portfolioFilter = document.querySelector('.portfolio-filter');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (portfolioFilter && portfolioGrid) {
        const filterButtons = portfolioFilter.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Initialize Isotope
                const iso = new Isotope(portfolioGrid, {
                    itemSelector: '.portfolio-item',
                    layoutMode: 'fitRows'
                });
                
                // Filter items
                if (filterValue === '*') {
                    iso.arrange({ filter: '*' });
                } else {
                    iso.arrange({ filter: filterValue });
                }
            });
        });
    }

    // Portfolio Modal
    const portfolioDetailsLinks = document.querySelectorAll('.portfolio-details');
    portfolioDetailsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModal = this.getAttribute('data-bs-target');
            const modal = new bootstrap.Modal(document.querySelector(targetModal));
            modal.show();
        });
    });

    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        new Glide(testimonialsSlider, {
            type: 'carousel',
            perView: 1,
            autoplay: 3000,
            gap: 30,
            breakpoints: {
                768: {
                    perView: 1
                }
            }
        }).mount();
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formMessage = document.getElementById('form-message');
            
            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                formMessage.textContent = data;
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('success');
                }, 5000);
            })
            .catch(error => {
                formMessage.textContent = 'There was a problem with your submission. Please try again.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('error');
                }, 5000);
            });
        });
    }
});