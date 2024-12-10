const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tarea completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tarea pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '7',
                name: `${'7.'.green}  Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {

    console.clear()
    console.log('========================'.green);
    console.log('MENÚ DE USUARIO'.white);
    console.log('========================'.green);

    const { opcion } = await inquirer.prompt(preguntas)

    return opcion
}

const inquirerPause = async () => {
    const question = [
        {
            type: 'input',
            name: 'server',
            message: `Pressione ${'enter'.green} para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question)
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Por favor introduzca un valor'
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}

const borrar = async (tareas=[]) => {
    const choices = tareas.map((task , i) => {
        const index = `${i + 1} `.green
        return {
            value: task.id ,
            name:`${index} : ${task.description}`
        }
    })

    choices.unshift({
        value: '0',
        name: `Cancelar`.red
    })

    const question = [{
        type: 'list',
        name: 'id',
        message: 'borrar',
        choices : choices
    }]

    const { id } = await inquirer.prompt(question)
    return id;
}

const confirmar = async (message) =>{
    const preguntas = [{
        type: 'confirm',
        name: 'ok',
        message: message
    }]

    const { ok } = await inquirer.prompt(preguntas)
    return ok
}

const checkList = async(tareas) => {
    const choices = tareas.map((task , i) => {
        const index = `${i+ 1}`.green
        return {
            value: task.id ,
            name:`${index} : ${task.description}`,
            checked: task.completed ? true : false
        }
    })



    const question = [{
        type: 'checkbox',
        name: 'id',
        message: 'seleccionados',
        choices : choices
    }]

    const { id } = await inquirer.prompt(question)
    return id;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    leerInput,
    borrar,
    confirmar,
    checkList
}