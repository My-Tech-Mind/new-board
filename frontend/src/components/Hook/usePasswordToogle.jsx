import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(true);

    const Icon = (
        <FontAwesomeIcon icon={visible ? "eye-slash" : "eye"}
            onClick={() => setVisibility(visibility => !visibility)} />
    )
    const InputType = visible ? "password" : "text";

    return [InputType, Icon]
}

export default usePasswordToggle;