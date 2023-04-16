import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { useState } from 'react';

const useEncryptedCookie = (name) => {
  const [value, setValue] = useState(null);

  const setEncryptedCookie = (data) => {
    // Encrypt the data using a secret key
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key').toString();
    
    // Set the encrypted data as the cookie value
    Cookies.set(name, encryptedData);
  };

  const getEncryptedCookie = () => {
    // Get the encrypted data from the cookie
    const encryptedData = Cookies.get(name);

    if (encryptedData) {
      // Decrypt the data using the secret key
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'my-secret-key').toString(CryptoJS.enc.Utf8);
      
      // Parse the decrypted data from JSON format
      setValue(JSON.parse(decryptedData));
    }
  };

  return [value, setEncryptedCookie, getEncryptedCookie];
};

export default useEncryptedCookie;
