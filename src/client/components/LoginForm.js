import React, { PropTypes } from 'react';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <div>
    <form onSubmit={onSubmit} method="post">
     <input type="text" name="name" value={user.name} onChange={onChange}/>
     <input type="password" name="password" value={user.password} onChange={onChange}/>
     <button type="submit">Submit</button>
   </form>
   {
     this.state.errors.message ? (
       <p>{this.state.errors.message}</p>
     ) : (
       <p></p>
     )
   }
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
