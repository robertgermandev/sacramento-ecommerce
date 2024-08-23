import { auth } from "../../firebase/utlis";
import { sendPasswordResetEmail } from "firebase/auth";

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3002/login",
  };

  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email, config)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
