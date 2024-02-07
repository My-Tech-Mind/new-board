import styles from './index.module.css'
import logo from '../../assets/logo-light.png'
const Navbar = () => {
    return ( 
        <nav>
            <div className={styles.container_image}>
                <img src={logo} alt="logo" />
            </div>
        </nav>
     );
}
 
export default Navbar;