import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestBody = {
      email: email,
      password: password,
    };
  
    const jsonBody = JSON.stringify(requestBody);
  
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonBody,
      });

      if (!response.ok) {
        const errorData = await response.json(); // 读取错误响应体
        throw new Error(errorData.message || 'Login failed');
      }

      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from server');
      }

      const data = JSON.parse(text);
      if (data.success) {
        localStorage.setItem('user', email); // 保存用户信息
        navigate('/dashboard'); // 跳转到主页
      } else {
        alert(data.message || 'Login failed'); // 显示失败信息
      }
    } catch (error) {
      console.error('Error:', error); // 捕获错误
      alert('An error occurred during login.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

