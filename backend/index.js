const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for requests from frontend (localhost:3001)
app.use(cors({
  origin: 'http://localhost:3001',  
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Your other routes and configurations here...

app.listen(3000, () => {
  console.log('Employee Management API running on http://localhost:3000');
});
