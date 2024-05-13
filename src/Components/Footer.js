import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Box sx={{ bgcolor: 'primary.dark', color: 'white', p: 3, mt: 4 }}>
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    © 2024 CoWorking Kanban Tool
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Developed by 4iir g6
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    <Link href="#" color="inherit">Privacy Policy</Link> | <Link href="#" color="inherit">Terms of Use</Link>
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
