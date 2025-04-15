import { useState } from 'react';
import { validateUserData, UserInput } from './stage1/validate';
import { User, printUserEmail } from './stage1/filter';

function App() {
  const [formData, setFormData] = useState<UserInput>({
    username: '',
    age: 0,
    email: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [validUsers, setValidUsers] = useState<User[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateUserData(formData);
    setErrors(result);

    if (result.length === 0) {
      const newUser: User = {
        id: Date.now(),
        name: formData.username,
        age: formData.age,
        email: formData.email,
        isActive: true,
      };

      setValidUsers((prev) => [...prev, newUser]);
      printUserEmail(newUser);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Day1 + Day2：用户信息表单</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label className="form-label">用户名</label>
          <input
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            placeholder="请输入用户名"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">年龄</label>
          <input
            name="age"
            type="number"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
            placeholder="请输入年龄"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">邮箱</label>
          <input
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="请输入邮箱"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          提交
        </button>
      </form>

      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {validUsers.length > 0 && (
        <div className="mt-4">
          <h4>✅ 合法用户列表：</h4>
          <ul>
            {validUsers.map((user) => (
              <li key={user.id}>
                {user.name} ({user.age}) - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
