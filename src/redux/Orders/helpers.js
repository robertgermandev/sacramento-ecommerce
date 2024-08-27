import { firestore } from "../../firebase/utlis";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const handleSaveOrder = async (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderRef = doc(collection(firestore, "orders"));
      await setDoc(orderRef, order);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const handleGetUserOrderHistory = async (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ref = query(
        collection(firestore, "orders"),
        where("orderUserID", "==", uid),
        orderBy("orderCreatedDate")
      );

      const snap = await getDocs(ref);
      const data = snap.docs.map((doc) => ({
        ...doc.data(),
        documentID: doc.id,
      }));

      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
};

export const handleGetOrder = async (orderID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderRef = doc(firestore, "orders", orderID);
      const snap = await getDoc(orderRef);

      if (snap.exists()) {
        resolve({
          ...snap.data(),
          documentID: orderID,
        });
      } else {
        reject(new Error("Order not found"));
      }
    } catch (err) {
      reject(err);
    }
  });
};
