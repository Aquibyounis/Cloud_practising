import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import ZoneA from './pages/ZoneA';
import ZoneB from './pages/ZoneB';
import TopicPage from './pages/TopicPage';
import Quiz from './pages/Quiz';
import Analytics from './pages/Analytics';
import PreviousYears from './pages/PreviousYears';
import Settings from './pages/Settings';

function App() {
    return (
        <ThemeProvider>
            <ProgressProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/zone-a" element={<ZoneA />} />
                            <Route path="/zone-a/:categoryId" element={<ZoneA />} />
                            <Route path="/zone-b" element={<ZoneB />} />
                            <Route path="/zone-b/:categoryId" element={<ZoneB />} />
                            <Route path="/topic/:slug" element={<TopicPage />} />
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/previous-years" element={<PreviousYears />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </ProgressProvider>
        </ThemeProvider>
    );
}

export default App;
