import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance'; // Replace with your actual axios instance
import './Signup.css'; // You can define your styles here

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [uniReg, setUniReg] = useState("");
    const [university, setUniversity] = useState("");
    const [error, setError] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
        uniReg: "",
        university: ""
    });
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Reset error state
        setError({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            userName: "",
            uniReg: "",
            university: ""
        });

        // Validation checks
        let isValid = true;
        if (!fullName) {
            setError((prevState) => ({ ...prevState, fullName: "Please enter your full name" }));
            isValid = false;
        }
        if (!email || !validateEmail(email)) {
            setError((prevState) => ({ ...prevState, email: "Please enter a valid email" }));
            isValid = false;
        }
        if (!userName) {
            setError((prevState) => ({ ...prevState, userName: "Please enter your username" }));
            isValid = false;
        }
        if (!uniReg) {
            setError((prevState) => ({ ...prevState, uniReg: "Please enter your university registration number" }));
            isValid = false;
        }
        if (!university) {
            setError((prevState) => ({ ...prevState, university: "Please enter your university name" }));
            isValid = false;
        }
        if (!password) {
            setError((prevState) => ({ ...prevState, password: "Please enter your password" }));
            isValid = false;
        }
        if (!confirmPassword) {
            setError((prevState) => ({ ...prevState, confirmPassword: "Please confirm your password" }));
            isValid = false;
        }
        if (password !== confirmPassword) {
            setError((prevState) => ({ ...prevState, confirmPassword: "Passwords do not match" }));
            isValid = false;
        }

        if (!isValid) {
            return; // Stop form submission if there are errors
        }

        // Sign Up API Call
        try {
            const response = await axiosInstance.post("/createAccount", {
                fullName,
                email,
                password,
                userName,
                uniReg,
                university,
            });

            // Handle successful registration response
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard"); // Redirect to dashboard on successful signup
            }
        } catch (err) {
            // Handle registration error
            if (err.response && err.response.data && err.response.data.message) {
                setError((prevState) => ({ ...prevState, global: err.response.data.message }));
            } else {
                setError((prevState) => ({ ...prevState, global: "Something went wrong. Please try again later." }));
            }
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error.global && <p className="error">{error.global}</p>}
            <form onSubmit={handleSignUp}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    {error.fullName && <div className="error-box">{error.fullName}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error.email && <div className="error-box">{error.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {error.userName && <div className="error-box">{error.userName}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="uniReg">University Registration No:</label>
                    <input
                        type="text"
                        id="uniReg"
                        value={uniReg}
                        onChange={(e) => setUniReg(e.target.value)}
                    />
                    {error.uniReg && <div className="error-box">{error.uniReg}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="university">University:</label>
                    <input
                        type="text"
                        id="university"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                    {error.university && <div className="error-box">{error.university}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error.password && <div className="error-box">{error.password}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error.confirmPassword && <div className="error-box">{error.confirmPassword}</div>}
                </div>

                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
