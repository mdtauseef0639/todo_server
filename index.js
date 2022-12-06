const express = require("express");
const cors = require("cors");

const pool = require("./db");

const app = express()

//middleware
app.use(cors())
app.use(express.json())


//ROUTES//

//create a todo

app.post("/todos",async(req,res)=>{
    try{
        const todo_id = req.body.todo_id
        const title = req.body.title
        const task = req.body.task
        const time = req.body.time


        const newTodo = await pool.query("INSERT INTO todo(todo_id,title,task,time) VALUES($1,$2,$3,$4) RETURNING *",[todo_id,title,task,time])

        res.json(newTodo.rows[0])
    }
    catch(err){
        console.error(err.message)
    }
})

//get all todos

app.get("/todos",async(req,res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    }
    catch(err){
    console.error(err.message)
    }
})

//update a todo

app.put("/todos/:id",async(req,res)=>{
    try{
        
        const title = req.body.title
        const task = req.body.task
        const time = req.body.time
        const todo_id = req.params.id

        const updateTodo =await pool.query("UPDATE todo SET title =$1,task=$2,time=$3 WHERE todo_id=$4",[title,task,time,todo_id])

        res.json(updateTodo.rows[0])
    }
    catch(err){
        console.error(err.message)
    }
})

//delete a todo

app.delete("/todos/:id",async(req,res)=>{
    try{
        const todo_id = req.params.id
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1",[todo_id])
        res.json("Todo was deleted")
    }
    catch(err){
        console.error(err.message)
    }
})


app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`)
})