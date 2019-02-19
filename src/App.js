import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import SingleProduct from './components/SingleProduct';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);

  const addProduct = product => setProducts([...products, product]);
  const deleteProduct = index => {
    setProducts(products.filter((p, i) => i !== index));
  };

  return (
    <Router>
      <div id="app">
        <aside>
          <Link to={'/'}>Products</Link>
          <Link to={'/add-product'}>Add product</Link>
        </aside>
        <main>
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
            render={({ match }) => (<SingleProduct product={products.find(p => p.slug === match.params.slug)} />)}
          >
          </Route>
        </main>
      </div>
    </Router>
  );
};

export default App;
