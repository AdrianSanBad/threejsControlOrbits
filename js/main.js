import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer;

init();
//render(); // remove when using animation loop

function init() {
 //instancia el objeto de la escena
    scene = new THREE.Scene();
   

    scene.background = new THREE.Color(0xB90893);
    scene.fog = new THREE.FogExp2(0xE9A512, 0.002);
    console.log(scene);
    
    //suavizado de bordes de los objetos mediante antialias
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //establece el tamaño del renderizado(pixel) mediante el tamaño de la ventana
    renderer.setPixelRatio(window.devicePixelRatio);
    //el tamaño de la animación es igual al tamaño de la ventana
    renderer.setSize(window.innerWidth, window.innerHeight);
    //la animacion se renderiza gracias a animate de manera continua en cada frame
    renderer.setAnimationLoop(animate);
    //se coloca el renderizado en el body del html
    document.body.appendChild(renderer.domElement);

    //la ubicacion de la camara se establece en el eje x,y,z
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    //se obtiene la posicion de la camara inicial en el eje x,y,z
    camera.position.set(300, 150, 0);

    // controls
    //se establece el control de la camara mediante el mouse
    controls = new OrbitControls(camera, renderer.domElement);
    //se establece la velocidad de movimiento de la camara
    controls.listenToKeyEvents(window); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    //enableDamping permite que la camara se mueva de manera suave damping es traducido como amortiguamiento
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    //dampingFactor es el factor de amortiguamiento osea su intensidad
    controls.dampingFactor = 0.05;
    //screanspacepanning hace que la camara se mueva en el espacio de la pantalla de manera horizontal
    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    // world

    const geometry = new THREE.ConeGeometry(10, 30, 4, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

    for (let i = 0; i < 500; i++) {

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);

    }

    // lights

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
    dirLight2.position.set(- 1, - 1, - 1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();

}

function render() {

    renderer.render(scene, camera);

}

