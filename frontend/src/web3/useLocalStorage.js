
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const useLocalStorage = () => {



    const [latestId, setLatestId] = useState();

    useEffect(() => {
        if (getLocalStorage('id')) {
            getIds()
        }
    }, [])

    function setLocalStorage(key, value) {
        localStorage.setItem(key, value);
        getIds()
    }

    function getLocalStorage(key) {
        return localStorage.getItem(key);
    }

    function verifyLocalStorage(key) {
        return localStorage.hasOwnProperty(key);
    }

    function removeLocalStorage(key) {
        localStorage.removeItem(key);
    }

    function clearLocalStorage() {
        localStorage.clear();
    }

    function getIds() {
        const storage = getLocalStorage('id');
        const bnValue = ethers.BigNumber.from(storage);
        setLatestId(bnValue.toString())
    }




    return { setLocalStorage, getLocalStorage, verifyLocalStorage, getIds, removeLocalStorage, clearLocalStorage, latestId }
}