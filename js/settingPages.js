import { settings } from "./settings.js";
import { setAssistantVoice } from "./script.js";

export function themePage() {
    let settingsContainer = document.getElementById('settingsContainer');
    settingsContainer.innerHTML = `
        <div id="settings">
            <h1 class="speakable">The Palette</h1>
            <p class="palette-call-action speakable">Configure the <strong>colors</strong> from the website</p>
            <div class="color-picker-container">
                <div class="color-picker-card">
                    <input type="color" id="primary" value="#6B6B6B">
                    <label class="speakable" for="primary">Primary</label>
                </div>
                <div class="color-picker-card">
                    <input type="color" id="secondary" value="#3C3C3C">
                    <label class="speakable" for="secondary">Secondary</label>
                </div>
                <div class="color-picker-card">
                    <input type="color" id="callAction" value="#603870">
                    <label class="speakable" for="callAction">Call to action</label>
                </div>
                <div class="color-picker-card">
                    <input type="color" id="text" value="#F3F3F3">
                    <label class="speakable" for="text">Text</label>
                </div>
            </div>
            <div class="back"></div>
            <div class="palette-reset"></div>
        </div>
    `;
    document.querySelectorAll('.color-picker-card input[type="color"]').forEach(input => {
        input.addEventListener('input', event => {
            const colorVar = `--${event.target.id}`;
            document.documentElement.style.setProperty(colorVar, event.target.value);
        });
    });
    document.querySelector('.palette-reset').addEventListener('click', () => {
        document.documentElement.style.setProperty('--primary', '#6B6B6B');
        document.documentElement.style.setProperty('--secondary', '#3C3C3C');
        document.documentElement.style.setProperty('--callAction', '#603870');
        document.documentElement.style.setProperty('--text', '#F3F3F3');
        document.getElementById('primary').value = '#6B6B6B';
        document.getElementById('secondary').value = '#3C3C3C';
        document.getElementById('callAction').value = '#603870';
        document.getElementById('text').value = '#F3F3F3';
    });

    document.querySelector('.back').addEventListener('click', () => {
        document.getElementById('settings').remove();
        settings();
    });
}

export function fontPage() {
    let settingsContainer = document.getElementById('settingsContainer');
    settingsContainer.innerHTML = `
        <div id="settings">
            <h1 class="speakable">The Fonts</h1>
            <p class="fonts-call-action speakable">Configure the <strong>font family</strong> from the website</p>
            <div class="tipography-picker-container">
                <div class="tipography-picker-card active" data-font="sans-serif">
                    <label class="speakable">Sans-Serif</label>
                </div>
                <div class="tipography-picker-card" data-font="serif">
                    <label class="speakable">Serif</label>
                </div>
            </div>
            <div class="back"></div>
            <div class="fonts-reset"></div>
        </div>
    `;
    document.querySelectorAll('.tipography-picker-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.tipography-picker-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const fontVar = '--font';
            const fontValue = card.getAttribute('data-font') === 'sans-serif' ? 'Poppins, sans-serif' : 'Merriweather, serif';
            document.documentElement.style.setProperty(fontVar, fontValue);
        });
    });
    document.querySelector('.fonts-reset').addEventListener('click', () => {
        document.documentElement.style.setProperty('--font', 'Poppins, sans-serif');
        document.querySelector('.tipography-picker-card[data-font="sans-serif"]').classList.add('active');
        document.querySelector('.tipography-picker-card[data-font="serif"]').classList.remove('active');
    });
    
    document.querySelector('.back').addEventListener('click', () => {
        document.getElementById('settings').remove();
        settings();
    });
}

export function fontSizePage() {
    let settingsContainer = document.getElementById('settingsContainer');
    settingsContainer.innerHTML = `
    <div id="settings">
        <h1>The Fonts Size</h1>
        <p class="font-size-call-action speakable">Configure the <strong>font size</strong> from the website</p>
        <div class="tipography-size-picker-container">
            <div class="tipography-size-picker-card" data-font-size="small">
                <label class="speakable">Small</label>
            </div>
            <div class="tipography-size-picker-card active" data-font-size="medium">
                <label class="speakable">Medium</label>
            </div>
            <div class="tipography-size-picker-card" data-font-size="big">
                <label class="speakable">Big</label>
            </div>
        </div>
        <div class="back"></div>
        <div class="fonts-size-reset"></div>
    </div>
    `;
    document.querySelectorAll('.tipography-size-picker-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.tipography-size-picker-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const fontSizeVar = '--font-size';
            const fontSizeValue = card.getAttribute('data-font-size') === 'small' ? '0.8' : card.getAttribute('data-font-size') === 'medium' ? '1' : '1.2';
            document.documentElement.style.setProperty(fontSizeVar, fontSizeValue);
        });
    });
    document.querySelector('.fonts-size-reset').addEventListener('click', () => {
        document.documentElement.style.setProperty('--font-size', '18px');
        document.querySelector('.tipography-size-picker-card[data-font-size="small"]').classList.remove('active');
        document.querySelector('.tipography-size-picker-card[data-font-size="medium"]').classList.add('active');
        document.querySelector('.tipography-size-picker-card[data-font-size="big"]').classList.remove('active');
    });
    document.querySelector('.back').addEventListener('click', () => {
        document.getElementById('settings').remove();
        settings();
    });
}

export function voiceAssistantPage() {
    let settingsContainer = document.getElementById('settingsContainer');
    settingsContainer.innerHTML = `
    <div id="settings">
        <h1 class="speakable">Voice Assistant</h1>
        <p class="assistant-call-action speakable">Implement a <strong>voice assistant</strong> in the website when you hover the elements</p>
        <div class="assistant-picker-container">
            <div class="assistant-picker-card active" data-assistant="off">
                <label class="speakable">No</label>
            </div>
            <div class="assistant-picker-card" data-assistant="on">
                <label class="speakable">Yes</label>
            </div>
        </div>
        <div class="back speakable"></div>
    </div>
    `;
    document.querySelectorAll('.assistant-picker-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.assistant-picker-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            if (card.getAttribute('data-assistant') === 'on') {
                setAssistantVoice(true)
            } else {
                setAssistantVoice(false)
            }
        });
    });
    document.querySelector('.back').addEventListener('click', () => {
        document.getElementById('settings').remove();
        settings();
    });
}