import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Account from './pages/Account'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Boards from './pages/Boards'
import Board from './pages/Board'
<<<<<<< HEAD
import Teste from './pages/Teste'
=======
import { isAuthenticated } from './services/api/auth'
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c

const PrivateRoute = ({ children, authVerify, redirectTo = '/login' }) => {
    const location = useLocation();
    if (!authVerify) {
        return <Navigate to={redirectTo} replace state={{ from: location }} />;
    } 
    return children;
};

const PagesNavigation = () => {
    return (
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                <Route exact path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/boards' element={<Boards />} />
                <Route path='/board' element={<Board />} />
                <Route path='/account' element={<Account />} />
                <Route path='/teste' element={<Teste />} />
=======
                <Route exact path='/' element={ <PrivateRoute authVerify={!isAuthenticated()} redirectTo="/boards"> <Home /> </PrivateRoute>} />
                <Route path='/login' element={ <PrivateRoute authVerify={!isAuthenticated()} redirectTo="/boards"> <Login /> </PrivateRoute> } />
                <Route path='/signup' element={ <PrivateRoute authVerify={!isAuthenticated()} redirectTo="/boards"> <SignUp /> </PrivateRoute> } />
                <Route path='/boards' element={<PrivateRoute authVerify={isAuthenticated()}> <Boards /> </PrivateRoute> }/>
                <Route path='/board/:boardId' element={<PrivateRoute authVerify={isAuthenticated()}> <Board /> </PrivateRoute>} />
                <Route path='/account' element={<PrivateRoute authVerify={isAuthenticated()}> <Account /> </PrivateRoute>} />
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
            </Routes>
        </BrowserRouter>
    );
}

export default PagesNavigation;