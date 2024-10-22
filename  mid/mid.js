let image = document.querySelector(".img-icon img"); 
function showIntro() {
    document.getElementById('intro').style.display = 'block';
}

function hideIntro() {
    document.getElementById('intro').style.display = 'none';
}


image.addEventListener("mouseover", showIntro);
image.addEventListener("mouseout", hideIntro);
