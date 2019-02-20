import React from 'react';

const Cart = ({ cart }) => {

  if (!cart.length) {
    return '';
  }

  return(
    <table className="cart">
      <tbody>
        <tr>
          <td colSpan="3">
            <h2>Cart</h2>
          </td>
        </tr>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>

        {
          cart.map(({ product: { name, price }, quantity }, index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>${quantity * price}</td>
              </tr>
            )
          )
        }
      </tbody>
    </table>
  )
};

export default Cart;