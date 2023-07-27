const express = require("express");
const PORT = process.env.PORT ?? 8000;
const app = express();
const {vd: uuidv4} = require('uuid')
const cors = require('cors')
const pool = require('./db')


app.use(cors())

// get all todos
app.get("/todos/:userEmail", async(req,res)=>{
    const {userEmail} = req.params
      
try {
const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
res.json(todos.rows)
} catch (error) {
  console.error(error)  
}    
})

// create a new todo
app.post("/todos", (req, res)=>{
    const {user_email, title, progress, date} = req.body
    console.log(user_email, title, progress, date);
    const id = uuidv4
    try {
   pool.query(`INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`,[id, user_email, title, progress, date])     
    } catch (error) {
     console.log(error);   
    }
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
