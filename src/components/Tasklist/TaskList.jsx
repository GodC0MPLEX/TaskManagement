import TaskItem from "../TaskItem/TaskItem";
import style from "./TaskList.module.css";

const TaskList = ({ tasks,updateStatus,deleteTask,updateTask }) => {
  return (
    <div className={style.table}>
      <div className={style.header}>
        <div className={style.row}>
          <p className={style.col}>Name</p>
          <p className={style.col}>Priority</p>
          <p className={style.col}>Description</p>
          <p className={style.col}>Status</p>
          <p className={style.col}>Action</p>
        </div>
      </div>
      <div className={style.body}>
        {tasks?.map((task) => (
          <TaskItem key={task.id} task={task} updateStatus={updateStatus} deleteTask={deleteTask} updateTask={updateTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
