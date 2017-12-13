import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'

const stylesButton = {
  width:'100%',
  height:'40px',
  border:'0 none',
  display: 'block',
  textAlign:'center',
  backgroundColor:'#1179c1',
  fontSize: '20px',
  color: 'white',
  cursor: 'pointer',
  textDecoration:'none'
};
const LogOutButton = () => (
  <Link to='/login' style={stylesButton}><span>Log out</span></Link>
);


export default LogOutButton;
