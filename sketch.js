let state = 0;
let font;
let transparency = 255;

// day tracker
let lastCheck = 0;
let counter = 0;
let track = 0;
let fade;
let fadeAmt = 1;

// inventory
let menu;
let menuP;
let bag;
let displayMenu = false;

// state 0
let bck, fire, chicken, egg;
let fireStatus = 100;
let noFireRestart = false;

// character sprites
let sprite, spriteLeft, spriteIdle, spriteIdleLeft, spriteAttack, spriteAttackLeft;
let witch;

// state 1
let bck2;
let woodman, house, wood = false, unlockHouse = false;
let woodCount = 0, buyWood = false;
let noBuyDialogue = false, eggBuy = false;

// state 2
let bck3, buffer, patio = false, patioGame, patioStatus = false;
let closeButton = false;
let well, water = 0, waterStatus = false;
let shrub1, shrub2, shrubs = [];
let key, keyT = 255, keyCollected = false;
let t1 = 255, t2 = 255, t3 = 255;

// state 3
let inventoryP;
let inventory, houseBg;
let placed = false;
let storeX = 39, storeY = 80;
let closeButton2 = false;
let furnType = '';
let cauldronCount = 0;
let bathtub, bed, bookshelf, canopy, cauldron, desk, wardrobe;
let bathtubF, bedF, bookshelfF, canopyF, cauldronF, deskF, wardrobeF;
let bathtubD = false, bedD = false, bookshelfD = false, canopyD = false, cauldronD = false, deskD = false, wardrobeD = false;
let store, storeStatus = false;

// potions
let potion = false;
let potionCount = 0;

// counters
let brew = 0;
let warmth = 100;
let eggTimer = 0, eggInterval = 20000, eggStatus = false, eggCount = 0;

function preload() {
    menuP = loadImage('images/menu.png');
    bag = loadImage('images/bag.png');

    // state 0
    bck = loadImage('images/bck.png');
    fire = loadImage('images/fire.gif');
    chicken = loadImage('images/chicken.gif');
    egg = loadImage('images/egg.png');

    // state 1
    bck2 = loadImage('images/bck2.png');
    woodman = loadImage('images/woodman.gif');
    house = loadImage('images/house.png');

    // state 2
    bck3 = loadImage('images/bck3.png');
    well = loadImage('images/well.png');
    patioGame = loadImage('images/patioGame.png');
    shrub1 = loadImage('images/shrub1.png');
    shrub2 = loadImage('images/shrub2.png');
    key = loadImage('images/key.png');

    // state 3
    inventoryP = loadImage('images/inventory.png');
    houseBg = loadImage('images/houseBg.png');
    bathtub = loadImage('images/furniture/bathtub.png');
    bed = loadImage('images/furniture/bed.png');
    bookshelf = loadImage('images/furniture/bookshelf.png');
    canopy = loadImage('images/furniture/canopy.png');
    cauldron = loadImage('images/furniture/cauldron.png');
    desk = loadImage('images/furniture/desk.png');
    wardrobe = loadImage('images/furniture/wardrobe.png');

    // character sprites
    sprite = loadImage('images/witch.png');
    spriteLeft = loadImage('images/witchLeft.png');
    spriteIdle = loadImage('images/witchIdle.png');
    spriteIdleLeft = loadImage('images/witchIdleLeft.png');
    spriteAttack = loadImage('images/witchAttack.png');
    spriteAttackLeft = loadImage('images/witchAttackLeft.png');

    // fonts
    font = loadFont('fonts/headliner/HeadlinerNo45-59y8.ttf');

    // sounds
    waterSound = loadSound('sounds/water.wav');
    inventorySound = loadSound('sounds/inventory.wav');
    menuSound = loadSound('sounds/menu.wav');
    doorSound = loadSound('sounds/door.wav');
    woodSound = loadSound('sounds/wood.wav');
    brewSound = loadSound('sounds/brewing.wav');
    potionCollect = loadSound('sounds/potion.mp3');
    furnitureSound = loadSound('sounds/furniture.wav');
    sweep = loadSound('sounds/sweep.wav');
    collect = loadSound('sounds/collect.wav');
    eggSound = loadSound('sounds/egg.wav');
    footsteps = loadSound('sounds/footsteps.wav');
    forest = loadSound('sounds/forest.mov');
    houseSound = loadSound('sounds/house.mov');
}

function setup() {
    let c = createCanvas(800, 500);
    c.parent("#container");

    fade = 0;

    // witch character
    witch = new Witch(350, 340, 32, 48, sprite);

    // for gazebo game
    buffer = createGraphics(600, 350);

    for (let i = 0; i < 10; i++) {
        let temp;
        if (i % 2 === 0) {
            temp = new Shrub(random(30, 570), shrub1, i);
        }
        else {
            temp = new Shrub(random(30, 570), shrub2, i);
        }
        shrubs.push(temp);
    }

    // inventory
    menu = createGraphics(600, 350);

    // furniture store
    inventory = createGraphics(600, 350);

    // furniture store
    store = createGraphics(600, 350);

    // furniture objects
    bedF = new Bed(bed, bed.width / 2.2, bed.height / 2, 1);
    bathtubF = new Bath(bathtub, bathtub.width / 3, bathtub.height / 3, 2);
    bookshelfF = new Bookshelf(bookshelf, bookshelf.width / 2.5, bookshelf.height / 2.5, 3);
    canopyF = new Canopy(canopy, canopy.width / 2.5, canopy.height / 2.5, 5);
    cauldronF = new Cauldron(cauldron, cauldron.width / 15, cauldron.height / 15, 1);
    deskF = new Desk(desk, desk.width / 3, desk.height / 3, 2);
    wardrobeF = new Wardrobe(wardrobe, wardrobe.width / 2.5, wardrobe.height / 2.5, 5);
}

function draw() {
    if (state !== 4 || state !== 3) {
        if (forest.isPlaying() === false) {
            forest.play();
            forest.setLoop(true);
        }
    }

    // setting font for game
    textSize(12);
    textFont(font);
    textAlign(CENTER);
    fill(167, 185, 170);

    if (potion === true) {
        if (brew < 100) {
            brew += 0.05;
        }
    }

    // fire status
    if (fireStatus > 0) {
        fireStatus -= 0.005;
    }

    if (state === 0) {
        // background
        imageMode(CORNER);
        image(bck, 0, 0, 800, 500);

        // navigation arrows
        textFont('Arial');
        text('←', 20, 479);
        textFont(font);
        text('To House', 45, 480);

        if (fireStatus === 0 && dist(witch.x, 0, 400, 0) < 100 && noFireRestart === false) {
            text('Your fire has died. Restart it with firewood?', width / 2, 460);
            text('Press R to restart', width / 2, 480);
        }

        if (fireStatus === 0 && dist(witch.x, 0, 400, 0) < 100 && noFireRestart === true) {
            text("Not enough wood", width / 2, 460);
        }
        else {
            noFireRestart = false;
        }

        textFont('Arial');
        text('→', 780, 479);
        textFont(font);
        text('To Gazebo', 757, 480);

        // fire
        imageMode(CENTER);
        image(fire, 400, 335);

        // chicken
        image(chicken, 600, 345);

        // egg
        if (eggStatus === true) {
            image(egg, 620, 345);
        }

        // display egg
        if (millis() - eggTimer > eggInterval) {
            eggStatus = true;
            eggTimer = millis();
        }

        if (witch.x > 800) {
            state = 2;
            witch.x = 0;
        }

        if (witch.x < 0) {
            state = 1;
            witch.x = 800;
        }
    }

    if (state === 1) {
        // background
        imageMode(CORNER);
        image(bck2, 0, 0, 800, 500);

        // navigation arrows
        textSize(12);
        textFont('Arial');
        text('→', 780, 479);
        textFont(font);
        text('To Fire', 757, 480);

        // woodcutter
        imageMode(CENTER);
        image(woodman, 150, 335);

        // house
        image(house, 515, 305);

        if (dist(witch.x, 0, 150, 0) < 60) {
            fill(167, 185, 170);
            textSize(12);
            text('press X to chat', 150, 290);

            // talk to woodcutter
            textAlign(CENTER);
            fill(167, 185, 170);
            textSize(14);

            if (wood === true && noBuyDialogue === false && eggBuy === false) {
                buyWood = true;
                text("Would you like to buy some wood? It'll cost you an egg.", width / 2, 450);
                text("Press Y to buy", width / 2, 480);
            }
            if (noBuyDialogue === true) {
                text("Sorry, come back when you have enough eggs", width / 2, 460);
            }
            if (eggBuy === true) {
                text("Thanks for buying!", width / 2, 460);
            }
        }
        else {
            eggBuy = false;
            noBuyDialogue = false;
            wood = false;
        }

        // unlock house
        if (dist(witch.x, 0, 518.5, 0) < 10) {
            fill(167, 185, 170);
            textSize(12);
            text('press U to enter', 518.5, 300);

            if (unlockHouse === true) {
                fill(167, 185, 170);
                textSize(14);
                if (keyCollected === false) {
                    text('You do not have a key.', width / 2, 450);
                }
                else {
                    doorSound.play();
                    forest.stop();
                    state = 3;
                    witch.y = 365;
                    witch.x = 180;
                }
            }
        }
        else {
            unlockHouse = false;
        }

        // canvas constraints
        if (witch.x > 800) {
            state = 0;
            witch.x = 0;
        }
        if (witch.x < 15) {
            witch.x = 15;
        }
    }

    if (state === 2) {
        imageMode(CORNER);
        image(bck3, 0, 0, 800, 500);

        // well
        imageMode(CENTER);
        image(well, 230, 330);

        // unlock house
        if (dist(witch.x, 0, 230, 0) < 10) {
            waterStatus = true;
            fill(167, 185, 170);
            textSize(12);
            text('press w to draw water', width / 2, 450);
        }

        // navigation arrows
        textSize(12);
        textFont('Arial');
        text('←', 20, 479);
        textFont(font);
        text('To Fire', 45, 480);

        if (witch.x < 0) {
            state = 0;
            witch.x = 800;
        }

        if (witch.x > 785) {
            witch.x = 785;
        }

        if (dist(witch.x, 0, 640, 0) < 15) {
            textSize(12);
            text('Press c to clean', 640, 300);
            patioStatus = true;
        }

        if (patio === true) {
            // buffer canvas
            imageMode(CENTER);
            image(buffer, width / 2, height / 2);

            // buffer background
            buffer.image(patioGame, 0, 0, 600, 350);

            // shrub images
            for (let i = 0; i < shrubs.length; i++) {
                shrubs[i].display();
            }

            // close button
            buffer.noStroke();
            buffer.fill(167, 185, 170);
            buffer.rect(585, 0, 600, 15);
            buffer.fill(255);
            buffer.text('X', 593, 12);

            buffer.textAlign(CENTER);
            buffer.textFont(font);
            buffer.textSize(14);
            buffer.text('Move your mouse around to clean the shrubs up. Pick up any hidden objects you may find', buffer.width / 2, 30);

            if (dist(mouseX, mouseY, 691, 82) < 5) {
                closeButton = true;
            }
            else {
                closeButton = false;
            }
        }
    }

    if (state === 3 && unlockHouse === true) {
        if (houseSound.isPlaying() === false) {
            houseSound.play();
            houseSound.setLoop(true);
        }

        // background
        imageMode(CORNER);
        image(houseBg, 0, 0, 800, 500);

        // font
        fill(167, 185, 170);
        textSize(12);

        // furniture
        imageMode(CENTER);

        // store button
        fill(0);
        rectMode(CORNER)
        rect(0, 480, 30, 20);
        fill(255);
        text('Store', 15, 495);

        if (storeStatus === true) {
            placed = true;
            imageMode(CENTER);
            image(store, width / 2, height / 2);
            store.image(inventoryP, 0, 0, 600, 350);

            // menu item selector
            store.fill(0);
            store.noFill();
            store.stroke(255);
            store.strokeWeight(4);
            store.rect(storeX, storeY, 85, 85);
            store.noStroke();

            // menu instructions
            store.fill(0);
            store.textFont('Arial')
            store.textSize(10);
            store.text('J = left, L = right, I = up, M = down. Click anywhere to close', 310, 340);

            // item name and description display
            store.textSize(30);
            store.textFont(font);
            store.text('FURNITURE STORE', 20, 40);
            if (storeX === 39 && storeY === 80) {
                furnType = 'canopy';
                store.text('Canopy', 400, 250);
                store.textSize(14);
                store.text('Cost: 5 potions. Press ENTER to buy', 400, 280);
            }
            if (storeX === 144 && storeY === 80) {
                furnType = 'bed';
                store.text('Bed', 400, 250);
                store.textSize(14);
                store.text('Cost: 1 potion. Press ENTER to buy', 400, 280);
            }
            if (storeX === 249 && storeY === 80) {
                furnType = 'wardrobe';
                store.text('Wardrobe', 400, 250);
                store.textSize(14);
                store.text('Cost: 5 potions. Press ENTER to buy', 400, 280);
            }
            if (storeX === 354 && storeY === 80) {
                furnType = 'bookshelf';
                store.text('Bookshelf', 400, 250);
                store.textSize(14);
                store.text('Cost: 3 potions. Press ENTER to buy', 400, 280);
            }
            if (storeX === 39 && storeY === 185) {
                furnType = 'desk';
                store.text('Desk', 400, 250);
                store.textSize(14);
                store.text('Cost: 2 potions. Press ENTER to buy', 400, 280);
            }
            if (storeX === 144 && storeY === 185) {
                furnType = 'bathtub';
                store.text('Bathtub', 400, 250);
                store.textSize(14);
                store.text('Cost: 2 potions. Press ENTER to buy', 400, 280);
            }
            if (storeX === 249 && storeY === 185) {
                furnType = 'cauldron';
                store.text('Cauldron', 400, 250);
                store.textSize(14);
                store.text('Cost: Free! Press ENTER to buy', 400, 280);
            }
            store.text('You have ' + potionCount + ' potions', 500, 20);
        }
        else {
            placed = false;
        }

        // displaying placed furniture
        if (storeStatus === false) {
            if (canopyD === true) {
                if (eggCount <= 5) {
                    canopyF.display();
                }
            }
            if (bedD === true) {
                bedF.display();

            }
            if (wardrobeD === true) {
                wardrobeF.display();

            }
            if (bookshelfD === true) {
                bookshelfF.display();

            }
            if (deskD === true) {
                deskF.display();

            }
            if (bathtubD === true) {
                bathtubF.display();

            }
            if (cauldronD === true) {
                cauldronF.display();
            }
        }

        // movement constraints
        if (witch.x > 800) {
            witch.x = 800;
        }
        if (witch.x < 15) {
            witch.x = 15;
        }

        // stair movement
        if (dist(witch.x, witch.y, 630, 365) < 15) {
            text('Press the up arrow to go upstairs', width / 2, 480);
        }
        if (witch.x > 615) {
            if (witch.y > 185 && keyIsDown(UP_ARROW)) {
                witch.y = 180;
                witch.x = 770;
            }
        }

        if (dist(witch.x, witch.y, 770, 180) < 15) {
            text('Press the down arrow to go downstairs', width / 2, 480);
        }
        if (witch.x > 760) {
            if (witch.y < 200 && keyIsDown(DOWN_ARROW)) {
                witch.y = 365;
                witch.x = 630;
            }
        }

        // exit house
        if (dist(witch.x, witch.y, 180, 365) < 15 && storeStatus === false && displayMenu === false) {
            fill(255);
            text('Press DELETE to exit', width / 2, 480);

            if (keyIsDown(8)) {
                doorSound.play();
                houseSound.stop();
                state = 1;
                unlockHouse = false;
                witch.y = 340;
                witch.x = 520;
            }
        }
    }

    if (state === 4) {
        background(1, 47, 40);
        textSize(42);
        text('Froze to Death', width / 2, height / 2);
        textSize(18);
        text('You survived ' + counter + ' days', width / 2, (height / 2) + 30);
        image(sprite, 390, 300, 32, 48,
            0, 2 * 48, 32, 48);
    }

    // witch character, hp bars, and counters
    if (patio === false && storeStatus === false && state !== 4) {
        witch.display();
        witch.move();

        // hp bar
        textSize(12);
        fill(255);
        text('Potion', 610, 24);
        stroke(69, 101, 91);
        noFill();
        rect(630, 15, 150, 10);
        noStroke();
        fill(69, 101, 91);
        rect(630, 15, map(brew, 0, 100, 0, 150), 10);

        // warmth bar
        fill(255);
        text('Warmth', 610, 50);
        stroke(69, 101, 91);
        noFill();
        rect(630, 40, 150, 10);
        noStroke();
        fill(69, 101, 91);
        rect(630, 40, map(warmth, 0, 100, 0, 150), 10);

        // fire health bar
        fill(255);
        text('Fire', 610, 76);
        stroke(69, 101, 91);
        noFill();
        rect(630, 67, 150, 10);
        noStroke();
        fill(69, 101, 91);
        rect(630, 67, map(fireStatus, 0, 100, 0, 150), 10);

        // froze to death
        if (warmth <= 0) {
            state = 4;
        }

        // inventory icon
        image(bag, 20, 20, 35, 35);
        if (dist(mouseX, mouseY, 20, 20) < 15) {
            text('Inventory', 23, 50);
        }

        // inventory
        fill(30);
        textSize(18);
        if (displayMenu === true) {
            imageMode(CENTER);
            image(menu, width / 2, height / 2);
            menu.image(menuP, 0, 0, 600, 350);

            menu.textFont(font);
            menu.textSize(36);
            menu.fill(30);
            menu.text('Inventory', 45, 50);
            menu.textSize(14);
            menu.text('Press SPACE to close', 45, 70);

            // egg
            if (dist(180, 250, mouseX, mouseY) < 50) {
                text('Egg x ' + eggCount, width / 2, 335);
                textSize(14);
                text('Trade it in for wood or use it to brew a potion.', width / 2, 355);
            }
            // wood
            if (dist(300, 250, mouseX, mouseY) < 50) {
                text('Wood x ' + woodCount, width / 2, 335);
                textSize(14);
                text('Obtained from the woodcutter. Feed it to your fire.', width / 2, 355);
            }
            // key
            if (dist(400, 250, mouseX, mouseY) < 50) {
                if (keyCollected === true) {
                    text('Key x 1', width / 2, 335);
                    textSize(14);
                    text('Found it hiding in the gazebo. Can unlock the house.', width / 2, 355);
                }
                else {
                    text('Key x 0' + key, width / 2, 335);
                    textSize(14);
                    text('Lost somewhere on the map...', width / 2, 355);
                }
            }
            // water
            if (dist(505, 250, mouseX, mouseY) < 50) {
                text('Water x ' + water, width / 2, 335);
                textSize(14);
                text('Obtained from the well. Use it to make a potion.', width / 2, 355);
            }
            // potion
            if (dist(615, 250, mouseX, mouseY) < 50) {
                text('Potion x ' + potionCount, width / 2, 335);
                textSize(14);
                text('Brewed using water and eggs. Trade it in for furniture.', width / 2, 355);
            }
        }

        fill(167, 185, 170);
        textAlign(CENTER);
        textSize(18);

        // day cycle tracker
        if (millis() > lastCheck + 1000) {
            lastCheck = millis();
            track++;
        }

        if (track % 60 === 0) {
            counter = track / 60;
            fill(255);
            textSize(52);
            text('Day ' + track / 60, width / 2, height / 2);
        }

        textSize(14);
        text('Day ' + counter, width / 2, 30);
    }
}

function mouseClicked() {
    // inventory
    if (dist(mouseX, mouseY, 20, 20) < 15) {
        displayMenu = true;
        inventorySound.play();
    }

    // collect egg
    if (state === 0 && dist(mouseX, mouseY, 620, 345) < 10) {
        if (eggStatus === true) {
            eggCount++;
            eggStatus = false;
            eggSound.play();
        }
    }
    // close buffer canvas
    if (patio === true && closeButton === true) {
        buffer.clear();
        patio = false;
    }
    // close store 
    if (storeStatus = true && closeButton2 === true) {
        store.clear();
        storeStatus = false;
    }
    // open store
    if (state === 3 && storeStatus === false) {
        if (dist(mouseX, mouseY, 0, 480) < 20) {
            storeStatus = true;
        }
    }
}

function keyPressed() {
    // x pressed
    if (keyCode === 88) {
        if (state === 1) {
            wood = true;
        }
    }

    // space pressed
    if (keyCode === 32) {
        if (displayMenu === true) {
            displayMenu = false;
            inventorySound.play();
        }
    }

    // u pressed
    if (keyCode === 85) {
        if (state === 1) {
            unlockHouse = true;
        }
    }

    // w pressed
    if (keyCode === 87) {
        if (state === 2 && waterStatus === true) {
            if (water < 5) {
                water++;
                waterSound.play();
            }
        }
    }

    // c pressed
    if (keyCode === 67) {
        if (state === 2 && patioStatus === true) {
            patio = true;
        }
    }

    // y pressed
    if (keyCode === 89) {
        if (buyWood === true && wood === true && state === 1) {
            if (eggCount > 0) {
                eggCount--;
                woodCount += 5;
                eggBuy = true;
                if (woodSound.isPlaying() === false) {
                    woodSound.play();
                }
            }
            else {
                noBuyDialogue = true;
            }
        }
    }

    // r pressed
    if (keyCode === 82) {
        if (state === 0 && woodCount > 0) {
            woodCount--;
            fireStatus = 100;
            if (woodSound.isPlaying() === false) {
                woodSound.play();
            }
        }
        else {
            noFireRestart = true;
        }
    }

    // b pressed
    if (keyCode === 66 && state === 3) {
        if (water > 0 && eggCount > 0) {
            potion = true;
            water--;
            eggCount--;
            brewSound.play();
        }
    }

    // p pressed
    if (keyCode === 80) {
        if (brew >= 100) {
            potion = false;
            brew = 0;
            potionCount++;
            potionCollect.play();
        }
    }

    // for furniture store
    if (keyCode === 76) {
        if (storeX === 249) {
            if (storeY !== 185) {
                storeX += 105;
                menuSound.play();
            }
        }
        else {
            storeX += 105;
            menuSound.play();
        }
    }
    if (keyCode === 74) {
        storeX -= 105;
        menuSound.play();
    }
    if (keyCode === 77 && storeX !== 354) {
        storeY += 105;
        menuSound.play();
    }
    if (keyCode === 73) {
        storeY -= 105;
        menuSound.play();
    }
    storeX = constrain(storeX, 39, 354);
    storeY = constrain(storeY, 80, 185);

    // placing furniture
    if (keyCode === 13 && placed === true) {
        if (storeX === 39 && storeY === 80 && potionCount >= 5) {
            canopyD = true;
            storeStatus = false;
        }
        if (storeX === 144 && storeY === 80 && potionCount >= 1) {
            bedD = true;
            storeStatus = false;
        }
        if (storeX === 249 && storeY === 80 && potionCount >= 5) {
            wardrobeD = true;
            storeStatus = false;
        }
        if (storeX === 354 && storeY === 80 && potionCount >= 3) {
            bookshelfD = true;
            storeStatus = false;
        }
        if (storeX === 39 && storeY === 185 && potionCount >= 2) {
            deskD = true;
            storeStatus = false;
        }
        if (storeX === 144 && storeY === 185 && potionCount >= 2) {
            bathtubD = true;
            storeStatus = false;
        }
        if (storeX === 249 && storeY === 185) {
            cauldronD = true;
            storeStatus = false;
        }
    }
}

function mouseMoved() {
    if (patio === true) {
        if (sweep.isPlaying() === false) {
            sweep.play();
        }
    }
}