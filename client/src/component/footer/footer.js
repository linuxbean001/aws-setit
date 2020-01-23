import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here
import logo from '../../assets/img/logo1.png';
import ScrollTop from "react-scrolltop-button";
import cross from '../../assets/img/download.png';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHide: false,
            loginStatus: false
        }
    }
    componentDidMount() {

        if (localStorage.getItem('id_token') == null) {
            this.setState({
                loginStatus: true
            })

        }

    }

    render() {
        return (
            <div className="footer-section">
                   <ScrollTop
                    text="Top"
                    distance={100}
                    breakpoint={768}
                    style={{ backgroundColor: "purple" }}
                    className="scroll-your-role"
                    speed={500}
                    target={75}
                    // <i class="fa fa-angle-double-up" aria-hidden="true"></i>
                    img={cross}

                />
              
                {/* <ScrollUpButton /> */}


                <section id="get-started-main">
                    <div className="container">
                        {this.state.loginStatus ? <div className="row">
                            <div className="get-started-inner">
                                <div className="col-md-8 col-sm-8">
                                    <div className="get-started-heading">
                                        <h2>Get Started Now!</h2>
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-4">
                                    <div className="get-started-heading">
                                        <Link to={"/front/register"}>SIGN IN</Link>
                                    </div>
                                </div>
                            </div>
                        </div> : ''}
                    </div>
                </section>

                <section id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="footer-logo">
                                    <Link to={'/front/home'}><img src={logo} /></Link>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-5">
                                <div className="customfooter_contacts">
                                    <h4>Contact</h4>
                                    <p><i className="fa fa-phone" aria-hidden="true"></i> <a href="tel:18669005050">1-866-900-5050</a></p>

                                    <p><i className="fa fa-envelope" aria-hidden="true"></i> <a href="mailto: info@SetItandLeaveIt.com">info@SetItandLeaveIt.com</a></p>

                                    <p><i className="fa fa-globe" aria-hidden="true"></i> <a href={'http://www.SetItandLeaveIt.com'}>www.SetItandLeaveIt.com</a></p>

                                </div>

                            </div>

                            <div className="col-sm-3 col-md-4">
                                <h4>Links</h4>
                                <div className="useful-links">
                                    <ul>
                                        {/* <li><a href="#">SITEMAP</a></li> */}
                                        <li><Link to={'/front/tnc'}>TERMS & CONDITIONS</Link></li>
                                        <li><a href='/front/tnc#disclaimer'>DISCLAIMER</a></li>
                                        <li><a href='/front/tnc#privacy'>PRIVACY</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        );
    }
}

export default Footer;