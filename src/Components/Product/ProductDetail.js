import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import axios from 'axios';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    console.log(slug);
    const baseUrl = 'http://localhost:5000/product';
    if (slug) {
      axios.get(`${baseUrl}/${slug}`)
        .then(res => console.log('Res', res.data[0]) || setProduct(res.data[0]))
        .catch(err => {
          console.error(err);
        })
    } else {
      axios.get(`${baseUrl}`)
        .then(res => console.log('Res', res.data[0]) || setProduct(res.data[0]))
        .catch(err => {
          console.error(err);
        })
    }
  }, [slug])

  if (!product) {
    return <p>Loading</p>;
  }
  return (
    <article className="PostDetails">
      <Helmet>
        <title>{product.name}</title>
        <link rel="canonical" href="https://hack3-blog-react-sans-seo.netlify.app/" />
        <meta name="description" content={product.description} />
      </Helmet>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.description}/>
      <p><strong>{product.power}</strong></p>
      <p>{product.description}</p>
      <p>Durée : {product.duration_effect}</p>
      <p>Effet secondaire : {product.effect}</p>
      <p>En stock : {product.quantity}</p>
      <p>Prix : {product.price}</p>
      <Link to="/">Retour à l'accueil</Link>
    </article>
  );
}

export default ProductDetails;