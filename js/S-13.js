// snake mosaico
var strElem='<div id="scoreboard"><small class="near-white">SCORE</small> <div id="score" class="dib gold mh2">0</div><small>BEST</small> <div class="dib gold" id="best-score">0</div>  🕹 <kbd>&larr;</kbd> <kbd>↓</kbd> <kbd>&rarr;</kbd> </div><canvas id="tscanv"></canvas>';

document.getElementById('tsparticles').insertAdjacentHTML('afterbegin',strElem);

const canvas = document.getElementById('tscanv');
canvas.style.width  = "144px";
canvas.style.height = "144px";

window.onload=function() {
    canv=document.getElementById("tscanv");
    ctx=canv.getContext("2d");
    setInterval(game,1000/6);
    document.addEventListener("keydown",keyPush);
}
//px=py=10;
//gs=tc=20;
//ax=ay=15;
//xv=yv=0;
px=py=8;
gs=tc=10;
ax=ay=10;
xv=yv=0;
trail=[];
tail = 5;
points = 0;
var score = document.getElementById('score');
var best = document.getElementById('best');
function game() {
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            flashScore();
            tail = 5;
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }
    if(ax==px && ay==py) {
        updateScore();
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
    }
}
function updateScore(){
    points++;
    score.innerText = points;
}
async function flashScore(){
    var s = document.getElementById('scoreboard');
    var a = document.getElementById('score');
    var b = document.getElementById('best-score');
    if (a.textContent > b.textContent){
        b.textContent = a.textContent;
    }
    s.classList.add("score-end");
    a = 0;
    setTimeout(function() {s.classList.remove("score-end");}, 2000);
    await sleep(1400);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


