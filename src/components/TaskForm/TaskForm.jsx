
import { useState } from "react";
import style from "./TaskForm.module.css";
import ActionButton, { Button } from "../common/Button/Button";
// import alert from "../../assets/alert2.svg";

const TaskForm = ({ addTask, setOpenModal,task }) => {
  const [values, setValues] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority:task?.priority || "low",
  });
  const [error, setError] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!values.title.trim()) {
      setError((prev) => {
        return { ...prev, title: "Title is required" };
      });
      valid = false;
    }
    if (!values.description.trim()) {
      setError((prev) => {
        return { ...prev, description: "Description is required" };
      });
      valid = false;
    }
    if (!valid) {
      return;
    }
    if(task){
      addTask(task.id,{...values,completed: task.completed,status:task.status});
      setOpenModal(false);
      return;
    }
    const { title, description, priority } = values;
    addTask({ title, description, priority, completed: false,status:"To-Do" });
    setValues({
      title: "",
      description: "",
      priority: "low",
    });
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.cont}>
        <div className={style.field}>
          <label htmlFor="name" className={style.label}>
            Title
          </label>
          <input
            type="text"
            name="title"
            value={values.title}
            className={style.input}
            onChange={handleChange}
            placeholder="Task Title"
            required
          />
        </div>
        {error.title && (
          <p className={style.error}>
            <img src="/alert2.svg" alt="alert-icon" /> {error.title}
          </p>
        )}
      </div>
      <div className={style.field}>
        <label htmlFor="" className={style.label}>
          Priority
        </label>
        <select
          className={style.input}
          name="priority"
          value={values.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className={style.cont}>
        <div className={style.field}>
          <label htmlFor="" className={style.label}>
            Task Description
          </label>
          <textarea
            name="description"
            className={`${style.input} ${style.textarea}`}
            value={values.description}
            onChange={handleChange}
            placeholder="Task Description"
            required
          />
        </div>
        {error.description && (
          <p className={style.error}>
            <img src="/alert2.svg" alt="alert-icon" /> {error.description}
          </p>
        )}
      </div>
      <div className={style.action}>
        <Button
          name="Cancel"
          onClick={() => {
            setOpenModal(false);
          }}
        />
        <ActionButton name={task?"Update":"Add Task"} onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default TaskForm;
