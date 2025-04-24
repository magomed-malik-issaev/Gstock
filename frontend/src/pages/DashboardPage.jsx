import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    Text,
    Card,
    Avatar,
    Progress,
    Table,
    Button,
    Group,
    Box,
    Title,
    Stack,
    ActionIcon,
    Badge,
    rem
} from '@mantine/core';
import {
    IconPackage,
    IconTruck,
    IconUsers,
    IconAlertCircle,
    IconArrowUpRight,
    IconArrowDownRight,
    IconEye
} from '@tabler/icons-react';

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

    // Pour une application réelle, vous feriez des appels  ici
    useEffect(() => {
        // Simuler un chargement des données
        const timer = setTimeout(() => {
            // Mise à jour des statistiques (dans un vrai cas, cela viendrait d'une )
            setStats({
                totalProducts: 248,
                totalSuppliers: 36,
                totalUsers: 15,
                lowStockAlerts: 7
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Statistiques cards
    const statCards = [
        {
            title: "Produits",
            value: stats.totalProducts,
            icon: <IconPackage size={24} />,
            color: "brand",
            progress: 70,
            description: "70% de capacité utilisée"
        },
        {
            title: "Fournisseurs",
            value: stats.totalSuppliers,
            icon: <IconTruck size={24} />,
            color: "teal",
            progress: 50,
            description: "3 commandes en cours"
        },
        {
            title: "Utilisateurs",
            value: stats.totalUsers,
            icon: <IconUsers size={24} />,
            color: "blue",
            progress: 30,
            description: "4 utilisateurs actifs"
        },
        {
            title: "Alertes",
            value: stats.lowStockAlerts,
            icon: <IconAlertCircle size={24} />,
            color: "red",
            hasButton: true,
            buttonText: "Voir les alertes →"
        }
    ];

    const rows = recentMovements.map((movement) => (
        <Table.Tr key={movement.id}>
            <Table.Td fw={500}>{movement.productName}</Table.Td>
            <Table.Td>
                <Group gap="xs">
                    {movement.type === 'entrée' ? (
                        <>
                            <IconArrowUpRight size={16} color="teal" stroke={1.5} />
                            <Text>entrée</Text>
                        </>
                    ) : (
                        <>
                            <IconArrowDownRight size={16} color="red" stroke={1.5} />
                            <Text>sortie</Text>
                        </>
                    )}
                </Group>
            </Table.Td>
            <Table.Td ta="right">{movement.quantity}</Table.Td>
            <Table.Td>{movement.date}</Table.Td>
            <Table.Td>{movement.user}</Table.Td>
            <Table.Td ta="right">
                <Button variant="outline" size="xs" leftSection={<IconEye size={14} />}>
                    Détails
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Container size="xl" py="md">
            {/* Rangée de 4 cartes de statistiques */}
            <Grid gutter="xl" mb="xl">
                {statCards.map((stat, index) => (
                    <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                        <Card shadow="sm" padding="md" radius="md" withBorder h="100%">
                            <Group justify="space-between" mb="md">
                                <Text size="lg" c="dimmed" fw={500}>
                                    {stat.title}
                                </Text>
                                <Avatar
                                    color={stat.color}
                                    radius="xl"
                                    size="md"
                                >
                                    {stat.icon}
                                </Avatar>
                            </Group>
                            <Title order={2} fw={700} mb="xs">
                                {stat.value}
                            </Title>
                            {stat.progress && (
                                <>
                                    <Progress
                                        value={stat.progress}
                                        color={stat.color}
                                        size="md"
                                        radius="xl"
                                        mb="xs"
                                    />
                                    <Text size="sm" c="dimmed">
                                        {stat.description}
                                    </Text>
                                </>
                            )}
                            {stat.hasButton && (
                                <Button
                                    variant="subtle"
                                    color={stat.color}
                                    px={0}
                                    mt="md"
                                >
                                    {stat.buttonText}
                                </Button>
                            )}
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Grande section graphique */}
            <Paper
                shadow="sm"
                radius="md"
                p="lg"
                withBorder
                mb="xl"
                h={350}
            >
                <Title order={3} mb="md">
                    Activité du stock
                </Title>

                <Box
                    style={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f8f9fa',
                        borderRadius: rem(4),
                        height: '85%'
                    }}
                >
                    <Text c="dimmed">
                        Graphique d'activité du stock (à implémenter)
                    </Text>
                </Box>
            </Paper>

            {/* Grande section tableau */}
            <Paper
                shadow="sm"
                radius="md"
                withBorder
                style={{ overflow: 'hidden' }}
            >
                <Box py="md" px="lg" style={{ borderBottom: '1px solid #e9ecef' }}>
                    <Group justify="space-between">
                        <Title order={3}>
                            Mouvements récents
                        </Title>
                        <Button variant="outline">
                            Voir tous les mouvements
                        </Button>
                    </Group>
                </Box>

                <Box style={{ maxHeight: '450px', overflow: 'auto' }}>
                    <Table striped highlightOnHover withTableBorder>
                        <Table.Thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                            <Table.Tr>
                                <Table.Th>Produit</Table.Th>
                                <Table.Th>Type</Table.Th>
                                <Table.Th ta="right">Quantité</Table.Th>
                                <Table.Th>Date</Table.Th>
                                <Table.Th>Utilisateur</Table.Th>
                                <Table.Th ta="right">Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Box>
            </Paper>
        </Container>
    );
}

export default DashboardPage;