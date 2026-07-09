// Mobile menu toggle
const toggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('active')));
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Scroll reveal observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counters
const counters = document.querySelectorAll('.impact-num');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            if (!target) return;
            const duration = 2000;
            const start = performance.now();
            const plusEl = el.querySelector('.plus');
            const plusHTML = plusEl ? plusEl.outerHTML : '';

            const animate = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                el.innerHTML = current.toLocaleString() + plusHTML;
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// Parallax on hero images (homepage)
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const main = document.querySelector('.hero-img-main');
    const accent = document.querySelector('.hero-img-accent');
    if (main && scrolled < 900) {
        main.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
    if (accent && scrolled < 900) {
        accent.style.transform = `translateY(${scrolled * -0.04}px)`;
    }
});

// Active nav link highlighting based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
setActiveNavLink();

// News filter interaction
document.querySelectorAll('.news-filters .filter').forEach(filter => {
    filter.addEventListener('click', function () {
        document.querySelectorAll('.news-filters .filter').forEach(f => f.classList.remove('active'));
        this.classList.add('active');
    });
});
