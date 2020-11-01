import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class Index extends React.PureComponent {
  render() {
    const { classes } = this.props;
    const user = this.props.user ? (
      this.props.user
    ) : (null)
    return (
      <div className={classes.root}>
        {user ? (
          `You're logged in as ${user.name}`
        ) : (`You're not logged in yet`)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default withStyles(useStyles)(connect(mapStateToProps, null)(Index));