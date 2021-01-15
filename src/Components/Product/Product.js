import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { createMedia } from '@artsy/fresnel';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  // Divider,
  Grid,
  Header,
  Icon,
  // Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react';

import './Product.css';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
               <Container>
                <Menu.Item as={ Link } to='/' active>ACCUEIL</Menu.Item>
                <Menu.Item as={ Link } to='/products'>JE CHOISIS MON VACCIN</Menu.Item>
                <Menu.Item as='a'>QUI SOMMES-NOUS ?</Menu.Item>
                <Menu.Item as='a'>CONTACT</Menu.Item>
                <Menu.Item position='right'></Menu.Item>
                  <Button as='a' inverted={!fixed}>
                    MON PANIER
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    ME DÉCONNECTER
                  </Button>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

         {children}
       </Media>
     )
   }
  }

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as={ Link } to='/'>Home</Menu.Item>
            <Menu.Item as={ Link } to='/product' active>Product</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}
/*------------------------TO BE MODIFIED ------------------------ */
// 

const Product = () => {
  const [product, setProduct] = useState(null);
  const [duration, setDuration] = useState("");
  const [decision, setDecision] = useState(false)
  // const [ filterDur, setFilterDur ] = useState({
  //   filterDur: All,
  //   2h,
  //   4h,
  //   24h,
  //   48h
  // })
  // const [searchResults, setSearchResults] = useState("");
  const { duration_effect } = useParams();
  const history = useHistory()

  useEffect(() => {
    const baseUrl = `http://localhost:5000/product/duration`;
    if ( duration_effect ) {
      axios.get(`${baseUrl}?h=${duration_effect}`)
      .then(res => console.log('Res Products', res.data) || res.data)
      .then((prod) => setProduct(prod))
      .catch(err => {
        console.error(err);
      })
    } else {
      const baseUrl = `http://localhost:5000/product`;
      axios.get(`${baseUrl}`)
        .then(res => setProduct(res.data))
        .catch(err => {
          console.error(err);
        });
    }
  }, [duration, duration_effect]);

  // const filterDur = () => {
  //   const baseUrl = `http://localhost:5000/product/duration`;
  //   if (duration !== "") {
  //     axios.get(`${baseUrl}?h=${duration_effect}`)
  //     .then(res => res.data)
  //     .then((prod) => setFilterDur(prod.duration_effect))
  //     .catch(err => {
  //       console.error(err);
  //   })
  // }

  const filterDur = () => {
    if(!decision) {
      return product
    } else {
      setProduct(duration)
    }
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  console.log(product)
  return (
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <br />
        
          <div>
            <label>Durée :</label>
            <select onChange={(e) => history.push(`/products/${e.target.value}`)}>
              <option value="">All</option>
              <option value="2h">2h</option>
              <option value="4h">4h</option>
              <option value="24h">24h</option>
              <option value="48h">48h</option>
            </select>
          </div>
        
        {
        product && product.map(prod => 
          <div className='PostDetails'>
          <Helmet>
            <title>{prod.name}</title>
            <link rel="canonical" href="https://hack3-blog-react-sans-seo.netlify.app/" />
            <meta name="description" content={prod.description} />
          </Helmet>
              <div>
                <div>
                  <img className="product-img" src= {prod.image} alt={prod.description}/>
                </div>
                <div>
                  <h2>{prod.name}</h2>
                  <p><strong>{prod.power}</strong></p>
                  <p>Durée : {prod.duration_effect}</p>
                  <br />
                  <p className="descrip" ><strong>Effet secondaire : </strong>{prod.effect}</p>
                </div>
                <div>
                  <p>Prix : {prod.price} €</p>
                </div>
                <Link to={`/products/${prod.slug}`}>
                <button>Détails</button>
                </Link>
          </div>   
        </div>
        )
      }
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Pour aller plus loin' />
              <List link inverted>
                <List.Item as='a'>Plan du site</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Ne cliquez surtout pas ici</List.Item>
                <List.Item as='a'>Les Super-héros préférés de nos développeurs</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Pré-commandez le vaccin Trans-espèce©</List.Item>
                <List.Item as='a'>VENI*VIDI*VACCI FAQ</List.Item>
                <List.Item as='a'>Nous rejoindre</List.Item>
                <List.Item as='a'>Les vaccins favoris des X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Vous ne pourrez pas aller plus bas
              </Header>
              <p>
                En fait vous pouviez aller un peu plus bas, mais là c'est fini. Stop.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
  )
}

export default Product;


// <ResponsiveContainer>
//     <Segment style={{ padding: '8em 0em' }} vertical>
//       <Grid container stackable verticalAlign='middle'>
//         <Grid.Row>
//           <Grid.Column width={8}>
//             <Header as='h3' style={{ fontSize: '2em' }}>
//               Product page
//             </Header>
//             <p style={{ fontSize: '1.33em' }}>
//               We can give your company superpowers to do things that they never thought possible.
//               Let us delight your customers and empower your needs... through pure data analytics.
//             </p>
//             <Header as='h3' style={{ fontSize: '2em' }}>
//               We Make Bananas That Can Dance
//             </Header>
//             <p style={{ fontSize: '1.33em' }}>
//               Yes that's right, you thought it was the stuff of dreams, but even bananas can be
//               bioengineered.
//             </p>
//           </Grid.Column>
//           <Grid.Column floated='right' width={6}>
//             <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
//           </Grid.Column>
//         </Grid.Row>
//         <Grid.Row>
//           <Grid.Column textAlign='center'>
//             <Button size='huge'>Check Them Out</Button>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </Segment>

//     <Segment style={{ padding: '0em' }} vertical>
//       <Grid celled='internally' columns='equal' stackable>
//         <Grid.Row textAlign='center'>
//           <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
//             <Header as='h3' style={{ fontSize: '2em' }}>
//               "What a Company"
//             </Header>
//             <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
//           </Grid.Column>
//           <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
//             <Header as='h3' style={{ fontSize: '2em' }}>
//               "I shouldn't have gone with their competitor."
//             </Header>
//             <p style={{ fontSize: '1.33em' }}>
//               <Image avatar src='/images/avatar/large/nan.jpg' />
//               <b>Nan</b> Chief Fun Officer Acme Toys
//             </p>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </Segment>

//     <Segment style={{ padding: '8em 0em' }} vertical>
//       <Container text>
//         <Header as='h3' style={{ fontSize: '2em' }}>
//           Breaking The Grid, Grabs Your Attention
//         </Header>
//         <p style={{ fontSize: '1.33em' }}>
//           Instead of focusing on content creation and hard work, we have learned how to master the
//           art of doing nothing by providing massive amounts of whitespace and generic content that
//           can seem massive, monolithic and worth your attention.
//         </p>
//         <Button as='a' size='large'>
//           Read More
//         </Button>

//         <Divider
//           as='h4'
//           className='header'
//           horizontal
//           style={{ margin: '3em 0em', textTransform: 'uppercase' }}
//         >
//           <a href='/#'>Case Studies</a>
//         </Divider>

//         <Header as='h3' style={{ fontSize: '2em' }}>
//           Did We Tell You About Our Bananas?
//         </Header>
//         <p style={{ fontSize: '1.33em' }}>
//           Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
//           it's really true. It took years of gene splicing and combinatory DNA research, but our
//           bananas can really dance.
//         </p>
//         <Button as='a' size='large'>
//           I'm Still Quite Interested
//         </Button>
//       </Container>
//     </Segment>

//     <Segment inverted vertical style={{ padding: '5em 0em' }}>
//       <Container>
//         <Grid divided inverted stackable>
//           <Grid.Row>
//             <Grid.Column width={3}>
//               <Header inverted as='h4' content='About' />
//               <List link inverted>
//                 <List.Item as='a'>Sitemap</List.Item>
//                 <List.Item as='a'>Contact Us</List.Item>
//                 <List.Item as='a'>Religious Ceremonies</List.Item>
//                 <List.Item as='a'>Gazebo Plans</List.Item>
//               </List>
//             </Grid.Column>
//             <Grid.Column width={3}>
//               <Header inverted as='h4' content='Services' />
//               <List link inverted>
//                 <List.Item as='a'>Banana Pre-Order</List.Item>
//                 <List.Item as='a'>DNA FAQ</List.Item>
//                 <List.Item as='a'>How To Access</List.Item>
//                 <List.Item as='a'>Favorite X-Men</List.Item>
//               </List>
//             </Grid.Column>
//             <Grid.Column width={7}>
//               <Header as='h4' inverted>
//                 Footer Header
//               </Header>
//               <p>
//                 Extra space for a call to action inside the footer that could help re-engage users.
//               </p>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//       </Container>
//     </Segment>
//   </ResponsiveContainer>