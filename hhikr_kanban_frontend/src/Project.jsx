import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Task from './Task';

const Project = ({ project, onDeleteProject}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDeleteProject = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDeleteProject(project.projectName);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleAddTask = () => {
    const newTask = {
      taskName: '起个任务名',
      taskInfo: '填写任务具体信息',
      taskComment: [],
      attachments: [],
    };
    const updatedProjects = JSON.parse(localStorage.getItem('projects')).map(p => {
      if (p.projectName === project.projectName) {
        return {
          ...p,
          tasks: [...p.tasks, newTask]
        };
      }
      return p;
    });
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    navigate(`/project/${project.projectName}/task/${newTask.taskName}`);
  };

  return (
    <div className="project">
      <h3>{project.projectName}</h3>
      <p>发起者: {project.projectInitiator}</p>
      <button onClick={handleDeleteProject}>删除项目</button>
      <button onClick={handleAddTask}>添加任务</button>

      {showConfirm && (
        <div className="confirm-dialog">
          <p>确定要删除项目吗？</p>
          <button onClick={confirmDelete}>确认</button>
          <button onClick={cancelDelete}>取消</button>
        </div>
      )}

      <div className="tasks">
        {project.tasks.map((task, index) => (
          <Task key={index} task={task} projectName={project.projectName} />
        ))}
      </div>
    </div>
  );
};

export default Project;
