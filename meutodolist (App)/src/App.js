import {useState, useEffect} from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState(() => {
    const save = localStorage.getItem("Lista");
    const initialValue = JSON.parse(save);
    return initialValue || "";
  });

  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(toDo));
  });

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Add tarefas
  ///////////////////////////
  const addTask = (e) => {
      if(newTask) {
        let num = toDo.length + 1; 
        let newEntry = { id: num, title: newTask, status: false };
        setToDo([...toDo, newEntry])
        setNewTask('');
      }
  }

  // Deletar tarefas 
  ///////////////////////////
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks);
  }

  // Marcar tarefa como concluida
  ///////////////////////////
  const markDone = (id) => {
    let newTask = toDo.map( task => {
      if( task.id === id ) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }

  // Cancelar update
  ///////////////////////////
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // Alterar tarefa para update
  ///////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // Update tarefa
  ///////////////////////////
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }
  return (
    <div className="container App">

    <header>
      <h2>Lista de Tarefas</h2>
      <p className='logoN3'></p>
    </header>

    {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

    {/* Display ToDos */}

    {toDo && toDo.length ? '' : 'Lista Vazia...'}

    <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  

    </div>
  );
}

export default App;