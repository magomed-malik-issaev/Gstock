import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    useMediaQuery,
    useTheme,
    Tooltip
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    LocalShipping as SupplierIcon,
    Group as UserIcon,
    BarChart as ReportIcon,
    Settings as SettingsIcon,
    Notifications as NotificationsIcon,
    Menu as MenuIcon,
    AccountCircle as AccountIcon,
    Logout as LogoutIcon,
    Warning as AlertIcon,
    Person as ProfileIcon,
    Close as CloseIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import logoGstock from '../assets/images/gstock.png';

// Largeur de la barre latérale
const drawerWidth = 260;

// Éléments de navigation
const navigationItems = [
    { name: 'Tableau de bord', icon: <DashboardIcon />, path: '/dashboard' },
    { name: 'Produits', icon: <InventoryIcon />, path: '/products' },
    { name: 'Stocks', icon: <InventoryIcon />, path: '/stocks' },
    { name: 'Fournisseurs', icon: <SupplierIcon />, path: '/suppliers' },
    { name: 'Utilisateurs', icon: <UserIcon />, path: '/users' },
    { name: 'Alertes de stock', icon: <AlertIcon />, path: '/alerts' },
    { name: 'Rapports', icon: <ReportIcon />, path: '/reports' },
    { name: 'Paramètres', icon: <SettingsIcon />, path: '/settings' },
];

// Notifications fictives pour la démo
const notifications = [
    { id: 1, message: "Stock faible: Produit A (2 restants)", read: false, type: "alert" },
    { id: 2, message: "Nouvel utilisateur enregistré: Jean Dupont", read: false, type: "user" },
    { id: 3, message: "Commande #1234 livrée par Fournisseur XYZ", read: true, type: "order" },
];

function AdminLayout() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // États
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(true); // État pour contrôler la visibilité du drawer

    // Gestionnaires d'événements
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerOpenToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNotifications = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleCloseNotifications = () => {
        setAnchorElNotifications(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    // Nombre de notifications non lues
    const unreadNotifications = notifications.filter(notif => !notif.read).length;

    // Contenu de la barre latérale
    const drawer = (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logoGstock}
                        alt="Logo GStock"
                        style={{
                            height: '40px',
                            width: 'auto',
                            marginRight: '8px'
                        }}
                    />
                </Box>
                {isMobile && (
                    <IconButton onClick={handleDrawerToggle}>
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>
            <Box sx={{ py: 1, height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                <List>
                    {navigationItems.map((item) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                selected={location.pathname === item.path}
                                sx={{
                                    py: 1.2,
                                    pl: 2,
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                        borderLeft: '4px solid #1976d2',
                                        '&:hover': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.12)',
                                        }
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.name}
                                    primaryTypographyProps={{
                                        fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    width: { md: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
                    ml: { md: drawerOpen ? `${drawerWidth}px` : 0 },
                    boxShadow: 2,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar>
                    <Box display="flex" alignItems="center">
                        {isMobile ? (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                color="inherit"
                                onClick={handleDrawerOpenToggle}
                                edge="start"
                                sx={{ mr: 2 }}
                            >
                                {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                            </IconButton>
                        )}
                    </Box>

                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {/* Titre dynamique basé sur la page actuelle */}
                        {navigationItems.find(item => item.path === location.pathname)?.name || 'Tableau de bord'}
                    </Typography>

                    {/* Notifications */}
                    <Tooltip title="Notifications">
                        <IconButton
                            color="inherit"
                            onClick={handleOpenNotifications}
                            sx={{ mr: 1 }}
                        >
                            <Badge badgeContent={unreadNotifications} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    {/* Menu utilisateur */}
                    <Box>
                        <Tooltip title="Paramètres utilisateur">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                                <Avatar alt="Admin" src="" />
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
                            <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                                <ListItemIcon>
                                    <ProfileIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography textAlign="center">Profil</Typography>
                            </MenuItem>

                            <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography textAlign="center">Déconnexion</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    {/* Menu notifications */}
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-notifications"
                        anchorEl={anchorElNotifications}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNotifications)}
                        onClose={handleCloseNotifications}
                    >
                        {notifications.length > 0 ? (
                            <>
                                {notifications.map((notification) => (
                                    <MenuItem
                                        key={notification.id}
                                        onClick={handleCloseNotifications}
                                        sx={{
                                            backgroundColor: notification.read ? 'inherit' : 'rgba(25, 118, 210, 0.08)',
                                            px: 2,
                                            py: 1,
                                            minWidth: '300px'
                                        }}
                                    >
                                        <Typography variant="body2">{notification.message}</Typography>
                                    </MenuItem>
                                ))}
                                <Divider />
                                <MenuItem
                                    onClick={handleCloseNotifications}
                                    sx={{ justifyContent: 'center' }}
                                >
                                    <Typography variant="body2" color="primary">Voir toutes les notifications</Typography>
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={handleCloseNotifications}>
                                <Typography variant="body2">Aucune notification</Typography>
                            </MenuItem>
                        )}
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Drawer pour mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Drawer permanent pour desktop avec possibilité de retrait */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: drawerOpen ? drawerWidth : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        // Transition pour l'animation d'ouverture/fermeture
                        transition: theme.transitions.create('transform', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        transform: drawerOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
                        visibility: drawerOpen ? 'visible' : 'hidden' // évite que le drawer prenne de l'espace quand fermé
                    },
                }}
                open={drawerOpen}
            >
                {drawer}
            </Drawer>

            {/* Contenu principal */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    bgcolor: '#f5f7fa',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Toolbar /> {/* Espace pour la barre d'applications */}
                <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                    <Outlet /> {/* Contenu de la page */}
                </Box>
            </Box>
        </Box>
    );
}

export default AdminLayout; 