import styles from './index.module.css';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import ilustrationLogin from '../../assets/ilustrationLogin.png';
import logoLight from '../../assets/logo-light.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePasswordToggle from '../../components/Hook/usePasswordToogle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const Login = () => {


    const schema = z.object({
        email: z.string().email('Enter a valid email'),
        password: z.string().min(8, 'Password should have at least 8 characters'),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    return (
        <>
            <main>
                <div className={styles.container_image}>
                    <img src={ilustrationLogin} alt='Ilustration' />
                </div>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className={styles.main_container}>
                        <div className={styles.logo}>
                            <img src={logoLight} alt="Logo" />
                        </div>
                        <div className={styles.texto}>
                            <p>Login to the newBoard</p>
                        </div>
                        <div className={styles.input_email}>
                            <Input {...register('email')} type='email' placeholder='Enter your e-mail' style='input_default' />
                            <FontAwesomeIcon icon={['fa', 'envelope']} className={styles.icone} />
                        </div>
                        <div className={styles.input_senha}>
                            <Input {...register('password')} type={PasswordInputType} placeholder="Enter your password" style='input_default' />
                            <span className={styles.icone}>{ToggleIcon}</span>
                        </div>
                        <div className={styles.container_buttons}>
                            <Button type='submit' title='Continue' style='default' />
                        </div>
                        <div className={styles.container_account}>
                            <a href="#">Create an account</a>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
}
export default Login;