import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [tasks, setTasks] = useState([{ taskName: '' }]);
  const navigate = useNavigate();
  const projectInitiator = localStorage.getItem('user'); // 获取当前登录的用户邮箱

  const handleAddTask = () => {
    setTasks([...tasks, { taskName: '' }]);
  };

  const handleTaskChange = (index, value) => {
    const newTasks = tasks.slice();
    newTasks[index].taskName = value;
    setTasks(newTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const newProject = {
      projectName,
      projectInitiator,
      tasks: tasks.map(task => ({
        taskName: task.taskName,
        taskInfo: '',
        taskComment: []
      }))
    };
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>项目名称: </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>项目子任务: </label>
        {tasks.map((task, index) => (
          <div key={index}>
            <input
              type="text"
              value={task.taskName}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              required
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={handleAddTask}>添加子任务</button>
      <button type="submit">提交</button>
    </form>
  );
};

export default AddProject;
