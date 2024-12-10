require('colors');

const printMenu = () => {
    return new Promise(resolve => {
        console.clear();
        console.log('========================'.green);
        console.log('MENÚ DE USUARIO'.green);
        console.log('========================'.green);
        console.log('1.- Crear tarea');
        console.log('2.- Listar tareas');
        console.log('3.- Listar tareas completadas');
        console.log('4.- Listar tareas pendientes');
        console.log('5.- Completar tarea(s)');
        console.log('6.- Borrar tarea');
        console.log('7.- Salir');

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Seleccione una opción: ', (opt) => {
            readLine.close();
            resolve(opt);
        });
    });
}

const pause = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${'Enter'.green} para continuar\n`,(opt) => {
            readline.close();
            resolve();
        })
    });
}

module.exports = {
    printMenu,
    pause
}