import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Account from './pages/Account'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Boards from './pages/Boards'
import Board from './pages/Board'
<<<<<<< HEAD
import { isAuthenticated } from './services/api/auth'

const PrivateRoute = ({ children, authVerify, redirectTo = '/login' }) => {
    const location = useLocation();
    if (!authVerify) {
        return <Navigate to={redirectTo} replace state={{ from: location }} />;
    } 
    return children;
};
=======
>>>>>>> fa4cdfb (deleted the teste component)

const PagesNavigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={ <PrivateRoute authVerify={!isAuthenticated()} redirectTo="/boards"> <Home /> </PrivateRoute>} />
                <Route path='/login' element={ <PrivateRoute authVerify={!isAuthenticated()} redirectTo="/boards"> <Login /> </PrivateRoute> } />
                <Route path='/signup' element={ <PrivateRoute authVerify={!isAuthenticated()} redirectTo="/boards"> <SignUp /> </PrivateRoute> } />
                <Route path='/boards' element={<PrivateRoute authVerify={isAuthenticated()}> <Boards /> </PrivateRoute> }/>
                <Route path='/board' element={<PrivateRoute authVerify={isAuthenticated()}> <Board /> </PrivateRoute>} />
                <Route path='/account' element={<PrivateRoute authVerify={isAuthenticated()}> <Account /> </PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default PagesNavigation;