import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Container style={{maxWidth: '100rem'}}>
            <LinkContainer to='/'>
              <Navbar.Brand>ProShop</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Container>
                    <Nav
                        className="d-flex justify-content-end"
                        style={{ maxHeight: '100px'}}
                        navbarScroll
                    >
                      <LinkContainer to='/cart'>
                        <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/login'>
                        <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                      </LinkContainer>

                    </Nav>
                </Container>

            </Navbar.Collapse>
          </Container>
        </Navbar>

    </header>
  )
}

export default Header
