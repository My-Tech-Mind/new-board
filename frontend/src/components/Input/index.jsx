import { forwardRef } from 'react';
import styles from './index.module.css';

const Input = forwardRef(({ type, placeholder, style, onEnterPress, ...props }, ref) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onEnterPress()
        }
    }
    return (
        <>
            <input type={type} placeholder={placeholder} className={styles[`${style}`]} ref={ref} {...props} autoFocus onKeyDown={handleKeyDown} />
        </>
    );
});

export default Input;
