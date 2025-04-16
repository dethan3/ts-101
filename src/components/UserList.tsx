import { ListGroup, Button } from 'react-bootstrap';
import { User } from '../core/filterUsers';

interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  return (
    <ListGroup>
      {users.map((user) => (
        <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{user.name}</strong> ({user.age}岁) - {user.email}
          </div>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(user.id)}>
            删除
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserList;
