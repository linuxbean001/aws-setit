import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Slider from "react-slick";
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import service_bg from '../../assets/img/img1/SERVICES.png';
import AdminService from '../../admin/Aservice/adminservice';
const AdminAPI = new AdminService();
class Service extends Component {
    constructor(props) {
        super(props);
        this.props.onHeaderHover(false);
        this.state = {
            isHide: false,
            ServiceBannerData: [],
            ServiceSolutionDate: [],
            ServiceListData: [],
            ServicePricing: [],
            ftitleChar: '',
            stitleChar: ''
        }
        this.getServiceheaders = this.getServiceheaders.bind(this);
        this.getServicesolutions = this.getServicesolutions.bind(this);
        this.getAllServiceLists = this.getAllServiceLists.bind(this);
        this.getAllPricingLists = this.getAllPricingLists.bind(this);
    }

    accordian(e) {
        alert(e.target);
        //console.log(e.target);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getServiceheaders();
        this.getServicesolutions();
        this.getAllServiceLists();
        this.getAllPricingLists();
        document.title = "SERVICES - SET IT AND LEAVE IT"
    }

    getServiceheaders() {
        AdminAPI.getServiceheader()
            .then(res => {
                // console.log('ServiceBannerData:',res.data.data[0]);
                this.setState({
                    ServiceBannerData: res.data.data[0]
                });
            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }

    getServicesolutions() {
        AdminAPI.getServicesolution()
            .then(res => {
                //console.log('name:',res.data.data[0]);
                var ftitleChar = res.data.data[0].ftitle;
                ftitleChar = ftitleChar.charAt(0);

                var stitleChar = res.data.data[0].stitle;
                stitleChar = stitleChar.charAt(0);

                this.setState({
                    ServiceSolutionDate: res.data.data[0],
                    ftitleChar: ftitleChar,
                    stitleChar: stitleChar
                });
            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }

    getAllServiceLists() {
        AdminAPI.getAllServiceList()
            .then(res => {
                // console.log('name:',res.data.data);

                this.setState({ ServiceListData: res.data.data });
            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }

    getAllPricingLists() {
        AdminAPI.getAllPriceList()
            .then(res => {
                this.setState({ ServicePricing: res.data.data });
            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }


    render() {

        console.log('ServicePricing:', this.state.ServicePricing)
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div className="service-section">
                <section id="inner-page-banner">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="inner-page-banner-heading">
                                <h2> {this.state.ServiceBannerData.title} </h2>
                            </div>

                            <div className="inner-page-banner-image">
                                <img src={process.env.PUBLIC_URL + '/upload-file/' + this.state.ServiceBannerData.image} />
                            </div>
                        </div>
                    </div>
                </section>
                {/* “Click more here to learn about our free
consultation.” */}

                <section id="blouq-content">
                    <div className="container">
                        <div className="blouq-content-inner">

                            <h5> <p dangerouslySetInnerHTML={{ __html: this.state.ServiceBannerData.content }} /> </h5>
                            {/* <h5>Need some help? You can rely on us for genuine and competent advice. Whether you are a do-it-yourselfer looking for a little guidance or you want help building and executing your entire financial plan, we are here to help. </h5> */}
                        </div>
                    </div>
                </section>

                <div className="container">
                    <div style={{ marginBottom: "45px", background: "#7030a0" }} className="not-sect hh">
                        <p style={{ color: "white", fontSize: "26px" }}><Link style={{ color: "white" }} to="/front/getstarted">Interested in a FREE CONSULTATION?</Link></p>
                        {/* <p> <span>!</span> <div className="free-service"><b>Free consultation:</b><p>Click more here to learn about our free consultation.</p></div> </p> */}
                    </div>
                </div>

                <section id="parallax-main" className="overlay-white myimage" style={{ backgroundImage: "url(" + service_bg + ")", marginTop: 19 + 'px  !important' }}>
                    <div className="container">
                        <h2 class="solutionnotsel" dangerouslySetInnerHTML={{ __html: this.state.ServiceSolutionDate.sectiontitle }}></h2>
                    </div>
                </section>

                <section className="solution-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="sloution-inner">
                                    <span className="bg-text">{this.state.ftitleChar}</span>
                                    <h3> {this.state.ServiceSolutionDate.ftitle} </h3>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.ServiceSolutionDate.fcontent }} />

                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="sloution-inner">
                                    <span className="bg-text">{this.state.stitleChar}</span>
                                    <h3> {this.state.ServiceSolutionDate.stitle} </h3>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.ServiceSolutionDate.scontent }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="parallax-main" className="overlay-white" style={{ backgroundImage: "url(" + service_bg + ")" }}>
                    <div className="container">
                        <h2> Services </h2>
                    </div>
                </section>

                <section id="service-slider">

                    <Slider  {...settings}>

                        {this.state.ServiceListData.map((list, index) => (
                            <div key={index}>
                                <div className="service-item-image" >
                                    <div className="service-item-content"><span className="bg-text">{list.title.charAt(0)}</span>

                                        <div className="sec-title mrgn-b-2">
                                            <h6>{list.title}</h6>
                                        </div>
                                        <div className="sec-content mrgn-b-2">
                                            <p dangerouslySetInnerHTML={{ __html: list.shortcontent }} className="lh-17" />
                                        </div>
                                        <span dangerouslySetInnerHTML={{ __html: list.content }} />
                                        <div className="read-more-link"><Link className="normal-btn" to={"/front/getstarted"}>Get Started</Link></div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>


                </section>

                <section id="parallax-main" className="overlay-white" style={{ backgroundImage: "url(" + service_bg + ")" }}>
                    <div className="container">
                        <h2> PRICING </h2>
                    </div>
                </section>

                <section id="pricing-accordian">
                    <div className="container">
                        <div className="pricing-accordian-inner">

                            {/* <Accordion >
            {this.state.ServicePricing.map((pricelist, index) => (   
                <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                    {pricelist.title}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                    <Card.Body>
                        <p dangerouslySetInnerHTML={{ __html: pricelist.content }}  />
                        </Card.Body>
                </Accordion.Collapse>
                </Card>
            ))}


            </Accordion> */}


                            <Accordion allowZeroExpanded={true} >
                            <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton >
                                            Free Consultation
                                                     </AccordionItemButton>
                                    </AccordionItemHeading>

                                    <AccordionItemPanel>
                                        <p>We are happy to provide a complimentary consultation. All we ask is that you fill out a brief questionnaire to help us make the most of our time. Learn more <Link to="/front/getstarted">here.</Link></p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                {this.state.ServicePricing.map(pricelist => {
                                    return (

                                        <AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton >
                                                    {pricelist.title}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel >
                                                <p dangerouslySetInnerHTML={{ __html: pricelist.content }} />
                                            </AccordionItemPanel>

                                        </AccordionItem>


                                    );
                                })}

                    

                            </Accordion>



                        </div>
                    </div>
                </section>

                <section style={{ padding: '30px 0 0' }}>
                    <div className="container">
                        <div className="p-teaxt">
                            {this.state.ServiceBannerData.footercontent}
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
export default Service; 