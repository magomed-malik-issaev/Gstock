import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Avatar,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Container
} from '@mui/material';
import {
    Inventory as InventoryIcon,
    LocalShipping as SupplierIcon,
    Group as UserIcon,
    Warning as AlertIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon
} from '@mui/icons-material';

// Données fictives pour la démo
const recentMovements = [
    { id: 1, productName: "Produit A", type: "entrée", quantity: 20, date: "2023-04-17 10:23", user: "admin" },
    { id: 2, productName: "Produit B", type: "sortie", quantity: 5, date: "2023-04-17 09:45", user: "vendeur1" },
    { id: 3, productName: "Produit C", type: "entrée", quantity: 15, date: "2023-04-16 16:30", user: "admin" },
    { id: 4, productName: "Produit D", type: "sortie", quantity: 3, date: "2023-04-16 14:15", user: "vendeur2" },
    { id: 5, productName: "Produit E", type: "entrée", quantity: 25, date: "2023-04-15 11:20", user: "admin" },
    { id: 6, productName: "Produit F", type: "sortie", quantity: 8, date: "2023-04-15 09:10", user: "vendeur1" },
];

function DashboardPage() {
    // État pour les statistiques
    const [stats, setStats] = useState({
        totalProducts: 248,
        totalSuppliers: 36,
        totalUsers: 15,
        lowStockAlerts: 7
    });

    // Pour une application réelle, vous feriez des appels API ici
    useEffect(() => {
        // Simuler un chargement des données
        const timer = setTimeout(() => {
            // Mise à jour des statistiques (dans un vrai cas, cela viendrait d'une API)
            setStats({
                totalProducts: 248,
                totalSuppliers: 36,
                totalUsers: 15,
                lowStockAlerts: 7
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Container maxWidth="xl" sx={{ p: 3 }}>
            {/* Rangée de 4 cartes de statistiques avec plus d'espacement */}
            <Grid container spacing={12} sx={{ mb: 5 }}>
                {/* Carte Produits */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Produits
                                </Typography>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                                    <InventoryIcon />
                                </Avatar>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {stats.totalProducts}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={70}
                                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                70% de capacité utilisée
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Carte Fournisseurs */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Fournisseurs
                                </Typography>
                                <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48 }}>
                                    <SupplierIcon />
                                </Avatar>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {stats.totalSuppliers}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={50}
                                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                                color="success"
                            />
                            <Typography variant="body2" color="text.secondary">
                                3 commandes en cours
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Carte Utilisateurs */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Utilisateurs
                                </Typography>
                                <Avatar sx={{ bgcolor: 'info.main', width: 48, height: 48 }}>
                                    <UserIcon />
                                </Avatar>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {stats.totalUsers}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={30}
                                sx={{ height: 8, borderRadius: 4, mb: 1 }}
                                color="info"
                            />
                            <Typography variant="body2" color="text.secondary">
                                4 utilisateurs actifs
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Carte Alertes */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Alertes
                                </Typography>
                                <Avatar sx={{ bgcolor: 'error.main', width: 48, height: 48 }}>
                                    <AlertIcon />
                                </Avatar>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {stats.lowStockAlerts}
                            </Typography>
                            <Button
                                variant="text"
                                color="error"
                                sx={{ p: 0, fontWeight: 'medium' }}
                            >
                                Voir les alertes →
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Grande section graphique - deuxième rangée, plus large */}
            <Paper
                sx={{
                    p: 4,
                    mb: 5,
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '100%',
                    height: '350px', // Hauteur augmentée
                    display: 'flex',
                    flexDirection: 'column',
                    margin: ''
                }}
            >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Activité du stock
                </Typography>

                {/* Emplacement pour un futur graphique */}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'action.hover',
                        borderRadius: 1
                    }}
                >
                    <Typography color="text.secondary">
                        Graphique d'activité du stock (à implémenter)
                    </Typography>
                </Box>
            </Paper>

            {/* Grande section tableau - troisième rangée, plus large */}
            <Paper
                sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: 'hidden',
                    width: '100%'
                }}
            >
                <Box
                    sx={{
                        p: 4,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                        Mouvements récents
                    </Typography>
                    <Button variant="outlined">
                        Voir tous les mouvements
                    </Button>
                </Box>

                <TableContainer sx={{ maxHeight: '450px' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', p: 2 }}>Produit</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', p: 2 }}>Type</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem', p: 2 }}>Quantité</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', p: 2 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', p: 2 }}>Utilisateur</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem', p: 2 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentMovements.map((movement) => (
                                <TableRow key={movement.id} hover>
                                    <TableCell sx={{ fontWeight: 'medium', p: 2 }}>
                                        {movement.productName}
                                    </TableCell>
                                    <TableCell sx={{ p: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {movement.type === 'entrée' ? (
                                                <TrendingUpIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                                            ) : (
                                                <TrendingDownIcon color="error" fontSize="small" sx={{ mr: 0.5 }} />
                                            )}
                                            {movement.type}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right" sx={{ p: 2 }}>{movement.quantity}</TableCell>
                                    <TableCell sx={{ p: 2 }}>{movement.date}</TableCell>
                                    <TableCell sx={{ p: 2 }}>{movement.user}</TableCell>
                                    <TableCell align="right" sx={{ p: 2 }}>
                                        <Button size="small" variant="outlined">
                                            Détails
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}

export default DashboardPage;