import styles from './index.module.css';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import ilustrationLogin from '../../assets/ilustrationLogin.png';
import logoLight from '../../assets/logo-light.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePasswordToggle from '../../components/Hook/usePasswordToogle';
import { useForm } from 'react-hook-form';

const Login = () => {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const { register, handleSubmit, formState: { errors } } = useForm();
    function handleLogin(data) {
        console.log(data);
    }
    return (
        <>
            <main>
                <div className={styles.container_image}>
                    <img src={ilustrationLogin} alt='Ilustration' />
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className={styles.main_container}>
                        <div className={styles.logo}>
                            <img src={logoLight} alt="Logo" />
                        </div>
                        <div className={styles.texto}>
                            <p>Login to the newBoard</p>
                        </div>
                        <div className={styles.input_email}>
                            <Input
                                {...register('email',
                                    {
                                        required: 'Email é obrigatório', pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' }
                                    })
                                }
                                type='email' placeholder='Enter your e-mail' style='input_default' />
                            <FontAwesomeIcon icon={['fa', 'envelope']} className={styles.icone} />
                            <p className={styles.mensagem_erro}>{errors.email?.message}</p>
                        </div>

                        <div className={styles.input_senha}>
                            <Input
                                {...register('password',
                                    {
                                        required: 'Senha é obrigatória', minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' }
                                    })
                                }
                                type={PasswordInputType} placeholder="Enter your password" style='input_default' />
                            <div className={styles.icone}>{ToggleIcon}</div>
                            <p className={styles.mensagem_erro}>{errors.password?.message}</p>
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