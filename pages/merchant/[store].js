import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    CircularProgress
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import StoreDrawer from '../../components/store_drawer';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

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
    },
    spinner: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class StoreDashboard extends React.PureComponent {

    state = {
        drawer: true,
        displaying: 'Dashboard',
        store: null
    }

    componentDidMount() {
        if (this.props.stores.length && this.props.router) {
            for (let i = 0; i < this.props.stores.length; i++) {
                if (this.props.stores[i]._id === this.props.router.query.store) {
                    this.setState({
                        store: this.props.stores[i]
                    })
                    break;
                }
            }
        }
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

    chooseScreen = () => {
        switch (this.state.displaying) {

            case "deliveries":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            case "grow your sales":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            case "menus":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            case "business hours":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            case "bank account":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            case "payments":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            case "manage employees":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            case "request a delivery":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            case "support":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            case "settings":
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )

            default:
                return (
                    <div>
                        This is your content for {this.state.displaying}, manage it for now.
                    </div>
                )
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                {
                    this.props.user && this.props.stores.length ? (
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
                            <StoreDrawer
                                open={this.state.drawer}
                                store={this.state.store}
                                changeScreen={(screen) => { this.changeScreen(screen) }}
                                displaying={this.state.displaying} />
                            <main
                                className={clsx(classes.content, {
                                    [classes.contentShift]: this.state.drawer,
                                })}>
                                <div className={classes.drawerHeader} />
                                {this.chooseScreen()}
                            </main>
                        </div>
                    ) : (<div className={classes.spinner}>
                        <CircularProgress color="primary" />
                    </div>)
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    stores: state.stores,
    user: state.user
})

export default withStyles(useStyles)(withRouter(connect(mapStateToProps, null)(StoreDashboard)));