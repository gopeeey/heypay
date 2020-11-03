import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button,
    TextField,
    CircularProgress,
    Fade
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import LockIcon from '@material-ui/icons/Lock';
import clsx from 'clsx';
import Link from 'next/link';
import { connect } from 'react-redux';
import { sendOtp, verifyOtp, authSignup } from '../actions';
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
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'center'
        },
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(4)
        },
        alignItems: 'center',
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
        fontWeight: 'bold',
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
    inputBoxHolder: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'center'
        },
    },
    inputBox: {
        width: '100%',
        padding: theme.spacing(3),
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.grey[300],
        borderRadius: '0.5em',
    },
    inputBoxRoot: {
        position: 'absolute',
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    dateBox: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    },
    textfield: {
        borderColor: 'white'

    },
    link: {
        textDecoration: 'none',
        color: theme.palette.link.main
    },
    linkButton: {
        textDecoration: 'none',
        color: 'inherit'
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
        phase: 1,
        phone: null,
        otp: null,
        password: null,
        verify_password: null,
        name: null,
        email: null,
        dob: new Date('2010-08-18T21:11:54'),
        error: null,
    }

    handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDateChange = (date) => {
        this.setState({
            dob: date
        })
    }

    handleNext = () => {
        if (this.state.phase < 3) {
            this.setState({
                phase: this.state.phase + 1
            })
        }
    }

    handlePrev = () => {
        const phase = this.state.phase
        if (phase > 1) {
            this.setState({
                phase: phase - 1
            })
        }
    }


    handleSubmit = () => {
        const phase = this.state.phase;
        const phone = this.state.phone;
        const setError = (error) => {
            this.setState({
                error
            })
        }
        const clearErrors = () => {
            this.setState({
                error: null
            })
        }
        if (phase === 1) {
            if (phone) {
                if (phone.length === 11) {
                    try {
                        const test_phone = parseInt(phone, 10);
                        clearErrors();
                        this.props.sendOtp(phone);
                    } catch (error) {

                    }
                } else {
                    setError("Please enter a valid phone number.")
                }
            } else {
                setError("Please enter your phone number.")
            }
        }

        if (phase === 2) {
            const otp = this.state.otp;
            if (otp) {
                if (otp.length >= 4) {
                    this.props.verifyOtp(otp, phone);
                    clearErrors();
                } else {
                    setError("Please enter a valid OTP.")
                }
            } else {
                setError("Please enter the OTP sent to you.")
            }
        }

        if (phase === 3) {
            const name = this.state.name;
            const email = this.state.email;
            const password = this.state.password;
            const password2 = this.state.verify_password;
            const dob = this.state.dob;
            const rdob = `${dob.getMonth()}/${dob.getDate()}/${dob.getFullYear()}`

            if (name) {
                clearErrors();
                if (email) {
                    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                    if (email.match(validEmail)) {
                        clearErrors();
                        if (password) {
                            if (password.length >= 4) {
                                if (password === password2) {
                                    clearErrors();
                                    this.props.signup(this.props.otp, name, rdob, password, phone, email);
                                } else {
                                    setError("Your passwords do not match.")
                                }
                            } else {
                                setError("Your password must be exactly 4 digits long.")
                            }
                        } else {
                            setError("Please choose a password.")
                        }
                    } else {
                        setError("Please enter a valid email.");
                    }
                }
            } else {
                setError("Please enter your name.");
            }
        }
    }

    componentDidMount() {
        if (this.props.token) {
            this.props.router.push(this.props.prevUrl)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const phase = this.state.phase;
            const otp = this.props.otp;
            const token = this.props.token;
            const otpLoading = this.props.otpLoading;
            const otpVerified = this.props.otpVerified;
            const otpError = this.props.otpError;
            const loading = this.props.loading;
            const error = this.props.error
            if (phase === 1) {
                if (!otpLoading && otp) {
                    this.handleNext();
                }
            }

            if (phase === 2) {
                if (!otpLoading && otpVerified) {
                    this.handleNext();
                }
            }

            if (phase === 3) {
                if (!loading && token) {
                    this.props.router.push("/merchant");
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
                                    Already have an account?
                                </Typography>
                                <Link href="/login" as="/login">
                                    <a className={classes.linkButton}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className={clsx(classes.button, classes.spaceTop2)}>
                                            Login
                                        </Button>
                                    </a>
                                </Link>

                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className={classes.contentRoot}>
                            <div className={classes.inputBoxHolder}>
                                <Fade in={this.state.phase === 1}>
                                    <div className={classes.inputBoxRoot}>
                                        <Typography variant="h4" color="primary" className={classes.header}>Signup</Typography>
                                        <form className={clsx(classes.spaceTop2, classes.inputBox)} onSubmit={this.handleSubmit}>
                                            <div className={classes.icon}>
                                                <LockIcon fontSize="large" />
                                            </div>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                className={clsx(classes.spaceTop1, classes.subheader)}>
                                                Enter your phone number to start signup.
                            </Typography>
                                            {this.state.error ? (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                    className={clsx(classes.spaceTop1, classes.subheader)}>
                                                    {this.state.error}
                                                </Typography>
                                            ) : (null)}
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
                                            <Button
                                                className={clsx(classes.spaceTop2, classes.button)}
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                disabled={this.props.otpLoading}
                                                onClick={this.handleSubmit}>
                                                {this.props.otpLoading ? (
                                                    <CircularProgress size={20} color="secondary" />
                                                ) : ("Next")}
                                            </Button>
                                            <input type="submit" style={{ display: "none" }} />
                                        </form>


                                        <div className={clsx(classes.notPhoneHide, classes.spaceTop3)}>
                                            <Typography variant="body1">
                                                Already have an account? <Link href="/login" as="/login" passHref>
                                                    <a className={classes.link}>Login</a>
                                                </Link>
                                            </Typography>
                                        </div>
                                    </div>
                                </Fade>


                                <Fade in={this.state.phase === 2}>
                                    <div className={classes.inputBoxRoot}>
                                        <Typography variant="h4" color="primary" className={classes.header}>Signup</Typography>
                                        <form className={clsx(classes.spaceTop2, classes.inputBox)} onSubmit={this.handleSubmit}>
                                            <div className={classes.icon}>
                                                <LockIcon fontSize="large" />
                                            </div>

                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                className={clsx(classes.spaceTop1, classes.subheader)}>
                                                We have sent you a One Time Password, enter it below to verify your phone number.
                            </Typography>
                                            {this.state.error ? (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                    className={clsx(classes.spaceTop1, classes.subheader)}>
                                                    {this.state.error}
                                                </Typography>
                                            ) : (null)}
                                            <CustomTextField
                                                label="One Time Password"
                                                name="otp"
                                                variant="outlined"
                                                fullWidth
                                                onChange={this.handleChange}
                                                className={clsx(classes.spaceTop3)}
                                            />
                                            <Button
                                                className={clsx(classes.spaceTop2, classes.button)}
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                disabled={this.props.otpLoading}
                                                onClick={this.handleSubmit}>
                                                {this.props.otpLoading ? (
                                                    <CircularProgress size={20} color="secondary" />
                                                ) : ("Verify")}
                                            </Button>
                                            <input type="submit" style={{ display: "none" }} />
                                        </form>
                                    </div>
                                </Fade>


                                <Fade in={this.state.phase === 3}>
                                    <div className={classes.inputBoxRoot}>
                                        <Typography variant="h4" color="primary" className={classes.header}>Signup</Typography>
                                        <form className={clsx(classes.spaceTop2, classes.inputBox)} onSubmit={this.handleSubmit}>
                                            <div className={classes.icon}>
                                                <LockIcon fontSize="large" />
                                            </div>

                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                className={clsx(classes.spaceTop1, classes.subheader)}>
                                                Please fill in your details.
                                            </Typography>
                                            {this.state.error ? (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                    className={clsx(classes.spaceTop1, classes.subheader)}>
                                                    {this.state.error}
                                                </Typography>
                                            ) : (null)}
                                            <CustomTextField
                                                label="Name"
                                                name="name"
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
                                                type="password"
                                                variant="outlined"
                                                fullWidth
                                                onChange={this.handleChange}
                                                className={clsx(classes.spaceTop3)}
                                                error={this.state.phoneError ? (true) : (false)}
                                                helperText={this.state.phoneError}
                                            />
                                            <CustomTextField
                                                label="Verify Password"
                                                name="verify_password"
                                                type="password"
                                                inputMode="numeric"
                                                variant="outlined"
                                                fullWidth
                                                onChange={this.handleChange}
                                                className={clsx(classes.spaceTop3)}
                                                error={this.state.phoneError ? (true) : (false)}
                                                helperText={this.state.phoneError}
                                            />
                                            <CustomTextField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                variant="outlined"
                                                fullWidth
                                                onChange={this.handleChange}
                                                className={clsx(classes.spaceTop3)}
                                                error={this.state.phoneError ? (true) : (false)}
                                                helperText={this.state.phoneError}
                                            />
                                            <div className={clsx(classes.dateBox, classes.spaceTop1)}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Date Of Birth"
                                                        format="MM/dd/yyyy"
                                                        value={this.state.dob}
                                                        onChange={this.handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </div>

                                            <Button
                                                className={clsx(classes.spaceTop2, classes.button)}
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                disabled={this.props.loading}
                                                onClick={this.handleSubmit}>
                                                {this.props.loading ? (
                                                    <CircularProgress size={20} color="secondary" />
                                                ) : ("Submit")}
                                            </Button>
                                            <input type="submit" style={{ display: "none" }} />
                                        </form>
                                    </div>
                                </Fade>
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
    error: state.error,
    prevUrl: state.prevUrl,
    otp: state.otp,
    otpLoading: state.otpLoading,
    otpVerified: state.otpVerified,
    otpError: state.otpError

})

const mapDispatchToProps = dispatch => ({
    sendOtp: (phone, place) => { dispatch(sendOtp(phone, place)) },
    verifyOtp: (otp, phone) => { dispatch(verifyOtp(otp, phone)) },
    signup: (otp, name, dob, password, phone, email) => {
        dispatch(authSignup(otp, name, dob, password, phone, email))
    }
})

export default withStyles(useStyles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage)));