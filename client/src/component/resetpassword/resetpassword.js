import React, { Component } from 'react';
import decode from 'jwt-decode'
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
            msgModal: false,
            signButton: true,
            newPassword: 'password',
            confirmPassword: 'password',
            userTokenEmail: '',
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
        this.getEmailByToken();
        document.title = "RESET PASSWORD - SET IT AND LEAVE IT"
    }
    showHideNewPassword = () => {
        this.setState({
            newPassword: 'text'
        })
    }
    hideNewPassword = () => {
        this.setState({
            newPassword: 'password'
        })
    }
    showHideConfirmPassword = () => {
        this.setState({
            confirmPassword: 'text'
        })
    }
    hideConfirmPassword = () => {
        this.setState({
            confirmPassword: 'password'
        })
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
    signMe = () => {
        this.props.history.replace('/front/register')
    }

    passwordupdate() {

        if (this.passwordupdateMevalidationCheck()) {
            console.log('cpass sss', this.refs.cpassword.value);
            console.log('xx parms is', this.props.match.params.token);
            const userInfoVo = {
                'password': this.refs.password.value,
                'useremail': this.state.useremail,
                'token': this.props.match.params.token
            }

            console.log('useremailuseremail', userInfoVo);
            API.emailpasswordResetWithSendEmail(userInfoVo)
                .then((result) => {
                    if (result.data.success) {
                        this.setState({
                            pshowAlert: true,
                            color: 'green',
                            message: result.data.message,
                            msgModal: true,
                            signButton: false
                        });
                        // setTimeout(() => {
                        //     this.setState({
                        //         msgModal: false
                        //     })
                        // }, 2000)
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
    getEmailByToken = () => {
        console.log('decodedecode', decode(this.props.match.params.token));
        const email = decode(this.props.match.params.token).email
        this.setState({
            userTokenEmail: email
        })
        // const userInfoVo = {
        //     'token': this.props.match.params.token
        // }
        // API.getEmailByToken(userInfoVo)
        //     .then((result) => {
        //         console.log('resultresultresultresultresult',result);
        //         this.setState({
        //             userTokenEmail: result.data.data
        //         })

        //     })
    }

    passwordupdateMehandleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        console.log('dataaaaa:', this.state.presetdata.data);
        return (
            // <div className="password-profile-section">
            //     <section id="password-dashboard-main">
            //         <div className="container">

            //             <div className="row">
            //                 <div class="inner-page-banner-heading">
            //                     <h2>RESET PASSWORD</h2>
            //                 </div>
            //                 <div className="row dashboard-content-inner">
            //               <h5>Reset password for {this.state.useremail}</h5>
            //                     <div className="col-lg-12 col-md-12 col-sm-12">
            //                         <form className="row">
            //                             <div className="col-md-6 col-sm-12">
            //                                 <div className="form-group">
            //                                     <label>Enter new password</label>
            //                                     <input name="password" ref="password" value={this.state.fields["password"] ? this.state.fields["password"] : ''} onChange={this.registerMehandleChange.bind(this, "password")} type="password" className={this.state.errors["password"] ? this.state.errors["password"] : 'form-control'} placeholder="Password" />

            //                                 </div>
            //                                 <div className="form-group">
            //                                     <label>Confirm new password</label>
            //                                     <input name="cpassword" ref="cpassword" value={this.state.fields["cpassword"] ? this.state.fields["cpassword"] : ''} onChange={this.registerMehandleChange.bind(this, "cpassword")} type="password" className={this.state.errors["cpassword"] ? this.state.errors["cpassword"] : 'form-control'} placeholder="Confirm Password" />

            //                                 </div>

            //                             </div>
            //                         </form>
            //                     </div>
            //                     <div className="form-group">
            //                         <input type="button" onClick={this.passwordupdate} className="light-btn button" value="RESET PASSWORD" style={{ background: '#7030a0', borderColor: '#7030a0' }} />
            //                     </div>
            //                 </div>
            //                 {this.state.msgModal ? <div className="msgclass"><p className="resetmsg">YOU HAVE SUCCESSFULLY RESET YOUR PASSWORD</p></div> : ''}



            //             </div>
            //         </div>
            //     </section>
            // </div>

            <div className="row">

                <div class="inner-page-banner-heading">
                    <h2>RESET PASSWORD</h2>
                </div>
                <div className="dashboard-content-inner">
                    <div className="row">
                        <h5>Reset password for {this.state.userTokenEmail}</h5>
                        {/* <h5 className="dash">Forgot your login? <Link to="/front/contact">Please contact us.</Link></h5>
                    <h5>Forgotten your password? Please enter your email below:</h5> */}
                        {/* <h5>Please enter your email below if you have forgotten your password.<Link to="/front/contact">Contact us</Link> if you have forgotten your login.</h5> */}
                        <div className="col-lg-12 col-md-12 col-sm-12">

                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label>Enter new password</label>
                                    <input name="password" ref="password" value={this.state.fields["password"] ? this.state.fields["password"] : ''} onChange={this.registerMehandleChange.bind(this, "password")} type={this.state.newPassword} className={this.state.errors["password"] ? this.state.errors["password"] : 'form-control'} placeholder="Password" />

                                    {this.state.newPassword == 'password' ? <button className="newpass" onClick={this.showHideNewPassword}>Show</button> : <button className="newpass" onClick={this.hideNewPassword}>Hide</button>}



                                </div>
                                <div className="form-group">
                                    <label>Confirm new password</label>
                                    <input name="cpassword" ref="cpassword" value={this.state.fields["cpassword"] ? this.state.fields["cpassword"] : ''} onChange={this.registerMehandleChange.bind(this, "cpassword")} type={this.state.confirmPassword} className={this.state.errors["cpassword"] ? this.state.errors["cpassword"] : 'form-control'} placeholder="Confirm Password" />
                                    {/* <button onClick={this.showHideConfirmPassword}>Show</button> */}
                                    {this.state.confirmPassword == 'password' ? <button className="newpass" onClick={this.showHideConfirmPassword}>Show</button> : <button className="newpass" onClick={this.hideConfirmPassword}>Hide</button>}
                                </div>

                            </div>


                        </div>

                        <div style={{ width: "100%" }} className="form-group">
                            {this.state.signButton ? <input type="button" onClick={this.passwordupdate} className="light-btn button" value=" RESET PASSWORD" style={{ background: '#7030a0', borderColor: '#7030a0' }} /> : ''}
                        </div>
                        {this.state.msgModal ? <div className="msgclass1234"><p style={{ paddingLeft: "22px" }} className="resetmsg123">YOUR PASSWORD IS NOW CHANGED. PLEASE USE THE <br />LINK BELOW TO SIGN-IN.</p></div> : ''}
                        {this.state.signButton ? '' : <div style={{ width: "100%" }}><input type="button" onClick={this.signMe} className="light-btn button" value="SIGN-IN" style={{ background: '#7030a0', borderColor: '#7030a0' }} /></div>}
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(ResetPassword);
