// fetching the data from json file
async function fetchJSONData() {
  //data from json file
  let datafromjson = await fetch("Ecommercedata.json");
  // converted to js format
  let convertedData = await datafromjson.json();
  console.log(convertedData);
  // data from products only
  // for category product
  let Edata = convertedData.products;
  let homepageData = localStorage.setItem("products", JSON.stringify(Edata));

  // -------------------------------------------navigation slider products logic
  let getData = JSON.parse(localStorage.getItem("products"));
  let Homecategories = [
    getData[0].mens,
    getData[0].womens,
    getData[0].accessories,
  ];
  console.log(Homecategories);

  let currentIndex = 0;
  // function for dislaying the product
  function displayslider() {
    Homecategories.forEach((category, i) => {
      let container = document.getElementById(
        ["mens", "womens", "accessoriesPro"][i]
      );
      container.innerHTML = `
      <img src="${category[0].thumbnail}" alt="${category[0].title}" />`;
    });
  }

  // Function to update the main slider image
  function updateSlider() {
    Homecategories.forEach((category, i) => {
      const container = document.getElementById(
        ["mens", "womens", "accessoriesPro"][i]
      );
      container.innerHTML = `
      <img src="${category[currentIndex].thumbnail}" alt="${category[currentIndex].title}" />`;
    });
  }

  // Navigation buttons
  let forwardBtn = document.getElementById("forward");
  let backwardBtn = document.getElementById("backward");

  // Event listeners for navigation buttons
  forwardBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % Homecategories[0].length;
    updateSlider();
  });

  backwardBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + Homecategories[0].length) % Homecategories[0].length;
    updateSlider();
  });

  displayslider();

  // ----------------------------------------------for displaying product in main
  let main = document.querySelector("main");
  //displaying the products from the json file all the maine product
  function displayProducts(products, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    products.forEach((e) => {
      let hoverImage = e.images[2] ? e.images[2] : e.images[0];
      container.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3"  id="productid" onclick="viewProduct('${e.id}')">  
        <div class="card shadow-sm border-0"  id="main-product-id">
        <img src="${e.images[0]}" class="card-img-top rounded" alt="${e.title}"
           onmouseover="this.src='${hoverImage}'" onmouseout="this.src='${e.images[0]}'" 
            >
        <div class="card-body text-right">
            <h6>New!</h6>
            <h5>${e.title}</h5>
            <p>Rs. ${e.price}</p>
          </div>
        </div>
      </div>
      `;
    });
    main.appendChild(container);
  }

  // Display mens, womens, and accessories products which are present in main  > div
  displayProducts(Edata[0].mens, "mensPro");
  displayProducts(Edata[0].womens, "womensPro");
  displayProducts(Edata[0].accessories, "accessories");
}
fetchJSONData();

//---------------------------------------- Single product tosetand get id, dierct to single product page

function viewProduct(productId) {
  console.log("Selected Product ID:", productId);

  localStorage.setItem("selectedProductId", productId);
  // Redirect to singleproduct.html
  window.location.href = "./Singlepro.html";
}
