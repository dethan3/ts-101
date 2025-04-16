import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { validateUserData, UserInput } from './stage1/validate';
import { User, printUserEmail } from './stage1/filter';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import ErrorAlert from './components/ErrorAlert';

// Define a separate interface for form state
interface FormState {
  username: string;
  age: string;
  email: string;
}

function App() {
  // State definitions
  const [formData, setFormData] = useState<FormState>({ 
    username: '',
    age: '',  
    email: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [validUsers, setValidUsers] = useState<User[]>(loadUsersFromStorage());
  const [userJustAdded, setUserJustAdded] = useState(false);

  // Helper functions
  function loadUsersFromStorage(): User[] {
    try {
      const data = localStorage.getItem('users');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load users from localStorage:', e);
      return [];
    }
  }

  function saveUsersToStorage(users: User[]) {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users to localStorage:', e);
    }
  }

  function resetForm() {
    setFormData({ username: '', age: '', email: '' });
    setErrors([]);
  }

  // Convert age string to number safely
  const getAgeAsNumber = (ageStr: string): number => {
    return ageStr === '' ? 0 : parseInt(ageStr) || 0;
  };

  // Event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'age' && value !== '' && !/^\d+$/.test(value)) {
      // Skip update if age isn't empty and contains non-digits
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare data for validation with proper age conversion
    const dataToValidate: UserInput = {
      username: formData.username,
      age: getAgeAsNumber(formData.age),
      email: formData.email,
    };
    
    const validationErrors = validateUserData(dataToValidate);
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      // Create and add new user
      const newUser: User = {
        id: Date.now(),
        name: formData.username,
        age: getAgeAsNumber(formData.age),
        email: formData.email,
        isActive: true,
      };

      setValidUsers(prev => [...prev, newUser]);
      printUserEmail(newUser);
      resetForm();
      setUserJustAdded(true);
    }
  };

  const handleDeleteUser = (id: number) => {
    setValidUsers(prev => prev.filter(user => user.id !== id));
  };

  // Effects
  useEffect(() => {
    saveUsersToStorage(validUsers);
    console.log('Saved to storage:', validUsers);
  }, [validUsers]);

  useEffect(() => {
    if (userJustAdded) {
      const timer = setTimeout(() => setUserJustAdded(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [userJustAdded]);
  
  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <Card className="shadow border-0 rounded-3 overflow-hidden mb-4">
              <Card.Header className="bg-primary text-white p-3">
                <h3 className="mb-0 fs-4">👤 用户注册表单</h3>
              </Card.Header>
              <Card.Body className="p-4">
                <UserForm
                  formData={formData}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
                <ErrorAlert errors={errors} />
                {errors.length === 0 && userJustAdded && (
                  <div className="alert alert-success mt-3">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    ✅ 验证通过，已添加用户！
                  </div>
                )}
              </Card.Body>
            </Card>

            {validUsers.length > 0 ? (
              <Card className="shadow border-0 rounded-3 overflow-hidden">
                <Card.Header className="bg-success text-white p-3">
                  <h3 className="mb-0 fs-4">📋 用户列表</h3>
                </Card.Header>
                <Card.Body className="p-4">
                  <UserList users={validUsers} onDelete={handleDeleteUser} />
                </Card.Body>
              </Card>
            ) : (
              <div className="text-muted text-center mt-3">暂无用户，请先添加。</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
