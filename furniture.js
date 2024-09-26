class Bed {
    constructor(img, w, h, cost) {
        this.w = w;
        this.h = h;
        this.img = img;
        this.pos = false;
        this.cost = cost;
        this.absX = mouseX;
        this.absY = mouseY;
        this.decrease = true;
    }

    display() {
        if (this.decrease === true) {
            potionCount -= this.cost;
            this.decrease = false;
        }

        // furniture follows the mouse
        if (this.pos === false) {
            image(this.img, mouseX, mouseY, this.w, this.h);
        }

        // if furniture is placed
        if ((mouseY > 0 && mouseY < 500) && (mouseX > 0 && mouseX < 800)) {
            if (mouseIsPressed && this.pos === false) {
                this.pos = true;
                this.absX = mouseX;
                this.absY = mouseY;
                furnitureSound.play();
            }
        }

        // fixes position of furniture permanently 
        if (this.pos === true) {
            this.x = this.absX;
            this.y = this.absY;
            image(this.img, this.x, this.y, this.w, this.h);
            this.pos = true;
        }
    }
}

class Bath {
    constructor(img, w, h, cost) {
        this.w = w;
        this.h = h;
        this.img = img;
        this.pos = false;
        this.cost = cost;
        this.absX = mouseX;
        this.absY = mouseY;
        this.decrease = true;
    }

    display() {
        if (this.decrease === true) {
            potionCount -= this.cost;
            this.decrease = false;
        }

        // furniture follows the mouse
        if (this.pos === false) {
            image(this.img, mouseX, mouseY, this.w, this.h);
        }

        // if furniture is placed
        if ((mouseY > 0 && mouseY < 500) && (mouseX > 0 && mouseX < 800)) {
            if (mouseIsPressed && this.pos === false) {
                this.pos = true;
                this.absX = mouseX;
                this.absY = mouseY;
                furnitureSound.play();
            }
        }

        // fixes position of furniture permanently 
        if (this.pos === true) {
            this.x = this.absX;
            this.y = this.absY;
            image(this.img, this.x, this.y, this.w, this.h);
            this.pos = true;
        }
    }
}

class Bookshelf {
    constructor(img, w, h, cost) {
        this.w = w;
        this.h = h;
        this.img = img;
        this.pos = false;
        this.cost = cost;
        this.absX = mouseX;
        this.absY = mouseY;
        this.decrease = true;
    }

    display() {
        if (this.decrease === true) {
            potionCount -= this.cost;
            this.decrease = false;
        }

        // furniture follows the mouse
        if (this.pos === false) {
            image(this.img, mouseX, mouseY, this.w, this.h);
        }

        // if furniture is placed
        if ((mouseY > 0 && mouseY < 500) && (mouseX > 0 && mouseX < 800)) {
            if (mouseIsPressed && this.pos === false) {
                this.pos = true;
                this.absX = mouseX;
                this.absY = mouseY;
                furnitureSound.play();
            }
        }

        // fixes position of furniture permanently 
        if (this.pos === true) {
            this.x = this.absX;
            this.y = this.absY;
            image(this.img, this.x, this.y, this.w, this.h);
            this.pos = true;
        }
    }
}

class Canopy {
    constructor(img, w, h, cost) {
        this.w = w;
        this.h = h;
        this.img = img;
        this.pos = false;
        this.cost = cost;
        this.absX = mouseX;
        this.absY = mouseY;
        this.decrease = true;
    }

    display() {
        if (this.decrease === true) {
            potionCount -= this.cost;
            this.decrease = false;
        }

        // furniture follows the mouse
        if (this.pos === false) {
            image(this.img, mouseX, mouseY, this.w, this.h);
        }

        // if furniture is placed
        if ((mouseY > 0 && mouseY < 500) && (mouseX > 0 && mouseX < 800)) {
            if (mouseIsPressed && this.pos === false) {
                this.pos = true;
                this.absX = mouseX;
                this.absY = mouseY;
                furnitureSound.play();
            }
        }

        // fixes position of furniture permanently 
        if (this.pos === true) {
            this.x = this.absX;
            this.y = this.absY;
            image(this.img, this.x, this.y, this.w, this.h);
            this.pos = true;
        }
    }
}

class Cauldron {
    constructor(img, w, h, cost) {
        this.w = w;
        this.h = h;
        this.img = img;
        this.pos = false;
        this.cost = cost;
        this.absX = mouseX;
        this.absY = 365;
    }

    display() {

        // furniture follows the mouse
        if (this.pos === false) {
            image(this.img, mouseX, 365, this.w, this.h);
        }

        // if furniture is placed
        if ((mouseY > 0 && mouseY < 500) && (mouseX > 0 && mouseX < 800)) {
            if (mouseIsPressed && this.pos === false) {
                this.pos = true;
                this.absX = mouseX;
                this.absY = 365;
                furnitureSound.play();
            }
        }

        // fixes position of furniture permanently 
        if (this.pos === true) {
            this.x = this.absX;
            this.y = this.absY;
            image(this.img, this.x, this.y, this.w, this.h);
            this.pos = true;
        }

        if (dist(witch.x, witch.y, this.x, this.y) < 15 && potion === false) {
            text("Make a potion with 1 water and 1 egg? Press b to brew ", width / 2, 450);
        }
        if (dist(witch.x, witch.y, this.x, this.y) < 15 && potion === true && brew < 100) {
            text('Brewing', this.x, this.y - 20);
        }
        if (dist(witch.x, witch.y, this.x, this.y) < 15 && potion === true && brew >= 100) {
            text('Potion ready, press p to collect', this.x, this.y - 20);
        }
    }
}

class Desk {
    constructor(img, w, h, cost) {
        this.w = w;
        this.h = h;
        this.img = img;
        this.pos = false;
        this.cost = cost;
        this.absX = mouseX;
        this.absY = mouseY;
        this.decrease = true;
    }

    display() {
        if (this.decrease === true) {
            potionCount -= this.cost;
            this.decrease = false;
        }

        // furniture follows the mouse
        if (this.pos === false) {
            image(this.img, mouseX, mouseY, this.w, this.h);
        }

        // if furniture is placed
        if ((mouseY > 0 && mouseY < 500) && (mouseX > 0 && mouseX < 800)) {
            if (mouseIsPressed && this.pos === false) {
                this.pos = true;
                this.absX = mouseX;
                this.absY = mouseY;
                furnitureSound.play();
            }
        }

        // fixes position of furniture permanently 
        if (this.pos === true) {
            this.x = this.absX;
            this.y = this.absY;
            image(this.img, this.x, this.y, this.w, this.h);
            this.pos = true;
        }
    }
}

class Wardrobe {
    constructor(img, w, h, cost) {
        this.w = w;
        this.h = h;
        this.img = img;
        this.pos = false;
        this.cost = cost;
        this.absX = mouseX;
        this.absY = mouseY;
        this.decrease = true;
    }

    display() {
        if (this.decrease === true) {
            potionCount -= this.cost;
            this.decrease = false;
        }

        // furniture follows the mouse
        if (this.pos === false) {
            image(this.img, mouseX, mouseY, this.w, this.h);
        }

        // if furniture is placed
        if ((mouseY > 0 && mouseY < 500) && (mouseX > 0 && mouseX < 800)) {
            if (mouseIsPressed && this.pos === false) {
                this.pos = true;
                this.absX = mouseX;
                this.absY = mouseY;
                furnitureSound.play();
            }
        }

        // fixes position of furniture permanently 
        if (this.pos === true) {
            this.x = this.absX;
            this.y = this.absY;
            image(this.img, this.x, this.y, this.w, this.h);
            this.pos = true;
        }
    }
}