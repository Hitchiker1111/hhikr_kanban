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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/add-project')}>添加项目</button>
        <div>
          <span>{user}</span>
          <a href="#" onClick={handleLogout} style={{ marginLeft: '20px' }}>
            I&apos;m out
          </a>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

