import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import about_banner from '../../assets/img/RESEARCH-hero-banner.jpg';
import serviceFlow_bg from '../../assets/img/RESEARCH-bg.png';
import AdminService from '../../admin/Aservice/adminservice';
import pdfIcon from '../../assets/img/pdf-png.png'; 
import { MDBDataTable  } from 'mdbreact';
let ResearchRow=[];
let ResourceRow=[];

const AdminAPI = new AdminService();
class Research extends Component{
    constructor(props){
        super(props);
        this.props.onHeaderHover(true);
        this.state ={
            isHide:false,
            activeClass:'',
            position:false,
            top:false,
            OverviewData:[],
            ResearchData:[],
            ResourceData:[]
        }
        this.getResearch = this.getResearch.bind(this);
    }


    componentDidMount(){
        window.scrollTo(0, 0);
        this.getResearchOverview();
        this.getResearch();
        this.getResource();
        window.addEventListener('scroll', () => {
            let activeClass = 'normal';
            let position = false;
            let top = false;
            let li1 = '';
            let li2 = '';
            let li3 = '';
            let li4 = '';

            if(window.scrollY >= 1340 ){
                activeClass = 'is-sticky';
                position = true;
                top = true;
                li1 = 'active';
                li2 = '';
                li3 = '';
                li4 = '';
            }
            if(window.scrollY >= 1740 ){  
                li1 = '';              
                li2 = 'active';
                li3 = '';
                li4 = '';
            }
            if(window.scrollY >= 5000 ){                
                li1 = '';              
                li2 = '';
                li3 = 'active';
                li4 = '';
            }
            if(window.scrollY >= 7400 ){                
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

    getResearchOverview() {
        AdminAPI.GetResearchOverview()
                .then(res => {
                   this.setState({ 
                       OverviewData: res.data.data[0]
                   });
                }).catch(err => {
                    console.log('xxxxxxx xxxx ', err);
                });
    }

    getResearch() {
        AdminAPI.GetResearch()
                .then(res => {
                    ResearchRow=[];
                    for(let i=0; i<res.data.data.length; i++){
                        var stripedHtmlLinks = <p dangerouslySetInnerHTML={{ __html: res.data.data[i].links}}  />;
                        var uploads = <img style={{height:50,width:'auto'}} src={pdfIcon} />;
                        ResearchRow.push({
                            title:res.data.data[i].title,
                            description:<p dangerouslySetInnerHTML={{ __html: res.data.data[i].description }}  /> ,
                            links:<div class="uploads"><p>{res.data.data[i].files?<a href={process.env.PUBLIC_URL + '/upload-file/'+res.data.data[i].files}>{uploads}</a>:''}</p><p>{stripedHtmlLinks}</p></div>
                        }) 
                      }
                     // console.log('ContacutServicArray:', res);
                      this.setState({ ResearchData: ResearchRow });
                   
                }).catch(err => {
                    console.log('xxxxxxx xxxx ', err);
                });
    }

    getResource() {
        AdminAPI.GetResource()
                .then(res => {
                    ResourceRow=[];
                    for(let i=0; i<res.data.data.length; i++){

                        var stripedHtmlLinks = <p dangerouslySetInnerHTML={{ __html: res.data.data[i].links}}  />;
                        var uploads = <img style={{height:50,width:'auto'}} src={pdfIcon} />;
                        ResourceRow.push({
                            title:res.data.data[i].title,
                            description:<p dangerouslySetInnerHTML={{ __html: res.data.data[i].description }}  /> ,
                            links:<div class="uploads"><p>{res.data.data[i].files?<a href={process.env.PUBLIC_URL + '/upload-file/'+res.data.data[i].files}>{uploads}</a>:''}</p><p>{stripedHtmlLinks}</p></div>
                        }) 
                      }
                     // console.log('ContacutServicArray:', res);
                      this.setState({ ResourceData: ResourceRow });
                }).catch(err => {
                    console.log('xxxxxxx xxxx ', err);
                });
    }

render(){

    console.log('data:',this.state.ResearchData);



    const dataResearch = {
        columns: [
          {
            label: 'Title',
            field: 'title',
            sort: 'asc',
            width: 150
          },
          {
              label: 'Description',
              field: 'description',
              sort: 'asc',
              width: 150
          },
          {
              label: 'Links',
              field: 'links',
              sort: 'asc',
              width: 150
          }
        ],
        rows: ResearchRow
      }

      const dataResource = {
        columns: [
          {
            label: 'Source',
            field: 'title',
            sort: 'asc',
            width: 150
          },
          {
              label: 'Description',
              field: 'description',
              sort: 'asc',
              width: 150
          },
          {
              label: 'Links',
              field: 'links',
              sort: 'asc',
              width: 150
          }
        ],
        rows: ResourceRow
      }


         return(
<div className="traditional-section research-page">

<section id="inner-page-banner">
        <div className="container-fluid">
            <div className="row">
                <div className="inner-page-banner-heading hdng">
                    <h2>{this.state.OverviewData.title} </h2>
                </div>
                <div className="inner-page-banner-image" style={ { backgroundImage: "url("+about_banner+")" } }>
                    {/* <img src={about_banner}/> */}

                    <div class="overlay-texts"> <p> <em>“Science is simply common sense at its best, that is, rigidly accurate in observation, and merciless to fallacy in logic.”</em>      –Thomas Henry Huxley       </p> </div>
                </div>
            </div>
        </div>
    </section>

    <div className="container">
        <div className="not-sect">
            <p> <span> !</span> <b> NOTE: </b> In addition to our research, we have created short <Link to={"/front/videos"}>video's</Link>  summarizing many of the same topics. </p>
        </div>
    </div>

    <section id="blouq-content">
        <div className="container">
            <div className="blouq-content-inner research-overview">
                <h3> OVERVIEW </h3>
                <p dangerouslySetInnerHTML={{ __html: this.state.OverviewData.content }}  />
                
                {/* <h5> <i>Rules of thumb</i> may be helpful at times, but we advocate an evidence-based approach to planning and investing. Set It and Leave It is based on our proprietary research and analysis – much of which we share below. We hope you enjoy reading and find it useful, but feedback is always welcome. </h5> */}
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
                                    <li className={`${this.state.li1}`} style={{width:'50%'}}> <AnchorLink href="#ourresearch" className="scrolly"> OUR RESEARCH </AnchorLink> </li>
                                    <li className={`${this.state.li2}`} style={{width:'50%'}}> <AnchorLink href="#otherresources" className="scrolly"> OTHER RESOURCES </AnchorLink> </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div id="ourresearch">
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg+")" } }>
            <div className="container haddng">
                <h2>OUR RESEARCH</h2>
                {/* <h2> {this.state.BackgroundData.title} </h2> */}
            </div>
        </section>

        <section className="b1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-content-bg">
                            <MDBDataTable  data={dataResearch} id="researchTable"  />


                           <center><h2>More research to come – <Link to={"/front/register"}>sign up</Link> to stay informed!</h2></center>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div id="otherresources">
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg+")" } }>
            <div className="container haddng">
                <h2>OTHER RESOURCES</h2>
                {/* <h2> {this.state.WithdrawalData.title} </h2> */}
            </div>
        </section>

        <section className="b1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-content-bg">
                             {/* <p dangerouslySetInnerHTML={{ __html: this.state.SummaryData.content }}  /> */}
                            <MDBDataTable  data={dataResource} id="resourceTable" />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>




                     </div>
            );
        }
      }
    export default Research;