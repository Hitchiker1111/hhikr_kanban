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
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">任务详情</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">任务名称：</label>
        {isEditing ? (
          <input 
            type="text" 
            value={newTaskName} 
            onChange={(e) => setNewTaskName(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-lg">{task.taskName}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">任务详细信息：</label>
        {isEditing ? (
          <textarea 
            value={taskInfo} 
            onChange={(e) => setTaskInfo(e.target.value)} 
            rows="5"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-lg">{task.taskInfo}</p>
        )}
      </div>
      <div className="flex items-center mb-4">
        <button 
          onClick={toggleEditing}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 focus:outline-none"
        >
          {isEditing ? '保存更改' : '修改任务'}
        </button>
        {isEditing && (
          <button 
            onClick={handleUpdateTask} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600 focus:outline-none"
          >
            提交修改
          </button>
        )}
        <button 
          onClick={handleDeleteTask} 
          className="text-red-500 hover:text-red-600 focus:outline-none"
        >
          删除任务
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">附件</h3>
        <input 
          type="file" 
          onChange={handleFileUpload} 
          multiple 
          accept=".pdf,.xlsx,.xls,.md"
          className="mb-4"
        />
        <ul className="list-disc list-inside">
          {attachments.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">评论</h3>
        {comments.map((c, index) => (
          <div key={index} className="mb-2">
            <p className="text-gray-700">{c.commentContent}</p>
            <p className="text-gray-500 text-sm">评论者: {c.commentator} | 时间: {c.commentTime}</p>
          </div>
        ))}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="写下你的评论..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        />
        <button 
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          添加评论
        </button>
      </div>

      <button 
        onClick={() => navigate('/dashboard')} 
        className="fixed bottom-5 right-5 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none"
      >
        返回
      </button>
    </div>
  );
};

export default TaskDetail;