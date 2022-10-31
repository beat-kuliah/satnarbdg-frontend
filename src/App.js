import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom'
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard/index';
import Anggota from './scenes/anggota/index';
import Tahanan from './scenes/tahanan/index';
import Ditangani from './scenes/ditangani/index';

function App() {
    const [theme, colorMode] = useMode();
    
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar />
                    <main className="content">
                        <Topbar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/anggota" element={<Anggota />} />
                            <Route path="/tahanan" element={<Tahanan />} />
                            <Route path="/perkara_ditangani" element={<Ditangani />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App