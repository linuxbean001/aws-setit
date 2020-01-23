import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import about_banner from '../../assets/img/about-banner-bg.jpg';
import about_bg from '../../assets/img/about-flower-bg.png';
import AdminService from '../../admin/Aservice/adminservice';
const AdminAPI = new AdminService();

class TnC extends Component{
    constructor(props){
        super(props);
        this.props.onHeaderHover(true);
        this.state ={
            isHide:false,
            activeClass:'',
            position:false,
            top:false
        }
       
    }

componentDidMount(){
    window.scrollTo(0, 0);
}

render(){

   
         return(
                    <div className="section-about">
                       <section id="inner-page-banner"> 
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="inner-page-banner-heading">
                                        <h2>TERMS & CONDITIONS</h2>
                                    </div>
                                    
                                </div>
                            </div>
                        </section>
                        
                        <section id="blouq-content">
                            <div class="container">
                                <div class="blouq-content-inner">
                                    <h5>The SetItandLeaveIt.com website and all content within (the "SITE") were developed by Aaron Brask Capital, LLC (the “FIRM”).</h5>
                               </div>
                            </div>
                        </section>

                  

                        <div id="motivation">
                      
                        
                        <section id="about-parrallax-main-content" className="tnc">
                            <div class="container">
                            <h5>USAGE</h5>
                            <br/>
                                <p>The SITE is for individual investors; commercial use is strictly prohibited without express prior written consent. Contact us if you would like to leverage the SITE, content, or related intellectual property for commercial purposes.</p>
                            <br/>
                            <h5 id="disclaimer">DISCLAIMER</h5>
                            <br/>
                                <p>You use the SITE at your own risk. The information, calculations, and results provided through the SITE are provided “as is”. We do not make any warranties or representations regarding the accuracy, adequacy, completeness, or relevance of this content. As such, WE assume no liability or responsibility for any errors, omissions, or other issues with the SITE and its contents. This includes both the website content and any potential bugs, viruses or other technical threats.</p>
                            <br/>
                            <h5>CONTENT</h5>
                            <br/>
                                <p>Results and figures presented within the SITE are hypothetical, unaudited, and are intended for illustrative purposes only.</p>
                            <br/>
                            <h5>LIABILITY</h5>
                            <br/>
                                <p>The FIRM assumes no liability or responsibility for any errors, omissions, or other issues with the SITE and its contents. This includes both the website content and any potential bugs, viruses or other technical threats.</p>
                            <br/>
                            <h5>ADVICE</h5>
                            <br/>
                                <p>The content and information provided the SITE should not be interpreted as investment advice or a recommendation of suitability for any particular security, portfolio of securities, transaction, or investment strategy, or related decision. Please seek assistance from a qualified investment professional for any and all investment matters.</p>
                                <p>The FIRM does not provide any tax advice. No information or results on the SITE should be interpreted as tax advice. Please seek guidance from a qualified tax professional for any and all tax-related matters.</p>
                            <br/>
                            <h5>RISK</h5>
                            <br/>
                                <p>Investments may increase or decrease significantly. All investments are subject to risk of loss.</p>
                            <br/>
                            <h5>LIQUIDITY</h5>
                            <br/>
                                <p>The SITE discusses some products which are illiquid in nature (e.g., annuities) and decisions may be irreversible. Proper due diligence should be conducted prior to purchasing these investments.</p>
                            <br/>
                            <h5 id="privacy">PRIVACY</h5>
                            <br/>
                                <p>The FIRM may store information you input into the SITE and your activity on the SITE, but will not share it with or sell it to any third parties. Please refer to Part 2 of our ADV Disclosures (including Privacy Policy) for more information.</p>
                            </div>
                        </section>
                        </div>

                        {/* <div id="mybg">
                        <section id="parallax-main" class="inner-page-parallax" style={ { backgroundImage: "url("+about_bg+")" }} >
                            <div class="container">
                                <h2>{this.state.AboutBackground.title}</h2>
                            </div>
                        </section>
                        
                        <section id="about-parrallax-main-content">
                            <div class="container">
                              <p><i class="fa fa-plus"></i>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.AboutBackground.content }}  />
                                </p> 
                              </div>
                        </section>
                        </div> */}

                        {/* <div id="evolution">
                            <section id="parallax-main" class="inner-page-parallax" style={ { backgroundImage: "url("+about_bg+")" }}>
                                <div class="container">
                                    <h2>{this.state.AboutEvolution.title}</h2>
                                </div>
                            </section>
                            
                            <section id="about-parrallax-main-content">
                                <div class="container">

                                <p><i class="fa fa-plus"></i>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.AboutEvolution.content }}  />
                                </p> 

                                 </div>
                            </section>                            
                        </div> */}




                    </div>
         );
     }
}  

export default TnC;