import React, { Component } from 'react';
import { Link,NavLink, withRouter, BrowserRouter as Router } from 'react-router-dom'
import MetisMenu from 'react-metismenu';

import UserService from '../../reactservice/UserService'
const API = new UserService();

const Menucontent=[
    {
        icon: 'metismenu-icon fa fa-tachometer',
        label: 'Dashboard',
        to: '/admin',
    },
    {
        icon: 'metismenu-icon fa fa-user',
        label: 'Users',
        to: '/admin/userlist',
    },
    {
        icon: 'metismenu-icon fa fa-list-alt',
        label: 'Contact',
        to: '/admin/contactlist',
    },
    {
        icon: 'metismenu-icon fa fa-cogs',
        label: 'Activity Log',
        to: '/admin/activitylog',
    },
    {
        icon: 'metismenu-icon fa fa-home',
        label: 'Home',
        content: [
            {
                icon: 'metismenu-icon fa fa-sliders',
                label: 'Slider',
                content: [
                    {
                        icon: 'metismenu-icon fa fa-plus-square',
                        label: 'New Slider',
                        to: '/admin/addslider',
                    },
                    {
                        icon: 'metismenu-icon fa fa-list',
                        label: 'Slider List',
                        to: '/admin/sliderlist',
                    },
                ],
            },
            {
                icon: 'metismenu-icon fa fa-envira',
                label: 'EIC',
                content: [
                    {
                        icon: 'metismenu-icon fa fa-plus-square',
                        label: 'New EIC',
                        to: '/admin/addEic',
                    },
                    {
                        icon: 'metismenu-icon fa fa-list',
                        label: 'EIC List',
                        to: '/admin/Eiclist',
                    },
                ],
            },
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Who can use it',
                to: '/admin/whocanuseit',
            },
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Peace of mind',
                to: '/admin/peaceofmind',
            },
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Easy to use',
                to: '/admin/easytouse',
            },
        ],
    },
    {
        icon: 'metismenu-icon fa fa-file',
        label: 'Traditional',
        content: [
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Overview',
                to: '/admin/pages/traditional/overview',
            },
            {
                icon: 'metismenu-icon fa fa-tasks',
                label: 'Tabs',
                content:[
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Background',
                        to: '/admin/pages/traditional/background',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Safe withdrawal rate',
                        to: '/admin/pages/traditional/withdrawalrate',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Variable annuities',
                        to: '/admin/pages/traditional/variableannuities',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Executive summary',
                        to: '/admin/pages/traditional/executivesummary',
                    },
               ],
            },
            {
                icon: 'metismenu-icon fa fa-tasks',
                label: 'Accordian',
                content:[
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Add Accordian',
                        to: '/admin/pages/traditional/addaccordian',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Accordian List',
                        to: '/admin/pages/traditional/accordianlist',
                    }
               ],
            },
            {
                icon: 'metismenu-icon fa fa-tasks',
                label: 'Table Row',
                content:[
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Add Table Row',
                        to: '/admin/pages/traditional/addtablerow',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Table Row List',
                        to: '/admin/pages/traditional/tablerowlist',
                    }
               ],
            },
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Indexes',
                to: '/admin/pages/traditional/indexes',
            },
        ],
    },
    {
        icon: 'metismenu-icon fa fa-file',
        label: 'Set It And Leave It',
        content: [
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Overview',
                to: '/admin/pages/setitandleaveit/overview',
            },
            {
                icon: 'metismenu-icon fa fa-tasks',
                label: 'Tabs',
                content:[
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Background',
                        to: '/admin/pages/setitandleaveit/background',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Mechanics',
                        to: '/admin/pages/setitandleaveit/mechanics',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Pros & cons',
                        to: '/admin/pages/setitandleaveit/prosandcons',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Example',
                        to: '/admin/pages/setitandleaveit/example',
                    },
               ],
            },
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Indexes',
                to: '/admin/pages/setitandleaveit/indexes',
            },
        ],
    },
    {
        icon: 'metismenu-icon fa fa-file-video-o',
        label: 'Videos',
        content: [
            {
                icon: 'metismenu-icon fa fa-bandcamp',
                label: 'Video Banner',
                to: '/admin/pages/videos/title',
            },
            {
                icon: 'metismenu-icon fa fa-video-camera',
                label: 'Contents & Videos',
                content:[
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Content & Video 1',
                        to: '/admin/pages/videos/video1',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Content & Video 2',
                        to: '/admin/pages/videos/video2',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Content & Video 3',
                        to: '/admin/pages/videos/video3',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Content & Video 4',
                        to: '/admin/pages/videos/video4',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Content & Video 5',
                        to: '/admin/pages/videos/video5',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Content & Video 6',
                        to: '/admin/pages/videos/video6',
                    },
               ],
            },
        ],
    },
    {
        icon: 'metismenu-icon fa fa-file',
        label: 'Research',
        content: [
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Overview',
                to: '/admin/pages/research/overview',
            },
            {
                icon: 'metismenu-icon fa fa-tasks',
                label: 'Tabs',
                content:[
                    {
                        icon: 'metismenu-icon fa fa-envira',
                        label: 'Our Research',
                        content: [
                            {
                                icon: 'metismenu-icon fa fa-plus-square',
                                label: 'Add New Research',
                                to: '/admin/pages/research/addourresearch',
                            },
                            {
                                icon: 'metismenu-icon fa fa-list',
                                label: 'Our Research List',
                                to: '/admin/pages/research/ourresearchlist',
                            },
                        ],
                    },
                    {
                        icon: 'metismenu-icon fa fa-envira',
                        label: 'Other Resources',
                        content: [
                            {
                                icon: 'metismenu-icon fa fa-plus-square',
                                label: 'Add New Resources',
                                to: '/admin/pages/research/addotherresource',
                            },
                            {
                                icon: 'metismenu-icon fa fa-list',
                                label: 'Other Resources List',
                                to: '/admin/pages/research/otherresourcelist',
                            },
                        ],
                    },
               ],
            },
        ],
    },
    {
        icon: 'metismenu-icon fa fa-question-circle',
        label: 'FAQ',
        content: [
            {
                icon: 'metismenu-icon fa fa-bandcamp',
                label: 'FAQ Banner',
                to: '/admin/faqbanner',
            },
            {
                icon: 'metismenu-icon fa fa-plus-square',
                label: 'Add FAQ',
                to: '/admin/addfaq',
            },
            {
                icon: 'metismenu-icon fa fa-list',
                label: 'FAQ List',
                to: '/admin/faqlist',
            },
        
        ],
    },
    {
        icon: 'metismenu-icon fa fa-paper-plane-o',
        label: 'Service',
        content: [
            {
                icon: 'metismenu-icon fa fa-bandcamp',
                label: 'Service Banner',
                to: '/admin/servicebanner',
            },
            {
                icon: 'metismenu-icon fa fa-angellist',
                label: 'Service Solution',
                to: '/admin/servicesolution',
            },
            {
                icon: 'metismenu-icon fa fa-file',
                label: 'Services',
                content: [ 
                    {
                        icon: 'metismenu-icon fa fa-plus-square',
                        label: 'New Services',
                        to: '/admin/addservices',
                    },
                    {
                        icon: 'metismenu-icon fa fa-list',
                        label: 'Services List',
                        to: '/admin/serviceslist',
                    },

                ],
            },
            {
                icon: 'metismenu-icon fa fa-file',
                label: 'Service Pricing',
                content: [ 
                    {
                        icon: 'metismenu-icon fa fa-plus-square',
                        label: 'New Pricing',
                        to: '/admin/addpricing',
                    },
                    {
                        icon: 'metismenu-icon fa fa-list',
                        label: 'Pricing List',
                        to: '/admin/pricinglist',
                    },

                ],
            },
        
        ],
    },
    {
        icon: 'metismenu-icon fa fa-assistive-listening-systems',
        label: 'About',
        content: [
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Overview',
                to: '/admin/pages/about/overview',
            },
            {
                icon: 'metismenu-icon fa fa-tasks',
                label: 'Tabs',
                content:[
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Motivation',
                        to: '/admin/pages/about/motivation',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'My background',
                        to: '/admin/pages/about/mybackground',
                    },
                    {
                        icon: 'metismenu-icon fa fa-plus-square-o',
                        label: 'Evolution ',
                        to: '/admin/pages/about/evolution',
                    },
                    
               ],
            },
           
        ],
    },
    {
        icon: 'metismenu-icon fa fa-assistive-listening-systems',
        label: 'Questionnaire',
        content: [
            {
                icon: 'metismenu-icon fa fa-plus-square-o',
                label: 'Questionnaire List',
                to: '/admin/questionnairelist',
            }, 
        ],
    },
];

class Adminsidebar extends Component{
   constructor(props){
       super(props);
       this.state ={
           menuClass:false   
    } 
   }

logout = () => {
    API.logout();
    this.props.history.replace('/front/register');
}

handleClick=()=>{

    this.setState({
        menuClass : !this.state.menuClass
    })
}


   render(){
      
       
    return(
        <div className="sidebar-section">
            <div class="dashboard-sidebar">
            <i onClick={this.handleClick} class={this.state.menuClass ? 'fa fa-cogs visible-xs d_slide navigation_button' : 'fa fa-cogs visible-xs d_slide navigation_button_left'}  aria-hidden="true" ></i>
           
            <nav className={this.state.menuClass ? 'woocommerce-MyAccount-navigation left_panel navigation_slide' : 'woocommerce-MyAccount-navigation left_panel'}>
            <div className="menuhead">Main Menu</div>
            <MetisMenu content={Menucontent} activeLinkFromLocation />
            
        <li class="metismenu-item">
            <a class="metismenu-link"  onClick={this.logout.bind(this)} href="javascript:void(0)"><i class="metismenu-icon fa fa-metismenu-icon fa fa-sign-out"></i>Logout</a>
        </li>
           </nav>
             {/* <nav class="woocommerce-MyAccount-navigation left_panel">
                <div className="menuhead"> Main Menu</div>
                {/* <MetisMenu content={Menucontent} activeLinkFromLocation /> */}
               
                {/* <ul className="admin-mainmenu">

                    <li class="is-active">
                        <NavLink to={"/admin"} activeClassName="active" ><i class="fa fa-tachometer aj_fa" aria-hidden="true"></i>Dashboard</NavLink>
                    </li>

                    <li class="is-active">
                        <NavLink to={"/admin/userlist"} activeClassName="active" ><i class="fa fa-user aj_fa" aria-hidden="true"></i>Users</NavLink>
                    </li>
                    <li class="is-active">
                        <NavLink to={"/admin/contactlist"} activeClassName="active" ><i class="fa fa-list-alt aj_fa" aria-hidden="true"></i>Contact</NavLink>
                    </li>
                    <li class="is-active">
                        <NavLink to={"/admin/activitylog"} activeClassName="active" ><i class="fa fa-cogs aj_fa" aria-hidden="true"></i>Activity Log</NavLink>
                    </li>

                    <li class="is-active">
                        <NavLink><i class="fa fa-home aj_fa" aria-hidden="true"></i>Home <i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>
                        <ul className="adminsubmenu">
                            <li class="is-active">
                                 <NavLink activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Slider <i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>

                                    <ul className="adminsubmenu-menu">
                                        <li class="is-active">
                                            <NavLink to={'/admin/addslider'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>New Slider</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/sliderlist'} activeClassName="active" ><i class="fa fa-th-list subaj_fa" aria-hidden="true"></i>Slider List</NavLink>
                                        </li>
                                    </ul>

                            </li>
                            <li class="is-active">
                                 <NavLink activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> EIC</NavLink>
                                 <ul className="adminsubmenu-menu">
                                        <li class="is-active">
                                            <NavLink to={'/admin/addEic'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>New EIC</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/Eiclist'} activeClassName="active" ><i class="fa fa-th-list subaj_fa" aria-hidden="true"></i>EIC List</NavLink>
                                        </li>
                                    </ul>  
                           
                            </li>
                            <li class="is-active">
                                 <NavLink to={'/admin/whocanuseit'} activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Who can use it</NavLink>
                            </li>
                            <li class="is-active">
                                 <NavLink to={'/admin/peaceofmind'} activeClassName="active" ><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Peace of mind</NavLink>
                            </li>
                            <li class="is-active">
                                 <NavLink to={'/admin/easytouse'} activeClassName="active" ><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Easy to use</NavLink>
                            </li>
                        </ul>
                    </li>
                 
					<li class="is-active">
                        <NavLink><i class="fa fa-book aj_fa" aria-hidden="true"></i>Traditional <i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>
                        <ul className="adminsubmenu">
                            <li class="is-active">
                                 <NavLink activeClassName="active" to={'/admin/pages/traditional/overview'}><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Overview</NavLink>
                            </li>
                            <li class="is-active">
                                 <NavLink activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Tabs <i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>

                                    <ul className="adminsubmenu-menu">
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/traditional/background'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>BACKGROUND</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/traditional/withdrawalrate'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>SAFE WITHDRAWAL RATE</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/traditional/variableannuities'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>VARIABLE ANNUITIES</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/traditional/executivesummary'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>EXECUTIVE SUMMARY</NavLink>
                                        </li>
                                    </ul>
                            </li>
                            <li class="is-active">
                                 <NavLink activeClassName="active" to={'/admin/pages/traditional/indexes'}><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Indexes</NavLink>
                            </li>
                        </ul>
                    </li>
					
					
					<li class="is-active">
                        <NavLink><i class="fa fa-book aj_fa" aria-hidden="true"></i>Set It And Leave It<i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>
                        <ul className="adminsubmenu">
                            <li class="is-active">
                                 <NavLink activeClassName="active" to={'/admin/pages/setitandleaveit/overview'}><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Overview</NavLink>
                            </li>
                            <li class="is-active">
                                 <NavLink activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Tabs <i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>

                                    <ul className="adminsubmenu-menu">
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/setitandleaveit/background'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>BACKGROUND</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/setitandleaveit/mechanics'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>MECHANICS</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/setitandleaveit/prosandcons'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>PROS & CONS</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/setitandleaveit/example'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>EXAMPLE</NavLink>
                                        </li>
                                    </ul>
                            </li>
                            <li class="is-active">
                                 <NavLink activeClassName="active" to={'/admin/pages/setitandleaveit/indexes'}><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Indexes</NavLink>
                            </li>
                        </ul>
                    </li>
					
					
				   <li class="is-active">
                        <NavLink><i class="fa fa-book aj_fa" aria-hidden="true"></i>Videos<i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>
                        <ul className="adminsubmenu">
                            <li class="is-active">
                                 <NavLink activeClassName="active" to={'/admin/pages/videos/title'}><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Title</NavLink>
                            </li>
                            <li class="is-active">
                                 <NavLink activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Contents & Videos <i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>

                                    <ul className="adminsubmenu-menu">
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/videos/video1'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>Content & Video 1</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/videos/video2'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>Content & Video 2</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/videos/video3'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>Content & Video 3</NavLink>
                                        </li>
                                    </ul>
                            </li>
                        </ul>
                    </li>
					


                    <li class="is-active">
                        <NavLink><i class="fa fa-bar-chart aj_fa" aria-hidden="true"></i>FAQ <i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>
                        <ul className="adminsubmenu">
                            <li class="is-active">
                                 <NavLink to={'/admin/faqbanner'} activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i>FAQ Banner</NavLink>
                            </li>
                            <li class="is-active">
                                 <NavLink to={'/admin/addfaq'} activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Add FAQ</NavLink>
                            </li>
                            <li class="is-active">
                                 <NavLink to={'/admin/faqlist'} activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> FAQ List</NavLink>
                            </li>
                        </ul>
                    </li>

                    <li class="is-active">
                        <NavLink  activeClassName="active" ><i class="fa fa-wrench aj_fa" aria-hidden="true"></i>Service</NavLink>
                    
                        <ul className="adminsubmenu">
                            <li class="is-active">
                                 <NavLink to={'/admin/servicebanner'} activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i>Service Banner</NavLink>
                            </li>
                             <li class="is-active">
                                 <NavLink to={'/admin/servicesolution'} activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i>Service Solution</NavLink>
                            </li>
                            <li class="is-active">
                                 <NavLink activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i>Services</NavLink>
                                 <ul className="adminsubmenu-menu">
                                        <li class="is-active">
                                            <NavLink to={'/admin/addservices'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>New Services</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/serviceslist'} activeClassName="active" ><i class="fa fa-th-list subaj_fa" aria-hidden="true"></i>Services List</NavLink>
                                        </li>
                                    </ul>  
                           
                            </li>

                            <li class="is-active">
                                 <NavLink activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i>Service Pricing</NavLink>
                                 <ul className="adminsubmenu-menu">
                                        <li class="is-active">
                                            <NavLink to={'/admin/addpricing'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>New Pricing</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pricinglist'} activeClassName="active" ><i class="fa fa-th-list subaj_fa" aria-hidden="true"></i>Pricing List</NavLink>
                                        </li>
                                    </ul>  
                           
                            </li>

                           
                        </ul>

                    </li>

                     <li class="is-active">
                        <NavLink><i class="fa fa-book aj_fa" aria-hidden="true"></i>About<i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>
                        <ul className="adminsubmenu">
                            <li class="is-active">
                                 <NavLink activeClassName="active" to={'/admin/pages/about/overview'}><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Overview</NavLink>
                            </li>
                            <li class="is-active">
                                 <NavLink activeClassName="active"><i class="fa fa-caret-right subaj_fa" aria-hidden="true"></i> Tabs <i class="fa fa-angle-down dropicon" aria-hidden="true"></i></NavLink>

                                    <ul className="adminsubmenu-menu">
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/about/motivation'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>MOTIVATION</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/about/mybackground'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>MY BACKGROUND</NavLink>
                                        </li>
                                        <li class="is-active">
                                            <NavLink to={'/admin/pages/about/evolution'} activeClassName="active" ><i class="fa fa-plus subaj_fa" aria-hidden="true"></i>EVOLUTION OF SET IT AND LEAVE IT</NavLink>
                                        </li>                                        
                                    </ul>
                            </li>
                        </ul>
                    </li>

                    <li class="is-active">
                        <a href="javascript:void(0)" onClick={this.logout.bind(this)}><i class="fa fa-sign-out aj_fa" aria-hidden="true"></i>Logout</a>
                    </li>
                </ul> 
            </nav>  */}

            
        </div>
        </div>
    );
   }
}
export default withRouter (Adminsidebar); 