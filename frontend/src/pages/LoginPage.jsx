import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Checkbox,
    FormControlLabel,
    Link,
    CircularProgress,
    Alert,
    Grid,
    Divider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
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
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={6}
                    sx={{
                        display: 'flex',
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    {/* Panneau de gauche - Informations */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '50%',
                            p: 4,
                            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                            color: 'white',
                            position: 'relative'
                        }}
                    >
                        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                            <img
                                src={logoGstock}
                                alt="Logo GStock"
                                style={{
                                    width: 'auto',
                                    height: '100px',
                                    marginRight: '8px'
                                }}
                            />
                        </Box>

                        <Typography variant="h6" sx={{ mb: 3 }}>
                            Système complet de gestion de stock
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                ✓ Suivi des stocks en temps réel
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                ✓ Gestion des fournisseurs
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                ✓ Alertes de rupture
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                ✓ Rapports et statistiques
                            </Typography>
                        </Box>
                    </Box>

                    {/* Panneau de droite - Formulaire */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: '50%' },
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <img
                                src={logoGstock}
                                alt="Logo GStock"
                                style={{
                                    width: 'auto',
                                    height: '70px',
                                    marginBottom: '16px'
                                }}
                            />
                            <Typography variant="h5" component="h2" fontWeight="bold">
                                Connexion
                            </Typography>
                            <Typography color="textSecondary" sx={{ mt: 1 }}>
                                Veuillez vous connecter pour accéder à votre compte
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Adresse email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={credentials.email}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ff9800',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#ed6c02',
                                    }
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={credentials.password}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <LockOutlinedIcon color="action" sx={{ mr: 1 }} />
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ff9800',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#ed6c02',
                                    }
                                }}
                            />

                            <Grid container sx={{ mt: 2, mb: 2 }}>
                                <Grid item xs>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" sx={{
                                            '&.Mui-checked': {
                                                color: '#ff9800',
                                            }
                                        }} />}
                                        label="Se souvenir de moi"
                                    />
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '100%',
                                        color: '#ed6c02'
                                    }}>
                                        Mot de passe oublié?
                                    </Link>
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    py: 1.5,
                                    position: 'relative',
                                    bgcolor: '#ff9800',
                                    '&:hover': {
                                        bgcolor: '#ed6c02',
                                    }
                                }}
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                position: 'absolute',
                                                left: '10%',
                                                color: 'white'
                                            }}
                                        />
                                        Connexion en cours...
                                    </>
                                ) : 'Se connecter'}
                            </Button>

                            <Box sx={{ mt: 4, textAlign: 'center' }}>
                                <Typography variant="body2" color="textSecondary">
                                    Vous n'avez pas de compte?{' '}
                                    <Link href="#" variant="body2" sx={{ color: '#ed6c02' }}>
                                        Contactez votre administrateur
                                    </Link>
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                                &copy; {new Date().getFullYear()} GStock. Tous droits réservés.
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default LoginPage;