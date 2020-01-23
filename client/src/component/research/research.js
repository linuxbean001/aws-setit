import React, { Component } from 'react';
import { Link,NavLink, BrowserRouter as Router } from 'react-router-dom'
import about_banner from '../../assets/img/RESEARCH-hero-banner.jpg';
import serviceFlow_bg from '../../assets/img/RESEARCH-bg.png';
import AdminService from '../../admin/Aservice/adminservice';
import pdfIcon from '../../assets/img/pdf-png.png';
// import about_bg from '../../assets/img/about-flower-bg.png';
import about_bg from '../../assets/img/img1/RESEARCH.png'; 
import { MDBDataTable } from 'mdbreact';
import $ from "jquery";
let ResearchRow = [];
let ResourceRow = [];

const AdminAPI = new AdminService();
class Research extends Component {
    constructor(props) {
        super(props);
        this.props.onHeaderHover(true);
        this.state = {
            isHide: false,
            activeClass: '',
            position: false,
            top: false,
            OverviewData: [],
            ResearchData: [],
            ResourceData: []
        }
        this.getResearch = this.getResearch.bind(this);
    }


    componentDidMount() {
        
        // Cache selectors
var lastId,
topMenu = $("#testing"),
topMenuHeight = topMenu.outerHeight()+1,
// All list items
menuItems = topMenu.find(".scrolly"),
// Anchors corresponding to menu items
scrollItems = menuItems.map(function(){
  var item = $($(this).attr("data-to"));
   if (item.length) { return item; }
});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
   
 var href = $(this).attr("data-to"),
     offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
 $('html, body').stop().animate({ 
     scrollTop: offsetTop
 }, 850);
 e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
  // Get container scroll position
  var fromTop = $(this).scrollTop()+topMenuHeight;
  
  // Get id of current scroll item
  var cur = scrollItems.map(function(){
    if ($(this).offset().top < fromTop)
      return this;
  });
  // Get the id of the current element
  cur = cur[cur.length-1];
  var id = cur && cur.length ? cur[0].id : "";
  
  if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("active")
        .end().filter("[data-to='#"+id+"']").parent().addClass("active");
  }                   
});

        window.scrollTo(0, 0);
        this.getResearchOverview();
        this.getResearch();
        this.getResource();
        window.addEventListener('scroll', () => {
            let activeClass = 'normal';
            let position = false;
            let top = false;

            if (window.scrollY >= 1340) {
                activeClass = 'is-sticky';
                position = true;
                top = true;
            }
            this.setState({
                activeClass: activeClass,
                position: position,
                top: top
            });
        });
        document.title = "RESEARCH - SET IT AND LEAVE IT"
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
                            links:<div class="uploads"><p>{res.data.data[i].files?<a download href={process.env.PUBLIC_URL + '/upload-file/'+res.data.data[i].files}>{uploads}</a>:''}</p><p>{stripedHtmlLinks}</p></div>
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
                            links:<div class="uploads"><p>{res.data.data[i].files?<a download href={process.env.PUBLIC_URL + '/upload-file/'+res.data.data[i].files}>{uploads}</a>:''}</p><p>{stripedHtmlLinks}</p></div>
                        }) 
                      }
                     // console.log('ContacutServicArray:', res);
                      this.setState({ ResourceData: ResourceRow });
                }).catch(err => {
                    console.log('xxxxxxx xxxx ', err);
                });
    }

    pagescroll=(e)=> {
        if (e.currentTarget.dataset.to) {
            document.querySelectorAll('#getFixed ul li').forEach(element => {
                if(element.classList.contains('active')){
                    element.classList.remove('active')
                }
            });
            document.querySelector(e.currentTarget.dataset.to).scrollIntoView({ behavior: 'smooth' });
            document.querySelector(e.currentTarget.dataset.to+'1').classList.add('active');
        }
    }

    render() {

        console.log('data:', this.state.ResearchData);



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
                },

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


        return (
            <div className="traditional-section research-page">

                <section id="inner-page-banner">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="inner-page-banner-heading hdng">
                                <h2>{this.state.OverviewData.title} </h2>
                            </div>

                            <div className="inner-page-banner-image" style={{ backgroundImage: "url(" + about_banner + ")" }}>
                                {/* <img src={about_banner}/> */}
                               
                                
                            </div>
                            <div className="science"> <p className="sc1"> <em>“Science is simply common sense at its best, that is, rigidly accurate in observation, and merciless to fallacy in logic.”</em>      –Thomas Henry Huxley       </p> </div>   
                        </div>
                    </div>
                </section>
                

                <div className="container">
                    <div className="not-sect">
                        <p> <span> !</span> <div className="notediv notediv-research"><b> NOTE: </b> <p>In addition to our research, we have created short <Link to={"/front/videos"}>videos</Link>  summarizing many of the same topics. </p></div></p>
                    </div>
                </div>
     
                <section id="blouq-content">
                    <div className="container">
                        <div className="blouq-content-inner research-overview">
                            <h3> OVERVIEW </h3>
                            <p dangerouslySetInnerHTML={{ __html: this.state.OverviewData.content }} />

                            {/* <h5> <i>Rules of thumb</i> may be helpful at times, but we advocate an evidence-based approach to planning and investing. Set It and Leave It is based on our proprietary research and analysis – much of which we share below. We hope you enjoy reading and find it useful, but feedback is always welcome. </h5> */}
                        </div>
                    </div>
                </section>
                <div id="getFixed-sticky-wrapper" className={`sticky-wrapper ${this.state.activeClass}`}>
                    <section className="tradnitional-section" id="getFixed" style={{ position: this.state.position ? 'fixed' : '', top: this.state.top ? '0' : '' }}>
                        <div className="container">
                            <div className="row">
                                <div className="trad-box-inner">
                                    <nav className="navbar navbar-tab">
                                        <div className="container-fluid">
                                            <ul id="testing" className="nav">
                                                <li id="ourresearch1" style={{ width: '50%' }}> <NavLink onClick={this.pagescroll} data-to="#ourresearch" className="scrolly"> OUR ARTICLES </NavLink> </li>
                                                <li id="otherresources1" style={{ width: '50%' }}> <NavLink onClick={this.pagescroll} data-to="#otherresources" className="scrolly"> OTHER RESOURCES </NavLink> </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div id="ourresearch">
                    {/* <section id="parallax-main" className="overlay-white" style={{ backgroundImage: "url(" + serviceFlow_bg + ")", backgroundSize:"contain" }}> */}
                    <section id="parallax-main" class="overlay-white" style={ { backgroundImage: "url("+about_bg+")" }} >
                        <div className="container haddng">
                            <h2>OUR ARTICLES</h2>
                            {/* <h2> {this.state.BackgroundData.title} </h2> */}
                        </div>
                    </section>

                    <section className="b1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-content-bg research-table">
                                        <MDBDataTable data={dataResearch} id="researchTable" />
                                        {/* <p dangerouslySetInnerHTML={{ __html: this.state.SummaryData.content }}  /> */}
                                        {/* <br/><h3>Side-by-side Comparison</h3><br/> */}
                                        {/* <table className="table">
                                <thead>
                                    <th> Title</th>
                                    <th> Description </th>
                                    <th> Link </th>
                                </thead>

                                <tbody>

                                    <tr>
                                        <td><i> Dividends Are Different </i> </td>
                                        <td> We address some misconceptions regarding dividends and highlights important benefits they can provide.</td>
                                        <td> <center><img style={{height:50,width:'auto'}} src={pdfIcon} /></center></td>
                                    </tr>

                                    <tr>
                                        <td><i> Set It and Leave It: A Structured Approach to Retirement Income </i> </td>
                                        <td> A comprehensive primer on the Set It and Leave It approach and other retirement income products and strategies.</td>
                                        <td> <center><img style={{height:50,width:'auto'}} src={pdfIcon} /></center></td>
                                    </tr>

                                </tbody>

                            </table> */}

                                        <center><h2>More research to come – <Link to={"/front/register"}>sign up</Link> to stay informed!</h2></center>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div id="otherresources">
                    <section id="parallax-main" className="overlay-white" style={{ backgroundImage: "url(" + serviceFlow_bg + ")" }}>
                        <div className="container haddng">
                            <h2>OTHER RESOURCES</h2>
                            {/* <h2> {this.state.WithdrawalData.title} </h2> */}
                        </div>
                    </section>

                    <section className="b1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-content-bg research-table">
                                        {/* <p dangerouslySetInnerHTML={{ __html: this.state.SummaryData.content }}  /> */}
                                        {/* <br/><h3>Other Resource</h3><br/> */}
                                        <MDBDataTable data={dataResource} id="resourceTable" />
                                        {/* <table className="table">
                                <thead>
                                    <th> Source</th>
                                    <th> Description </th>
                                    <th> Link </th>
                                </thead>

                                <tbody>

                                    <tr>
                                        <td>William Bengen</td>
                                        <td> Original article <br/> Most recent book<br/>AAII interview</td>
                                        <td> 
                                            <center><img style={{height:50,width:'auto',float:'none',margin:0}} src={pdfIcon} /></center>
                                            <a href="https://www.amazon.com/Conserving-Client-Portfolios-During-Retirement/dp/0975344838" >book</a><br/>
                                            <a href="https://www.aaii.com/journal/article/insights-on-using-the-withdrawal-rule-from-its-creator">AAII interview</a>
                                        </td>
                                    </tr>
            
                                    <tr>
                                        <td>Michael Kitces</td>
                                        <td> Wealth of articles and other resources.</td>
                                        <td> 
                                            <a href="https://www.kitces.com/">https://www.kitces.com/</a><br/>
                                            <a href="https://www.onefpa.org/journal/Pages/Improving%20Risk-Adjusted%20Returns%20Using%20Market-Valuation-Based%20Tactical%20Asset%20Allocation%20Strategies.aspx">Valuations article</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Wade Pfau</td>
                                        <td>Annuities improve results</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Joe Tomlinson</td>
                                        <td>Annuities improve results</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Michael Eddesses</td>
                                        <td>Annuities improve results</td>
                                        <td></td>
                                    </tr>


                                </tbody>

                            </table>                           */}

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