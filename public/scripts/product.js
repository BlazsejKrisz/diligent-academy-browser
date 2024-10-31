const main = () => {
    const productImg = document.createElement('img')
    productImg.id = 'product-img'
    productImg.src = product.img_url

    const productHeader = document.createElement('h1')
    productHeader.id = 'product-header'
    productHeader.innerText = product.name

    const productPrice = document.createElement('h3')
    productPrice.id = 'product-price'
    productPrice.innerText = `${product.price} $`

    const productDescription = document.createElement('p')
    productDescription.id = 'product-description'
    productDescription.innerText = product.description

    const productContainer = document.getElementsByClassName('product-container')
    if (productContainer) {
        productContainer.append(productImg, productHeader, productPrice, productDescription )
    } else {
        throw new Error('No product-countainer found')
    }

    const cartButton = document.getElementById('cart-button')

}