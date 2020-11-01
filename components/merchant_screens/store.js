import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Divider,
    Fade
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { connect } from 'react-redux';
import clsx from 'clsx';
import Link from 'next/link';


const dummyStores = [
    {
        name: "Firey Lion 12",
        address: "Down in the center of the earth",
        active: true,
        id: 1
    },
    {
        name: "Firey Lion 24",
        address: "Up in the center of the sky",
        active: false,
        id: 2
    },
    {
        name: "Firey Lion 36",
        address: "Right on the surface of the earth",
        active: true,
        id: 3
    },
    {
        name: "Firey Lion 48",
        address: "Outside the earth, in space",
        active: false,
        id: 4
    },
]

const useStyles = theme => ({
    root: {
        width: '100%'
    },
    filterHolder: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    },
    filterScreen: {
        width: '100%',
        height: '86vh',
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: '5'
    },
    filters: {
        width: '60%',
        [theme.breakpoints.down('xs')]: {
            width: '92%'
        },
        position: 'absolute',
        zIndex: '6'
    },
    searchResults: {
        width: '100%',
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        top: '117%',
        zIndex: '10',
        borderRadius: '4px',
        boxShadow: '0px 5px 10px rgba(50, 50, 50, 0.2)',
        overflow: 'auto'
    },
    listItemText: {
        fontFamily: theme.typography.bold.fontFamily
    },
    subText: {
        fontFamily: theme.typography.semiBold.fontFamily
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
    list: {
        padding: theme.spacing(3, 2, 1),
        marginTop: theme.spacing(7),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1, 0)
        }
    },
    inactive: {
        fontSize: '80%',
        color: theme.palette.primary.main
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
});

class StoresScreen extends React.PureComponent {
    state = {
        searchresults: [],
        searchAnchor: null,
        resultsOpen: false
    }

    handleSearch = () => {
        console.log(this.state.searchresults)
    };

    handleChange = (event) => {
        const results = [];
        if (event.target.value.length) {
            for (let i = 0; i < this.props.stores.length; i++) {
                if (this.props.stores[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
                    results.push(this.props.stores[i])
                }
            }
        }
        this.setState({
            searchresults: results,
            searchAnchor: event.currentTarget,
            resultsOpen: true
        })
    }

    handleResultsClose = () => {
        this.setState({
            searchresults: [],
        })
    }

    handleClick = () => {
        console.log('yay, i got clicked')
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.filterHolder}>
                    {this.state.searchresults.length ? (
                        <div className={classes.filterScreen} onClick={this.handleResultsClose} />
                    ) : (null)}

                    <div className={classes.filters}>
                        <TextField
                            variant="outlined"
                            name="search"
                            onChange={this.handleChange}
                            fullWidth
                            placeholder="Search for store"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                        {this.state.searchresults.length ? (
                            <Fade in={this.state.searchresults.length}>
                                <List id="search-results-box" className={classes.searchResults}>
                                    {this.state.searchresults.map((store) => (
                                        <Link href="merchant/store" as={`merchant/${store._id}`} >
                                            <a className={classes.link}>
                                                <ListItem button key={store.name} id={`search-result-${store.id}`} onClick={this.handleClick}>

                                                    <ListItemText primary={
                                                        <Typography variant="body1" className={classes.subText}>{store.name}</Typography>
                                                    } />

                                                </ListItem>
                                            </a>
                                        </Link>
                                    ))}
                                </List>
                            </Fade>
                        ) : (null)}

                    </div>
                </div>

                <List className={classes.list}>
                    {this.props.stores.map((store) => (
                        <Link key={store.name} href="merchant/store" as={`merchant/${store._id}`} >
                            <a className={classes.link}>
                                <div>
                                    <ListItem
                                        button
                                    >
                                        <ListItemText primary={
                                            <div>
                                                {store.active ? (null) : (
                                                    <Typography
                                                        variant="button"
                                                        className={classes.inactive}>inactive</Typography>
                                                )}
                                                <Typography variant="body1" className={classes.listItemText}>{store.name}</Typography>
                                            </div>
                                        } secondary={
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                noWrap
                                                className={classes.subText}>{store.address}</Typography>
                                        } />
                                        <ChevronRightIcon />
                                    </ListItem>
                                    <Divider />
                                </div>
                            </a>
                        </Link>


                    ))}
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stores: state.stores
})

export default withStyles(useStyles)(connect(mapStateToProps, null)(StoresScreen));