import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/shared/Layout';
import Dashboard from './pages/Dashboard';
import FolderPage from './pages/FolderPage';
import FilePage from './pages/FilePage';
import ApprovalFlow from './pages/ApprovalFlow';
import RequestApproval from './pages/RequestApproval';
import Customers from './pages/Customers';
import Role from './pages/Role';
import Login from './pages/Login';
import Project from './pages/Project';
import Task from './pages/Task';
import ProjectAll from './pages/ProjectAll';
import EditTask from './pages/EditTask';
import WorkLog from './pages/WorkLog';
import Report from './pages/Report';
import AccountDetail from './pages/AccountDetail';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={isAuthenticated ? <Layout /> : <Navigate to="/Login" />} 
                >
                    <Route index element={<Dashboard />} />
                    <Route path="/Document" element={<FolderPage />} />
                    <Route path="/filepage/:folderId" element={<FilePage />} />
                    <Route path="/ApprovalFlow" element={<ApprovalFlow />} />
                    <Route path="/RequestApproval" element={<RequestApproval />} />
                    <Route path="/Customers" element={<Customers />} />
                    <Route path="/Role" element={<Role />} />
                    <Route path="/Project" element={<Project />} />
                    <Route path='/ProjectAll' element={<ProjectAll />} />
                    <Route path="/Task/:projectId" element={<Task />} />
                    <Route path='/edit-task/:taskId' element={<EditTask />} />
                    <Route path='/workLog' element = {<WorkLog/>} />
                    <Route path='/Report' element = {<Report/>} />
                    <Route path='/AccountDetail/:id' element = {<AccountDetail/>} />
                </Route>
                <Route path="/Login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
