import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { authCheckState } from '../actions'


const useStyles = theme => ({
    root: {
        width: '100%'
    }
})

const login_protected = [
    /\/merchant*/,
]


class Container extends React.PureComponent {

    handleRouteChange = (url) => {
        if (login_protected.some((route) => {
            if (url.match(route)) {
                return true;
            }
            return false;
        }) && !this.props.user) {
            this.props.router.push('/login');
        }
    }

    componentDidMount() {
        this.props.authCheckState();
        if (login_protected.some((route) => {
            if (this.props.router.asPath.match(route)) {
                return true;
            }
            return false;
        }) && !this.props.user) {
            this.props.router.push('/login')
        }
        this.props.router.events.on('routeChangeStart', this.handleRouteChange);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.handleRouteChange(this.props.router.asPath);
        }
    }

    componentWillUnmount() {
        this.props.router.events.off('routeChangeStart', this.handleRouteChange);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading
})

const mapDispatchToProps = dispatch => ({
    authCheckState: () => {
        dispatch(authCheckState());
    }
})

export default withStyles(useStyles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Container)));