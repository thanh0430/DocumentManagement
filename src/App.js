import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './pages/Dashboard'
import FolderPage from './pages/FolderPage'
import FilePage from './pages/FilePage'
import ViDu from './pages/ViDu'
import ApprovalFlow from './pages/ApprovalFlow'
import RequestApproval from './pages/RequestApproval'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/Document" element={<FolderPage />} />
                    <Route path="/filepage/:folderId" element={<FilePage />} />
                    <Route path="/chucvu" element={<ViDu />} />
                    <Route path="/ApprovalFlow" element={<ApprovalFlow />} />
                    <Route path="/RequestApproval" element={<RequestApproval />} />
                </Route>             
            </Routes>
        </Router>
    )
}

export default App
