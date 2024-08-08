import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleAddProject = () => {
    navigate('/add-project');
  };

  return (
    <div>
      <header>
        <button onClick={handleAddProject}>添加项目</button>
        <span>{user}</span>
      </header>
      <main>
        <h1>看板</h1>
        <div>这里是空的看板</div>
      </main>
    </div>
  );
};

export default Dashboard;
