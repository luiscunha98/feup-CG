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
        this.diamond = new MyDiamond(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.initMaterials(scene);
    }

    initMaterials(scene){
        
        
        this.green = new CGFappearance(scene);
        this.green.setAmbient(0.0,0.0,0.0,1);
        this.green.setDiffuse(0.0693, 0.770, 0.233,1.0);
        this.green.setSpecular(1,1,1,1.0);
        this.green.setShininess(10.0);

        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(0.0,0.0,0.0,1);
        this.yellow.setDiffuse(0.930, 0.917, 0.130,1.0);
        this.yellow.setSpecular(1,1,1,1.0);
        this.yellow.setShininess(10.0);

        
        this.orange = new CGFappearance(scene);
        this.orange.setAmbient(0.0,0.0,0.0,1);
        this.orange.setDiffuse(0.930, 0.530, 0.130,1.0);
        this.orange.setSpecular(1,1,1,1.0);
        this.orange.setShininess(10.0);

    
        this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0.0,0.0,0.0,1);
        this.blue.setDiffuse(0.0752, 0.623, 0.940,1.0);
        this.blue.setSpecular(1,1,1,1.0);
        this.blue.setShininess(10.0);


        this.pink = new CGFappearance(scene);
        this.pink.setAmbient(0.0,0.0,0.0,1);
        this.pink.setDiffuse(0.930, 0.493, 0.908,1.0);
        this.pink.setSpecular(1,1,1,1.0);
        this.pink.setShininess(10.0);


        this.purple = new CGFappearance(scene);
        this.purple.setAmbient(0.0,0.0,0.0,1);
        this.purple.setDiffuse(0.590, 0.136, 0.567,1.0);
        this.purple.setSpecular(1,1,1,1.0);
        this.purple.setShininess(10.0);

        
        this.red = new CGFappearance(scene);
        this.red.setAmbient(0.0,0.0,0.0,1);
        this.red.setDiffuse(0.930, 0.0372, 0.0967,1.0);
        this.red.setSpecular(1,1,1,1.0);
        this.red.setShininess(10.0);
    }


    
    display() {
        
        this.blue.apply();
        this.triangle.display();

        this.scene.pushMatrix();
        this.scene.scale(1 / 2, 1 / 2, 1 / 2);
        this.scene.translate(4, 0, 0);
        this.red.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -2, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.orange.apply();
        this.triangle.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.scale(1 / 2, 1 / 2, 1 / 2);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(1.5, 1.5, 0);
        this.purple.apply();
        this.triangle.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.rotate((3 * Math.PI) / 4, 0, 0, 1);
        this.scene.scale(0.71, 0.71, 0.71);
        this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.8, 1.8, 0);
        this.green.apply();
        this.diamond.display();
        this.scene.popMatrix();
     

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0);
        this.scene.scale(0.71, 0.71, 0.71);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate((7 * Math.PI) / 4, 0, 0, 1);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
        

    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
        
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();       
    }

}