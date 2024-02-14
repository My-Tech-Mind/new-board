
import React from 'react';
import Input from '../../components/Input/index';
import styles from './index.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EmailInput = ({ name, placeholder, register, errors }) => {
    return (
        <div className={styles.input_email}>
            <Input
                {...register(name,
                    {
                        required: 'Email é obrigatório',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' }
                    })
                }
                type='email' placeholder={placeholder} style={errors[name]?.message ? 'input_error' : 'input_default'} />
            <FontAwesomeIcon icon={['fa', 'envelope']} className={styles.icone} />
            <p className={styles.mensagem_erro}>{errors[name]?.message}</p>
        </div>
    );
};

export default EmailInput;
