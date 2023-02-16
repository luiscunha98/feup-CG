import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { CGFappearance } from "../lib/CGF.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        
        this.scene = scene;
        this.blueTriangle = new MyTriangle(scene);
        this.orangeTriangle = new MyTriangle(scene);
        this.purpleTriangle = new MyTriangle(scene);
        this.redTriangle = new MyTriangle(scene);
        this.pinkTriangle = new MyTriangle(scene);
        this.greenDiamond = new MyDiamond(scene);
        this.yellowParallelogram = new MyParallelogram(scene);

        this.initMaterials(scene);
    }

    initMaterials(scene){
        

        //tangram material 
        this.tangramMaterial = new CGFappearance(scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.orangeTriangle.texCoords = [
            1, 1,
            0.5, 0.5,
            1, 0,
            0.5, 0.5,
            1, 1,
            1, 0
        ]
        this.orangeTriangle.updateTexCoordsGLBuffers();
        
        this.blueTriangle.texCoords = [
            1, 0,
            0, 0,
            0.5, 0.5,

            1, 0,
            0, 0,
            0.5, 0.5,
        ]
        this.blueTriangle.updateTexCoordsGLBuffers();

        this.greenDiamond.texCoords = [
            0, 0.5,
            0.25, 0.75,
            0.25, 0.25,
            0.5, 0.5,
            0, 0.5,
            0.25, 0.75,
            0.25, 0.25,
            0.5, 0.5
        ]
        this.greenDiamond.updateTexCoordsGLBuffers();

        this.purpleTriangle.texCoords = [
            0, 0,
            0, 0.5,
            0.25, 0.25,
            0, 0,
            0, 0.5,
            0.25, 0.25        
        ]
        this.purpleTriangle.updateTexCoordsGLBuffers();

        this.redTriangle.texCoords = [
            0.25, 0.75,
            0.75, 0.75,
            0.5, 0.5,
            0.25, 0.75,
            0.75, 0.75,
            0.5, 0.5
        ]
        this.redTriangle.updateTexCoordsGLBuffers();

        this.yellowParallelogram.texCoords = [
            0.5, 1,
            1 , 1,
            0.75, 0.75,
            0.25, 0.75,
            0.5, 1,
            1 , 1,
            0.75, 0.75,
            0.25, 0.75,
        ]
        this.yellowParallelogram.updateTexCoordsGLBuffers();

        this.pinkTriangle.texCoords = [
            0, 0.5,
            0, 1,
            0.5, 1,
            0, 0.5,
            0, 1,
            0.5, 1
        ]
    }


    
    display() {

        this.tangramMaterial.apply();

        //orange triangle
        this.scene.pushMatrix();
        this.scene.scale(2,2,2);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.translate(1,1,0);
        this.orangeTriangle.display();
        this.scene.popMatrix();

        //blue triangle
        this.scene.pushMatrix();
        this.scene.scale(2,2,2);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.translate(1,1,0);
        this.blueTriangle.display();
        this.scene.popMatrix();
        
        //green diamond
        this.scene.pushMatrix();
        this.scene.scale(Math.sqrt(2),Math.sqrt(2),Math.sqrt(2));
        this.scene.translate(-1,0,0);
        this.greenDiamond.display();
        this.scene.popMatrix();

        //purple triangle
        this.scene.pushMatrix();
        this.scene.translate(-2*Math.sqrt(2),Math.sqrt(2),0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.purpleTriangle.display();
        this.scene.popMatrix();

        //red triangle
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sqrt(2),0);
        this.scene.rotate(5*Math.PI/4,0,0,1);
        this.redTriangle.display();
        this.scene.popMatrix();

        //yellow parallelogram
        this.scene.pushMatrix();
        this.scene.translate(2*Math.sqrt(2),-2 *Math.sqrt(2),0);
        this.scene.scale(-Math.sqrt(2),Math.sqrt(2),Math.sqrt(2));
        this.yellowParallelogram.display();
        this.scene.popMatrix();



        //pink triangle
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2),-Math.sqrt(2),0);
        this.scene.scale(Math.sqrt(2),Math.sqrt(2),Math.sqrt(2));
        this.pinkTriangle.display();
        this.scene.popMatrix();
        
    }

    enableNormalViz() {
        this.blueTriangle.enableNormalViz();
        this.orangeTriangle.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
        this.redTriangle.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.greenDiamond.enableNormalViz();
        this.yellowParallelogram.enableNormalViz();
    }

    disableNormalViz() {
        this.blueTriangle.disableNormalViz();
        this.orangeTriangle.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
        this.redTriangle.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.greenDiamond.disableNormalViz();
        this.yellowParallelogram.disableNormalViz();
    }

}