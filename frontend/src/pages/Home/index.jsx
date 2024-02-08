import Button from '../../components/Button/index'
import ButtonMobile from '../../components/Button/LoginMobile';
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
                        <h1>Organize your projects with New Board</h1>
                        <p>
                            Collaborate, manage projects and reach new peaks in productivity. From skyscrapers to home offices, the way your team works is unique - do it all in a new way with New Board.
                        </p>
                        <div className={styles.container_buttons}>
                            <Button title='Sign up' style='default' />
                            <ButtonMobile title='Login' style='login' />
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
};
 
export default Home;