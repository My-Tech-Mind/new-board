import styles from './index.module.css';
import Button from '../../components/Button/index';
import PasswordInput from '../../components/Input/PasswordInput';
import EmailInput from '../../components/Input/EmailInput';
import ilustrationLogin from '../../assets/ilustrationLogin.png';
import logoLight from '../../assets/logo-light.png';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    function handleLogin(data, event) {
        console.log(data);
        event.preventDefault();
        navigate('/boards');
    }
    return (
        <>
            <main>
                <div className={styles.container_image}>
                    <img src={ilustrationLogin} alt='Ilustration' />
                </div>

                <form onSubmit={handleSubmit(handleLogin)}  >
                    <div className={styles.main_container}>
                        <img className={styles.logo} src={logoLight} alt="Logo" />
                        <p className={styles.texto}>Login to newBoard</p>
                        
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
                            <Button buttonType='submit' title='Continue' style='default' />
                        </div>
                        <Link className={styles.container_account}  to="/signup">
                            Create an account
                        </Link>
                    </div>
                </form>
            </main >
        </>
    );
}
export default Login;