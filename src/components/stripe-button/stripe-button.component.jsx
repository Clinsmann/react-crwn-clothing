import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_Qe6LJEfaA63GUwSayyDJ7EH100IaSZ6XLs';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CROWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={ `Your total is ${price}` }
      amount={ priceForStripe }
      panelLabel='Pay Now'
      token={ onToken }
      stripeKey={ publishableKey }
    />
  )
};

// 4242 4242 4242 4242 - Exp: 01/20 - CVV: 123

export default StripeCheckoutButton;