const division = document.getElementById("products-container");
const productDiv = document.createDocumentFragment();
const url = "/products";

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let products = data;
   
    products.map((product) => {
      let div = document.createElement("div");
      let name = document.createElement("h2");
      let price = document.createElement("h2");
      let description = document.createElement("span");

      name.innerHTML = `${product.name}`;
      price.innerHTML = `${product.price}`;
      description.innerHTML = `${product.description}`;

      div.classList.add("product")
      div.appendChild(name);
      div.appendChild(price);
      div.appendChild(description);
      productDiv.appendChild(div);
   
    });
    division.appendChild(productDiv)
  })
  .catch((error) => console.log(error))



