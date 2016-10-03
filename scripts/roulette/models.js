// Game models
'use strict';

export class Roulette {
    constructor(context, image, x, y, width, height) {
        this.context = context;
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    drawRoulette() {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    rotateWheel(degrees) {
    this.context.clearRect(0,0,this.width,this.height);

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    this.context.save();

    // move to the center of the canvas
    this.context.translate(this.width/2,this.height/2);

    // rotate the canvas to the specified degrees
    this.context.rotate(degrees*Math.PI/180);

    // draw the image
    // since the context is rotated, the image will be rotated also
    this.context.drawImage(this.image,-this.image.width/2,-this.image.width/2);

    // we’re done with the rotating so restore the unrotated context
    this.context.restore();
    }
}
