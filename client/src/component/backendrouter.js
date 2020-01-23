import React, { Component } from 'react';
import {  Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import AdminHeader from '../admin/Acomponent/adminheader';
import AdminDashboard from '../admin/Acomponent/dashboard';
import AdminUserlist from '../admin/Acomponent/userlist';
import AdminContactList from '../admin/Acomponent/admincontactlist';
import AdminActivitylogList from '../admin/Acomponent/useractivitylog';
import AddSlider from '../admin/Acomponent/pages/home/slider/addSlider';
import SliderList from '../admin/Acomponent/pages/home/slider/sliderList';
import addEic from '../admin/Acomponent/pages/home/EIC/addEic';
import EicList from '../admin/Acomponent/pages/home/EIC/EICList';
import whoCanUseIt from '../admin/Acomponent/pages/home/whocanuseit/whocanuseit';
import Peaceofmind from '../admin/Acomponent/pages/home/peaceofmind/peaceofmind';
import Easytouse from '../admin/Acomponent/pages/home/easytouse/easytouse';
import AddFAQ from '../admin/Acomponent/pages/faq/addfaq';
import FAQList from '../admin/Acomponent/pages/faq/faqlist';
import FAQheader from '../admin/Acomponent/pages/faq/faqheader';
import Serviceheader from '../admin/Acomponent/pages/service/servicebanner';
import ServiceSolution from '../admin/Acomponent/pages/service/serviceSolution';
import AddServices from '../admin/Acomponent/pages/service/servicesSection/addservices';
import ServicesList from '../admin/Acomponent/pages/service/servicesSection/servicelist';
import AddPriceing from '../admin/Acomponent/pages/service/pricing/addpricing';
import QuestionnaireList from '../admin/Acomponent/pages/questionnaire/questionnaire';

/****vks*****/

import TraditionalOverview from '../admin/Acomponent/pages/traditional/overview';
import TradTabBackground from './../admin/Acomponent/pages/traditional/background';
import TradTabWithdrawalRate from './../admin/Acomponent/pages/traditional/withdrawalrate';
import TradTabVariableAnnuities from './../admin/Acomponent/pages/traditional/variableannuities';
import TradTabExecutiveSummary from './../admin/Acomponent/pages/traditional/executivesummary';
import TraditionalIndexes from './../admin/Acomponent/pages/traditional/indexes';

import SetItAndLeaveItOverview from '../admin/Acomponent/pages/setitandleaveit/overview';
import SIALITabBackground from './../admin/Acomponent/pages/setitandleaveit/background';
import SIALITabMechanics from './../admin/Acomponent/pages/setitandleaveit/mechanics';
import SIALITabProsAndCons from './../admin/Acomponent/pages/setitandleaveit/prosandcons';
import SIALITabExample from './../admin/Acomponent/pages/setitandleaveit/example';
import SetItAndLeaveItIndexes from './../admin/Acomponent/pages/setitandleaveit/indexes';

import VideosTitle from '../admin/Acomponent/pages/videos/title';
import VideosContent1 from '../admin/Acomponent/pages/videos/content1';
import VideosContent2 from '../admin/Acomponent/pages/videos/content2';
import VideosContent3 from '../admin/Acomponent/pages/videos/content3';
import VideosContent4 from '../admin/Acomponent/pages/videos/content4';
import VideosContent5 from '../admin/Acomponent/pages/videos/content5';
import VideosContent6 from '../admin/Acomponent/pages/videos/content6';

import AboutOverview from '../admin/Acomponent/pages/about/overview';
import AboutMotivation from '../admin/Acomponent/pages/about/motivation';
import AboutMyBackground from '../admin/Acomponent/pages/about/mybackground';
import AboutEvolution from '../admin/Acomponent/pages/about/evolution';
import PricingList from '../admin/Acomponent/pages/service/pricing/pricinglist';

import ResearchOverview from '../admin/Acomponent/pages/research/overview';
import AddNewResearch from './../admin/Acomponent/pages/research/our_research/newresearch';
import OurResearchList from './../admin/Acomponent/pages/research/our_research/researchlist';
import AddNewResource from './../admin/Acomponent/pages/research/other_resources/newresource';
import OtherResourceList from './../admin/Acomponent/pages/research/other_resources/resourcelist';

import AddAccordian from '../admin/Acomponent/pages/traditional/addAccordian';
import AccordianList from '../admin/Acomponent/pages/traditional/accordianList';

import AddTableRow from '../admin/Acomponent/pages/traditional/addTableRow';
import TableRowList from '../admin/Acomponent/pages/traditional/tableRowList';



class Frontendrouters extends Component{
   constructor(props){
       super(props);
       this.state ={
           open:false
       }
   }
    render(){
        return(
                   <div className="frontendrouter-section">
                      
                        <AdminHeader />
                            <div>
                            <Switch>
                                <Route exact path="/admin" component={AdminDashboard} />
                                <Route path="/admin/Dashboard" component={AdminDashboard} />
                                <Route path="/admin/userlist" component={AdminUserlist} />
                                <Route path="/admin/contactlist" component={AdminContactList} />
                                <Route path="/admin/activitylog" component={AdminActivitylogList} />
                                <Route path="/admin/addslider" component={AddSlider} />
                                <Route path="/admin/sliderlist" component={SliderList} />
                                <Route path="/admin/addEIC" component={addEic} />
                                <Route path="/admin/Eiclist" component={EicList} />
                                <Route path="/admin/whocanuseit" component={whoCanUseIt} />
                                <Route path="/admin/peaceofmind" component={Peaceofmind} />
                                <Route path="/admin/easytouse" component={Easytouse} />
                                <Route path="/admin/addfaq" component={AddFAQ} />
                                <Route path="/admin/faqlist" component={FAQList} />
                                <Route path="/admin/faqbanner" component={FAQheader} />
                                <Route path="/admin/servicebanner" component={Serviceheader} />
                                <Route path="/admin/servicesolution" component={ServiceSolution} />
                                <Route path="/admin/addservices" component={AddServices} />
                                <Route path="/admin/serviceslist" component={ServicesList} />
                                <Route path="/admin/addpricing" component={AddPriceing} />
								<Route path="/admin/pricinglist" component={PricingList} />
                                <Route path="/admin/questionnairelist" component={QuestionnaireList} />
                                
								/**** vks *****/
								
								<Route path="/admin/pages/traditional/overview" component={TraditionalOverview} />
                                <Route path="/admin/pages/traditional/background" component={TradTabBackground} />
                                <Route path="/admin/pages/traditional/withdrawalrate" component={TradTabWithdrawalRate} />
                                <Route path="/admin/pages/traditional/variableannuities" component={TradTabVariableAnnuities} />
                                <Route path="/admin/pages/traditional/executivesummary" component={TradTabExecutiveSummary} />     
                                <Route path="/admin/pages/traditional/indexes" component={TraditionalIndexes} /> 

                                <Route path="/admin/pages/setitandleaveit/overview" component={SetItAndLeaveItOverview} />
                                <Route path="/admin/pages/setitandleaveit/background" component={SIALITabBackground} />
                                <Route path="/admin/pages/setitandleaveit/mechanics" component={SIALITabMechanics} />
                                <Route path="/admin/pages/setitandleaveit/prosandcons" component={SIALITabProsAndCons} />  
                                <Route path="/admin/pages/setitandleaveit/example" component={SIALITabExample} />                                   
                                <Route path="/admin/pages/setitandleaveit/indexes" component={SetItAndLeaveItIndexes} /> 
                                
                                <Route path="/admin/pages/videos/title" component={VideosTitle} /> 
                                <Route path="/admin/pages/videos/video1" component={VideosContent1} /> 
                                <Route path="/admin/pages/videos/video2" component={VideosContent2} /> 
                                <Route path="/admin/pages/videos/video3" component={VideosContent3} /> 
                                <Route path="/admin/pages/videos/video4" component={VideosContent4} /> 
                                <Route path="/admin/pages/videos/video5" component={VideosContent5} /> 
                                <Route path="/admin/pages/videos/video6" component={VideosContent6} /> 

                                <Route path="/admin/pages/research/overview" component={ResearchOverview} />
                                <Route path="/admin/pages/research/addourresearch" component={AddNewResearch} />
                                <Route path="/admin/pages/research/addotherresource" component={AddNewResource} /> 
                                <Route path="/admin/pages/research/ourresearchlist" component={OurResearchList} />
                                <Route path="/admin/pages/research/otherresourcelist" component={OtherResourceList} />                               


                                <Route path="/admin/pages/about/overview" component={AboutOverview} /> 
                                <Route path="/admin/pages/about/motivation" component={AboutMotivation} /> 
                                <Route path="/admin/pages/about/mybackground" component={AboutMyBackground} /> 
                                <Route path="/admin/pages/about/evolution" component={AboutEvolution} /> 
								
                                <Route path="/admin/pages/traditional/addaccordian" component={AddAccordian} />
                                <Route path="/admin/pages/traditional/accordianlist" component={AccordianList} />

								<Route path="/admin/pages/traditional/addtablerow" component={AddTableRow} />
                                <Route path="/admin/pages/traditional/tablerowlist" component={TableRowList} />
								
                            </Switch>
                            </div>
                        {/* <AdminFooter /> */}
                       
                   </div>
        );
  }
}

export default Frontendrouters;
