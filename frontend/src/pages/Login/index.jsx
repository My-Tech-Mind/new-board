import styles from './index.module.css';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import ilustracaoLogin from '../../assets/ilustracaoLogin.png';
import logoLight from '../../assets/logo-light.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePasswordToggle from '../../components/Hook/usePasswordToogle';


const Login = () => {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    return (
        <>
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
                    <div className={styles.input_email}>
                        <Input type='email' placeholder='Insira seu e-mail' style='input_default' />
                        <FontAwesomeIcon icon={['fa', 'envelope']} className={styles.icone} />
                    </div>
                    <div className={styles.input_senha}>
                        <Input type={PasswordInputType} placeholder="Digite a senha" style='input_default' />
                        <span className={styles.icone}>{ToggleIcon}</span>
                    </div>
                    <div className={styles.container_buttons}>
                        <Button title='Continue' style='default' />
                    </div>
                    <div className={styles.container_account}>
                        <a href="#">Criar uma conta</a>
                    </div>
                </div>
            </main>
        </>
    );
}
export default Login;