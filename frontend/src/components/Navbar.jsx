import { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const pages = [
    { title: 'Produits', path: '/products', icon: <InventoryIcon /> },
    { title: 'Fournisseurs', path: '/suppliers', icon: <LocalShippingIcon /> },
    { title: 'Utilisateurs', path: '/users', icon: <GroupIcon /> },
    { title: 'Rapports', path: '/reports', icon: <BarChartIcon /> },
];

const settings = [
    { title: 'Profil', path: '/profile', icon: <AccountCircleIcon /> },
    { title: 'Déconnexion', path: '/logout', icon: <LogoutIcon /> },
];

function Navbar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ width: 250 }} role="presentation">
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <InventoryIcon sx={{ mr: 1 }} />
                <Typography variant="h6" noWrap component="div">
                    GStock
                </Typography>
            </Box>
            <Divider />
            <List>
                {pages.map((page) => (
                    <ListItem key={page.title} disablePadding component={Link} to={page.path} sx={{ color: 'inherit', textDecoration: 'none' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                {page.icon}
                            </ListItemIcon>
                            <ListItemText primary={page.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Mobile menu button */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                            <IconButton
                                size="large"
                                aria-label="menu de navigation"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawerToggle}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Logo */}
                        <InventoryIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            GSTOCK
                        </Typography>

                        {/* Mobile logo */}
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            GSTOCK
                        </Typography>

                        {/* Desktop navigation links */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.title}
                                    component={Link}
                                    to={page.path}
                                    sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center' }}
                                    startIcon={page.icon}
                                >
                                    {page.title}
                                </Button>
                            ))}
                        </Box>

                        {/* Notifications */}
                        <Box sx={{ display: 'flex', mr: 2 }}>
                            <IconButton color="inherit">
                                <NotificationsIcon />
                            </IconButton>
                        </Box>

                        {/* User menu */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Paramètres utilisateur">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Utilisateur" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting.title}
                                        onClick={handleCloseUserMenu}
                                        component={Link}
                                        to={setting.path}
                                    >
                                        <ListItemIcon>
                                            {setting.icon}
                                        </ListItemIcon>
                                        <Typography textAlign="center">{setting.title}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default Navbar;