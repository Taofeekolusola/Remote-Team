import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(formData));
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="username" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
              <input name="role" placeholder="role" onChange={handleChange} required />
        <button type="submit" disabled={loading}>Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
