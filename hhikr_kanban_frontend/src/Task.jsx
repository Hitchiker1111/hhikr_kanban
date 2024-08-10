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
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>附件：</strong>
          <ul>
            {task.attachments.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
};

export default Task;
