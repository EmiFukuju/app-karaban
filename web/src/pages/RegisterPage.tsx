import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'host' | 'guest'>('guest');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        userType,
      });
      setSuccess(response.data.message);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message);
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</p>}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <div className="mb-6">
            <span className="block text-gray-700 mb-2">가입 유형</span>
            <div className="flex">
              <label className="flex items-center mr-4">
                <input
                  type="radio"
                  name="userType"
                  value="guest"
                  checked={userType === 'guest'}
                  onChange={() => setUserType('guest')}
                  className="mr-2"
                />
                게스트
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="host"
                  checked={userType === 'host'}
                  onChange={() => setUserType('host')}
                  className="mr-2"
                />
                호스트
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
