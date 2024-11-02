const fetchProduct = async (productId) => {
  try {
    const response = await fetch(`/product/${productId}`);
    if (!response.ok) {
      throw new Error('No product found');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const updateCartCount = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart');
  if (cartCountElement) {
    cartCountElement.innerText = `Cart (${cartItems.length})`;
    cartCountElement.addEventListener('click', () => {
      window.location.href = 'cartpage.html';
    });
  }
};

const addToCart = (product) => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push(product);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartCount();
  alert(`${product.name} has been added to your cart!`);
  
};

const main = async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  console.log("Extracted product ID:", productId);

  const product = await fetchProduct(productId);

  if (!product) {
    console.error("Product not found or failed to load.");
    return;
  }

  const productImg = document.createElement("img");
  productImg.id = "product-img";
  productImg.src = product.image_url;

  const productHeader = document.createElement("h1");
  productHeader.id = "product-header";
  productHeader.innerText = product.name;

  const productPrice = document.createElement("h3");
  productPrice.id = "product-price";
  productPrice.innerText = `${product.price} $`;

  const productDescription = document.createElement("p");
  productDescription.id = "product-description";
  productDescription.innerText = product.description;

  const productContainer = document.querySelector(".product-container");
  if (productContainer) {
    productContainer.append(
      productImg,
      productHeader,
      productPrice,
      productDescription
    );
  } else {
    throw new Error("No product-container found");
  }

  const cartButton = document.getElementById("cart-button");
  if (cartButton) {
    cartButton.addEventListener("click", () => {
      console.log("Add to Cart button clicked for product:", product);
      addToCart(product);
    });
  } else {
    console.error("Cart button not found");
  }

  updateCartCount();
};

main();
