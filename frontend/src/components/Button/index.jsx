import styles from './index.module.css'

const Button = ({ title, style }) => {
    return (
        <>
            <button className={styles[`${style}`]}>
                <a href="#">{title}</a>
            </button>
        </>
    );
}

export default Button;