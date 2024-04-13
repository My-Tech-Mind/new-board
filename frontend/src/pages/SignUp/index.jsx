import styles from './index.module.css';
import Button from '../../components/Button/index';
import PasswordInput from '../../components/Input/PasswordInput';
import NameInput from '../../components/Input/NameInput';
import EmailInput from '../../components/Input/EmailInput';
import ilustrationLogin from '../../assets/ilustrationLogin.png';
import logoLight from '../../assets/logo-light.png';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    function handleSignUp(data, event) {
        event.preventDefault();
        console.log(data);
        navigate('/login');
    }
    return (
        <>
            <main>
                <form onSubmit={handleSubmit(handleSignUp)} >
                    <div className={styles.main_container}>
                        <img className={styles.logo} src={logoLight} alt="Logo" />
                        <p className={styles.texto}>SignUp to newBoard</p>
                        <NameInput
                            name="name"
                            placeholder="Enter your name"
                            register={register}
                            errors={errors}
                        />
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
                        <PasswordInput
                            name="password_confirmation"
                            placeholder="Confirm password"
                            register={register}
                            errors={errors}
                            watch={watch}
                        />
                        <div className={styles.container_buttons}>
                            <Button buttonType='submit' title='Continue' style='default' />
                        </div>
                        <Link className={styles.container_account} to="/login">Back to login</Link>
                    </div>
                </form>
                <img className={styles.container_image} src={ilustrationLogin} alt='Ilustration' />
            </main >
        </>
    );
}
export default SignUp;