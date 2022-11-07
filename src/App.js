import axios from "axios";
import React, { useRef, useState } from "react";

const App = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    dob: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.post(
        "https://mighty-journey-79900.herokuapp.com/api/v1/auth/register",
        formData
      );
      setSuccess("Success");
      setError(null);
    } catch (error) {
      const { response } = error;
      const { data } = response;
      setSuccess(false);
      setError(data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="container">
        <h2>Kunda box</h2>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="form-group">
            <label>Username</label>
            <input
              type={"text"}
              placeholder="Enter your username"
              value={formData.user_name}
              onChange={handleChange}
              name="user_name"
              required
            />
          </div>
          <div className="form-group">
            <label>Date of birth</label>
            <input
              type={"date"}
              value={formData.dob}
              onChange={handleChange}
              name="dob"
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type={"email"}
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={"password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              required
            />
            {error?.code === "INVALID_PASSWORD" && (
              <small>
                Hint: password must contain
                <ul>
                  <li>5 to 16 characters</li>
                  <li> 2 numbers</li>
                  <li> 1 upper case character</li>
                </ul>
              </small>
            )}
          </div>

          <button type="submit">
            {isLoading ? "Loading..." : "Submit form"}
          </button>

          {error && (
            <div className="live-zone-error">
              <p>{error?.code}</p>
            </div>
          )}

          {success && (
            <div className="live-zone-success">
              <p>SUCCESS</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
