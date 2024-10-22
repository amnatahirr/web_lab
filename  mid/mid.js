let image = document.querySelector(".img-icon img"); // Select the image inside the .img-icon div

function showIntro() {
    document.getElementById('intro').style.display = 'block';
}

function hideIntro() {
    document.getElementById('intro').style.display = 'none';
}

// Add event listeners without the "on" prefix
image.addEventListener("mouseover", showIntro);
image.addEventListener("mouseout", hideIntro);
