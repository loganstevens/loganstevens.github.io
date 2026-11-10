// Website interactions: mouse, touch, keyboard; no user-agent sniffing required.
const profileImage = document.getElementById('profileImage');
const vr2025Image = document.getElementById('vr2025Image');
const brown2022Image = document.getElementById('brown2022Image');

const profileImageArray = [
    'assets/img/profile1.png', 'assets/img/profile2.png',
    'assets/img/profile.png', 'assets/img/profile14.jpg',
    'assets/img/profile4.png', 'assets/img/profile10.jpg',
    'assets/img/profile5.png', 'assets/img/profile9.jpg',
    'assets/img/profile8.png', 'assets/img/profile6.png',
    'assets/img/profile11.jpg', 'assets/img/profile7.png',
    'assets/img/profile12.jpg', 'assets/img/profile13.jpg',
    'assets/img/profile15.png'
];
const defaultProfileImage = 'assets/img/profile3.png';
const defaultVr2025Image = 'assets/img/RDW-1.png';
const defaultBrown2022Image = 'assets/img/Brown.png';

/** Image easter eggs: hover for mouse, tap to toggle for touch/pen,
 * and Enter/Space to toggle for keyboard users. Outside taps reset. */
function setupImageEasterEgg(image, defaultSrc, alternateImages, alternateAlt) {
    if (!image) return;
    let alternateShown = false;
    let currentAlternate = 0;
    let lastPointerType = '';
    const originalAlt = image.alt;
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', 'Reveal alternate image');
    image.setAttribute('aria-pressed', 'false');
    image.title = 'Hover or tap to reveal another image';

    function display(show) {
        alternateShown = show;
        image.src = show ? alternateImages[currentAlternate] : defaultSrc;
        image.alt = show ? alternateAlt : originalAlt;
        image.setAttribute('aria-pressed', String(show));
    }
    function toggle() {
        if (alternateShown) {
            display(false);
        } else {
            display(true);
            currentAlternate = (currentAlternate + 1) % alternateImages.length;
        }
    }
    image.addEventListener('pointerdown', event => {
        lastPointerType = event.pointerType;
    });
    image.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse') display(true);
    });
    image.addEventListener('pointerleave', event => {
        if (event.pointerType === 'mouse') display(false);
    });
    image.addEventListener('click', () => {
        if (lastPointerType !== 'mouse') toggle();
        lastPointerType = '';
    });
    image.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle();
        }
    });
    document.addEventListener('pointerdown', event => {
        if (!image.contains(event.target) && alternateShown) display(false);
    });
}

setupImageEasterEgg(
    vr2025Image, defaultVr2025Image,
    ['assets/img/vr2025-pose-1.JPG'],
    'Alternate photograph from IEEE VR 2025'
);
setupImageEasterEgg(
    brown2022Image, defaultBrown2022Image,
    ['assets/img/VR-Team.jpg'],
    'Team photograph from the Brown University research project'
);

// Profile portrait: advance through the original image gallery on hover/tap.
if (profileImage) {
    let currentProfileImageIndex = 0;
    let lastPointerType = '';
    const originalAlt = profileImage.alt;
    profileImage.tabIndex = 0;
    profileImage.setAttribute('role', 'button');
    profileImage.setAttribute('aria-label', 'Show another portrait');
    profileImage.title = 'Hover or tap to see another photo';
    profileImage.classList.add('pulsate');

    const advance = () => {
        profileImage.classList.remove('pulsate');
        profileImage.src = profileImageArray[currentProfileImageIndex];
        profileImage.alt = 'Alternate portrait of Logan Stevens';
        currentProfileImageIndex = (currentProfileImageIndex + 1) % profileImageArray.length;
    };
    const reset = () => {
        profileImage.src = defaultProfileImage;
        profileImage.alt = originalAlt;
    };
    profileImage.addEventListener('pointerdown', event => {
        lastPointerType = event.pointerType;
    });
    profileImage.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse') advance();
    });
    profileImage.addEventListener('pointerleave', event => {
        if (event.pointerType === 'mouse') reset();
    });
    profileImage.addEventListener('click', () => {
        if (lastPointerType !== 'mouse') advance();
        lastPointerType = '';
    });
    profileImage.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            advance();
        }
    });
    document.addEventListener('pointerdown', event => {
        if (!profileImage.contains(event.target)) reset();
    });
}

// Footer update stamp (manual, as in the original).
const lastUpdatedElement = document.getElementById('lastUpdated');
if (lastUpdatedElement) {
    lastUpdatedElement.textContent = 'Last Updated: November 9, 2026';
}

// Mobile menu with accessible expanded state.
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');
if (hamburgerMenu && navLinks) {
    const setMenuOpen = open => {
        navLinks.classList.toggle('active', open);
        hamburgerMenu.classList.toggle('active', open);
        hamburgerMenu.setAttribute('aria-expanded', String(open));
        hamburgerMenu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    };
    hamburgerMenu.addEventListener('click', () => {
        setMenuOpen(hamburgerMenu.getAttribute('aria-expanded') !== 'true');
    });
    navLinks.addEventListener('click', event => {
        if (event.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setMenuOpen(false);
    });
    document.addEventListener('pointerdown', event => {
        if (!navLinks.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            setMenuOpen(false);
        }
    });
}

// Pastel progression on scroll, clamped to avoid NaN at the page boundaries.
const colors = ['#ffb1fc', '#99c9ff', '#a3ffc5', '#fff7ac', '#b7a3ff'];
function hexToRgb(hex) {
    return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    };
}
function interpolateColor(a, b, t) {
    const p = (key) => Math.round(a[key] + (b[key] - a[key]) * t);
    return `rgb(${p('r')}, ${p('g')}, ${p('b')})`;
}
let backgroundUpdateQueued = false;
window.addEventListener('scroll', () => {
    if (backgroundUpdateQueued) return;
    backgroundUpdateQueued = true;
    window.requestAnimationFrame(() => {
        backgroundUpdateQueued = false;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const scrollFraction = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        const position = scrollFraction * (colors.length - 1);
        const index = Math.min(colors.length - 2, Math.floor(position));
        document.body.style.backgroundColor = interpolateColor(
            hexToRgb(colors[index]), hexToRgb(colors[index + 1]), position - index
        );
    });
}, { passive: true });

// News accordion: works with Enter/Space through native button behavior.
const newsToggle = document.getElementById('news-toggle');
const newsContent = document.getElementById('news-content');
const newsIndicator = document.getElementById('news-indicator');
if (newsToggle && newsContent && newsIndicator) {
    newsToggle.addEventListener('click', () => {
        const expanded = newsToggle.getAttribute('aria-expanded') === 'true';
        newsToggle.setAttribute('aria-expanded', String(!expanded));
        newsContent.classList.toggle('show', !expanded);
        newsIndicator.textContent = expanded ? '▼' : '▲';
    });
}

// Inline project easter egg, also keyboard/touch accessible.
const romText = document.getElementById('rom-text');
if (romText) {
    const original = 'Elliot Huang';
    const surprise = 'Elliot Huang 😘';
    romText.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse') romText.textContent = surprise;
    });
    romText.addEventListener('pointerleave', event => {
        if (event.pointerType === 'mouse') romText.textContent = original;
    });
    romText.addEventListener('click', () => {
        romText.textContent = romText.textContent === original ? surprise : original;
    });
    romText.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            romText.textContent = romText.textContent === original ? surprise : original;
        }
    });
}
