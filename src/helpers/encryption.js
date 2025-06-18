import CryptoJS from "crypto-js";

const SECRET_PASS = "XkhZG4fW2t2W";

export const encryptData = (text) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(text), SECRET_PASS).toString();
  } catch (err) {
    return err.message || "";
  }
};

// Decrypt user input text
export const decryptData = (text) => {
  try {
    const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return error.message || "";
  }
};
