import React, { Component } from 'react';
import Adminsidebar from './adminsidebar';
import bannerImg from '../adminimg/banner-bg.jpg';
import UserService from '../../reactservice/UserService'
const API = new UserService();
// const newFields = API.getProfile();

class Dashboard extends Component{
    
   constructor(props){
        let fields1=API.getProfile();
        let fields2=API.getProfile().data;
        let newFields;
        if(fields1.data){
            newFields=fields2;
        }else{
            newFields=fields1;
        }
       super(props);
       this.state ={
           fields:newFields
       } 
   }
   render(){
    return(
        <div className="dashboard-section">
               
               

    <section id="main-dashboard">
       <Adminsidebar />

       <div class="dashboard-content">
        <div style={ { backgroundImage: "url("+bannerImg+")" }} class="card hovercard row">
            <div class="card-background col-md-2">
          

                <div class="useravatar">
                    <img alt="" src="https://www.creditinnovationgroup.com/wp-content/uploads/2015/09/profile15.jpg"/>
                </div>
                <div class="card-info"> <span class="card-title">{this.state.fields.name}</span>
                </div>
            </div>

            <div class="col-md-8 other-info-dash">
                <div class="other-info">
                    <ul>
                        <li>Name:  {this.state.fields.name}</li>
                        <li>Email:  {this.state.fields.email}</li>
                        <li>username: {this.state.fields.username}</li>
                        <li>role: Administrator</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="clearfix"></div>
        
        <div class="col-md-12">
            <div class="dashboard-icon-boxes-main">
                <div className="row">

                   
              {/*   <div class="col-md-3 col-sm-6">
                    <div class="dashboard-icon-boxes">
                        <div class="d_inner">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <h3 class="num">3</h3>
                        <p>Users</p></div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="dashboard-icon-boxes">
                        <div class="d_inner">
                        <i class="fa fa-address-book" aria-hidden="true"></i>
                        <h3 class="num">3</h3>
                        <p>Contact</p></div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="dashboard-icon-boxes">
                        <div class="d_inner">
                        <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                        <h3 class="num">3</h3>
                        <p>Ipsum</p></div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="dashboard-icon-boxes">
                        <div class="d_inner">
                        <i class="fa fa-comments" aria-hidden="true"></i>
                        <h3 class="num">6</h3>
                        <p>Doler</p></div>
                    </div>
                </div> */}
                </div>
            </div>
        </div>
        
        <div class="clearfix"></div>
        
        {/* <div id="footer-small">
            <div class="copyright">
                <p>Copyright © 2019 BIM. All rights reserved.</p>
            </div>
        </div> */}
    </div>
    </section>

        </div>
    );
   }
}
export default Dashboard; 