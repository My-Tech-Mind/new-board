import React from 'react';
import Input from '../../components/Input/index';
import styles from './index.module.css';
import usePasswordToggle from '../../components/Hook/usePasswordToogle';

const PasswordInput = ({ name, placeholder, register, errors, watch, noValidation }) => {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    return (
        <div className={styles.input_password}>
            <Input
                {...register(name,
                    {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must have at least 8 characters' },
                        pattern: {
                            value: /((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g,
                            message: `Password must have: 
                            Uppercase, Lowercase,
                            Special Character, and Number.`
                        },
                        validate: (value) => {
                            const password = watch('password');
                            if (noValidation) {
                                return;
                            } else {
                                return value === password || 'Password do not match';
                            }
                            
                        },
                    })
                }
                type={PasswordInputType}
                placeholder={placeholder}
                style={errors[name]?.message ? 'input_error' : 'input_default'}
            />
            <div className={styles.icon}>{ToggleIcon}</div>
            <p className={styles.message_error}>{errors[name]?.message}</p>
        </div>
    );
};

export default PasswordInput;