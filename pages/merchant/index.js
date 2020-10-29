import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import MerchantDrawer from '../../components/merchant_drawer';

const drawerWidth = 240;

const useStyles = theme => ({
    root: {
        width: '100%',
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'center',
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        backgroundColor: theme.palette.background.paper,
        minHeight: '100vh'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    appbarHeader: {
        fontFamily: theme.typography.bold.fontFamily,
        textTransform: 'capitalize'
    }
})

class MerchantDashboard extends React.PureComponent {

    state = {
        drawer: true,
        displaying: 'Dashboard'
    }

    handleDrawerOpen = () => {
        this.setState({
            drawer: !this.state.drawer
        })
    }

    changeScreen = (screen) => {
        this.setState({
            displaying: screen
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    elevation={0}
                    color="secondary"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.drawer,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.appbarHeader}>
                            {this.state.displaying}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <MerchantDrawer
                    open={this.state.drawer}
                    changeScreen={(screen) => { this.changeScreen(screen) }}
                    displaying={this.state.displaying} />
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.drawer,
                    })}>
                    <div className={classes.drawerHeader} />
                    This is your content for {this.state.displaying}, manage it for now.
                </main>

            </div>
        )
    }
}

export default withStyles(useStyles)(MerchantDashboard);