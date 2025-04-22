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
    Alert,
    Paper
} from '@mui/material';
import api from '../services/api';

// Import des images
import gourdeisotherme from '../assets/images/gourdeisotherme.avif';
import sacsportnike from '../assets/images/sacsportnike.webp';
import proteinewhey from '../assets/images/proteinewhey.jpg';
import montregpsgarmin from '../assets/images/montregpsgarmin.webp';
import casquevelogiro from '../assets/images/casquevelogiro.jpg';
import skirossignol from '../assets/images/skirossignol.jpg';
import lunettenatationspeedo from '../assets/images/lunettenatationspeedo.webp';
import tapisyoga from '../assets/images/tapisyoga.webp';
import altere10kg from '../assets/images/altère10kg.jpg';
import raquettewilsonpro from '../assets/images/raquettewilsonpro.jpg';
import ballonspaldingnba from '../assets/images/ballonspaldingnba.jpg';
import ballonchampionsleague from '../assets/images/ballonchampionsleague.jpg';
import predator from '../assets/images/predator.jpg';
import nikeairzoom from '../assets/images/nikeairzoom.jpg';
import shortrunning from '../assets/images/shortrunning.webp';
import maillotequipedefrance from '../assets/images/maillotequipedefrance.jpg';

// Map des images par nom
const productImages = {
    'Gourde isotherme': gourdeisotherme,
    'Sac de sport Nike': sacsportnike,
    'Protéine Whey': proteinewhey,
    'Montre GPS Garmin': montregpsgarmin,
    'Casque vélo Giro': casquevelogiro,
    'Ski Rossignol': skirossignol,
    'Lunette natation Speedo': lunettenatationspeedo,
    'Tapis de yoga': tapisyoga,
    'Altères 10kg': altere10kg,
    'Raquette Wilson Pro': raquettewilsonpro,
    'Ballon Spalding NBA': ballonspaldingnba,
    'Ballon Champions League': ballonchampionsleague,
    'Chaussures Predator': predator,
    'Nike Air Zoom': nikeairzoom,
    'Short running': shortrunning,
    'Maillot Équipe de France': maillotequipedefrance,
    // Ajoutez d'autres images ici
};

// Fonction pour obtenir l'image correspondante ou une image par défaut
const getProductImage = (product) => {
    if (productImages[product.name]) {
        return productImages[product.name];
    }

    // Si le nom ne correspond pas exactement, essayer de trouver une correspondance partielle
    const productNameLower = product.name.toLowerCase();
    for (const [key, image] of Object.entries(productImages)) {
        if (productNameLower.includes(key.toLowerCase())) {
            return image;
        }
    }

    // Image par défaut si aucune correspondance
    return "https://via.placeholder.com/300x180?text=Produit";
};

// Styles pour les cartes de produits
const cardStyles = {
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 6
        },
        borderRadius: 2,
        overflow: 'hidden'
    },
    mediaContainer: {
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden'
    },
    media: {
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
        padding: 1
    },
    contentArea: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 1
    },
    name: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.2,
        flexGrow: 1,
        marginRight: 1
    },
    price: {
        fontWeight: 'bold'
    },
    stockInfo: {
        marginTop: 'auto'
    }
};

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
                        <Grid container spacing={3}>
                            {products.map(product => (
                                <Grid item key={product.id} xs={12} sm={6} md={3} lg={3}>
                                    <Paper elevation={2} sx={cardStyles.card}>
                                        {/* Image du produit */}
                                        <Box sx={cardStyles.mediaContainer}>
                                            <CardMedia
                                                component="img"
                                                image={getProductImage(product)}
                                                alt={product.name}
                                                sx={cardStyles.media}
                                            />
                                        </Box>

                                        {/* Contenu de la carte */}
                                        <CardContent sx={cardStyles.contentArea}>
                                            <Box sx={cardStyles.header}>
                                                <Typography variant="subtitle1" component="h3" sx={cardStyles.name}>
                                                    {product.name}
                                                </Typography>
                                                <Chip
                                                    label={`${product.selling_price} €`}
                                                    color="primary"
                                                    size="small"
                                                    sx={cardStyles.price}
                                                />
                                            </Box>

                                            <Box sx={cardStyles.stockInfo}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Stock: {product.current_stock} unités
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" display="block">
                                                    Seuil d'alerte: {product.alert_threshold} unités
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Paper>
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