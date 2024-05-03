import { Modal, Button } from 'react-bootstrap';

const ReadModal = ({ show, handleClose, todo }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Todo Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {todo && (
          <div>
            <p><strong>ID:</strong> {todo.id}</p>
            <p><strong>Title:</strong> {todo.title}</p>
            <p><strong>Completed:</strong> {todo.completed ? "Yes" : "No"}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReadModal;