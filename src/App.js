import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom'
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard/index';
import Anggota from './scenes/anggota/index';

function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <h1>Test</h1>
                    <Sidebar />
                    <main className="content">
                        <Topbar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/anggota" element={<Anggota />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App