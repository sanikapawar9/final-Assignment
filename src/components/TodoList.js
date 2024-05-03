import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ReadModal from "./ReadModal";
import Pagination from './Pagination';
import ErrorPage from "./ErrorPage";
import { MdEdit, MdDelete, MdVisibility, MdHourglassTop} from 'react-icons/md';

const TodoTable = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false,
    userId: 1,
  });
  const [editTodo, setEditTodo] = useState({
    id: null,
    title: "",
    completed: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]=useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        setTodos(response.data);
        setError(null);
      } catch (error) {
        console.error("There was an error fetching the todos", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  //Creating new Todo
  const createTodo = async () => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ title: "", completed: false, userId: 1 });
    } catch (error) {
      console.error("Error creating todo", error);
    }
  };


  //Editing Todo
  const startEditTodo = (todo) => {
    setEditTodo(todo);
  };

  const saveEditTodo = async () => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${editTodo.id}`, editTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo.id ? response.data : todo
      );
      setTodos(updatedTodos);
      setEditTodo({ id: null, title: "", completed: "" });
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };


  //Deleting Todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };


  //Reading Todo
  const showTodoDetails = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  //Pagination purpose
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading ? (
        <div className="text-center">Loading...<MdHourglassTop/></div>
      ) : error ? (
        <ErrorPage error={error}/>):
        (<>
          <Table striped bordered hover size="sm">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Title</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTodos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? "Yes" : "No"}</td>
                  <td>
                    <Button variant="info" size="sm" className="m-2" onClick={() => startEditTodo(todo)}>
                      <MdEdit/>
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => deleteTodo(todo.id)}>
                      <MdDelete/>
                    </Button>
                    <Button variant="primary" size="sm" className='m-2' onClick={() => showTodoDetails(todo)}>
                      <MdVisibility/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ReadModal
            show={showModal}
            handleClose={handleCloseModal}
            todo={selectedTodo}
          />

          <h2>Create new</h2>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={newTodo.title}
              onChange={(event) =>
                setNewTodo({ ...newTodo, title: event.target.value })
              }
            />
            <select
              value={String(newTodo.completed)}
              onChange={(event) =>
                setNewTodo({
                  ...newTodo,
                  completed: event.target.value === "true",
                })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <Button onClick={createTodo} className="m-2" variant="success" size="sm">
              Create Todo 
            </Button>
          </div>

          {editTodo.id !== null && (
            <div>
              <h2>Edit Todo</h2>
              <input
                type="text"
                placeholder="Title"
                value={editTodo.title}
                onChange={(event) =>
                  setEditTodo({
                    ...editTodo,
                    title: event.target.value,
                  })
                }
              />
              <select
                value={String(editTodo.completed)}
                onChange={(event) =>
                  setEditTodo({
                    ...editTodo,
                    completed: event.target.value === "true",
                  })
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <Button variant='success' className='m-2' size="sm" onClick={saveEditTodo}>Save Changes</Button>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalItems={todos.length}
            itemsPerPage={todosPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default TodoTable;