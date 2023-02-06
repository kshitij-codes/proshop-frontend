import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'


const ShippingScreen = () => {
  
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }
  

    return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='py-2'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' required placeholder='Enter Address' value={address} onChange={e => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='py-2'>
            <Form.Label>City</Form.Label>
            <Form.Control type='text' required placeholder='Enter City' value={city} onChange={e => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className='py-2'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type='text' required placeholder='Enter Postal Code' value={postalCode} onChange={e => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className='py-2'>
            <Form.Label>Country</Form.Label>
            <Form.Control type='text' required placeholder='Enter Country' value={country} onChange={e => setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
