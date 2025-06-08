import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border rounded p-4">
            <img
              src={`http://localhost:5000${product.photo}`}
              alt={product.name}
              style={{ width: 200, height: 200, objectFit: 'cover' }}
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;