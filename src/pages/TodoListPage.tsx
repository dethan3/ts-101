import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const TodoListPage: React.FC = () => {
  return (
    <Container className="py-5 h-100">
      <Row className="justify-content-center h-100">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className="shadow border-0 rounded-3 overflow-hidden">
            <Card.Header className="bg-success text-white p-3">
              <h3 className="mb-0 fs-4">📝 待办事项列表</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <p className="text-muted text-center">待办事项功能正在开发中...</p>
              <ListGroup>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>示例待办事项 1</span>
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2">编辑</button>
                    <button className="btn btn-sm btn-outline-danger">删除</button>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <span>示例待办事项 2</span>
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2">编辑</button>
                    <button className="btn btn-sm btn-outline-danger">删除</button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoListPage;