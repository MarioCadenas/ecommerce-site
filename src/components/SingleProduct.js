import React from 'react';

const SingleProduct = ({ addToCart, product: { image, name, description, price }, product }) => {
  const addProductToCart = () => addToCart({ product, quantity: 1 });

  return (
    <div className="single-product">
      <img src={image} alt="" />
      <h2>{name}</h2>
      <p className="description">{description}</p>
      <p className="price">{`$${price}`}</p>
      <button onClick={addProductToCart}>Add to cart</button>
    </div>
  )
};

export default SingleProduct;
