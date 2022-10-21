import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import AudioButton from '../components/AudioButton.vue'
import SoundReactor from './Trees'
import MyGUI from '../utils/MyGUI'
import LoadingController from './LoadingControls.js'
import { Source } from 'three'
import gsap from 'gsap'


class SpherePillards {
    constructor() {
        this.bind()
        this.modelLoader = new GLTFLoader(LoadingController)
        this.textureLoader = new THREE.TextureLoader(LoadingController)
        this.params = {
            waveSpeed: 1,
            subDiv: 3,
            PillardSize: 0.2
        }
        this.buttonColor1 = document.querySelector('.btn-color1');
        this.buttonColor2 = document.querySelector('.btn-color2');
        this.buttonColor3 = document.querySelector('.btn-color3');
    }


    init(scene) {
        this.scene = scene
        
        this.upVec = new THREE.Vector3(0, 1, 0)
        this.pillards = new THREE.Group()
        this.pillard

        this.woodAmbientOcclusionTexture = this.textureLoader.load('./assets/texture/rock/Rock_047_AmbientOcclusion.jpg')
        this.woodHeightTexture = this.textureLoader.load('./assets/texture/rock/Rock_047_Height.png')
        this.woodNormalTexture = this.textureLoader.load('./assets/texture/rock/Rock_047_Normal.jpg')
        this.woodRoughnessTexture = this.textureLoader.load('./assets/texture/rock/Rock_047_Roughness.jpg')

        this.woodAmbientOcclusionTexture.repeat.set(0.5, 0.5)
        this.woodHeightTexture.repeat.set(0.5, 0.5)
        this.woodNormalTexture.repeat.set(0.5, 0.5)
        this.woodRoughnessTexture.repeat.set(0.5, 0.5)

        this.woodAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
        this.woodHeightTexture.wrapS = THREE.RepeatWrapping
        this.woodNormalTexture.wrapS = THREE.RepeatWrapping
        this.woodRoughnessTexture.wrapS = THREE.RepeatWrapping

        this.woodAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
        this.woodHeightTexture.wrapT = THREE.RepeatWrapping
        this.woodNormalTexture.wrapT = THREE.RepeatWrapping
        this.woodRoughnessTexture.wrapT = THREE.RepeatWrapping
        

        //Video
        this.video = document.createElement( 'video' );
        

        this.buttonColor1.addEventListener('click', () => {         
            this.video.src = "./assets/texture/video/1.mp4";
            this.video.load(); // must call after setting/changing source
             this.video.play();  
            })
            
        this.buttonColor2.addEventListener('click', () => { 
                this.video.src = "./assets/texture/video/2.mp4";
                this.video.load(); // must call after setting/changing source
                this.video.play();  
            })
    
        this.buttonColor3.addEventListener('click', () => { 
            this.video.src = "./assets/texture/video/8.mp4";
            this.video.load(); // must call after setting/changing source
            this.video.play();  
        })


        this.videoImage = document.createElement( 'canvas' );
        this.videoImage.width = 1280;
        this.videoImage.height = 720;

        this.videoImageContext = this.videoImage.getContext( '2d' );

        this.videoImageContext.fillStyle = '#000000';
        this.videoImageContext.fillRect( 0, 0, this.videoImage.width, this.videoImage.height );

        this.videoTexture = new THREE.Texture( this.videoImage );
        this.videoTexture.minFilter = THREE.LinearFilter;
        this.videoTexture.magFilter = THREE.LinearFilter

        this.videoTexture.repeat.set(0.5, 0.5)
        this.videoTexture.wrapS = THREE.RepeatWrapping
        this.videoTexture.wrapT = THREE.RepeatWrapping
  
        
        
        const movieMaterial = new THREE.MeshStandardMaterial( {   map: this.videoTexture,
            side: THREE.DoubleSide,
            toneMapped: false,
            aoMap: this.woodAmbientOcclusionTexture,
            displacementMap: this.woodHeightTexture,
            displacementScale: 0.9,
            normalMap: this.woodNormalTexture,
            roughnessMap: this.woodRoughnessTexture
        });


        const material = new THREE.MeshStandardMaterial({
            color: 0x000000,
            aoMap: this.woodAmbientOcclusionTexture,
            displacementMap: this.woodHeightTexture,
            displacementScale: 0.9,
            normalMap: this.woodNormalTexture,
            roughnessMap: this.woodRoughnessTexture,
            side: THREE.DoubleSide

        })

        //Model
        this.modelLoader.load('./assets/model/simple_chinese_pagoda.glb', (glb) =>{
            glb.scene.traverse(child =>

            child.material = movieMaterial,
            this.video.play()           
        )

            glb.scene.traverse(child =>
                child.castShadow = true,
            )
            glb.scene.traverse(child =>
                child.receiveShadow = true
            )
        glb.scene.scale.set(0.004, 0.004, 0.004)
        this.scene.add(glb.scene)

        
    }) 
    }

    

    
    
    update() {
       //video 1
        if ( this.video.readyState === this.video.HAVE_ENOUGH_DATA ) 
	    {
		this.videoImageContext.drawImage( this.video, 0, 0 );
		if ( this.video ) 
			this.videoTexture.needsUpdate = true;           
	    }
                
    }


    bind() {
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new SpherePillards()
export default _instance