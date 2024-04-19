import { FaTimes } from 'react-icons/fa';
import styles from './index.module.css';
import { useState } from 'react';
import PasswordInput from '../../../Input/PasswordInput';
import Button from '../../../Button';
import { useForm } from 'react-hook-form';

const Confirmation = ({type, onCloseModal, req}) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [currentPassword, setCurrentPassword] = useState({})

    const handleVerifyAccount = (password, event) => {
        event.preventDefault();
        const reqUpdate = {
            ...req,
            ...password,
        }
        
    console.log("reqUpdate", reqUpdate)

        setCurrentPassword(password)
    }

    return ( 
        <>
                <div className={styles.main_container}>
                    <FaTimes className={styles.close_icon} onClick={onCloseModal} />
                   
                    {type === 'delete' ? (
                        <form className={styles.form_container} onSubmit={handleSubmit(handleVerifyAccount)} >
                        <h1 className={styles.title}>
                            Are you sure that you want to delete your account?
                        </h1>  
                        <div className={styles.input_container}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                                <PasswordInput
                                    name="password"
                                    placeholder="Enter your password"
                                    register={register}
                                    errors={errors}
                                    watch={watch}
                                    // NoValidation={true}
                                />
                        </div>
                        <div className={styles.warning_container}>
                            <input type="checkbox" className={styles.checkbox} />
                            <p className={styles.warning_text}>I am aware that my account, along with all my created boards will be permanently deleted.</p>
                        </div>
                        <div className={styles.container_button}>
                            <Button buttonType='submit' title="Delete" style="negative" />
                        </div>
                    </form>
                    ) : (
                        <form className={styles.form_container} onSubmit={handleSubmit(handleVerifyAccount)}>
                        <h1 className={styles.title}>
                            Are you sure that you want to update your account?
                        </h1>  
                        <div className={styles.input_container}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                                <PasswordInput
                                    name="password"
                                    placeholder="Enter your current password"
                                    register={register}
                                    errors={errors}
                                    watch={watch}
                                    // NoValidation={true}
                                />
                        </div>
                        <div className={styles.container_button}>
                            <Button buttonType='submit' title="Save changes" style="default" />
                        </div>
                    </form>
                    )}
                </div>
        </>
     );
}
 
export default Confirmation;