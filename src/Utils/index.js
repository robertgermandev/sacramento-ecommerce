import axios from "axios";

export const checkUserRole = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return;

  const { userRoles } = currentUser;

  if (userRoles.includes("admin")) return true;

  return false;
};

export const apiInstance = axios.create({
  baseURL: "http://127.0.0.1:5001/sacramento-ecommerce/us-central1/api",
});

export const formatPrice = (productPrice) => {
  const price = Number(productPrice);

  if (isNaN(price)) {
    throw new Error("Invalid price value");
  }

  const formattedPrice = price
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .replace(".", ",");

  return formattedPrice;
};
