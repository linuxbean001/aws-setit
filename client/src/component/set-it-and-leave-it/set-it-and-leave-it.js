import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link, NavLink, BrowserRouter as Router } from 'react-router-dom'
import setleave_banner from '../../assets/img/graph.jpg';
import serviceFlow_bg1 from '../../assets/img/SET-IT-AND-LEAVE-IT-bg.png';
import AdminService from '../../admin/Aservice/adminservice';
import $ from "jquery";
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
        this.getSIALIOverview();
        window.addEventListener('scroll', () => {
            let activeClass = 'normal';
            let position = false;
            let top = false;
            if(window.scrollY >= 1300 ){
                activeClass = 'is-sticky';
                position = true;
                top = true;
            }
            this.setState({ 
                activeClass:activeClass,
                position:position,
                top:top
             });
         });
         document.title = "SET IT AND LEAVE IT"
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
                        <div className="not-sect">
                       <p><span>!</span><div className="notediv notediv-research"><b>NOTE:</b> <p>You may also watch our short <Link to={"/front/videos"}>videos</Link> summarizing much of the material below or read our <em style={{'color':'purple'}}>Set It and Leave It</em> <Link to={"/front/research"}>research</Link> for more details and in-depth discussion.</p></div></p>
                        </div>
                    </div>
                    {/* <div className="container">
                    <div className="not-sect">
                        <p> <span> !</span> <div className="notediv notediv-research"><b> NOTE: </b> <p>In addition to our research, we have created short <Link to={"/front/videos"}>videos</Link>  summarizing many of the same topics. </p></div></p>
                    </div>
                </div> */}
                    <section id="blouq-content">
                        <div className="container">
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
                                        <nav className="navbar navbar-tab">
                                            <div className="container-fluid">
                                                <ul id="testing" className="nav">
                                                    <li id="background1"> <NavLink onClick={this.pagescroll} data-to="#background" className="scrolly"> BACKGROUND </NavLink> </li>
                                                    <li id="withdrawal1"> <NavLink onClick={this.pagescroll} data-to="#withdrawal" className="scrolly"> MECHANICS </NavLink> </li>
                                                    <li id="varible1"> <NavLink onClick={this.pagescroll} data-to="#varible" className="scrolly"> PROS & CONS </NavLink> </li>
                                                    <li id="executivesummary1"> <NavLink onClick={this.pagescroll} data-to="#executivesummary" className="scrolly"> EXAMPLE </NavLink> </li>
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