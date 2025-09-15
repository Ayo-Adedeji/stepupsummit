import React from 'react'

const ContactForm = () => {
  return (
    <form>
    <div>
        <p>First Name</p>
        <input type='text' name='firstName' />
        <p>Your Email</p>
        <input type='email' name='email' />
    </div>
    </form>
  )
}

export default ContactForm