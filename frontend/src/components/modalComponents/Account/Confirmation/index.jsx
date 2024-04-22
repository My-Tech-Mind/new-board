import { FaTimes } from 'react-icons/fa';
import styles from './index.module.css';
import Button from '../../../Button';
import { useForm } from 'react-hook-form';
import { createNotification } from '../../../Notifications';
import { deleteUser, updateUser } from '../../../../services/api/account/account';
import Loading from '../../../Loading';
import { useEffect, useState } from 'react';

const Confirmation = ({type, onCloseModal, req}) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [loading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const handleUpdateAccount = async () => {
        const { passwordConfirmation, ...reqUpdate } = req
        try {
            setLoading(true)
            const response = await updateUser(reqUpdate)
            onCloseModal(true)
            if (response) {
                setLoading(false)
                createNotification('success', 'Updated account', 'Your account was successfully updated')
            } else {
                setLoading(false)
                createNotification('error', 'Error', 'Your account could not be updated')
            }
            return response
            
        } catch (error) {   
            setLoading(false)
            createNotification('error', 'Internal error', 'Sorry, your account could not be updated')
            console.log('erro:',error.response)
        }
    }

    const handleDeleteAccount = async () => {
        try {
            setLoading(true)
            const response = await deleteUser()
            onCloseModal(true)
            localStorage.removeItem('token');
            window.location = "/";
            setLoading(false)
            createNotification('success', 'Deleted account successfully', 'Your account was deleted!')
            console.log(response)
            return response
            
        } catch (error) {   
            setLoading(false)
            createNotification('error', 'Internal error', 'Sorry, your account could not be deleted')
            console.log(error.message)
        }
    }

    return ( 
        <>
            {loading && <Loading/>}
            <div className={styles.main_container}>
                    <FaTimes className={styles.close_icon} onClick={onCloseModal} />
                   
                    {type === 'delete' ? (
                        <form className={styles.form_container} onSubmit={handleSubmit(handleDeleteAccount)}>
                        <h1 className={styles.title}>
                            Are you sure that you want to delete your account?
                        </h1>  
                        <div className={styles.warning_container}>
                            <input
                                type="checkbox"
                                id='checkbox'
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                                className={styles.checkbox} />
                            <p className={styles.warning_text}>I am aware that my account, along with all my created boards will be permanently deleted.</p>
                            
                        </div>
                       
                        <div className={styles.container_button}>
                        {/* {!isChecked && (
                                <p className={styles.checkbox_message}>Active the checkbox to confirm.</p>
                            )} */}
                            <Button disabled={!isChecked} buttonType='submit' title="Delete" style={isChecked ? "negative" : "disabled"} />
                        </div>
                        </form>
                    ) : (
                        <form className={styles.form_container} onSubmit={handleSubmit(handleUpdateAccount)}>
                        <h1 className={styles.title}>
                            Are you sure that you want to update your account?
                        </h1>  
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