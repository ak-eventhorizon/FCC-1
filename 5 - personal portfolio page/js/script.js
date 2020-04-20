'use strict';

const stars = {
    radiuses: [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5],
    areolas: [3, 5, 7, 10],
    colors: ['#ffffff','#c8c8c8','#fff4fe','#faf0db','#fbf9ff'],
};

function randomFromZeroTo(number){
    return Math.floor(Math.random() * number);
}

function randomElementFrom(array) {
    let randomItem = array[Math.floor(Math.random() * array.length)];
    return randomItem;
}



let canvas = document.getElementById('bg-stars-layer');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth; // set canvas width as viewport width
ctx.canvas.height = window.innerHeight; // set canvas height as viewport height


// create ordinary stars
function generateOrdinaryStars(number) {

    for (let i = 0; i < number; i++) {
        let x = randomFromZeroTo(canvas.width);
        let y = randomFromZeroTo(canvas.height);
        let r = randomElementFrom(stars.radiuses);
        let color = randomElementFrom(stars.colors);

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x,y,r,0,2*Math.PI); // arc(x, y, r, startAngle, endAngle)
        ctx.fill();
    }
}


// create stars with areola
function generateGradientStars(number) {

    for (let i = 0; i < number; i++) {
        let x = randomFromZeroTo(canvas.width);
        let y = randomFromZeroTo(canvas.height);
        let r = randomElementFrom(stars.radiuses);
        let areol = randomElementFrom(stars.areolas);
        let color = randomElementFrom(stars.colors);

        // Create gradient stars
        let grd = ctx.createRadialGradient(x,y,r, x,y,r*areol); // (x0, y0, r0, x1, y1, r1);
        grd.addColorStop(0, color);
        grd.addColorStop(1,"transparent");

        // Fill canvas with gradient stars
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // fillRect(x, y, width, height) 
    }
}


// create few dominant stars TODO
function generateDominantStars(number) {

    // CUSTOM STAR EXAMLPE
    let grd = ctx.createRadialGradient(140,140,2.5,140,140,100); 
    grd.addColorStop(0, stars.colors[0]);
    grd.addColorStop(1,"transparent");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}

// create Black hole TODO
function generateBlackHole(x,y,r) {

    // BLACK HOLE???
    let grd = ctx.createRadialGradient(x,y,r,x,y,r*1.25); 
    grd.addColorStop(0, 'black');
    grd.addColorStop(0.3, 'black');
    grd.addColorStop(0.3, 'white');
    grd.addColorStop(1,'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}


// refresh width/height & clear canvas
function refreshCanvas() {
    ctx.canvas.width  = window.innerWidth; 
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}