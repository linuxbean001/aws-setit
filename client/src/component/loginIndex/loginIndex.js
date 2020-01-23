import React, { Component } from 'react';
import { Link, withRouter, BrowserRouter as Router } from 'react-router-dom'
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here
import UserService from '../../reactservice/UserService'
const API = new UserService();
class LoginIndex extends Component{
   constructor(props){
    let fields1 = API.getProfile();
    let fields2 = API.getProfile().data;
    let newFields;
    if (fields1.data) {
        newFields = fields2;
    } else {
        newFields = fields1;
    }


       super(props);
       this.state ={
           isHide:false,
           fields: newFields,
       }
   }


       
    render(){
        return(
        <div className="loginIndex-section">  
            <ScrollUpButton />
        <section id="loginIndex">
            <div className="container">
                <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div style={{ width:'100%', marginLeft:'0px'}} className="dashboard-contents dashboardcontent">
                            <div className="dashboardcolum">         
                                <h5 style={{color:'#000'}}>­ Logged in as {this.state.fields.email}</h5>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 contSet">
                               <div className="login-index">
                               <a href="/front/tool" className="light-btn"  style={{background:'#7030a0', borderColor: '#7030a0', marginTop:'30px', marginBottom:'30px' }}>TOOL </a>
                                
                                <a href="/front/profile" className="light-btn"  style={{background:'#7030a0', borderColor: '#7030a0',marginTop:'30px', marginBottom:'30px' }}>USER PROFILE </a>
                               </div>
                                    
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        </div>

            );
        }
      }
      
      export default withRouter(LoginIndex);