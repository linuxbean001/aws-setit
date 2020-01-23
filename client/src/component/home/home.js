import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'

import service1_bg from '../../assets/img/educate-bg.jpeg';
import howuseit_bg from '../../assets/img/use-it-bg.png';
import peacemindBg from '../../assets/img/peace-mind-bg.png'
import easyuse_bg from '../../assets/img/easy-use-bg.png';
import Carousel from 'react-bootstrap/Carousel'
import AdminService from '../../admin/Aservice/adminservice';
const AdminAPI = new AdminService();
class Home extends Component{
   constructor(props){
       super(props);
       this.props.onHeaderHover(true);
       this.state ={
           isHide:false,
           sliderData:[],
           EICData:[],
           WhocanData:[],
           PeaceData:[],
           EasyData:[]
       }
       this.getAllSliderLists = this.getAllSliderLists.bind(this);
       this.getAllEICLists = this.getAllEICLists.bind(this);
       this.getWhocanuseit = this.getWhocanuseit.bind(this);
       this.getPeaceofmind = this.getPeaceofmind.bind(this);
       this.getEasyToUse = this.getEasyToUse.bind(this);
   }

  componentDidMount(){
    window.scrollTo(0, 0);
      this.getAllSliderLists();
      this.getAllEICLists();
      this.getWhocanuseit();
      this.getPeaceofmind();
      this.getEasyToUse();
      document.title = "HOME - SET IT AND LEAVE IT"
  } 

  getAllSliderLists() {
    AdminAPI.getAllSliderList()
          .then(res => {
            this.setState({ sliderData: res.data.data });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }

  getAllEICLists() {
    AdminAPI.getAllEICList()
          .then(res => {
            this.setState({ EICData: res.data.data });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }

  getWhocanuseit() {
    AdminAPI.getWhoCanUseIt()
          .then(res => {
            //console.log('whocan:',res.data.data[0]);
            this.setState({ WhocanData:res.data.data[0] });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }

 getPeaceofmind() {
    AdminAPI.getPeaceOfMind()
          .then(res => {
            this.setState({ 
                PeaceData: res.data.data[1],
             });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }

  getEasyToUse() {
    AdminAPI.getEasytouse()
          .then(res => {
            console.log('eqasy:',res.data.data[2]);
            this.setState({ 
                EasyData: res.data.data[2]
             });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }


    render(){

        console.log('PeaceData', this.state.PeaceData);
        return(
              <div className="home-section">
                        <section id="home" style={{padding: '0'}}>
                            <Carousel fade>
                        {this.state.sliderData.map((slider, index) => ( 
                            <Carousel.Item>
                            <div class="overlay"></div>
                                <img
                                className="d-block w-100"
                                src={process.env.PUBLIC_URL + '/upload-file/'+slider.sliderimage}
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                <h3><Link to={"/front/videos"}>{slider.slidertitle}</Link></h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                         ))} 
                            </Carousel>
                        </section>

                           
    <section id="services-main">
        <div className="container serve">
            <div className="row">

            {this.state.EICData.map((eic, index) => (  
                
                <div className="col-md-4 col-sm-4 " id={index}>  
                    <Link to={index == '0'?"/front/traditional": index == '1'?"/front/set-it-and-leave-it":index=='2'?'/front/tool':''}>               
                    <div className="service-item-image" style={ { backgroundImage: "url("+service1_bg+")" } }>
                        <div className="service-item-content"><span className="bg-text">{ eic.title.charAt(0) }</span>
                           
                            <div className="service-box">
                                <div className="service-box-icon">
                                    <img src={process.env.PUBLIC_URL + '/upload-file/'+eic.image}/>
                                </div>
                            </div>
                            <div className="sec-title mrgn-b-2">
                                <h5>{eic.title}</h5>
                            </div>
                            
                            <div className="sec-content mrgn-b-2">
                                <p dangerouslySetInnerHTML={{ __html: eic.content }} className="lh-17" />
                            </div>
                        </div>
                    </div>  
                    </Link>                  
                </div>
                
              ))}  

            </div>
        </div>
    </section>

    <section id="parallax-main" style={ { backgroundImage: "url("+howuseit_bg+")" } }>
        <div className="container">
            <h2 className="cl1">{this.state.WhocanData.title}</h2>
        </div>
    </section>
    

    <section id="site-content-main" style={{background: '#e5b8b7'}}>
        <div className="container">
            <div className="row">
               
                <div className="col-md-offset-1 order-md-5 col-md-6 col-sm-6">
                    <div className="site-image-box">
                        <img src={process.env.PUBLIC_URL + '/upload-file/' + this.state.WhocanData.image}/>
                    </div>
                </div>
                
                <div className=" md-pull-7 col-md-5 col-sm-6">
                    <div className="site-content-box">
                        <div dangerouslySetInnerHTML={{ __html: this.state.WhocanData.content }} />
                        <Link className="light-btn" style={{background: '#953835', borderColor: '#953835'}} to={'/front/contact'}>Start Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="parallax-main" style={ { backgroundImage: "url("+peacemindBg+")" } }>
        <div className="container">
            <h2 className="cl2"> {this.state.PeaceData.title} </h2>
        </div>
    </section> 


    <section id="site-content-main" style={{ background: '#b8cce4' }}>
        <div className="container">
            <div className="row">

                <div className="col-md-6 col-sm-6">
                    <div className="site-image-box">
                        <img src={process.env.PUBLIC_URL + '/upload-file/' + this.state.PeaceData.image}/>
                    </div>
                </div>

                <div className="col-md-offset-1 col-md-5 col-sm-6">
                    <div className="site-content-box">

                    <div dangerouslySetInnerHTML={{ __html: this.state.PeaceData.content }} />
                        
                        <Link className="light-btn" style={{background: '#4f80bd', borderColor: '#4f80bd'}} to="/front/set-it-and-leave-it">Learn More</Link>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="parallax-main" style={ { backgroundImage: "url("+easyuse_bg+")" } }>
        <div className="container">
            <h2 className="cl3">  {this.state.EasyData.title} </h2>
        </div>
    </section>

    <section id="site-content-main" style={{ background: '#abfba7'}}>
        <div className="container">
            <div className="row">

                <div className="col-md-offset-1 order-md-5 col-md-6 col-sm-6">
                    <div className="site-image-box">
                        <img src={process.env.PUBLIC_URL + '/upload-file/' + this.state.EasyData.image}/>
                    </div>
                </div>

                <div className=" col-md-pull-7 col-md-5 col-sm-6">
                    <div className="site-content-box">
                         <div dangerouslySetInnerHTML={{ __html: this.state.EasyData.content }} />
                    
                        <Link className="light-btn" style={{background: '#00b050', borderColor: '#00b050'}} to={'/front/contact'}>Get in touch</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>  



              </div>
            );
  }
}

export default Home;