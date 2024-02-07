import styles from './index.module.css'

const Button = ({title, style}) => {
    return ( 
        <nav>
            <button>
                <a href="#">{ title }</a>
            </button>
        </nav>
     );
}
 
export default Button;