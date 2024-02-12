import styles from './index.module.css'

const Button = ({title, style}) => {
    return ( 
        <> 
            <a href="/signup">
                <button className={styles[`${style}`]}>
                    {title}
                </button>
            </a>
           
        </>
     );
}
 
export default Button;