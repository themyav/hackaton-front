import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
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
import Button from '@mui/material/Button';

interface NavItem {
    name: string;
    path: string;
}

interface NavBarProps {
    children: React.ReactNode;
}

const drawerWidth = 240;

const navItems: NavItem[] = [
    {name: 'Главная', path: '/home'},
    {name: 'Карта', path: '/map'},
    {name: 'Мои машино-места', path: '/my-parkings'},
    {name: 'Отчеты', path: '/reports'}
];

const NavBar: React.FC<NavBarProps> = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
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
                            onClick={() => navigate(item.path, {state: {user}})}
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
                        Управление парковкой
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'flex'}}}>
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                sx={{color: '#fff'}}
                                onClick={() => navigate(item.path, {state: {user}})}
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
                {children}
            </Box>
        </Box>
    );
};

export default NavBar;