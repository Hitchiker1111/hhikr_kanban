import { useNavigate } from 'react-router-dom';

const Task = ({ task, projectName }) => {
  const navigate = useNavigate();

  const handleTaskClick = () => {
    navigate(`/project/${projectName}/task/${task.taskName}`);
  };

  return (
    <div 
      onClick={handleTaskClick} 
      style={{ padding: '5px', borderBottom: '1px solid #ccc', cursor: 'pointer' }}
    >
      <h4>{task.taskName}</h4>
      <p>{task.taskInfo || '暂无任务信息'}</p>
    </div>
  );
};

export default Task;
