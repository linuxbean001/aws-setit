import React, { Component } from 'react';
import {Link,NavLink,withRouter, BrowserRouter as Router } from 'react-router-dom'
import UserService from '../../reactservice/UserService'
const API = new UserService();


class ResetPassword extends Component{
    
   constructor(props){
       super(props);
       //let fields2=API.getProfile().data;
       //console.log('fields2:',fields2)
       const query = new URLSearchParams(this.props.location.search);
       const email = query.get('user');
       this.state ={
              useremail:email ,
              errors: {},
              fields:{},
              pshowAlert:false,
              presetdata:[]
       };
       this.passwordupdate = this.passwordupdate.bind(this);
       this.passwordlinkstatus = this.passwordlinkstatus.bind(this);
   }

passwordlinkstatus(){
    const Userdata ={
        'useremail':this.state.useremail
    }
    API.getpasswordlinkstatus(Userdata)
      .then(res => {
          console.log('frontres:',res.data);
          if(res.data.data){
            this.setState({
                presetdata:res.data
            })
          }else{
            this.setState({
                presetdata:res.data
            })
          }
      }).catch(err => {
          console.log('xxxxxxx xxxx ', err);
      });
}   


componentDidMount(){
    this.passwordlinkstatus();
}

passwordupdateMevalidationCheck(){
    // console.log('222222222');
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

   if(!this.refs.password.value){
       formIsValid = false;
       errors["password"] = "error_sell form-control";
   }

   
    this.setState({errors:errors});
    return formIsValid;
}


passwordupdate(){  
    if(this.passwordupdateMevalidationCheck()){ 
        const userInfoVo ={
            'password': this.refs.password.value,
            'useremail': this.state.useremail
        }
        API.emailpasswordReset(userInfoVo)
        .then((result) => {
            if(result.data.success){
                this.setState({
                    pshowAlert:true,
                    color:'green',
                    message: result.data.message
                });
            }else{
                this.setState({
                    pshowAlert:true,
                    color:'#b31313d6',
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

render(){
console.log('dataaaaa:', this.state.presetdata.data);
        return(
                   <div className="password-profile-section">        
                    <section id="password-dashboard-main">
                        <div className="container">
                          
                            <div className="row">
               
                            {this.state.presetdata.data ? (<div className="col-lg-12 col-md-12 col-sm-12">
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

                                                    {/*  onClick={this.profileupdate}  <input type="hidden" ref="id" className="form-control" name="id" onChange={this.updateMehandleChange.bind(this, "id")} defaultValue={this.state.fields._id}/> */}

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
                            }


                            </div>
                        </div>
                    </section>
                   </div>
        );
  }
}

export default withRouter (ResetPassword);
