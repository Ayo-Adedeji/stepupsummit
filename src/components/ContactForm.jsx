import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('');

    emailjs.sendForm(
       'service_ktpshr3',     // replace with your EmailJS service ID
      'template_u23e16q',    // replace with your EmailJS template ID
      form.current,
      'CDloQjwc_VHuTtfxV'      // Replace with your EmailJS public key
    )
    .then(
      (result) => {
        console.log(result.text);
        setStatusMessage('Email sent successfully!');
        setIsLoading(false);
        e.target.reset();
      },
      (error) => {
        console.log(error.text);
        setStatusMessage('Failed to send email. Please try again.');
        setIsLoading(false);
      }
    );
  };

  return (

   
    <form ref={form} onSubmit={sendEmail}>
      <div className='max-w-2xl mx-auto bg-gray-100 p-5 rounded-lg mb-5'>
        <p>First Name</p>
        <input
          className='border rounded-md w-full p-2 mb-5 outline-none'
          type='text'
          name='firstName'  // Matches EmailJS template
          placeholder='Your first name'
          required
        />

        <p>Your Email</p>
        <input
          className='border rounded-md w-full p-2 mb-5 outline-none'
          type='email'
          name='email'      // Matches EmailJS template
          placeholder='you@example.com'
          required
        />

        <p>Your Message</p>
        <textarea
          name='message'    // Matches EmailJS template
          className='border w-full border-primaryBlue bg-secondary rounded-xl p-3 outline-none h-36 mt-5 mb-5'
          placeholder='Your message'
          required
        ></textarea>

        <button
          type='submit'
          disabled={isLoading} // Prevent multiple clicks
          className={`border px-8 py-3 rounded-xl transition-all duration-300 ease-in-out ${
            isLoading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-primaryBlue text-white hover:bg-accentLightBlue'
          }`}
        >
          {isLoading ? 'Sending...' : 'Submit'}
        </button>

        {statusMessage && (
          <p className='mt-4 text-center text-green-600 font-semibold'>
            {statusMessage}
          </p>
        )}
      </div>

      <div className='mt-12 mb-16 text-center'>
        <p className='text-xl font-bold text-accentYellowDark'>
          Step up. <span className='text-primaryBlue'>Stand out.</span>{' '}
          <span className='text-green-600'>Shape the future.</span>
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
