// frontend/src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import {
    Container,
    Title,
    Text,
    Grid,
    Card,
    Image,
    Badge,
    Group,
    Select,
    Box,
    Divider,
    Alert,
    Loader,
    Stack,
    Center
} from '@mantine/core';
import { IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';
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
    const productNameLower = product.name?.toLowerCase() || '';
    for (const [key, image] of Object.entries(productImages)) {
        if (productNameLower.includes(key.toLowerCase())) {
            return image;
        }
    }

    // Image par défaut si aucune correspondance
    return "https://via.placeholder.com/300x180?text=Produit";
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
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    // Trouver le nom de la catégorie sélectionnée
    const getSelectedCategoryName = () => {
        if (!selectedCategory) return 'Tous les produits';
        const category = categories.find(cat => cat.id === parseInt(selectedCategory));
        return category ? category.name : '';
    };

    // Options pour le sélecteur de catégories
    const categoryOptions = categories.map(category => ({
        value: category.id.toString(),
        label: category.name
    }));

    return (
        <Container size="xl" py="md">
            {/* En-tête */}
            <Box mb="lg">
                <Title order={1} mb="xs">Produits</Title>
                <Text c="dimmed">
                    Parcourez notre catalogue de produits et filtrez par catégorie
                </Text>
            </Box>

            {/* Sélection de catégorie */}
            <Box mb="lg" maw={300}>
                <Select
                    label="Filtrer par catégorie"
                    placeholder="Toutes les catégories"
                    data={[{ value: '', label: 'Toutes les catégories' }, ...categoryOptions]}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    clearable={false}
                />
            </Box>

            {/* Affichage de la catégorie sélectionnée */}
            <Box mb="md">
                <Title order={2}>{getSelectedCategoryName()}</Title>
                <Divider my="sm" />
            </Box>

            {/* Affichage des erreurs */}
            {error && (
                <Alert
                    title="Erreur"
                    color="red"
                    icon={<IconAlertTriangle />}
                    mb="md"
                >
                    {error}
                </Alert>
            )}

            {/* Indicateur de chargement */}
            {loading ? (
                <Center my="xl">
                    <Loader size="lg" color="brand" />
                </Center>
            ) : (
                <>
                    {/* Grille de produits */}
                    {products.length > 0 ? (
                        <Grid>
                            {products.map(product => (
                                <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                                    <Card shadow="sm" padding="md" radius="md" withBorder>
                                        <Card.Section>
                                            <Image
                                                src={getProductImage(product)}
                                                height={200}
                                                fit="contain"
                                                bg="gray.0"
                                                p="md"
                                                alt={product.name}
                                            />
                                        </Card.Section>

                                        <Stack mt="md" gap="sm">
                                            <Group justify="space-between" align="flex-start">
                                                <Text fw={600} lineClamp={2}>{product.name}</Text>
                                                <Badge color="brand" size="lg" variant="filled">
                                                    {product.selling_price} €
                                                </Badge>
                                            </Group>

                                            <Group gap="xs">
                                                <Text size="sm" c="dimmed">
                                                    Stock: {product.current_stock} unités
                                                </Text>
                                            </Group>

                                            <Text size="xs" c="dimmed">
                                                Seuil d'alerte: {product.alert_threshold} unités
                                            </Text>
                                        </Stack>
                                    </Card>
                                </Grid.Col>
                            ))}
                        </Grid>
                    ) : (
                        <Center my="xl" py="xl" bg="gray.0" style={{ borderRadius: 8 }}>
                            <Stack align="center">
                                <IconInfoCircle size={48} color="gray" />
                                <Title order={3} c="gray.7">Aucun produit trouvé</Title>
                                <Text c="dimmed">Aucun produit disponible pour cette catégorie.</Text>
                            </Stack>
                        </Center>
                    )}
                </>
            )}
        </Container>
    );
}

export default ProductsPage;