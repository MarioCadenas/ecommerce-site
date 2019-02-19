import React, { useState } from 'react';

const slugify = str => {
  str = str || ''
  const a =
    'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;άαβγδεέζήηθιίϊΐκλμνξοόπρσςτυϋύΰφχψωώ'
  const b =
    'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------aavgdeeziitiiiiklmnxooprsstyyyyfhpoo'
  const p = new RegExp(a.split('').join('|'), 'g')

  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/ου/g, 'ou')
    .replace(/ευ/g, 'eu')
    .replace(/θ/g, 'th')
    .replace(/ψ/g, 'ps')
    .replace(/\//g, '-')
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

const AddProduct = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleChangeName = ({ target: { value }}) => setName(value);
  const handleChangePrice = ({ target: { value }}) => setPrice(value);
  const handleChangeDescription = ({ target: { value }}) => setDescription(value);
  const handleChangeImage = ({ target: { value }}) => setImage(value);
  const addProduct = (e) => {
    e.preventDefault();
    props.addProduct({ name, price, description, image, slug: slugify(name) });
    props.history.push('/');
  };

  return (
    <div>
      <form onSubmit={addProduct}>
        <h1>Add Product</h1>
        <div>
          <label>Name:</label>
          <input required onChange={handleChangeName} />
        </div>
        <div>
          <label>Price in $:</label>
          <input required onChange={handleChangePrice} />
        </div>
        <div>
          <label>Description</label>
          <textarea required onChange={handleChangeDescription} />
        </div>
        <div>
          <label>Image URL:</label>
          <input required onChange={handleChangeImage} />
        </div>
        <input type="submit" value="Add" className="button" />
      </form>
    </div>
  )
};

export default AddProduct;
