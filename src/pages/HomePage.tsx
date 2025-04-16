import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container className="py-5 h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className="shadow border-0 rounded-3 overflow-hidden mb-4">
            <Card.Header className="bg-primary text-white p-3">
              <h3 className="mb-0 fs-4">👋 欢迎使用 TS-101 应用</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <p>这是一个 TypeScript React 多页面应用示例。</p>
              <div className="d-grid gap-2">
                <Link to="/register" className="btn btn-primary">用户注册</Link>
                <Link to="/todo" className="btn btn-success">待办事项</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;