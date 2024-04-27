import serverErrorImage from '../../../assets/server-error.png';
import styles from './index.module.css'

const ServerError = () => {
    return ( 
        <main className={styles.main_container}>
            <div className={styles.content_container}>
                <h1 className={styles.title}>Internal server Error</h1>
                <img
                    src={serverErrorImage}
                    alt="Server error"
                    className={styles.server_error_image}
                />
                <p className={styles.message}>Sorry, we had a problem to load this page. Please, try to reload the page or come back soon.</p>
                <p className={styles.reload} onClick={() => window.location.reload()}>Reload this page</p>
            </div>
        </main>
     );
}
 
export default ServerError;