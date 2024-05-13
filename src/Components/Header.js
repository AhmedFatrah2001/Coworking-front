import React from 'react';
import { AppBar, Toolbar, Button, Box, Avatar, Typography, Tooltip } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Header() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                    <RouterLink to="/">
                        <img
                            src="/images/logoText.png"
                            alt="CoWorking Kanban Logo"
                            style={{ height: 36, marginRight: 10, cursor: 'pointer' }}
                        />
                    </RouterLink>
                </Box>
                {currentUser ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <Tooltip title={currentUser.email}>
                                <Avatar sx={{ width: 30, height: 30, mr: 1, bgcolor: 'secondary.main' }}>
                                    {currentUser.email[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                            <Typography variant="subtitle1" sx={{ color: 'white' }}>
                                {currentUser.email}
                            </Typography>
                        </Box>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                        <Button
                            color="secondary"
                            component={RouterLink}
                            to="/ProjectsDashboard"
                            variant="contained"
                            sx={{ ml: 2 }}
                        >
                            Projects Dashboard
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={RouterLink} to="/login">
                            Sign In
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/signup">
                            Sign Up
                        </Button>
                        <Button
                            color="secondary"
                            component={RouterLink}
                            to="/kanbanApp"
                            variant="contained"
                            sx={{ ml: 2 }}
                        >
                            Go to Kanban App
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
