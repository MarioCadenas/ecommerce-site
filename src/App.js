import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const addProduct = product => setProducts([...products, product]);
  const deleteProduct = index => setProducts(products.filter((p, i) => i !== index));
  const addToCart = ({ product, quantity }) => {
    if (!cart.length || !cart.some(({ product: { slug } }) => slug === product.slug)) {
      return setCart([...cart, { product, quantity }]);
    }

    return setCart(cart.map(item => (
      item.product.slug === product.slug
       ? { ...item, quantity: item.quantity + quantity }
       : item
    )));
  };

  return (
    <Router>
      <div id="app">
        <aside>
          <Link to={'/'}>Products</Link>
          <Link to={'/add-product'}>Add product</Link>
        </aside>
        <main>
          <Cart cart={cart} />
          <Route
            exact
            path="/"
            render={({ history }) => <ProductsList products={products} deleteProduct={deleteProduct} history={history} />}
          >
          </Route>
          <Route
            path="/add-product"
            render={({ history }) => <AddProduct addProduct={addProduct} history={history} />}
          >
          </Route>
          <Route
            path="/product/:slug"
            render={({ match }) => (
                <SingleProduct
                  product={products.find(p => p.slug === match.params.slug)}
                  addToCart={addToCart}
                />
              )}
          >
          </Route>
        </main>
      </div>
    </Router>
  );
};

export default App;
