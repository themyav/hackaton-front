import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate, useLocation} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

const navItems = [
    {name: 'Главная', path: '/'},
    {name: 'Карта', path: '/map'},
    {name: 'Мои м/м', path: '/my-parkings'},
    {name: 'Аренда', path: '/rent'},
];

function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user] = React.useState(location.state?.user || {phone: '', password: ''});
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleLogout = () => {
        navigate('/login', {replace: true});
    };

    const handleEditProfile = () => {
        navigate('/profile', {state: {user}});
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                Меню
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            sx={{textAlign: 'center'}}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemText primary={item.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar component="nav" position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        Парковки
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'flex'}}}>
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                sx={{color: '#fff'}}
                                onClick={() => navigate(item.path)}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{p: 3, width: '100%', mt: 8}}>
                <div style={{padding: '20px', maxWidth: '400px', margin: '0 auto'}}>
                    <h1>Добро пожаловать!</h1>
                    <p><strong>Телефон:</strong> {user.phone}</p>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditProfile}
                        style={{margin: '10px 0'}}
                    >
                        Редактировать профиль
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>
                </div>
            </Box>
        </Box>
    );
}

export default HomePage;