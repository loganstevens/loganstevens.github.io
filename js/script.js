// Array of random image URLs | script.js
const imageArray = [
    "assets/img/profile1.png",
    "assets/img/profile2.png",
    "assets/img/profile3.png"
];

// Default image URL
const defaultImage = "profile.png";

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
