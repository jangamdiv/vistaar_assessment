// Function to fetch data from JSON file and store it in localStoragE
let cartdata = JSON.parse(localStorage.getItem("products"));
console.log(cartdata);
let main = document.querySelector("main");
function display(category) {
  let categories = cartdata[0];
  console.log(categories);

  // let categories = cartdata.products[0];
  main.innerHTML = "";
  categories[category].map((product) => {
    main.innerHTML += `
      <div id="productcart">
       <img src="${product.images[0]}" alt="${product.title}" class="product-image" /> </br>
       <h3>New!<h3>
       <h4>Price: Rs. ${product.price}<h4>   </br>
       <h2>${product.title}</h2>          
      </div>
  `;
  });
}
display("mens");
display("womens");
display("accessories");
