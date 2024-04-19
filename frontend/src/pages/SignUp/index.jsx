import { useState } from "react";
import styles from './index.module.css';
import Button from '../../components/Button/index';
import { createNotification } from '../../components/Notifications/index';
import Loading from '../../components/Loading/index';
import PasswordInput from '../../components/Input/PasswordInput';
import NameInput from '../../components/Input/NameInput';
import EmailInput from '../../components/Input/EmailInput';
import ilustrationLogin from '../../assets/ilustrationLogin.png';
import logoLight from '../../assets/logo-light.png';
import { useForm } from 'react-hook-form';
import { createAccount } from '../../services/api/sign-up/index';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function handleSignUp(data, event) {
        event.preventDefault();
        try{
            setLoading(true)
            const signup = await createAccount(data);
            if(signup.request.status < 300){
                createNotification('success', "Account created successfully!", "Log in to continue!");
                setLoading(false)
                setTimeout(() => {
                  navigate('/login');
                }, 1500);
            } else if(signup.request.status >= 300){
                createNotification('error', "Account not created!", JSON.parse(signup.request.response).message);
                setLoading(false)
            }
        } catch(error){
            setLoading(false)
        }
    }
    return (
        <>  
            { loading && <Loading/> }
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