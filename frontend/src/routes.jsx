import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Account from './pages/Account'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Boards from './pages/Boards'
import Board from './pages/Board'
import Teste from './pages/Teste'


const PagesNavigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/boards' element={<Boards />} />
                <Route path='/board' element={<Board />} />
                <Route path='/account' element={<Account />} />
                <Route path='/teste' element={<Teste />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PagesNavigation;