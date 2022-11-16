const express = require('express');
const cors = require("cors");
const pool = require('./database');
const app = express();

//middleware
app.use(cors());
app.use(express.json());
PORT = 5000;
const db = async (query) => {
    try {
        await pool.connect();
        await pool.query(query);
        return true;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
}
const todo = `
CREATE TABLE IF NOT EXISTS "todo"(
    "todo_id" SERIAL,
    "description" VARCHAR(50),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY ("todo_id")

)
`
db(todo).then((result) => {
    if (result) {
        console.log("table created");
    }
})

//ROUTES

//create a todo 
app.post('/createTodo', async (req, res) => {
    try {
        // console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )

        res.send(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//get all todo data

app.get('/getTodo', async (req, res) => {
    try {
        const allTodo = await pool.query("SELECT * FROM todo");
        res.send(allTodo.rows)
    } catch (error) {
        console.error(error.message);

    }

})
app.get('/getTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getIdTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.send(getIdTodo.rows[0])
    } catch (error) {
        console.error(error.message);

    }
})
//update todo 
app.put('/updateTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description= $1 WHERE todo_id = $2", [description, id])
        res.send("data sucessfully update")
    } catch (error) {
        console.error(error.message);

    }
})
//delete todo
app.delete('/deleteTodo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.send("delete the data todo successfully")
    } catch (error) {
        console.error(error.message);

    }
})
app.get('/todosample',(req,res)=>{
    res.send("welcome")
})
app.listen(PORT, () => {
    console.log(`server run succesfully at ${PORT}`);
})