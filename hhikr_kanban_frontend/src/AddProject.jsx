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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">项目名称: </label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">项目子任务: </label>
        {tasks.map((task, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={task.taskName}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <button 
          type="button" 
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          添加子任务
        </button>
        <button 
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
        >
          提交
        </button>
      </div>
    </form>
  );
};

export default AddProject;
