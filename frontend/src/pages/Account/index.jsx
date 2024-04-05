import styles from './index.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import NameInput from '../../components/Input/NameInput';
import EmailInput from '../../components/Input/EmailInput';
import PasswordInput from '../../components/Input/PasswordInput';
import Button from '../../components/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const Account = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [ mode, setMode ] = useState('')
    
    const handleChange = (event) => {
        setMode(event.target.value)
    }

    const navigate = useNavigate();

    const handleUpdateAccount = (data, event) => {
        event.preventDefault();
        console.log(data);
        navigate('/account');
    };

    return (
        <>
            <Header logged={true} />
            <main>
                <div className={styles.form_container}>
                    
                    <h1>My account</h1>
                    <form onSubmit={handleSubmit(handleUpdateAccount)} className={styles.account_form}>
                        <h2>Theme</h2>
                        <div>
                            <label className={styles.label}>
                                <input
                                    className={styles.checkbox}
                                    type="radio"
                                    value='light'
                                    checked={mode === 'light'}
                                    onChange={handleChange}
                                />
                                Light
                            </label>

                            <label className={styles.label}>
                                <input
                                    className={styles.checkbox}
                                    type="radio"
                                    value='dark'
                                    checked={mode === 'dark'}
                                    onChange={handleChange}
                                />
                                Dark
                            </label >
                        </div>
                    
                        <div className={styles.line}>
                            <hr />
                        </div>
                        
                        <div className={styles.title_setting}>
                            <h2>Update account</h2>
                            {/* <FontAwesomeIcon icon={['fa', 'edit']} className={styles.icon} /> */}
                        </div>

                        <label htmlFor="name" className={styles.label}>Name</label>
                        
                        <div className={styles.input_container}>
                            <NameInput
                                name="name"
                                placeholder="Enter your name"
                                register={register}
                                errors={errors}
                            />
                        </div>
                        <label htmlFor="email" className={styles.label}>E-mail</label>
                        <div className={styles.input_container}>
                            <EmailInput
                                name="email"
                                placeholder="Enter your e-mail"
                                register={register}
                                errors={errors}
                            />
                        </div>
                    
                        <h2>Change password</h2>
                        <label htmlFor="password" className={styles.label}>Current Password</label>
                        <div className={styles.input_container}>
                            <PasswordInput
                                name="password"
                                placeholder="Enter your password"
                                register={register}
                                errors={errors}
                                watch={watch}
                            />
                        </div>
                        <label htmlFor="new password" className={styles.label}>New password</label>
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

                        <div className={styles.line}>
                            <hr />
                        </div>
                        
                        <h2>Delete account</h2>
                        <label htmlFor="password" className={styles.label}>Password</label>
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
};
 
export default Account;