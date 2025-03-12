import React, { useState } from "react";
import { useLoginMutation } from "../redux/features/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for success message
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      if (data) {
        dispatch(setCredentials({ user: data.user, token: data.token }));
        localStorage.setItem("token", data.token);
        setMessage("Login Successful! Redirecting..."); // Show success message

        setTimeout(() => {
          navigate("/profile"); // Redirect after 2 seconds
        }, 2000);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign In</h2>
      {message && <p className="text-success">{message}</p>} {/* Success Message */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className="text-danger">{error.data?.message}</p>}
      </form>
    </div>
  );
};

export default SignIn;
