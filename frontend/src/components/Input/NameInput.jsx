
import React from 'react';
import Input from '../../components/Input/index';
import styles from './index.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NameInput = ({ name, placeholder, register, errors }) => {
    return (
        <div className={styles.input_name}>
            <Input
                {...register(name,
                    {
                        required: 'Nome é obrigatório',
                        minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' },
                    })
                }
                type='text' placeholder={placeholder} style={errors[name]?.message ? 'input_error' : 'input_default'} />
            <FontAwesomeIcon icon={['fa', 'user']} className={styles.icone} />
            <p className={styles.mensagem_erro}>{errors[name]?.message}</p>
        </div>
    );
};

export default NameInput;
