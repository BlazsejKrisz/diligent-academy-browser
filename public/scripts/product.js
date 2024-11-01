const fetchProduct = async (productId) => {
  try {
    const response = await fetch(`/product/${product.id}`);
    if (!response.ok) {
        throw new Error ('No product found')
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
const productId = window.location.pathname.split('/').pop()

const product = await fetchProduct(productId)

  const productImg = document.createElement("img");
  productImg.id = "product-img";
  productImg.src = product.img_url;

  const productHeader = document.createElement("h1");
  productHeader.id = "product-header";
  productHeader.innerText = product.name;

  const productPrice = document.createElement("h3");
  productPrice.id = "product-price";
  productPrice.innerText = `${product.price} $`;

  const productDescription = document.createElement("p");
  productDescription.id = "product-description";
  productDescription.innerText = product.description;

  const productContainer = document.getElementsByClassName("product-container");
  if (productContainer) {
    productContainer.append(
      productImg,
      productHeader,
      productPrice,
      productDescription
    );
  } else {
    throw new Error("No product-countainer found");
  }



  const cartButton = document.getElementById("cart-button");
};
