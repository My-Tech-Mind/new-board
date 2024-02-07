import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import styles from './index.module.css'
import imageHome from '../../assets/home.png'


const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                <div className={styles.main_container}>
                    <div className={styles.container_image}>
                        <img src={imageHome} alt='Home' />
                    </div>
                    <article className={styles.container_content}>
                        <h1>Organize seus projetos no New Board</h1>
                        <p>
                            Colabore, gerencie projetos e alcance novos picos de produtividade. Dos arranha-céus ao home office, a forma como sua equipe trabalha é única - faça tudo isso com de um jeito novo com New Board.
                        </p>
                        <div className={styles.container_buttons}>
                            <Button title='Sign in' style='default' />
                            <Button title='Login' style='login' />
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
};
 
export default Home;