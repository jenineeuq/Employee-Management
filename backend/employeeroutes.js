const express = require('express');
const db = require('./db'); 
const router = express.Router();


router.post('/employees', async (req, res) => {
  const { firstName, lastName, employeeId, email, phoneNumber, department, dateOfJoining, role } = req.body;
  try {
    const query = `INSERT INTO employees (firstName, lastName, employeeId, email, phoneNumber, department, dateOfJoining, role)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [firstName, lastName, employeeId, email, phoneNumber, department, dateOfJoining, role];
    await db.execute(query, values);

    res.status(201).json({ message: 'Employee added successfully!' });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Failed to add employee.' });
  }
});

// // Fetch all employees
// router.get('/employees', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM employees');
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     res.status(500).json({ message: 'Failed to fetch employees.' });
//   }
// });

module.exports = router;
