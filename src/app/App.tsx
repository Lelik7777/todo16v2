import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from '../features/login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {getAuthMe, setLoguot} from '../features/login/loginReducer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type PropsType = {
    demo?: boolean;
}

const App = ({demo = false}: PropsType) => {
    const dispatch = useDispatch();
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth);
    const initialized = useSelector<AppRootStateType, boolean>((state) => state.app.initialized);
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    useEffect(() => {
        dispatch(getAuthMe())
    }, []);
    const handleLogout = () => {
        dispatch(setLoguot());
    }
    if (!initialized) return (
        <Box sx={{display: 'flex'}}>
            <CircularProgress/>
        </Box>
    );
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isAuth && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    <Route path={'/test'} element={<p>Test page</p>}/>
                    <Route path={'/404'} element={<h1>Error 404</h1>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
