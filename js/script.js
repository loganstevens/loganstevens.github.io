function isMobile() {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent); // Check if mobile device
}

const mobile = isMobile();

// Array of profile image URLs | script.js
const profileImageArray = [
    "assets/img/profile1.png",
    "assets/img/profile2.png",
    "assets/img/profile3.png",
    "assets/img/profile14.jpg",
    "assets/img/profile4.png",
    "assets/img/profile10.jpg",
    "assets/img/profile5.png",
    "assets/img/profile9.jpg",
    "assets/img/profile8.png",
    "assets/img/profile6.png",
    "assets/img/profile11.jpg",
    "assets/img/profile7.png",
    "assets/img/profile12.jpg",
    "assets/img/profile13.jpg",
    "assets/img/profile15.png"
];

// Array of VR2025 image URLs | script.js
const vr2025ImageArray = [
    "assets/img/vr2025-pose-1.JPG"
];

// Default image URL
const defaultProfileImage = "assets/img/profile.png";
const defaultVr2025Image = "assets/img/RDW-1.png";

/* --------------------------------------------------------------------------- */

// Function to get a random image

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * profileprofileImageArray.length);
    return profileprofileImageArray[randomIndex];
}

// Get the image element
const profileImage = document.getElementById('profileImage');
const vr2025Image = document.getElementById('vr2025Image');
let hasHovered = false;

// Add event listeners to change the image on hover

// profileImage.addEventListener('mouseenter', () => {
//     profileImage.src = getRandomImage(); // Change to random image on hover
// });

// profileImage.addEventListener('mouseleave', () => {
//     profileImage.src = defaultProfileImage; // Reset to default image when the mouse leaves
// });


/* --------------------------------------------------------------------------- */

// Get the profile image element
// const profileImage = document.getElementById('profileImage'); /* name !! */
let currentProfileImageIndex = 0;
let intervalId;

// Function to change the image
/*
function changeImage() {
    // Set the new image source
    profileImage.src = profileprofileImageArray[currentProfileImageIndex];
    // Update the index to the next image
    currentProfileImageIndex = (currentProfileImageIndex + 1) % profileImageArray.length; // Loop back to the first image
}
*/

function changeImage(image, array, index = 0) {
    // Set the new image source
    image.src = array[index];
}

// Add event listeners to change the image on hover
if (!hasHovered) {
    profileImage.classList.add('pulsate'); // Start pulsating effect
}

// Profile Image
if (!mobile) { // Not on Mobile (Desktop/Laptop)
    profileImage.addEventListener('mouseenter', () => {
        if (!hasHovered) {
            hasHovered = true; // Mark that the user has hovered
            profileImage.classList.remove('pulsate'); // Remove pulsating effect
        }
        changeImage(profileImage, profileImageArray, currentProfileImageIndex); // Change to new profile image on hover
        // Update the profile image index to the next image
        currentProfileImageIndex = (currentProfileImageIndex + 1) % profileImageArray.length; // Loop back to the first image
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.classList.remove('pulsate'); // Remove pulsating effect
        profileImage.src = defaultProfileImage; // Reset to default image when the mouse leaves
    });
}

else { // On Mobile
    profileImage.addEventListener('click', () => {
        if (!hasHovered) {
            hasHovered = true; // Mark that the user has hovered
            // profileImage.classList.remove('pulsate');
        }
        changeImage(profileImage, profileImageArray, currentProfileImageIndex); // Change to new profile image on hover
        // Update the profile image index to the next image
        currentProfileImageIndex = (currentProfileImageIndex + 1) % profileImageArray.length; // Loop back to the first image
    });
    
    document.addEventListener('click', (event) => {
        if (!profileImage.contains(event.target)) {
            profileImage.classList.remove('pulsate'); // Remove pulsating effect
            profileImage.src = defaultProfileImage; // Reset to default image when the mouse leaves
        }
    });
}

// VR2025 Image
if (!mobile) { // Not on Mobile (Desktop/Laptop)
    vr2025Image.addEventListener('mouseenter', () => {
        changeImage(vr2025Image, vr2025ImageArray); // Change to new VR image on hover
    });
    
    vr2025Image.addEventListener('mouseleave', () => {
        vr2025Image.src = defaultVr2025Image; // Reset to default VR image when the mouse leaves
    });
}

else { // On Mobile
    vr2025Image.addEventListener('click', () => {
        changeImage(vr2025Image, vr2025ImageArray); // Change to new VR image on hover
    });
    
    document.addEventListener('click', (event) => {
        if (!profileImage.contains(event.target)) {
            vr2025Image.src = defaultVr2025Image; // Reset to default image when the mouse leaves
        }
    });
}

// Event listeners for mouse over and out
// profileImage.addEventListener('mouseenter', () => {
//     // Change image every 500ms (adjust as needed)
//     intervalId = setInterval(changeImage, 500);
// });

// profileImage.addEventListener('mouseleave', () => {
//     clearInterval(intervalId); // Stop changing images
//     profileImage.src = defaultProfileImage; // Reset to default image
// });

/* --------------------------------------------------------------------------- */

// Get the elements where the view count and last updated time will be displayed
// const viewCounterElement = document.getElementById('viewCounter');
const lastUpdatedElement = document.getElementById('lastUpdated');

// View Counter
/*
function updateViewCounter() {
    // Check if the view count already exists in localStorage
    let viewCount = localStorage.getItem('viewCount');
    if (viewCount === null) {
        viewCount = 0;  // Initialize if it's the first visit
    }
    viewCount = parseInt(viewCount) + 1;  // Increment the view count
    localStorage.setItem('viewCount', viewCount);  // Store updated view count
    viewCounterElement.textContent = `Page Views: ${viewCount}`;  // Display the view count
}
*/

// Display last updated time
function updateLastUpdatedTime() {
    // You can manually set this date or fetch it dynamically from a backend
    const lastUpdated = 'March 31, 2025, 2:10 AM | EST';  // Replace with your actual update time
    lastUpdatedElement.textContent = `Last Updated: ${lastUpdated}`;  // Display the last updated time
}

// Run the functions when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // updateViewCounter();  // Update the view counter on page load
    updateLastUpdatedTime();  // Update the last updated time on page load
});

/* --------------------------------------------------------------------------- */

// Get elements
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

// Toggle the navigation menu on click
hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle the visibility of the nav links
    hamburgerMenu.classList.toggle('active'); // Animate the hamburger icon
});

navLinks.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle the visibility of the nav links
    hamburgerMenu.classList.toggle('active'); // Animate the hamburger icon
});

/* --------------------------------------------------------------------------- */

// Define the list of colors in HEX format
const colors = [
    "#ffb1fc", // pink
    "#99c9ff", // light blue
    "#a3ffc5", // mint green
    "#fff7ac", // light yellow
    "#b7a3ff"  // lavender
];

// Function to convert hex to RGB
function hexToRgb(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

// Function to interpolate between two RGB colors
function interpolateColor(color1, color2, factor) {
    var r = Math.round(color1.r + (color2.r - color1.r) * factor);
    var g = Math.round(color1.g + (color2.g - color1.g) * factor);
    var b = Math.round(color1.b + (color2.b - color1.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
}

window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercentage = scrollPosition / maxScroll;

    // Calculate which two colors to interpolate between
    var colorIndex = Math.floor(scrollPercentage * (colors.length - 1));
    var nextColorIndex = Math.min(colorIndex + 1, colors.length - 1); // Prevent going out of bounds

    // Get the RGB values for the current and next colors
    var color1 = hexToRgb(colors[colorIndex]);
    var color2 = hexToRgb(colors[nextColorIndex]);

    // Calculate the interpolation factor
    var factor = (scrollPercentage * (colors.length - 1)) - colorIndex;

    // Get the interpolated color and apply it to the background
    var interpolatedColor = interpolateColor(color1, color2, factor);
    document.body.style.backgroundColor = interpolatedColor;
});

/* --------------------------------------------------------------------------- */

// Get elements for the news section
const newsHeader = document.getElementById('news-header');
const newsContent = document.getElementById('news-content');
const newsIndicator = document.getElementById('news-indicator');

// Toggle the news section and indicator
newsHeader.addEventListener('click', () => {
    const isVisible = newsContent.style.display === 'block';
    newsContent.style.display = isVisible ? 'none' : 'block';
    newsIndicator.textContent = isVisible ? '▼' : '▲'; // Change the indicator
});

/* --------------------------------------------------------------------------- */

const romText = document.getElementById('rom-text');

romText.addEventListener('mouseover', function() {
    this.textContent = "Elliot Huang 😘";
});

romText.addEventListener('mouseout', function() {
    this.textContent = "Elliot Huang";
});
