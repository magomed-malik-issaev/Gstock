import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextInput,
    Button,
    Text,
    Paper,
    Checkbox,
    Anchor,
    Group,
    Loader,
    Alert,
    Grid,
    Divider,
    Box,
    Avatar,
    Title,
    Stack,
    Image,
    Flex
} from '@mantine/core';
import {
    IconLock,
    IconMail,
    IconAlertCircle,
    IconCheck
} from '@tabler/icons-react';
import logoGstock from '../assets/images/gstock.png';

function LoginPage() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulation d'une attente pour l'authentification
        setTimeout(() => {
            try {
                // Simulation d'une connexion réussie
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/dashboard');
            } catch (err) {
                setError('Identifiants invalides. Veuillez réessayer.');
            } finally {
                setLoading(false);
            }
        }, 800);
    };

    return (
        <Box
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 0'
            }}
        >
            <Container size="lg">
                <Paper
                    shadow="md"
                    radius="lg"
                    style={{
                        display: 'flex',
                        overflow: 'hidden'
                    }}
                >
                    {/* Panneau de gauche - Informations */}
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '50%',
                            padding: '2rem',
                            background: 'linear-gradient(135deg, #228be6 0%, #1c7ed6 100%)',
                            color: 'white',
                            position: 'relative'
                        }}
                        visibleFrom="md"
                    >
                        <Box style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
                            <Image
                                src={logoGstock}
                                alt="Logo GStock"
                                h={100}
                                w="auto"
                                mr="md"
                            />
                        </Box>

                        <Title order={3} mb="lg">
                            Système complet de gestion de stock
                        </Title>

                        <Stack spacing="sm">
                            <Group gap="xs">
                                <IconCheck color="white" size={18} />
                                <Text>Suivi des stocks en temps réel</Text>
                            </Group>
                            <Group gap="xs">
                                <IconCheck color="white" size={18} />
                                <Text>Gestion des fournisseurs</Text>
                            </Group>
                            <Group gap="xs">
                                <IconCheck color="white" size={18} />
                                <Text>Alertes de rupture</Text>
                            </Group>
                            <Group gap="xs">
                                <IconCheck color="white" size={18} />
                                <Text>Rapports et statistiques</Text>
                            </Group>
                        </Stack>
                    </Box>

                    {/* Panneau de droite - Formulaire */}
                    <Box
                        style={{
                            width: '100%',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                        miw={{ base: '100%', md: '50%' }}
                    >
                        <Flex direction="column" align="center" mb="xl">
                            <Image
                                src={logoGstock}
                                alt="Logo GStock"
                                h={70}
                                w="auto"
                                mb="md"
                            />
                            <Title order={2} fw={700}>
                                Connexion
                            </Title>
                            <Text c="dimmed" mt="xs">
                                Veuillez vous connecter pour accéder à votre compte
                            </Text>
                        </Flex>

                        {error && (
                            <Alert
                                icon={<IconAlertCircle size={16} />}
                                title="Erreur"
                                color="red"
                                mb="md"
                            >
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextInput
                                mt="md"
                                required
                                label="Adresse email"
                                placeholder="votre@email.com"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                leftSection={<IconMail size={16} />}
                                autoFocus
                            />

                            <TextInput
                                mt="md"
                                required
                                label="Mot de passe"
                                placeholder="Votre mot de passe"
                                name="password"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                leftSection={<IconLock size={16} />}
                            />

                            <Group justify="space-between" mt="md">
                                <Checkbox
                                    label="Se souvenir de moi"
                                    color="brand"
                                />
                                <Anchor
                                    component="button"
                                    type="button"
                                    color="brand"
                                    size="sm"
                                >
                                    Mot de passe oublié?
                                </Anchor>
                            </Group>

                            <Button
                                type="submit"
                                fullWidth
                                mt="lg"
                                size="md"
                                color="brand"
                                loading={loading}
                                loaderProps={{ type: 'dots' }}
                            >
                                {loading ? 'Connexion en cours...' : 'Se connecter'}
                            </Button>

                            <Divider my="lg" labelPosition="center" label="Ou" />

                            <Text ta="center" size="sm" c="dimmed">
                                Pas encore de compte?{' '}
                                <Anchor
                                    component="button"
                                    type="button"
                                    color="brand"
                                    size="sm"
                                    ml={5}
                                >
                                    Créer un compte
                                </Anchor>
                            </Text>
                        </form>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default LoginPage;