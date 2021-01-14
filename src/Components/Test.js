import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetails from './Product/ProductDetail';

const Product = () => {
    const [product, setProduct] = useState(null);
  
    useEffect(() => {
      const baseUrl = 'http://localhost:5000/product';
        axios.get(`${baseUrl}`)
          .then(res => console.log('Res', res.data[0]) || setProduct(res.data[0]))
          .catch(err => {
            console.error(err);
          })
    }, [])
  
    if (!product) {
      return <p>Loading...</p>;
    }
    return (
      <div>
          TESTE
        {/* {
          product && product.map(prod => 
            <ProductDetails key={prod.id} product={prod}/>
          )
        } */}
  
      </div>
    )
  }
  
  export default Product;