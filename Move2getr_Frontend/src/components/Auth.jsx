import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const africanCountries = [
  "Ivory Coast", "Senegal", "Mali", "Burkina Faso", "Togo",
  "Benin", "Cameroon", "Gabon", "Congo", "DR Congo", "Nigeria",
  "Ghana", "South Africa", "Morocco", "Algeria", "Tunisia",
  "Kenya", "Egypt", "Ethiopia", "Tanzania"
];

export default function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        if (!validatePassword(formData.password)) {
          toast.error("Invalid password: at least 8 chars, 1 uppercase, 1 digit, 1 symbol.");
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }

        await axios.post("http://localhost:8000/auth/register", {
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          nationality: formData.nationality,
          age: parseInt(formData.age),
          gender: formData.gender,
        });

        toast.success("Account created 🎉 Please login!");
        setIsRegister(false);
      } else {
        const response = await axios.post("http://localhost:8000/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        const { access_token } = response.data;
        localStorage.setItem("move2getr_token", access_token);
        toast.success("Login successful 🔥");
        onLogin();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error: " + (error.response?.data?.detail || "An error occurred"));
    }
  };

  return (
    <div className="fixed inset-0 bg-[url('/background.jpg')] bg-cover bg-center backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white/90 shadow-2xl rounded-xl flex max-w-5xl w-full mx-6">
        {/* Left section */}
        <div className="w-1/2 hidden md:flex flex-col justify-center p-10">
          <h1 className="text-4xl font-bold text-green-700 mb-4">MOVE2GETR</h1>
          <p className="text-lg text-gray-700">
            Create connections. Stay connected. Explore Europe together.
          </p>
        </div>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 space-y-4">
          <h2 className="text-2xl font-bold text-center text-red-600">
            {isRegister ? "Create Account" : "Login"}
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {isRegister && (
            <>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <div className="flex gap-4">
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                >
                  <option value="">-- Nationality --</option>
                  {africanCountries.map((country, idx) => (
                    <option key={idx} value={country}>{country}</option>
                  ))}
                </select>

                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              >
                <option value="">-- Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </>
          )}

          {!isRegister && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          )}

          <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition">
            {isRegister ? "Register" : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600 cursor-pointer hover:underline" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Already have an account? Login" : "No account? Register"}
          </p>
        </form>
      </div>
    </div>
  );
}
