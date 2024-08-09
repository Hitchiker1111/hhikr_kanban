import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { projectName, taskName } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = storedProjects.find(p => p.projectName === projectName);
    if (project) {
      const foundTask = project.tasks.find(t => t.taskName === taskName);
      setTask(foundTask);
      setComments(foundTask.taskComment || []);
    }
  }, [projectName, taskName]);

  const handleAddComment = () => {
    const newComment = {
      commentContent: comment,
      commentator: localStorage.getItem('user'),
      commentTime: new Date().toISOString()
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setComment('');

    // 更新 localStorage 中的任务评论
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

  if (!task) {
    return <p>未找到该任务</p>;
  }

  return (
    <div>
      <h2>{task.taskName}</h2>
      <p>{task.taskInfo || '暂无任务信息'}</p>
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
    </div>
  );
};

export default TaskDetail;
