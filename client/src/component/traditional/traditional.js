import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Link, NavLink, BrowserRouter as Router } from 'react-router-dom'
import taditional_banner from '../../assets/img/tradnitional-banner-bg.jpg';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion';
import serviceFlow_bg from '../../assets/img/TRADITIONAL-bg.png';
import AdminService from '../../admin/Aservice/adminservice';
import $ from "jquery";
import annuitypdf from '../../assets/img/SIALI - Annuity guide.pdf';

const AdminAPI = new AdminService();
class Traditional extends Component {
    constructor(props) {
        super(props);
        this.props.onHeaderHover(true);
        this.state = {
            isHide: false,
            activeClass: '',
            position: false,
            top: false,
            OverviewData: [],
            BackgroundData: [],
            WithdrawalData: [],
            AnnuityData: [],
            SummaryData: [],
            IndexData: [],
            AccordionData: [], //vks block
            TableRow: []
        }
        this.getTraditionalOverview = this.getTraditionalOverview.bind(this);
        this.getAllAccordianLists = this.getAllAccordianLists.bind(this);
        this.getAllTableRowLists = this.getAllTableRowLists.bind(this);
    }


    componentDidMount() {


        // Cache selectors
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
        this.getTraditionalOverview();
        this.getAllAccordianLists();
        this.getAllTableRowLists();
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
        document.title = "TRADITIONAL RETIREMENT INCOME STRATEGIES"
    }

    getTraditionalOverview() {
        AdminAPI.getTraditionalOverview()
            .then(res => {
                this.setState({

                    OverviewData: res.data.data[0],
                    BackgroundData: res.data.data[1],
                    WithdrawalData: res.data.data[2],
                    AnnuityData: res.data.data[3],
                    SummaryData: res.data.data[4],
                    IndexData: res.data.data[5],

                });


            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }

    /** vks block */
    getAllAccordianLists() {
        AdminAPI.getAllAccordianList()
            .then(res => {
                console.log('name:', res.data.data);
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

    pagescroll = (e) => {
        if (e.currentTarget.dataset.to) {
            document.querySelectorAll('#getFixed ul li').forEach(element => {
                if (element.classList.contains('active')) {
                    element.classList.remove('active')
                }
            });
            document.querySelector(e.currentTarget.dataset.to).scrollIntoView({ behavior: 'smooth' });
            document.querySelector(e.currentTarget.dataset.to + '1').classList.add('active');
        }
    }

    render() {



        let _users = this.state.AccordionData;
        let TableRow = this.state.TableRow;
        return (


            <div className="traditional-section">
                {/* <nav>
                    <ul id="mainNav">
                        <li class="active"><a href="#home">Home</a></li>
                        <li><a href="#work">Work</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <section id="home"><h2>Home</h2></section>
                <section id="work" data-sr><h2>Work</h2></section>
                <section id="about"><h2>About</h2></section>
                <section id="contact"><h2>Contact</h2></section> */}

                <section id="inner-page-banner">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="inner-page-banner-heading hdng">
                                <h2 class="traditional_heading" dangerouslySetInnerHTML={{ __html: this.state.OverviewData.title }} />
                            </div>

                            <div className="inner-page-banner-image" >
                                <img src={taditional_banner} />
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
                    <div className="container">
                        <div className="blouq-content-inner">

                            <p dangerouslySetInnerHTML={{ __html: this.state.OverviewData.content }} />
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



                                    <nav className="navbar navbar-tab">
                                        <div className="container-fluid">

                                            <ul id="testing" className="nav">
                                                <li id="background1"> <NavLink onClick={this.pagescroll} data-to="#background" className="scrolly"> BACKGROUND</NavLink> </li>
                                                <li id="withdrawal1"> <NavLink onClick={this.pagescroll} data-to="#withdrawal" className="scrolly"> SAFE WITHDRAWAL RATE </NavLink> </li>
                                                <li id="varible1"> <NavLink onClick={this.pagescroll} data-to="#varible" className="scrolly"> VARIABLE ANNUITIES </NavLink> </li>
                                                <li id="executivesummary1"> <NavLink onClick={this.pagescroll} data-to="#executivesummary" className="scrolly"> EXECUTIVE SUMMARY </NavLink> </li>
                                            </ul>

                                        </div>
                                    </nav>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div id="background">
                    <section id="parallax-main" className="overlay-white" style={{ backgroundImage: "url(" + serviceFlow_bg + ")" }}>
                        <div className="container haddng">
                            <h2 id="background"> {this.state.BackgroundData.title} </h2>
                        </div>
                    </section>

                    <section className="b1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-content-bg">
                                        <p dangerouslySetInnerHTML={{ __html: this.state.BackgroundData.content }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div id="withdrawal">
                    <section id="parallax-main" className="overlay-white" style={{ backgroundImage: "url(" + serviceFlow_bg + ")" }}>
                        <div className="container haddng">
                            <h2 id="withdrawal"> {this.state.WithdrawalData.title} </h2>
                        </div>
                    </section>

                    <section className="b1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-content-bg">
                                        <p dangerouslySetInnerHTML={{ __html: this.state.WithdrawalData.content }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>




                <div id="varible">
                    <section id="parallax-main" className="overlay-white" style={{ backgroundImage: "url(" + serviceFlow_bg + ")" }}>
                        <div className="container haddng">
                            <h2 id="varible"> {this.state.AnnuityData.title} </h2>
                        </div>
                    </section>

                    <div className="container">
                        <div className="not-sect concise">
                            <p><span>!</span><div className="notediv notediv-research"><p style={{ marginTop: "0", fontSize: "21px" }}>Click <a style={{ 'color': '#007bff' }} href={annuitypdf} download="SIALI - Annuity guide" >here</a> for a concise overview of annuity products</p></div></p>
                            {/* <a download href={process.env.PUBLIC_URL + '/upload-file/'+res.data.data[i].files}>{uploads}</a> */}
                            {/* <a href={userGuide} download >HELP MANUAL</a> */}
                        </div>
                    </div>

                    <section className="b1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-content-bg">
                                        <p dangerouslySetInnerHTML={{ __html: this.state.AnnuityData.content }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div id="executivesummary">
                    <section id="parallax-main" className="overlay-white" style={{ backgroundImage: "url(" + serviceFlow_bg + ")" }}>
                        <div className="container haddng">
                            <h2 id="executivesummary"> {this.state.SummaryData.title} </h2>
                        </div>
                    </section>
                    <section className="b1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-content-bg">
                                        <p dangerouslySetInnerHTML={{ __html: this.state.SummaryData.content }} />
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
                                                        Side-by-side Comparison (SWR vs VA)
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
                                                                TableRow.map((item) => {
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

                <div id="1" className="container">
                    <div className="row new-text">
                        <hr className="footline" />
                        <h5 className="footernotesHead">FOOTNOTES</h5>
                        {/* {this.state.IndexData.content} */}
                        <div>
                            <p dangerouslySetInnerHTML={{ __html: this.state.IndexData.content }} />
                        </div>
                    </div>
                </div>





            </div>
        );
    }
}
export default Traditional;