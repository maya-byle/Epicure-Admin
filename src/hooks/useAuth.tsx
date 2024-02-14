import { useState, useEffect } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

function useAuth() {
    const errorStatus = useSelector((state: RootState) => state.collection.errorStatus);
    console.log(errorStatus)
    const isAuthenticated = errorStatus !== "Unauthorized";

    return { isAuthenticated };
}

export default useAuth;
