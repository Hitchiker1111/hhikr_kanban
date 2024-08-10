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

  const handleDeleteProject = (projectName) => {
    const updatedProjects = projects.filter(p => p.projectName !== projectName);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/add-project')} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          添加项目
        </button>
        <div>
          <span>{user}</span>
          <a 
            href="#" 
            onClick={handleLogout} 
            className="ml-4 text-red-500 hover:underline"
          >
            I&apos;m out
          </a>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {projects.map((project, index) => (
          <Project key={index} project={project} onDeleteProject={handleDeleteProject}/>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

