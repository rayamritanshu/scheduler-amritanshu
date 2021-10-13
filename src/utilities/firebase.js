import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBNGXRfYFQgdrrPGWqakYmlTWb9MZIxAno",
    authDomain: "scheduler-amritanshuray.firebaseapp.com",
    databaseURL: "https://scheduler-amritanshuray-default-rtdb.firebaseio.com",
    projectId: "scheduler-amritanshuray",
    storageBucket: "scheduler-amritanshuray.appspot.com",
    messagingSenderId: "880486654940",
    appId: "1:880486654940:web:05a415a144f4d041a3a519",
    measurementId: "G-QD3EJWHZNH"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };