import React, { PropTypes,Component } from 'react';
import { Redirect } from 'react-router-dom'

class LoginPage extends Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        name: '',
        password: '',
        message: '',
        redirect: false
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.changeUser =this.changeUser.bind(this)
  }

  /**
   * Change the user object to update the state when user change value.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    //console.log(field, user)
    this.setState({
      user
    });
  }

  /**
   * Submit the form.
   *
   * @param {object} event - the JavaScript event object
   */
   onSubmit(event) {
     // prevent default action. in this case, action is the form submission event
     event.preventDefault();

     // params to pass back to the server
     const formData = `name=${this.state.user.name}&password=${this.state.user.password}`;

     // create an AJAX request
     const xhr = new XMLHttpRequest();
     const self = this;
     xhr.open('post', '/api/login');
     xhr.setRequestHeader('Accept', 'application/json;charset=UTF-8');
     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
     xhr.responseType = 'json';
     //Call a function when the state changes.
     xhr.onreadystatechange = function() {
       if(xhr.readyState == 4 && xhr.status == 200) {
        // change the component-container state
        self.setState({
          errors: {},
          user: {
            name:'',
            password:'',
            message:'Logged In!!',
            redirect: true
          }
        });
    }else{
      self.setState({
        errors: {
          message:'Please check your username and/or password are correct.'
        }
      });

      // axios.post('/signup', formData, { headers: {'Accept': 'application/json'} })
      // .then((response) => {
      //   this.setState({
      //     callbackResponse: {response.data},
      //   });
      // }).catch((error) => {
      //   const errors = error.response.data.errors ? error.response.data.errors : {};
      //   errors.summary = error.response.data.message;
      //
      //   this.setState({
      //     errors
      //   });
      // });
    }
   }
   //Send the form with the right params.
   xhr.send(formData);
   }

  /**{
   * Render the component.
   */
  render() {
    const { name, password, message, redirect} = this.state.user;

    const styles = {
      margin: '0 auto',
      maxWidth:'600px',
      textAlign:'center',
      backgroundColor:'rgba(0,0,0,0.5)',
      padding:'20px',
      color: 'white',
      fontFamily:'Helvetica, Helvetic nue, Sans serif'
    };

    const stylesInput = {
      width:'100%',
      height:'40px',
      marginBottom: '20px',
      fontSize: '20px',
      color: 'gray',

    };

    const stylesButton = {
      width:'100%',
      height:'40px',
      border:'0 none',
      display: 'inline-block',
      textAlign:'center',
      backgroundColor:'#1179c1',
      fontSize: '20px',
      color: 'white',
      cursor: 'pointer'
    };

    return (

      <div className='login-form' style={ styles}>
        <h2>Please log in to your app.</h2>
        <form onSubmit={this.onSubmit} method="post" >
         <input type="text" name="name" value={name} onChange={this.changeUser} style={stylesInput}/>
         <input type="password" name="password" value={password} onChange={this.changeUser} style={stylesInput}/>
         <button type="submit" style={stylesButton}>Submit</button>
       </form>
       {
         this.state.errors.message ? (
           <p>{this.state.errors.message}</p>
         ) : (
           <p></p>
         )
       }

       {redirect ? <Redirect to='/authorized'/> : null }
     </div>

    );
  }

}

export default LoginPage;
