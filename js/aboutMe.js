import { create2DObjectsAboutMe, removeCSS2DObject } from './script.js';

export function showAboutMe() {
    let menuContainer = document.querySelector('.menu-container');
    if (menuContainer){
        menuContainer.remove();
    }
    //Create 
    let aboutMeContainer = document.createElement('div');
    aboutMeContainer.id = 'aboutMeContainer';
    aboutMeContainer.innerHTML = `
        <div id="aboutMe">
            <img src="../assets/images/me.jpeg" alt="Pol Crespo">
            <div class="info">
                <h1>Pol Crespo</h1>
                <p>Hola! Soy Pol, un apasionado de la tecnología y la programación. Me encanta aprender cosas nuevas y superar retos. Actualmente estoy estudiando un grado superior de Desarrollo de Aplicaciones Multiplataforma en el IES Castellbisbal. También estoy trabajando en mi proyecto personal, una aplicación web de gestión de tareas. Si quieres saber más sobre mi, no dudes en contactar conmigo.</p>
            </div>
            <div class="close"/>
        </div>
    `;
    document.querySelector('.desktop').innerHTML = '';
    document.querySelector('.desktop').appendChild(aboutMeContainer);

    let close = document.querySelector('.close');


    close.addEventListener('click', () => {
        //remove divContainer = new CSS2DObject(divAboutMe);
        removeCSS2DObject();
        create2DObjectsAboutMe();
    });
}