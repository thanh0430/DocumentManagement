import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './pages/Dashboard'
import FolderPage from './pages/FolderPage'
import ViDu from './pages/ViDu'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/Document" element={<FolderPage />} />
                    <Route path="/chucvu" element={<ViDu />} />
                </Route>             
            </Routes>
        </Router>
    )
}

export default App
