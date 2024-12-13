import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance'; // Replace with your actual axios instance
import './Signup.css'; // You can define your styles here
import ErrorModal from '../errormodal/ErrorModal'; // Import the modal component

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [uniReg, setUniReg] = useState("");
    const [university, setUniversity] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [successMessage, setSuccessMessage] = useState(""); // State for success message
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Reset error and success messages on new submit
        setErrorMessage("");
        setSuccessMessage("");

        // Validation checks
        let isValid = true;

        // Full name validation
        if (!fullName) {
            setErrorMessage("Please enter your full name");
            isValid = false;
        }

        // Email validation
        if (!email || !validateEmail(email)) {
            setErrorMessage("Please enter a valid email");
            isValid = false;
        }

        // Username validation
        if (!userName) {
            setErrorMessage("Please enter your username");
            isValid = false;
        }

        // University registration number validation
        if (!uniReg) {
            setErrorMessage("Please enter your university registration number");
            isValid = false;
        }

        // University name validation
        if (!university) {
            setErrorMessage("Please enter your university name");
            isValid = false;
        }

        // Password validation
        if (!password) {
            setErrorMessage("Please enter your password");
            isValid = false;
        } else if (!isPasswordValid(password)) {
            setErrorMessage("Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.");
            isValid = false;
        }

        // Confirm password validation
        if (!confirmPassword) {
            setErrorMessage("Please confirm your password");
            isValid = false;
        } else if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
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
                setSuccessMessage("Account created successfully!"); // Set success message
                setTimeout(() => navigate("/home"), 2000); // Redirect after 2 seconds
            }
        } catch (err) {
            // Handle registration error
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message); // Set the error message
            } else {
                setErrorMessage("Something went wrong. Please try again later."); // Default error message
            }
        }
    };

    // Email validation regex
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Password security validation
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    // Close error modal
    const closeErrorModal = () => {
        setErrorMessage(""); // Close the error modal by clearing the message
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="uniReg">University Registration No:</label>
                    <input
                        type="text"
                        id="uniReg"
                        value={uniReg}
                        onChange={(e) => setUniReg(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="university">University:</label>
                    <input
                        type="text"
                        id="university"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="signup-button">Sign Up</button>
            </form>

            {/* Success Message */}
            {successMessage && <div className="success-box">{successMessage}</div>}

            {/* Error Modal */}
            {errorMessage && <ErrorModal message={errorMessage} onClose={closeErrorModal} />}

            {/* Link to Login page */}
            <p >Already have an account? &nbsp;&nbsp;&nbsp; <span onClick={() => navigate("/login")} className="login-link">Login</span></p>
        </div>
    );
};

export default SignUp;
