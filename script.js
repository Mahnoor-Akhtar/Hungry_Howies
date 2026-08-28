// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global variables
let scene, camera, renderer, particles;
let currentSlide = 0;
const totalSlides = 3;

// Page Initialization
window.addEventListener('load', () => {
    initAnimations();
    init3DBackground();
});

// Initialize GSAP Animations
function initAnimations() {
    // Hero section animations
    gsap.from('.hero-text > *', {
        duration: 1.2,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });

    gsap.from('.hero-image-container', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        rotation: -10,
        ease: 'power3.out',
        delay: 0.8
    });

    // Scroll-triggered animations
    gsap.utils.toArray('.category-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 100,
            opacity: 0,
            rotation: 5,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.dish-card-3d').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                once: true
            },
            duration: 0.6,
            y: 50,
            opacity: 0,
            delay: (i % 3) * 0.1,
            ease: 'power3.out'
        });
    });

    // Parallax effect for chef story
    gsap.to('.parallax-bg img', {
        scrollTrigger: {
            trigger: '.chef-story',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: '-20%',
        ease: 'none'
    });

    // Gallery items animation
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            scale: 0.8,
            opacity: 0,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });
}

// 3D Background with Three.js
function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create floating particles
    const geometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        
        // Red brand particles
        colors[i] = 0.93; // R
        colors[i + 1] = 0.11; // G
        colors[i + 2] = 0.14; // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 5;
    
    animate3D();
}

function animate3D() {
    requestAnimationFrame(animate3D);
    
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
    }
    
    renderer.render(scene, camera);
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        const isActive = navMenu ? navMenu.classList.toggle('active') : false;
        if (isActive) {
            pushNavigationState('navMenu');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: target,
                ease: 'power3.inOut'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced Category Card Interactions
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.5,
            y: -30,
            rotationX: 15,
            rotationY: 5,
            scale: 1.05,
            ease: 'power3.out'
        });
        
        gsap.to(this.querySelector('img'), {
            duration: 0.5,
            scale: 1.2,
            ease: 'power3.out'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.5,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: 'power3.out'
        });
        
        gsap.to(this.querySelector('img'), {
            duration: 0.5,
            scale: 1,
            ease: 'power3.out'
        });
    });
});

// Enhanced Dish Card Interactions
document.querySelectorAll('.dish-card-3d').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.6,
            y: -25,
            rotationX: 10,
            scale: 1.02,
            ease: 'power3.out'
        });
        
        gsap.to(this.querySelector('.dish-glow'), {
            duration: 0.6,
            opacity: 0.4,
            ease: 'power3.out'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.6,
            y: 0,
            rotationX: 0,
            scale: 1,
            ease: 'power3.out'
        });
        
        gsap.to(this.querySelector('.dish-glow'), {
            duration: 0.6,
            opacity: 0,
            ease: 'power3.out'
        });
    });
});

// Custom Dropdown Open/Close & Selection Logic
const dropdownWrapper = document.getElementById('customDropdownWrapper');
const dropdownTrigger = document.getElementById('customDropdownTrigger');
const dropdownItems = document.querySelectorAll('.custom-dropdown-item');
const selectedCategoryText = document.getElementById('selectedCategoryText');
const searchInput = document.getElementById('menuSearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const noResultsMsg = document.getElementById('noResultsMsg');
const resetSearchBtn = document.getElementById('resetSearchBtn');
const menuDishCards = document.querySelectorAll('.dish-card-3d');

let currentCategory = 'all';

if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdownWrapper.classList.toggle('open');
        if (isOpen) {
            pushNavigationState('customDropdown');
        }
    });
}

document.addEventListener('click', (e) => {
    if (dropdownWrapper && !dropdownWrapper.contains(e.target)) {
        dropdownWrapper.classList.remove('open');
    }
});

dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        dropdownItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        currentCategory = item.getAttribute('data-value');
        const text = item.textContent.trim();
        if (selectedCategoryText) selectedCategoryText.textContent = text;

        if (dropdownWrapper) dropdownWrapper.classList.remove('open');
        filterMenuItems();
    });
});

const categorySubScreenMap = {
    'pizza': 'pizzaDetailsScreen',
    'chicken-steak': 'steakDetailsScreen',
    'burger': 'burgerDetailsScreen',
    'dajjaj-brost': 'brostDetailsScreen',
    'pasta': 'pastaDetailsScreen',
    'panini': 'paniniDetailsScreen',
    'appetizer': 'appetizerDetailsScreen',
    'fries': 'friesDetailsScreen',
    'beverages': 'beveragesDetailsScreen',
    'extra-topping': 'toppingsDetailsScreen',
    'hot-beverages': 'hotBeveragesDetailsScreen',
    'cold-coffee': 'coldCoffeeDetailsScreen',
    'ice-cream': 'iceCreamDetailsScreen',
    'mocktails': 'mocktailsDetailsScreen',
    'mojito': 'mojitoDetailsScreen',
    'smoothies': 'smoothiesDetailsScreen',
    'ice-shakes': 'iceShakesDetailsScreen',
    'milk-shakes': 'milkShakesDetailsScreen',
    'soft-drinks': 'softDrinksDetailsScreen'
};

function filterMenuItems() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    if (clearSearchBtn) {
        clearSearchBtn.style.display = searchTerm.length > 0 ? 'block' : 'none';
    }

    menuDishCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const itemTitle = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
        const itemDesc = card.querySelector('.dish-card-desc') ? card.querySelector('.dish-card-desc').textContent.toLowerCase() : '';

        const subScreenId = categorySubScreenMap[cardCategory];
        const subScreenEl = subScreenId ? document.getElementById(subScreenId) : null;
        const subScreenText = subScreenEl ? subScreenEl.innerText.toLowerCase() : '';

        const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
        const matchesSearch = (
            searchTerm === '' ||
            itemTitle.includes(searchTerm) ||
            itemDesc.includes(searchTerm) ||
            cardCategory.toLowerCase().includes(searchTerm) ||
            subScreenText.includes(searchTerm)
        );

        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                opacity: 1,
                ease: 'power2.out'
            });
            visibleCount++;
        } else {
            gsap.to(card, {
                duration: 0.2,
                scale: 0.8,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => {
                    card.style.display = 'none';
                }
            });
        }

        // Filter sub-items inside the corresponding sub screen
        if (subScreenEl) {
            const subItems = subScreenEl.querySelectorAll('.pasta-detail-card, .pizza-detail-card, .topping-item-card, .info-addon-card, .extra-beef-card, .burger-item-row, .steak-item-row');
            subItems.forEach(subItem => {
                const itemText = subItem.innerText.toLowerCase();
                if (searchTerm === '' || itemText.includes(searchTerm) || cardCategory.toLowerCase().includes(searchTerm)) {
                    subItem.style.display = '';
                } else {
                    subItem.style.display = 'none';
                }
            });
        }
    });

    if (noResultsMsg) {
        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block';
            gsap.fromTo(noResultsMsg, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
        } else {
            noResultsMsg.style.display = 'none';
        }
    }
}

if (searchInput) searchInput.addEventListener('input', filterMenuItems);

if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        filterMenuItems();
        if (searchInput) searchInput.focus();
    });
}

if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        currentCategory = 'all';
        dropdownItems.forEach(i => i.classList.remove('active'));
        const allItem = document.querySelector('.custom-dropdown-item[data-value="all"]');
        if (allItem) allItem.classList.add('active');
        if (selectedCategoryText) selectedCategoryText.textContent = 'All Categories';
        filterMenuItems();
    });
}

// History State & Mobile Back Button Navigation Handler
function pushNavigationState(screenId) {
    try {
        if (!window.history.state || window.history.state.modalScreen !== screenId) {
            window.history.pushState({ modalScreen: screenId }, '', '#' + screenId);
        }
    } catch (err) {
        console.error('History pushState error:', err);
    }
}

function closeActiveScreens() {
    let closedAny = false;

    // Dynamically find any full screen detail modal that is currently active
    const activeScreens = document.querySelectorAll('[id$="DetailsScreen"].active');
    activeScreens.forEach(screen => {
        screen.classList.remove('active');
        closedAny = true;
        setTimeout(() => {
            screen.style.display = 'none';
        }, 400);
    });

    if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        closedAny = true;
    }

    if (dropdownWrapper && dropdownWrapper.classList.contains('open')) {
        dropdownWrapper.classList.remove('open');
        closedAny = true;
    }

    if (closedAny) {
        document.body.style.overflow = '';
    }

    return closedAny;
}

function closeScreenWithHistory(screenElement) {
    if (screenElement && screenElement.classList.contains('active')) {
        if (window.history.state && window.history.state.modalScreen) {
            window.history.back();
        } else {
            screenElement.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                screenElement.style.display = 'none';
            }, 400);
            if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        }
    }
}

// Global popstate listener for Mobile Hardware/Browser Back Button Navigation
window.addEventListener('popstate', () => {
    closeActiveScreens();
});

// Dedicated Full Screen Pizza View Navigation Handler
const pizzaDetailsScreen = document.getElementById('pizzaDetailsScreen');
const backToMenuBtn = document.getElementById('backToMenuBtn');
const pizzaCard = document.querySelector('.dish-card-3d[data-category="pizza"]');

if (pizzaCard) {
    pizzaCard.addEventListener('click', (e) => {
        e.preventDefault();
        if (pizzaDetailsScreen) {
            pizzaDetailsScreen.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                pizzaDetailsScreen.classList.add('active');
            }, 10);
            pushNavigationState('pizzaDetailsScreen');
        }
    });
}

if (backToMenuBtn) {
    backToMenuBtn.addEventListener('click', () => {
        closeScreenWithHistory(pizzaDetailsScreen);
    });
}

// Dedicated Full Screen Chicken Steak View Navigation Handler
const steakDetailsScreen = document.getElementById('steakDetailsScreen');
const backToMenuBtnSteak = document.getElementById('backToMenuBtnSteak');
const steakCard = document.querySelector('.dish-card-3d[data-category="chicken-steak"]');

if (steakCard) {
    steakCard.addEventListener('click', (e) => {
        e.preventDefault();
        if (steakDetailsScreen) {
            steakDetailsScreen.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                steakDetailsScreen.classList.add('active');
                // GSAP stagger animation for steak menu items
                gsap.fromTo('.steak-item-row', 
                    { opacity: 0, y: 15 }, 
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
                );
                gsap.fromTo('.info-addon-card', 
                    { opacity: 0, y: 20 }, 
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.5 }
                );
            }, 10);
            pushNavigationState('steakDetailsScreen');
        }
    });
}

if (backToMenuBtnSteak) {
    backToMenuBtnSteak.addEventListener('click', () => {
        closeScreenWithHistory(steakDetailsScreen);
    });
}

// Dedicated Full Screen Burger Selection View Navigation Handler
const burgerDetailsScreen = document.getElementById('burgerDetailsScreen');
const backToMenuBtnBurger = document.getElementById('backToMenuBtnBurger');
const burgerCard = document.querySelector('.dish-card-3d[data-category="burger"]');

function openBurgerDetails() {
    if (burgerDetailsScreen) {
        burgerDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            burgerDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('.burger-menu-card', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('.burger-item-row', 
                { opacity: 0, y: 15 }, 
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.3 }
            );
            gsap.fromTo('.extra-beef-card', 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 }
            );
            gsap.fromTo('.floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('burgerDetailsScreen');
    }
}

if (burgerCard) {
    burgerCard.addEventListener('click', (e) => {
        e.preventDefault();
        openBurgerDetails();
    });
}

if (backToMenuBtnBurger) {
    backToMenuBtnBurger.addEventListener('click', () => {
        closeScreenWithHistory(burgerDetailsScreen);
    });
}

// Dedicated Full Screen Dajjaj Brost View Navigation Handler
const brostDetailsScreen = document.getElementById('brostDetailsScreen');
const backToMenuBtnBrost = document.getElementById('backToMenuBtnBrost');
const brostCard = document.querySelector('.dish-card-3d[data-category="dajjaj-brost"]');

function openBrostDetails() {
    if (brostDetailsScreen) {
        brostDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            brostDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#brostDetailsScreen .steak-menu-card', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#brostDetailsScreen .burger-item-row', 
                { opacity: 0, y: 15 }, 
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.3 }
            );
            gsap.fromTo('#brostDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('brostDetailsScreen');
    }
}

if (brostCard) {
    brostCard.addEventListener('click', (e) => {
        e.preventDefault();
        openBrostDetails();
    });
}

if (backToMenuBtnBrost) {
    backToMenuBtnBrost.addEventListener('click', () => {
        closeScreenWithHistory(brostDetailsScreen);
    });
}

// Dedicated Full Screen Pasta View Navigation Handler
const pastaDetailsScreen = document.getElementById('pastaDetailsScreen');
const backToMenuBtnPasta = document.getElementById('backToMenuBtnPasta');
const pastaCard = document.querySelector('.dish-card-3d[data-category="pasta"]');

function openPastaDetails() {
    if (pastaDetailsScreen) {
        pastaDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            pastaDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#pastaDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#pastaDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('pastaDetailsScreen');
    }
}

if (pastaCard) {
    pastaCard.addEventListener('click', (e) => {
        e.preventDefault();
        openPastaDetails();
    });
}

if (backToMenuBtnPasta) {
    backToMenuBtnPasta.addEventListener('click', () => {
        closeScreenWithHistory(pastaDetailsScreen);
    });
}

// Dedicated Full Screen Panini View Navigation Handler
const paniniDetailsScreen = document.getElementById('paniniDetailsScreen');
const backToMenuBtnPanini = document.getElementById('backToMenuBtnPanini');
const paniniCard = document.querySelector('.dish-card-3d[data-category="panini"]');

function openPaniniDetails() {
    if (paniniDetailsScreen) {
        paniniDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            paniniDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#paniniDetailsScreen .burger-menu-card', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#paniniDetailsScreen .burger-item-row', 
                { opacity: 0, y: 15 }, 
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.3 }
            );
            gsap.fromTo('#paniniDetailsScreen .extra-beef-card', 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 }
            );
            gsap.fromTo('#paniniDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('paniniDetailsScreen');
    }
}

if (paniniCard) {
    paniniCard.addEventListener('click', (e) => {
        e.preventDefault();
        openPaniniDetails();
    });
}

if (backToMenuBtnPanini) {
    backToMenuBtnPanini.addEventListener('click', () => {
        closeScreenWithHistory(paniniDetailsScreen);
    });
}

// Dedicated Full Screen Appetizers View Navigation Handler
const appetizerDetailsScreen = document.getElementById('appetizerDetailsScreen');
const backToMenuBtnAppetizer = document.getElementById('backToMenuBtnAppetizer');
const appetizerCard = document.querySelector('.dish-card-3d[data-category="appetizer"]');

function openAppetizerDetails() {
    if (appetizerDetailsScreen) {
        appetizerDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            appetizerDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#appetizerDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#appetizerDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('appetizerDetailsScreen');
    }
}

if (appetizerCard) {
    appetizerCard.addEventListener('click', (e) => {
        e.preventDefault();
        openAppetizerDetails();
    });
}

if (backToMenuBtnAppetizer) {
    backToMenuBtnAppetizer.addEventListener('click', () => {
        closeScreenWithHistory(appetizerDetailsScreen);
    });
}

// Dedicated Full Screen Fries View Navigation Handler
const friesDetailsScreen = document.getElementById('friesDetailsScreen');
const backToMenuBtnFries = document.getElementById('backToMenuBtnFries');
const friesCard = document.querySelector('.dish-card-3d[data-category="fries"]');

function openFriesDetails() {
    if (friesDetailsScreen) {
        friesDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            friesDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#friesDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#friesDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('friesDetailsScreen');
    }
}

if (friesCard) {
    friesCard.addEventListener('click', (e) => {
        e.preventDefault();
        openFriesDetails();
    });
}

if (backToMenuBtnFries) {
    backToMenuBtnFries.addEventListener('click', () => {
        closeScreenWithHistory(friesDetailsScreen);
    });
}

// Dedicated Full Screen Beverages View Navigation Handler
const beveragesDetailsScreen = document.getElementById('beveragesDetailsScreen');
const backToMenuBtnBeverages = document.getElementById('backToMenuBtnBeverages');
const beveragesCard = document.querySelector('.dish-card-3d[data-category="beverages"]');

function openBeveragesDetails() {
    if (beveragesDetailsScreen) {
        beveragesDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            beveragesDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#beveragesDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#beveragesDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('beveragesDetailsScreen');
    }
}

if (beveragesCard) {
    beveragesCard.addEventListener('click', (e) => {
        e.preventDefault();
        openBeveragesDetails();
    });
}

if (backToMenuBtnBeverages) {
    backToMenuBtnBeverages.addEventListener('click', () => {
        closeScreenWithHistory(beveragesDetailsScreen);
    });
}

// Dedicated Full Screen Extra Toppings View Navigation Handler
const toppingsDetailsScreen = document.getElementById('toppingsDetailsScreen');
const backToMenuBtnToppings = document.getElementById('backToMenuBtnToppings');
const toppingsCard = document.querySelector('.dish-card-3d[data-category="extra-topping"]');

function openToppingsDetails() {
    if (toppingsDetailsScreen) {
        toppingsDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            toppingsDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#toppingsDetailsScreen .topping-item-card', 
                { opacity: 0, scale: 0.85, y: 30 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.1 }
            );
            gsap.fromTo('#toppingsDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('toppingsDetailsScreen');
    }
}

if (toppingsCard) {
    toppingsCard.addEventListener('click', (e) => {
        e.preventDefault();
        openToppingsDetails();
    });
}

if (backToMenuBtnToppings) {
    backToMenuBtnToppings.addEventListener('click', () => {
        closeScreenWithHistory(toppingsDetailsScreen);
    });
}

// Dedicated Full Screen Hot Beverages View Navigation Handler
const hotBeveragesDetailsScreen = document.getElementById('hotBeveragesDetailsScreen');
const backToMenuBtnHotBeverages = document.getElementById('backToMenuBtnHotBeverages');
const hotBeveragesCard = document.querySelector('.dish-card-3d[data-category="hot-beverages"]');

function openHotBeveragesDetails() {
    if (hotBeveragesDetailsScreen) {
        hotBeveragesDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            hotBeveragesDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#hotBeveragesDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#hotBeveragesDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('hotBeveragesDetailsScreen');
    }
}

if (hotBeveragesCard) {
    hotBeveragesCard.addEventListener('click', (e) => {
        e.preventDefault();
        openHotBeveragesDetails();
    });
}

if (backToMenuBtnHotBeverages) {
    backToMenuBtnHotBeverages.addEventListener('click', () => {
        closeScreenWithHistory(hotBeveragesDetailsScreen);
    });
}

// Dedicated Full Screen Cold Coffee View Navigation Handler
const coldCoffeeDetailsScreen = document.getElementById('coldCoffeeDetailsScreen');
const backToMenuBtnColdCoffee = document.getElementById('backToMenuBtnColdCoffee');
const coldCoffeeCard = document.querySelector('.dish-card-3d[data-category="cold-coffee"]');

function openColdCoffeeDetails() {
    if (coldCoffeeDetailsScreen) {
        coldCoffeeDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            coldCoffeeDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#coldCoffeeDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#coldCoffeeDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('coldCoffeeDetailsScreen');
    }
}

if (coldCoffeeCard) {
    coldCoffeeCard.addEventListener('click', (e) => {
        e.preventDefault();
        openColdCoffeeDetails();
    });
}

if (backToMenuBtnColdCoffee) {
    backToMenuBtnColdCoffee.addEventListener('click', () => {
        closeScreenWithHistory(coldCoffeeDetailsScreen);
    });
}

// Dedicated Full Screen Ice Cream View Navigation Handler
const iceCreamDetailsScreen = document.getElementById('iceCreamDetailsScreen');
const backToMenuBtnIceCream = document.getElementById('backToMenuBtnIceCream');
const iceCreamCard = document.querySelector('.dish-card-3d[data-category="ice-cream"]');

function openIceCreamDetails() {
    if (iceCreamDetailsScreen) {
        iceCreamDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            iceCreamDetailsScreen.classList.add('active');
            // GSAP transitions
            gsap.fromTo('#iceCreamDetailsScreen .burger-item-row', 
                { opacity: 0, y: 15 }, 
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
            );
            gsap.fromTo('#iceCreamDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('iceCreamDetailsScreen');
    }
}

if (iceCreamCard) {
    iceCreamCard.addEventListener('click', (e) => {
        e.preventDefault();
        openIceCreamDetails();
    });
}

if (backToMenuBtnIceCream) {
    backToMenuBtnIceCream.addEventListener('click', () => {
        closeScreenWithHistory(iceCreamDetailsScreen);
    });
}

// Dedicated Full Screen Mocktails View Navigation Handler
const mocktailsDetailsScreen = document.getElementById('mocktailsDetailsScreen');
const backToMenuBtnMocktails = document.getElementById('backToMenuBtnMocktails');
const mocktailsCard = document.querySelector('.dish-card-3d[data-category="mocktails"]');

function openMocktailsDetails() {
    if (mocktailsDetailsScreen) {
        mocktailsDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            mocktailsDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#mocktailsDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#mocktailsDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('mocktailsDetailsScreen');
    }
}

if (mocktailsCard) {
    mocktailsCard.addEventListener('click', (e) => {
        e.preventDefault();
        openMocktailsDetails();
    });
}

if (backToMenuBtnMocktails) {
    backToMenuBtnMocktails.addEventListener('click', () => {
        closeScreenWithHistory(mocktailsDetailsScreen);
    });
}

// Dedicated Full Screen Mojito View Navigation Handler
const mojitoDetailsScreen = document.getElementById('mojitoDetailsScreen');
const backToMenuBtnMojito = document.getElementById('backToMenuBtnMojito');
const mojitoCard = document.querySelector('.dish-card-3d[data-category="mojito"]');

function openMojitoDetails() {
    if (mojitoDetailsScreen) {
        mojitoDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            mojitoDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#mojitoDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#mojitoDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('mojitoDetailsScreen');
    }
}

if (mojitoCard) {
    mojitoCard.addEventListener('click', (e) => {
        e.preventDefault();
        openMojitoDetails();
    });
}

if (backToMenuBtnMojito) {
    backToMenuBtnMojito.addEventListener('click', () => {
        closeScreenWithHistory(mojitoDetailsScreen);
    });
}

// Dedicated Full Screen Smoothies View Navigation Handler
const smoothiesDetailsScreen = document.getElementById('smoothiesDetailsScreen');
const backToMenuBtnSmoothies = document.getElementById('backToMenuBtnSmoothies');
const smoothiesCard = document.querySelector('.dish-card-3d[data-category="smoothies"]');

function openSmoothiesDetails() {
    if (smoothiesDetailsScreen) {
        smoothiesDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            smoothiesDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#smoothiesDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#smoothiesDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('smoothiesDetailsScreen');
    }
}

if (smoothiesCard) {
    smoothiesCard.addEventListener('click', (e) => {
        e.preventDefault();
        openSmoothiesDetails();
    });
}

if (backToMenuBtnSmoothies) {
    backToMenuBtnSmoothies.addEventListener('click', () => {
        closeScreenWithHistory(smoothiesDetailsScreen);
    });
}

// Dedicated Full Screen Ice Shakes View Navigation Handler
const iceShakesDetailsScreen = document.getElementById('iceShakesDetailsScreen');
const backToMenuBtnIceShakes = document.getElementById('backToMenuBtnIceShakes');
const iceShakesCard = document.querySelector('.dish-card-3d[data-category="ice-shakes"]');

function openIceShakesDetails() {
    if (iceShakesDetailsScreen) {
        iceShakesDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            iceShakesDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions
            gsap.fromTo('#iceShakesDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#iceShakesDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('iceShakesDetailsScreen');
    }
}

if (iceShakesCard) {
    iceShakesCard.addEventListener('click', (e) => {
        e.preventDefault();
        openIceShakesDetails();
    });
}

if (backToMenuBtnIceShakes) {
    backToMenuBtnIceShakes.addEventListener('click', () => {
        closeScreenWithHistory(iceShakesDetailsScreen);
    });
}

// Dedicated Full Screen Milk Shakes View Navigation Handler
const milkShakesDetailsScreen = document.getElementById('milkShakesDetailsScreen');
const backToMenuBtnMilkShakes = document.getElementById('backToMenuBtnMilkShakes');
const milkShakesCard = document.querySelector('.dish-card-3d[data-category="milk-shakes"]');

function openMilkShakesDetails() {
    if (milkShakesDetailsScreen) {
        milkShakesDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            milkShakesDetailsScreen.classList.add('active');
            // GSAP stagger-in transitions (uses 2x2 grid)
            gsap.fromTo('#milkShakesDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#milkShakesDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('milkShakesDetailsScreen');
    }
}

if (milkShakesCard) {
    milkShakesCard.addEventListener('click', (e) => {
        e.preventDefault();
        openMilkShakesDetails();
    });
}

if (backToMenuBtnMilkShakes) {
    backToMenuBtnMilkShakes.addEventListener('click', () => {
        closeScreenWithHistory(milkShakesDetailsScreen);
    });
}

// Dedicated Full Screen Soft Drinks View Navigation Handler
const softDrinksDetailsScreen = document.getElementById('softDrinksDetailsScreen');
const backToMenuBtnSoftDrinks = document.getElementById('backToMenuBtnSoftDrinks');
const softDrinksCard = document.querySelector('.dish-card-3d[data-category="soft-drinks"]');

function openSoftDrinksDetails() {
    if (softDrinksDetailsScreen) {
        softDrinksDetailsScreen.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            softDrinksDetailsScreen.classList.add('active');
            // GSAP transitions
            gsap.fromTo('#softDrinksDetailsScreen .pasta-detail-card', 
                { opacity: 0, y: 35 }, 
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('#softDrinksDetailsScreen .floating-ingredient',
                { opacity: 0, scale: 0.5 },
                { opacity: 0.8, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.4 }
            );
        }, 10);
        pushNavigationState('softDrinksDetailsScreen');
    }
}

if (softDrinksCard) {
    softDrinksCard.addEventListener('click', (e) => {
        e.preventDefault();
        openSoftDrinksDetails();
    });
}

if (backToMenuBtnSoftDrinks) {
    backToMenuBtnSoftDrinks.addEventListener('click', () => {
        closeScreenWithHistory(softDrinksDetailsScreen);
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeScreen = document.querySelector('[id$="DetailsScreen"].active');
        if (activeScreen) {
            closeScreenWithHistory(activeScreen);
        } else {
            closeActiveScreens();
        }
    }
});

// 3D Testimonial Carousel
function changeSlide(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!slides || slides.length === 0) return;
    
    // Hide current slide
    gsap.to(slides[currentSlide], {
        duration: 0.5,
        opacity: 0,
        rotationY: direction > 0 ? 90 : -90,
        ease: 'power3.in',
        onComplete: () => {
            slides[currentSlide].classList.remove('active');
        }
    });
    
    // Update current slide index
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    
    // Show new slide
    setTimeout(() => {
        slides[currentSlide].classList.add('active');
        gsap.fromTo(slides[currentSlide], 
            {
                opacity: 0,
                rotationY: direction > 0 ? -90 : 90
            },
            {
                duration: 0.5,
                opacity: 1,
                rotationY: 0,
                ease: 'power3.out'
            }
        );
    }, 250);
}

// Auto-advance testimonials
setInterval(() => {
    changeSlide(1);
}, 6000);

// Enhanced Button Interactions
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.05,
            ease: 'power3.out'
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1,
            ease: 'power3.out'
        });
    });
    
    button.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Form Validation and Animation
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                gsap.to(input, {
                    duration: 0.3,
                    x: 10,
                    yoyo: true,
                    repeat: 3,
                    ease: 'power3.out'
                });
                input.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(237, 28, 36, 0.35)';
            }
        });
        
        if (isValid) {
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            gsap.to(submitBtn, {
                duration: 0.3,
                scale: 0.95,
                ease: 'power3.out'
            });
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Reservation Confirmed!';
                submitBtn.style.background = 'linear-gradient(45deg, #ED1C24, #B5121B)';
                
                gsap.to(submitBtn, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power3.out'
                });
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    this.reset();
                    
                    // Success animation
                    gsap.from('.reservation-form-container', {
                        duration: 0.5,
                        scale: 1.05,
                        ease: 'power3.out'
                    });
                }, 3000);
            }, 2000);
        }
    });
}

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('input[type="email"]');
        const button = this.querySelector('button');
        
        if (input.value.trim() && input.value.includes('@')) {
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.style.background = '#ED1C24';
            
            gsap.to(button, {
                duration: 0.3,
                scale: 1.1,
                yoyo: true,
                repeat: 1,
                ease: 'power3.out'
            });
            
            input.value = '';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        } else {
            gsap.to(input, {
                duration: 0.3,
                x: 10,
                yoyo: true,
                repeat: 3,
                ease: 'power3.out'
            });
        }
    });
}

// Scroll-based Header Animation
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.backdropFilter = 'blur(30px)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    }
    
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        gsap.to(header, {
            duration: 0.3,
            y: -100,
            ease: 'power3.out'
        });
    } else {
        gsap.to(header, {
            duration: 0.3,
            y: 0,
            ease: 'power3.out'
        });
    }
    
    lastScrollY = currentScrollY;
});

// Resize handler for 3D background
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Intersection Observer for enhanced animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// Add CSS for ripple effect and animations
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    gsap.globalTimeline.timeScale(0.5);
}

