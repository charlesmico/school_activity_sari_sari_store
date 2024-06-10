let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Rip Jeans",
    tag: "jeansA",
    price: 10,
    inCart: 0,
    stock: 10,
  },
  {
    name: "Jogging Pants",
    tag: "jeansB",
    price: 15,
    inCart: 0,
    stock: 15,
  },
  {
    name: "Trousers",
    tag: "jeansC",
    price: 20,
    inCart: 0,
    stock: 20,
  },
  {
    name: "Black Short",
    tag: "jeansD",
    price: 25,
    inCart: 0,
    stock: 25,
  },
  {
    name: "Oversize Shirt",
    tag: "tshirtA",
    price: 30,
    inCart: 0,
    stock: 30,
  },
  {
    name: "Senpai Shirt",
    tag: "tshirtB",
    price: 35,
    inCart: 0,
    stock: 35,
  },
  {
    name: "Polo Shirt",
    tag: "tshirtC",
    price: 40,
    inCart: 0,
    stock: 40,
  },
  {
    name: "Black Shirt",
    tag: "tshirtD",
    price: 45,
    inCart: 0,
    stock: 45,
  },
  {
    name: "Bleu of Chanel",
    tag: "perfumeA",
    price: 50,
    inCart: 0,
    stock: 50,
  },
  {
    name: "Jo Malone",
    tag: "perfumeB",
    price: 55,
    inCart: 0,
    stock: 55,
  },
  {
    name: "Giorgio Armani",
    tag: "perfumeC",
    price: 60,
    inCart: 0,
    stock: 60,
  },
  {
    name: "Versace Eros",
    tag: "perfumeD",
    price: 65,
    inCart: 0,
    stock: 65,
  },
  {
    name: "Blue Summer Sando",
    tag: "sandoA",
    price: 70,
    inCart: 0,
    stock: 70,
  },
  {
    name: "Black Jersey",
    tag: "sandoB",
    price: 75,
    inCart: 0,
    stock: 75,
  },
  {
    name: "Black Sando",
    tag: "sandoC",
    price: 80,
    inCart: 0,
    stock: 80,
  },
  {
    name: "Stripes Sando",
    tag: "sandoD",
    price: 85,
    inCart: 0,
    stock: 85,
  },
  {
    name: "Roboto",
    tag: "toyA",
    price: 90,
    inCart: 0,
    stock: 90,
  },
  {
    name: "Teddy Bear",
    tag: "toyB",
    price: 95,
    inCart: 0,
    stock: 95,
  },
  {
    name: "Dragon",
    tag: "toyC",
    price: 100,
    inCart: 0,
    stock: 100,
  },
  {
    name: "Munchlax",
    tag: "toyD",
    price: 105,
    inCart: 0,
    stock: 105,
  },
];

// Function to handle adding stocks
function addStocks(productTag) {
  var inputElement = document.getElementById(`input_${productTag}`);
  var inputValue = parseInt(inputElement.value);
  var stockSpan = document.getElementById(`stock_${productTag}`);
  var currentStock = parseInt(stockSpan.textContent);

  if (!isNaN(inputValue) && inputValue > 0) {
    var newStock = currentStock + inputValue;
    stockSpan.textContent = newStock; // Update displayed stock

    // Update stock in local storage
    localStorage.setItem(`stock_${productTag}`, newStock);

    inputElement.value = ""; // Clear input after adding stocks
  } else {
    alert("Please enter a valid positive number.");
  }
}

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    // Check if stock is available
    if (products[i].stock > 0) {
      window.alert(products[i].name + " was successfully added to your cart.");
      cartNumbers(products[i]);
      totalCost(products[i]);

      // Update stock
      updateStock(products[i]);
    } else {
      window.alert("Sorry, " + products[i].name + " is out of stock.");
    }
  });
}

// Attach click event listener to the "Add Stocks" button
var addStocksButton = document.querySelector(".add-stocks");
if (addStocksButton) {
  addStocksButton.addEventListener("click", addStocks);
}

// Function to update stock after an order is placed
function updateStock(product) {
  // Retrieve the current stock value from local storage
  let currentStock = localStorage.getItem(`stock_${product.tag}`);

  if (currentStock !== null) {
    currentStock = parseInt(currentStock);

    // Check if there is enough stock to proceed
    if (currentStock > 0) {
      let remainingStock = currentStock - 1; // Decrease stock by 1
      localStorage.setItem(`stock_${product.tag}`, remainingStock); // Update stock in local storage
      displayRemainingStock(product); // Display remaining stock
      document.getElementById(`stock_${product.tag}`).textContent =
        remainingStock; // Update the stock value in the HTML span
      return true; // Indicate successful stock update
    } else {
      window.alert("Sorry, " + product.name + " is out of stock.");
      return false; // Indicate out of stock
    }
  } else {
    console.error(
      `Stock value for ${product.name} not found in local storage.`
    );
    return false; // Indicate stock value not found
  }
}

// Call displayRemainingStock function when the page loads
window.addEventListener("load", () => {
  // Loop through each product and display its remaining stock
  products.forEach((product) => {
    displayRemainingStock(product);
  });
});

// Function to display remaining stock
function displayRemainingStock(product) {
  let remainingStock = localStorage.getItem(`stock_${product.tag}`);
  if (remainingStock !== null) {
    // Update the HTML span with the retrieved remaining stock
    document.getElementById(`stock_${product.tag}`).textContent =
      remainingStock;
  }
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products-list");

  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
       <table>
        <tr>
            <td class="product-info">
              <a onClick="remove('${item.tag}')">
                <svg fill="currentColor" width="20" height="20" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg"
                     class="cf-icon-svg">
                    <path class="svg-style"
                       d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" />
                 </svg>
              </a>
              <img src="../assets/images/${item.tag}.png" alt="">
              <span class="product-name">${item.name}</span>
            </td>
            <td>$${item.price}</td>
            <td class="product-quantity">
              <a onClick="decrement('${item.tag}')">
                <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="svg-style" d="M6 12L18 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <span>${item.inCart}</span>
              <a onClick="increment('${item.tag}')">
                <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Edit / Add_Plus">
                    <path class="svg-style" id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                </svg>
              </a>
            </td>
        </tr>
      </table>
      `;
    });
    productContainer.innerHTML += `
    <div class="cart-total-container">
      <div>
        <select name="discount" id="discount" required>
          <option value="0" disabled selected hidden>Select Discount Type</option>
          <option value="0.10">Student</option>
          <option value="0.20">Senior Citizen</option>
          <option value="0.30">PWD</option>
        </select>
      </div>
      <div class="input-wrapper">
        <input type='number' id='input' required></input>
          <label for='input' class='placeholder'>Enter your cash</label>
      </div>
      <div class="cart-total-content">
        <div class="cart-total-info">
          <h4 class="basket-total-title">Total Cost</h4>
          <h4 class="basket-total">$${cartCost}.00</h4>
        </div>
        <button onClick="placeOrder()" class="place-order-btn">Place Order</button>
      </div>
    </div>
    `;
  }
}

function remove(tag) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems[tag] != undefined) {
    // Get the price of the item being removed
    let removedItemPrice = cartItems[tag].price * cartItems[tag].inCart;

    // Reduce the total cost by the price of the removed item
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - removedItemPrice);

    // Reduce the total number of items in the cart
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers - cartItems[tag].inCart);

    // Remove the item from the cart
    delete cartItems[tag];
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // Update the display
    displayCart();
  }
}

function decrement(tag) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems[tag] != undefined && cartItems[tag].inCart > 1) {
    // Decrease the quantity by 1
    cartItems[tag].inCart--;

    // Get the total declared stock
    let totalStock = products.find((product) => product.tag === tag).stock;

    // Get the current stock
    let currentStock = localStorage.getItem(`stock_${tag}`);
    currentStock = parseInt(currentStock);

    // Increment the stock by 1
    localStorage.setItem(`stock_${tag}`, currentStock + 1);

    // Update the total cost
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost - cartItems[tag].price);

    // Update the total number of items in the cart
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers - 1);

    // Update local storage with the modified cart items
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // Refresh the cart display
    displayCart();

    // Update the cart numbers
    updateCartNumbers();

    // Update the stock display
    document.getElementById(`stock_${tag}`).textContent = currentStock + 1;
  } else if (cartItems[tag].inCart === 1) {
    // If inCart is equal to 1, remove the item from the cart and add its quantity back to stock
    let currentStock = localStorage.getItem(`stock_${tag}`);
    currentStock = parseInt(currentStock) + 1; // Increment the stock by 1
    localStorage.setItem(`stock_${tag}`, currentStock); // Update the stock in local storage

    // Remove the item from the cart
    delete cartItems[tag];
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // Update the total cost
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);
    localStorage.setItem(
      "totalCost",
      cartCost - products.find((product) => product.tag === tag).price
    );

    // Update the total number of items in the cart
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    localStorage.setItem("cartNumbers", productNumbers - 1);

    // Update the display
    displayCart();
  }
}

function increment(tag) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  // Get the total declared stock
  let totalStock = products.find((product) => product.tag === tag).stock;

  if (cartItems[tag] != undefined && cartItems[tag].inCart < totalStock) {
    // Decrease the stock by 1
    let currentStock = localStorage.getItem(`stock_${tag}`);
    currentStock = parseInt(currentStock);

    if (currentStock > 0) {
      localStorage.setItem(`stock_${tag}`, currentStock - 1);

      // Increase the quantity by 1
      cartItems[tag].inCart++;

      // Update the total cost
      let cartCost = localStorage.getItem("totalCost");
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + cartItems[tag].price);

      // Update the total number of items in the cart
      let productNumbers = localStorage.getItem("cartNumbers");
      productNumbers = parseInt(productNumbers);
      localStorage.setItem("cartNumbers", productNumbers + 1);

      // Update local storage with the modified cart items
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      // Refresh the cart display
      displayCart();

      // Update the cart numbers
      updateCartNumbers();

      // Update the stock display
      document.getElementById(`stock_${tag}`).textContent = currentStock - 1;
    } else {
      window.alert("Sorry, this item is out of stock.");
    }
  } else if (cartItems[tag].inCart === totalStock) {
    window.alert("You've reached the maximum stock limit for this item.");
  }
}

function updateCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function placeOrder() {
  // Retrieve cart items from local storage
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  // Retrieve total cost from local storage
  let cartCost = localStorage.getItem("totalCost");

  // Retrieve the selected discount option
  let discountSelect = document.querySelector("select");
  let discountValue = parseFloat(discountSelect.value);

  // Get the input value
  let cashInput = document.getElementById("input").value;

  // Validate input value
  if (!cashInput || isNaN(cashInput) || cashInput < 0) {
    window.alert("Invalid input. Please enter a valid cash amount.");
    return;
  }

  // Convert input value to number
  cashInput = parseFloat(cashInput);

  // Check if cash input is zero
  if (cashInput === 0) {
    window.alert("Cash input cannot be zero.");
    return;
  }

  // Calculate discounted total bill
  let discountedTotal = cartCost - cartCost * discountValue;

  // Calculate cash change
  let cashChange = cashInput - discountedTotal;

  // Check if cash input is sufficient
  if (cashChange < 0) {
    window.alert("Insufficient cash. Please provide more.");
    return;
  }

  // Create an array to store the names of the products
  let productList = [];

  // Loop through each item in the cart
  Object.values(cartItems).forEach((item) => {
    // Push the product name and quantity into the productList array
    productList.push(`${item.name} x ${item.inCart}`);
  });

  // Join the productList array into a string with line breaks
  let productsString = productList.join("\n");

  // Display an alert dialog with the list of products, discounted total bill, cash input, and cash change
  window.alert(
    `Thank you for your order!\n\nProducts:\n${productsString}\n\nTotal Bill: $${discountedTotal.toFixed(
      2
    )} (Discount Applied: ${
      discountSelect.options[discountSelect.selectedIndex].text
    })\nCash Input: $${cashInput.toFixed(
      2
    )}\nCash Change: $${cashChange.toFixed(2)}`
  );

  // Once the order is placed, clear the cart
  localStorage.removeItem("productsInCart");
  localStorage.removeItem("totalCost");
  localStorage.removeItem("cartNumbers");

  // Refresh the cart display
  displayCart();
}

// Function to store stock in local storage when the page is loaded
function storeStockInLocalStorage() {
  // Loop through each product
  products.forEach((product) => {
    // Check if the stock for this product is already stored in local storage
    let storedStock = localStorage.getItem(`stock_${product.tag}`);
    if (storedStock === null) {
      // If not stored, store the initial stock in local storage
      localStorage.setItem(`stock_${product.tag}`, product.stock);
    }
  });
}

// Call storeStockInLocalStorage function when the page loads
window.addEventListener("load", () => {
  storeStockInLocalStorage();
});

onLoadCartNumbers();
displayCart();
