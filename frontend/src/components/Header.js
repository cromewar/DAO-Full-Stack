import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Logo from '../img/moralis-logo.png'




export const Header = ({ isConnected, account, signer, connectToMetamask }) => {



    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        <img src={Logo} alt="Moralis DAO" />
                    </Typography>
                    <nav>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="#"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Events
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="#"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Dao
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="#"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Blog
                        </Link>
                    </nav>

                    {!isConnected ? <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={connectToMetamask} >
                        Connect Wallet
                    </Button> : <Button variant='outlined' disabled>Connected</Button>}

                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            {/* <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Moralis DAO
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Shape the future of our decentralized community. Join our DAO and have a say in our collective decision-making process. Participate in discussions, propose new ideas, and cast your vote on important issues. Engage with like-minded individuals and help us build a better tomorrow, together.
                </Typography>
            </Container> */}
            {/* End hero unit */}


        </React.Fragment>
    )
}