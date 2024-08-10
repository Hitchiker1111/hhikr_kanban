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
<div className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full md:w-1/2 lg:w-1/3">
  <h3 className="text-lg font-bold mb-2">{project.projectName}</h3>
  <p className="text-gray-600 mb-4">发起者: {project.projectInitiator}</p>
  <button 
    onClick={handleDeleteProject} 
    className="bg-red-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-red-600 focus:outline-none"
  >
    删除项目
  </button>
  <button 
    onClick={handleAddTask} 
    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 focus:outline-none"
  >
    添加任务
  </button>

  {showConfirm && (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <p className="text-gray-700 mb-4">确定要删除项目吗？</p>
      <button 
        onClick={confirmDelete} 
        className="bg-red-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-red-600 focus:outline-none"
      >
        确认
      </button>
      <button 
        onClick={cancelDelete} 
        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 focus:outline-none"
      >
        取消
      </button>
    </div>
  )}

  <div className="mt-4">
    {project.tasks.map((task, index) => (
      <Task key={index} task={task} projectName={project.projectName} />
    ))}
  </div>
</div>

  );
};

export default Project;
