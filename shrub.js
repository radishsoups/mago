class Shrub {
    constructor(x, img, index) {
        this.x = x;
        this.y = 280;
        this.img = img;
        this.transparency = 255;
        this.index = index;
    }

    display() {
        // mouse position for buffer
        let mouseXbuffer = mouseX - 140;
        let mouseYbuffer = mouseY - 100;

        // key image
        if (this.index === 1) {
            if (keyT === 255) {
                buffer.image(key, this.x, this.y + 20, 20, 20);
            }
            if (mouseIsPressed === true && dist(mouseXbuffer + 20, mouseYbuffer + 20, this.x, this.y + 20) < 15) {
                keyT = 0;
                keyCollected = true;
                if (collect.isPlaying() === false) {
                    collect.play();
                }
            }
        }

        // display shrubs
        imageMode(CENTER);
        if (this.transparency === 255) {
            buffer.image(this.img, this.x, 290, 40, 40);
        }

        if (dist(mouseXbuffer, mouseYbuffer, this.x, 290) < 20) {
            this.transparency = 0;
        }
    }
}
