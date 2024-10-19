import { useState } from 'react';
import style from "./TaskItem.module.css"
import ActionButton from '../common/Button/Button';
import ReactModal from 'react-modal';
import TaskForm from '../TaskForm/TaskForm';
import { customModalStyle } from '@/styles/styles';

const TaskItem = ({ task,updateStatus,deleteTask,updateTask }) => {
  console.log(task);
  
  const [name, setName] = useState(task.status === "To-Do" ?  "In-Prog" : task.status === "In-Progress" ? "Complete" : "To-Do");
  const [openModal, setOpenModal] = useState(false);
  const [readModal, setReadModal] = useState(false);
  const [fullContent, setFullContent] = useState(false);

  const toggleStatus = () => {
    let status = task.status === "To-Do" ?  "In-Progress" : task.status === "In-Progress" ? "Completed" : "To-Do";
    let name = status === "To-Do" ?  "In-Prog" : status === "In-Progress" ? "Complete" : "To-Do";
    updateStatus(task.id,status);
    setName(name);
  };

  const handleEdit = () => {
    setOpenModal(true);
  }
  const TaskDescription = () => {
    if (task.description.length > 50) {
      return (
        <>
          <p>{task.description.slice(0, 40) + '...'}</p>
          <p className={style.readMore} onClick={()=>{setReadModal(true)
            setFullContent(task.description)
          }} >Read More</p>
        </>
      );
    }
    else {
      return <p>{task.description}</p>;
    }
  }
  const TaskTitle = () => {
    if (task.title.length > 30) {
      return (
        <>
          <p>
            {task.title.slice(0, 20) + '...'}
          </p>
          <p 
            onClick={() => {
              setReadModal(true);
              setFullContent(task.title); // Set the full content in the modal
            }} 
            className={style.readMore} 
            >Read More</p> 
        </>
      );
    } else {
      return <p>{task.title}</p>;
    }
  };
  return (
    <div className={style.row} style={getTaskColor(task.priority,task.status)}>
      <div className={style.col}>{TaskTitle()}</div>
      <p className={style.col}>{task.priority}</p>
      <div className={style.col}>{TaskDescription()}</div>
      <p className={style.col}>{task.status}</p>
      <div className={style.col}>
        <ActionButton onClick={toggleStatus} name={name} fontSize="14px" />
        <ActionButton onClick={handleEdit} name={"Edit"} fontSize="14px" />
        <ActionButton name="Delete" onClick={()=>deleteTask(task.id)} fontSize="14px" />
      </div>
      <ReactModal
        isOpen={openModal}
        style={customModalStyle}
        ariaHideApp={false} 
      >
        <TaskForm addTask={updateTask} setOpenModal={setOpenModal} task={task} />
      </ReactModal>
      <ReactModal
        isOpen={readModal}
        style={customModalStyle}
        ariaHideApp={false}
      >
        <div className={style.readModal} >
          <div className={style.fullContent}>
          {fullContent}
          </div>
          <ActionButton onClick={()=>setReadModal(false)} name="Close" fontSize="14px" />
        </div>
      </ReactModal>
    </div>
  );
};

const getTaskColor = (priority,completed) => {

  if(completed==="Completed"){
    return {backgroundColor:'white',color:'black'};
  }
  switch (priority) {
    case 'high':
      return {backgroundColor:'#FF2931',color:'white'};
    case 'medium':
      return {backgroundColor:'#FFFF3F',color:'black'};
    case 'low':
      return {backgroundColor:'#78cf0af0',color:'white'};
    default:
      return {backgroundColor:'white',color:'black'};
  }
};

export default TaskItem;
