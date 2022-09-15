// ITERATION 1

const { product } = require("puppeteer");

function updateSubtotal(product) {
  
  // Paso 1 y 2

  const price = product.querySelector('.price span').innerHTML;
  const quantity = product.querySelector('.quantity input').value;

  // Paso 3 

  const subTotal = Number(price * quantity);

  // Paso 4

  const subTotalElement = product.querySelector(".subtotal span");

  // Paso 5

  subTotalElement.innerText = subTotal;
  return subTotal;
}


function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  const singleProduct = document.querySelector('.product');
  updateSubtotal(singleProduct);



  // ITERATION 2

  const productList = document.querySelectorAll(".product");

  let total = 0;
  productList.forEach((product) => {
    total += updateSubtotal(product);
  });


  // ITERATION 3
  
  const totalValue = document.querySelector("#total-value span");
  totalValue.innerText = total;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);

  const removeChild = target.parentNode.parentNode;
  console.log(removeChild);

  const parent = removeChild.parentNode;
  console.log(parent);

  parent.removeChild(removeChild);

  calculateAll();
  
}

// ITERATION 5

function createProduct() {
  let productName = document.querySelectorAll(
    ".create-product input[type='text']"
  );
  let productPrice = document.querySelectorAll(
    ".create-product input[type='number']"
  );
  const table = document.querySelector('tbody');
  if (productPrice.value != '' && productName.value != '') {
    table.innerHTML += `
        <tr class= "product">
            <td class="name">
                <span>${productName.value}</span>
            </td>
            <td class="price">$<span>${productPrice.value}</span></td>
            <td class="quantity">
                <input class="amount" type="number" value="0" min="0" placeholder="Quantity" />
            </td>
            <td class="subtotal">$<span>0</span></td>
            <td class="action">
                <button class="btn btn-remove">Remove</button>
            </td>
        </tr>`;
    removeBtn = document.querySelectorAll('.btn-remove');
    [...removeBtn].map((elem) =>
      elem.addEventListener('click', function (e) {
        removeProduct(e);
      })
    );
    productName.value = '';
    productPrice.value = '';
  } else {
    alert('You must enter a price and a product');
  }
}


const createBtn = document.querySelector('#create');
createBtn.addEventListener('click', function (e) {
  createProduct(e);
});

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  document.querySelectorAll('.btn-remove').forEach((productButton) => {
    productButton.addEventListener('click', removeProduct);
  });
    
});
