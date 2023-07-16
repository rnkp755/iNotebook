import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
      const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" })

      let navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            const { name, email, password } = credentials;
            const response = await fetch("http://127.0.0.1:5000/api/auth/signup", {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                  //Save the auth-token and Redirect to Homepage
                  localStorage.setItem('token', json.authtoken);
                  props.showAlert("Account Created successfully", "success");
                  navigate("/");
            }
            else {
                  props.showAlert("Invalid details", "danger");
            }
      }

      const onchange = (e) => {
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

      return (
            <form className="container mt-3" onSubmit={handleSubmit}>
                  <h2>Signup to continue..</h2>
                  <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onchange} minLength={3} required />
                  </div>
                  <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onchange} required aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onchange} minLength={5} required value={credentials.password} />
                  </div>
                  <div className="mb-3">
                        <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" onChange={onchange} minLength={5} required value={credentials.password} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      )
}

export default Signup
