import { useState } from 'react';
import Task from './Task';

const Project = ({ project }) => {
  const [projectName, setProjectName] = useState(project.projectName);
  const [tasks, setTasks] = useState(project.tasks);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTask = () => {
    const newTask = { taskName: '', taskInfo: '', taskComment: [] };
    setTasks([...tasks, newTask]);

    // 更新 localStorage 中的项目
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    const updatedProjects = storedProjects.map(p => 
      p.projectName === project.projectName ? { ...p, tasks: [...p.tasks, newTask] } : p
    );
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleSaveName = () => {
    // 保存新的项目名称
    setIsEditing(false);
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    const updatedProjects = storedProjects.map(p =>
      p.projectName === project.projectName ? { ...p, projectName } : p
    );
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)} 
          />
          <button onClick={handleSaveName}>保存名称</button>
        </div>
      ) : (
        <h3>{projectName}</h3>
      )}
      <p>发起者: {project.projectInitiator}</p>
      <button onClick={() => setIsEditing(true)}>修改名称</button>
      <button onClick={handleAddTask}>添加任务</button>
      {tasks.map((task, index) => (
        <Task key={index} task={task} projectName={projectName} />
      ))}
    </div>
  );
};

export default Project;
