import react from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

function useAuth() {
    const errorStatus = useSelector((state: RootState) => state.collection.errorStatus);
    const isAuthenticated = errorStatus && errorStatus !== "Unauthorized";

    return { isAuthenticated };
}

export default useAuth;
