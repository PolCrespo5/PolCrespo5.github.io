export function handleProjectSelection(projectName) {
    switch (projectName) {
        case 'Project1':
            return {
                name: "STREETFEED",
                subtitle: "Solidary Food Delivery Platform",
                description: "StreetFeed es una iniciativa solidaria que te permite colaborar para llevar comida a quienes más lo necesitan. Con StreetFeed, puedes unirte a una red de apoyo para entregar alimentos a personas en situación de vulnerabilidad",
                video: "https://youtu.be/Em0NFr9DpF4",
                tags: ["LARAVEL", "VUE"],
                buttons: ["Salir", "Ver en GitHub"],
                position: [14.900, 6.500, -4.000]
            };
        case 'Project2':
            return {
                name: "LIBE",
                subtitle: "School Assistance",
                description: "An attendance management app in educational institutions. It uses geolocation to track student presence, offers features like statistics, schedules, absence justifications, and notifications. Users include students, teachers, and classes. Simplify attendance management with our powerful app.",
                video: "https://youtu.be/Em0NFr9DpF4",
                tags: ["ANDROID STUDIO (KOTLIN)", ".NET"],
                buttons: ["Salir", "Ver en GitHub"],
                position: [14.900, 6.500, 2.000]
            };
        case 'Project3':
            return {
                name: "WEB SCRAPPING",
                subtitle: "Macroeconomy Charts",
                description: "With scrapy scripts in Python language, I have gathered data from bank websites, and i show it in graphs using the Dash library, and then on the web page you can analyze the data.",
                video: "https://youtu.be/Em0NFr9DpF4",
                tags: ["ANDROID STUDIO (KOTLIN)", ".NET"],
                buttons: ["Salir", "Ver en GitHub"],
                position: [14.900, 6.500, 8.000]
            };
        default:
            console.error('Project not found');
            return;
    }
}