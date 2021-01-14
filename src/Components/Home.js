import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='VENI*VIDI*VACCI'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='PRENEZ LE POUVOIR'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

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
                <Menu.Item as={ Link } to='/product'>QUI SOMMES-NOUS ?</Menu.Item>
                <Menu.Item as='a'>JE CHOISIS MON VACCIN</Menu.Item>
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
            <HomepageHeading />
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
            <Menu.Item as={ Link } to='/' active>Home</Menu.Item>
            <Menu.Item as={ Link } to='/product'>Product</Menu.Item>
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
              <HomepageHeading mobile />
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

const Home = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '1.69em' }}>
              Échappez au Covid-19...
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Tous les vaccins VENI*VIDI*VACCI sont <br />
            certifiés par le Ministère de la santé <br />
            et possèdent un taux d'efficacité de 97% <br />
            face aux virus de la grippe, ainsi qu'aux <br />
            différents variants du Covid-19.
            </p>
            <Header as='h4' style={{ fontSize: '1.69em' }}>
              ...et à la pesanteur ! <br /> Vos rêves les plus fous deviennent accessibles
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Nous proposons toutefois quelque chose qu'aucun <br />
            des laboratoires concurrents n'est en mesure d'offrir : <br />
            la possibilité pour nos clients de choisir <br />
            le Super-pouvoir dont ils ont toujours rêvé. <br /> 
            Et si l'impossible devenait réalité dès maintenant !
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='https://imagizer.imageshack.com/img924/3274/I6iWqe.png' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>JE CHOISIS MON VACCIN</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Je n'en croyais pas mes yeux"
            </Header>
            <p style={{ fontSize: '1.33em' }}>Plusieurs de nos clients ont notamment retrouvé la vue grâce à notre dose NightVision©.</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Jamais je n'aurais dû faire confiance à leurs concurrents..."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='https://imagizer.imageshack.com/img924/3274/I6iWqe.png' />
              <b>Docteur Stephen Strange</b> New York, NY
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Commandez votre CleverVacci©
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Avec CleverVacci© vous aurez la science infuse. <br /> On vous surnommera
          Madame ou Monsieur "Je sais tout", plus personne n'osera vous remettre
          en question. Certifié par le lobby anti-complotiste !!! 
        </p>
        <Button as='a' size='large'>
          EN SAVOIR PLUS
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='/#'>BIENTÔT DISPONIBLE</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          Vaccins Trans-espèce© bientôt en vente
        </Header>
        <p style={{ fontSize: '1.33em' }}>
           Dauphin, loup, lion ou tigre : vous pourrez bientôt voir la vie autrement.
           Devenez ce que vous voulez grâce à notre dernière nouveauté. <br /> Qui a dit que la vie 
           ne devait se limiter qu'à une expérience humaine ? 
        </p>
        <Button as='a' size='large'>
          EN SAVOIR PLUS
        </Button>
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

export default Home;