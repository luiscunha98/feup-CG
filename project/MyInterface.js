import { CGFinterface, dat } from '../lib/CGF.js';
import { MyCubeMap } from './MyCubeMap.js';

/**
* MyInterface
* @constructor
*/

export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        var obj = this;

        //Checkbox element in GUI

        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayInfo').name('Display Info');
        this.gui.add(this.scene, 'displayTrack').name('Display Track');
        this.gui.add(this.scene, 'displayState').name ('Display Train');
        this.gui.add(this.scene, 'displayCube').name ('Display Cube');
        this.gui.add(this.scene, 'displayStation').name ('Display Station');   
        this.gui.add(this.scene, 'textureOn', this.scene.textureOptions).onChange(this.scene.updateTextures.bind(this.scene)).name('Texture');
        
        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function () { };

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}