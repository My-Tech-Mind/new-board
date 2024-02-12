import styles from './index.module.css'

const Input = ({ type, placeholder, style }) => {
    return (
        <>
            <input type={type} placeholder={placeholder} className={styles[`${style}`]} >
            </input>
        </>
    );
}

export default Input;