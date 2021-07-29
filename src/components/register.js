import React from 'react'
import {  Container, makeStyles,  Typography, TextField, Button } from '@material-ui/core'
import shadows from '@material-ui/core/styles/shadows';
import { Link } from "react-router-dom"

const useStyle = makeStyles((theme) => (
    {
        root: {
            marginTop: "170px"
        },
        logo: {
            backgroundImage: `url("https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg")`,
            backgroundSize: 'cover',
            margin: 'auto',
            height: '8vh',
            width: '370px',
            marginTop: '30px',
        },
        box: {
            justifyContent: "center",
            alignItems: "center",
            width: "500px",
            height: "55vh",
            marginTop: "2%",
            margin: "auto",
            boxShadow: shadows[15],
        },
        form: {
            width: '80%',
            marginTop: theme.spacing(1),
            paddingLeft: "50px"
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor: theme.palette.success.light,
            color: 'black',
        },
        textfield: {
            backgroundColor: 'whitesmoke',
        }
    }
))

const Register = () => {
    const classes = useStyle();

    return (
        <Container className={classes.root}>
            <div>
                <Typography className={classes.logo} />
            </div>
            <div className={classes.box}>
                <div style={{ paddingTop: "20px" }}  >
                    <Typography variant="h6" align="center" gutterBottom >
                        Sign up for your account
                    </Typography>
                </div>
                <form className={classes.form} noValidate>

                    <TextField className={classes.textfield}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="name"
                        autoComplete="username"
                        autoFocus
                    />

                    <TextField className={classes.textfield}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />

                    <TextField className={classes.textfield}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <TextField className={classes.textfield}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Confirm password"
                        label="Confirm Password"
                        type="password"
                        id="Confirm_password"
                        autoComplete="current-confirm-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        gutterBottom
                    >
                        Sign Up
                    </Button>
                </form>
                <div style={{ paddingTop: "20px" }} >
                    <Typography align="center" color="secondary">
                        <Link to="/">
                            Sign In for an account.
                        </Link>
                    </Typography>
                </div>
            </div>
        </Container>
    )
}

export default Register
