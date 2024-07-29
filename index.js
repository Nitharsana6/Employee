
// const express=require ('express')
// const app=express() 
// const port=9000; 
// const routes=require('./route')


// app.use('/', routes);
// app.listen(port,()=>{
//     console.lofg(`server is running on port ${port}`)
//  });

// Step 1: Set Up the Project
// Initialize a new Node.js project and install Express.js
// npm init -y
// npm install express

// Step 2: Create the Server
const express = require('express');
const app = express();
const port = 9000;

// Initialize a data array to store Employee records
let employees = [
  { id: 1, name: "John Doe", course: "Engineering", roll_no: "123" },
  { id: 2, name: "Jane Smith", course: "Medicine", roll_no: "456" }
];

// Middleware to parse URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON payloads
app.use(express.json());

// Step 3: Define API Endpoints

// Get All Employees Data (Read)
app.get('/', (req, res) => {
  res.json(employees);
});

// Get a Single Employee Record (Read)
app.get('/:id', (req, res) => {
  const employee = employees.find(emp => emp.id == req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

// Insert a New Employee Record (Create)
app.post('/', (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    course: req.body.course,
    roll_no: req.body.roll_no
  };
  employees.push(newEmployee);
  res.status(201).send('Employee added successfully');
});

// Update an Employee Record (Update)
app.put('/:id', (req, res) => {
  const employee = employees.find(emp => emp.id == req.params.id);
  if (employee) {
    employee.name = req.body.name;
    employee.course = req.body.course;
    employee.roll_no = req.body.roll_no;
    res.status(201).send('Employee updated successfully');
  } else {
    res.status(404).send('Employee not found');
  }
});

// Partially Update an Employee Record (Update)
app.patch('/:id', (req, res) => {
  const employee = employees.find(emp => emp.id == req.params.id);
  if (employee) {
    if (req.body.name) employee.name = req.body.name;
    if (req.body.course) employee.course = req.body.course;
    if (req.body.roll_no) employee.roll_no = req.body.roll_no;
    res.status(201).send('Employee partially updated successfully');
  } else {
    res.status(404).send('Employee not found');
  }
});

// Delete an Employee Record (Delete)
app.delete('/:id', (req, res) => {
  const employeeIndex = employees.findIndex(emp => emp.id == req.params.id);
  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Employee not found');
  }
});

// Listen to the Server on Port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

 