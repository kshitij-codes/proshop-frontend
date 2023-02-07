import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('false')

    const params = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate

    useEffect(()=>{

        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userList')
        } else {
            if(!user.name || user._id !== params.id) {
                dispatch(getUserDetails(params.id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, params.id, dispatch, successUpdate, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: params.id, name, email, isAdmin}))
    }



  return (
    <>
        <Link to='/admin/userList' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='name' className='py-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter Name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='py-2'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='isAdmin' className='py-2'>
                        <Form.Check type='checkbox' label='Is Admin' value={isAdmin} $checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default UserEditScreen
