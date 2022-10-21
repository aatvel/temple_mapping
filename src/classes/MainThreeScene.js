import * as THREE from "three"

import RAF from '../utils/RAF'
import config from '../utils/config'
import MyGUI from '../utils/MyGUI'

import SpherePillards  from './SpherePillards.js'
import Floor from './FloorClass.js'
import Tree from './Trees.js'

import Particles from './Particles.js'
import CamParallax from './CamParallax.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RectAreaLight } from "three"

import gsap from 'gsap'


class MainThreeScene {
    constructor() {
        this.bind()
        this.camera
        this.scene
        this.renderer
        this.controls
    }

    init(container) {
        //RENDERER SETUP
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        container.appendChild(this.renderer.domElement)

        //MAIN SCENE INSTANCE
        const color = new THREE.Color(0x151515)
        const fog = new THREE.Fog(color, 5.5, 30)

       
 

        this.scene = new THREE.Scene()
        this.scene.background = color
        this.scene.fog = fog
        

        //CAMERA AND ORBIT CONTROLLER
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 6, 7.5)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enabled = false
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05
        this.controls.maxDistance = 20
        this.controls.minDistance = 3.5
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.1;

        //light
        const light = new THREE.SpotLight(0xFFFFFF, 2);
        light.position.y = 5
        this.scene.add(light);

        //Fire
        const fireLight = new THREE.PointLight(0xff830f, 1)
        fireLight.position.set(0 ,  1.5,  0.45)
        fireLight.power = 10;
        fireLight.decay = 1;
        // fireLight.rotation.y = - Math.PI / 2;
        this.scene.add(fireLight)


        SpherePillards.init(this.scene)
        Floor.init(this.scene)
        Particles.init(this.scene)
        CamParallax.init(this.camera)
        Tree.init(this.scene)
   

        MyGUI.hide()
        if (config.myGui)
            MyGUI.show()

            const camera = MyGUI.addFolder("Camera")
            camera.add(this.controls, 'enabled').name('Camera').onChange(() => {
                if(this.controls.enabled){
                    CamParallax.active = false
                }
            }).listen()
            camera.add(CamParallax, 'active').name('Parallax').onChange(() => {
                if(CamParallax.active){
                    this.controls.enabled = false
                }
            }).listen()
            camera.add(CamParallax.params, "intensity").min(0.001).max(0.01)
            camera.add(CamParallax.params, "ease").min(0.001).max(0.01)

        //RENDER LOOP AND WINDOW SIZE UPDATER SETUP
        window.addEventListener("resize", this.resizeCanvas)
        RAF.subscribe('threeSceneUpdate', this.update)
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        // this.renderer.physicallyCorrectLights = true
        // this.scene.rotateY(0.002)
        SpherePillards.update();
        Particles.update()
  
        CamParallax.update()
        
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new MainThreeScene()
export default _instance