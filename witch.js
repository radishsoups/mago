class Witch {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.speed = 2;
        this.direction = 'left';

        this.totalFrames = int(this.img.height / this.h);
        this.currentFrame = 0;
        this.pauseCounter = 0;
        this.pauseCounterMax = 10;
    }

    display() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.w, this.h,
            0, this.currentFrame * this.h, this.w, this.h);

        // decrease pause counter
        this.pauseCounter--;

        if (this.pauseCounter <= 0) {
            this.currentFrame += 1;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0;
            }
            this.pauseCounter = this.pauseCounterMax;
        }
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.img = spriteLeft;
            this.totalFrames = 8;
            this.x -= this.speed;
            this.direction = 'left';
            this.w = 32;
            this.h = 48;
            if (footsteps.isPlaying() === false) {
                footsteps.play();
            }
        }
        else if (keyIsDown(RIGHT_ARROW)) {
            this.img = sprite;
            this.totalFrames = 8;
            this.x += this.speed;
            this.direction = 'right';
            this.w = 32;
            this.h = 48;
            if (footsteps.isPlaying() === false) {
                footsteps.play();
            }
        }

        // idle animation
        else {
            footsteps.stop();
            this.totalFrames = 6;
            this.w = 32;
            this.h = 48;
            if (this.direction === 'right') {
                this.img = spriteIdle;
            }
            else {
                this.img = spriteIdleLeft;
            }
        }

        // if too far from the fire
        if (dist(this.x, 0, 400, 0) > 250 && state === 0) {
            if (warmth > 0) {
                warmth -= 0.01;
            }
        }

        // warming back up
        if (dist(this.x, 0, 400, 0) < 100 && state === 0 && fireStatus > 0) {
            if (warmth > 0 && warmth < 100) {
                warmth += 0.05;
            }
        }

        if (state === 1) {
            warmth -= 0.001;
        }
        if (state === 2 && patio === false) {
            warmth -= 0.001;
        }
    }
}