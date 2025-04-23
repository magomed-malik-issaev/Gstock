import { useState, useEffect } from 'react';
import {
    Container,
    Title,
    Text,
    Grid,
    Card,
    Badge,
    Group,
    Tabs,
    TextInput,
    Select,
    NumberInput,
    Button,
    Table,
    Paper,
    Alert,
    Modal,
    Box,
    Divider,
    Loader,
    ActionIcon,
    Image,
    Stack
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconSearch,
    IconPackage,
    IconLogout,
    IconArrowRight,
    IconArrowLeft,
    IconInfoCircle,
    IconCheck,
    IconX,
    IconPlus,
    IconFilter
} from '@tabler/icons-react';
import api from '../services/api';

// Import des images (réutiliser celles de ProductsPage)
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
};

// Fonction pour obtenir l'image correspondante (reprise de ProductsPage)
const getProductImage = (product) => {
    // 1. Correspondance directe avec le nom exact
    if (productImages[product.name]) {
        return productImages[product.name];
    }

    // 2. Correspondance avec le nom en minuscules sans espaces
    const productNameLower = product.name?.toLowerCase().replace(/\s+/g, '') || '';
    for (const [key, image] of Object.entries(productImages)) {
        const keyLower = key.toLowerCase().replace(/\s+/g, '');
        if (productNameLower.includes(keyLower) || keyLower.includes(productNameLower)) {
            return image;
        }
    }

    // 3. Recherche de mots-clés dans le nom du produit
    const keywords = [
        { key: "maillot", img: maillotequipedefrance },
        { key: "france", img: maillotequipedefrance },
        { key: "short", img: shortrunning },
        { key: "running", img: shortrunning },
        { key: "chaussures", img: nikeairzoom },
        { key: "zoom", img: nikeairzoom },
        { key: "predator", img: predator },
        { key: "adidas", img: predator },
        { key: "ballon", img: ballonchampionsleague },
        { key: "champions", img: ballonchampionsleague },
        { key: "basketball", img: ballonspaldingnba },
        { key: "tennis", img: raquettewilsonpro },
        { key: "raquette", img: raquettewilsonpro },
        { key: "haltère", img: altere10kg },
        { key: "altère", img: altere10kg },
        { key: "gourde", img: gourdeisotherme },
        { key: "sac", img: sacsportnike },
        { key: "tapis", img: tapisyoga },
        { key: "casque", img: casquevelogiro },
        { key: "lunette", img: lunettenatationspeedo },
    ];

    for (const { key, img } of keywords) {
        if (productNameLower.includes(key.toLowerCase())) {
            return img;
        }
    }

    // Image par défaut si aucune correspondance
    return "https://via.placeholder.com/300x180?text=Produit";
};

// Données fictives pour l'historique des mouvements
const initialMovements = [
    { id: 1, productName: "Maillot Équipe de France", type: "entrée", quantity: 20, date: "2023-09-15 10:23" },
    { id: 2, productName: "Short running", type: "sortie", quantity: 5, date: "2023-09-14 09:45" },
    { id: 3, productName: "Nike Air Zoom", type: "entrée", quantity: 15, date: "2023-09-13 16:30" },
    { id: 4, productName: "Ballon Champions League", type: "sortie", quantity: 3, date: "2023-09-12 14:15" },
];

function EmployeePage() {
    // États pour les produits et catégories
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // États pour les mouvements de stock
    const [movements, setMovements] = useState(initialMovements);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [movementQuantity, setMovementQuantity] = useState(1);
    const [movementType, setMovementType] = useState('entrée');
    const [opened, { open, close }] = useDisclosure(false);

    // Chargement initial des produits et catégories
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Charger les catégories
                const categoriesResponse = await api.get('/categories');
                if (categoriesResponse.data && categoriesResponse.data.success) {
                    setCategories(categoriesResponse.data.data);
                }

                // Charger les produits
                const productsResponse = await api.get('/products');
                if (productsResponse.data && productsResponse.data.success) {
                    setProducts(productsResponse.data.data);
                    setFilteredProducts(productsResponse.data.data);
                }

                setLoading(false);
            } catch (err) {
                console.error('Erreur lors du chargement des données:', err);
                setError('Impossible de charger les données. Veuillez réessayer plus tard.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Effet pour filtrer les produits selon la catégorie et la recherche
    useEffect(() => {
        let result = [...products];

        // Filtrer par catégorie
        if (selectedCategory) {
            result = result.filter(product => product.category_id === parseInt(selectedCategory));
        }

        // Filtrer par terme de recherche
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(product =>
                product.name.toLowerCase().includes(term) ||
                product.description?.toLowerCase().includes(term)
            );
        }

        setFilteredProducts(result);
    }, [products, selectedCategory, searchTerm]);

    // Gestion du changement de catégorie
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    // Gestion de la recherche
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Ouvrir le modal d'ajout de mouvement avec le produit sélectionné
    const handleOpenMovementModal = (product) => {
        setSelectedProduct(product);
        setMovementQuantity(1);
        setMovementType('entrée');
        open();
    };

    // Ajouter un nouveau mouvement de stock
    const handleAddMovement = () => {
        // Vérifier que tout est valide
        if (!selectedProduct || movementQuantity <= 0) {
            return;
        }

        // Créer le nouveau mouvement
        const newMovement = {
            id: movements.length + 1,
            productName: selectedProduct.name,
            type: movementType,
            quantity: movementQuantity,
            date: new Date().toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }).replace(',', '')
        };

        // Mettre à jour le stock du produit
        const updatedProducts = products.map(p => {
            if (p.id === selectedProduct.id) {
                const newStock = movementType === 'entrée'
                    ? p.current_stock + movementQuantity
                    : p.current_stock - movementQuantity;

                return { ...p, current_stock: Math.max(0, newStock) };
            }
            return p;
        });

        // Mettre à jour l'état
        setMovements([newMovement, ...movements]);
        setProducts(updatedProducts);
        close();

        // Dans une application réelle, il faudrait également envoyer ces données au serveur
        // api.post('/stock-movements', { product_id: selectedProduct.id, type: movementType, quantity: movementQuantity });
    };

    // Formatage du statut de stock avec badges
    const getStockStatus = (product) => {
        if (product.current_stock <= 0) {
            return (
                <Badge color="red" variant="filled">
                    Rupture de stock
                </Badge>
            );
        } else if (product.current_stock <= product.alert_threshold) {
            return (
                <Badge color="yellow" variant="filled">
                    Stock bas
                </Badge>
            );
        } else {
            return (
                <Badge color="green" variant="filled">
                    En stock
                </Badge>
            );
        }
    };

    // Fonction pour obtenir le nom de la catégorie sélectionnée
    const getSelectedCategoryName = () => {
        if (!selectedCategory) return 'Tous les produits';
        const category = categories.find(cat => cat.id === parseInt(selectedCategory));
        return category ? category.name : '';
    };

    return (
        <Container size="xl" py="md">
            <Group position="apart" mb="xl">
                <Title order={2}>Espace Employé</Title>
                <Button
                    leftSection={<IconLogout size={16} />}
                    variant="subtle"
                    onClick={() => {
                        localStorage.removeItem('isLoggedIn');
                        window.location.href = '/login';
                    }}
                >
                    Déconnexion
                </Button>
            </Group>

            <Tabs defaultValue="stock">
                <Tabs.List mb="md">
                    <Tabs.Tab value="stock" leftSection={<IconPackage size={16} />}>
                        Gestion du Stock
                    </Tabs.Tab>
                    <Tabs.Tab value="movements" leftSection={<IconArrowRight size={16} />}>
                        Mouvements de Stock
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="stock">
                    {error ? (
                        <Alert color="red" title="Erreur" icon={<IconInfoCircle />}>
                            {error}
                        </Alert>
                    ) : loading ? (
                        <Box py="xl" ta="center">
                            <Loader size="lg" />
                        </Box>
                    ) : (
                        <>
                            <Paper shadow="xs" p="md" withBorder mb="lg">
                                <Group>
                                    <TextInput
                                        placeholder="Rechercher un produit..."
                                        leftSection={<IconSearch size={16} />}
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        style={{ flex: 1 }}
                                    />
                                    <Select
                                        placeholder="Filtrer par catégorie"
                                        data={[
                                            { value: '', label: 'Toutes les catégories' },
                                            ...categories.map(cat => ({ value: cat.id.toString(), label: cat.name }))
                                        ]}
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        leftSection={<IconFilter size={16} />}
                                        clearable
                                        style={{ width: 220 }}
                                    />
                                </Group>
                            </Paper>

                            <Box mb="md">
                                <Title order={3}>{getSelectedCategoryName()}</Title>
                                <Text c="dimmed">{filteredProducts.length} produits trouvés</Text>
                            </Box>

                            <Grid>
                                {filteredProducts.map(product => (
                                    <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                                        <Card shadow="sm" padding="md" radius="md" withBorder>
                                            <Card.Section>
                                                <Box style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                                                    <Image
                                                        src={getProductImage(product)}
                                                        alt={product.name}
                                                        fit="contain"
                                                        h={150}
                                                    />
                                                </Box>
                                            </Card.Section>

                                            <Box mt="md" mb="xs">
                                                <Text fw={700} lineClamp={1} title={product.name}>{product.name}</Text>
                                                <Group position="apart" mt="md">
                                                    {getStockStatus(product)}
                                                    <Badge variant="light">{product.current_stock} unités</Badge>
                                                </Group>
                                            </Box>

                                            <Button
                                                fullWidth
                                                mt="md"
                                                color="brand"
                                                leftSection={<IconPlus size={16} />}
                                                onClick={() => handleOpenMovementModal(product)}
                                            >
                                                Mouvement
                                            </Button>
                                        </Card>
                                    </Grid.Col>
                                ))}
                            </Grid>

                            {filteredProducts.length === 0 && (
                                <Box ta="center" py="xl">
                                    <Text c="dimmed">Aucun produit ne correspond à votre recherche</Text>
                                </Box>
                            )}
                        </>
                    )}
                </Tabs.Panel>

                <Tabs.Panel value="movements">
                    <Title order={3} mb="md">Historique des mouvements</Title>
                    {movements.length > 0 ? (
                        <Table striped highlightOnHover withTableBorder>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Produit</Table.Th>
                                    <Table.Th>Type</Table.Th>
                                    <Table.Th>Quantité</Table.Th>
                                    <Table.Th>Date</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {movements.map(movement => (
                                    <Table.Tr key={movement.id}>
                                        <Table.Td>{movement.productName}</Table.Td>
                                        <Table.Td>
                                            <Group>
                                                {movement.type === 'entrée' ? (
                                                    <>
                                                        <Badge color="green" variant="light" leftSection={<IconArrowRight size={14} />}>
                                                            Entrée
                                                        </Badge>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Badge color="red" variant="light" leftSection={<IconArrowLeft size={14} />}>
                                                            Sortie
                                                        </Badge>
                                                    </>
                                                )}
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>{movement.quantity} unités</Table.Td>
                                        <Table.Td>{movement.date}</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    ) : (
                        <Box ta="center" py="xl">
                            <Text c="dimmed">Aucun mouvement de stock enregistré</Text>
                        </Box>
                    )}
                </Tabs.Panel>
            </Tabs>

            {/* Modal pour ajouter un mouvement de stock */}
            <Modal
                opened={opened}
                onClose={close}
                title={<Title order={4}>Nouveau mouvement de stock</Title>}
                centered
            >
                {selectedProduct && (
                    <Stack>
                        <Group>
                            <Image
                                src={getProductImage(selectedProduct)}
                                width={80}
                                height={80}
                                fit="contain"
                            />
                            <Box>
                                <Text fw={700}>{selectedProduct.name}</Text>
                                <Text size="sm" c="dimmed">
                                    Stock actuel: {selectedProduct.current_stock} unités
                                </Text>
                            </Box>
                        </Group>

                        <Divider my="sm" />

                        <Select
                            label="Type de mouvement"
                            value={movementType}
                            onChange={setMovementType}
                            data={[
                                { value: 'entrée', label: 'Entrée de stock' },
                                { value: 'sortie', label: 'Sortie de stock' }
                            ]}
                            required
                        />

                        <NumberInput
                            label="Quantité"
                            value={movementQuantity}
                            onChange={setMovementQuantity}
                            min={1}
                            max={movementType === 'sortie' ? selectedProduct.current_stock : 9999}
                            required
                        />

                        {movementType === 'sortie' && selectedProduct.current_stock < movementQuantity && (
                            <Alert color="red" title="Attention" icon={<IconInfoCircle />}>
                                La quantité demandée est supérieure au stock disponible.
                            </Alert>
                        )}

                        <Group justify="flex-end" mt="md">
                            <Button variant="light" onClick={close}>Annuler</Button>
                            <Button
                                color="brand"
                                onClick={handleAddMovement}
                                disabled={
                                    movementQuantity <= 0 ||
                                    (movementType === 'sortie' && selectedProduct.current_stock < movementQuantity)
                                }
                            >
                                Confirmer
                            </Button>
                        </Group>
                    </Stack>
                )}
            </Modal>
        </Container>
    );
}

export default EmployeePage; 