import React, {createContext, useContext, useMemo, useState} from 'react';

const AuthenticationContext = createContext();


export function AuthenticationProvider(props) {
    const [username, setUsername] = useState();
    const [showLoginBox, setShowLoginBox] = useState(false);

    const api = useMemo(() => ({
            username, setUsername
        }), [username, setUsername]
    );

    return (
        <AuthenticationContext.Provider value={api}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);
