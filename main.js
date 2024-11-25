document.addEventListener('DOMContentLoaded', handlePageLoad);

function handlePageLoad() {
    const loadingScreen = document.querySelector('.loading-screen');
    const pageWrapper = document.querySelector('.page-wrapper');
    
    // Check if this is a page refresh
    if (performance.navigation.type === 1 || sessionStorage.getItem('hasLoaded')) {
        // This is a refresh or subsequent visit in the same session
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        if (pageWrapper) {
            pageWrapper.style.opacity = '1';
        }
        document.documentElement.style.visibility = 'visible';
    } else {
        // This is the first load
        if (loadingScreen && pageWrapper) {
            // Show loading screen
            loadingScreen.style.display = 'flex';
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 3000);
        }
        // Set session flag
        sessionStorage.setItem('hasLoaded', 'true');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('js-loaded');

    // Pricing tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const pricingTabs = document.querySelectorAll('.pricing-tab');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            pricingTabs.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked button and corresponding tab
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });
});

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Particle Effect Initialization
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Enhanced Mobile Detection and Optimization
function isMobile() {
    return window.innerWidth <= 768;
}

// Adjust particle count for mobile
const particleCount = isMobile() ? 50 : 200;
const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1 + 0.2,
    speed: Math.random() * 2 + 1,
    direction: Math.random() * Math.PI * 2,
    alpha: Math.random() * 0.3 + 0.1,
    changeTimer: Math.random() * 100
}));

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 84, 22, ${p.alpha})`;
        ctx.fill();
    });
}

function updateParticles() {
    particles.forEach(p => {
        p.x += Math.cos(p.direction) * p.speed;
        p.y += Math.sin(p.direction) * p.speed;

        p.changeTimer--;
        if (p.changeTimer <= 0) {
            p.direction = Math.random() * Math.PI * 2;
            p.changeTimer = Math.random() * 100;
            p.speed = Math.random() * 2 + 1;
        }

        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;
    });
}

function animate() {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animate);
}

animate();

function checkScroll() {
    const cards = document.querySelectorAll('.philosophy-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight * 0.85) {
            card.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
checkScroll();

// Initialize all DOM-dependent functionality
document.addEventListener('DOMContentLoaded', function() {
    // Difference boxes animation
    const boxes = document.querySelectorAll('.difference-box');
    function checkBoxes() {
        const triggerBottom = window.innerHeight * 0.8;
        boxes.forEach((box, index) => {
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                setTimeout(() => {
                    box.classList.add('visible');
                }, index * 200);
            }
        });
    }
    checkBoxes();
    window.addEventListener('scroll', checkBoxes);

    // Difference section observer
    const differenceSection = document.querySelector('.difference');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                const boxes = entry.target.querySelectorAll('.difference-box');
                boxes.forEach(box => box.classList.remove('visible'));
            }
        });
    }, { threshold: 0 });
    observer.observe(differenceSection);

    // Testimonials
    const testimonials = [
        {
            quote: "Working with Lehigh Valley Digital transformed our online presence completely.",
            text: "Their innovative approach to web design and dedication to understanding our business needs exceeded our expectations. The custom solution they delivered not only looks stunning but has significantly improved our customer engagement and conversion rates.",
            author: "Sarah Mitchell",
            position: "Marketing Director, TechFlow Solutions"
        },
        {
            quote: "The level of customization and attention to detail is unmatched.",
            text: "What sets Lehigh Valley Digital apart is their ability to translate our vision into a powerful digital solution. Their team's expertise and commitment to excellence have made them an invaluable partner in our digital journey.",
            author: "Michael Anderson",
            position: "CEO, Innovation Labs"
        },
        {
            quote: "Finally, a digital partner that delivers real value.",
            text: "From the initial consultation to the final launch, Lehigh Valley Digital demonstrated exceptional professionalism and technical expertise. They've created a website that perfectly represents our brand and drives results.",
            author: "Jennifer Roberts",
            position: "Operations Manager, NextGen Solutions"
        }
    ];

    let currentIndex = 0;
    const card = document.querySelector('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let autoSlideInterval;

    function updateTestimonial(index) {
        card.style.opacity = '0';
        setTimeout(() => {
            card.innerHTML = `
                <div class="quote-mark">"</div>
                <h3>${testimonials[index].quote}</h3>
                <p>${testimonials[index].text}</p>
                <div class="testimonial-author">
                    <div class="author-info">
                        <h4>${testimonials[index].author}</h4>
                        <span>${testimonials[index].position}</span>
                    </div>
                </div>
            `;
            card.style.opacity = '1';
        }, 300);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (prevBtn && nextBtn && card) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        card.addEventListener('mouseenter', stopAutoSlide);
        card.addEventListener('mouseleave', startAutoSlide);
        card.style.transition = 'opacity 0.3s ease';
        startAutoSlide();
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (window.innerWidth > 768) {
        mobileMenu.style.display = 'none';
        mobileMenuBtn.style.display = 'none';
    }

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-menu-items a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Feature touch interactions
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('touchstart', function(e) {
            e.preventDefault();
            features.forEach(f => f.classList.remove('touched'));
            this.classList.add('touched');
        });
    });

    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.feature')) {
            features.forEach(f => f.classList.remove('touched'));
        }
    });
});

// Window resize handler
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.mobile-menu').style.display = 'none';
        document.querySelector('.mobile-menu-btn').style.display = 'none';
        document.body.style.overflow = '';
    } else {
        document.querySelector('.mobile-menu-btn').style.display = 'block';
    }
});

// Optimize animations for mobile
window.addEventListener('resize', () => {
    if (isMobile()) {
        // Reduce animation complexity
        particles.length = Math.min(particles.length, 50);
    }
});

// Improve touch handling
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.feature')) {
        e.preventDefault();
        const feature = e.target.closest('.feature');
        feature.classList.toggle('touched');
    }
}, { passive: false });

// Add touch event handling
document.addEventListener('DOMContentLoaded', function() {
    // Improve mobile menu behavior
    const mobileMenu = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.navbar-menu');
    
    mobileMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Improve feature card interactions on mobile
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('active');
        });
        
        feature.addEventListener('touchend', function() {
            this.classList.remove('active');
        });
    });
    
    // Adjust particle effect for mobile
    if (window.innerWidth <= 375) {
        particleCount = 30; // Reduce particles for better performance
        particleSpeed = 0.5; // Slow down particles
    }
});

// Add viewport height fix for mobile browsers
function setMobileVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setMobileVH);
setMobileVH(); 