export function handleProjectSelection(projectName) {
    switch (projectName) {
        case 'Project1':
            return {
                name: "STREETFEED",
                image: "streetfeed.svg",
                description: "StreetFeed es una iniciativa solidaria que te permite colaborar para llevar comida a quienes más lo necesitan. Con StreetFeed, puedes unirte a una red de apoyo para entregar alimentos a personas en situación de vulnerabilidad",
                tags: ["LARAVEL", "VUE"],
                redirectDemo: "http://daw.abp-politecnics.com/daw07/Streetfeed/public/index.php",
                redirectGithub: "https://github.com/MarioMolina27/Streetfeed.git",
                position: [14.900, 6.500, -4.000],
                prev: null,
                next: "Project2"
            };
        case 'Project2':
            return {
                name: "LIBE",
                image: "libe.png",
                description: "An attendance management app in educational institutions. It uses geolocation to track student presence, offers features like statistics, schedules, absence justifications, and notifications. Users include students, teachers, and classes. Simplify attendance management with our powerful app.",
                tags: ["ANDROID STUDIO", ".NET"],
                redirectDemo: "https://www.youtube.com/playlist?list=PL1TMDpRvm7pkxp8lU4ylzcGdf1eVa6xhu",
                redirectGithub: "https://github.com/PolCrespo5/Libe_API",
                position: [14.900, 6.500, 2.000],
                prev: "Project1",
                next: "Project3"
            };
        case 'Project3':
            return {
                name: "WEB SCRAPPING",
                image: "web-scrapping.png",
                description: "With scrapy scripts in Python language, I have gathered data from bank websites, and i show it in graphs using the Dash library, and then on the web page you can analyze the data.",
                tags: ["PYTHON", "DASH"],
                redirectDemo: "https://www.datapta.com/finasset/investments",
                redirectGithub: "https://github.com/MarioMolina27/Streetfeed.git",
                position: [14.900, 6.500, 8.000],
                prev: "Project2",
                next: null
            };
        default:
            console.error('Project not found');
            return;
    }
}