import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.module.css'

const Menu = () => {
    return ( 
        <nav>
            <FontAwesomeIcon icon={['fa', 'bars']} className={styles.iconBars} />
        </nav>
     );
}
 
export default Menu;