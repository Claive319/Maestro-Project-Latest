const express = require('express');
const app = express()
const bodyParser = require('body-Parser');
const mysql = require('mysql');
const port = process.env.PORT || 3001;
const cors = require('cors');


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3001, () => {

    console.log('Server is running on Port 3001')

})


const db = mysql.createPool({

    host: "localhost",

    user: "root",

    password: "",

    database: "maestro_project"

})


app.post('/', (req, res) => {
    console.log(req.body);
    const body = req.body
    const sql = "INSERT INTO employees (name, username, password, designation_id, department, create_date,update_date) VALUES(?,?,?,?,?,?,?)"

    db.query(sql, [body.name, body.username, body.password, body.designation, body.dept, body.createDate, body.updateDate], (err, result) => {

        console.log(err);

    })
})

app.post('/saveDesig', (req, res) => {
    console.log(req.body);
    const body = req.body
    const sql = "INSERT INTO designation (title) VALUES(?)"

    db.query(sql, [body.dTitle], (err, result) => {


        console.log(err);
        res.send(result)

    })
})
app.post('/addDept', (req, res) => {
    console.log(req.body);
    const body = req.body
    const sql = "INSERT INTO department (title) VALUES(?)"

    db.query(sql, [body.deptTitle], (err, result) => {


        console.log(err);
        res.send(result)

    })
})
app.delete('/designations/:id',(req,res)=>{

    const id = req.params.id;
    
    const sql="DELETE FROM designation WHERE designation_id=?"
    
    db.query(sql , [id] ,(err,result)=>{
    
    if(err) console.log(err);
    
    res.send(result);
    
    })
    
    })


app.get('/designations', (req, res) => {

    const sql = "SELECT * FROM designation"

    db.query(sql, (err, result) => {

        res.send(result);

    })

})

app.get