import * as THREE from 'three';
import * as TWEEN from 'tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// Constantes y variables globales
const roomModelUrl = new URL('../assets/room.glb', import.meta.url);
const letterModelUrl = new URL('../assets/letter    .glb', import.meta.url);
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const aspectStartRatio = window.innerWidth / window.innerHeight;
let camera;
if (aspectStartRatio < 1) {
    camera = new THREE.PerspectiveCamera(70, aspectStartRatio, 0.1, 1000);
} else {
    camera = new THREE.PerspectiveCamera(40, aspectStartRatio, 0.1, 1000);
}
const orbit = new OrbitControls(camera, renderer.domElement);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const css2dRenderer = new CSS2DRenderer();
let model;
let mixer;
let cameraOriginalPosition, cameraOriginalDistance;
let isOnObject = false;

// Inicializar la escena y cargar el modelo 3D
init();
loadModel();
createLight();
create2DRenderer();
animate();
<<<<<<< HEAD
<<<<<<< HEAD
//--------------------------- INIT ------------------------------
=======

// Configuración inicial de la escena y la cámara
>>>>>>> parent of 6b62d39 (Continuing)
=======

// Configuración inicial de la escena y la cámara
>>>>>>> parent of 6b62d39 (Continuing)
function init() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#444');
    document.body.appendChild(renderer.domElement);
    orbitSetttings();
    orbit.update();
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onMouseClick);
}

function orbitSetttings() {
    orbit.panSpeed = 0.5;
    orbit.zoomSpeed = 0.5;
    orbit.rotateSpeed = 0.5;
    orbit.minAzimuthAngle = -Math.PI / 2; // Ángulo mínimo
    orbit.maxAzimuthAngle = Math.PI / 24;
    orbit.minPolarAngle = 0; // Ángulo mínimo
    orbit.maxPolarAngle = Math.PI / 2.5;
    if (aspectStartRatio < 1) {
        orbit.maxDistance = 70;
    } else {
        orbit.maxDistance = 60;
    }
    orbit.minDistance = 20;
}

// LIGHTS
function createLight() {
    const dLight = new THREE.DirectionalLight('white', 0.8);
    dLight.position.x = 20;
    dLight.position.z = -20;
    dLight.position.y = 30;
    dLight.castShadow = true;
    dLight.shadow.mapSize.width = 4096;
    dLight.shadow.mapSize.height = 4096;
    const d = 35;
    dLight.shadow.camera.left = - d;
    dLight.shadow.camera.right = d;
    dLight.shadow.camera.top = d;
    dLight.shadow.camera.bottom = - d;
    scene.add(dLight);

    const aLight = new THREE.AmbientLight('white', 0.7);
    scene.add(aLight);
}

// Carga del modelo 3D
function loadModel() {
    const assetLoader = new GLTFLoader();
    assetLoader.load(roomModelUrl.href, function (gltf) {
        model = gltf.scene;
        scene.add(model);

        const boundingBox = new THREE.Box3().setFromObject(model);
        cameraOriginalPosition = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());

        const maxDistance = Math.max(size.x , size.y, size.z);
        cameraOriginalDistance = maxDistance / Math.sin(Math.PI /4);

        // Ajusta la posición de la cámara para centrar el modelo 3D en medio de la escena
        camera.position.set(cameraOriginalPosition.x-22, cameraOriginalPosition.y+8, cameraOriginalPosition.z+5 + cameraOriginalDistance);
        camera.lookAt(scene.position);

        mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;

        clips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        }); 
    }, undefined, function (error) {
        console.error(error);
    });
    const assetLoader2 = new GLTFLoader();
    assetLoader2.load(letterModelUrl.href, function (gltf) {
        const model2 = gltf.scene;
        scene.add(model2);
        const boundingBox = new THREE.Box3().setFromObject(model);
        cameraOriginalPosition = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDistance = Math.max(size.x , size.y, size.z);
        cameraOriginalDistance = maxDistance / Math.sin(Math.PI /4);

        // Ajusta la posición de la cámara para centrar el modelo 3D en medio de la escena
        camera.position.set(cameraOriginalPosition.x-22, cameraOriginalPosition.y+8, cameraOriginalPosition.z+5 + cameraOriginalDistance);
        camera.lookAt(scene.position);

        mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;

        clips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        }); 
    }, undefined, function (error) {
        console.error(error);
    });
}

function create2DRenderer() {
    css2dRenderer.setSize(window.innerWidth, window.innerHeight);
    css2dRenderer.domElement.style.position = 'absolute';
    css2dRenderer.domElement.style.top = '0px';
    css2dRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(css2dRenderer.domElement);
}

// Animación principal
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    if (mixer) mixer.update(0.01);
    renderer.render(scene, camera);
    css2dRenderer.render(scene, camera);
}

// Redimensionar ventana
function onWindowResize() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    // Actualizar la relación de aspecto de la cámara
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    css2dRenderer.setSize(window.innerWidth, window.innerHeight);
    if (aspectRatio < 1) {
        orbit.maxDistance = 120;
    } else {
        orbit.maxDistance = 60;
    }
}

// Manejar clic del ratón
function onMouseClick(event) {
    if (isOnObject) {
        return;
    }
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(model, true);

    if (intersects.length > 0) {
        const objetoIntersectado = intersects[0].object;
        switch (objetoIntersectado.name) {
            case 'Project1':
                updateCameraPosition(objetoIntersectado.position.clone().add(new THREE.Vector3(-7, -7.5, 0)), objetoIntersectado, -1, 0, 0);
                break;
            case 'Project2':
                updateCameraPosition(objetoIntersectado.position.clone().add(new THREE.Vector3(-7, -7.5, 0)), objetoIntersectado, -1, 0, 0);
                break;
            case 'Project3':
                updateCameraPosition(objetoIntersectado.position.clone().add(new THREE.Vector3(-7, -7.5, 0)), objetoIntersectado, -1, 0, 0);
                break;
            case 'Calendar':
                updateCameraPosition(objetoIntersectado.position.clone().add(new THREE.Vector3(0, -7.45, 9)), objetoIntersectado, 0, 0, 1);
                break;
            case 'mesh_0_1': case 'mesh_0': case 'mesh_1': case 'mesh_3': case 'mesh_11':
                updateCameraPosition(objetoIntersectado.position.clone().add(new THREE.Vector3(6, -1.25, -4.5)), objetoIntersectado, 0.025, 0.025, 1);
                break;
            default:
                break;
        }
    }
}

// Actualizar posición de la cámara
function updateCameraPosition(newPosition, object, x, y, z) {
    const duration = 1;
    const params = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
    };

    const tween = new TWEEN.Tween(params)
        .to({
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z
        }, duration * 1000)
        .easing(TWEEN.Easing.Exponential.Out)
        .onUpdate(() => {
            camera.position.set(params.x + x, params.y + y, params.z+ z);
            camera.lookAt(newPosition);
            camera.updateProjectionMatrix();
        })
        .onComplete(() => {;
            if (object === null) {
                return;
            }
            switch (object.name) {
                case 'Project1':
                    handleProjectSelection('Project1');
                    break;
                case 'Project2':
                    handleProjectSelection('Project2');
                    break;
                case 'Project3':
                    handleProjectSelection('Project3');
                    break;
                case 'Calendar':
                    create2DObjectsCalendar();
                    break;
                case 'mesh_0_1': case 'mesh_0': case 'mesh_1': case 'mesh_3': case 'mesh_11':
                    create2DObjectsAboutMe();
                    break;
                default:
                    console.log('No se ha encontrado el objeto');
                    break;
            }
        })
        tween.start();
}

// Centrar la cámara
function centerCamera() {
    updateCameraPosition(new THREE.Vector3(cameraOriginalPosition.x-22, cameraOriginalPosition.y+8, cameraOriginalPosition.z+5 + cameraOriginalDistance), null, -0.2, 0.1, 0.5);
}




// Botón para centrar la cámara
const btnCenterCamera = document.getElementById('center-camera');
btnCenterCamera.addEventListener('click', centerCamera);


//Creación de etiquetas 2D
function create2DObject(projectData) {
    const htmlContent = `
        <div>
            <h1 class="project-name">${projectData.name}</h1>
            <h2 class="project-subtitle">${projectData.subtitle}</h2>
            <p class="project-description">${projectData.description}</p>
            <video width="90%" height="350" controls
                src="${projectData.video}">
        </div>
        
        <div class="project-tags">
            ${projectData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-buttons">
            ${projectData.buttons.map(button => `<button class="${button.toLowerCase().replace(/\s/g, '-')}-button">${button}</button>`).join('')}
        </div>
    `;
    const div = document.createElement('div');
    div.className = 'project-container';
    div.innerHTML = htmlContent;

    div.addEventListener('click', event => event.stopPropagation());
    
    const divContainer = new CSS2DObject(div);
    scene.add(divContainer);
    divContainer.position.set(...projectData.position);

    orbit.enabled = false; // Deshabilitar controles de OrbitControls
    isOnObject = true;
    // Desactivar interacción con los objetos del modelo
    renderer.domElement.style.pointerEvents = 'none';
    css2dRenderer.domElement.style.pointerEvents = 'auto';
    const exitBtn = div.querySelector('.salir-button');
    exitBtn.addEventListener('click', () => {
        // Reactivar controles de la cámara
        isOnObject = false;
        orbit.enabled = true;
        renderer.domElement.style.pointerEvents = 'auto';
        css2dRenderer.domElement.style.pointerEvents = 'none';
        scene.remove(divContainer);
        centerCamera();
    });
}

// Manejo de eventos
function handleProjectSelection(projectName) {
    let projectData;

    switch (projectName) {
        case 'Project1':
            projectData = {
                name: "STREETFEED",
                subtitle: "Solidary Food Delivery Platform",
                description: "StreetFeed es una iniciativa solidaria que te permite colaborar para llevar comida a quienes más lo necesitan. Con StreetFeed, puedes unirte a una red de apoyo para entregar alimentos a personas en situación de vulnerabilidad",
                video: "https://youtu.be/Em0NFr9DpF4",
                tags: ["LARAVEL", "VUE"],
                buttons: ["Salir", "Ver en GitHub"],
                position: [14.900, 6.500, -4.000]
            };
            break;
        case 'Project2':
            projectData = {
                name: "LIBE",
                subtitle: "School Assistance",
                description: "An attendance management app in educational institutions. It uses geolocation to track student presence, offers features like statistics, schedules, absence justifications, and notifications. Users include students, teachers, and classes. Simplify attendance management with our powerful app.",
                video: "https://youtu.be/Em0NFr9DpF4",
                tags: ["ANDROID STUDIO (KOTLIN)", ".NET"],
                buttons: ["Salir", "Ver en GitHub"],
                position: [14.900, 6.500, 2.000]
            };
            break;
        case 'Project3':
            projectData = {
                name: "WEB SCRAPPING",
                subtitle: "Macroeconomy Charts",
                description: "With scrapy scripts in Python language, I have gathered data from bank websites, and i show it in graphs using the Dash library, and then on the web page you can analyze the data.",
                video: "https://youtu.be/Em0NFr9DpF4",
                tags: ["ANDROID STUDIO (KOTLIN)", ".NET"],
                buttons: ["Salir", "Ver en GitHub"],
                position: [14.900, 6.500, 8.000]
            };
            break;
        default:
            console.error('Project not found');
            return;
    }

    create2DObject(projectData);
}

function create2DObjectsCalendar() {
    const htmlContent = `
        <h1 class="project-name">La meva experencia</h1>
        <h2 class="project-subtitle">Estudis</h2>
        <p class="project-description">asjkkasdnkljasdndas jsahbdjkasbndkjndasjkds asdnkdjasnasdkjdnas jansdjknaskdjas nasd</p>
        
        <div class="project-buttons">
            <button class="calendar-button">Salir</button>
        </div>
    `;
    const divAboutMe = document.createElement('div');
    divAboutMe.className = 'calendar-container';
    divAboutMe.innerHTML = htmlContent;

    divAboutMe.addEventListener('click', event => event.stopPropagation());
    
    const divContainer = new CSS2DObject(divAboutMe);
    scene.add(divContainer);
    divContainer.position.set(4.500, 7.8, -13.966);
    orbit.enabled = false; // Deshabilitar controles de OrbitControls
    isOnObject = true;
    // Desactivar interacción con los objetos del modelo
    renderer.domElement.style.pointerEvents = 'none';
    css2dRenderer.domElement.style.pointerEvents = 'auto';
    const exitBtn = divAboutMe.querySelector('.calendar-button');
    exitBtn.addEventListener('click', () => {
        // Reactivar controles de la cámara
        isOnObject = false;
        orbit.enabled = true;
        renderer.domElement.style.pointerEvents = 'auto';
        css2dRenderer.domElement.style.pointerEvents = 'none';
        scene.remove(divContainer);
        centerCamera();
    });
}

function create2DObjectsAboutMe() {
    const htmlContent = `
        <div class="about-me-frame">
            <div class="desktop">
                <div class="icon trash"></div>
            </div>
            <div class="taskbar">
                <div class="left">
                <div class="shortcut start"></div>
                <div class="shortcut file-explorer"></div>
                <div class="shortcut edge"></div>
                </div>
                <div class="right">
                <div class="notifications"></div>
                <div class="time-and-date">
                    <span class="time" id="current-time"></span>
                    <span class="date" id="current-date"></span>
                </div>
                <div class="localization"></div>
                <div class="status-icons"></div>
                </div>
            </div>
        </div>
    `;
    const divAboutMe = document.createElement('div');
    divAboutMe.className = 'about-me-container';
    divAboutMe.innerHTML = htmlContent;
    
    divAboutMe.addEventListener('click', event => event.stopPropagation());

    const divContainer = new CSS2DObject(divAboutMe);
    scene.add(divContainer);
    divContainer.position.set(5.7, -0.625, -12.5);
    orbit.enabled = false; // Deshabilitar controles de OrbitControls
    isOnObject = true;
    // Desactivar interacción con los objetos del modelo
    renderer.domElement.style.pointerEvents = 'none';
    css2dRenderer.domElement.style.pointerEvents = 'auto';
    
    const startShortcut = divAboutMe.querySelector('.shortcut.start');
    startShortcut.addEventListener('click', () => {
        showMenu(divContainer);
    });
    
}

function showMenu(divContainer) {
    const menu = document.querySelector('.menu-container')
    if (menu) {
        menu.remove();
        return;
    }
    console.log('showMenu');
    const menuHTML = `
        <div class="menu">
            <p class="menu-item">Settings</p>
            <p class="menu-item menu-item-exit">Exit</p>
        </div>
    `;
    const menuContainer = document.createElement('div');
    menuContainer.innerHTML = menuHTML;
    menuContainer.classList.add('menu-container');
    const taskbar = document.querySelector('.taskbar');
    taskbar.appendChild(menuContainer); // Aquí lo agregamos al elemento taskbar
    
    const exitBtn = menuContainer.querySelector('.menu-item-exit');
    exitBtn.addEventListener('click', () => {
        // Reactivar controles de la cámara
        isOnObject = false;
        orbit.enabled = true;
        renderer.domElement.style.pointerEvents = 'auto';
        css2dRenderer.domElement.style.pointerEvents = 'none';
        scene.remove(divContainer);
        centerCamera();
    });
}