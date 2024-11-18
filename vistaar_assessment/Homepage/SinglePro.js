document.addEventListener("DOMContentLoaded", () => {
  let selectedProductId = localStorage.getItem("selectedProductId");
  console.log(selectedProductId);

  let productsData = JSON.parse(localStorage.getItem("products"));
  console.log(productsData);

  let allProducts = [
    ...productsData[0].mens,
    ...productsData[0].womens,
    ...productsData[0].accessories,
  ];
  console.log(allProducts);

  // Find the product by ID
  let selectedProduct = allProducts.find(
    (product) => product.id == selectedProductId
  );
  console.log(selectedProduct);

  // Display the product details on the page
  let productContainer = document.getElementById("product-details");

  let sizeGuideHTML = "";

  if (selectedProduct.category === "apparels") {
    sizeGuideHTML = `
      <div class="size-guide">
        <p>Size guide:</p>
        <div class="sizes">
          <button>S</button>
          <button>M</button>
          <button>L</button>
          <button>XL</button>
          <button>2XL</button>     
        </div>
      </div>
    `;
  }

  productContainer.innerHTML = `
   <div class="product-detailsimages-card">
        <img src="${selectedProduct.images[0]}" alt="${selectedProduct.title}" class="ProductImages"> </br>
         <img src="${selectedProduct.images[1]}" alt="${selectedProduct.title}" class="ProductImages"> </br>
          <img src="${selectedProduct.images[2]}" alt="${selectedProduct.title}" class="ProductImages">
        
    </div>
    <div class="product-detail-card">
    <div class="product-details-flex">
      <img src="${selectedProduct.images[0]}" alt="${selectedProduct.title}" class="product-image">
      <div class="product-info">
       <h2>${selectedProduct.category}</h2> 
        <h3>${selectedProduct.title}</h3> 
        ${sizeGuideHTML}
    <div class="product-cta">
          <button id="RemovingBtn" >-</button>
           <h6>0</h6>
          <button id="AddingBtn">+</button>
        </div>
         <button id="AddProductBtn"><p class="product-description">
                ADD Price: Rs. ${selectedProduct.price}
           </p>
           </button>
      <p class="product-description">${selectedProduct.description}</p>
      </div>
      </div>
    </div> 
  `;
  let h6 = document.querySelector("h6");
  let addProBtn = document.querySelector("#AddingBtn");
  console.log(addProBtn);
  let RemovePrBtn = document.querySelector("#RemovingBtn");
  console.log(RemovePrBtn);
  let span = document.querySelector("#count");
  console.log(span);
  let cartBtn = document.querySelector("#btn3");
  let contactForm = document.querySelector("#contact-form-container");

  let count = 0;
  function updateFinalCount() {
    span.innerHTML = count;

    if (count === 0) {
      cartBtn.disabled = true;
      contactForm.style.display = "none";
      cartBtn.style.color = "#0fa958";
    } else {
      cartBtn.disabled = false;
    }
  }
  addProBtn.addEventListener("click", (e) => {
    count = count + 1;
    h6.innerHTML = count;
    updateFinalCount();
  });

  RemovePrBtn.addEventListener("click", (e) => {
    if (count > 1) {
      count--;
      h6.innerHTML = count;
      updateFinalCount();
    }
  });

  cartBtn.addEventListener("click", () => {
    if (count > 0) {
      contactForm.style.display = "flex";
      cartBtn.style.color = "black";
      cartBtn.style.backgroundColor = "#6c45f5";
      cartBtn.style.cursor = "pointer";
    }
  });

  setInterval(() => {
    updateFinalCount();
  }, 2000);
});
