import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import styles from './index.module.css'
import imageHome from '../../assets/home.png'

const Home = () => {
    return ( 
        <main>
            <Navbar />
            <div>
                <img src={imageHome} alt="Home" />
            </div>
            <h1>Organize seus projetos no New Board</h1>
            <p>Colabore, gerencie projetos e alcance novos picos de produtividade. Dos arranha-céus ao home office, a forma como sua equipe trabalha é única – faça tudo isso com de um jeito novo com New Board.</p>
            <Button title='Sign in' />
            <Button title='Login'/>
        </main>
     );
}
 
export default Home;