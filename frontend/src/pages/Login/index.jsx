import styles from './index.module.css';
import Button from '../../components/Button/index';
import PasswordInput from '../../components/Input/PasswordInput';
import EmailInput from '../../components/Input/EmailInput';
import ilustrationLogin from '../../assets/ilustrationLogin.png';
import logoLight from '../../assets/logo-light.png';
import Loading from '../../components/Loading/index';
import logoDark from '../../assets/logo-dark.png';
import loadingLogin from '../../assets/loading-login.gif';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/api/auth';
import { createNotification } from '../../components/Notifications/index';


const Login = () => {
    const [ loading, setLoading ] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    async function handleLogin(data, event) {
        try{
            setLoading(true)
            event.preventDefault();
            const register = await login(data);
            if(register?.token){
                await localStorage.setItem('token', register.token);
                const logged = localStorage.getItem("token");
                if(logged){
                    setLoading(false)
                    window.location = "/boards";
                }
            }else{
                createNotification('error', "Failed to login!", JSON.parse(register.request.response).message);
                setLoading(false)
            }
        }catch(error){
           setLoading(false)
           console.log(error)
        }
    }

    const mode = localStorage.getItem('mode')
    return (
        <>
            {loading && <Loading/>}
            <main>
                <div className={styles.container_image}>
                    <img src={ilustrationLogin} alt='Ilustration' />
                </div>

                <form onSubmit={handleSubmit(handleLogin)}  >
                    <div className={styles.main_container}>
                        {
                            mode === 'dark' ? (
                                <img className={styles.logo} src={logoDark} alt="Logo" />
                            ): (
                                <img className={styles.logo} src={logoLight} alt="Logo" />
                            )
                        }
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