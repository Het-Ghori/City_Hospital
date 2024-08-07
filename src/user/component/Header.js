import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/button/Button';
import CustomLink from '../UI/link/Link';
import Badge from '@mui/material/Badge';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThemeIcon from '@mui/icons-material/InvertColors';
import ThemeContext from '../context/ThemeContext';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { Logout, Settings } from '@mui/icons-material';
import { logoutRequest } from '../redux/action/auth.action';

function Header() {
    const [HeaderScrolled, setHeaderScrolled] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const theme = useContext(ThemeContext);
    const checklogin = useSelector((state) => state.auth.user);

    const handleScroll = () => {
        setHeaderScrolled(window.scrollY > 100);
    };

    const handleLogout = () => {
        dispatch(logoutRequest())
        navigate('/auth');
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const cartState = useSelector(state => state.cart);
    let addedCartData = 0;
    if (cartState.items) {
        addedCartData = cartState.items.reduce((acc, val) => acc + val.quantity, 0);
    }

    const favouriteState = useSelector(state => state.favourites);

    return (
        <div className="main-header">
            <div id="topbar" className={`d-flex align-items-center fixed-top ${HeaderScrolled ? 'topbar-scrolled' : ''}`}>
                <div className="container d-flex justify-content-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope" /> <a href="mailto:contact@example.com">cityhospital@example.com</a>
                        <i className="bi bi-phone" /> <a href="tel:+91 9988776655">+91 9988776655</a>
                    </div>
                    <div className="d-none d-lg-flex social-links align-items-center">
                        <a href="/" className="twitter"><i className="bi bi-twitter" /></a>
                        <a href="/" className="facebook"><i className="bi bi-facebook" /></a>
                        <a href="/" className="instagram"><i className="bi bi-instagram" /></a>
                        <a href="/" className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                </div>
            </div>
            <header id="header" className={`fixed-top ${HeaderScrolled ? 'header-scrolled' : ''}`}>
                <div className="container d-flex align-items-center">
                    <div className="logo">
                        <Link to="/">
                            <h1 className="logo me-auto">City</h1><br />
                            <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
                        </Link>
                    </div>
                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li><CustomLink to="/" as={Link}>Home</CustomLink></li>
                            <li><CustomLink to="/departments" as={Link}>Departments</CustomLink></li>
                            <li><CustomLink to="/doctors" as={Link}>Doctors</CustomLink></li>
                            <li><CustomLink to="/medicines" as={Link}>Medicines</CustomLink></li>
                            <li><CustomLink to="/about" as={Link}>About</CustomLink></li>
                            <li><CustomLink to="/contact" as={Link}>Contact</CustomLink></li>
                            <Button path="/appointment" btnType={Link} classes={'ms-3'} >Make an Appointment</Button>

                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>
                    <div className='d-flex align-items-center'>
                        {
                            checklogin ? <Button style={{ marginLeft: "8px" }} onClick={() => handleLogout()}><Logout fontSize="small" />Logout</Button> :
                                <Button path="/auth" btnType={Link} classes={'ms-xl-3'}>Login / Signup</Button>
                        }
                        <Button onClick={() => theme.toggleTheme(theme.theme)} classes='ms-4 bg-transparent p-0' aria-label="theme">
                            <ThemeIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                        </Button>
                        <Link to='/favourite'>
                            <Badge className='ms-3' badgeContent={favouriteState.favItmes.length} color="success">
                                <FavoriteIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                            </Badge>
                        </Link>
                        <Link to='/cart'>
                            <Badge className='ms-3' badgeContent={addedCartData} color="success">
                                <CartIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                            </Badge>
                        </Link>

                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;