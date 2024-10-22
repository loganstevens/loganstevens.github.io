// Array of random image URLs | script.js
const imageArray = [
    "assets/img/profile1.png",
    "assets/img/profile2.png",
    "assets/img/profile3.png",
    "assets/img/profile4.png",
    "assets/img/profile5.png",
    "assets/img/profile6.png",
    "assets/img/profile7.png",
    "assets/img/profile8.png"
];

// Default image URL
const defaultImage = "assets/img/profile.png";

// Function to get a random image
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
}

// Get the profile image element
const profileImage = document.getElementById('profileImage');

// Add event listeners to change the image on hover
profileImage.addEventListener('mouseenter', () => {
    profileImage.src = getRandomImage(); // Change to random image on hover
});

profileImage.addEventListener('mouseleave', () => {
    profileImage.src = defaultImage; // Reset to default image when the mouse leaves
});

/* --------------------------------------------------------------------------- */

// Get the elements where the view count and last updated time will be displayed
const viewCounterElement = document.getElementById('viewCounter');
const lastUpdatedElement = document.getElementById('lastUpdated');

// View Counter
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

// Display last updated time
function updateLastUpdatedTime() {
    // You can manually set this date or fetch it dynamically from a backend
    const lastUpdated = 'October 20, 2024, 10:00 AM';  // Replace with your actual update time
    lastUpdatedElement.textContent = `Last Updated: ${lastUpdated}`;  // Display the last updated time
}

// Run the functions when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateViewCounter();  // Update the view counter on page load
    updateLastUpdatedTime();  // Update the last updated time on page load
});
