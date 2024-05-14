export function generateCalendar() {
    return `
        <div class="switches-container">
            <input type="radio" id="switchWork" name="switchPlan" value="Work" checked="checked" />
            <input type="radio" id="switchStudy" name="switchPlan" value="Study" />
            <label for="switchWork">Experience</label>
            <label for="switchStudy">Studies</label>
            <div class="switch-wrapper">
                <div class="switch">
                    <div>Experience</div>
                    <div>Studies</div>
                </div>
            </div>
        </div>
        <div class="work-container" id="workContainer">
            <h1>My Experience</h1>
            <div class="timeline">
                <div class="experience-item">
                    <div class="card-item">
                        <div class="card-item float-item">
                            <h2 class="item-title">ENINTER</h2>
                            <p class="item-description">As a Frontend Developer for the Ticketing Tool, my tasks include implementing interactive user interfaces using Angular, along with HTML, SCSS, and TypeScript. Additionally, I have worked on integrating connections via Bluetooth LE and collaborated on the development of mobile applications using Android Studio, focusing on Kotlin and Compose.</p>                        </div>
                        <div class="date-end-item">
                            Present
                        </div>
                        <div class="date-start-item">
                            11/2023
                        </div>
                    </div>
                </div>
                <div class="experience-item">
                    <div class="card-item">
                        <div class="card-item float-item">
                            <h2 class="item-title">DATAPTA</h2>
                            <p class="item-description">Some extraction projects using Web Scraping, I primarily utilized Python along with the Dash framework to develop efficient data extraction tools. My work contributed to the collection and analysis of relevant information for various business purposes</p>                        
                        </div>
                        <div class="date-end-item">
                            06/2023
                        </div>
                        <div class="date-start-item">
                            01/2023                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="study-container" id="studyContainer" style="display:none;">
            <h1>MY STUDIES</h1>
            <div class="timeline">
                <div class="experience-item">
                    <div class="card-item">
                        <div class="card-item float-item">
                            <h2 class="item-title">DAW</h2>
                            <p class="item-description">In the DAW program, I'm advancing my frontend skills with frameworks like Angular or React and learning backend development with Express.js and RESTful APIs. I'm gaining experience in full-stack development, performance optimization, and scalability best practices.</p>                        </div>
                        <div class="date-end-item">
                            Present
                        </div>
                        <div class="date-start-item">
                            09/2023
                        </div>
                    </div>
                </div>
                <div class="experience-item">
                    <div class="card-item">
                        <div class="card-item float-item">
                            <h2 class="item-title">DAM</h2>
                            <p class="item-description">In the DAM program, I'm mastering HTML, CSS, JavaScript, and backend technologies like Node.js and MySQL. I'm also learning about web security, version control with Git, and deployment strategies.</p>                        
                        </div>
                        <div class="date-end-item">
                            06/2023                        
                        </div>
                        <div class="date-start-item">
                            09/2021                      
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="calendar-button">EXIT</button>
    `;
}