import { Form, Button } from 'react-bootstrap';
import { UserInput } from '../core/validate';

interface UserFormProps {
  formData: Omit<UserInput, 'age'> & { age: string | number };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const UserForm: React.FC<UserFormProps> = ({ formData, onChange, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Form.Group className="mb-3">
      <Form.Label>用户名</Form.Label>
      <Form.Control
        name="username"
        value={formData.username}
        onChange={onChange}
        placeholder="请输入用户名"
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>年龄</Form.Label>
      <Form.Control
        type="text"
        name="age"
        value={formData.age}
        onChange={onChange}
        placeholder="请输入年龄"
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>邮箱</Form.Label>
      <Form.Control
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="请输入邮箱"
      />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
);

export default UserForm;
