import React, { Component } from 'react';
import { Link, NavLink, withRouter, BrowserRouter as Router } from 'react-router-dom'
import UserService from '../../reactservice/UserService'
const API = new UserService();


class ResetPassword extends Component {

    constructor(props) {
        super(props);
        console.log('xx parms is',
            this.props.match.params.token);

        //let fields2=API.getProfile().data;
        //console.log('fields2:',fields2)
        const query = new URLSearchParams(this.props.location.search);
        const email = query.get('user');
        this.state = {
            useremail: email,
            errors: {},
            fields: {},
            pshowAlert: false,
            presetdata: []
        };
        this.passwordupdate = this.passwordupdate.bind(this);
        this.passwordlinkstatus = this.passwordlinkstatus.bind(this);
    }

    passwordlinkstatus() {
        const Userdata = {
            'useremail': this.state.useremail
        }
        API.getpasswordlinkstatus(Userdata) 
            .then(res => {
                console.log('frontres:', res.data);
                if (res.data.data) {
                    this.setState({
                        presetdata: res.data
                    })
                } else {
                    this.setState({
                        presetdata: res.data
                    })
                }
            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }


    componentDidMount() {
        this.passwordlinkstatus();
    }

    passwordupdateMevalidationCheck() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        // if (!this.refs.password.value) {
        //     formIsValid = false;
        //     errors["password"] = "error_sell form-control";
        // }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "error_sell form-control";
        }
        if (!fields["cpassword"]) {
            formIsValid = false;
            errors["cpassword"] = "error_sell form-control";
        }

        if (fields["password"] != fields["cpassword"]) {
            formIsValid = false;
            errors["cpassword"] = "error_sell form-control";
            errors["password"] = "error_sell form-control";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    
    registerMehandleChange(field, e) {
        console.log(this.state);
        let errors = {};
        let fields = this.state.fields;

        fields[field] = e.target.value;
        this.setState({ fields });
    }

    passwordupdate() {
        if (this.passwordupdateMevalidationCheck()) {
            console.log('cpass sss', this.refs.cpassword.value);
            console.log('xx parms is',
                this.props.match.params.token);
            const userInfoVo = {
                'password': this.refs.password.value,
                'useremail': this.state.useremail,
                'token': this.props.match.params.token
            }
            console.log('userInfoVo123',userInfoVo);
            
            API.emailpasswordResetWithSendEmail(userInfoVo)
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
        console.log('dataaaaa:', this.state.presetdata.data); 
        return (
            <div className="password-profile-section">
                <section id="password-dashboard-main">
                    <div className="container">

                        <div className="row">
                            <div class="inner-page-banner-heading">
                                <h2>RESET PASSWORD</h2>
                            </div>
                            <div className="row dashboard-content-inner">
                                <h5>Reset password for email@email.com</h5>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <form className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="form-group">
                                                <label>Enter new password</label>
                                                <input name="password" ref="password" value={this.state.fields["password"] ? this.state.fields["password"] : ''} onChange={this.registerMehandleChange.bind(this, "password")} type="password" className={this.state.errors["password"] ? this.state.errors["password"] : 'form-control'} placeholder="Password" />
                                                {/* <input type="password" ref="password" className={this.state.errors["password"] ? this.state.errors["password"] : 'form-control'} onChange={this.passwordupdateMehandleChange.bind(this, "password")} name="password" placeholder="password" /> */}
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm new password</label>
                                                <input name="cpassword" ref="cpassword" value={this.state.fields["cpassword"] ? this.state.fields["cpassword"] : ''} onChange={this.registerMehandleChange.bind(this, "cpassword")} type="password" className={this.state.errors["cpassword"] ? this.state.errors["cpassword"] : 'form-control'} placeholder="Confirm Password" />
                                                {/* <input type="password" ref="password" className={this.state.errors["password"] ? this.state.errors["password"] : 'form-control'} onChange={this.passwordupdateMehandleChange.bind(this, "password")} name="password" placeholder="password" /> */}
                                            </div>

                                        </div>
                                    </form>
                                </div>
                                <div className="form-group">
                                    <input type="button" onClick={this.passwordupdate} className="light-btn button" value="RESET PASSWORD" style={{ background: '#7030a0', borderColor: '#7030a0' }} />
                                </div>

                            </div>
                            {/* {this.state.presetdata.data ? (<div className="col-lg-12 col-md-12 col-sm-12">
                                    <div style={{ width:'100%', marginLeft:'0px'}} className="dashboard-content"> 
                                       {this.state.presetdata.data.presetlink == '0' ? (<div className="row dashboard-content-inner"> 
                                            <h5>Your new password:</h5>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                            { this.state.pshowAlert	? (<div style={{background:this.state.color}} className="Idmessage">{this.state.message}</div>) : '' }
                                                <form className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label>Password</label>
                                                            <input type="password" ref="password" className={this.state.errors["password"] ? this.state.errors["password"] : 'form-control'}  onChange={this.passwordupdateMehandleChange.bind(this, "password")}  name="password" placeholder="password" />
                                                        </div>
                                                    </div>


                                                    <div className="col-md-6 col-sm-12">
                                                        <input type="button"  onClick={this.passwordupdate} className="light-btn" value="Save" style={{background:'#7030a0', borderColor: '#7030a0' }}/>
                                                    </div>
                                                </form>
                                            </div>
                                            </div>) : (<div className="row dashboard-content-inner">         
                                                <h5>Password Reset Alert:</h5>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <p> Your password reset link expire. you can change password from 
                                                            reset password option inside your profile.
                                                        </p>
                                                </div>
                                            </div>) }
                                    </div>
                                </div>) :
                                (<div className="col-lg-12 col-md-12 col-sm-12">
                                    <div style={{ width:'100%', marginLeft:'0px'}} className="dashboard-content">
                                            <div className="row dashboard-content-inner">         
                                                <h5>Password Reset Alert:</h5>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                        Something Going wrong please check password reset link.
                                                </div>
                                            </div>
                                    </div>
                                 </div>)
                            } */}


                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(ResetPassword);
