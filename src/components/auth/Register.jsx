import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = "http://localhost:9090/api";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'importer',
    companyName: '',
    country: '',
    phone: '',
    accNo: '',
    swiftCode: '',
    otp: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const countries = [
    'India','USA','UK','Germany','France','Japan','China',
    'Australia','Canada','Singapore','UAE','Brazil'
  ];

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if(errors[e.target.name]){
      setErrors({
        ...errors,
        [e.target.name]:''
      });
    }
  };

  const validateForm = () => {

    const newErrors = {};

    if(!formData.fullName.trim()){
      newErrors.fullName = "Full name required";
    }

    if(!formData.email.trim()){
      newErrors.email="Email required";
    }

    if(!formData.password){
      newErrors.password="Password required";
    }

    if(formData.password !== formData.confirmPassword){
      newErrors.confirmPassword="Passwords do not match";
    }

    if(!formData.companyName){
      newErrors.companyName="Company name required";
    }

    if(!formData.country){
      newErrors.country="Country required";
    }

    if(!formData.accNo){
      newErrors.accNo="Account number required";
    }

    if(!formData.swiftCode){
      newErrors.swiftCode="Swift code required";
    }

    return newErrors;
  };

  /* ---------------- SEND OTP ---------------- */

  const sendOtp = async () => {

    if(!formData.email){
      alert("Enter email first");
      return;
    }

    try{

      const res = await fetch(`${API}/verify/email`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:formData.email
        })
      });

      const data = await res.json();

      if(res.ok){
        alert(data.message);
        setOtpSent(true);
      }
      else{
        alert(data.message);
      }

    }catch(err){
      alert("Error sending OTP");
    }

  };

  /* ---------------- VERIFY OTP ---------------- */

  const verifyOtp = async () => {

    try{

      const res = await fetch(`${API}/verify/otp`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:formData.email,
          otp:formData.otp
        })
      });

      const data = await res.json();

      if(res.ok){
        alert("OTP verified");
        setOtpVerified(true);
      }
      else{
        alert(data.message);
      }

    }catch(err){
      alert("OTP verification failed");
    }

  };

  /* ---------------- REGISTER USER ---------------- */

  const handleSubmit = async (e) => {

    e.preventDefault();

    const newErrors = validateForm();

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
      return;
    }

    if(!otpVerified){
      alert("Please verify OTP first");
      return;
    }

    setLoading(true);

    try{

      const res = await fetch(`${API}/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({

          userName:formData.fullName,
          email:formData.email,
          password:formData.password,
          userType:formData.role.toUpperCase(),
          companyName:formData.companyName,
          country:formData.country,
          accNo:formData.accNo,
          swiftCode:formData.swiftCode

        })
      });

      const data = await res.json();

      setLoading(false);

      if(res.status===201){

        alert("Registration Successful");

        navigate("/login");

      }else{

        alert(data.message || "Registration failed");

      }

    }catch(err){

      setLoading(false);

      alert("Server error");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-bold text-white mb-2">TradeFlow</h1>
          </Link>
          <p className="text-blue-200">FOREIGN TRADING SYSTEM</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Create an Account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL + OTP */}

            <div className="flex gap-2">

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <button
                type="button"
                onClick={sendOtp}
                className="bg-blue-600 text-white px-4 rounded"
              >
                Send OTP
              </button>

            </div>

            {otpSent && (

              <div className="flex gap-2">

                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full border p-3 rounded"
                />

                <button
                  type="button"
                  onClick={verifyOtp}
                  className="bg-green-600 text-white px-4 rounded"
                >
                  Verify OTP
                </button>

              </div>

            )}

            {/* ACCOUNT NUMBER */}

            <input
              type="text"
              name="accNo"
              placeholder="Account Number"
              value={formData.accNo}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* SWIFT */}

            <input
              type="text"
              name="swiftCode"
              placeholder="Swift Code"
              value={formData.swiftCode}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >

              {loading ? "Registering..." : "Register"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default Register;