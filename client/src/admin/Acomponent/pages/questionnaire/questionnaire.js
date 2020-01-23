import React, { Component } from 'react';
import { MDBDataTable  } from 'mdbreact';
import { Button,Alert,Modal,OverlayTrigger,Tooltip } from 'react-bootstrap';
import Adminsidebar from '../../adminsidebar';
import NumberFormat from 'react-number-format';
import AdminService from '../../../Aservice/adminservice'
import portfolioimg from '../../../adminimg/portfolio.png'
import portfolioimg1 from '../../../../assets/img/portfolio.png'
import pdfMake from "pdfmake";
import jsPDF from 'jspdf';
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import moment from 'moment';
 const AdminAPI = new AdminService();
 let RowArray=[];
 
class QuestionnaireList extends Component{
   constructor(props){
       super(props);
       this.state ={

        users: {},
        show: false,
        questionDetails: {},
        fields: {},
        id: '',
        name: '',
        email: '',
        showAlert:false,
        showModalDialog:false, 
        deleteModal: false,
        currentStep: 1,
        name:  '',
        address: '',
        phone: '',
        reasonGoalConsultation:'',
       // reasonSIALI:'',
       // email:'',
        age:'',
        married:'',
        Kids:'',
        grandkid:'',
        pets:'',
        personalOtherDetails:'',
        homeValue:'',
        Mortgage:'',
        approxEquity:'',
        homeBox:'',
        iWeRent:'',
        monthlyRent:'',
        homeBanking:'',
        homeBrokerage:'',
        homeRetirementAccount:'',
        homeRothAccount:'',
        homeOther:'',
        homeSS:'',
        homePension:'',
        banking:'',
        brokerage:'',
        retirementAccount:'',
        rothAccount:'',
        otherTypes:'',
        otherApproxValue:'',
        dbAssetsApproxTotal:'',
        socailSecurity:'',
        pension:'',
        others:'',
        essential:'',
        discretionary:'',
        oneOffExpenses:'',
        medicare:'',
        noInsurance:'',
        supplementalHealth:'',
        longtermcare:'',
        lifeInsurance:'',
        lifeInType:'',
        lifeamount:'',
        inother:'',
        inotherbox:'',
        analyticalInExperience:'',
        capitalPreservation:'',
        investIncome:'',
        investGrowth:'',
        investGrowthIncome:'',
        investAggressiveGrowth:'',
        currentAllocationStock:'',
        experience_1_10:'',
        expectations:'',
        experience_gb:'',
        riskAggressive:'',
        riskModerate:'',
        riskConservative:'',
        portfolioDrawdown:'',
        riskPreservation:'',
        riskIncome:'',
        riskGrowth:'',
        lastMarketDownturn:'',
        portfolio1:'',
        portfolio2:'',
        portfolio3:'',
        portfolio4:'',
        portfolio5:'',
        aaii:'',
        advisorPerspectives:'',
        alphaArchiect:'',
        referral:'',
        referralContent:'',
        otherOthers:'',
        otherOthersContent:'',
        whatAttracted:'',
        improveQuestionnaire:'',

        setItAndLeaveItRetirement:'',
        fixedAnnuityProduct:'',
        insuranceProduct:'',
        investmentAdvice:'',
        estatePlanning:'',
        taxPlanning:'',
        otherGoalService:'',
        goalComment:'',
        goalQuestion:'',
        pdfAlertmsg:true,
        selectedQueId: ''

       } 
       this.getAllQuestionnaire = this.getAllQuestionnaire.bind(this);
       this.handleHide = this.handleHide.bind(this);

        this.handleChange = this.handleChange.bind(this)
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
        this._start = this._start.bind(this)
        this.clr = this.clr.bind(this)
        this.sideButtonFuc = this.sideButtonFuc.bind(this);
   }
   pdfPrintSubmit=()=>{

    let linkElement = process.env.PUBLIC_URL + '/upload-file/HelloWorld.pdf';
    let link = document.createElement('a');
    link.download = 'question.pdf';
    link.href = linkElement;
    link.click();
   // this.setState({ showModalDialog: false, pdfdata: '' });
     console.log('linkElement:',linkElement);
    const datavalue={
      //'pdfpath':'./client/public/upload-file/HelloWorld.pdf'
      'pdfpath':'./client/build/upload-file/HelloWorld.pdf'
    }

    setTimeout( function() {
       
    AdminAPI.AdminpdfPrintDelete(datavalue).then((result) => {
      console.log('xxx res delete:', result );
        this.setState({
          showModalDialog: false
        });
    }).catch(err => {
      console.log('xxx new:', err);
    }) 

  } .bind(this),7000);

   }

   closeDialog=()=> {
    this.setState({ showModalDialog: false, pdfdata: '' });
  }
  closeModal = () => {
    this.setState({
      deleteModal: false, pdfdata: ''
    });
  }
  openDialogEvent(pdfdata) {
      const datavalue={
        'pdfContent':pdfdata
      }
    AdminAPI.AdminpdfPrintSubmit(datavalue).then((result) => {
  
       this.setState({ showModalDialog: true});
       setTimeout( function() {
            this.setState({pdfAlertmsg:false});
        } .bind(this),7000);
    }).catch(err => {
      console.log('xxx new:', err);
    }) 
  }

  closeDialogEvent(queId) {
    this.setState({ deleteModal: true,
    selectedQueId: queId
    });
  }

  closeDialogEvent1 = () => {
    AdminAPI.UserQueDelete(this.state.selectedQueId).
    then((result) => {
      console.log('xxx delete',result);
      this.setState({ deleteModal: false}); 
      this.getAllQuestionnaire();
    }).catch(err => {
      console.log('err',err);
    })
  }


componentDidMount(){
    this.getAllQuestionnaire();
    console.log('xxxx getall',);
    
}

handleHide() {
    this.setState({ show: false, currentStep: 1 });
  }

ShowList(question) {
     this.setState({
         show: true,
         questionDetails: question,
     });
     console.log('xxxx question is',question.phone);
     
}

sideButtonFuc(step){
  var elmnt = document.getElementById("profileDashboard");
  elmnt.scrollIntoView({behavior:"smooth"});
  let currentStep = parseInt(step.currentTarget.dataset.id);
  this.setState({
    currentStep: currentStep
  })
  console.log('current step 2 dec',this.state.currentStep);
}

getAllQuestionnaire() {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

    AdminAPI.getQuestionnaireAll()
          .then(res => {
            RowArray = [];
            let setItAndLeaveItRetirementValue='',fixedAnnuityProductValue='',insuranceProductValue='',investmentAdviceValue='',estatePlanningValue='',otherGoalServiceValue='',iWeRentValue='',homeBankingValue='',homeBrokerageValue='',homeRetirementAccountValue='',homeRothAccountValue='',homeOtherValue='',AssetsApproxTotalValue='',homeSSValue='',homePensionValue='', medicareValue='',noInsuranceValue='',supplementalHealthValue='',longtermcareValue='',analyticalInExperienceValue='',capitalPreservationValue='',investIncomeValue='',investGrowthValue='',investGrowthIncomeValue='',investAggressiveGrowthValue='',aaiiValue='',advisorPerspectivesValue='',alphaArchiectValue='',
            referralContentValue='',otherOthersContentValue='',riskAggressiveValue='',riskModerateValue='',riskConservativeValue='',portfolio1Value='',portfolio2Value='',portfolio3Value='',portfolio4Value='',portfolio5Value='',lifeInsuranceValue='',pensionValue='',socailSecurityValue='',monthlyRentValue='',bankingValue='',brokerageValue='',retirementAccountValue='',essentialValue='',discretionaryValue='',rothAccountValue='',otherApproxValue12='',lifeamountValue='',homeValuedata='',MortgageValuedata='';
            console.log('DataQ:',res);
            for(let i=0; i<res.data.data.length; i++){
             var quedate = res.data.data[i].datetime;
             const quedatetime = moment(quedate).format("YYYY-MM-DD HH:mm"); 


              var AssetsApproxEquity=0,AssetsApproxTotal=0,AssetsApproxBudget=0; 
              if(res.data.data[i].homeValue || res.data.data[i].Mortgage){
                if(res.data.data[i].homeValue && !res.data.data[i].Mortgage ){
                    AssetsApproxEquity = parseInt(res.data.data[i].homeValue.replace(/,/g,""));
                }else if(res.data.data[i].homeValue && res.data.data[i].Mortgage){
                    AssetsApproxEquity = parseInt(res.data.data[i].homeValue.replace(/,/g,""))-parseInt(res.data.data[i].Mortgage.replace(/,/g,""));
                }
               
            }

        

              if(res.data.data[i].banking || res.data.data[i].brokerage || res.data.data[i].retirementAccount ){
                let banking=0,brokerage=0,retirementAccount=0;
                if(res.data.data[i].banking){
                    banking = parseInt(res.data.data[i].banking.replace(/,/g,""));
                }else{
                    banking=0;
                }
    
                if(res.data.data[i].brokerage){
                    brokerage=parseInt(res.data.data[i].brokerage.replace(/,/g,""));
                }else{
                    brokerage=0;
                }
    
                if(res.data.data[i].retirementAccount){
                    retirementAccount=parseInt(res.data.data[i].retirementAccount.replace(/,/g,""));
                }else{
                    retirementAccount=0;
                }
    
                AssetsApproxTotal = banking+brokerage+retirementAccount;
               
            }else{
                AssetsApproxTotal = 0;
            }

              if(res.data.data[i].essential || res.data.data[i].discretionary){

                if(res.data.data[i].essential && !res.data.data[i].discretionary ){
                    AssetsApproxBudget = parseInt(res.data.data[i].essential.replace(/,/g,""));
                }else if(res.data.data[i].essential && res.data.data[i].discretionary){
                    AssetsApproxBudget = parseInt(res.data.data[i].essential.replace(/,/g,""))+parseInt(res.data.data[i].discretionary.replace(/,/g,""));
                }
            }


                if(res.data.data[i].setItAndLeaveItRetirement){ setItAndLeaveItRetirementValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png">  '+res.data.data[i].setItAndLeaveItRetirement+' </p>'; }
                if(res.data.data[i].medicare){ medicareValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].medicare+' </p>'; }
                if(res.data.data[i].noInsurance){ noInsuranceValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].noInsurance+' </p>'; }
                if(res.data.data[i].supplementalHealth){ supplementalHealthValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].supplementalHealth+' </p>'; }
                if(res.data.data[i].longtermcare){ longtermcareValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].longtermcare+' </p>'; }
                if(res.data.data[i].aaii){ aaiiValue = '<p style="color:red;" className="answerContent"> <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> American Association of Individual Investors (AAII) </p>'; }
                if(res.data.data[i].advisorPerspectives){ advisorPerspectivesValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Advisor Perspectives </p>'; }
                if(res.data.data[i].alphaArchiect){ alphaArchiectValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Alpha Architect</p>'; }
                if(res.data.data[i].referralContent){ referralContentValue = '<p style="color:red;" className="answerContent"> <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Referral1111</p>'; }
                if(res.data.data[i].otherOthersContent){ otherOthersContentValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Other</p>'; }
                if(res.data.data[i].riskAggressive){ riskAggressiveValue = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Aggressive (healthy appetite for risk) </p>'; }
                if(res.data.data[i].riskModerate){ riskModerateValue = '<p style="color:red;" className="answerContent"> <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png">  Moderate (seek more balanced risk) </p>'; }
                if(res.data.data[i].riskConservative){ riskConservativeValue = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Conservative (generally prefer less risk) </p>'; }
                if(res.data.data[i].portfolio1){ portfolio1Value = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Portfolio 1 (most conservative) </p>'; }
                if(res.data.data[i].portfolio2){ portfolio2Value = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Portfolio 2</p>'; }
                if(res.data.data[i].portfolio3){ portfolio3Value = '<p style="color:red;" className="answerContent"> <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Portfolio 3</p>'; }
                if(res.data.data[i].portfolio4){ portfolio4Value = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Portfolio 4</p>'; }
                if(res.data.data[i].portfolio5){ portfolio5Value = '<p style="color:red;" className="answerContent"> <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Portfolio 5 (most aggressive)</p>'; }
                if(res.data.data[i].analyticalInExperience){ analyticalInExperienceValue = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> I am/we are very analytical (regardless of investment experience) </p>'; }
                if(res.data.data[i].capitalPreservation){ capitalPreservationValue = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Capital preservation (lower returns are OK if volatility is low) </p>'; }
                if(res.data.data[i].investIncome){ investIncomeValue = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Income (income for retirement or other purposes is a top priority) </p>'; }
                if(res.data.data[i].investGrowth){ investGrowthValue = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Growth (willing to accept higher volatility for higher returns) </p>'; }
                if(res.data.data[i].investGrowthIncome){ investGrowthIncomeValue = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Growth + income (higher volatility acceptable if income is secure) </p>'; }
                if(res.data.data[i].investAggressiveGrowth){ investAggressiveGrowthValue = '<p style="color:red;" className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Aggressive growth (returns are top priority and significant volatility is acceptable)</p>'; }
                if(res.data.data[i].fixedAnnuityProduct){ fixedAnnuityProductValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].fixedAnnuityProduct+' </p>'; }
                if(res.data.data[i].insuranceProduct){ insuranceProductValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].insuranceProduct+' </p>'; }
                if(res.data.data[i].investmentAdvice){ investmentAdviceValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].investmentAdvice+' </p>'; }
                if(res.data.data[i].estatePlanning){ estatePlanningValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].estatePlanning+' </p>'; }
                if(res.data.data[i].otherGoalService){ otherGoalServiceValue = '<p style="color:red;" className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].otherGoalService+' </p>'; }
                if(res.data.data[i].iWeRent){ iWeRentValue = '<p  className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> '+res.data.data[i].iWeRent+' </p>'; }
                if(res.data.data[i].homeBanking){ homeBankingValue = '<p  className="answerContent"><img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Banking </p>'; }
                if(res.data.data[i].homeBrokerage){ homeBrokerageValue = '<p  className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Brokerage (taxable)</p>'; }
                if(res.data.data[i].homeRetirementAccount){ homeRetirementAccountValue = '<p className="answerContent"> <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Retirement accounts</p>'; }
                if(res.data.data[i].homeRothAccount){ homeRothAccountValue = '<p  className="answerContent"> <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Roth accounts</p>'; }
                if(res.data.data[i].homeOther){ homeOtherValue = '<p className="answerContent"> <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Other</p>'; }
                if(res.data.data[i].AssetsApproxTotal){ AssetsApproxTotalValue = formatter.format(res.data.data[i].AssetsApproxTotal); }else{
                AssetsApproxTotalValue = '$0,000';}
                if(res.data.data[i].homeSS){ homeSSValue = '<pclassName="answerContent"> <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Social security</p>'; }
                if(res.data.data[i].homePension){ homePensionValue = '<p className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Pension(s)</p>'; }

                if(res.data.data[i].lifeInsurance){ lifeInsuranceValue = '<p className="answerContent">  <img width="14px" src="http://pluspng.com/img-png/tick-box-png-checked-checkbox-icon-png-50-px-1600.png"> Life insurance</p>'; }
                
                if(res.data.data[i].socailSecurity){
                    socailSecurityValue = parseInt(res.data.data[i].socailSecurity.replace(/,/g,""));
                }
                if(res.data.data[i].pension){
                    pensionValue = parseInt(res.data.data[i].pension.replace(/,/g,""));
                }
                if(res.data.data[i].monthlyRent){
                    monthlyRentValue = parseInt(res.data.data[i].monthlyRent.replace(/,/g,""));
                }
                if(res.data.data[i].banking){
                    bankingValue = parseInt(res.data.data[i].banking.replace(/,/g,""));
                }
                if(res.data.data[i].brokerage){
                  brokerageValue = parseInt(res.data.data[i].brokerage.replace(/,/g,""));
                } 
                if(res.data.data[i].retirementAccount){
                  retirementAccountValue = parseInt(res.data.data[i].retirementAccount.replace(/,/g,"")); 
                } 
                if(res.data.data[i].rothAccount){
                  rothAccountValue = parseInt(res.data.data[i].rothAccount.replace(/,/g,"")); 
                } 
                if(res.data.data[i].otherApproxValue){
                  otherApproxValue12 = parseInt(res.data.data[i].otherApproxValue.replace(/,/g,"")); 
                } 
                if(res.data.data[i].essential){
                  essentialValue = parseInt(res.data.data[i].essential.replace(/,/g,""));
                }
                if(res.data.data[i].lifeamount){
                  lifeamountValue = parseInt(res.data.data[i].lifeamount);
                }
                if(res.data.data[i].referralContent){
                  referralContentValue = parseInt(res.data.data[i].referralContent);
                } 
                if(res.data.data[i].otherOthersContent){
                  otherOthersContentValue = parseInt(res.data.data[i].otherOthersContent);
                }
                if(res.data.data[i].discretionary){
                  discretionaryValue = parseInt(res.data.data[i].discretionary.replace(/,/g,""));
                }
                if(res.data.data[i].homeValue){
                  homeValuedata = parseInt(res.data.data[i].homeValue.replace(/,/g,""))
                }
                if(res.data.data[i].Mortgage){
                  MortgageValuedata = parseInt(res.data.data[i].Mortgage.replace(/,/g,""))
                }else{
                  MortgageValuedata = 0;
                }
        
               
  let pdfHtml='<div className="testHello"><div><div className="col-lg-12 col-md-12 col-sm-12"><div className="dashboard-contents questionAdminBorad" id="profileDashboardprint"><div class="row"><h4 style="text-align:center;">CONTACT DETAILS</h4><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="name">Name</label><p style="color:red;" className="answerContent">'+res.data.data[i].name+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="address"> Address:</label><p style="color:red;"  className="answerContent">'+res.data.data[i].address+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="phone">Phone</label><p style="color:red;"  className="answerContent">'+res.data.data[i].phone+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="reasonGoalConsultation"> Best time(s) to schedule free consultation</label><p style="color:red;"  className="answerContent">'+res.data.data[i].reasonGoalConsultation+'</p></div></div></div></div></div><div ><div style="page-break-before:always"></div><div className="col-lg-12 col-md-12 col-sm-12"><div className="dashboard-contents questionAdminBorad" id="profileDashboardprint"><div class="row"><h4 style="text-align:center;">GOALS DETAILS</h4><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">Services you may be interested in </label>'+setItAndLeaveItRetirementValue+fixedAnnuityProductValue+insuranceProductValue+investmentAdviceValue+estatePlanningValue+otherGoalServiceValue+'<p style="color:red;" className="answerContent">'+res.data.data[i].otherGoalService+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="address"> Comments regarding your goals for this consultation:</label><p style="color:red;" className="answerContent">'+res.data.data[i].goalComment+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="phone">Specific questions/topics you would like to address</label><p style="color:red;" className="answerContent">'+res.data.data[i].goalQuestion+'</p></div></div></div></div></div></div> <div style="page-break-before:always"></div><div className="col-lg-12 col-md-12 col-sm-12"><div className="dashboard-contents questionAdminBorad" id="profileDashboardprint"><div class="row"><h4 style="text-align:center;">PERSONAL DETAILS</h4><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" >Age</label><p style="color:red;" className="answerContent">'+res.data.data[i].age+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="address"> Married</label><p style="color:red;" className="answerContent">'+res.data.data[i].married+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="phone">Kids</label><p style="color:red;" className="answerContent">'+res.data.data[i].Kids+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="phone">Grand Kids</label><p style="color:red;" className="answerContent">'+res.data.data[i].grandkid+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="phone">Pets</label><p style="color:red;" className="answerContent">'+res.data.data[i].pets+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="phone">Other relevant details</label><p style="color:red;" className="answerContent">'+res.data.data[i].personalOtherDetails+'</p></div></div></div></div><div style="page-break-before:always"></div><div className="col-lg-12 col-md-12 col-sm-12"><div className="dashboard-contents questionAdminBorad" id="profileDashboardprint"><div class="row"><h4 style="text-align:center;">ASSETS DETAILS</h4><div style="width:100%" className="col-md-12 col-sm-12"><h6 style="font-weight:600;color:#000;font-size:18px;">Types of assets:</h6><table style="width:100%"><tr><td style="font-weight:600;color:#000;">Home value</td><td style="font-weight:600;color:#000;">Mortgage</td><td style="font-weight:600;color:#000;">Approx. equity</td></tr><tr><td style="color:red;">'+formatter.format(homeValuedata)+'</td><td style="color:red;">'+formatter.format(MortgageValuedata)+'</td><td style="color:red;">'+formatter.format(AssetsApproxEquity)+'</td></tr></table></div><span className="bline"></span><div style="width:100%" className="col-md-12 col-sm-12"><table style="width:100%;margin-top:20px"><tr style="width:100%"><td></td><td style="font-weight:600;color:#000;" >Monthly rent</td></tr><tr style="width:100%"><td> '+iWeRentValue+'</td><td style="color:red">'+formatter.format(monthlyRentValue)+'</td></tr></table></div><span className="bline"></span><div className="col-md-12 col-sm-12"><table style="width:100%;margin-top:20px;"><tr style="width:100%"><th></th><th>Estimated value in accounts</th></tr><tr style="width:100%"><td>'+homeBankingValue+'</td><td style="color:red;">'+formatter.format(bankingValue)+'</td></tr><tr style="width:100%"><td>'+homeBrokerageValue+'</td><td style="color:red;">'+formatter.format(brokerageValue)+'</td></tr><tr style="width:100%"><td>'+homeRetirementAccountValue+'</td><td style="color:red;">'+formatter.format(retirementAccountValue)+'</td></tr><tr style="width:100%"><td>'+homeRothAccountValue+'</td><td style="color:red;">'+formatter.format(rothAccountValue)+'</td></tr><tr style="width:100%"><td>'+homeOtherValue+'</td><td style="color:red;">'+res.data.data[i].otherTypes+' &nbsp;&nbsp;&nbsp;&nbsp; '+formatter.format(otherApproxValue12)+'</td></tr><tr><td>Approx. asset total</td><td style="color:red;"> '+formatter.format(AssetsApproxTotal)+'</td></tr></table></div><span className="bline"></span><div className="col-md-12 col-sm-12"><h6 style="font-weight:600;color:#000;font-size:18px;">Income:</h6><table style="width:100%;margin-bottom:20px;"><tr style="width:100%"><th></th><th>Total annual income</th></tr><tr style="width:100%"><td>'+homeSSValue+'</td><td style="color:red;">'+formatter.format(socailSecurityValue)+'</td></tr><tr style="width:100%"><td>'+homePensionValue+'</td><td style="color:red;"> '+formatter.format(pensionValue)+'</td></tr></table></div><div style="width:100%" className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" >Other</label><p style="color:red;" className="answerContent">'+res.data.data[i].others+'</p></div></div></div></div><div style="page-break-before:always"></div><div className="testHello"><div><div className="col-lg-12 col-md-12 col-sm-12"><div className="dashboard-contents questionAdminBorad" id="profileDashboardprint"><div class="row"><h4 style="text-align:center;">BUDGET DETAILS (ANNUAL SPENDNG)</h4><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="essential">Essential spending (bare minimum spending requirement)</label> <p style="color:red;" className="answerContent"></p><p style="color:red;">'+formatter.format(essentialValue)+'</td></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="discretionary">Discretionary</label><p style="color:red;" className="answerContent"></p><p style="color:red;">'+formatter.format(discretionaryValue)+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="discretionary">Approx. total: </label><p style="color:red;" className="answerContent"></p><p style="color:red;">'+formatter.format(AssetsApproxBudget)+'</p></div><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="oneOffExpenses">Expected trend for expenses & one-off expenses<p style="color:red;" className="answerContent">'+res.data.data[i].oneOffExpenses+'</p></div></div></div></div></div><div><div style="page-break-before:always"></div><div className="col-lg-12 col-md-12 col-sm-12"><div className="dashboard-contents questionAdminBorad" id="profileDashboardprint"><div class="row"><h4 style="text-align:center;">INSURANCE DETAILS</h4><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;"></label>'+ medicareValue+noInsuranceValue+supplementalHealthValue+longtermcareValue+'<label style="font-weight:600;color:#000;"></label></div><span className="bline"></span><div className="col-md-12 col-sm-12"><table style="width:100%"><tr><td style="font-weight:600;color:#000;"></td><td style="font-weight:600;color:#000;">Type</td><td style="font-weight:600;color:#000;">Amount</td></tr><tr><td style="color:red;">'+lifeInsuranceValue+'</td> <td style="color:red;">'+res.data.data[i].lifeInType+'</td><td style="color:red;">'+formatter.format(lifeamountValue)+'</td></tr></table></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="inother">Other</label><p style="color:red;" className="answerContent">'+res.data.data[i].inother+'</p></div></div></div></div><div style="page-break-before:always"></div><div className="col-lg-12 col-md-12 col-sm-12"><div className="dashboard-contents questionAdminBorad" id="profileDashboardprint"><div class="row"><h4 style="text-align:center;">INVESTING DETAILS</h4><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="experience_1_10">Investment experience (1= novice / 10 = expert)</label><p style="color:red;" className="answerContent">'+res.data.data[i].experience_1_10+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;"></label>'+analyticalInExperienceValue+'<label style="font-weight:600;color:#000;"></label>'+'</div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">Performance expectations</label><p style="color:red;" className="answerContent">'+res.data.data[i].expectations+'</p></div><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">Notable investment experiences (good and/or bad)</label><p style="color:red;" className="answerContent">'+res.data.data[i].experience_gb+'</p></div><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">Investment performance goals (tick all that apply)</label>'+capitalPreservationValue+investIncomeValue+investGrowthValue+investGrowthIncomeValue+investAggressiveGrowthValue+'<label style="font-weight:600;color:#000;"></label>'+'</div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="currentAllocationStock">Current allocation to stocks and other risky assets</label><p style="color:red;" className="answerContent">'+res.data.data[i].currentAllocationStock+'</p></div><span className="bline"></span></div></div></div><div style="page-break-before:always"></div><div className="col-lg-12 col-md-12 col-sm-12"><div className="dashboard-contents questionAdminBorad" id="profileDashboardprint"><div class="row"><h4 style="text-align:center;">RISK DETAILS</h4><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">How do you view your risk tolerance?</label>'+riskAggressiveValue+riskModerateValue+riskConservativeValue+'<label style="font-weight:600;color:#000;"></label>'+'</div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;" htmlFor="portfolioDrawdown">Assuming your financial security would not be compromised, what is the maximum portfolio drawdown (decrease) you could tolerate?</label><p style="color:red;" className="answerContent">'+res.data.data[i].portfolioDrawdown+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">Please score the importance of each factor:</label><br/> <label style="font-weight:600;color:#000;" htmlFor="riskPreservation">Preservation</label><p style="color:red;" className="answerContent">'+res.data.data[i].riskPreservation+'</p><label style="font-weight:600;color:#000;" htmlFor="riskIncome"> Income</label><p style="color:red;" className="answerContent">'+res.data.data[i].riskIncome+'</p><label style="font-weight:600;color:#000;" htmlFor="riskGrowth"> Growth</label><p style="color:red;" className="answerContent">'+res.data.data[i].riskGrowth+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">How did you and your portfolio hold up during the last major market downturn (e.g., the credit crisis in 2008)?</label><p style="color:red;" className="answerContent">'+res.data.data[i].lastMarketDownturn+'</p></div><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">Please look at the example portfolios below and select the one with the most appealing risk-return profile over this hypothetical 10-year period.</label>'+portfolio1Value+portfolio2Value+portfolio3Value+portfolio4Value+portfolio5Value+'<label style="font-weight:600;color:#000;"></label>'+'<img width="400px" src="https://firebasestorage.googleapis.com/v0/b/test-85de8.appspot.com/o/portfolio.png?alt=media&token=d318a273-2936-45ed-a057-ac9644371161"/></div><span className="bline"></span></div></div></div><div style="page-break-before:always"></div><div className="col-lg-12 col-md-12 col-sm-12"><div className="dashboard-contents questionAdminBorad" id="profileDashboardprint"><div class="row"><h4 style="text-align:center;">OTHER DETAILS</h4><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">How did you discover SET IT AND LEAVE IT?</label>'+aaiiValue+advisorPerspectivesValue+alphaArchiectValue+'<label style="font-weight:600;color:#000;"></label>'+'</div><span className="bline"></span><div style="width:100%" className="col-md-12 col-sm-12"><table style="width:100%;margin-top:20px"><tr style="width:100%"><td></td><td style="font-weight:600;color:#000;">Referral22222222</td></tr><tr style="width:100%"><td> '+(referralContentValue)+'</td><td>'+formatter.format(referralContentValue)+'</td></tr></table></div><span className="bline"></span><div style="width:100%" className="col-md-12 col-sm-12"><table style="width:100%;margin-top:20px"><tr style="width:100%"><td></td><td style="font-weight:600;color:#000;"> Other</td></tr><tr style="width:100%"><td> '+otherOthersContentValue+'</td><td>'+formatter.format(otherOthersContentValue)+'</td></tr></table></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">What attracted you to SET IT AND LEAVE IT?</label><p style="color:red;" className="answerContent">'+res.data.data[i].whatAttracted+'</p></div><span className="bline"></span><div className="col-md-12 col-sm-12"><label style="font-weight:600;color:#000;">We welcome suggestions to help us improve this questionnaire:</label><p style="color:red;" className="answerContent">'+res.data.data[i].improveQuestionnaire+'</p></div><span className="bline"></span></div></div></div>';


             
  RowArray.push({name:res.data.data[i].name,datetime:quedatetime,phone:res.data.data[i].phone,address:res.data.data[i].address,action:[
    <OverlayTrigger overlay={<Tooltip id="tooltip-top">View</Tooltip>}>
        <Button  onClick={this.ShowList.bind(this, res.data.data[i])} variant="success" size="sm"><i class="fa fa-eye" aria-hidden="true"></i></Button>
    </OverlayTrigger>, 
      <OverlayTrigger overlay={<Tooltip id="tooltip-top">Download Pdf</Tooltip>}>
      <Button  onClick={this.openDialogEvent.bind(this, pdfHtml)}  variant="success" size="sm"><i class="fa  fa-file-pdf-o" aria-hidden="true"></i></Button>
     </OverlayTrigger>,
      <OverlayTrigger overlay={<Tooltip id="tooltip-top">Delete</Tooltip>}>
      <Button  onClick={this.closeDialogEvent.bind(this, res.data.data[i]._id)}  variant="success" size="sm"><i class="fa fa-trash-o" aria-hidden="true"></i></Button>
     </OverlayTrigger>

    ]}) 

               // }
          }
           this.setState({ users: RowArray });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }


_next() {
    var elmnt = document.getElementById("profileDashboard");
    elmnt.scrollIntoView({behavior:"smooth"});
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 9 ? 9: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
}
   
_prev() {
    var elmnt = document.getElementById("profileDashboard");
    elmnt.scrollIntoView({behavior:"smooth"});
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
}

_start() {
    var elmnt = document.getElementById("profileDashboard");
    elmnt.scrollIntoView({behavior:"smooth"});
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 1? 1: 1
    this.setState({
      currentStep: currentStep
    })
}
 
clr(){
  this.setState({
    name: '',
    reasonGoalConsultation: ''
  })
}

handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
}

get previousButton(){
    let currentStep = this.state.currentStep
    if(currentStep !==1){
        return (
        <div className="buttonGroups">  
        <button className="btn btn-primary adminpart previousbtn" type="button" onClick={this._start}><i class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Start</button>

        <button className="btn btn-primary adminpart previousbtn" type="button" onClick={this._prev}><i class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Back</button>
        </div>
        )
    }
    return null
}

get nextButton(){
    let currentStep = this.state.currentStep
    if(currentStep <=9){
        return (
            <div className="buttonGroups">
             <button className={`btn btn-primary adminpart nextbtn float-right classnext${this.state.currentStep}`} type="button" onClick={this._next}>Next<i class="fa fa-angle-double-right" aria-hidden="true"></i></button>
            </div>        
        )
    }
    return null
}


render(){
  console.log('xxx row array is',RowArray);
  
    const data = {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 50
          },
          { 
            label: 'Date/Time',
            field: 'datetime',
            sort: 'asc',
            width: 50
          },
          {
            label: 'Phone',
            field: 'phone',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Address',
            field: 'address',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Action',
            field: 'action',
            sort: 'asc',
            width: 200
          }
        ],
        rows: RowArray
      }

    var AssetsApproxEquity=0,AssetsApproxTotal=0,AssetsApproxBudget=0;


  if(this.state.questionDetails.homeValue || this.state.questionDetails.Mortgage){
      if(this.state.questionDetails.homeValue && !this.state.questionDetails.Mortgage ){
          AssetsApproxEquity = parseInt(this.state.questionDetails.homeValue.replace(/,/g,""));
      }else if(this.state.questionDetails.homeValue && this.state.questionDetails.Mortgage){
          AssetsApproxEquity = parseInt(this.state.questionDetails.homeValue.replace(/,/g,""))-parseInt(this.state.questionDetails.Mortgage.replace(/,/g,""));
      }
  }

    if(this.state.questionDetails.banking || this.state.questionDetails.brokerage || this.state.questionDetails.retirementAccount ){
      let banking=0,brokerage=0,retirementAccount=0;
      if(this.state.questionDetails.banking){
          banking = parseInt(this.state.questionDetails.banking.replace(/,/g,""));
      }else{
          banking=0;
      }

      if(this.state.questionDetails.brokerage){
          brokerage=parseInt(this.state.questionDetails.brokerage.replace(/,/g,""));
      }else{
          brokerage=0;
      }

      if(this.state.questionDetails.retirementAccount){
          retirementAccount=parseInt(this.state.questionDetails.retirementAccount.replace(/,/g,""));
      }else{
          retirementAccount=0;
      }

      AssetsApproxTotal = banking+brokerage+retirementAccount;
     

  }else{
      AssetsApproxTotal = 0;
  }



  if(this.state.questionDetails.essential || this.state.questionDetails.discretionary){

      if(this.state.questionDetails.essential && !this.state.questionDetails.discretionary ){
          AssetsApproxBudget = parseInt(this.state.questionDetails.essential.replace(/,/g,""));
      }else if(this.state.questionDetails.essential && this.state.questionDetails.discretionary){
          AssetsApproxBudget = parseInt(this.state.questionDetails.essential.replace(/,/g,""))+parseInt(this.state.questionDetails.discretionary.replace(/,/g,""));
      }
  }



    return(
        <div className="dashboard-section value">   
            <section id="main-dashboard">
            <Adminsidebar />
            <div class="dashboard-content">
              <div className="heading"><h4>Question lists</h4></div>
                        
                        <MDBDataTable striped bordered hover data={data}  />



                        <Modal
                            show={this.state.show}
                            onHide={this.handleHide}
                            container={this}
                            aria-labelledby="contained-modal-title"
                            size="lg"
                            dialogClassName="modal-90w"
                        >
                           <form >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                    Questionnaire Details
                               </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                 
                                   

                        <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="dashboard-contents questionAdminBorad" id="profileDashboard">
                             <div class="row">
                                <div class="col-md-3">
                                    <div class="question-left-tabs mycss" >
                                    <ul>
                                        <li>  <span onClick={ this.sideButtonFuc.bind(this)} data-id="1" className={this.state.currentStep == 1 ? 'active' : ''}>Contact</span> </li>
                                        <li>  <span onClick={ this.sideButtonFuc.bind(this)} data-id="2" className={this.state.currentStep == 2 ? 'active' : ''}>Goals</span> </li>
                                        <li>  <span onClick={ this.sideButtonFuc.bind(this)} data-id="3" className={this.state.currentStep == 3 ? 'active' : ''}>Personal</span> </li>
                                        <li>  <span onClick={ this.sideButtonFuc.bind(this)} data-id="4" className={this.state.currentStep == 4 ? 'active' : ''}>ASSETS</span> </li>
                                        <li>  <span onClick={ this.sideButtonFuc.bind(this)} data-id="5" className={this.state.currentStep == 5 ? 'active' : ''}>BUDGET</span> </li>
                                        <li>  <span onClick={ this.sideButtonFuc.bind(this)} data-id="6" className={this.state.currentStep == 6 ? 'active' : ''}>INSURANCE</span> </li>
                                        <li>  <span onClick={ this.sideButtonFuc.bind(this)} data-id="7" className={this.state.currentStep == 7 ? 'active' : ''}>INVESTING</span> </li>
                                        <li>  <span onClick={ this.sideButtonFuc.bind(this)} data-id="8" className={this.state.currentStep == 8 ? 'active' : ''}>RISK</span> </li>
                                        <li>  <span onClick={ this.sideButtonFuc.bind(this)} data-id="9" className={this.state.currentStep == 9 ? 'active' : ''}>OTHER</span> </li>
                                    </ul>
                                    </div>
                        
                                </div> 
                                <div class="col-md-9">
                                <div className="row dashboard-content-inner">
                                     
                            <form className="row" onSubmit={this.handleSubmit}>
                                {/* <Step1 
                                    currentStep={this.state.currentStep} 
                                /> */}

                                <Step1 
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    name={this.state.questionDetails.name}
                                    address={this.state.questionDetails.address}
                                    phone={this.state.questionDetails.phone}
                                    reasonGoalConsultation={this.state.questionDetails.reasonGoalConsultation}
                                />

                                <Step2 
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    setItAndLeaveItRetirement={this.state.questionDetails.setItAndLeaveItRetirement}
                                    fixedAnnuityProduct={this.state.questionDetails.fixedAnnuityProduct}
                                    insuranceProduct={this.state.questionDetails.insuranceProduct}
                                    investmentAdvice={this.state.questionDetails.investmentAdvice}
                                    estatePlanning={this.state.questionDetails.estatePlanning}
                                    taxPlanning={this.state.questionDetails.taxPlanning}
                                    otherGoalService={this.state.questionDetails.otherGoalService}
                                    goalComment={this.state.questionDetails.goalComment}
                                    goalQuestion={this.state.questionDetails.goalQuestion}
                                />

                                <Step3
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    age={this.state.questionDetails.age}
                                    married={this.state.questionDetails.married}
                                    Kids={this.state.questionDetails.Kids}
                                    grandkid={this.state.questionDetails.grandkid}
                                    pets={this.state.questionDetails.pets}
                                    personalOtherDetails={this.state.questionDetails.personalOtherDetails}
                                />

                                <Step4 
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    homeValue={this.state.questionDetails.homeValue}
                                    Mortgage={this.state.questionDetails.Mortgage}
                                    approxEquity={AssetsApproxEquity}
                                    homeBox={this.state.questionDetails.homeBox}
                                    iWeRent={this.state.questionDetails.iWeRent}
                                    monthlyRent={this.state.questionDetails.monthlyRent}
                                    homeBanking={this.state.questionDetails.homeBanking}
                                    homeBrokerage={this.state.questionDetails.homeBrokerage}
                                    homeRetirementAccount={this.state.questionDetails.homeRetirementAccount}
                                    homeRothAccount={this.state.questionDetails.homeRothAccount}
                                    homeOther={this.state.questionDetails.homeOther}
                                    homeSS={this.state.questionDetails.homeSS}
                                    homePension={this.state.questionDetails.homePension}
                                    banking={this.state.questionDetails.banking}
                                    brokerage={this.state.questionDetails.brokerage}
                                    retirementAccount={this.state.questionDetails.retirementAccount}
                                    rothAccount={this.state.questionDetails.rothAccount}
                                    otherTypes={this.state.questionDetails.otherTypes}
                                    otherApproxValue={this.state.questionDetails.otherApproxValue}
                                    dbAssetsApproxTotal={this.state.questionDetails.dbAssetsApproxTotal}
                                    AssetsApproxTotal={AssetsApproxTotal}
                                    socailSecurity={this.state.questionDetails.socailSecurity}
                                    pension={this.state.questionDetails.pension}
                                    others={this.state.questionDetails.others}
                                    canSubmit={this.state.canSubmit}
                                />

                                <Step5 
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    essential={this.state.questionDetails.essential}
                                    discretionary={this.state.questionDetails.discretionary}
                                    AssetsApproxBudget={AssetsApproxBudget}
                                    oneOffExpenses={this.state.questionDetails.oneOffExpenses}
                                    canSubmit={this.state.canSubmit}
                                />

                                <Step6 
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    medicare={this.state.questionDetails.medicare}
                                    noInsurance={this.state.questionDetails.noInsurance}
                                    supplementalHealth={this.state.questionDetails.supplementalHealth}
                                    longtermcare={this.state.questionDetails.longtermcare}
                                    lifeInsurance={this.state.questionDetails.lifeInsurance}
                                    lifeInType={this.state.questionDetails.lifeInType}
                                    lifeamount={this.state.questionDetails.lifeamount}
                                    inother={this.state.questionDetails.inother}
                                    inotherbox={this.state.questionDetails.inotherbox}
                                    canSubmit={this.state.canSubmit}
                                />

                                <Step7 
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    analyticalInExperience={this.state.questionDetails.analyticalInExperience}
                                    capitalPreservation={this.state.questionDetails.capitalPreservation}
                                    investIncome={this.state.questionDetails.investIncome}
                                    investGrowth={this.state.questionDetails.investGrowth}
                                    investGrowthIncome={this.state.questionDetails.investGrowthIncome}
                                    investAggressiveGrowth={this.state.questionDetails.investAggressiveGrowth}
                                    currentAllocationStock={this.state.questionDetails.currentAllocationStock}
                                    experience_1_10={this.state.questionDetails.experience_1_10}
                                    expectations={this.state.questionDetails.expectations}
                                    experience_gb={this.state.questionDetails.experience_gb}
                                    canSubmit={this.state.canSubmit}
                                />

                                
                                <Step8 
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    riskAggressive={this.state.questionDetails.riskAggressive}
                                    riskModerate={this.state.questionDetails.riskModerate}
                                    riskConservative={this.state.questionDetails.riskConservative}
                                    portfolioDrawdown={this.state.questionDetails.portfolioDrawdown}
                                    riskPreservation={this.state.questionDetails.riskPreservation}
                                    riskIncome={this.state.questionDetails.riskIncome}
                                    riskGrowth={this.state.questionDetails.riskGrowth}
                                    lastMarketDownturn={this.state.questionDetails.lastMarketDownturn}
                                    portfolio1={this.state.questionDetails.portfolio1}
                                    portfolio2={this.state.questionDetails.portfolio2}
                                    portfolio3={this.state.questionDetails.portfolio3}
                                    portfolio4={this.state.questionDetails.portfolio4}
                                    portfolio5={this.state.questionDetails.portfolio5}
                                    canSubmit={this.state.canSubmit}
                                />

                                <Step9
                                    currentStep={this.state.currentStep} 
                                    handleChange={this.handleChange}
                                    aaii={this.state.questionDetails.aaii}
                                    advisorPerspectives={this.state.questionDetails.advisorPerspectives}
                                    alphaArchiect={this.state.questionDetails.alphaArchiect}
                                    referral={this.state.questionDetails.referral}
                                    referralContent={this.state.questionDetails.referralContent}
                                    otherOthers={this.state.questionDetails.otherOthers}
                                    otherOthersContent={this.state.questionDetails.otherOthersContent}
                                    whatAttracted={this.state.questionDetails.whatAttracted}
                                    improveQuestionnaire={this.state.questionDetails.improveQuestionnaire}
                                    canSubmit={this.state.canSubmit}
                                />

                                
                                <div className="buttonSectionForm">
                                    {this.previousButton}
                                    {this.nextButton}
                                </div>
                                {/* <input type="hidden" ref="id" className="form-control" name="id" value={this.state.fields._id}/>
                                <input type="hidden" ref="loginuser" className="form-control" name="loginuser" value={this.state.fields.username}/> */}
                        
                            </form>
                                           
                            </div>
                            </div>
                            </div>
        
                        </div>
                     </div>

                            </Modal.Body>
                            <Modal.Footer>
                                 <Button variant="danger" size="sm" onClick={this.handleHide}>Close</Button>
                            </Modal.Footer>
                            </form>
                        </Modal>


                        
                <Modal className="static-modal-confirm" show={this.state.showModalDialog} onHide={this.closeDialog}>
                  <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title">
                        Confirmation 
                    </Modal.Title>
                  </Modal.Header>

                          <Modal.Body>
                            {this.state.pdfAlertmsg ? (<p> Please wait Questionnaire Data converting into PDF...</p>) : (<p>Questionnaire Data has been Successfully converted into PDF. please Click on download button.</p>)}
                            
                          </Modal.Body>
                          <Modal.Footer>
                              <Button variant="success" size="sm" onClick={this.closeDialog} >Cancel</Button>
                              {this.state.pdfAlertmsg ? (<Button variant="danger" disabled size="sm" >processing..</Button>) : (<Button variant="danger" onClick={this.pdfPrintSubmit} download size="sm" >Download</Button>) }
                              
                          </Modal.Footer>
                  </Modal>

              <Modal className="static-modal-confirm" show={this.state.deleteModal} onHide={this.closeModal}>
                  <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title">
                        Confirmation 
                    </Modal.Title>
                  </Modal.Header>

                          <Modal.Body>
                           Are you sure you want to delete?
                          </Modal.Body>
                          <Modal.Footer>
                              <Button variant="success" size="sm" onClick={this.closeModal} >Cancel</Button>
                              <Button variant="success" size="sm" onClick={this.closeDialogEvent1}>Delete</Button>
                              
                          </Modal.Footer>
                  </Modal>


              </div>
            </section>
        </div>
    );
   }
}

  class Step1 extends React.Component {
     
      render() {
  
        if (this.props.currentStep !== 1) {
          return null
        } 
        return(
          <React.Fragment>
          <h5>CONTACT DETAILS</h5>
  
          <div className="col-md-12 col-sm-12">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              id="name"
              name="name"
              type="text"
              placeholder="Enter name"
              defaultValue={this.props.name}
              onChange={this.props.handleChange}
              disabled
            />
          </div>
          </div>
  
          <div className="col-md-12 col-sm-12">
          <div className="form-group">
            <label htmlFor="address"> Address:</label>
              <textarea 
              className="form-control"
              id="address"
              name="address" 
              value={this.props.address} 
              onChange={this.props.handleChange}
              disabled
            />
          </div>       
          </div>
  
          <div className="col-md-12 col-sm-12">
          <div className="form-group">
            <label htmlFor="phone">Phone111</label>
            <input
              className="form-control"
              id="phone"
              name="phone"
              // type="number"
              placeholder="Enter phone number"
              value={this.props.phone}
              onChange={this.props.handleChange}
              disabled
            />
          </div>
          </div>
  
  
          <div className="col-md-12 col-sm-12">
          <div className="form-group">
            <label htmlFor="reasonGoalConsultation"> Best time(s) to schedule free consultation</label>
              <textarea 
              className="form-control"
              id="reasonGoalConsultation"
              name="reasonGoalConsultation" 
              value={this.props.reasonGoalConsultation} 
              onChange={this.props.handleChange} 
              disabled
               />
          </div>       
          </div>
  
        </React.Fragment>
       )
     }
    }


    class Step2 extends React.Component {
        render() {
          if (this.props.currentStep !== 2) {
            return null
          } 
          return(
          <React.Fragment>
               <h5>GOALS</h5>
              
    
        <div className="col-md-12 col-sm-12">
            <div className="row">
           

                <div className="col-md-12 col-sm-12"> 
                    <div class="form-group goalServiceList">
                        <label>Services you may be interested in </label>
                        <p className="checkboxContent"> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.setItAndLeaveItRetirement ? 'checked' : ''}   value="Set It and Leave It retirement (comprehensive planning)" for="" name="setItAndLeaveItRetirement"/> Set It and Leave It Retirement (comprehensive planning) </p>
                        <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.fixedAnnuityProduct ? 'checked' : ''} onChange={this.props.handleChange} value="Fixed annuity product(s)" for="" name="fixedAnnuityProduct"/> Fixed annuity product(s) </p>
                        <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.insuranceProduct ? 'checked' : ''} onChange={this.props.handleChange} value="Insurance product(s) (e.g., life insurance or long-term care" for="" name="insuranceProduct"/> Insurance product(s) (e.g., life insurance or long-term care </p>
                        <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.investmentAdvice ? 'checked' : ''} onChange={this.props.handleChange} value="Investment advice/management" for="" name="investmentAdvice"/> Investment advice/management</p>
                        <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.estatePlanning ? 'checked' : ''} onChange={this.props.handleChange} value="Estate planning" for="" name="estatePlanning"/> Estate planning</p>
                        <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.taxPlanning ? 'checked' : ''} onChange={this.props.handleChange} value="Tax planning" for="" name="taxPlanning"/> Tax planning</p>
                        <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.otherGoalService ? 'checked' : ''} onChange={this.props.handleChange}  for=""/> Other 
                        <textarea 
                        className="form-control"
                        id="otherGoalService"
                        name="otherGoalService" 
                        value={this.props.otherGoalService} 
                        onChange={this.props.handleChange}
                        disabled />
                        </p>
                    </div>
                </div>

                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="goalComment"> Comments regarding your goals for this consultation</label>
                        <textarea 
                        className="form-control"
                        id="goalComment"
                        name="goalComment" 
                        value={this.props.goalComment} 
                        onChange={this.props.handleChange} disabled/>
                    </div>       
                </div>

                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="goalQuestion"> Specific questions/topics you would like to address</label>
                        <textarea 
                        className="form-control"
                        id="goalQuestion"
                        name="goalQuestion" 
                        value={this.props.goalQuestion} 
                        onChange={this.props.handleChange} disabled />
                    </div>       
                </div>

            </div>
        </div>
     
    
          </React.Fragment>
        )
       }
      }


    
    class Step3 extends React.Component {

        createAge = () => {
            let ages = []
            for (let i = 18; i <= 99; i++) {
              ages.push(<option value={`${i}`}>{i}</option>)
            }
            return ages
          }
          
      render() {
        if (this.props.currentStep !== 3) {
          return null
        } 
        return(
        <React.Fragment>
             <h5>PERSONAL DETAILS</h5>
            
  
          <div className="col-md-12 col-sm-12">
              <div className="row">
              <div className="col-md-3 col-sm-12"> 
              <div className="form-group">
              <label htmlFor="name">Age</label>
                 <select disabled value={this.props.age}  id="age" name="age" onChange={this.props.handleChange}  className="form-control" >
                    <option value=""> Select</option>
                    {this.createAge()}
                  </select>
              </div>
              </div>
   
              <div className="col-md-3 col-sm-12">
              <div className="form-group">
              <label htmlFor="name">Married</label>
       
  
                 <select disabled value={this.props.married}  id="married" name="married" onChange={this.props.handleChange}  className="form-control" >
                    <option value=""> Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No"> No </option>
                  </select>
              </div>
              </div>
  
              <div className="col-md-3 col-sm-12">
              <div className="form-group">
              <label htmlFor="name">Kids</label>
                <select disabled value={this.props.Kids}  id="Kids" name="Kids" onChange={this.props.handleChange}  className="form-control" >
                    <option value=""> Select</option>
                    <option value="1">1</option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                </select>
              </div>
              </div>
  
              <div className="col-md-3 col-sm-12">
              <div className="form-group">
              <label htmlFor="name">Grand Kids</label>
                <select disabled value={this.props.grandkid}  id="grandkid" name="grandkid" onChange={this.props.handleChange}  className="form-control" >
                    <option value=""> Select</option>
                    <option value="1">1</option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                </select>
              </div>
              </div>
  
              <div className="col-md-3 col-sm-12">
              <div className="form-group">
              <label htmlFor="name">Pets</label>
                <select disabled value={this.props.pets}  id="pets" name="pets" onChange={this.props.handleChange}  className="form-control" >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                </select>
              </div>
              </div>

              
              <div className="col-md-12 col-sm-12">
                <div className="form-group">
                    <label htmlFor="personalOtherDetails">Other relevant details</label>
                    <textarea 
                    className="form-control"
                    id="personalOtherDetails"
                    name="personalOtherDetails" 
                    placeholder="E.g., medical situation, legacy goals (specific heirs, charities, or beneficiaries), etc."
                    value={this.props.personalOtherDetails} 
                    onChange={this.props.handleChange} disabled />
                </div>       
            </div>

  
              </div>
          </div>
   
  
        </React.Fragment>
      )
     }
    }
    
    class Step4 extends React.Component {



      render() {
        if (this.props.currentStep !== 4) {
          return null
        }        
        
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          });

        return(
        <React.Fragment>
             <h5>ASSETS DETAILS</h5>
            
             <div className="col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                 <h6>Types of assets</h6>
                 <div className="row">
                 <div className="col-md-12 col-sm-12">
                 <table class="assestTable1">
                    <tr>
                        <td>   <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.homeBox ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="home" name="homeBox" /> Home </p>  </td>
                        <td>    
                              <div className="form-group">
                                <label htmlFor="name">Home value</label>
                                <NumberFormat
                                    className="form-control"
                                    id="homeValue"
                                    name="homeValue"
                                    type="text"
                                    value={this.props.homeValue}
                                    onChange={this.props.handleChange}
                                    thousandSeparator={true}
                                    disabled
                                />
                            </div> 
                        </td>
                        <td>  
                                <div className="form-group">
                                    <label htmlFor="name">Mortgage</label>
                                    <NumberFormat
                                        className="form-control"
                                        id="Mortgage"
                                        name="Mortgage"
                                        type="text"
                                        value={this.props.Mortgage}
                                        onChange={this.props.handleChange}
                                        thousandSeparator={true}
                                        disabled
                                    />
                                </div>
                        </td>
                        <td>     
                                <div className="form-group">
                                    <label htmlFor="name">Approx. equity</label>
                                    <h6 className="approxEquityValue">{this.props.approxEquity ? formatter.format(this.props.approxEquity) :'$0,000'}</h6>
                                 </div>

                        </td>
                    </tr>
                 </table>
  </div>
                 </div>
                 </div>
  
          </div>    


          <div className="row">
                 <div className="col-md-12 col-sm-12">
                 <div className="row">
                 <div className="col-md-12 col-sm-12">

                 <table class="assestTable1">
                    <tr>
                        <td>  
                            <p  className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.iWeRent ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="I/we rent" name="iWeRent" /> I/we rent</p>
                        </td>
                        <td>    
                            <div className="form-group">
                                <label htmlFor="name">Monthly rent</label>
                                <NumberFormat
                                    className="form-control"
                                    id="monthlyRent"
                                    name="monthlyRent"
                                    type="text"
                                    value={this.props.monthlyRent}
                                    onChange={this.props.handleChange}
                                    thousandSeparator={true}
                                    disabled
                                />
                            </div> 
                        </td>

                    </tr>
                 </table>
                </div> 
            </div>
            </div>
          </div> 

  

          <div className="row">
          <div className="col-md-12 col-sm-12">
                <table class="assestTable">
                    <tr>
                        <td> </td>
                        <td>Estimated value in accounts </td>
                    </tr>

                    <tr>
                        <td> <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.homeBanking ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homeBanking" name="homeBanking" /> Banking</p></td>
                        <td> 
                            <NumberFormat
                                className="form-control"
                                id="banking"
                                name="banking"
                                type="text"
                                value={this.props.banking}
                                onChange={this.props.handleChange}
                                placeholder="Checking and savings accounts"
                                disabled
                                thousandSeparator={true}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.homeBrokerage ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homeBrokerage" name="homeBrokerage" /> Brokerage (taxable)</p></td>
                        <td> 
                            <NumberFormat
                                className="form-control"
                                id="brokerage"
                                name="brokerage"
                                type="text"
                                value={this.props.brokerage}
                                onChange={this.props.handleChange}
                                placeholder="Schwab, Fidelity, etc."
                                disabled
                                thousandSeparator={true}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.homeRetirementAccount ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homeRetirementAccount" name="homeRetirementAccount" /> Retirement accounts</p></td>
                        <td> 
                            <NumberFormat
                                className="form-control"
                                id="retirementAccount"
                                name="retirementAccount"
                                type="text"
                                value={this.props.retirementAccount}
                                onChange={this.props.handleChange}
                                placeholder="Traditional IRA, 401K, 403B, etc."
                                disabled
                                thousandSeparator={true}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td> <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.homeRothAccount ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homeRothAccount" name="homeRothAccount" /> Roth accounts</p></td>
                        <td> 
                            <NumberFormat
                                className="form-control"
                                id="rothAccount"
                                name="rothAccount"
                                type="text"
                                value={this.props.rothAccount}
                                onChange={this.props.handleChange}
                                placeholder="Roth IRA or Roth 401K"
                                disabled
                                thousandSeparator={true}
                            />
                        </td>
                    </tr>
                    
                    <tr>
                        <td> <p className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.homeOther ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homeOther" name="homeOther" /> Other</p></td>
                        <td> 
                            <input
                                className="form-control"
                                id="otherTypes"
                                name="otherTypes"
                                type="text"
                                value={this.props.otherTypes}
                                onChange={this.props.handleChange}
                                placeholder="Type(s)"
                                disabled
                            />
                               <NumberFormat
                                className="form-control"
                                id="otherApproxValue"
                                name="otherApproxValue"
                                type="text"
                                value={this.props.otherApproxValue}
                                onChange={this.props.handleChange}
                                placeholder="Approx. value"
                                disabled
                                thousandSeparator={true}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Approx. asset total</td>
                        <td> 
                                {this.props.AssetsApproxTotal ? formatter.format(this.props.AssetsApproxTotal) :'$0,000'}
                        </td>
                    </tr>


                </table>
                </div>
         </div>

         <div className="row">
                <div className="col-md-12 col-sm-12">
                 <h6>Income</h6>
                 <div className="row">
                 <div className="col-md-12 col-sm-12"> 
                 <table class="assestTable">
                    <tr>
                        <td> </td>
                        <td>Total annual income</td>
                    </tr>

                    <tr>
                        <td>Social security</td>
                        <td> 
                            <NumberFormat
                                className="form-control"
                                id="socailSecurity"
                                name="socailSecurity"
                                type="text"
                                value={this.props.socailSecurity}
                                onChange={this.props.handleChange}
                                disabled
                                thousandSeparator={true}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Pension(s)</td>
                        <td> 
                            <NumberFormat
                                className="form-control"
                                id="pension"
                                name="pension"
                                type="text"
                                value={this.props.pension}
                                onChange={this.props.handleChange}
                                disabled
                                thousandSeparator={true}
                            />
                        </td>
                    </tr>
                </table>
                 </div>
                 </div>
                 </div>
  
          </div>  


           <div className="row">
                  <div className="col-md-12  col-sm-12"> 
                  <div className="form-group">
                  <label htmlFor="name">Other</label>
                    <textarea 
                      className="form-control"
                      id="others"
                      name="others"
                      type="text"
                      placeholder=""
                      value={this.props.others}
                      onChange={this.props.handleChange}
                      disabled
                  />
                  </div>
                  </div>
  
          </div>  
        
  
          </div>
       
        </React.Fragment>
      )
     }
    }
  
  
      
    class Step5 extends React.Component {



      render() {
        if (this.props.currentStep !== 5) {
          return null
        } 

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
          });

        return(
        <React.Fragment>
             <h5>BUDGET DETAILS (ANNUAL SPENDNG)</h5>
            
             <div className="col-md-12 col-sm-12">
             
                  <div className="col-md-12 col-sm-12"> 
                  <div className="form-group">
                  <label htmlFor="name">Essential spending (bare minimum spending requirement)</label>
                    <NumberFormat
                      className="form-control"
                      id="essential"
                      name="essential"
                      type="text"
                      placeholder=""
                      value={this.props.essential}
                      onChange={this.props.handleChange}
                      disabled
                      thousandSeparator={true}
                     />
                  </div>
                  </div>

                  <div className="col-md-12 col-sm-12"> 
                  <div className="form-group">
                  <label htmlFor="name">Discretionary</label>
                    <NumberFormat
                      className="form-control"
                      id="discretionary"
                      name="discretionary"
                      type="text"
                      placeholder=""
                      value={this.props.discretionary}
                      onChange={this.props.handleChange}
                      disabled
                      thousandSeparator={true}
                     />
                  </div>
                  </div>

                  <div className="col-md-12 col-sm-12"> 
                  <div className="form-group">
                  <label htmlFor="name">Approx. total: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                    {this.props.AssetsApproxBudget ? formatter.format(this.props.AssetsApproxBudget) :'$0,000'}
                  </div>
                  </div>

  
                  <div className="col-md-12 col-sm-12"> 
                  <div className="form-group">
                  <label htmlFor="name">Expected trend for expenses & one-off expenses</label>
                  <textarea 
                      className="form-control"
                      id="oneOffExpenses"
                      name="oneOffExpenses" 
                      value={this.props.oneOffExpenses} 
                      onChange={this.props.handleChange} 
                      placeholder="E.g., Expenses likely to decrease with less travel, expenses likely to increase with more medical costs, etc."
                      disabled
                  />
                  </div>
                  </div>
          </div>
        
        </React.Fragment>
      )
     }
    }
  
    class Step6 extends React.Component {
      render() {
        if (this.props.currentStep !== 6) {
          return null
        } 
        return(
        <React.Fragment>
             <h5>INSURANCE DETAILS</h5>
  
             <div className="col-md-12 col-sm-12">
             
                  <div className="col-md-12 col-sm-12"> 
                  <div className="form-group">

                        <p> <input type="checkbox" disabled  defaultChecked={this.props.noInsurance ? 'checked' : ''}  onChange={this.props.handleChange}  value="I/we have no insurance" for="" name="noInsurance"/> I/we have no insurance</p>
                       
                         <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.medicare ? 'checked' : ''}   value="Medicare" for="" name="medicare"/> Medicare</p>

                        <p> <input disabled type="checkbox" defaultChecked={this.props.supplementalHealth ? 'checked' : ''} onChange={this.props.handleChange} value="Supplemental health" for="" name="supplementalHealth"/> Supplemental health </p>

                        <p> <input disabled type="checkbox" defaultChecked={this.props.longtermcare ? 'checked' : ''} onChange={this.props.handleChange} value="Long term care" for="" name="longtermcare"/> Long term care</p>

                  </div>
                  </div>

  
                  <div className="col-md-12 col-sm-12"> 

                  <table class="assestTable">
                    <tr>
                        <td>
                            <p style={{'marginTop': '25px'}} className="checkboxContent"> <input disabled type="checkbox" defaultChecked={this.props.lifeInsurance ? 'checked' : ''} onChange={this.props.handleChange} value="lifeInsurance" for="" name="lifeInsurance"/> Life insurance</p>
                        </td>
                        <td>
                            <label htmlFor="name">Type</label>
                            <select disabled value={this.props.lifeInType}  id="lifeInType" name="lifeInType" onChange={this.props.handleChange}  className="form-control" >
                                <option value=""> Select</option>
                                <option value="Whole life">Whole life</option>
                            </select>
                        </td>

                        <td> 
                            <label htmlFor="name">Amount</label>
                            <NumberFormat
                                className="form-control"
                                id="lifeamount"
                                name="lifeamount"
                                type="text"
                                placeholder=""
                                value={this.props.lifeamount}
                                onChange={this.props.handleChange}
                                disabled
                                thousandSeparator={true}
                            />
                        </td>

                    </tr>
                  </table>   
                  </div>
  
                  <div className="col-md-12 col-sm-12"> 
                  <div className="form-group">

                  <div className="sideFix">
                      <p style={{'marginTop': '25px'}} className="sidefixbox"> 
                              <input disabled type="checkbox" onChange={this.props.handleChange} defaultChecked={this.props.inotherbox ? 'checked' : ''} value="inotherbox" for="" name="inotherbox"/> Other 
                      </p>  
                      <textarea 
                        className="form-control"
                        id="inother"
                        name="inother" 
                        value={this.props.inother} 
                        onChange={this.props.handleChange} 
                        placeholder="E.g., medical condition"
                        disabled
                    />
                   </div>
                  </div>
                  </div>
          </div>
    
        </React.Fragment>
      )
     }
    }
  
    class Step7 extends React.Component {

        createInExp = () => {
            let InExp = []
            for (let i = 1; i <= 10; i++) {
                InExp.push(<option value={`${i}`}>{i}</option>)
            }
            return InExp
          }

      render() {
        if (this.props.currentStep !== 7) {
          return null
        } 
        return(
        <React.Fragment>
             <h5>INVESTING DETAILS</h5>
          
             <div className="col-md-12 col-sm-12">
             
                  <div className="col-md-12 col-sm-12"> 
                    <div className="form-group">
                        <label htmlFor="name">Investment experience (1= novice / 10 = expert)</label>
                        <select disabled value={this.props.experience_1_10}  id="experience_1_10" name="experience_1_10" onChange={this.props.handleChange}  className="form-control" >
                                <option value=""> Select</option>
                            {this.createInExp()}
                        </select>
                    </div>
                  </div>

                  <div className="col-md-12 col-sm-12"> 
                    <div className="form-group">
                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.analyticalInExperience ? 'checked' : ''}   value="Yes" for="" name="analyticalInExperience"/> I am/we are very analytical (regardless of investment experience)</p>
                    </div>
                  </div>
  
                  <div className="col-md-12 col-sm-12"> 
                    <div className="form-group">
                        <label htmlFor="name">Performance expectations</label>
                        <textarea
                            className="form-control"
                            id="expectations"
                            name="expectations"
                            type="text"
                            placeholder="E.g., returns, level of income, withdrawal rates, etc."
                            value={this.props.expectations}
                            onChange={this.props.handleChange}
                            disabled
                        />
                    </div>
                  </div>
  
                  <div className="col-md-12 col-sm-12"> 
                    <div className="form-group">
                        <label htmlFor="name">Notable investment experiences (good and/or bad)</label>
                        <textarea 
                            className="form-control"
                            id="experience_gb"
                            name="experience_gb" 
                            value={this.props.experience_gb} 
                            onChange={this.props.handleChange} 
                            disabled
                        />
                    </div>
                  </div>

                  <div className="col-md-12 col-sm-12"> 
                  <div className="form-group">
                        <label>Investment performance goals (tick all that apply)</label>

                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.capitalPreservation ? 'checked' : ''}   value="Capital preservation (lower returns are OK if volatility is low)" for="" name="capitalPreservation"/> Capital preservation (lower returns are OK if volatility is low)</p>

                        <p> <input disabled type="checkbox" defaultChecked={this.props.investIncome ? 'checked' : ''} onChange={this.props.handleChange} value="Income (income for retirement or other purposes is a top priority)" for="" name="investIncome"/> Income (income for retirement or other purposes is a top priority) </p>

                        <p> <input disabled type="checkbox" defaultChecked={this.props.investGrowth ? 'checked' : ''} onChange={this.props.handleChange} value="Growth (willing to accept higher volatility for higher returns)" for="" name="investGrowth"/> Growth (willing to accept higher volatility for higher returns)</p>

                        <p> <input disabled type="checkbox" defaultChecked={this.props.investGrowthIncome ? 'checked' : ''} onChange={this.props.handleChange} value="Growth + income (higher volatility acceptable if income is secure)" for="" name="investGrowthIncome"/> Growth + income (higher volatility acceptable if income is secure)</p>

                        <p> <input disabled type="checkbox" defaultChecked={this.props.investAggressiveGrowth ? 'checked' : ''} onChange={this.props.handleChange} value="Aggressive growth (returns are top priority and significant volatility is acceptable)" for="" name="investAggressiveGrowth"/> Aggressive growth (returns are top priority and significant volatility is acceptable)</p>

                  </div>
                  </div>


                  <div className="col-md-12 col-sm-12"> 
                    <div className="form-group">
                        <label htmlFor="name">Current allocation to stocks and other risky assets</label>
                        <select disabled value={this.props.currentAllocationStock}  id="currentAllocationStock" name="currentAllocationStock" onChange={this.props.handleChange}  className="form-control" >
                                <option value=""> Select</option>
                                <option value="0% - ultra conservative"> 0% - ultra conservative</option>
                                <option value="25%"> 25%</option>
                                <option value="50% - balanced"> 50% - balanced</option>
                                <option value="75%"> 75%</option>
                                <option value="100% - extremely aggressive"> 100% - extremely aggressive</option>
                        </select>
                    </div>
                  </div>



          </div>
    
        </React.Fragment>
      )
     }
    }
  
    
    class Step8 extends React.Component {

        createInExp = () => {
            let InExp = []
            for (let i = 1; i <= 10; i++) {
                InExp.push(<option value={`${i}`}>{i}</option>)
            }
            return InExp
          }

      render() {
        if (this.props.currentStep !== 8) {
          return null
        } 
        return(
        <React.Fragment>
             <h5>RISK DETAILS</h5>
          
             <div className="col-md-12 col-sm-12">

                  <div className="col-md-12 col-sm-12"> 
                    <div className="form-group">
                        <label htmlFor="name">How do you view your risk tolerance? </label>
                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.riskAggressive ? 'checked' : ''} value="Aggressive (healthy appetite for risk)" for="" name="riskAggressive"/> Aggressive (healthy appetite for risk)</p>

                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.riskModerate ? 'checked' : ''} value="Moderate (seek more balanced risk)" for="" name="riskModerate"/> Moderate (seek more balanced risk)</p>

                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.riskConservative ? 'checked' : ''} value="Conservative (generally prefer less risk)" for="" name="riskConservative"/> Conservative (generally prefer less risk)</p>

                    </div>
                  </div>

                  <div className="col-md-12 col-sm-12"> 
                    <div className="form-group">
                        <label htmlFor="name">Assuming your financial security would not be compromised, what is the maximum portfolio drawdown (decrease) you could tolerate?</label>
                        <select disabled value={this.props.portfolioDrawdown}  id="portfolioDrawdown" name="portfolioDrawdown" onChange={this.props.handleChange}  className="form-control" >
                            <option value=""> Select</option>
                            <option value="0% - ultra conservative"> 0% - ultra conservative  </option>
                            <option value="10%"> 10%   </option>
                            <option value="20%"> 20% </option>
                            <option value="30%"> 30% </option>
                            <option value="40%"> 40% </option>
                            <option value="50% - very aggressive"> 50% - very aggressive </option>
                        </select>
                    </div>
                  </div>


                  <div className="col-md-12 col-sm-12"> 
                  <label htmlFor="name">Please score the importance of each factor:</label> 
                  <div className="row">
                    <div className="col-md-4 col-sm-12"> 
                        <div className="form-group">
                            <label htmlFor="name">Preservation</label>
                            <select disabled value={this.props.riskPreservation}  id="riskPreservation" name="riskPreservation" onChange={this.props.handleChange}  className="form-control" >
                                <option value=""> Select</option>
                                {this.createInExp()}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4 col-sm-12"> 
                        <div className="form-group">
                            <label htmlFor="name">Income</label>
                            <select disabled value={this.props.riskIncome}  id="riskIncome" name="riskIncome" onChange={this.props.handleChange}  className="form-control" >
                                <option value=""> Select</option>
                                {this.createInExp()}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4 col-sm-12"> 
                        <div className="form-group">
                            <label htmlFor="name">Growth </label>
                            <select disabled value={this.props.riskGrowth}  id="riskGrowth" name="riskGrowth" onChange={this.props.handleChange}  className="form-control" >
                                <option value=""> Select</option>
                                {this.createInExp()}
                            </select>
                        </div>
                    </div>

                    </div>
                 </div>

                 <div className="col-md-12 col-sm-12"> 
                    <div className="form-group">
                        <label htmlFor="name">How did you and your portfolio hold up during the last major market downturn (e.g., the credit crisis in 2008)?</label>
                        <textarea 
                            className="form-control"
                            id="lastMarketDownturn"
                            name="lastMarketDownturn" 
                            value={this.props.lastMarketDownturn} 
                            onChange={this.props.handleChange} 
                            disabled
                        />
                    </div>
                 </div>

                 <div className="col-md-12 col-sm-12"> 
                 <label htmlFor="name">Please look at the example portfolios below and select the one with the most appealing risk-return profile over this hypothetical 10-year period.</label>
                 <div className="col-md-6 col-sm-12 riskportfolio"> 
                    <div className="form-group">
                       

                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.portfolio1 ? 'checked' : ''} value="Portfolio 1 (most conservative)" for="" name="portfolio1"/> Portfolio 1 (most conservative)</p>

                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.portfolio2 ? 'checked' : ''} value="Portfolio 2" for="" name="portfolio2"/> Portfolio 2</p>

                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.portfolio3 ? 'checked' : ''} value="Portfolio 3" for="" name="portfolio3"/> Portfolio 3</p>

                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.portfolio4 ? 'checked' : ''} value="Portfolio 4" for="" name="portfolio4"/> Portfolio 4</p>
 
                        <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.portfolio5 ? 'checked' : ''} value="Portfolio 5 (most aggressive)" for="" name="portfolio5"/> Portfolio 5 (most aggressive)</p>

                    </div>
                </div>
                <div className="col-md-6 col-sm-12 riskportfolio"> 
                 <img src={portfolioimg}/>
                </div>
                </div>

          </div>
    
        </React.Fragment>
      )
     }
    }
  
  
    class Step9 extends React.Component {
      render() {
        if (this.props.currentStep !== 9) {
          return null
        } 
        return(
        <React.Fragment>
             <h5>OTHER DETAILS</h5>

             <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                    <label htmlFor="name">How did you discover SET IT AND LEAVE IT?</label>

                    <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.aaii ? 'checked' : ''} value="American Association of Individual Investors (AAII)" for="" name="aaii"/> American Association of Individual Investors (AAII)</p> 

                    <p> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.advisorPerspectives ? 'checked' : ''} value="Advisor Perspectives" for="" name="advisorPerspectives"/> Advisor Perspectives </p> 

                    <p > <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.alphaArchiect ? 'checked' : ''} value="Alpha Architect" for="" name="alphaArchiect"/> Alpha Architect </p> 

                    <div className="sideFix">
                        <p style={{'marginTop': '15px'}} className=" sidefixbox"> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.referral ? 'checked' : ''} value="Referral" for="" name="referral"/> Referral</p>   
                        <input 
                        className="form-control sidefixbox"
                        id="referralContent"
                        name="referralContent" 
                        value={this.props.referralContent} 
                        onChange={this.props.handleChange} 
                        placeholder="Source"
                        disabled
                    />
                   </div>
                   
                   <div className="sideFix">
                   <p style={{'marginTop': '15px'}} className=" sidefixbox"> <input disabled type="checkbox"  onChange={this.props.handleChange} defaultChecked={this.props.otherOthers ? 'checked' : ''} value="Other" for="" name="otherOthers"/> Other  </p>  
                    <input 
                      className="form-control"
                      id="otherOthersContent"
                      name="otherOthersContent" 
                      value={this.props.otherOthersContent} 
                      onChange={this.props.handleChange} 
                      disabled
                   />
                  
                   </div>


                </div>
            </div>

            <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                  <label htmlFor="name">What attracted you to SET IT AND LEAVE IT?</label>
                  <textarea 
                      className="form-control"
                      id="whatAttracted"
                      name="whatAttracted" 
                      value={this.props.whatAttracted} 
                      onChange={this.props.handleChange} 
                      placeholder="E.g., innovation, academic rigor, avoid conflicts of interest and salesmanship, etc."
                      disabled
                  />
                  </div>
            </div>

            <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                  <label htmlFor="name">We welcome suggestions to help us improve this questionnaire:</label>
                  <textarea 
                      className="form-control"
                      id="improveQuestionnaire"
                      name="improveQuestionnaire" 
                      value={this.props.improveQuestionnaire} 
                      onChange={this.props.handleChange} 
                      placeholder="E.g., shorter, longer, we missed something, etc."
                      disabled
                  />
                  </div>
            </div>
          
           
    
        </React.Fragment>
      )
     }
    }

export default QuestionnaireList; 