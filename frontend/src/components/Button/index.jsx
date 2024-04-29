import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Button = ({ buttonType, disabled, title, style, size, href }) => {
    return (
        <>
            {
                buttonType === "submit" ? (
                    <button type='submit' disabled={disabled} className={`${styles[`${style}`]} ${styles[`${size}`]}`}>
                        {title}
                    </button>
                ) : (
                    <Link to={href}>
                        <button className={`${styles[`${style}`]} ${styles[`${size}`]}`}>
                            {title}
                        </button>
                    </Link>
                )
            }
            
        </>
    );
};

export default Button;