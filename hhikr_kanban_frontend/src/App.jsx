import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from './Dashboard';
import AddProject from './AddProject';
import TaskDetail from './TaskDetail';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/project/:projectName/task/:taskName" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
