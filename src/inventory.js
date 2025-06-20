//inventory.js
import Swal from "sweetalert2";
import {
  newProductName,
  newProductPrice,
  productGroup,
  productListTemplate,
  productSelect,
} from "./selectors";
import { v4 as uuidv4 } from "uuid";
import { products } from "./state";

//ADD NEW PRODUCT BTN
export const newProductBtnHandler = () => {
  // console.log("new product btn clicked!");
  const createId = uuidv4();
  //console.log(createId,newProductName.value,newProductPrice.valueAsNumber);
  products.push({
    id: createId,
    name: newProductName.value,
    price: newProductPrice.valueAsNumber
  });
  console.log(products);
  if (newProductName.value.trim() && !isNaN(newProductPrice.valueAsNumber)) {
    productGroup.append(
      createNewProductList(
        createId,
        newProductName.value,
        newProductPrice.valueAsNumber
      )
    );
    productSelect.append(
      new Option(
        `${newProductName.value} - ${newProductPrice.valueAsNumber}`,
        createId
      )
    );
    newProductName.value = "";
    newProductPrice.value = "";
  } else {
    Swal.fire("No Product Name or Price");
  }
};
//CREATE NEW PRODUCT LIST
// This function creates a new product list item based on the template
export const createNewProductList = (id, name, price) => {
  const productListTP = productListTemplate.content.cloneNode(true);
  // console.log(productListTP);
  const currentProductList = productListTP.querySelector(".product-list");
  currentProductList.id = id;
  // console.log(productList.id);
  const productName = productListTP.querySelector(".product-name");
  const productPrice = productListTP.querySelector(".product-price");
  productName.innerText = name;
  productPrice.innerText = price;
  // console.log( productName.innerText = name);
  // console.log( productPrice.innerText = price);
  return currentProductList;
};
//RENDER PRODUCTS
export const productRender = (products) => {
  products.forEach(({ id, name, price }) => {
    productGroup.append(createNewProductList(id, name, price));
    productSelect.append(new Option(`${name} - ${price}`, id));
  });
};
// JUMP TO NEW PRODUCT PRICE INPUT
export const jumpToNewProductPriceHandler = (event) => {
  // console.dir(event);
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default Enter key behavior (e.g., form submission)
    newProductPrice.focus(); // Focus on the second input
  }
};
// NEW PRODUCT ENTER KEY HANDLER
export const newProductEnterKeyHandler = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    newProductBtnHandler();
    newProductName.focus();
  }
};
// PRODUCT NAME FOCUS HANDLER
export const productNameFocusHandler = (event) => {
  newProductName.focus();
};
