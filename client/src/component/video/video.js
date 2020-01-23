import React, { Component } from 'react';
//import video_banner from '../../assets/img/video-banner-bg.jpg';
//import graph1 from '../../assets/img/graph-1.png';
import AdminService from '../../admin/Aservice/adminservice';
const AdminAPI = new AdminService();

class Video extends Component{
    constructor(props){
        super(props);
        this.props.onHeaderHover(true);
        this.state ={
            isHide:false,
            VideoBannerData:[],
            videoContent1:[],
            videoContent2:[],
            videoContent3:[],
            videoContent4:[],
            videoContent5:[],
            videoContent6:[]
        }
        this.getVideos = this.getVideos.bind(this);
    }

componentDidMount(){
    window.scrollTo(0, 0);
    this.getVideos();
    document.title = "VIDEOS - SET IT AND LEAVE IT"
}

getVideos() {
    AdminAPI.GetVideos()
            .then(res => {

                this.setState({ 
                    VideoBannerData: res.data.data[0],
                    videoContent1: res.data.data[1],
                    videoContent2: res.data.data[2],
                    videoContent3: res.data.data[3],
                    videoContent4: res.data.data[4],
                    videoContent5: res.data.data[5],
                    videoContent6: res.data.data[6]
                });
               
            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }

render(){

    console.log('data',this.state.videoContent1)
            return(
                <div className="video-section">
                    
 
                    <section id="inner-page-banner">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="inner-page-banner-heading hdng">
                                    <h2> VIDEOS</h2>
                                </div>
                                
                                {/* <div class="inner-page-banner-image">
                                    <img src={video_banner}/>
                                </div> */}
                            </div>
                        </div>
                    </section>

                                    
                    <section id="blouq-content">
                        <div class="container">
                            <div class="blouq-content-inner hq">
                            <p dangerouslySetInnerHTML={{ __html: this.state.VideoBannerData.content }}  />
                                {/* <h5>The short videos below describe some of the pros and cons associated with two traditional retirement income strategies and our <em> Set It and Leave It </em> approach. </h5> */}
                            </div>
                        </div>
                    </section>

                   


                    <section class="video-section " id="video1">
                        <div class="container">
                            <div class="row">
                            <div class="col-md-6">
                            <div class="video-content">
                              <p dangerouslySetInnerHTML={{ __html: this.state.videoContent1.content }}  />
                            </div>
                            </div>
                            
                            <div class="col-md-6">
                            <div class="video-box">
                               <iframe src={this.state.videoContent1.title} width="100%" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
                            </div>
                            </div>
                            </div>
                        </div>
                    </section>

                    <section class="video-section mg-top-10" id="video2">
                    <div class="container">
                        <div class="row">
                        <div class="col-md-6">
                        <div class="video-content">
                            <p dangerouslySetInnerHTML={{ __html: this.state.videoContent2.content }}  />
                        </div>
                        </div>
                        
                        <div class="col-md-6">
                        <div class="video-box">
                        <iframe title="vimeo-player" src={this.state.videoContent2.title} width="100%" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
                       </div>
                        </div>
                        </div>
                    </div>
                    </section>

                    <section class="video-section  mg-top-10" id="video3">
                    <div class="container">
                        <div class="row">
                        <div class="col-md-6">
                        <div class="video-content">
                             <p dangerouslySetInnerHTML={{ __html: this.state.videoContent3.content }}  />
                        </div>
                        </div>
                        
                        <div class="col-md-6">
                        <div class="video-box" id={this.state.videoContent3.title}>
                        <iframe title="vimeo-player" src={this.state.videoContent3.title} width="100%" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
                       </div>
                        </div>
                        </div>
                    </div>
                    </section>


                      
                    <section class="video-section mg-top-10" id="video4">
                    <div class="container">
                        <div class="row">
                        <div class="col-md-6">
                        <div class="video-content">
                             <p dangerouslySetInnerHTML={{ __html: this.state.videoContent4.content }}  />
                        </div>
                        </div>
                        
                        <div class="col-md-6">
                        <div class="video-box" id={this.state.videoContent4.title}>
                        <iframe title="vimeo-player" src={this.state.videoContent4.title} width="100%" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
                       </div>
                        </div>
                        </div>
                    </div>
                    </section>

                    <section class="video-section mg-top-10" id="video5">
                    <div class="container">
                        <div class="row">
                        <div class="col-md-6">
                        <div class="video-content">
                             <p dangerouslySetInnerHTML={{ __html: this.state.videoContent5.content }}  />
                        </div>
                        </div>
                        
                        <div class="col-md-6">
                        <div class="video-box" id={this.state.videoContent5.title}>
                        <iframe title="vimeo-player" src={this.state.videoContent5.title} width="100%" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
                       </div>
                        </div>
                        </div>
                    </div>
                    </section> 


                    <section class="video-section mg-top-10" id="video6">
                    <div class="container">
                        <div class="row">
                        <div class="col-md-6">
                        <div class="video-content">
                             <p dangerouslySetInnerHTML={{ __html: this.state.videoContent6.content }}  />
                        </div>
                        </div>
                        
                        <div class="col-md-6">
                        <div class="video-box" id={this.state.videoContent6.title}>
                        <iframe title="vimeo-player" src={this.state.videoContent6.title} width="100%" height="360" frameborder="0" allow="autoplay; fullscreen"  webkitallowfullscreen="true"  mozallowfullscreen="true" allowfullscreen="true"></iframe>
                       </div>
                        </div>
                        </div>
                    </div>
                    </section>        
	

                </div>
            );
        }
    }
export default Video; 