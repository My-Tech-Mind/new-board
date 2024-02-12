import { forwardRef } from 'react';
import styles from './index.module.css';

const Input = forwardRef(({ type, placeholder, style, ...props }, ref) => {
    return (
        <>
            <input type={type} placeholder={placeholder} className={styles[`${style}`]} ref={ref} {...props} />
        </>
    );
});

export default Input;
