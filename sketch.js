let particles = [];
let num;
let radius;
let startX; 
let startY;
let t = 0;

function polToCart(r, angle) {
	return createVector(r * cos(angle), r * sin(angle));
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	translate(width/2, height/2);
	seed();
}

function draw() {
	translate(width/2, height/2);
	for (let i = 0; i < particles.length; i++) {
		particles[i].show();
		particles[i].move(i);
		particles[i].fade();
	}

	if (t > 500) {
		particles = [];
	}

	if (t > 750) {
		fill(0);
		rect(-windowWidth/2, -windowHeight/2, windowWidth, windowHeight);
		seed();
		t = 0;
	}

	t++;
}

function seed() {
	num = random(500, 5000);
	radius = random(100, 250);
	translate(width/2, height/2);
	const spacing = 360 / num;
	for (let a = 0; a < 360; a+=spacing) {
		let point = polToCart(radius, a);
		let particle = new Particle(point.x, point.y, 1, 255, a);
		particles.push(particle);
	}
}

class Particle {
	constructor(x, y, r, op, a) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.op = op;
		this.a = a;
		this.slow = 600;
		this.mov = .2;
		this.fadeT = 1;
		this.isFading = true;
	}

	show() {
		noStroke();
		fill(this.op, this.op, 255, 10);
		ellipse(this.x, this.y, this.r);
	}

	move(i) {
		let t = frameCount / 100.0;
		const wonkV = 100000;

		let wonk1 = map(sin(this.a * i), -1, 1, -wonkV, wonkV);
		let wonk2 = map(cos(this.a * i), -1, 1, -wonkV, wonkV);

		this.x += map(noise(t, wonk2 / this.slow), 0, 1, -this.mov, this.mov*1.1);
		this.y += map(noise(wonk1 / this.slow, t), 0, 1, -this.mov, this.mov*1.1);
	}

	fade() {
		if (this.isFading) {
			this.op -= this.fadeT;
		} else {
			this.op += this.fadeT;
		}
		if (this.op > 255) {
			this.isFading = true;
		}
		if (this.op < 200) {
			this.isFading = false;
		}
	}

}