export function generateCalendar() {
    return `
        <div class="switches-container">
            <input type="radio" id="switchWork" name="switchPlan" value="Work" checked="checked" />
            <input type="radio" id="switchStudy" name="switchPlan" value="Study" />
            <label for="switchWork">Work</label>
            <label for="switchStudy">Studies</label>
            <div class="switch-wrapper">
                <div class="switch">
                    <div>Work</div>
                    <div>Studies</div>
                </div>
            </div>
        </div>
        <div class="work-container" id="workContainer">
            <h1>Work Experience</h1>
            <div class="timeline">
                <ul>
                    <li>
                        <div class="content">
                        <h3>ENINTER - Frontend Developer</h3>
                        <p>As a <strong>Frontend Developer</strong> for the Ticketing Tool, my tasks include implementing interactive user interfaces using <strong>Angular</strong>, along with HTML, SCSS, and TypeScript. Additionally, I have worked on integrating connections via Bluetooth LE and collaborated on the development of mobile applications using <strong>Android Studio</strong>, focusing on <strong>Kotlin and Compose</strong>.</p>
                        </div>
                        <div class="time">
                        <h4>NOVEMBER 2023</h4>
                        </div>
                    </li>
                    
                    <li>
                        <div class="content">
                        <h3>Datapta - Web Scrapping</h3>
                        <p>In data extraction projects using <strong>Web Scraping</strong>, I primarily utilized <strong>Python</strong> along with the <strong>Dash framework</strong> to develop efficient data extraction tools. My work contributed to the <strong>collection and analysis</strong> of relevant information for various <strong>business purposes</strong>.</p>
                        </div>
                        <div class="time">
                        <h4>JANUARY 2023</h4>
                        </div>
                    </li>
                    <div style="clear:both;"></div>
                </ul>
            </div>
        </div>
        <div class="study-container" id="studyContainer" style="display:none;">
            <h1>Study Experience</h1>
            <div class="timeline">
                <ul>
                    <li>
                        <div class="content">
                        <h3></h3>
                        <p>As a <strong>Frontend Developer</strong> for the Ticketing Tool, my tasks include implementing interactive user interfaces using <strong>Angular</strong>, along with HTML, SCSS, and TypeScript. Additionally, I have worked on integrating connections via Bluetooth LE and collaborated on the development of mobile applications using <strong>Android Studio</strong>, focusing on <strong>Kotlin and Compose</strong>.</p>
                        </div>
                        <div class="time">
                        <h4>SEPTEMBER 2023</h4>
                        </div>
                    </li>
                    
                    <li>
                        <div class="content">
                        <h3>Datapta - Web Scrapping</h3>
                        <p>In data extraction projects using <strong>Web Scraping</strong>, I primarily utilized <strong>Python</strong> along with the <strong>Dash framework</strong> to develop efficient data extraction tools. My work contributed to the <strong>collection and analysis</strong> of relevant information for various <strong>business purposes</strong>.</p>
                        </div>
                        <div class="time">
                        <h4>JANUARY 2023</h4>
                        </div>
                    </li>

                    <li>
                        <div class="content">
                        <h3>Datapta - Web Scrapping</h3>
                        <p>In data extraction projects using <strong>Web Scraping</strong>, I primarily utilized <strong>Python</strong> along with the <strong>Dash framework</strong> to develop efficient data extraction tools. My work contributed to the <strong>collection and analysis</strong> of relevant information for various <strong>business purposes</strong>.</p>
                        </div>
                        <div class="time">
                        <h4>JANUARY 2023</h4>
                        </div>
                    </li>
                    <div style="clear:both;"></div>
                </ul>
            </div>
        </div>
        <button class="calendar-button">EXIT</button>
    `;
}