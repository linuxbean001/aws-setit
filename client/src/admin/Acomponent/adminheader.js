import React, { Component } from 'react';
import { withRouter, BrowserRouter as Router } from 'react-router-dom'
 import '../admincss/admin-style.css';
import '../admincss/admin-custom-menu.css';
import '../admincss/responsive.css';
import logo from '../../assets/img/logo1.png';
import UserService from '../../reactservice/UserService'
const API = new UserService();
class adminHeader extends Component{
   constructor(props){
       super(props); 
       this.state ={
       } 
   }

 componentDidMount(){
    if (!API.loggedIn()){
        this.props.history.replace('/front');
        console.log('Not login user');
    }else{
      if(API.getProfile().role == '1'){
         this.props.history.replace('/front/profile');
      }
    }
 }  

   render(){
    return(
        <div className="adminheader-section">
        <header class="adminheader">
        <div class="wsmenucontainer clearfix">
            <div id="overlapblackbg"></div>
            <div class="wsmobileheader clearfix">
                <div class="smallogo"><a href="/admin"><img src={logo} alt=""/></a></div>
            </div>

            <div class="headerfull navigation" id="">
               
                <div class="wsmain">
                    <div class="smllogo"><a href="/admin"><img src={logo} alt=""/></a></div>
                    <nav class="wsmenu clearfix">
                        <ul class="mobile-sub wsmenu-list">
         
                        </ul>

                        <ul class="mobile-sub wsmenu-list">
                            <li>
                                <a href="#" class="navtext pad"><span></span>Admin</a>
                            </li>

                        </ul>

                    </nav>
                </div>
               

                <div id="top-search-bar" class="collapse" aria-expanded="true" >
                    <div class="container">
                        <form role="search" action="#" class="search_form_top" method="get">
                            <input type="text" placeholder="Type text and press Enter..." name="s" class="form-control" autocomplete="off"/>
                            <span data-toggle="collapse" data-target="#top-search-bar" class="search-close"><i class="fa fa-times"></i></span>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </header>

        </div>
    );
   }
}
export default withRouter (adminHeader); 