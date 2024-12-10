require('colors');
const { printMenu, pause } = require('./helpers/message');
const { inquirerMenu, inquirerPause, leerInput, borrar, confirmar, checkList } = require('./helpers/inquirer')
const { TaskList } = require('./models/taskList')
const { Task } = require('./models/task')
const { saveTask, readTask, readTaskBD } = require('./helpers/saveInfo')
console.clear();

const main = async () => {
    let opt = '';
 

    
    do {
        
        const taskList = new TaskList()
        const taskBD = await readTask()

        taskList.addTaskFromList(taskBD)
        
        
        opt = await inquirerMenu()

        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ')
                taskList.addTask(desc)
                taskList.listadoCompleto()
                break;
            case '2':
                taskList.listadoCompleto()
                break
            case '3':
                taskList.listadoDeCompletadas()
                //Listar tareas completada
                break;
            case '4':
                taskList.listadoDeNoCompletadas()
                //Listar tareas pendientes
                break;
            case '5':
                let ids = await checkList(taskList.getList)
                taskList.switchMarcados(ids)
                //Completar tareas
                break

            case '6':
                //Borrar tarea
                const id = await borrar(taskList.getList)
                if (id !== 0) {
                    const ok = await confirmar('¿Estas seguro?');
                    if (ok) {
                        taskList.deleteTask(id)
                        console.log('Tarea borrada')
                    }
                }

                break;
            case '7':
                break;
            default:

                break;
        }
        
        //await saveTask(taskList.getList)
        await inquirerPause()
        
        // const task = new Task('Hacer interfaces')
        // console.log(task)
        // const taskList = new TaskList()
        // taskList._list[task.id]
        // console.log(taskList)


    } while (opt !== '7');
}

main();