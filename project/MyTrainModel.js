import { CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCube } from './MyCube.js';
import { MyCircle } from './MyCircle.js';
import { MySphere } from './MySphere.js';
import { MyTrainSmoke } from './MyTrainSmoke.js';

/**
 * MyTrainModel
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTrainModel extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.wheels = new MyCylinder(scene, 20);
        this.cover = new MyCircle(scene, 20);
        this.chimneyCylinder = new MyCylinder(scene, 20);
        this.frontCylinder = new MyCylinder(scene, 20);
        this.baseCube = new MyCube(scene);
        this.cabinCube = new MyCube(scene);
        this.frontCover = new MySphere(scene,20,20);
        this.box = new MyCube(scene);
        this.cloud = new MyTrainSmoke(scene);

        this.wheelsAngle = 0;

        this.initMaterials(scene);

    }
    initMaterials(scene) {

        // wheel cover texture

        this.wheel = new CGFappearance(scene);
        this.wheel.setAmbient(0.9, 0.9, 0.9, 1);
        this.wheel.setDiffuse(1, 1, 1, 1);
        this.wheel.setSpecular(1, 1, 1, 1);
        this.wheel.setShininess(10.0);
        this.wheel.loadTexture('images/wheel.png');
        this.wheel.setTextureWrap('REPEAT', 'REPEAT');

        //base train texture

        this.traintext = new CGFappearance(scene);
        this.traintext.setAmbient(0.9, 0.9, 0.9, 1);
        this.traintext.setDiffuse(1, 1, 1, 1);
        this.traintext.setSpecular(1, 1, 1, 1);
        this.traintext.setShininess(10.0);
        this.traintext.loadTexture('images/traintext.jpg');
        this.traintext.setTextureWrap('REPEAT', 'REPEAT');

        //body train texture

        this.cylinder = new CGFappearance(scene);
        this.cylinder.setAmbient(0.9, 0.9, 0.9, 1);
        this.cylinder.setDiffuse(1, 1, 1, 1);
        this.cylinder.setSpecular(1, 1, 1, 1);
        this.cylinder.setShininess(10.0);
        this.cylinder.loadTexture('images/cylinder.jpg');
        this.cylinder.setTextureWrap('REPEAT', 'REPEAT');

        //chimney train texture

        this.chimneytext = new CGFappearance(scene);
        this.chimneytext.setAmbient(0.9, 0.9, 0.9, 1);
        this.chimneytext.setDiffuse(1, 1, 1, 1);
        this.chimneytext.setSpecular(1, 1, 1, 1);
        this.chimneytext.setShininess(10.0);
        this.chimneytext.loadTexture('images/chimney.png');
        this.chimneytext.setTextureWrap('REPEAT', 'REPEAT');

        //cabin train texture

        this.locomotive = new CGFappearance(scene);
        this.locomotive.setAmbient(0.9, 0.9, 0.9, 1);
        this.locomotive.setDiffuse(1, 1, 1, 1);
        this.locomotive.setSpecular(1, 1, 1, 1);
        this.locomotive.setShininess(10.0);
        this.locomotive.loadTexture('images/locomotive.png');
        this.locomotive.setTextureWrap('REPEAT', 'REPEAT');

        //rest train texture

        this.fronttext = new CGFappearance(scene);
        this.fronttext.setAmbient(0.9, 0.9, 0.9, 1);
        this.fronttext.setDiffuse(1, 1, 1, 1);
        this.fronttext.setSpecular(1, 1, 1, 1);
        this.fronttext.setShininess(10.0);
        this.fronttext.loadTexture('images/front.jpg');
        this.fronttext.setTextureWrap('REPEAT', 'REPEAT');

        //frontoftrain texture

        this.frontt = new CGFappearance(scene);
        this.frontt.setAmbient(0.9, 0.9, 0.9, 1);
        this.frontt.setDiffuse(1, 1, 1, 1);
        this.frontt.setSpecular(1, 1, 1, 1);
        this.frontt.setShininess(10.0);
        this.frontt.loadTexture('images/fronttrain.png');
        this.frontt.setTextureWrap('REPEAT', 'REPEAT');
    
    }

    running(val) {
        this.wheelsAngle += val;
    }

    display() {
        //draw wheels front left
        this.scene.pushMatrix();
        this.wheel.apply();
        this.scene.translate(1.45, 0.75, 2.25);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.75, 0.75, 1);
        this.scene.rotate(this.wheelsAngle, 0, 0, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wheel.apply();
        this.scene.translate(1.45, 0.75, 2.25);
        this.scene.rotate((3 * Math.PI) / 2, 0, 1, 0);
        this.scene.scale(0.75, 0.75, 1);
        this.scene.rotate(-this.wheelsAngle, 0, 0, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.traintext.apply();
        this.scene.translate(1.45, 0.75, 2.25);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.75, 0.2, 0.75);
        this.wheels.display();
        this.scene.popMatrix();

        //draw wheels front right
        this.scene.pushMatrix();
        this.wheel.apply();
        this.scene.translate(-1.45, 0.75, 2.25);
        this.scene.rotate((3 * Math.PI) / 2, 0, 1, 0);
        this.scene.scale(0.75, 0.75, 1);
        this.scene.rotate(-this.wheelsAngle, 0, 0, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wheel.apply();
        this.scene.translate(-1.45, 0.75, 2.25);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.75, 0.75, 1);
        this.scene.rotate(this.wheelsAngle, 0, 0, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.traintext.apply();
        this.scene.translate(-1.25, 0.75, 2.25);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.75, 0.2, 0.75);
        this.wheels.display();
        this.scene.popMatrix();

        //draw wheels back left
        this.scene.pushMatrix();
        this.wheel.apply();
        this.scene.translate(1.45, 0.75, -2.25);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.75, 0.75, 1);
        this.scene.rotate(this.wheelsAngle, 0, 0, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wheel.apply();
        this.scene.translate(1.45, 0.75, -2.25);
        this.scene.rotate((3 * Math.PI) / 2, 0, 1, 0);
        this.scene.scale(0.75, 0.75, 1);
        this.scene.rotate(-this.wheelsAngle, 0, 0, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.traintext.apply();
        this.scene.translate(1.45, 0.75, -2.25);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.75, 0.2, 0.75);
        this.wheels.display();
        this.scene.popMatrix();

        //draw wheels back right
        this.scene.pushMatrix();
        this.wheel.apply();
        this.scene.translate(-1.45, 0.75, -2.25);
        this.scene.rotate((3 * Math.PI) / 2, 0, 1, 0);
        this.scene.scale(0.75, 0.75, 1);
        this.scene.rotate(-this.wheelsAngle, 0, 0, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.wheel.apply();
        this.scene.translate(-1.45, 0.75, -2.25);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.75, 0.75, 1);
        this.scene.rotate(this.wheelsAngle, 0, 0, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.traintext.apply();
        this.scene.translate(-1.25, 0.75, -2.25);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.75, 0.2, 0.75);
        this.wheels.display();
        this.scene.popMatrix();

        //base Cube
        
        this.scene.pushMatrix();
        this.traintext.apply();
        this.baseCube.quad.updateTexCoords([
            0, 1,
			1, 1,
			0, 0,
			1, 0, 
        ]);
        this.scene.translate(0, 1.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(2.5, 7.5, 1);
        this.baseCube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.traintext.apply();
        this.baseCube.quad.updateTexCoords([
            0, 1,
			1, 1,
			0, 0,
			1, 0
        ]);
        this.scene.translate(0, 4.5, -0.5);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.1, 2.1, 2.2);
        this.baseCube.display();
        this.scene.popMatrix();

        //cabin Cube

        this.scene.pushMatrix();
        this.locomotive.apply();
        this.scene.translate(0, 3.2, -0.5);
        this.scene.scale(2, 2.5, 1.8);
        this.cabinCube.display();
        this.scene.popMatrix();

        //front cylinder

        this.scene.pushMatrix();
        this.cylinder.apply();
        this.scene.translate(0, 2.9, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.9, 3.5, 0.9);
        this.frontCylinder.display();
        this.scene.popMatrix();

        //chimney train cylinder

        this.scene.pushMatrix();
        this.chimneytext.apply();
        this.scene.translate(0 ,3.8, 2.1);
        this.scene.scale(0.2, 0.7, 0.2);
        this.chimneyCylinder.display();
        this.scene.popMatrix();

        // front sphere

        this.scene.pushMatrix();
        this.frontt.apply();
        this.scene.translate(0,2.9,3.4);
        this.scene.scale(0.9,0.9,0.4);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.frontCover.display();
        this.scene.popMatrix();

        //box 

        this.scene.pushMatrix();
        this.fronttext.apply();
        this.scene.translate(-1,2.5,-2.7);
        this.scene.scale(0.1,1.2,1.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.box.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,2.5,-2.7);
        this.scene.scale(0.1,1.2,1.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.box.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,2.5,-2.7);
        this.scene.scale(0.1,1.2,1.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.box.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,2.5,-3.4);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.1,1.2,2);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.box.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,2.5,-2);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.1,1.2,2);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.box.display();
        this.scene.popMatrix()

        //smoke 
        this.scene.pushMatrix();
        this.cloud.display();
        this.scene.popMatrix();


    }

    enableNormalViz() {
        this.wheels.enableNormalViz();
        this.cover.enableNormalViz();
        this.chimneyCylinder.enableNormalViz();
        this.frontCylinder.enableNormalViz();
        this.baseCube.enableNormalViz();
        this.cabinCube.enableNormalViz();
        this.frontCover.enableNormalViz();
    }

    disableNormalViz() {
        this.wheels.disableNormalViz();
        this.cover.disableNormalViz();
        this.chimneyCylinder.disableNormalViz();
        this.frontCylinder.disableNormalViz();
        this.baseCube.disableNormalViz();
        this.cabinCube.disableNormalViz();
        this.frontCover.disableNormalViz();
    }

}