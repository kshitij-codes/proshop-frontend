import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const submitHandler = e => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...'>
      </Form.Control>
      <Button type='submit' variant='outline-success' className='p-2 mx-4'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
