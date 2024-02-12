import styles from './index.module.css';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import ilustracaoLogin from '../../assets/ilustracaoLogin.png';
import logoLight from '../../assets/logo-light.png';
import { FaRegEye } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";


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
                <div className={styles.input_email}>
                    <Input placeholder='Insira seu e-mail' style='input_default' />
                    <MdOutlineMail className={styles.icone} />
                </div>
                <div className={styles.input_senha}>
                    <Input type='password' placeholder="Digite a senha" style='input_default' />
                    <FaRegEye className={styles.icone} />
                    <FaRegEyeSlash display='none' />
                </div>
                <div className={styles.container_buttons}>
                    <Button title='Continue' style='default' />
                </div>
                <div className={styles.container_account}>
                    <a href="#">Criar uma conta</a>
                </div>
            </div>
        </main>

    );
}
export default Login;