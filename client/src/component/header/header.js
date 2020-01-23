import React, { Component } from 'react';
import { Link, NavLink, withRouter, BrowserRouter as Router } from 'react-router-dom'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import { Dropdown } from 'react-bootstrap';
import '../../assets/css/style.css'
import '../../assets/css/my-custom.css';
import '../../assets/css/responsive.css';
import logo from '../../assets/img/logo1.png';
import UserService from '../../reactservice/UserService';
const API = new UserService();
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openSubmenu1: false,
            openSubmenu2: false,
            dropdownOpen: false,
            currentPage: '',
            showSideMenu: true,
            hovered1: false,
            hovered2: false,
            hovered3: false,
            hovered4: false
        }
        this.toggleClass = this.toggleClass.bind(this);
        this.toggleClassSubmenu1 = this.toggleClassSubmenu1.bind(this);
        this.toggleClassSubmenu2 = this.toggleClassSubmenu2.bind(this);
        this.pagescroll = this.pagescroll.bind(this);
    }



    toggleClass() {
        const currentState = this.state.open;
        this.setState({
            open: !currentState
        });
    }

    toggleClassSubmenu1() {
        const currentState = this.state.openSubmenu1;
        this.setState({
            openSubmenu1: !currentState
        });
    }
    toggleClassSubmenu2() {
        const currentState = this.state.openSubmenu2;
        this.setState({
            openSubmenu2: !currentState
        });

    }

    logout = () => {
        API.logout();
        this.props.history.replace('/front/register');
    }

    pagescroll(e) {
        console.log('number', e.currentTarget.dataset.id)
        if (e.currentTarget.dataset.id == 1) {
            window.scrollTo(500, 0);
            this.props.history.replace('/front/traditional');
        } else if (e.currentTarget.dataset.id == 2) {
            window.scrollTo(500, 0);
            this.props.history.replace('/front/videos');
        } else if (e.currentTarget.dataset.id == 3) {
            window.scrollTo(500, 0);
            this.props.history.replace('/front/contact');
        } else if (e.currentTarget.dataset.id == 4) {
            window.scrollTo(500, 0);
            this.props.history.replace('/front/register');
        }
        this.hideSideMenu();
    }

    hideSideMenu = () => {
        this.setState({
            showSideMenu: !this.state.showSideMenu
        })
    }

    onMouseEnter = e => {
        if (e.currentTarget.dataset.id == 1) {
            this.setState({ hovered1: true });
        } else if (e.currentTarget.dataset.id == 2) {
            this.setState({ hovered2: true });
        } else if (e.currentTarget.dataset.id == 3) {
            this.setState({ hovered3: true });
        } else if (e.currentTarget.dataset.id == 4) {
            this.setState({ hovered4: true });
        }


    };

    onMouseLeave = e => {
        if (e.currentTarget.dataset.id == 1) {
            this.setState({ hovered1: false });
        } else if (e.currentTarget.dataset.id == 2) {
            this.setState({ hovered2: false });
        } else if (e.currentTarget.dataset.id == 3) {
            this.setState({ hovered3: false });
        } else if (e.currentTarget.dataset.id == 4) {
            this.setState({ hovered4: false });
        }
    };

    render() {
        //console.log('stricystricy', this.props.stricy)
        const style1 = this.state.hovered1 ? { opacity: 1 } : { opacity: 0.4 };
        const style2 = this.state.hovered2 ? { opacity: 2 } : { opacity: 0.4 };
        const style3 = this.state.hovered3 ? { opacity: 2 } : { opacity: 0.4 };
        const style4 = this.state.hovered4 ? { opacity: 2 } : { opacity: 0.4 };
        return (
            <div className="header-section">

                {
                    this.state.showSideMenu ?
                        <div id="fl_menu">

                            {this.props.stricy ? <div><div className="cross-btn" onClick={this.hideSideMenu}>X </div><ul>

                                {!API.loggedIn() ? (<li><p onClick={this.pagescroll.bind(this)} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} className="bg7030a0" data-id="4" style={style4}>SIGN-UP</p></li>) : ''}

                                <li><p activeClassName="is-active" onClick={this.pagescroll.bind(this)} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} className="bg31859c" data-id="1" style={style1}>LEARN</p></li>
                                <li><p activeClassName="is-active" onClick={this.pagescroll.bind(this)} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} className="bge46c0a" data-id="2" style={style2} >VIDEOS</p></li>
                                <li><p activeClassName="is-active" onClick={this.pagescroll.bind(this)} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} className="bgd99694" data-id="3" style={style3} >CONTACT</p></li>

                            </ul></div> : ''}
                        </div>
                        : ''
                }

                <div className="topheader">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="top-bar-links clearfix pull-right">
                                    <ul className="top-bar-acc">
                                        <li className="top-bar-link"><i className="fa fa-phone"></i> <a href="#">1 (866) 900-5050</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <header className="navigation" id="sticky-nav">
                    <div className="container-fluid">
                        <div className="top-logo">
                            <Link to={"/"}><img src={logo} /></Link>
                        </div>
                        <BrowserView>
                    
                            <nav id='cssmenu' className="navigation">
                                <div id="head-mobile"></div>
                                <div onClick={this.toggleClass} className={`button ${this.state.open ? 'menu-opened' : ''}`}></div>

                                <ul className={`nav ${this.state.open ? 'open' : ''}`} style={{ display: this.state.open ? 'block' : '' }}>
                                    <li className=""><NavLink to={"/front/home"} activeClassName="active" >Home</NavLink></li>


                                    <li className="has-sub">
                                        <span onClick={this.toggleClassSubmenu1} className={`submenu-button ${this.state.openSubmenu1 ? 'submenu-opened' : ''}`}></span>
                                        <NavLink  className={this.props.location.pathname == '/front/traditional' || this.props.location.pathname == '/front/set-it-and-leave-it' || this.props.location.pathname == '/front/videos' || this.props.location.pathname == '/front/research' ? 'active' : ''}>Learn</NavLink>
                                        <ul className={`sub-menu ${this.state.openSubmenu1 ? 'open' : ''}`} style={{ display: this.state.openSubmenu1 ? 'block' : '' }}>
                                            <li><NavLink to={"/front/videos"} activeClassName="active">VIDEOS</NavLink></li>
                                            <li><NavLink to={"/front/traditional"} activeClassName="active">TRADITIONAL</NavLink></li>
                                            <li><NavLink to={"/front/set-it-and-leave-it"} activeClassName="active">SET IT AND LEAVE IT</NavLink></li>
                                            <li><NavLink to={"/front/research"} activeClassName="active">RESEARCH</NavLink></li>
                                        </ul>
                                    </li>

                                    <li className="has-sub">
                                        <span onClick={this.toggleClassSubmenu2} className={`submenu-button ${this.state.openSubmenu2 ? 'submenu-opened' : ''}`}></span>
                                        <NavLink  className={this.props.location.pathname == '/front/tool' || this.props.location.pathname == '/front/faq' ? 'active' : ''}  >Tool</NavLink>
                                        <ul className={`sub-menu ${this.state.openSubmenu2 ? 'open' : ''}`} style={{ display: this.state.openSubmenu2 ? 'block' : '' }}>
                                            <li><NavLink to={"/front/tool"} activeClassName="active">TOOL</NavLink></li>
                                            <li><NavLink to={"/front/faq"} activeClassName="active">FAQ</NavLink></li>
                                        </ul>
                                    </li>

                                    {/* <li><NavLink to={"/front/services"} activeClassName="active">Services</NavLink></li> */}
                                    <li className="has-sub">
                                        <span onClick={this.toggleClassSubmenu2} className={`submenu-button ${this.state.openSubmenu2 ? 'submenu-opened' : ''}`}></span>
                                        <NavLink  className={this.props.location.pathname == '/front/service' || this.props.location.pathname == '/front/getstarted' ? 'active' : ''}>Services</NavLink>
                                        <ul className={`sub-menu ${this.state.openSubmenu2 ? 'open' : ''}`} style={{ display: this.state.openSubmenu2 ? 'block' : '' }}>
                                            <li><NavLink to={"/front/services"} activeClassName="active">SERVICES</NavLink></li>
                                            <li><NavLink to={"/front/getstarted"} activeClassName="active">GET STARTED</NavLink></li>
                                        </ul>
                                    </li>

                                    <li><NavLink to={"/front/about"} activeClassName="active">About</NavLink></li>
                                    <li><NavLink to={"/front/contact"} activeClassName="active">Contact</NavLink></li>
                                </ul>

                            </nav>
                        </BrowserView>

                        <MobileView>

                            <nav id='cssmenu' className="navigation">
                                <div id="head-mobile"></div>
                                <div onClick={this.toggleClass} className={`button ${this.state.open ? 'menu-opened' : ''}`}></div>

                                <ul className={`nav ${this.state.open ? 'open' : ''}`} style={{ display: this.state.open ? 'block' : '' }}>
                                    <li className=""><NavLink onClick={this.toggleClass} to={"/front/home"} activeClassName="active" >Home</NavLink></li>


                                    <li className="has-sub">
                                        <span onClick={this.toggleClassSubmenu1} className={`submenu-button ${this.state.openSubmenu1 ? 'submenu-opened' : ''} `}></span>
                                        <NavLink onClick={this.toggleClassSubmenu1} className={this.props.location.pathname == '/front/traditional' || this.props.location.pathname == '/front/set-it-and-leave-it' || this.props.location.pathname == '/front/videos' || this.props.location.pathname == '/front/research' ? 'active' : ''}>Learn</NavLink>
                                        <ul className={`sub-menu ${this.state.openSubmenu1 ? 'open' : ''}`} style={{ display: this.state.openSubmenu1 ? 'block' : '' }}>
                                            <li><NavLink onClick={this.toggleClass} to={"/front/videos"} activeClassName="active">VIDEOS</NavLink></li>
                                            <li><NavLink onClick={this.toggleClass} to={"/front/traditional"} activeClassName="active">TRADITIONAL</NavLink></li>
                                            <li><NavLink onClick={this.toggleClass} to={"/front/set-it-and-leave-it"} activeClassName="active">SET IT AND LEAVE IT</NavLink></li>
                                            <li><NavLink onClick={this.toggleClass} to={"/front/research"} activeClassName="active">RESEARCH</NavLink></li>
                                        </ul>
                                    </li>

                                    <li className="has-sub">
                                        <span onClick={this.toggleClassSubmenu2} className={`submenu-button ${this.state.openSubmenu2 ? 'submenu-opened' : ''} `}></span>
                                        <NavLink onClick={this.toggleClassSubmenu2} className={this.props.location.pathname == '/front/tool' || this.props.location.pathname == '/front/faq' ? 'active' : ''}  >Tool</NavLink>
                                        <ul className={`sub-menu ${this.state.openSubmenu2 ? 'open' : ''}`} style={{ display: this.state.openSubmenu2 ? 'block' : '' }}>
                                            <li><NavLink onClick={this.toggleClass} to={"/front/tool"} activeClassName="active">Tool</NavLink></li>
                                            <li><NavLink onClick={this.toggleClass} to={"/front/faq"} activeClassName="active">FAQ</NavLink></li>
                                        </ul>
                                    </li>

                                    {/* <li className="has-sub">
                                <span onClick={this.toggleClassSubmenu2} className={`submenu-button ${this.state.openSubmenu2 ? 'submenu-opened' : ''}`}></span>
                                    <NavLink onClick={this.toggleClass} to={"/front/services"} activeClassName="active">Services</NavLink>
                                    <ul className={`sub-menu ${this.state.openSubmenu2 ? 'open' : ''}`} style={{ display: this.state.openSubmenu2 ? 'block' : '' }}>
                                        <li><NavLink onClick={this.toggleClass} to={"/front/tool"} activeClassName="active">Tool</NavLink></li>
                                        <li><NavLink onClick={this.toggleClass} to={"/front/faq"} activeClassName="active">FAQ</NavLink></li>
                                    </ul>
                                </li> */}

                                    <li><NavLink onClick={this.toggleClass} to={"/front/services"} activeClassName="active">Services</NavLink></li>
                                    <li><NavLink onClick={this.toggleClass} to={"/front/about"} activeClassName="active">About</NavLink></li>
                                    <li><NavLink onClick={this.toggleClass} to={"/front/contact"} activeClassName="active">Contact</NavLink></li>
                                </ul>

                            </nav>
                        </MobileView>

                        <ul className="my-account-link">


                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <i className="fa fa-user"></i>&nbsp;&nbsp;ACCOUNT
                            </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {!API.loggedIn() ? (<Dropdown.Item href="/front/register">Register</Dropdown.Item>) : ''}
                                    {API.loggedIn() ? (<Dropdown.Item href="/front/profile">Profile</Dropdown.Item>) : ''}
                                    {API.loggedIn() ? (<Dropdown.Item href="javascript:void(0)" onClick={this.logout.bind(this)} >Logout</Dropdown.Item>) : ''}

                                </Dropdown.Menu>
                            </Dropdown>



                        </ul>
                    </div>
                </header>

            </div>
        );
    }
}

export default withRouter(Header);
