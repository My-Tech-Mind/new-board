import styles from './index.module.css';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import ilustracaoLogin from '../../assets/ilustracaoLogin.png';
import logoLight from '../../assets/logo-light.png';
import { FaRegEye } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
    const [state, setState] = useState("password");
    const [iconPasswordStateOne, setIconPassStateOne] = useState("none");
    const [iconPasswordStateTwo, setIconPassStateTwo] = useState("");

    const handleClick = () => {
        if (state === "password") {
            setState("text");
            setIconPassStateOne("");
            setIconPassStateTwo("none");
        } else if (state === "text") {
            setState("password");
            setIconPassStateOne("none");
            setIconPassStateTwo("");
        }

    }

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
                    <Input type='email' placeholder='Insira seu e-mail' style='input_default' />
                    <MdOutlineMail className={styles.icone} />
                </div>
                <div className={styles.input_senha}>
                    <Input type={state} placeholder="Digite a senha" style='input_default' />
                    <FaRegEye className={styles.icone} onClick={handleClick} display={iconPasswordStateOne} />
                    <FaRegEyeSlash className={styles.icone} onClick={handleClick} display={iconPasswordStateTwo} />
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