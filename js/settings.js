import { themePage, fontPage, fontSizePage, voiceAssistantPage } from './settingPages.js';
import { create2DObjectsAboutMe } from './script.js';
export function settings() {
    //Delete Menu Container
    let menuContainer = document.querySelector('.menu-container');
    if (menuContainer){
        menuContainer.remove();
    }
    //Create 
    let settingsContainer = document.createElement('div');
    settingsContainer.id = 'settingsContainer';
    settingsContainer.innerHTML = `
        <div id="settings">
            <h1>Settings</h1>
            <div class="cards">
                <div id="card-theme" class="card">
                    <h2>Palette</h2>
                </div>
                <div id="card-font" class="card">
                    <h2>Font</h2>
                </div>
                <div id="card-font-size" class="card">
                    <h2>Font Size</h2>
                </div>
                <div id="card-voice-assistant" class="card">
                    <h2>Voice Assistant</h2>
                </div>
            </div>
            <div class="back"/>
        </div>
    `;
    //eliminar lo que hay dentro de about-me-container
    document.querySelector('.desktop').innerHTML = '';
    document.querySelector('.desktop').appendChild(settingsContainer);

    let cardTheme = document.getElementById('card-theme');
    let fontTheme = document.getElementById('card-font');
    let fontSize = document.getElementById('card-font-size');
    let voiceAssistant = document.getElementById('card-voice-assistant');
    let back = document.querySelector('.back');
    //Theme
    cardTheme.addEventListener('click', () => {
        themePage();
    });
    //Font
    fontTheme.addEventListener('click', () => {
        fontPage();
    });
    //Font Size
    fontSize.addEventListener('click', () => {
        fontSizePage();
    });
    //Voice Assistant
    voiceAssistant.addEventListener('click', () => {
        voiceAssistantPage();
    });
    //Back
    back.addEventListener('click', () => {
        create2DObjectsAboutMe();
    });
}