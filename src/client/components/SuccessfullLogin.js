import React, { PropTypes } from 'react';
import LogOutButton from './LogOutButton'
const styles = {
  margin: '0 auto',
  maxWidth:'600px',
  textAlign:'center',
  backgroundColor:'rgba(0,0,0,0.5)',
  padding:'20px',
  color: 'white',
  fontFamily:'Helvetica, Helvetic nue, Sans serif'
};
const SuccessfullLogin = () => (
  <section style={styles}>
    <p>You have successfully logged in</p>
    <LogOutButton />
  </section>
);


export default SuccessfullLogin;
