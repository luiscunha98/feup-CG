import { CGFobject , CGFappearance} from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySphere } from "./MySphere.js";
import { MyWood } from "./MyWood.js";



/**
 * MyCrane
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyCrane extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;

        this.base = new MyCylinder(scene, 20);
        this.arm = new MyCylinder(scene, 20);
        this.cable = new MyCylinder(scene, 4);
        this.sphere = new MySphere(scene, 20, 20);
        this.ssphere = new MySphere(scene, 30, 1);
        this.clamp = new MyCylinder(scene, 3);
        this.woods = new MyWood(scene);

        this.armtilt = 0;
        this.armturn = 0;
        this.startingAngle = -Math.PI/4;

        this.initMaterials(scene);

    }

    initMaterials(scene) {

        //Wood texture
        this.wood = new CGFappearance(scene);
        this.wood.setAmbient(0.9, 0.9, 0.9, 1);
        this.wood.setDiffuse(1, 1, 1, 1);
        this.wood.setSpecular(1, 1, 1, 1);
        this.wood.setShininess(10.0);
        this.wood.loadTexture('images/wood.jpg');
        this.wood.setTextureWrap('REPEAT', 'REPEAT');

        //Metal texture
        this.metal = new CGFappearance(scene);
        this.metal.setAmbient(0.3, 0.3, 0.3, 1);
        this.metal.setDiffuse(0.7, 0.7, 0.7, 1);
        this.metal.setSpecular(0.7, 0.7, 0.7, 1);
        this.metal.setShininess(10.0);
        this.metal.loadTexture('images/metal.png');
        this.metal.setTextureWrap('REPEAT', 'REPEAT');

        //Rusty Texture
        this.rust = new CGFappearance(scene);
        this.rust.setAmbient(0.3, 0.3, 0.3, 1);
        this.rust.setDiffuse(0.7, 0.7, 0.7, 1);
        this.rust.setSpecular(0.7, 0.7, 0.7, 1);
        this.rust.setShininess(10.0);
        this.rust.loadTexture('images/rust.jpg');
        this.rust.setTextureWrap('REPEAT', 'REPEAT');

    }

    updateWood() {

        if(this.woods.currentState == 0) {
            if(this.armtilt < -0.3 && this.armturn > 1.3 && !this.woods.isLoaded){
                this.woods.currentState = 1;
            }
            if(this.armtilt < -0.1 && this.armturn == 0 && this.woods.isLoaded) {
                this.woods.currentState = 1;
                this.woods.isLoaded = false;
            }
            console.log("Wood state: " + this.woods.currentState + " isLoaded: " + this.woods.isLoaded);
        } else 
        if(this.woods.currentState == 1 ) {
            if(this.armtilt < -0.3 && this.armturn > 1.3 && !this.woods.isLoaded) {
                this.woods.currentState = 0;
            }
            else 
            if(this.armtilt < -0.3 && this.armturn >= 0 && !this.woods.isLoaded) {
                this.woods.currentState = 0;
                this.woods.isLoaded = true;
            }
            console.log("Wood state: " + this.woods.currentState + " isLoaded: " + this.woods.isLoaded);
        }
    }

    tilt(val) {
        if(this.armtilt + val < 0.16 && this.armtilt + val > -0.45)
            this.armtilt += val;
        console.log(this.armtilt + " tilt");
    }

    turn(val) {
        if(this.armturn + val < 1.5 && this.armturn + val > -1.5)
            this.armturn += val;
        console.log(this.armturn + " turn");
    }

    reset() {
        this.armtilt = 0;
        this.armturn = 0;
    }

    display() {

        //draw base
        this.scene.pushMatrix();
        this.metal.apply();
        this.scene.translate(0, 4.2, -0.5);
        this.scene.scale(0.2, 1.5, 0.2);
        this.base.display();
        this.scene.popMatrix();

        //draw sphere
        this.scene.pushMatrix();
        this.rust.apply();
        this.scene.translate(0, 5.65, -0.55);
        this.scene.scale(0.3, 0.3, 0.3);
        this.sphere.display();
        this.scene.popMatrix();

        //draw arm
        this.scene.pushMatrix();
        this.metal.apply();
        this.scene.translate(0, 5.6, -0.5);
        this.scene.rotate(this.armturn, 0, 1, 0);
        this.scene.rotate(this.startingAngle + this.armtilt, 1, 0, 0);
        this.scene.scale(0.2, 3, 0.2);
        this.arm.display();
        this.scene.popMatrix();

        //draw cable
        this.scene.pushMatrix();
        this.wood.apply();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(this.armturn, 0, 1, 0);
        this.scene.translate(0, 5.5 + 3*(Math.sin(this.startingAngle + this.armtilt)) ,  2.7*(Math.sin(this.startingAngle + this.armtilt)));
        this.scene.scale(0.06, 4, 0.06);
        this.cable.display();
        this.scene.popMatrix();

        //clamp


        this.scene.pushMatrix();
        this.metal.apply();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(this.armturn, 0, 1, 0);
        this.scene.translate(0, 5.5 + 3*(Math.sin(this.startingAngle + this.armtilt)) ,  2.7*(Math.sin(this.startingAngle + this.armtilt)));
        this.scene.scale(0.2 , 0.3 , 0.3);
        this.ssphere.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.metal.apply();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(this.armturn, 0, 1, 0);
        this.scene.translate(0, 5.5 + 3*(Math.sin(this.startingAngle + this.armtilt)) ,  2.7*(Math.sin(this.startingAngle + this.armtilt)));
        this.scene.scale(0.07 , 0.3 , 0.07);
        this.clamp.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.metal.apply();
        this.scene.translate(0, -0.5, -0.7);
        this.scene.rotate(this.armturn, 0, 1, 0);
        this.scene.translate(0, 5.5 + 3*(Math.sin(this.startingAngle + this.armtilt)) ,  2.7*(Math.sin(this.startingAngle + this.armtilt)));
        this.scene.scale(0.05 , 0.5 , 0.05);
        this.clamp.display();
        this.scene.popMatrix();;

        this.scene.pushMatrix();
        this.metal.apply();
        this.scene.translate(0, -0.5, -0.3);
        this.scene.rotate(this.armturn, 0, 1, 0);
        this.scene.translate(0, 5.5 + 3*(Math.sin(this.startingAngle + this.armtilt)) ,  2.7*(Math.sin(this.startingAngle + this.armtilt)));
        this.scene.scale(0.05 , 0.5 , 0.05);
        this.clamp.display();
        this.scene.popMatrix();
        
        if(this.woods.currentState == 1) {
            console.log("wood");
            this.scene.pushMatrix();
            this.scene.rotate(this.armturn, 0, 1, 0);
            this.scene.translate(0, 4.5 + 3*(Math.sin(this.startingAngle + this.armtilt)) ,  2.7*(Math.sin(this.startingAngle + this.armtilt)) - 0.5);
            this.woods.display();
            this.scene.popMatrix();
        } else
        if(this.woods.currentState == 0 && this.woods.isLoaded) {
            this.scene.pushMatrix();
            this.scene.translate(0, 2, -3);
            this.woods.display();
            this.scene.popMatrix();
        }
    }
}