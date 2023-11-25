const express= require('express');
const validator=require('../src/helper/validator');

const app=express();
app.use(express.json());

let tasks=[]

app.get('/tasks', (req, res) => {
    if(req.query.completed) {
        const isCompleted = req.query.completed === 'true';
        let filteredTasks = filteredTasks.filter(task => task.completionStatus === isCompleted);
        filteredTasks.sort(validator.compareDates);
       return res.status(200).send(filteredTasks)
    }
    return res.status(200).send(tasks)
})

app.get('/tasks/:id', (req, res) => {
    let taskIdPassed=req.params.id;
    let result= tasks.filter( val => val.id == taskIdPassed);
    if(!result){
        res.status(400).send("No Task found")
    }
    return res.status(200).send(result)
})

app.put('/updateTasks/:id', (req, res) =>{
    const taskId = req.params.id;
    const { title, description, completionStatus, priority } = req.body;

    // Input validation
    if (!title || !description || completionStatus === undefined || !['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'Invalid input' });
    }

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description,
      completionStatus,
      priority,
    };
    res.status(200).send(tasks[taskIndex])

})

app.get('/tasks/priority/:level', (req, res) => {
    const priorityPassed= req.params.level.toLowerCase();
    const priorityTasks= tasks.filter(task => task.priority === priorityPassed);
    if(priorityTasks){
        return res.status(200).send(priorityTasks);
    }
    else{
        res.status(400).send("No Such Task found")
    }
})

app.post('/tasks', (req, res) => {
    let taskPassed=req.body;
    if(validator.tasksIdExist(taskPassed,tasks) && validator.titleDesCheck(taskPassed) && validator.statusCheck(taskPassed)){
        taskPassed.createdAt=Date.now();
        tasks.push(taskPassed);
        res.status(200).send("tasks added successfully");
    } else{
        res.status(400).send("Request you have send has something incorrect");
    }
})

app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(200).send('Task deleted successfully' );
});

app.listen(3001,(err)=>{
    if(err){
        console.log("Some error occured")
    }
    else{
        console.log("Server is listening to port number 3001")
    }
})