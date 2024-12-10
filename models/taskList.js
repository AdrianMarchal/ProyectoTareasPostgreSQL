const { saveTask, deleteTaskFromDataBase } = require('../helpers/saveInfo')
const {Task} = require('./task')

class TaskList{
    _list = {
        'abc': 123
    }
    get getList(){
        const list = []

        Object.keys(this._list).forEach( key => {
            const tarea = this._list[key]
            list.push(tarea)
        })

        return list;
    }

    constructor(){
        this._list = {}
    }

    async addTask (description)  {
        const task = new Task(description)
        await saveTask(task)
        this._list[task.id] = task
        
    }

    addTaskFromList(taskList = []){
        // taskList.forEach ( task => {
        //     this._list[task.id] = task
        // })
        this._list = taskList
    }

    listadoCompleto(){
        this.getList.forEach((task , index) => {
            const i = `${index + 1} `.green
            const{description,completed} = task;
            const estado = (completed == null)? `No Completado`.red : `Completado`.green

            console.log(`
                **************************************
                ${i}
                ${description}
                ${estado}
                **************************************
                `)
        })
    }

    deleteTask(id){
        let i = 0;
        this._list.forEach((task) => {
            if(task.id === id){
                this._list.splice(i , 1)
                deleteTaskFromDataBase(id)
            } 
            i++
        })
        
    }
    switchMarcados(idMarcados){
        console.log(idMarcados)
        let aux;
        idMarcados.forEach((id) => {
            this._list.forEach((task) => {
                if (task.id == id) aux = task
            })
            
            
            if (aux.completed == null) {
                aux.completed = new Date()
            }else{
                aux.completed = null
            }
           
        })

        console.log(aux)
    }

    listadoDeCompletadas(){
        this.getList.filter(value => value.completed != null).forEach((task , index) => {
            const i = `${index + 1} `.green
            const{description,completed} = task;
            const estado = `Completado`.green

            console.log(`
                **************************************
                ${i}
                ${description}
                ${estado}
                **************************************
                `)
        })
    }

    listadoDeNoCompletadas(){
        
        this.getList.filter(value => value.completed == null).forEach((task , index) => {
            const i = `${index + 1} `.green
            const{description,completed} = task;
            const estado = `No Completado`.red

            console.log(`
                **************************************
                ${i}
                ${description}
                ${estado}
                **************************************
                `)
        })
    }
}



module.exports ={
    TaskList
}
