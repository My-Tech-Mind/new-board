import styles from './index.module.css';
import Button from '../../components/Button/index'
// import ButtonMobile from '../../components/Button/LoginMobile';
import ilustracaoLogin from '../../assets/ilustracaoLogin.png';
import logoLight from '../../assets/logo-light.png';

const Login = () => {
    return (
        <main>
            <div className={styles.container_image}>
                <img src={ilustracaoLogin} alt='Ilustracao' />
            </div>
            <div className={styles.main_container}>
                <div className={styles.logo}>
                    <img src={logoLight} alt="Logo" />
                </div>
                <div className={styles.texto}>
                    <p>Login to the newBoard</p>
                </div>
                <div className={styles.input_container}>
                    <input type='text' placeholder='Insira seu e-mail'></input>
                </div>
                <div className={styles.input_container}>
                    <input type='text' placeholder='Digitar senha'></input>
                </div>

                <div className={styles.container_buttons}>
                    <Button title='Continue' style='default' />
                </div>

            </div>
        </main>

    );
}
export default Login;