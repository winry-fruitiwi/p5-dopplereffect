/*
@author Winry
@date 2021-11-06

code plan:
    create SoundWave class
        constructor(x, y) {this.pos, this.lifetime, this.r}
        update, show, isExpired
    create Speaker class
        constructor(x, y) {this.pos, this.vel, this.acc, this.lifetime, this.r}
        update, applyForce, show, emit (speakers emit sound waves)
    add rainbow colors
    maybe add some sort of cool addition, like calculating what frequency of
    sounds a point gets

 */
let font
let tigrexRoar // nothing is louder than a Tigrex's roar!

function preload() {
    font = loadFont('data/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    tigrexRoar = new SoundWave(width / 2, height / 2)
}

function draw() {
    background(234, 34, 24)
    tigrexRoar.show()
    tigrexRoar.update()
}

class SoundWave {
    constructor(x, y) {
        // sound waves stay in the same place so we'll leave vel and acc out
        this.pos = new p5.Vector(x, y)

        // controls the opacity of the wave and determines the radius
        this.lifetime = 100
        // controlled by lifetime
        this.radius = 10
    }

    show() {
        noFill()
        stroke(0, 0, 100, this.lifetime)
        circle(this.pos.x, this.pos.y, this.radius * 2)
    }

    update() {
        // controls the decrement for the lifetime and increment for the radius
        const DECREMENT = 2

        this.lifetime -= DECREMENT
        this.radius += DECREMENT
    }

    // has the wave passed away yet?
    isExpired() {
        return this.lifetime <= 0
    }
}
