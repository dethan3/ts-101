import { ListGroup } from 'react-bootstrap';
import { User } from '../stage1/filter';
import 'bootstrap/dist/css/bootstrap.min.css';


interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <div className="mt-4">
    <h5>用户列表</h5>
    <ListGroup>
      {users.map((user) => (
        <ListGroup.Item key={user.id}>
          {user.name} ({user.age}) - {user.email}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default UserList;
