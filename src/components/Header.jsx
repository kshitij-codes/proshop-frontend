import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from './SearchBox'
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
            <>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" >
                <Container>
                    <Nav
                        className="d-flex justify-content-end"
                        style={{ maxHeight: '200px'}}
                        navbarScroll
                    >
              <SearchBox />
                      <LinkContainer to='/cart'>
                        <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                      </LinkContainer>
                      {userInfo ? (
                          <NavDropdown title={userInfo.name} id='username' >
                            <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                          </NavDropdown>
                        ) : <LinkContainer to='/login'>
                          <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                        </LinkContainer>}
                      {userInfo && userInfo.isAdmin === "true" && (
                        <NavDropdown title='Admin' id='adminmenu' >
                        <LinkContainer to='/admin/userList'>
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productList'>
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderList'>
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </NavDropdown>
                      )}
                    </Nav>
                </Container>

            </Navbar.Collapse>
        </>
          </Container>
        </Navbar>

    </header>
  )
}

export default Header
