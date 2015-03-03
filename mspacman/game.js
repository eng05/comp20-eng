function init() {
canvas = document.getElementById('game_canvas');
ctx = canvas.getContext('2d');
var img = new Image();
img.src = "pacman10-hp-sprite.png";
img.addEventListener("load", function() {
ctx.drawImage(img, 320, 1, 465, 136, 0, 0, 465, 136);
ctx.drawImage(img, 82, 23, 15, 15, 38, 31, 15, 15);
}, false);
}