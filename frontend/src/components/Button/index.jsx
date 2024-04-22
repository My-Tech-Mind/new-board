import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Button = ({ buttonType, disabled, title, style, href }) => {
    return (
        <>
            {
                buttonType === "submit" ? (
                    <button type='submit' disabled={disabled} className={styles[`${style}`]}>
                        {title}
                    </button>
                ) : (
                    <Link to={href}>
                        <button className={styles[`${style}`]}>
                            {title}
                        </button>
                    </Link>
                )
            }
            
        </>
    );
}

export default Button;