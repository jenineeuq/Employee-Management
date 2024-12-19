// App.js
import React from 'react';
import AddEmployeeForm from './AddEmployeeForm';  // Import the form component

const App = () => {
  return (
    <div>
      <h1>Employee Management System</h1>
      <AddEmployeeForm />  {/* Render the form component */}
    </div>
  );
};

export default App;
