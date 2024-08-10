import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Project from './Project';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/add-project')}>添加项目</button>
        <span>已登录用户: {user}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
