import { CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCircle } from './MyCircle.js';

/**
 * MyWood
 * @constructor
 * @param scene - Reference to MyScene object
 */


const wood_state = {
    'NOTATTACHED' : 0,
    'ATTACHED' : 1,
}


export class MyWood extends CGFobject {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.wood = new MyCylinder(scene, 20);
        this.cover = new MyCircle(scene, 20);

        this.currentState = wood_state.NOTATTACHED;
        this.isLoaded = true;

        this.initMaterials(scene);

    }
    initMaterials(scene) {

        // wood texture
        this.woodtext = new CGFappearance(scene);
        this.woodtext.setAmbient(0.9, 0.9, 0.9, 1);
        this.woodtext.setDiffuse(1, 1, 1, 1);
        this.woodtext.setSpecular(1, 1, 1, 1);
        this.woodtext.setShininess(10.0);
        this.woodtext.loadTexture('images/trunk.jpg');
        this.woodtext.setTextureWrap('REPEAT', 'REPEAT');

        //wood cover texture

        this.coverext = new CGFappearance(scene);
        this.coverext.setAmbient(0.9, 0.9, 0.9, 1);
        this.coverext.setDiffuse(1, 1, 1, 1);
        this.coverext.setSpecular(1, 1, 1, 1);
        this.coverext.setShininess(10.0);
        this.coverext.loadTexture('images/trunkcover.jpg');
        this.coverext.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {


        //Trunks
        this.scene.pushMatrix();
        this.woodtext.apply();
        this.scene.translate(0, 0.2, 0);
        this.scene.scale(0.2, 0.2, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.wood.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.55, 0);
        this.scene.scale(0.2, 0.2, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.wood.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.2, 0);
        this.scene.scale(0.2, 0.2, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.wood.display();
        this.scene.popMatrix();


        //Trunk covers
        this.scene.pushMatrix();
        this.coverext.apply();
        this.scene.translate(0, 0.2, 1);
        this.scene.scale(0.2, 0.2, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.2, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 1);
        this.cover.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.2, 1);
        this.scene.scale(0.2, 0.2, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4,0.2, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 1);
        this.cover.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.55, 1);
        this.scene.scale(0.2, 0.2, 1);
        this.cover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2,0.55, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.2, 0.2, 1);
        this.cover.display();
        this.scene.popMatrix();
    }

}