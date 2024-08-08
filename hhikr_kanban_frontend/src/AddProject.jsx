import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [tasks, setTasks] = useState(['']);
  const navigate = useNavigate();

  const handleAddTask = () => {
    setTasks([...tasks, '']);
  };

  const handleTaskChange = (index, value) => {
    const newTasks = tasks.slice();
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 项目和任务信息放入数组或暂存
    console.log({ projectName, tasks });
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
              value={task}
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
