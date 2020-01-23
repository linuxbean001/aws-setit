import React, { Component } from 'react';
import {Link,NavLink,withRouter, BrowserRouter as Router } from 'react-router-dom'
import UserService from '../../reactservice/UserService'
const API = new UserService();
class EmailVerification extends Component{
   constructor(props){
       super(props);
       //let fields2=API.getProfile().data;
       //console.log('fields2:',fields2)
       const query = new URLSearchParams(this.props.location.search);
       const email = query.get('email');
       this.state ={
              useremail:email ,
              errors: {},
              fields:{},
              pshowAlert:false,
              presetdata:[]
       };
       this.emailverificationStatus = this.emailverificationStatus.bind(this);
   }

emailverificationStatus(){
    const Userdata ={
        'useremail':this.state.useremail
    }
    API.getemailverificationStatus(Userdata)
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
    this.emailverificationStatus();
}



render(){
console.log('dataaaaa:', this.state.presetdata.data);
        return(
                   <div className="password-profile-section">        
                    <section id="password-dashboard-main">
                        <div className="container">
                          
                            <div className="row">
                            {this.state.presetdata.data ? ( <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div style={{ width:'100%', marginLeft:'0px'}} className="dashboard-contents dashboardcontent">
                                            <div className="dashboardcolum successborad">         
                                                <h5>Your email has successfully been verified.</h5>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                <h5> Thank you for your interest in Set It and Leave It! </h5>
                                                </div>
                                              
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 contSet">
                                                        <a href="/front/register" className="light-btn"  style={{background:'#7030a0', borderColor: '#7030a0',marginTop:'30px', marginBottom:'30px' }}>CONTINUE </a>
                                            </div>
                                    </div>
                                 </div>
                            ) :
                            (<div className="col-lg-12 col-md-12 col-sm-12">
                                <div style={{ width:'100%', marginLeft:'0px'}} className="dashboard-contents dashboardcontent">
                                        <div className="dashboardcolum dangerborad">         
                                            <h5>Email Verification Alert:</h5>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                 <h5> Something Going wrong please check verification link.</h5>
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

export default withRouter (EmailVerification);
