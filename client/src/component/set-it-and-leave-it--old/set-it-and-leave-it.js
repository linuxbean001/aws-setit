import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import setleave_banner from '../../assets/img/graph.jpg';
import serviceFlow_bg1 from '../../assets/img/SET-IT-AND-LEAVE-IT-bg.png';
import AdminService from '../../admin/Aservice/adminservice';
const AdminAPI = new AdminService();
class SetItAndLeaveIt extends Component{
    constructor(props){
        super(props);
        this.props.onHeaderHover(true);
        this.state ={
            isHide:false,
            activeClass:'',
            position:false,
            top:false,
            SelandLeaveData:[],
            BackgroundData:[],
            MachineData:[],
            proConData:[],
            ExampleData:[],
            IndexedData:[]
        }
        this.getSIALIOverview = this.getSIALIOverview.bind(this);
    }


    componentDidMount(){
        window.scrollTo(0, 0);
        this.getSIALIOverview();
        window.addEventListener('scroll', () => {
            let activeClass = 'normal';
            let position = false;
            let top = false;
            let li1 = '';
            let li2 = '';
            let li3 = '';
            let li4 = '';
console.log('xxxxxx', window.scrollY);
            if(window.scrollY >= 1300 ){
                activeClass = 'is-sticky';
                position = true;
                top = true;
                li1 = 'active';
                li2 = '';
                li3 = '';
                li4 = '';
            }
            if(window.scrollY >= 2000 ){  
                li1 = '';              
                li2 = 'active';
                li3 = '';
                li4 = '';
            }
            if(window.scrollY >= 4100 ){                
                li1 = '';              
                li2 = '';
                li3 = 'active';
                li4 = '';
            }
            if(window.scrollY >= 6100 ){                
                li1 = '';              
                li2 = '';
                li3 = '';
                li4 = 'active';
            }
            this.setState({ 
                activeClass:activeClass,
                position:position,
                top:top,
                li1:li1,
                li2:li2,
                li3:li3,
                li4:li4
             });
         });
    }

 
    getSIALIOverview() {
        AdminAPI.GetSIALI()
                .then(res => {
                    this.setState({ 
                      SelandLeaveData:res.data.data[0],
                      BackgroundData:res.data.data[1],
                      MachineData:res.data.data[2],
                      proConData:res.data.data[3],
                      ExampleData:res.data.data[4],
                      IndexedData:res.data.data[5]
                    });
                  
                }).catch(err => {
                    console.log('xxxxxxx xxxx ', err);
                });
    }

render(){

    console.log('SelandLeaveData',this.state.SelandLeaveData);
            return(
                <div className="set-and-leave-it-section">
                    
                    <section id="inner-page-banner">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="inner-page-banner-heading hdng">
                              <h2 className="selandleaveTitle" dangerouslySetInnerHTML={{ __html:this.state.SelandLeaveData.title }}></h2>
                                </div>

                                <div className="inner-page-banner-image">
                                    <img src={setleave_banner}/>
                                </div>

                            </div> 
                        </div>
                    </section>

                   
                    <div className="container">
                        <div className="not-sect nst">
                       <p><span>!</span><p><div className="notediv"><b>NOTE:</b> <p>You may also watch our short <Link to={"/front/videos"}>videos</Link> summarizing much of the material below or read our <Link to={"/front/set-it-and-leave-it"} className="c22"> Set It and Leave It </Link> <Link to={"/front/research"}>research paper</Link> for more details and in-depth discussion.</p></div></p></p>
                        </div>
                    </div>

                    <section id="blouq-content">
                        <div className="container myoverview">
                            <div className="blouq-content-inner">
                            <p dangerouslySetInnerHTML={{ __html: this.state.SelandLeaveData.content }}  />
                            </div>

                        </div>
                    </section>

                    <div id="getFixed-sticky-wrapper" className={`sticky-wrapper ${this.state.activeClass}`}>
                        <section className="tradnitional-section" id="getFixed" style={{ position: this.state.position ? 'fixed' : '', top: this.state.top ? '0' : '' }}>
                            <div className="container">
                                <div className="row">
                                    <div className="trad-box-inner">       
                                        <nav className="navbar" style={{marginBottom: '0'}}>
                                            <div className="container-fluid">
                                                <ul className="nav">
                                                    <li className={`${this.state.li1}`}> <AnchorLink href="#background" className="scrolly"> BACKGROUND </AnchorLink> </li>
                                                    <li className={`${this.state.li2}`}> <AnchorLink href="#withdrawal" className="scrolly"> MECHANICS </AnchorLink> </li>
                                                    <li className={`${this.state.li3}`}> <AnchorLink href="#varible" className="scrolly"> PROS & CONS </AnchorLink> </li>
                                                    <li className={`${this.state.li4}`}> <AnchorLink href="#executivesummary" className="scrolly"> EXAMPLE </AnchorLink> </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>






                    <div id="background">
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg1+")" } }>
            <div className="container haddng">
                <h2> {this.state.BackgroundData.title}</h2>
            </div>
        </section>

        <section className="b1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-content-bg">
                         <p dangerouslySetInnerHTML={{ __html: this.state.BackgroundData.content }}  />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div id="withdrawal">
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg1+")" } }>
            <div className="container haddng">
                <h2> {this.state.MachineData.title} </h2>
            </div>
        </section>

        <section className="b1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-content-bg">
                        <p dangerouslySetInnerHTML={{ __html: this.state.MachineData.content }}  />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>




    <div id="varible">
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg1+")" } }>
            <div className="container haddng">
                <h2>  {this.state.proConData.title} </h2>
            </div>
        </section>

        <section className="b1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-content-bg">
                        <p dangerouslySetInnerHTML={{ __html: this.state.proConData.content }}  />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        

   </div> 

    <div id="executivesummary">
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg1+")" } }>
            <div className="container haddng">
                <h2> {this.state.ExampleData.title} </h2>
            </div>
        </section>

        <section className="b1">
            <div className="container">
            <div className="not-sect nst">
                            <p><b>NOTE:</b> The figures below are hypothetical and for illustration purposes only.</p>                            
                        </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-content-bg">

                        


                        <p dangerouslySetInnerHTML={{ __html: this.state.ExampleData.content }}  />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div> 

    <div id="1" className="container">

        <div className="row new-text">
        <hr className="footline"/>
        <h5 className="footernotesHead">FOOTNOTES</h5>
        <div >
             <p dangerouslySetInnerHTML={{ __html: this.state.IndexedData.content }}  />
             </div>
        </div>
    </div>
 </div>
            );
        }
    }
export default SetItAndLeaveIt; 