import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const signIn = async (email, password) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
}

export default function Context({ children }) {
    const [user, setUser] = useState('');
    return (
        <AuthContext.Provider value={{ user, setUser, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext);
}
