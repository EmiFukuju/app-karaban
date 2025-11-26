import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      const { accessToken, refreshToken, user } = response.data;

      // NOTE: In a real app, you should store these tokens securely.
      // For this example, we'll just log them.
      console.log('Login successful:', { user, accessToken, refreshToken });
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      setSuccess(`Welcome, ${user.name}!`);
      
      // Redirect or update UI state here
      
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</p>}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
