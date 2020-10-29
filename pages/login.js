import React from 'react';
import { withStyles, makeStyles, withTheme } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    CircularProgress,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LockIcon from '@material-ui/icons/Lock';
import clsx from 'clsx';
import Link from 'next/link';
import { connect } from 'react-redux';
import { authLogin } from '../actions';
import { withRouter } from 'next/router';

const useStylesTextField = theme => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.grey[300],
            },
        },
    },
})
const CustomTextField = withStyles(useStylesTextField)(TextField);

const useStyles = theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    contentRoot: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    phoneHide: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    sideImage: {
        width: '100%',
        height: '100%',
        backgroundImage: "url('images/login_xlarge.jpg')",
        [theme.breakpoints.down('lg')]: {
            backgroundImage: "url('images/login_large.jpg')",
        },
        [theme.breakpoints.down('md')]: {
            backgroundImage: "url('images/login_nslarge.jpg')",
        },
        [theme.breakpoints.down('sm')]: {
            backgroundImage: "url('images/login_normal.jpg')",
        },
        [theme.breakpoints.down('xs')]: {
            backgroundImage: "url('images/login_xsmall.jpg')",
        },
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    screen: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.transPrimary.main,
        position: 'relative',
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    logoHolder: {
        width: '30%',
        position: 'absolute',
        top: '3%',
        left: '4%',
        [theme.breakpoints.down('md')]: {
            top: '2%',
            left: '6%'
        }
    },
    logo: {
        maxWidth: '100%'
    },
    header: {
        fontWeight: 'bold'
    },
    subheader: {
        textAlign: 'center'
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
    button: {
        padding: theme.spacing(1, 8)
    },
    inputBox: {
        width: '40%',
        padding: theme.spacing(3),
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.grey[300],
        borderRadius: '0.5em',
        [theme.breakpoints.down('md')]: {
            width: '65%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '70%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        },
    },
    textfield: {
        borderColor: 'white'

    },
    link: {
        textDecoration: 'none',
        color: theme.palette.link.main
    },
    notPhoneHide: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    },
    icon: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(1, 0)
    }
});

class LoginPage extends React.PureComponent {
    state = {
        passwordVisibility: false,
        phone: null,
        password: null,
        phoneError: null,
        passwordError: null,
        stay: false
    }

    changeVisibility = () => {
        this.setState({
            passwordVisibility: !this.state.passwordVisibility
        })
    }

    handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target.name === "stay" ? (event.target.checked) : (event.target.value)
        })
    }

    handleSubmit = () => {
        if (this.state.phone) {
            this.setState({
                phoneError: null
            })
            if (this.state.password) {
                this.setState({
                    passwordError: null
                })
                this.props.login(this.state.phone, this.state.password, this.state.stay)
            } else {
                this.setState({
                    passwordError: 'Please enter your password'
                })
            }
        } else {
            this.setState({
                phoneError: 'Please enter your phone number'
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (!this.props.loading) {
                if (this.state.verify) {

                } else {

                }
                if (this.props.token) {
                    const { router } = this.props;
                    router.push('')
                } else if (this.props.error) {
                    if ((!this.props.error.error) && (!this.props.error.authentication.registered)) {

                    }
                }
            }

        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={1} sm={4} className={classes.phoneHide}>
                        <div className={classes.sideImage}>
                            <div className={classes.screen}>
                                <div className={classes.logoHolder}>
                                    <img src='logo.png' alt="hey pay logo" className={classes.logo} />
                                </div>
                                <Typography variant="h2" color="secondary">
                                    Hey there!
                                </Typography>
                                <Typography variant="body1" color="secondary" className={classes.spaceTop2}>
                                    Don't have an account?
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    className={clsx(classes.button, classes.spaceTop2)}>
                                    Signup
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className={classes.contentRoot}>
                            <Typography variant="h4" color="primary" className={classes.header}>Merchant Login</Typography>

                            <form className={clsx(classes.spaceTop2, classes.inputBox)} onSubmit={this.handleSubmit}>
                                <div className={classes.icon}>
                                    <LockIcon fontSize="large" />
                                </div>

                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    className={clsx(classes.spaceTop1, classes.subheader)}>
                                    Enter the phone number and password for your merchant account.
                            </Typography>
                                <CustomTextField
                                    label="Phone"
                                    name="phone"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.handleChange}
                                    className={clsx(classes.spaceTop3)}
                                    error={this.state.phoneError ? (true) : (false)}
                                    helperText={this.state.phoneError}
                                />
                                <CustomTextField
                                    label="Password"
                                    name="password"
                                    variant="outlined"
                                    fullWidth
                                    type={this.state.passwordVisibility ? "" : "password"}
                                    className={clsx(classes.spaceTop2, classes.textfield)}
                                    onChange={this.handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {this.state.passwordVisibility ? (
                                                    <IconButton onClick={this.changeVisibility}>
                                                        <VisibilityIcon color="disabled" />
                                                    </IconButton>
                                                ) : (
                                                        <IconButton onClick={this.changeVisibility}>
                                                            <VisibilityOffIcon color="disabled" />
                                                        </IconButton>
                                                    )}
                                            </InputAdornment>
                                        )
                                    }}
                                    error={this.state.passwordError ? (true) : (false)}
                                    helperText={this.state.passwordError}
                                />
                                <FormGroup className={classes.spaceTop2} row>
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.stay} color="primary" onChange={this.handleChange} name="stay" />}
                                        label="Stay signed in?"
                                    />
                                </FormGroup>
                                <Button
                                    className={clsx(classes.spaceTop2, classes.button)}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={this.props.loading}
                                    onClick={this.handleSubmit}>
                                    {this.props.loading ? (
                                        <CircularProgress size={20} color="secondary" />
                                    ) : ("Login")}
                                </Button>
                                <Button className={clsx(classes.spaceTop2, classes.button)} color="primary" fullWidth>
                                    Forgot Password
                                </Button>
                                <input type="submit" style={{ display: "none" }} />
                            </form>
                            <div className={clsx(classes.notPhoneHide, classes.spaceTop3)}>
                                <Typography variant="body1">
                                    Don't have an account? <Link href="" passHref><a className={classes.link}>Signup</a></Link>
                                </Typography>
                            </div>
                        </div>

                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.loading,
    token: state.token,
    error: state.error

})

const mapDispatchToProps = dispatch => ({
    login: (phone, password, stay) => { dispatch(authLogin(phone, password, stay)) }
})

export default withStyles(useStyles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage)));