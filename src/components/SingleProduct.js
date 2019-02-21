import React, { useState } from 'react';

const SingleProduct = ({ addToCart, product: { image, name, description, price }, product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = ({ target: { value }}) => {
    const number = Number.parseInt(value);
    if (number < 1) {
      return;
    }
    setQuantity(number);
  };
  const addProductToCart = () => addToCart({ product, quantity });

  return (
    <div className="single-product">
      <img src={image} alt="" />
      <h2>{name}</h2>
      <p className="description">{description}</p>
      <p className="price">{`$${price}`}</p>
      <input type="number" value={quantity} onChange={handleQuantityChange} />
      <button onClick={addProductToCart}>Add to cart</button>
    </div>
  )
};

export default SingleProduct;
