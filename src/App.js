import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import ProjectsDashboard from './Components/ProjectsDashboard';
import KanbanApp from './Components/KanbanApp';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path="/ProjectsDashboard" element={
                        <PrivateRoute>
                            <ProjectsDashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/KanbanApp/:bId" element={
                        <PrivateRoute>
                            <KanbanApp />
                        </PrivateRoute>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
