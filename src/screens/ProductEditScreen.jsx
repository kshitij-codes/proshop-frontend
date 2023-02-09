import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
    
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const params = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    useEffect(()=>{

            if(successUpdate){
                dispatch({type: PRODUCT_UPDATE_RESET})
                dispatch(listProductDetails(params.id))
                navigate('/admin/productList')
            } else {
                if(!product.name || product._id !== params.id) {

                    dispatch(listProductDetails(params.id))
                } else {
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                }
            }

    }, [params.id, dispatch, product, navigate, successUpdate])


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
         const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
         }   
         const {data} = await axios.post('/api/upload', formData, config)
         setImage(data)
         setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: params.id,
            name, price, image, brand, category, description, countInStock
        }))
    }



  return (
    <>
        <Link to='/admin/productList' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Edit Product</h1>
           {loadingUpdate  && <Loader />}
           {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='name' className='py-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter Name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price' className='py-2'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='price' placeholder='Enter Price' value={price} onChange={e => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image' className='py-2'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder='Enter Image url' value={image} onChange={e => setImage(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Control type='file' label='Choose File' onChange={uploadFileHandler}>
                    </Form.Control>
                        {uploading && <Loader />}
                    <Form.Group controlId='brand' className='py-2'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={e => setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock' className='py-2'>
                        <Form.Label>Count in Stock</Form.Label>
                        <Form.Control type='number' placeholder='Enter countInStock' value={countInStock} onChange={e => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category' className='py-2'>
                        <Form.Label>category</Form.Label>
                        <Form.Control type='text' placeholder='Enter Category' value={category} onChange={e => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description' className='py-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' placeholder='Enter Description' value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default ProductEditScreen
