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

function preload() {
    font = loadFont('data/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
}

function draw() {
    background(234, 34, 24)
}