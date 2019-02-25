import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import './App.css';
import NotFound from './components/404';

const persist = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const loadStorage = () => {
    setProducts(JSON.parse(localStorage.getItem('products')) || []);
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  };
  const addProduct = (product) => {
    if (products.some(({ slug }) => slug === product.slug)) {
      return false;
    }

    setProducts(persist('products', [...products, product]));
    return true;
  };
  const deleteProduct = (index) => setProducts(persist('products', products.filter((p, i) => i !== index)));
  const addToCart = ({ product, quantity }) => {
    if (!cart.length || !cart.some(({ product: { slug } }) => slug === product.slug)) {
      return setCart(persist('cart', [...cart, { product, quantity }]));
    }

    return setCart(persist('cart', cart.map(item => (
      item.product.slug === product.slug
       ? { ...item, quantity: item.quantity + quantity }
       : item
    ))));
  };

  useEffect(loadStorage, []);

  return (
    <Router>
      <div id="app">
        <aside>
          <Link to={'/'}>Products</Link>
          <Link to={'/add-product'}>Add product</Link>
        </aside>
        <main>
          <Cart cart={cart} />
          <Switch>
            <Route
              exact
              path="/"
              render={({ history }) => <ProductsList products={products} deleteProduct={deleteProduct} history={history} />}
            >
            </Route>
            <Route
              exact
              path="/add-product"
              render={({ history }) => <AddProduct addProduct={addProduct} history={history} />}
            >
            </Route>
            <Route
              exact
              path="/product/:slug"
              render={({ match }) => (
                  <SingleProduct
                    product={products.find(p => p.slug === match.params.slug)}
                    addToCart={addToCart}
                  />
                )
              }
            >
            </Route>
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
