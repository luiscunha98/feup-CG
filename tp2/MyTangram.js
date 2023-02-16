import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.diamond = new MyDiamond(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
    }

    display() {

        this.triangle.display();

        this.scene.pushMatrix();
        this.scene.scale(1 / 2, 1 / 2, 1 / 2);
        this.scene.translate(4, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -2, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.scale(1 / 2, 1 / 2, 1 / 2);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(1.5, 1.5, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate((3 * Math.PI) / 4, 0, 0, 1);
        this.scene.scale(0.71, 0.71, 0.71);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.8, 1.8, 0);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0);
        this.scene.scale(0.71, 0.71, 0.71);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate((7 * Math.PI) / 4, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

    }
}