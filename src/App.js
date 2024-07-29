import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './pages/Dashboard'
import FolderPage from './pages/FolderPage'
import FilePage from './pages/FilePage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/Document" element={<FolderPage />} />
                    <Route path="/filepage/:folderId" element={<FilePage />} />
                </Route>             
            </Routes>
        </Router>
    )
}

export default App
