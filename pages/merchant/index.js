import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        width: '100%'
    }
})

class MerchantDashboard extends React.PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>This page works</div>
        )
    }
}

export default withStyles(useStyles)(MerchantDashboard);