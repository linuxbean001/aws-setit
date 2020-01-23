import React, { Component } from 'react';
import { Link, NavLink, BrowserRouter as Router } from 'react-router-dom'
import about_banner from '../../assets/img/about-banner-bg.jpg';
import about_bg from '../../assets/img/img1/ABOUT.png';
import AdminService from '../../admin/Aservice/adminservice';
import $ from "jquery";
const AdminAPI = new AdminService();

class AboutUs extends Component{
    constructor(props){
        super(props);
        this.props.onHeaderHover(true);
        this.state ={
            isHide:false,
            activeClass:'',
            position:false,
            top:false,
            li1:'',
            li2:'',
            li3:'',
            data:[],
            AboutData:[],
            AboutMotivation:[],
            AboutBackground:[],
            AboutEvolution:[]
        }
        this.getAbout = this.getAbout.bind(this);
    }


    componentDidMount(){
        var lastId,
        topMenu = $("#testing"),
        topMenuHeight = topMenu.outerHeight() + 1,
        // All list items
        menuItems = topMenu.find(".scrolly"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("data-to"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {

        var href = $(this).attr("data-to"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 850);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[data-to='#" + id + "']").parent().addClass("active");
        }
    });
        window.scrollTo(0, 0);
        this.getAbout();
        window.addEventListener('scroll', () => {
            let activeClass = 'normal';
            let position = false;
            let top = false;

            if(window.scrollY >= 1000 ){
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
         
      document.title = "ABOUT - SET IT AND LEAVE IT"
    }

 
    getAbout() {
        AdminAPI.GetAbout()
                .then(res => {
                   this.setState({ 
                       AboutData: res.data.data[0],
                       AboutMotivation: res.data.data[1],
                       AboutBackground: res.data.data[2],
                       AboutEvolution: res.data.data[3]
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

    console.log('AboutMotivation:',this.state.AboutMotivation)
         return(
                    <div className="section-about">
                       <section id="inner-page-banner">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="inner-page-banner-heading">
                                        <h2>{this.state.AboutData.title}</h2>
                                    </div>
                                    
                                    <div class="inner-page-banner-image">
                                        <img src={about_banner}/>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        <section id="blouq-content">
                            <div class="container">
                                <div class="blouq-content-inner">
                                    <h5><p dangerouslySetInnerHTML={{ __html: this.state.AboutData.content }}  /></h5>
                               </div>
                            </div>
                        </section>

                        <section class="tradnitional-section about-fix" id="getFixed" style={{ position: this.state.position ? 'fixed' : '', top: this.state.top ? '0' : '' }}>
                            <div class="container">
                                <div class="row">
                                    <div class="trad-box-inner">
                                        <nav class="navbar navbar-tab">
                                            <div class="container-fluid">
                                                <ul id="testing" class="nav">
                                                    <li id="motivation1"> <NavLink onClick={this.pagescroll} data-to="#motivation" class="scrolly"> MOTIVATION </NavLink> </li>
                                                    <li id="mybg1"> <NavLink onClick={this.pagescroll} data-to="#mybg" class="scrolly"> MY BACKGROUND </NavLink> </li>
                                                    <li id="evolution1"> <NavLink onClick={this.pagescroll} data-to="#evolution" class="scrolly"> EVOLUTION OF SET IT AND LEAVE IT </NavLink> </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div id="motivation">
                        <section id="parallax-main" class="inner-page-parallax" style={ { backgroundImage: "url("+about_bg+")" }} >
                            <div class="container">
                                <h2>{this.state.AboutMotivation.title}</h2>
                            </div>
                        </section>
                        
                        <section id="about-parrallax-main-content">
                            <div class="container">
                                <p><i class="fa fa-plus"></i>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.AboutMotivation.content }}  />
                                </p> 
                            </div>
                        </section>
                        </div>

                        <div id="mybg">
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
                        </div>

                        <div id="evolution">
                            <section id="parallax-main" class="inner-page-parallax" style={ { backgroundImage: "url("+about_bg+")" }}>
                                <div class="container">
                                    <h2>{this.state.AboutEvolution.title}</h2>
                                </div>
                            </section>
                            
                            <section id="about-parrallax-main-content">
                                <div id="1" class="container">

                                <p><i class="fa fa-plus"></i>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.AboutEvolution.content }}  />
                                </p> 

                                 </div>
                            </section>
                            
                            </div>




                    </div>
         );
     }
}  

export default AboutUs;