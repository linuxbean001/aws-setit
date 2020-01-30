import React, { Component } from 'react'
import UserService from '../../reactservice/UserService'
import { Link } from 'react-router-dom';
const API = new UserService();

export default class PasswordReset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      fields: {},
      pshowAlert: false,
      presetdata: []
    };
    this.passwordupdate = this.passwordupdate.bind(this)
  }
  passwordupdateMevalidationCheck() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //  if(!this.refs.password.value){
    //      formIsValid = false;
    //      errors["password"] = "error_sell form-control";
    //  }


    this.setState({ errors: errors });
    return formIsValid;
  }

  passwordupdate() {
    if (this.passwordupdateMevalidationCheck()) {
      const userInfoVo = {
        // 'password': this.refs.password.value,
        'useremail': this.refs.useremail.value
      }
      console.log('userinfovo', userInfoVo);

      API.emailpasswordReset(userInfoVo)
        .then((result) => {
          if (result.data.success) {
            this.setState({
              pshowAlert: true,
              color: 'green',
              message: result.data.message
            });
          } else {
            this.setState({
              pshowAlert: true,
              color: '#b31313d6',
              message: result.data.message
            });
          }
        }).catch(err => {
          // console.log('xxx new:', err);
        })
    }
  }
  passwordupdateMehandleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  render() {

    return (

      <div className="row dashboard-content-inner">
        <div class="inner-page-banner-heading forgot">
          <h2>FORGOT PASSWORD OR LOGIN?</h2>
        </div>
        <h5>Forgot your login? <Link to="/front/contact">Please contact us.</Link></h5>
        <h5>Forgotten your password? Please enter your email below:</h5>
      {/* <h5>Please enter your email below if you have forgotten your password.<Link to="/front/contact">Contact us</Link> if you have forgotten your login.</h5> */}
        <div className="col-lg-12 col-md-12 col-sm-12">
          <form className="row">
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <input type="useremail" ref="useremail" className={this.state.errors["useremail"] ? this.state.errors["useremail"] : 'form-control'} onChange={this.passwordupdateMehandleChange.bind(this, "useremail")} name="useremail" placeholder="email" />
              </div>

            </div>


          </form>
        </div>
        <div className="form-group">
          <input type="button" onClick={this.passwordupdate} className="light-btn button" value="SEND RESET LINK" style={{ background: '#7030a0', borderColor: '#7030a0' }} />
        </div>

      </div>


    )
  }
}
