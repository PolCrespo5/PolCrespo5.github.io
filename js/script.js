import * as THREE from 'three';
import * as TWEEN from 'tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { calculateObjectContainer } from './utilities.js';
import { handleProjectSelection } from './projectUtils.js';
import { generateCalendar } from './calendarUtil.js';

// Constantes y variables globales
const roomModelUrl = new URL('../assets/room.glb', import.meta.url);
const letterModelUrl = new URL('../assets/letter.glb', import.meta.url);
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
let aspectStartRatio = window.innerWidth / window.innerHeight;
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
let isLoaded = false;

// Inicializar la escena y cargar el modelo 3D
init();
loadModel();
createLight();
create2DRenderer();
animate();
//--------------------------- INIT ------------------------------
function init() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#444');
    document.body.appendChild(renderer.domElement);
    orbitSetttings();
    orbit.update();
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onMouseClick);
    document.getElementById('center-camera').addEventListener('click', centerCamera);
    document.getElementById('help-btn').addEventListener('click', helper);
}
// Configuración de OrbitControls
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
// Centrar la cámara
function centerCamera() {
    camera.position.set(cameraOriginalPosition.x-22, cameraOriginalPosition.y+8, cameraOriginalPosition.z+5 + cameraOriginalDistance);
    camera.lookAt(scene.position);
}

//--------------------------- LOAD MODEL ------------------------------
// Carga del modelo 3D
function loadModel() {
    const assetLoader = new GLTFLoader();
    const assetLoader2 = new GLTFLoader();
    const loadModel1 = new Promise((resolve, reject) => {
        assetLoader.load(roomModelUrl.href, resolve, undefined, reject);
    });
    
    const loadModel2 = new Promise((resolve, reject) => {
        assetLoader2.load(letterModelUrl.href, resolve, undefined, reject);
    });

    Promise.all([loadModel1, loadModel2])
    .then(([gltf1, gltf2]) => {
        model = gltf1.scene;
        const model2 = gltf2.scene;
        scene.add(model);
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
        const clips = gltf1.animations;

        clips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        });
        document.getElementById('skip').style.display = 'flex'; // Ocultar el loader
        const kineticElements = document.querySelectorAll('.kinetic');
        // Ocultar cada elemento encontrado
        kineticElements.forEach(element => {
            element.style.display = 'none';
        });

        document.getElementById('skip').addEventListener('click', () => {
            document.getElementById('loader').style.display = 'none'; // Ocultar el loader
            setTimeout(() => {
                isLoaded = true;
            }, 50);
        });
    })
    .catch(error => {
        console.error(error);
        // Maneja cualquier error de carga aquí
    });
    
}

// --------------------------- LIGHTS ------------------------------
// LIGHTS
function createLight() {
    const dLight = new THREE.DirectionalLight('white', 0.3);
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

    const aLight = new THREE.AmbientLight('white', 0.2);
    scene.add(aLight);
}

// --------------------------- RENDERERS ------------------------------
// Crear renderizador 2D
function create2DRenderer() {
    css2dRenderer.setSize(window.innerWidth, window.innerHeight);
    css2dRenderer.domElement.style.position = 'absolute';
    css2dRenderer.domElement.style.top = '0px';
    css2dRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(css2dRenderer.domElement);
}

// --------------------------- ANIMATION ------------------------------
// Animación principal
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    if (mixer) mixer.update(0.01);
    renderer.render(scene, camera);
    css2dRenderer.render(scene, camera);
}

// --------------------------- EVENT HANDLERS ------------------------------
// Redimensionar ventana
function onWindowResize() {
    aspectStartRatio = window.innerWidth / window.innerHeight;
    // // Actualizar la relación de aspecto de la cámara
    
    camera.aspect = aspectStartRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    css2dRenderer.setSize(window.innerWidth, window.innerHeight);
    if (!isOnObject) {   
        centerCamera();
    }
    if (aspectStartRatio < 1) {
        orbit.maxDistance = 120;
    } else {
        orbit.maxDistance = 60;
    }
}

// Manejar clic del ratón
function onMouseClick(event) {
    if (isOnObject || !isLoaded) {
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
    orbit.enabled = false; // Deshabilitar controles de OrbitControls
    isOnObject = true;
    // Desactivar interacción con los objetos del modelo
    renderer.domElement.style.pointerEvents = 'none';
    css2dRenderer.domElement.style.pointerEvents = 'auto';
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
            let projectData;
            switch (object.name) {
                case 'Project1':
                    projectData = handleProjectSelection('Project1');
                    create2DObject(projectData);
                    break;
                case 'Project2':
                    projectData = handleProjectSelection('Project2');
                    create2DObject(projectData);
                    break;
                case 'Project3':
                    projectData = handleProjectSelection('Project3');
                    create2DObject(projectData);
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

//--------------------------- PROJECTS ------------------------------
function create2DObject(projectData) {
    let projectContainerDimension = calculateObjectContainer(0.45, 0.83, 1.25, 1.25);   
    const htmlContent = `
        <div>
            <div class="header-project">
                <h1 class="project-name">${projectData.name}</h1>
                <img class="project-image" src="../assets/logos/${projectData.image}" alt="${projectData.name}">
            </div>
            <div class="project-description-container">
                <div class="project-description-container float">
                    <p class="project-description">${projectData.description}</p>
                </div>
            </div>
        </div>
        <div class="project-tags">
            ${projectData.tags.map(tag => `
            <div class="tag-item-container">
                <div class="tag-item-container tag-item">
                    <span>${tag}</span>
                </div>
            </div>`).join('')}
        </div>
        <div class="demo-container">
            <div class="demo-button">
                <img class="play-icon" src="../assets/logos/play.webp" alt="Github">
            </div>
            <div class="source-button">
                <img class="github-icon" src="../assets/logos/github.svg" alt="Github">
            </div>
        </div>
        <div class="project-buttons">
            ${projectData.prev != null ? `<button class="prev-button" alt="Previous">PREV</button>` : '<span></span>'}
            ${projectData.next != null ? `<button class="next-button" alt="Next">NEXT</button>` : `<button class="next-button" alt="home">HOME</button>`}
        </div>
    `;
    const div = document.createElement('div');
    div.className = 'project-container';
    div.style.width = `${projectContainerDimension.containerWidth}px`;
    div.style.height = `${projectContainerDimension.conatinerHeight}px`;
    div.innerHTML = htmlContent;

    div.addEventListener('click', event => event.stopPropagation());
    
    const divContainer = new CSS2DObject(div);
    scene.add(divContainer);
    divContainer.position.set(...projectData.position);

    const demoBtn = div.querySelector('.demo-button');
    demoBtn.addEventListener('click', () => {
        window.open(projectData.redirectDemo);
    });
    
    const sourceBtn = div.querySelector('.source-button');
    sourceBtn.addEventListener('click', () => {
        window.open(projectData.redirectGithub);
    });

    const exitBtn = div.querySelector('.next-button');
    exitBtn.addEventListener('click', () => {
        // Reactivar controles de la cámara
        isOnObject = false;
        orbit.enabled = true;
        renderer.domElement.style.pointerEvents = 'auto';
        css2dRenderer.domElement.style.pointerEvents = 'none';
        scene.remove(divContainer);
        if (projectData.next === 'Project2') {
            const objetoIntersectado = model.getObjectByName('Project2');
            updateCameraPosition(objetoIntersectado.position.clone().add(new THREE.Vector3(-7, -7.5, 0)), objetoIntersectado, -1, 0, 0);
        } else if (projectData.next === 'Project3') {
            const objetoIntersectado = model.getObjectByName('Project3');
            updateCameraPosition(objetoIntersectado.position.clone().add(new THREE.Vector3(-7, -7.5, 0)), objetoIntersectado, -1, 0, 0);
        } else {
            centerCamera();
        }
    });
    const prevBtn = div.querySelector('.prev-button');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            isOnObject = false;
            orbit.enabled = true;
            renderer.domElement.style.pointerEvents = 'auto';
            css2dRenderer.domElement.style.pointerEvents = 'none';
            scene.remove(divContainer);
            if (projectData.prev === 'Project1') {
                const objetoIntersectado = model.getObjectByName('Project1');
                updateCameraPosition(objetoIntersectado.position.clone().add(new THREE.Vector3(-7, -7.5, 0)), objetoIntersectado, -1, 0, 0);
            } else if (projectData.prev === 'Project2') {
                const objetoIntersectado = model.getObjectByName('Project2');
                updateCameraPosition(objetoIntersectado.position.clone().add(new THREE.Vector3(-7, -7.5, 0)), objetoIntersectado, -1, 0, 0);
            } else {
                centerCamera();
            }
        });
    }
}

//--------------------------- CALENDAR ------------------------------
function create2DObjectsCalendar() {
    
    let calendarContainerDimension = calculateObjectContainer(0.4, 0.992, 1.5, 1);
    
    const htmlContent = generateCalendar();
    const divAboutMe = document.createElement('div');
    divAboutMe.className = 'calendar-container';
    divAboutMe.style.width = `${calendarContainerDimension.containerWidth}px`;
    divAboutMe.style.height = `${calendarContainerDimension.conatinerHeight}px`;
    divAboutMe.innerHTML = htmlContent;

    divAboutMe.addEventListener('click', event => event.stopPropagation());
    
    const divContainer = new CSS2DObject(divAboutMe);
    scene.add(divContainer);
    divContainer.position.set(4.500, 7.8, -13.966);

    // Obtener los contenedores de trabajo y estudio
    const workContainer = divAboutMe.querySelector('#workContainer');
    const studyContainer = divAboutMe.querySelector('#studyContainer');

    const switchWork = divAboutMe.querySelector('#switchWork');
    switchWork.addEventListener('change', () => {
        if (switchWork.checked) {
            workContainer.style.display = 'block';
            studyContainer.style.display = 'none';
        }
    });
    const switchStudy = divAboutMe.querySelector('#switchStudy');
    switchStudy.addEventListener('change', () => {
        if (switchStudy.checked) {
            workContainer.style.display = 'none';
            studyContainer.style.display = 'block';
        }
    });

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

//--------------------------- ABOUT ME ------------------------------
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

function helper() {
    const helper = document.querySelector('.helper-container');
    if (helper) {
        helper.remove();
        return;
    }
    const helperHTML = `
        <div class="helper">
            <p class="helper-item">Click on the projects to see more details</p>
            <p class="helper-item">Click on the calendar to see my experience</p>
            <p class="helper-item">Click on the desktop to see the menu</p>
            <button class="helper-button">Close</button>
        </div>
    `;
    const helperContainer = document.createElement('div');
    helperContainer.innerHTML = helperHTML;
    helperContainer.classList.add('helper-container');
    document.body.appendChild(helperContainer);
    const closeBtn = helperContainer.querySelector('.helper-button');
    closeBtn.addEventListener('click', () => {
        helperContainer.remove();
    });
}