import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Grid, GridColumn, Image } from 'semantic-ui-react';
import axios from 'axios';
import './ProductDetail.css'

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
    <div className='PostDetails'>
      <Helmet>
        <title>{product.name}</title>
        <link rel="canonical" href="https://hack3-blog-react-sans-seo.netlify.app/" />
        <meta name="description" content={product.description} />
      </Helmet>
          <Grid>
            <Grid.Column width={4} className='productImage'>
              <Image src= {product.image} alt={product.description}/>
            </Grid.Column>
            <Grid.Column width={9}>
              <h2>{product.name}</h2>
              <p><strong>{product.power}</strong></p>
              <p>{product.description}</p>
              <p>Durée : {product.duration_effect}</p>
              <p>Effet secondaire : {product.effect}</p>
            </Grid.Column>
            <Grid.Column width={2}>
              <p>Prix : {product.price}</p>
            </Grid.Column>
      </Grid>   
    </div>
  );
}

export default ProductDetails;