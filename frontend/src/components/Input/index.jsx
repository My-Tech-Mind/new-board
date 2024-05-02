import { forwardRef } from 'react';
import styles from './index.module.css';

const Input = forwardRef(({ type, placeholder, style, required, onEnterPress, defaultValue, ...props }, ref) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onEnterPress();
        }
    };
    return (
        <>
<<<<<<< HEAD
            <input type={type} placeholder={placeholder} className={styles[`${style}`]} ref={ref} {...props} autoFocus />
=======
            <input
                type={type}
                placeholder={placeholder}
                className={styles[`${style}`]}
                ref={ref} {...props}
                autoFocus
                onKeyDown={handleKeyDown}
                defaultValue={defaultValue ? defaultValue : ''}
            />
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
        </>
    );
});

export default Input;
