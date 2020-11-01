import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button
} from '@material-ui/core';
import clsx from 'clsx';
import AssessmentIcon from '@material-ui/icons/Assessment';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import WcIcon from '@material-ui/icons/Wc';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from 'next/link';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        borderRightStyle: 'none',

    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.grey[100],
        borderRightStyle: 'none'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'center',
    },
    subheader: {
        width: '100%',
        padding: theme.spacing(2, 3),
    },
    subs: {
        fontFamily: theme.typography.bold.fontFamily
    },
    spaceTop1: {
        marginTop: theme.spacing(1)
    },
    spaceTop2: {
        marginTop: theme.spacing(2)
    },
    spaceTop3: {
        marginTop: theme.spacing(3)
    },
    spaceBottom1: {
        marginBottom: theme.spacing(1)
    },
    spaceBottom2: {
        marginBottom: theme.spacing(2)
    },
    spaceBottom3: {
        marginBottom: theme.spacing(3)
    },
    listItem: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    active: {
        backgroundColor: theme.palette.grey[400],
        '&:hover': {
            backgroundColor: theme.palette.grey[400],
        }
    },
    listItemText: {
        fontFamily: theme.typography.semiBold.fontFamily,
        textTransform: 'capitalize'
    },
    back: {
        marginRight: theme.spacing(1),
        position: 'absolute',
        left: '0%',
        top: '0%'
    },
    backIcon: {
        marginRight: 3
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

const listicons = [
    <AssessmentIcon fontSize="small" />,
    <StorefrontIcon fontSize="small" />,
    <MonetizationOnIcon fontSize="small" />,
    <MenuBookIcon fontSize="small" />,
    <QueryBuilderIcon fontSize="small" />,
    <AccountBalanceIcon fontSize="small" />,
    <CreditCardIcon fontSize="small" />,
    <WcIcon fontSize="small" />,
    <LocalShippingIcon fontSize="small" />,
    <HelpOutlineIcon fontSize="small" />,
    <SettingsIcon fontSize="small" />
]

export default function StoreDrawer(props) {
    const classes = useStyles();
    const store = props.store ? (props.store) : (null)
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <Typography variant="h6">Logo</Typography>
            </div>

            <div className={classes.subheader}>
                <Link href="/merchant" as="">
                    <a className={classes.link}>
                        <Button
                            style={{
                                textTransform: 'capitalize'
                            }}
                            className={classes.spaceBottom2}
                            color="primary">
                            <ChevronLeftIcon className={classes.backIcon} />Business Overview</Button>
                    </a>
                </Link>

                <Typography variant="button" color="textSecondary" >store</Typography>
                <Typography
                    variant="h6"
                    className={clsx(classes.spaceTop1, classes.subs)}
                    noWrap
                >{store ? (store.name) : ("Test Store")}</Typography>
            </div>

            <List>
                {["dashboard",
                    "deliveries",
                    "grow your sales",
                    "menus",
                    "business hours",
                    "bank account",
                    "payments",
                    "manage employees",
                    "request a delivery",
                    "support",
                    "settings"].map((text, index) => (
                        <ListItem
                            button
                            className={
                                clsx(classes.listItem, (text === props.displaying) && classes.active)
                            } key={text} onClick={() => { props.changeScreen(text) }}>
                            <ListItemIcon style={{ paddingLeft: 6 }}>
                                {listicons[index]}
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography variant="body2" className={classes.listItemText}>{text}</Typography>
                            } />
                        </ListItem>
                    ))}
                <ListItem
                    button
                    className={
                        classes.listItem
                    }>
                    <ListItemIcon style={{ paddingLeft: 6 }}>
                        <LockOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Typography variant="body2" className={classes.listItemText}>Logout</Typography>
                    } />
                </ListItem>
            </List>

        </Drawer>
    )
}