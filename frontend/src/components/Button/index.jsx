import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Button = ({ buttonType, title, style, href }) => {
    return (
        <>
            {
                buttonType === "submit" ? (
                    <button type='submit' className={styles[`${style}`]}>
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