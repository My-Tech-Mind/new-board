import styles from './index.module.css';
import Button from '../../components/Button/index';
import PasswordInput from '../../components/Input/PasswordInput';
import EmailInput from '../../components/Input/EmailInput';
import ilustrationLogin from '../../assets/ilustrationLogin.png';
import logoLight from '../../assets/logo-light.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    function handleLogin(data, event) {
        console.log(data);
        event.preventDefault();
        navigate('/signup');
    }
    return (
        <>
            <main>
                <img className={styles.container_image} src={ilustrationLogin} alt='Ilustration' />
                <form onSubmit={handleSubmit(handleLogin)} >
                    <div className={styles.main_container}>
                        <img className={styles.logo} src={logoLight} alt="Logo" />
                        <p className={styles.texto}>Login to the newBoard</p>
                        <EmailInput
                            name="email"
                            placeholder="Enter your e-mail"
                            register={register}
                            errors={errors}
                        />
                        <PasswordInput
                            name="password"
                            placeholder="Enter your password"
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                        <div className={styles.container_buttons}>
                            <Button type='submit' title='Continue' style='default' />
                        </div>
                        <a className={styles.container_account} href="/signup">Create an account</a>
                    </div>
                </form>
            </main >
        </>
    );
}
export default Login;