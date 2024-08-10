import { useNavigate } from 'react-router-dom';

const Task = ({ task, projectName }) => {
  const navigate = useNavigate();

  const handleTaskClick = () => {
    navigate(`/project/${projectName}/task/${task.taskName}`);
  };

  return (
<div 
  onClick={handleTaskClick} 
  className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
>
  <h4 className="font-semibold text-lg">{task.taskName}</h4>
  <p className="text-gray-600">{task.taskInfo || '暂无任务信息'}</p>
  {task.attachments && task.attachments.length > 0 && (
    <div className="mt-2">
      <strong>附件：</strong>
      <ul className="list-disc list-inside">
        {task.attachments.map((file, index) => (
          <li key={index}>
            <a 
              href={file.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline"
            >
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
  
};

export default Task;
