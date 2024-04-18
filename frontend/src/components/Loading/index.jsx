import ReactLoading from 'react-loading';
import styles from './index.module.css';
 
const Loading = () => (
    <span className={styles.loading}>
        <ReactLoading type={'spinningBubbles'} color={'#7a7a7a'} height={'40px'} width={'40px'} />
    </span>
);
 
export default Loading;