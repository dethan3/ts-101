import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateUserData, UserInput } from './stage1/validate';
import { User, printUserEmail } from './stage1/filter';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import ErrorAlert from './components/ErrorAlert';
// import './App.css';

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
      setFormData({ username: '', age: 0, email: '' });
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={10} lg={8}>
          <Card className="p-6 shadow-sm">
            <h3 className="mb-4 text-center">👤 用户注册表单</h3>
            <UserForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
            <ErrorAlert errors={errors} />
            {errors.length === 0 && validUsers.length > 0 && (
              <p className="text-success mt-3">✅ 验证通过，已添加用户！</p>
            )}
          </Card>
  
          {validUsers.length > 0 && (
            <Card className="mt-4 p-3 shadow-sm">
              <UserList users={validUsers} />
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
