import TaskList from "@/src/components/Tasklist/TaskList";
import { useState, useEffect } from "react";
import style from "./HomePage.module.css";
import ReactModal from "react-modal";
import TaskForm from "@/src/components/TaskForm/TaskForm";
import { customModalStyle } from "@/styles/styles";
import ActionButton from "@/src/components/common/Button/Button";

const HomePage = ({ initialTasks = [] }) => {
  // For All Tasks
  const [allTasks, setAllTasks] = useState(initialTasks);
  // For Displayed Tasks
  const [tasks, setTasks] = useState(initialTasks); 
  const [openModal, setOpenModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setAllTasks(parsedTasks);
        setTasks(sortByPriority(parsedTasks)); // Set the sorted tasks for display
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      const sortedTasks = sortByPriority(allTasks);
      setTasks(sortedTasks); // Update the displayed tasks after sorting
      localStorage.setItem("tasks", JSON.stringify(sortedTasks));
    }
  }, [allTasks, isMounted]);

  const sortByPriority = (tasks) => {
    if (!tasks) return [];

    const priorityOrder = { high: 1, medium: 2, low: 3 };

    return tasks.sort((a, b) => {
      // First, check if tasks are completed or not. Completed tasks go to the end.
      if (a.status === 'Completed' && b.status !== 'Completed') return 1;
      if (a.status !== 'Completed' && b.status === 'Completed') return -1;

      // If both tasks have the same completion status, sort by priority
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const addTaskClick = () => {
    setOpenModal(true);
  };

  // Add a new task
  const addTask = (newTask) => {
    newTask.id = allTasks.length + 1;
    const updatedTasks = [...allTasks, newTask];
    setAllTasks(updatedTasks);
    setOpenModal(false); 
  };

  // Edit a task
  const editTask = (id, newTask) => {
    newTask.id = id;
    let updatedTasks = allTasks.map((task) => (task.id === id ? newTask : task));
    setAllTasks(updatedTasks);
  };

  // Update the status of a task
  const updateStatus = (id, status) => {
    let updatedTasks = allTasks.map((task) => {
      if (task.id === id) {
        task.status = status; 
      }
      return task;
    });

    setAllTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (id) => {
    let updatedTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(updatedTasks); // Update full task list
  };

  // Search for tasks
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    // Filter based on the full 'allTasks' state
    const filteredTasks = allTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchValue) ||
        task.description.toLowerCase().includes(searchValue)
    );

    setTasks(sortByPriority(filteredTasks)); // Update filtered task list for display
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.leftSection}>
          <p className={style.title}>Task Lists</p>
          <p className={style.count} title="Total Numbers">
            {tasks.length}
          </p>
        </div>
        <div className={style.midSection}>
          <input type="text" placeholder="Search By Title or Description" onChange={handleSearch} className={style.search}/>
        </div>
        <div>
          <ActionButton onClick={addTaskClick} name="Create Task" />
        </div>
      </div>
      {tasks?.length>0?<TaskList
        tasks={tasks}
        updateStatus={updateStatus}
        deleteTask={deleteTask}
        updateTask={editTask}
      />:
      <div className={style.noTask}>
        <p>No Task Found</p>
      </div>
      }
      <ReactModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={customModalStyle}
        ariaHideApp={false}
      >
        <TaskForm addTask={addTask} setOpenModal={setOpenModal} />
      </ReactModal>
    </div>
  );
};

export default HomePage;
