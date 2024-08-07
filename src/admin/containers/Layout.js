import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VaccinesTwoToneIcon from "@mui/icons-material/VaccinesTwoTone";
import GroupTwoToneIcon from "@mui/icons-material/GroupTwoTone";
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DepartmentIcon from '@mui/icons-material/ViewQuilt';
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Button from '../../user/UI/button/Button';
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../user/redux/action/auth.action";

const drawerWidth = 175;

const openedMixin = (theme) => ({
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    width: drawerWidth,
    height: '100%',
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
        height: '100%'
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: "#FF6337",
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const Layout = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const adminLogout = () => {
        dispatch(logoutRequest())
        navigate('/');
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const openLogoutAlert = () => {
        setOpenLogoutModal(true);
    };

    const closeLogoutAlert = () => {
        setOpenLogoutModal(false);
    };

    const LinkData = [
        {
            label: "Dashboard",
            icon: <DashboardIcon />,
            to: "/admin/dashboard",
        },
        {
            label: "Medicine",
            icon: <VaccinesTwoToneIcon />,
            to: "/admin/medicine",
        },
        {
            label: "Doctor",
            icon: <GroupTwoToneIcon />,
            to: "/admin/doctors",
        },
        {
            label: "Department",
            icon: <DepartmentIcon />,
            to: "/admin/department",
        }
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" style={{ marginBottom: "100px" }} open={open}>
                <Toolbar>
                    {open ? (
                        <IconButton
                            color="inherit"
                            onClick={handleDrawerClose}
                            edge="start"
                            sx={{ marginRight: 'auto' }}>
                            <CloseIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 'auto',
                                ...(open && { display: "none" }),
                            }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap component="div">
                        <h2 className="logo-admin"><b>City</b><span> Multispeciality Hospital</span></h2>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <List style={{ paddingTop: '80px' }}>
                    {LinkData.map((value, index) => (
                        <ListItem
                            className="app_items"
                            key={index}
                            disablePadding
                            sx={{ display: "block" }}>
                            <ListItemButton
                                component={Link}
                                to={value.to}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : "auto",
                                        justifyContent: "center",
                                    }}>
                                    {value.icon}
                                </ListItemIcon>
                                <ListItemText primary={value.label} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <ListItemButton
                    onClick={openLogoutAlert}
                    sx={{
                        maxHeight: 48,
                        marginTop: 'auto',
                        marginBottom: '15px',
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 2 : "auto",
                            justifyContent: "center",
                        }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                <Dialog
                    open={openLogoutModal}
                    onClose={closeLogoutAlert}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle className="text-center p-5 pb-3" id="alert-dialog-title">
                        <Typography variant="h4" sx={{ fontWeight: '700' }}>Are you sure?</Typography></DialogTitle>
                    <DialogContent className="px-5">
                        <DialogContentText id="alert-dialog-description">Do you know that you are doing logout to your account.</DialogContentText>
                    </DialogContent>
                    <DialogActions className="justify-content-center p-5 pt-3">
                        <Button onClick={closeLogoutAlert}>Close</Button>
                        <Button onClick={adminLogout} classes={'ms-4'}>Logout</Button>
                    </DialogActions>
                </Dialog>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, px: 3, minHeight: '100vh' }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;