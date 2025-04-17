import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';

function HomePage() {
    const features = [
        {
            title: 'Gestion des produits',
            description: 'Ajoutez, modifiez et supprimez des produits. Suivez leurs stocks en temps réel.',
            icon: <InventoryIcon fontSize="large" color="primary" />,
            link: '/products'
        },
        {
            title: 'Fournisseurs',
            description: 'Gérez vos fournisseurs et leurs informations de contact.',
            icon: <LocalShippingIcon fontSize="large" color="primary" />,
            link: '/suppliers'
        },
        {
            title: 'Utilisateurs',
            description: 'Gérez les utilisateurs et leurs permissions dans le système.',
            icon: <GroupIcon fontSize="large" color="primary" />,
            link: '/users'
        },
        {
            title: 'Rapports et statistiques',
            description: 'Visualisez les données de votre stock pour une meilleure prise de décision.',
            icon: <BarChartIcon fontSize="large" color="primary" />,
            link: '/reports'
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Bienvenue sur GStock
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Votre solution complète de gestion de stock
                </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
                {features.map((feature) => (
                    <Grid item xs={12} sm={6} md={3} key={feature.title}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '100%',
                                textAlign: 'center',
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'translateY(-5px)',
                                    transition: 'all 0.3s'
                                }
                            }}
                        >
                            <Box sx={{ p: 2 }}>
                                {feature.icon}
                            </Box>
                            <Typography variant="h6" component="h2" gutterBottom>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                {feature.description}
                            </Typography>
                            <Button variant="contained" component={Link} to={feature.link}>
                                Accéder
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 8, mb: 2, textAlign: 'center' }}>
                <Typography variant="body1">
                    GStock — Simplifiez la gestion de votre inventaire
                </Typography>
            </Box>
        </Container>
    );
}

export default HomePage; 