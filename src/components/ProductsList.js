import React from 'react';

const ProductsList = ({ products, deleteProduct, history }) => {
  const removeProduct = (index) => {
    deleteProduct(index);
  };

  return (
    <div className="products-list">
      {
        products
         ? (
           products.map(({ image, name, description, price, slug }, index) => (
             <div key={index} onClick={() => history.push(`/product/${slug}`)}>
              <img src={image} alt="" />
              <h2>{name}</h2>
              <p className="description">{description}</p>
              <p className="price">{`$${price}`}</p>
              <button onClick={e => {
                removeProduct(index)
                e.stopPropagation()
              }}>ⓧ</button>
             </div>
           ))
         )
         : 'No products'
      }
    </div>
  );
};

export default ProductsList;
