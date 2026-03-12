import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const API = "http://localhost:9090/api";

const Login = () => {

  const navigate = useNavigate();

  const [loginData,setLoginData] = useState({
    email:"",
    password:"",
    role:"IMPORTER"
  });

  const handleChange = (e)=>{
    setLoginData({
      ...loginData,
      [e.target.name]:e.target.value
    });
  };

  const handleLogin = async (e)=>{

    e.preventDefault();
    
    try{

      const res = await fetch(`${API}/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
      });

      const data = await res.json();


      if(res.ok){

        localStorage.setItem("user",JSON.stringify(data));

        alert("Login successful");

        if(loginData.role === "IMPORTER"){
          navigate("/importer/dashboard");
        }
        else if(loginData.role === "EXPORTER"){
          navigate("/exporter/dashboard");
        }
        else if(loginData.role === "BANKER"){
          navigate("/bank/dashboard");
        }

      }else{
        alert(data.message || "Login failed");
      }

    }catch(err){
      alert("Server error");
      console.error(err);
    }

  };

  return(

    <div className="min-h-screen flex items-center justify-center bg-blue-900">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        />

        <select
          name="role"
          value={loginData.role}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        >
          <option value="IMPORTER">Importer</option>
          <option value="EXPORTER">Exporter</option>
          <option value="BANKER">Banker</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;