import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetail = () => {
  const { projectName, taskName } = useParams();
  const [task, setTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [taskInfo, setTaskInfo] = useState('');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = storedProjects.find(p => p.projectName === projectName);
    if (project) {
      const foundTask = project.tasks.find(t => t.taskName === taskName);
      if (foundTask) {
        setTask(foundTask);
        setNewTaskName(foundTask.taskName);
        setTaskInfo(foundTask.taskInfo || '');
        setComments(foundTask.taskComment || []);
        setAttachments(foundTask.attachments || []);
      }
    }
  }, [projectName, taskName]);

  const handleUpdateTask = () => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const updatedProjects = storedProjects.map(p => {
      if (p.projectName === projectName) {
        return {
          ...p,
          tasks: p.tasks.map(t =>
            t.taskName === taskName
              ? { ...t, taskName: newTaskName, taskInfo, attachments }
              : t
          )
        };
      }
      return p;
    });
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setIsEditing(false);
    setTask({ ...task, taskName: newTaskName, taskInfo, attachments });
  };  

  const handleDeleteTask = () => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const updatedProjects = storedProjects.map(p => {
      if (p.projectName === projectName) {
        return {
          ...p,
          tasks: p.tasks.filter(t => t.taskName !== taskName)
        };
      }
      return p;
    });
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    navigate(`/dashboard`);
  };

  const handleAddComment = () => {
    const newComment = {
      commentContent: comment,
      commentator: localStorage.getItem('user'),
      commentTime: new Date().toISOString()
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setComment('');

    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    const updatedProjects = storedProjects.map(p => {
      if (p.projectName === projectName) {
        return {
          ...p,
          tasks: p.tasks.map(t =>
            t.taskName === taskName ? { ...t, taskComment: updatedComments } : t
          )
        };
      }
      return p;
    });
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setAttachments(prevAttachments => [...prevAttachments, ...newAttachments]);
  
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    const updatedProjects = storedProjects.map(p => {
      if (p.projectName === projectName) {
        return {
          ...p,
          tasks: p.tasks.map(t =>
            t.taskName === taskName
              ? { ...t, attachments: [...(t.attachments || []), ...newAttachments] }
              : t
          )
        };
      }
      return p;
    });
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  if (!task) {
    return <p>未找到该任务</p>;
  }

  return (
    <div>
      <h2>任务详情</h2>
      <div>
        <label>任务名称：</label>
        {isEditing ? (
          <input 
            type="text" 
            value={newTaskName} 
            onChange={(e) => setNewTaskName(e.target.value)} 
          />
        ) : (
          <p>{task.taskName}</p>
        )}
      </div>
      <div>
        <label>任务详细信息：</label>
        {isEditing ? (
          <textarea 
            value={taskInfo} 
            onChange={(e) => setTaskInfo(e.target.value)} 
            rows="5"
          />
        ) : (
          <p>{task.taskInfo}</p>
        )}
      </div>
      <button onClick={toggleEditing}>
        {isEditing ? '保存更改' : '修改任务'}
      </button>
      {isEditing && (
        <button onClick={handleUpdateTask} style={{ marginLeft: '10px' }}>
          提交修改
        </button>
      )}
      <button onClick={handleDeleteTask} style={{ color: 'red', marginLeft: '10px' }}>
        删除任务
      </button>
      
      <div>
        <h3>附件</h3>
        <input 
          type="file" 
          onChange={handleFileUpload} 
          multiple 
          accept=".pdf,.xlsx,.xls,.md" 
        />
        <ul>
          {attachments.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3>评论</h3>
        {comments.map((c, index) => (
          <div key={index}>
            <p>{c.commentContent}</p>
            <p>评论者: {c.commentator} | 时间: {c.commentTime}</p>
          </div>
        ))}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="写下你的评论..."
        />
        <button onClick={handleAddComment}>添加评论</button>
      </div>

      <button onClick={() => navigate('/dashboard')} style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        返回
      </button>
    </div>
  );
};

export default TaskDetail;