import styles from './index.module.css';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header';
import NameInput from '../../components/Input/NameInput';
import EmailInput from '../../components/Input/EmailInput';
import PasswordInput from '../../components/Input/PasswordInput';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Confirmation from '../../components/modalComponents/Account/Confirmation';

const Account = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const modeMemory = localStorage.getItem('darkMode')
    console.log('modo escuro?',modeMemory)
    const [darkMode, setDarkMode] = useState(!!modeMemory)
    const [showModal, setShowModal] = useState(false); 
    const [modalType, setModalType] = useState('');
    const [reqUpdate, setReqUpdate] = useState({})

    const handleShowModal = (type) => {
        setShowModal(true);
        setModalType(type);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    const handleChange = (event) => {
        const isDarkMode = event.target.value === 'dark'
        setDarkMode(isDarkMode)
        localStorage.setItem('darkMode', isDarkMode )
    }

    const handleUpdateAccount = (data, event) => {
        handleShowModal('update')
        event.preventDefault();
        setReqUpdate(data)
        console.log(data);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <>
            <Header logged={true} />
            <main className={styles.main}>
               
                 {showModal && (
                    <Confirmation type={modalType} onCloseModal={handleCloseModal} req={reqUpdate} />
                )}
                <div className={styles.form_container}>
                    
                    <h1 className={styles.title}>My account</h1>
                    <div className={styles.account_form}>
                        <form onSubmit={handleSubmit(handleUpdateAccount)}>
                            <h2 className={styles.subtitle}>Theme</h2>
                            <div>
                                <label className={styles.label}>
                                    <input
                                        className={styles.checkbox}
                                        type="radio"
                                        value='light'
                                        checked={!darkMode}
                                        onChange={handleChange}
                                    />
                                    Light
                                </label>
                                <label className={styles.label}>
                                    <input
                                        className={styles.checkbox}
                                        type="radio"
                                        value='dark'
                                        checked={darkMode}
                                        onChange={handleChange}
                                    />
                                    Dark
                                </label >
                            </div>
                        
                            <div className={styles.line}>
                                <hr />
                            </div>
                        
                            <div className={styles.title_setting}>
                                <h2 className={styles.subtitle}>Update account</h2>
                                <FaEdit className={styles.icon} />
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
                        
                            <label htmlFor="password" className={styles.label}>New password</label>
                            <div className={styles.input_container}>
                                <PasswordInput
                                    name="password"
                                    placeholder="Enter your password"
                                    register={register}
                                    errors={errors}
                                    watch={watch}
                                />
                            </div>
                            <label htmlFor="password-confirmation" className={styles.label}>Confirm new password</label>
                            <div className={styles.input_container}>
                                <PasswordInput
                                    name="password-confirmation"
                                    placeholder="Confirm your new password"
                                    register={register}
                                    errors={errors}
                                    watch={watch}
                                />
                            </div>
                            <div className={styles.container_button}>
                                <Button buttonType="submit" title="Save" style="default" />
                            </div>
                        </form>
                        <div className={styles.line}>
                                <hr />
                            </div>
                        <form>
                        <h2 className={styles.subtitle}>Delete account</h2>
                            
                            <div onClick={() => handleShowModal('delete')} className={styles.container_button}>
                                <Button  title="Delete" style="negative" />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};
 
export default Account;