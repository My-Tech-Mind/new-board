import limitError from '../../../assets/limit-error.png';
import Button from '../../Button';
import styles from './index.module.css'
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdWorkspacePremium } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const LimitError = ({onOpenModal}) => {

    const [closeModal, setCloseModal] = useState(false);
    const [upgradePlan, setUpgradePlan] = useState(false);

    const handleCloseModal = () => {
        setCloseModal(true);
        onOpenModal(false);
    }

    const handleUpgradePlan = () => {
        setUpgradePlan(true);
    }
    return ( 
        <>
            {!closeModal && (
                <div className={styles.main_container}>
                <FaTimes className={styles.close_icon} onClick={handleCloseModal} />
                <div className={styles.content_container}>
                    <img src={limitError} alt="Limit error" width={120} />
                    <div className={styles.title_container}>
                        <h1 className={styles.title}>Limitation of free account</h1>
                        <p className={styles.message}>Please, upgrade your plan to use the New Board unlimited.</p>
                    </div>
                    <div className={styles.plans_container}>
                        <div className={styles.plan}>
                            <h2 className={styles.subtitle}>Free Plan</h2>
                            <ul className={styles.limitations}>
                                <li className={styles.limit}>
                                    <IoMdCloseCircleOutline className={styles.limit_icon} />
                                    <p>Limit of 5 boards;</p>
                                </li>
                                <li className={styles.limit}>
                                    <IoMdCloseCircleOutline className={styles.limit_icon} />
                                    <p>Limit of 10 cards;</p>
                                </li>
                                <li className={styles.limit}>
                                    <IoMdCloseCircleOutline className={styles.limit_icon} />
                                    <p>Limit of 20 tasks;</p>
                                </li>
                                    <div onClick={handleCloseModal}>
                                    <Button title="Free Plan" style="outline" size='size_default' className={ styles.button} />
                                    </div>
                            </ul>
                        </div>
                        <div className={styles.plan} id={styles.premium_plan}>
                            <div className={styles.premium_title_container}>
                                <MdWorkspacePremium className={styles.premium_icon} />
                                <h2 className={styles.subtitle}> Premium Plan</h2>
                            </div>
                            <ul className={styles.limitations}>
                                <li className={styles.limit}>
                                    <FaRegCheckCircle className={styles.check_icon} />
                                    <p>Boards unlimited;</p>
                                </li>
                                <li className={styles.limit}>
                                    <FaRegCheckCircle className={styles.check_icon} />
                                    <p>Cards unlimited;</p>
                                </li>
                                <li className={styles.limit}>
                                    <FaRegCheckCircle className={styles.check_icon} />
                                    <p>Tasks unlimited;</p>
                                </li>
                                <p className={styles.price}><strong>$ 4.99/ month</strong></p>
                                    <div onClick={handleUpgradePlan}>
                                        <Button
                                            title="Upgrade"
                                            style="default"
                                            size="size_default"
                                            className={styles.button} />
                                    </div>
                                    {upgradePlan && (
                                        <p className={styles.upgrade_message}>Sorry! We're developing the premium plan! That will be available soon.</p>
                                    )}
                            </ul>
                        </div>
                    </div>       
                </div>
            </div>
            )}
        </>
     );
}
 
export default LimitError;