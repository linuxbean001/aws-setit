import React, { Component } from 'react'
import processBg from '../../assets/img/PROCESS hero purple.jpg'
import purplebg from '../../assets/img/img1/get.png'
import email from '../../assets/img/email-icon.png'
import engage from '../../assets/img/engage.png'
import financial from '../../assets/img/financial-plan-icon.png'
import execute from '../../assets/img/execute-icon.png'
import monitoring from '../../assets/img/monitoring-reporting-icon.png'
import questionnaire from '../../assets/img/questionnaire-icon.png'
import consulation from '../../assets/img/consulation.png'
import investement from '../../assets/img/investment-icon.png'
import { withRouter } from 'react-router'

class  GetStarted extends Component {
    constructor(props){
        super(props);
        this.props.onHeaderHover(false);
       
    }
    componentDidMount(){
        document.title = "OUR PROCESS - SET IT AND LEAVE IT"
    }
  render() {
    return (
   <div>
    <section id="inner-page-banner">
        <div className="container-fluid">
            <div className="row">
                <div className="inner-page-banner-heading">
                    <h2>Get Started</h2>
                </div>

                <div className="inner-page-banner-image">
                    <img src={processBg}/>
                </div>
            </div>
        </div>
    </section>

    <section id="blouq-content">
        <div className="container">
            <div className="blouq-content-inner wonder-getstarted">
                <h4>Wondering how to get started? Below we outline a typical process for engaging with us.</h4>
            </div>
        </div>
    </section>

    <section id="parallax-main" className="inner-page-parallax" style={{backgroundImage: "url("+purplebg+")"}}>
  
        <div className="container">
            <h2 style={{"color": "#7030a0"}}>GET STARTED</h2>
        </div>
    </section>

    <section id="get-start-main">
        <div className="container">
            <div sm="1" className="col-1 sm">
                <div className="get-start-box-inner">
                    <h2>0.</h2>
                </div>
            </div>

            <div sm="5" className="col-sm-5 sm">
                <div className="get-start-box-inner-title">
                    <h3>Email</h3>
                    <div className="get-start-box-inner-title-icon">
                        <img src={email}/>
                    </div>
                </div>
            </div>

            <div sm="6" className="col-sm-6 sm">
                <div className="get-start-box-inner">
                    <h4>We are always happy to answer a quick question. Drop us an <a href="#">email</a> or use our <a href="#">contact form.</a></h4>
                </div>
            </div>
        </div>
    </section>

    <section id="get-start-main">
        <div className="container">
            <div className="col-sm-1 sm">
                <div className="get-start-box-inner">
                    <h2>1.</h2>
                </div>
            </div>

            <div className="col-sm-5 sm">
                <div className="get-start-box-inner-title">
                    <h3>QUESTIONNAIRE</h3>
                    <div className="get-start-box-inner-title-icon">
                        <img src={questionnaire}/>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 sm">
                <div className="get-start-box-inner">
                    <h4><a href="#">Register</a> and fill out our online questionnaire. This will help us both make the most out of your free consultation.</h4>
                </div>
            </div>
        </div>
    </section>

    <section id="get-start-main">
        <div className="container">
            <div className="col-sm-1 sm">
                <div className="get-start-box-inner">
                    <h2>2.</h2>
                </div>
            </div>

            <div className="col-sm-5 sm">
                <div className="get-start-box-inner-title">
                    <h3>FREE CONSULTATION</h3>
                    <div className="get-start-box-inner-title-icon">
                        <img src={consulation}/>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 sm">
                <div className="get-start-box-inner">
                    <h4>We get better acquainted, answer questions, address concerns, and explore capacities in which we can work together.</h4>
                </div>
            </div>
        </div>
    </section>

    <section id="get-start-main">
        <div className="container">
            <div className="col-sm-1 sm">
                <div className="get-start-box-inner">
                    <h2>3.</h2>
                </div>
            </div>

            <div className="col-sm-5 sm">
                <div className="get-start-box-inner-title">
                    <h3>Engage</h3>
                    <div className="get-start-box-inner-title-icon">
                        <img src={engage}/>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 sm">
                <div className="get-start-box-inner">
                    <h4>Once we agree on the scope of services and fees, we sign an agreement and get started.</h4>
                </div>
            </div>
        </div>
    </section>

    <section id="get-start-main">
        <div className="container">
            <div className="col-sm-1 sm">
                <div className="get-start-box-inner">
                    <h2>4.</h2>
                </div>
            </div>

            <div className="col-sm-5 sm">
                <div className="get-start-box-inner-title">
                    <h3>Financial Plan</h3>
                    <div className="get-start-box-inner-title-icon">
                        <img src={financial}/>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 sm">
                <div className="get-start-box-inner">
                    <h4>We construct a comprehensive financial plan and work with you to make it just right.</h4>
                </div>
            </div>
        </div>
    </section>

    <section id="get-start-main">
        <div className="container">
            <div className="col-sm-1 sm">
                <div className="get-start-box-inner">
                    <h2>5.</h2>
                </div>
            </div>

            <div className="col-sm-5 sm">
                <div className="get-start-box-inner-title">
                    <h3>Execute</h3>
                    <div className="get-start-box-inner-title-icon">
                        <img src={execute}/>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 sm">
                <div className="get-start-box-inner">
                    <h4>Setup accounts, transfer assets, allocate portfolio, route income to bank account(s)</h4>
                </div>
            </div>
        </div>
    </section>

    <section id="get-start-main">
        <div className="container">
            <div className="col-sm-1 sm">
                <div className="get-start-box-inner">
                    <h2>6.</h2>
                </div>
            </div>

            <div className="col-sm-5 sm">
                <div className="get-start-box-inner-title">
                    <h3>MONITORING &amp; REPORTING</h3>
                    <div className="get-start-box-inner-title-icon">
                        <img src={monitoring}/>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 sm">
                <div className="get-start-box-inner">
                    <h4>We can monitor progress, provide quarterly reporting, annual reviews, and help manage any changes that come your way.</h4>
                </div>
            </div>
        </div>
    </section>

    <section id="get-start-main">
        <div className="container">
            <div className="col-sm-1 sm">
                <div className="get-start-box-inner">
                    <h2>7.</h2>
                </div>
            </div>

            <div className="col-sm-5 sm">
                <div className="get-start-box-inner-title">
                    <h3>INVESTMENT MANAGEMENT</h3>
                    <div className="get-start-box-inner-title-icon">
                        <img src={investement}/>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 sm">
                <div className="get-start-box-inner">
                    <h4>We can provide ongoing investment services for cash management, bond ladders, index funds, dividend-income portfolios, etc.</h4>
                </div>
            </div>
        </div>
    </section>




    {/* <section id="footer">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-4">
                    <div className="footer-logo">
                        <img src="img/logo1.png"/>
                    </div>
                </div>

                <div className="col-md-4 col-sm-5">
                    <div className="customfooter_contacts">
                        <h4>Contact</h4>
                        <p><i className="fa fa-phone" aria-hidden="true"></i> <a href="tel:18669005050">1-866-900-5050</a></p>

                        <p><i className="fa fa-envelope" aria-hidden="true"></i> <a href="mailto: info@SetItandLeaveIt.com">info@SetItandLeaveIt.com</a></p>

                        <p><i className="fa fa-globe" aria-hidden="true"></i> <a href="www.SetItandLeaveIt.com">www.SetItandLeaveIt.com</a></p>

                    </div>

                </div>

                <div className="col-sm-3 col-md-4">
                    <h4>Links</h4>
                    <div className="useful-links">
                        <ul>
                            <li><a href="#">SITEMAP</a></li>
                            <li><a href="#">PRIVACY</a></li>
                            <li><a href="#">TERMS OF SERVICE</a></li>
                            <li><a href="#">DISCLAIMER</a></li>
                        </ul>
                    </div>

                        <div className="col-md-6 useful-links">
                            <ul>
                                <li><a href="#">SIGN-IN</a></li>
                                <li><a href="#">SITEMAP</a></li>
                                <li><a href="#">PRIVACY</a></li>
                                <li><a href="#">TERMS OF SERVICE</a></li>
                                <li><a href="#">DISCLAIMER</a></li>
                            </ul>
                        </div>

                </div>
            </div>
        </div>
    </section> */}


    <div className="scroll-top-wrapper ">
        <span className="scroll-top-inner">
            <i className="fa fa-1x fa-arrow-up"></i>
        </span>
    </div>
    </div>
    )
  }
}
export default withRouter(GetStarted);
