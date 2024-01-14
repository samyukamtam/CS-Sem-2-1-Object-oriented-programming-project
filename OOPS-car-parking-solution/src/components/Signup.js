import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from '../firebase'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef=useRef()
  const carnoRef=useRef()
  const addressRef=useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      firebase.firestore().collection('users').add({
        email: emailRef.current.value,
        // password: passwordRef,
        // passwordConfirm: passwordConfirmRef,
        address: addressRef.current.value,
        name: nameRef.current.value,
        carnumber: carnoRef.current.value,
        roleId: 3
      })
      history.push("/")
    } catch(error) {
      setError("Failed to create an account"+error)
    }

    setLoading(false)
  }

  return (
    <>
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="carno">
              <Form.Label>Car Number</Form.Label>
              <Form.Control type="carnumber" ref={carnoRef} required />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Residential Address</Form.Label>
              <Form.Control type="address" ref={addressRef} required />
            </Form.Group>
            <Link to="/otp">
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button></Link>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </div>
    </>
  )
}