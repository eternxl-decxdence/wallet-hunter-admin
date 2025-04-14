import api from "../../api";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post("/admin/login", { username, password });
      localStorage.setItem("token", response.data.accessToken);

      navigator("/main");
    } catch (err: any) {
      setError(err.response?.data?.error || "Auth Error");
    }
  }

  return (
    <div className='login-form'>
      <div className='logo'>
        <p className='title'>Wallet Hunter</p>
        <span className='subtitle'>Administration Tools</span>
      </div>
      <form className='form-wrapper' onSubmit={handleLogin}>
        <input
          className='form-input'
          type='text'
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='form-input'
          type='password'
          placeholder='Password...'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className='form-button'>
          Sign In
        </button>
        {error && <p className='error-message'>Error: {error}</p>}
      </form>
    </div>
  );
}
