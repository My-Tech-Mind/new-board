import styles from './index.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import NameInput from '../../components/Input/NameInput';
import EmailInput from '../../components/Input/EmailInput';
import PasswordInput from '../../components/Input/PasswordInput';
import Button from '../../components/Button';


const Account = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const navigate = useNavigate();

    function handleUpdateAccount(data, event) {
        event.preventDefault();
        console.log(data);
        navigate('/account');
    }
    return ( 
        <>
            <Navbar />  
            <main>
                <div className={styles.form_container}>
                    <h1>My account</h1>
                    <form onSubmit={handleSubmit(handleUpdateAccount)} className={styles.account_form}>
                        <h2>Update account</h2>

                        <label htmlFor="name">Name:</label>
                        
                        <div className={styles.input_container}>
                            <NameInput
                                name="name"
                                placeholder="Enter your name"
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <label htmlFor="email">E-mail</label>
                        <div className={styles.input_container}>
                            <EmailInput
                            name="email"
                            placeholder="Enter your e-mail"
                            register={register}
                            errors={errors}
                            />
                        </div>
                    
                        <h2>Change password</h2>
                        <label htmlFor="password">Current Password</label>
                        <div className={styles.input_container}>
                            <PasswordInput
                                name="password"
                                placeholder="Enter your password"
                                register={register}
                                errors={errors}
                                watch={watch}
                            />
                        </div>
                        <label htmlFor="new password">New password</label>
                        <div className={styles.input_container}>
                            <PasswordInput
                                name="password"
                                placeholder="Enter your password"
                                register={register}
                                errors={errors}
                                watch={watch}
                            />
                        </div>
                        <div className={styles.container_button}>
                            <Button title="Save" style="default" />
                        </div>
                        <hr />
                        <h2>Delete account</h2>
                        <label htmlFor="password">Password</label>
                        <div className={styles.input_container}>
                            <PasswordInput
                                name="password"
                                placeholder="Enter your password"
                                register={register}
                                errors={errors}
                                watch={watch}
                            />
                        </div>
                        <div className={styles.warning_container}>
                            <input type="checkbox" className={styles.checkbox} />
                            <p className={styles.warning_text}>I am aware that my account, along with all my created boards will be permanently deleted.</p>
                        </div>
                        <div className={styles.container_button}>
                            <Button title="Delete" style="negative" />
                        </div>
                    </form>
                </div>
            </main>
        </>
     );
}
 
export default Account;