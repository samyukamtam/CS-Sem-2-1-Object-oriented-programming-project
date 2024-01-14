import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import firebase from '../firebase'

export default function Signup() {
  const locationRef = useRef()
  const checkinRef = useRef()
  const checkoutRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
      setError("")
      setLoading(true)
      firebase.firestore().collection('users').add({
        location: locationRef.current.value,
        checkin: checkinRef.current.value,
        checkout: checkoutRef.current.value,
        roleId: 3
      })
      History.push("/")
    // } catch(error) {
    //   setError("Failed to create an account"+error)
    // }

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
            <Form.Group id="location">
              <Form.Label>Location</Form.Label>
              <Form.Control type="location" ref={locationRef} required />
            </Form.Group>
            <Form.Group id="checkin">
              <Form.Label>Checkin</Form.Label>
              <Form.Control type="checkin" ref={checkinRef} required />
            </Form.Group>
            <Form.Group id="checkout">
              <Form.Label>Checkout</Form.Label>
              <Form.Control type="checkout" ref={checkoutRef} required />
            </Form.Group>
            <Link to="/UserDashboard"> 
            <Button disabled={loading} className="w-100" type="submit">
              Submit</Button></Link>
          </Form>
        </Card.Body>
      </Card>
      </div>
    </>
  )
}