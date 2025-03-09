import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
    scenarios: {
        ui_load_test: {
            executor: 'ramping-arrival-rate', // Simula una carga constante de usuarios
            startRate: 5, // Comenzar con 50 usuarios por minuto
            timeUnit: '5s', // Definir la tasa en minutos
            preAllocatedVUs: 5, // Número de usuarios virtuales preasignados
            maxVUs: 10, // Máximo de usuarios virtuales simultáneos
            stages: [
                { duration: '1m', target: 50 }, // Mantener 50 usuarios/min durante 1 minuto
            ],
        },
    },
};

export default async function () {
    const page = browser.newPage();

    try {
        await page.goto('http://192.168.1.5:3000/');

        // Tomar una captura de pantalla y guardarla como screenshot.png
        await page.screenshot({ path: `screenshot-${__VU}.png` });

        // Verificar que la página cargó correctamente
        check(page, {
            'Página cargada': (p) => p.title() !== '',
        });

    } finally {
        page.close();
    }
}