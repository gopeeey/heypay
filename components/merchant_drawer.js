import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import clsx from 'clsx';
import AssessmentIcon from '@material-ui/icons/Assessment';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        borderRightStyle: 'none'
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
        fontFamily: theme.typography.semiBold.fontFamily
    }
}));

const listicons = [
    <AssessmentIcon fontSize="small" />,
    <StorefrontIcon fontSize="small" />,
]

export default function MerchantDrawer(props) {
    const classes = useStyles();

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
                <Typography variant="button" color="textSecondary" >BUSINESS</Typography>
                <Typography variant="h6" className={clsx(classes.spaceTop1, classes.subs)}>Firey Lion</Typography>
            </div>

            <List>
                {["Dashboard", "Stores"].map((text, index) => (
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