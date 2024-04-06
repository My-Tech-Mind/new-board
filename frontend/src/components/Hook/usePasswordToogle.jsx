import React, { useState } from 'react';
import {FaEye} from 'react-icons/fa'

const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(true);

    const Icon = (
        <FaEye icon={visible ? "eye-slash" : "eye"}
            onClick={() => setVisibility(visibility => !visibility)} />
    )
    const InputType = visible ? "password" : "text";

    return [InputType, Icon]
}

export default usePasswordToggle;