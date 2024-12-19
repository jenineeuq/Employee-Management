const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const cors = require('cors'); // Added CORS support
const EmployeeRoute=require('./employeeroutes')

const app = express();
const port = 3000;

let employees = []; // In-memory database for simplicity

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend communication

// // Route to add an employee
// app.post('/api/employees', (req, res) => {
//   const { firstName, lastName, employeeId, email, phoneNumber, department, dateOfJoining, role } = req.body;

//   // Validation checks
//   if (!firstName || !lastName || !employeeId || !email || !phoneNumber || !department || !dateOfJoining || !role) {
//     return res.status(400).json({ error: 'All fields are required.' });
//   }

//   if (!validator.isAlphanumeric(employeeId) || employeeId.length > 10) {
//     return res.status(400).json({ error: 'Employee ID must be alphanumeric and less than 10 characters.' });
//   }

//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ error: 'Invalid email address.' });
//   }

//   if (!/^\d{10}$/.test(phoneNumber)) {
//     return res.status(400).json({ error: 'Phone number must be a 10-digit number.' });
//   }

//   if (new Date(dateOfJoining) > new Date()) {
//     return res.status(400).json({ error: 'Date of Joining cannot be in the future.' });
//   }

//   // Check for uniqueness of Employee ID
//   if (employees.some(emp => emp.employeeId === employeeId)) {
//     return res.status(400).json({ error: 'Employee ID must be unique.' });
//   }

//   // Add the employee to the database
//   employees.push({ firstName, lastName, employeeId, email, phoneNumber, department, dateOfJoining, role });

//   res.status(201).json({ message: 'Employee added successfully', data: { firstName, lastName, employeeId } });
// });

// // Route to fetch all employees
// app.get('/api/employees', (req, res) => {
//   res.status(200).json({ employees });
// });

// // Route for server health check
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'Server is up and running.' });
// });

app.use('/api',EmployeeRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
