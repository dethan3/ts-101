import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ErrorAlertProps {
  errors: string[];
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <Alert variant="danger" className="mt-3">
      <ul className="mb-0">
        {errors.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </Alert>
  );
};

export default ErrorAlert;
