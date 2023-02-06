import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
 


  const logoutHandler = () => {
    dispatch(logout())
  }

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
                      {userInfo ? (
                          <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                          </NavDropdown>
                        ) : <LinkContainer to='/login'>
                          <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                        </LinkContainer>}
                      
                    </Nav>
                </Container>

            </Navbar.Collapse>
          </Container>
        </Navbar>

    </header>
  )
}

export default Header
