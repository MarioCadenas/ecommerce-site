import React from 'react';

const SingleProduct = ({ product: { image, name, description, price } }) => {
  return (
    <div className="single-product">
      <img src={image} alt="" />
      <h2>{name}</h2>
      <p className="description">{description}</p>
      <p className="price">{`$${price}`}</p>
    </div>
  )
};

export default SingleProduct;
