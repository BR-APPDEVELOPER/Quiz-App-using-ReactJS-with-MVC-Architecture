import React, { useState,useEffect } from 'react';
import './App.css';

export default function Login({ onLogin }) {
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("Stu");
  const sendPOSTmethod = () => {
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('op').value; // Get user type (e.g., "Stu" for student, "adm" for admin)

    fetch('http://localhost:5007/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: userName, password, op:userType }), // Pass userType along with username and password
    })
      .then(res => res.json())
      .then(data => {
        //window.alert(data.message);
        setMessage(data.message);
        console.log(data.message);
        if (data.message !== 'Logged In Successfully') {
           console.log(userName,password,userType);
        } else {
          console.log(userName,password,userType);
          onLogin(userName, userType); // Pass both username and userType to the onLogin function
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const callSignUp = () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const userType = document.getElementById('op').value; // Get user type for sign up

    const postData = {
      username: user,
      password: pass,
      op:userType // Include userType in the signup data
    };

    fetch('http://localhost:5007/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Signup successful:', data);
        //window.alert('Signup successful'); // Show signup message as a window popup
      })
      .catch(error => {
        console.error('Error:', error);
        //window.alert('Error signing up: ' + error.message); // Show error message as a window popup
      });
  };

 
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div id="D1" className="App" style={{ padding: "100px", textAlign: "center", justifyContent: "center" }}>
      <h1 id = "wel">Quiz App</h1>
      <label id = "txtbx"> Username <input type="text" id='username' style={{ maxWidth: "150px", margin: "5px" }} /></label>
      <br />
      <label id = "txtbx1"> Password <input type="password" id='password' style={{ maxWidth: "150px", margin: "5px" }} /></label>
      <br />
      <select id='op' value={userType} onChange={handleUserTypeChange}>
        <option value="Stu">Student</option>
        <option value="adm">Admin</option>
      </select>
      <br /><br /><br /><br />
      <button id = "l" onClick={sendPOSTmethod}>Login</button>&nbsp;&nbsp;&nbsp;&nbsp;
      {userType === "Stu" && <button id="s" onClick={callSignUp} disabled={userType === "adm"}>Signup</button>}
    </div>
  );
}
