// frontend/src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import api from '../services/api';

function ProductsPage() {
    // États
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Charger les catégories au chargement du composant
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await api.get('/categories');
                if (response.data && response.data.success) {
                    setCategories(response.data.data);
                } else {
                    setError('Impossible de charger les catégories. Réponse incorrecte du serveur.');
                }
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors du chargement des catégories:', err);
                setError('Impossible de charger les catégories. Veuillez réessayer plus tard.');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Charger les produits lorsqu'une catégorie est sélectionnée
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Si une catégorie est sélectionnée, utilisez le paramètre category_id
                const url = selectedCategory
                    ? `/products?category_id=${selectedCategory}`
                    : '/products';
                const response = await api.get(url);
                if (response.data && response.data.success) {
                    setProducts(response.data.data);
                } else {
                    setError('Impossible de charger les produits. Réponse incorrecte du serveur.');
                }
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors du chargement des produits:', err);
                setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    // Gestion du changement de catégorie
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Trouver le nom de la catégorie sélectionnée
    const getSelectedCategoryName = () => {
        if (!selectedCategory) return 'Tous les produits';
        const category = categories.find(cat => cat.id === selectedCategory);
        return category ? category.name : '';
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Produits
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Parcourez notre catalogue de produits et filtrez par catégorie
                </Typography>
            </Box>

            {/* Sélection de catégorie */}
            <Box sx={{ mb: 4 }}>
                <FormControl fullWidth variant="outlined" sx={{ maxWidth: 300 }}>
                    <InputLabel id="category-select-label">Filtrer par catégorie</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Filtrer par catégorie"
                    >
                        <MenuItem value="">Toutes les catégories</MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Affichage de la catégorie sélectionnée */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2">
                    {getSelectedCategoryName()}
                </Typography>
                <Divider sx={{ mt: 1, mb: 3 }} />
            </Box>

            {/* Affichage des erreurs */}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Indicateur de chargement */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* Grille de produits */}
                    {products.length > 0 ? (
                        <Grid container spacing={4}>
                            {products.map(product => (
                                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 4 } }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                image={product.image_path || "https://via.placeholder.com/300x180?text=Produit"}
                                                alt={product.name}
                                            />
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <Typography variant="h6" component="h3" gutterBottom>
                                                        {product.name}
                                                    </Typography>
                                                    <Chip
                                                        label={`${product.selling_price} €`}
                                                        color="primary"
                                                        sx={{ fontWeight: 'bold' }}
                                                    />
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mt: 'auto' }}>
                                                    Stock: {product.current_stock} unités
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 'auto' }}>
                                                    Seuil d'alerte: {product.alert_threshold} unités
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ textAlign: 'center', my: 4 }}>
                            <Typography variant="h6" color="text.secondary">
                                Aucun produit trouvé pour cette catégorie
                            </Typography>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
}

export default ProductsPage;