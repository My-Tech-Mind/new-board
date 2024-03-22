import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Button = ({ title, style, href }) => {
    return (
        <>
            <Link to={href}>
                <button className={styles[`${style}`]}>
                    {title}
                </button>
            </Link>
        </>
    );
}

export default Button;