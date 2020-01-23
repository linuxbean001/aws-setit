import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import taditional_banner from '../../assets/img/tradnitional-banner-bg.jpg';
import { Accordion, AccordionItem,AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion';
import serviceFlow_bg from '../../assets/img/TRADITIONAL-bg.png';
import AdminService from '../../admin/Aservice/adminservice';
const AdminAPI = new AdminService();
class Traditional extends Component{
    constructor(props){
        super(props);
        this.props.onHeaderHover(true);
        this.state ={
            isHide:false,
            activeClass:'',
            position:false,
            top:false,
            OverviewData:[],
            BackgroundData:[],
            WithdrawalData:[],
            AnnuityData:[],
            SummaryData:[],
            IndexData:[],
            AccordionData:[], //vks block
            TableRow:[]
        }
        this.getTraditionalOverview = this.getTraditionalOverview.bind(this);
        this.getAllAccordianLists = this.getAllAccordianLists.bind(this);
        this.getAllTableRowLists = this.getAllTableRowLists.bind(this);
    }


    componentDidMount(){
        window.scrollTo(0, 0);
        this.getTraditionalOverview();
        this.getAllAccordianLists();
        this.getAllTableRowLists();
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
            if(window.scrollY >= 2140 ){  
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

    getTraditionalOverview() {
        AdminAPI.getTraditionalOverview()
                .then(res => {
                    this.setState({ 

                        OverviewData:res.data.data[0], 
                        BackgroundData:res.data.data[1], 
                        WithdrawalData:res.data.data[2],
                        AnnuityData:res.data.data[3], 
                        SummaryData:res.data.data[4], 
                        IndexData:res.data.data[5], 

                    });


                }).catch(err => {
                    console.log('xxxxxxx xxxx ', err);
                });
  }

   /** vks block */
   getAllAccordianLists() {
    AdminAPI.getAllAccordianList()
          .then(res => {
            console.log('name:',res.data.data);
            this.setState({ AccordionData: res.data.data });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }

  getAllTableRowLists() {
    AdminAPI.getAllTableRowList()
        .then(res => {

            this.setState({ TableRow: res.data.data });
        
        }).catch(err => {
            console.log('xxxxxxx xxxx ', err);
        });
  }

render(){

    let _users = this.state.AccordionData;
    let TableRow = this.state.TableRow;
         return(
<div className="traditional-section">

<section id="inner-page-banner">
        <div className="container-fluid">
            <div className="row">
                <div className="inner-page-banner-heading hdng">
                    <h2 class="traditional_heading" dangerouslySetInnerHTML={{ __html:this.state.OverviewData.title }} />
                </div>

                <div className="inner-page-banner-image" >
                    <img src={taditional_banner}/>
                </div>
            </div>
        </div>
    </section>

    <div className="container">
        <div className="not-sect">
            <p> <span>!</span> <div className="notediv"><b> NOTE: </b> <p>This is a long page with much content. We have also created short <Link to={"/front/videos"}>videos</Link>  summarizing much of the content below.</p></div> </p>
        </div>
    </div>

    <section id="blouq-content">
        <div className="container myoverview">
            <div className="blouq-content-inner">

               <p dangerouslySetInnerHTML={{ __html: this.state.OverviewData.content }}  />
                {/* <h3> OVERVIEW </h3>
                <h5> This page describes what we believe are the two primary approaches to generating retirement income: Safe withdrawal rate (SWR) strategies and guaranteed income via annuity products. Our goal is to help retirees understand what options are available, the advantages and disadvantages of each approach, and what incentives financial professionals might have for advocating various products or strategies. We hope this helps retirees make more informed decisions so they can maximize their financial security and peace of mind. </h5> */}
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
                                <li className={`${this.state.li2}`}> <AnchorLink href="#withdrawal" className="scrolly"> SAFE WITHDRAWAL RATE </AnchorLink> </li>
                                <li className={`${this.state.li3}`}> <AnchorLink href="#varible" className="scrolly"> VARIABLE ANNUITIES </AnchorLink> </li>
                                <li className={`${this.state.li4}`}> <AnchorLink href="#executivesummary" className="scrolly"> EXECUTIVE SUMMARY </AnchorLink> </li>
                            </ul>

                        </div>
                    </nav>

                </div>
            </div>
        </div>
    </section>
</div>
    <div id="background">
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg+")" } }>
            <div className="container haddng">
                <h2> {this.state.BackgroundData.title} </h2>
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
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg+")" } }>
            <div className="container haddng">
                <h2> {this.state.WithdrawalData.title} </h2>
            </div>
        </section>

        <section className="b1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-content-bg">
                             <p dangerouslySetInnerHTML={{ __html: this.state.WithdrawalData.content }}  />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>




    <div id="varible">
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg+")" } }>
            <div className="container haddng">
                <h2> {this.state.AnnuityData.title} </h2>
            </div>
        </section>

        <section className="b1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-content-bg">
                        <p dangerouslySetInnerHTML={{ __html: this.state.AnnuityData.content }}  />
                         </div>
                    </div>
                </div>
            </div>
        </section>
    </div> 

    <div id="executivesummary">
        <section id="parallax-main" className="overlay-white" style={ { backgroundImage: "url("+serviceFlow_bg+")" } }>
            <div className="container haddng">
                <h2> {this.state.SummaryData.title} </h2>
            </div>
        </section>
        <section className="b1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-content-bg">
                             <p dangerouslySetInnerHTML={{ __html: this.state.SummaryData.content }}  />
                             {/* <p>Below we provide executive summaries for the SWR strategies and variable annuity products
described above as well as a table to present a side-by-side comparison based on multiple
factors we believe are important to most retirees.</p> */}

                            <Accordion allowZeroExpanded={true} >

                                {_users.map(l => {
                                    return (
                                            <AccordionItem  >
                                            <AccordionItemHeading>
                                                <AccordionItemButton  >
                                                {l.title}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel >
                                            
                                                <p dangerouslySetInnerHTML={{ __html: l.content }} />
                                            </AccordionItemPanel>
                                            </AccordionItem>
                                        );
                                })}

                                        <AccordionItem> 
                                            <AccordionItemHeading>
                                                <AccordionItemButton  >
                                                Side-by-side Comparison
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel >
                                                <table className="table">
                                                    <thead>
                                                        <th> </th>
                                                        <th> Safe Withdrawal Rate (SWR) </th>
                                                        <th> Variable Annuity </th>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            TableRow.map((item)=>{
                                                                return <tr><td><b> {item.title} </b> </td><td> {item.swr} </td><td> {item.va} </td></tr>
                                                            })                                    
                                                        }
                                                    </tbody>
                                                </table>
                                            </AccordionItemPanel>
                                        </AccordionItem>

                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div> 

    <div  id="1" className="container">
        <div className="row new-text">
        <hr className="footline"/> 
        <h5 className="footernotesHead">FOOTNOTES</h5> 
          {/* {this.state.IndexData.content} */}
          <div>
             <p dangerouslySetInnerHTML={{ __html: this.state.IndexData.content }}  />
          </div>
        </div>
    </div>





                     </div>
            );
        }
      }
    export default Traditional;