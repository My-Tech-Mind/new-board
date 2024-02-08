import styles from './index.module.css'
import logo from '../../assets/logo-light.png'
import ButtonDesktop from '../Button/Desktop';
const Navbar = () => {
    return ( 
        <nav>
            <div className={styles.container_image}>
                <img src={logo} alt="logo" />
            </div>
            <ButtonDesktop title='Login' style='login' />
        </nav>
     );
}
 
export default Navbar;