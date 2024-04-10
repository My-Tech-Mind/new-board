import limitError from '../../../assets/limit-error.png'
import Button from '../../Button';
import styles from './index.module.css'

const LimitError = () => {
    return ( 
        <div className={styles.main_container}>
            <div className={styles.content_container}>
                <img src={limitError} alt="Limit error" width={150} />
                <div className={styles.title_container}>
                    <h1 className={styles.title}>Limitation of free account</h1>
                    <p className={styles.message}>Please, upgrade your plan to use the New Board unlimited.</p>
                </div>
                <div className={styles.plans_container}>
                    <div className={styles.plan}>
                        <h2 className={styles.subtitle}>Free Plan</h2>
                        <ul className={styles.limitations}>
                            <li className={styles.limit}>Limit of 5 boards;</li>
                            <li className={styles.limit}>Limit of 10 cards;</li>
                            <li className={styles.limit}>Limit of 20 tasks;</li>
                            <Button title="Free Plan" style="outline" className={ styles.button} />
                        </ul>
                    </div>
                    <div className={styles.plan}>
                        <h2 className={styles.subtitle}>Premium Plan</h2>
                        <ul className={styles.limitations}>
                            <li className={styles.limit}>Boards unlimited;</li>
                            <li className={styles.limit}>Cards unlimited;</li>
                            <li className={styles.limit}>Tasks unlimited;</li>
                            <Button title="Upgrade" style="default" className={ styles.button} />
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
     );
}
 
export default LimitError;