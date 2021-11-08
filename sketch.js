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
let tigrex // a Tigrex has a really loud roar!

function preload() {
    font = loadFont('data/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    rectMode(CENTER)
    tigrex = new Speaker(width/2, height/2)
}

function draw() {
    translate(width/2, height/2)
    background(234, 34, 24)

    tigrex.show()
    tigrex.pos = new p5.Vector(100*cos(frameCount/30), 100*sin(frameCount/30))
    tigrex.update()
    tigrex.emit()
}

class SoundWave {
    constructor(x, y, h, s, b) {
        // sound waves stay in the same place so we'll leave vel and acc out
        this.pos = new p5.Vector(x, y)

        // controls the opacity of the wave and determines the radius
        this.lifetime = 100
        // controlled by lifetime
        this.radius = 10
        // hue, saturation, value
        this.h = h
        this.s = s
        this.b = b
    }

    show() {
        noFill()
        stroke(this.h, this.s, this.b, this.lifetime)
        circle(this.pos.x, this.pos.y, this.radius * 2)
    }

    update() {
        // controls the decrement for the lifetime and increment for the radius
        const DECREMENT = 1

        this.lifetime -= DECREMENT
        this.radius += DECREMENT
    }

    // has the wave passed away yet?
    isExpired() {
        return this.lifetime <= 0
    }
}

class Speaker {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector()
        this.acc = new p5.Vector()

        // keeps track of the number of pulses this speaker has emitted
        this.soundWaves = []
    }

    show() {
        fill(0, 0, 100, 60)
        noStroke()
        square(this.pos.x, this.pos.y, 16)

        for (let wave of this.soundWaves) {
            wave.show()
        }
    }

    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.acc.mult(0) // equivalent to this.acc = new p5.Vector

        for (let i = 0; i < this.soundWaves.length; i++) {
            let wave = this.soundWaves[i]
            wave.update()
            if (wave.isExpired()) {
                this.soundWaves.splice(i, i)
            }
        }
    }

    applyForce(force) {
        // F=ma, but m = 1 so F=a
        this.acc.add(force)
    }

    emit() {
        if (frameCount % 2 === 0) {
            this.soundWaves.push(new SoundWave(
                this.pos.x,
                this.pos.y,
                frameCount % 360,
                80,
                80))
        }
    }
}
