import { firestore } from "./../../firebase/utlis";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export const handleAddProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      await addDoc(collection(firestore, "products"), product);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pageSize = 6;
      let ref = query(
        collection(firestore, "products"),
        orderBy("createdDate"),
        limit(pageSize)
      );

      if (filterType)
        ref = query(ref, where("productCategory", "==", filterType));
      if (startAfterDoc) ref = query(ref, startAfter(startAfterDoc));

      const snapshot = await getDocs(ref);
      const totalCount = snapshot.size;

      const data = [
        ...persistProducts,
        ...snapshot.docs.map((doc) => ({
          ...doc.data(),
          documentID: doc.id,
        })),
      ];

      resolve({
        data,
        queryDoc: snapshot.docs[totalCount - 1],
        isLastPage: totalCount < pageSize,
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const handleDeleteProduct = (documentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteDoc(doc(firestore, "products", documentID));
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const handleFetchProduct = (productID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productRef = doc(firestore, "products", productID);
      const snapshot = await getDoc(productRef);

      if (snapshot.exists()) {
        resolve({
          ...snapshot.data(),
          documentID: productID,
        });
      } else {
        reject(new Error("Product not found"));
      }
    } catch (err) {
      reject(err);
    }
  });
};
