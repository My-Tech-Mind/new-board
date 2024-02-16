import styles from './index.module.css'

const Button = ({ title, style, href }) => {
    return (
        <>
            <a href={href}>
                <button className={styles[`${style}`]}>
                    {title}
                </button>
            </a>
        </>
    );
}

export default Button;