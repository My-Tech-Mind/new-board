
import React from 'react';
import Input from '../../components/Input/index';
import styles from './index.module.css';
import {SlEnvolope} from "react-icons/sl"

const EmailInput = ({ name, placeholder, register, errors }) => {
    return (
        <div className={styles.input_email}>
            <Input
                {...register(name,
                    {
                        required: 'Email is required',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
                    })
                }
                type='email' placeholder={placeholder} style={errors[name]?.message ? 'input_error' : 'input_default'} />
            <SlEnvolope className={styles.icon} />
            <p className={styles.message_error}>{errors[name]?.message}</p>
        </div>
    );
};

export default EmailInput;