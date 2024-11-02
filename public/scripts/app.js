function loadProducts() {
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
        productDiv.appendChild(createProduct(product));
      });
      division.appendChild(productDiv);
    })
    .catch((error) => console.log(error));
}

function createProduct(product) {
  let div = document.createElement("div");
  let name = document.createElement("h2");
  let image = document.createElement("img");
  let price = document.createElement("h2");
  let description = document.createElement("span");

  image.src = product.image_url;
  name.innerHTML = `${product.name}`;
  price.innerHTML = `${product.price}`;
  description.innerHTML = `${product.description}`;

  div.addEventListener("click", () => {
    window.location.href = `/product.html?id=${product.id}`;
  });
  
  

  div.classList.add("product");
  div.appendChild(name);
  div.appendChild(image);
  div.appendChild(price);
  div.appendChild(description);
  return div;
}

function searchProducts() {
  const productsContainer = document.getElementById("products-container");
  let input = document.querySelector(".input-search").value;

  input = input.toLowerCase();
  fetch(`/search?searchquery=${input}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let searchedProducts = data;
      productsContainer.innerHTML = "";
      searchedProducts.map((product) => {
        productsContainer.appendChild(createProduct(product));
      });
    });
  // let products = document.getElementsByClassName("product");

  // for (i = 0; i < products.length; i++) {
  //   if (!products[i].innerHTML.toLowerCase().includes(input)) {
  //     products[i].style.display = "none";
  //   } else {
  //     products[i].style.display = "flex";
  //   }
  // }
}

function searchByCategory() {
  const productsContainer = document.getElementById("products-container");
  let selectElement = document.getElementById("select-category");
  selectElement.addEventListener("change", (event) => {
    const category = event.target.value.toLowerCase();
    fetch(`/search/category?category=${category}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let searchedProducts = data;
        productsContainer.innerHTML = "";
        searchedProducts.map((product) => {
          productsContainer.appendChild(createProduct(product));
        });
      });
  });
}

function createSelectElement() {
  let selectElement = document.createElement("select");
  selectElement.id = "select-category";
  let destionationDiv = document.querySelector(".search-box");

  const categories = [
    "Choose a category",
    "Black Tea",
    "Green Tea",
    "Herbal Tea",
    "Spiced Tea",
    "Oolong Tea",
  ];

  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    option.value = categories[i];
    option.text = categories[i];
    if (i === 0) {
      option.selected = true;
      option.disabled = true;
    }
    selectElement.appendChild(option);
  }

  destionationDiv.appendChild(selectElement);
}

function initializeLenisScroll(){
   // Initialize Lenis
   const lenis = new Lenis();

   // Listen for the scroll event and log the event data
   lenis.on("scroll", (e) => {
 
   });
 
   // Use requestAnimationFrame to continuously update the scroll
   function raf(time) {
     lenis.raf(time);
     requestAnimationFrame(raf);
   }
 
   requestAnimationFrame(raf);
}

function main() {
  loadProducts();
  createSelectElement();
  searchByCategory();
  initializeLenisScroll()
 
}

main();
