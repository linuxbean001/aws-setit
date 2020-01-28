import React, { Component } from 'react';
import {  Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Header from './header/header';
import Footer from './footer/footer';
import Home from './home/home';
import Traditional from './traditional/traditional';
import SetItAndLeaveIt from './set-it-and-leave-it/set-it-and-leave-it';
import Video from './video/video';
import Service from './service/service';
import MockupTool from './tools/tool';
import AboutUs from './aboutus/about';
import Contactus from './contactus/contactus';
import FAQ from './faq/faq';
import Signup from './signup/signup';
import Profile from './profile/profile';
import Questions from './questions/question';
import UserManualPdf from './usermanual/userguide';
import ResetPassword from './resetpassword/resetpassword';
import TnC from './tnc/tnc';
import Research from './research/research';
import EmailVerification from './emailverify/emailverification';
import LoginIndex from './loginIndex/loginIndex';
import GetStarted from './getStarted/getStarted';
import PasswordReset from './passwordReset/passwordReset';
class Frontendrouters extends Component{
   constructor(props){
       super(props);
       console.log('test1',this.props.test1)
       this.state ={
           open:false,
           stricy:true
       }
   }

   handlerLoginHover(stricy){
       if(localStorage.getItem('current-page')){
          localStorage.setItem('last-page', localStorage.getItem('current-page'));
          localStorage.setItem('current-page', this.props.location.pathname);
       }else{
          localStorage.setItem('current-page', this.props.location.pathname);
       }
      
       this.setState({
        stricy:stricy
       })
   }

    render(){
        return(
                   <div className="frontendrouter-section">
                      
                        <Header  stricy={this.state.stricy}/>
                            <div>
                            <Switch>
                                {/* <Route exact path="/" component={Home} />
                                <Route  path="/front/home" component={Home} />
                                <Route  path="/front/traditional" component={Traditional} />
                                <Route  path="/front/set-it-and-leave-it" component={SetItAndLeaveIt} />
                                <Route  path="/front/video" component={Video} />
                                <Route  path="/front/service" component={Service} />
                                 <Route  path="/front/tools" test="jai ram ji ki" component={MockupTool} /> 
                                <Route  path="/front/about" component={AboutUs} />
                                <Route  path="/front/contactus" component={Contactus} />
                                <Route  path="/front/faq" component={FAQ} />
                                <Route  path="/front/signup" component={Signup} />
                                <Route  path="/front/profile" component={Profile} />
                                <Route exact path="/front" component={Home} /> */}


                               <Route exact path="/" render={() => {
                                     return <Home onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }} />
                                <Route  path="/front/home" render={() => {
                                     return <Home onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />
                                <Route  path="/front/traditional" render={() => {
                                     return <Traditional onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }} />
                                <Route  path="/front/set-it-and-leave-it" render={() => {
                                     return <SetItAndLeaveIt onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />
                                <Route  path="/front/videos" render={() => {
                                     return <Video onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }} />

                                <Route  path="/front/research" render={() => {
                                     return <Research onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }} />

                                <Route  path="/front/services"  render={() => {
                                     return <Service onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />
                                
                                <Route path='/front/tool' render={() => {
                                     return <MockupTool onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }} />
                                <Route  path="/front/about" render={() => {
                                     return <AboutUs onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }} />

                                <Route  path="/front/contact" render={() => {
                                     return <Contactus onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }} />
                                <Route  path="/front/faq" render={() => {
                                     return <FAQ onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }} />
                                <Route  path="/front/register" render={() => {
                                     return <Signup onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }} />
                                <Route  path="/front/profile" render={() => {
                                     return <Profile onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />
                                <Route exact path="/front" render={() => {
                                     return <Home onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />

                                <Route exact path="/front/questions" render={() => {
                                     return <Questions onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />

                                <Route exact path="/front/usermanual" render={() => {
                                     return <UserManualPdf onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />

                                <Route exact path="/front/resetpassword/:token" render={() => {
                                     return <ResetPassword onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />

                                <Route exact path="/front/tnc" render={() => {
                                     return <TnC onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />

                                <Route exact path="/front/emailverification" render={() => {
                                     return <EmailVerification onHeaderHover={this.handlerLoginHover.bind(this)} />
                                 }}  />

                                <Route exact path="/front/index" render={() => {
                                        return <LoginIndex onHeaderHover={this.handlerLoginHover.bind(this)} />
                                }}  />

                                <Route exact path="/front/getstarted" render={() => {
                                    return <GetStarted onHeaderHover={this.handlerLoginHover.bind(this)} />
                                }} />

                                <Route exact path="/front/sendresetlink" render={() => {
                                    return <PasswordReset onHeaderHover={this.handlerLoginHover.bind(this)} />
                                }} />

                            </Switch> 
                            </div>
                            <Footer />
                       
                   </div>
        );
  }
}

export default Frontendrouters;
