const canvas: HTMLCanvasElement = document.querySelector('canvas')!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d')!;
let box = canvas.getBoundingClientRect()!;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    box = canvas.getBoundingClientRect();
});

// balls
const balls: {x: number, y: number, r: number, s: number, a: number}[] = [];
for(let i = 0; i < 1000; i++) {
    balls.push({
        x: random(1, canvas.width),
        y: random(1, canvas.height),
        r: random(1, 4),
        s: random(-2, 2),
        a: Math.random() / 3
    });
}

const gravity = 0.6;

function animate() {

    // set background
    c.fillStyle = 'rgb(36, 36, 51)';
    c.fillRect(0, 0, canvas.width, canvas.height);
 
    // apply gravity
    for(let i = 0; i < balls.length; i++) {
        balls[i].y += balls[i].r * gravity;
        balls[i].x += balls[i].s;
    }

    // check bounds
    for(let i = 0; i < balls.length; i++) {
        if(balls[i].y > box.bottom) {
            balls[i].y = - canvas.height / 3;
        }
        if(balls[i].x > box.right) {
            balls[i].x = box.left
        } else if(balls[i].x < box.left) {
            balls[i].x = box.right;
        }
    }

    // render balls
    for (let i = 0; i < balls.length; i++) {
        c.beginPath();
        c.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2);        
        c.fillStyle = `rgba(237, 230, 227, ${balls[i].a})`;
        c.fill();
    }

    requestAnimationFrame(animate)
}

function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

animate();