import react from 'react';

const useAuth = () => {
    const user = sessionStorage.getItem("userToken");
    const isAuthenticated = (user);

    return { isAuthenticated };
}

export default useAuth;
