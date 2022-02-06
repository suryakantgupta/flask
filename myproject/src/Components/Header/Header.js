import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar} from '@mui/material';
import './Header.scss';

const Header = (props) => {

    const history = useNavigate()

    const [name, setName] = useState('Guest');
    const [isLogedin, setIsLogedin] = useState(false);

    const [logoutMessage, setLogoutMessage] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogedin(true)
            setName(localStorage.getItem('firstName'))
        } else {
            setIsLogedin(false)
            setName("Guest")
        }
    }, [props.token, props.firstName,isLogedin]);

    return (
        <div
            className="header"
        >
            {/* 
               Component code used from Material UI
              https://mui.com/components/app-bar/#main-content
                             */}
            <AppBar
                id="top_navig_bar"
                style={{
                    backgroundColor:'#796878'
                }}
                position="static"
            >
                {/* 
               Component code used from Material UI
              https://mui.com/components/typography/#main-content
                             */}
                <Container maxWidth="xl">
                    {/* 
               Component code used from Material UI
              https://mui.com/components/container/#main-content
                             */}
                    <Toolbar
                        style={{
                            justifyContent: 'space-between'
                        }}
                        disableGutters
                    >
                         {/* 
               Component code used from Material UI
              https://mui.com/components/typography/#main-content
                             */}
                        <Typography
                            style={{
                                cursor: 'pointer'
                            }}
                            id="home"
                            variant="h6"
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            onClick={() => history('/')}
                        >
                            Home
                        </Typography>
                        <Typography
                            style={{
                                cursor: 'pointer'
                            }}
                            id="pers_greet"
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            
                        >
                            Hello {name}
                        </Typography>
                        <div
                            className="login-register-container"
                        >
                            <Typography
                                style={{
                                    cursor: 'pointer'
                                }}
                                id="login"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                                onClick={isLogedin ? () => { localStorage.removeItem('token'); localStorage.removeItem('firstName'); setLogoutMessage(true); props.setFirstName("Guest");setIsLogedin(false) } : () => history('/login')}
                            >
                                {isLogedin ? "Logout" : "Login"}
                            </Typography>

                            {!isLogedin && (
                                <Typography
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    id="register"
                                    component="div"
                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                                    onClick={() => history('/register')}
                                >
                                    Register
                                </Typography>
                            )}
                        </div>
                        {/* 
               Component code used from Material UI
              https://mui.com/components/snackbars/#main-content
                             */}
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            open={logoutMessage}
                            autoHideDuration={3000}
                            onClose={() => {
                                setLogoutMessage(false)
                            }}
                        >
                             {/* 
               Component code used from Material UI
              https://mui.com/components/alert/#main-content
                             */}
                            <Alert severity="success" sx={{ width: '100%' }}>
                                You have been logged out.
                            </Alert>
                        </Snackbar>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
};

export default Header;
