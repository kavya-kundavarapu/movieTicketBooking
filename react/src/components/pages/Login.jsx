// pages/Login.js
import { useState } from "react";
import { login } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setStatus("Email and password are required");
      return;
    }

    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      setStatus("Login success");
    } catch (err) {
      setStatus(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <input
        value={form.email}
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        value={form.password}
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
      {status && <p>{status}</p>}
    </div>
  );
}
