import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Link, withRouter, BrowserRouter as Router } from 'react-router-dom'
import CanvasJSReact from './assets/js/canvasjs.react';
import { Button,Alert,Modal } from 'react-bootstrap';
import { tsConstructSignatureDeclaration } from '@babel/types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import logo from '../../assets/img/logo1.png';
import watermark from '../../assets/img/watermark.png'
import UserService from '../../reactservice/UserService';
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import AlertModalBox from "./alertModalBox";
import userGuide from '../../../src/assets/img/GUIDE - Set It and Leave It.pdf'

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const API = new UserService();

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Tool extends Component{

    constructor(props){
    
        super(props);
        this.props.onHeaderHover(false);
        this.state={
            fields:{ liquid_assets:'1,000,000',budget:'100,000',social_security:'35,000', pension:'30,000',est_inflation:'3',SS_colas:'2',Pension_colas:'2',dividend_yield:'2',interest_rate:'2',annuity_payout:'6',div_growth_colas:'5', time_horizon:'25',cash:'5', stock:'50' },
            errors:{},
            liquid_assets:'',
            budget:'',
            est_inflation:'',
            time_horizon:'',
            social_security:'',
            ini_required_yield:'',
            pension:'30,000',
            SS_colas:'',
            Pension_colas:'',
            dividend_yield:'',
            div_growth_colas:'',
            interest_rate:'',
            annuity_payout:'',
            actualcash:'',
            actualstock:'',
            actualannuity:'',
            totalAnnutiyAuto:'45',
            reportSection:false,
            pieGraphOption:'',
            cashBarGraphOption:'',
            stockPortfoliooptions:'',
            AllbudgetGraphoptions:'',
            stockPortfolioLineGraphDataPoint11:'',
            stockPortfolioGraphDataPoint:'',
            EquityAllocationGraphoptions:'',
            EstimatedCapital:'',
            EquitystockPortfoliocapital:'',
            EquityCashcapital:'',
            perYearReturn:'',
            totalYearReturn:'',
            totalAnnuityError : false,
            show: false,
            pdfmsgshow:false,
            pdfMsg:false,
            email:'',
            toolenable:'',
            pdfName:'',
            errors:{}
        }
        this.mockupToolsFun = this.mockupToolsFun.bind(this);
        this.pieGraph = this.pieGraph.bind(this);
        this.cashBarGraph = this.cashBarGraph.bind(this);
        this.stockPortfolioBarGraph = this.stockPortfolioBarGraph.bind(this);
        this.AllbudgetGraph = this.AllbudgetGraph.bind(this);
        this.EquityallocationGraph = this.EquityallocationGraph.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.priviewReport = this.priviewReport.bind(this);

        console.log('props:',props.onHeaderHover)
    }


    handleHide() {
        this.setState({ show: false, pdfmsgshow:false, modalShow:false });
      }

    handleHideGoback=()=> {
        this.setState({ modalShow:false });
        this.props.history.replace(localStorage.getItem('last-page'));
    }  
    
    priviewReport(){
            this.setState({
                show: true
            });
    }

    pdfPrintsuccess=()=>{  
        let userData=API.getProfile().data;
        var date = (new Date()).toISOString().split('T')[0];
       /* html2canvas(document.querySelector('#tools_pdf')).then(canvas => {  
          var dataURL = canvas.toDataURL();
          var pdf = new jsPDF({compress: true});
          var width = pdf.internal.pageSize.getWidth();
          var height = pdf.internal.pageSize.getHeight();
          console.log('width:',width);
          console.log('height:',height);
          pdf.addImage(dataURL, 'PNG', 5,-140, width, 500);
          pdf.save(userData.name+'-'+date+".pdf");
        });  */

        if(window.screen.width < 1024) {
            document.getElementById("viewport").setAttribute("content", "width=1200px");
            document.body.classList.add('mobile-canvas');
        }
        html2canvas(document.querySelector('#tools_pdf')).then(canvas => {  
          // Few necessary setting options
          const contentDataURL = canvas.toDataURL('image/png')
          let pdf = new jsPDF({compress: true});
          let width = pdf.internal.pageSize.getWidth();
          pdf.addImage(contentDataURL, 'PNG', 5,-140, width, 500);
          pdf.save(userData.name+'-'+date+".pdf"); // Generated PDF
          if(window.screen.width < 1024) {
            document.getElementById("viewport").setAttribute("content", "width=device-width, initial-scale=1");
          }

        });
        const generatePDF ={
          "id":userData._id,
          "name":userData.name            
        }
        API.generatePDFActivityLog(generatePDF)
          .then((result) => {
              if(result.data.success){
                  // console.log('xxx res:', result );
                  //this.resetForm();
                  this.setState({
                      showAlert:true,
                      color:'green',
                      message: result.data.message
                  });
              }else{
                  // console.log('xxx errocode:', result );
                  this.setState({
                      showAlert:true,
                      color:'#b31313d6',
                      message: result.data.message
                  });
      
              } 
          }).catch(err => {
              // console.log('xxx new:', err);
          }) 
          
          this.setState({ 
            pdfMsg: true,  
            show: false,
            pdfmsgshow:true,
            pdfName:userData.name+'-'+date+".pdf" 
        });
    }


    componentDidMount(){

        window.scrollTo(0, 0);
        if(API.loggedIn()){
          
            let userData=API.getProfile().data;           
            console.log('userData: ',userData);
            this.setState({
                modalShow:false,
                setModalShow:false,
                _id:userData._id,
                name:userData.name,
                email:userData.email,
                toolenable:userData.tool_enabled 
            })
        }else{
            this.setState({
                modalShow:true,
                setModalShow:true
            })
        }

        document.title = "TOOL - SET IT AND LEAVE IT"
    }
   
    validationCheck(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
 
       if(!fields["liquid_assets"]){
           formIsValid = false;
           errors["liquid_assets"] = "error_sell form-control-custom big-input";
       }else if(parseInt(fields["liquid_assets"]) < 0){
            formIsValid = false;
            errors["liquid_assets"] = "error_sell form-control-custom big-input";
       }


       if(!fields["budget"]){
        formIsValid = false;
        errors["budget"] = "error_sell form-control-custom big-input";
      }else if(parseInt(fields["budget"]) < 0){
        formIsValid = false;
        errors["budget"] = "error_sell form-control-custom big-input";
      }

    if(!fields["est_inflation"]){
        formIsValid = false;
        errors["est_inflation"] = "error_sell form-control-custom";
    }else if(parseInt(fields["est_inflation"]) < 0){
        formIsValid = false;
        errors["est_inflation"] = "error_sell form-control-custom";
    }
    
    if(fields["est_inflation"]){
        if(isNaN(fields["est_inflation"])){
            formIsValid = false;
            errors["est_inflation"] = "error_sell form-control-custom";
         }
     }

    if(!fields["time_horizon"]){
        formIsValid = false;
        errors["time_horizon"] = "error_sell form-control-custom";
    }else if(parseInt(fields["time_horizon"]) < 0){
        formIsValid = false;
        errors["time_horizon"] = "error_sell form-control-custom";
    }
    
    if(fields["time_horizon"]){
        if(isNaN(fields["time_horizon"])){
            formIsValid = false;
            errors["time_horizon"] = "error_sell form-control-custom";
         }
     }

    if(!fields["social_security"]){
        formIsValid = false;
        errors["social_security"] = "error_sell form-control-custom big-input";
    }else if(parseInt(fields["social_security"]) < 0){
        formIsValid = false;
        errors["social_security"] = "error_sell form-control-custom";
    }

    if(!fields["pension"]){
        formIsValid = false;
        errors["pension"] = "error_sell form-control-custom big-input";
    }else if(parseInt(fields["pension"]) < 0){
        formIsValid = false;
        errors["pension"] = "error_sell form-control-custom";
    }

    if(!fields["SS_colas"]){
        formIsValid = false;
        errors["SS_colas"] = "error_sell form-control-custom";
    }else if(parseInt(fields["SS_colas"]) < 0){
        formIsValid = false;
        errors["SS_colas"] = "error_sell form-control-custom";
    }

    if(fields["SS_colas"]){
        if(isNaN(fields["SS_colas"])){
            formIsValid = false;
            errors["SS_colas"] = "error_sell form-control-custom";
         }
     }

    if(!fields["Pension_colas"]){
        formIsValid = false;
        errors["Pension_colas"] = "error_sell form-control-custom";
    }else if(parseInt(fields["Pension_colas"]) < 0){
        formIsValid = false;
        errors["Pension_colas"] = "error_sell form-control-custom";
    }

    if(fields["Pension_colas"]){
        if(isNaN(fields["Pension_colas"])){
            formIsValid = false;
            errors["Pension_colas"] = "error_sell form-control-custom";
         }
     }


    if(!fields["dividend_yield"]){
        formIsValid = false;
        errors["dividend_yield"] = "error_sell form-control-custom";
    }else if(parseInt(fields["dividend_yield"]) < 0){
        formIsValid = false;
        errors["dividend_yield"] = "error_sell form-control-custom";
    }

    if(fields["dividend_yield"]){
        if(isNaN(fields["dividend_yield"])){
            formIsValid = false;
            errors["dividend_yield"] = "error_sell form-control-custom";
         }
     }

    if(!fields["interest_rate"]){
        formIsValid = false;
        errors["interest_rate"] = "error_sell form-control-custom";
    }else if(parseInt(fields["interest_rate"]) < 0){
        formIsValid = false;
        errors["interest_rate"] = "error_sell form-control-custom";
    }
    if(fields["interest_rate"]){
        if(isNaN(fields["interest_rate"])){
            formIsValid = false;
            errors["interest_rate"] = "error_sell form-control-custom";
         }
     }

    if(!fields["annuity_payout"]){
        formIsValid = false;
        errors["annuity_payout"] = "error_sell form-control-custom";
    }else if(parseInt(fields["annuity_payout"]) < 0){
        formIsValid = false;
        errors["annuity_payout"] = "error_sell form-control-custom";
    }


    if(fields["annuity_payout"]){
        if(isNaN(fields["annuity_payout"])){
            formIsValid = false;
            errors["annuity_payout"] = "error_sell form-control-custom";
         }
     }

    if(!fields["div_growth_colas"]){
        formIsValid = false;
        errors["div_growth_colas"] = "error_sell form-control-custom";
    }else if(parseInt(fields["div_growth_colas"]) < 0){
        formIsValid = false;
        errors["div_growth_colas"] = "error_sell form-control-custom";
    }

    if(fields["div_growth_colas"]){
        if(isNaN(fields["div_growth_colas"])){
            formIsValid = false;
            errors["div_growth_colas"] = "error_sell form-control-custom";
         }
     }

    if(!fields["cash"]){
        formIsValid = false;
        errors["cash"] = "error_sell form-control-custom";
    }else if(parseInt(fields["cash"]) < 0){
        formIsValid = false;
        errors["cash"] = "error_sell form-control-custom";
    }

    if(fields["cash"]){
        if(isNaN(fields["cash"])){
            formIsValid = false;
            errors["cash"] = "error_sell form-control-custom";
         }
     }

    if(!fields["stock"]){
        formIsValid = false;
        errors["stock"] = "error_sell form-control-custom";
    }else if(parseInt(fields["stock"]) < 0){
        formIsValid = false;
        errors["stock"] = "error_sell form-control-custom";
    }

    if(fields["stock"]){
        if(isNaN(fields["stock"])){
            formIsValid = false;
            errors["stock"] = "error_sell form-control-custom";
         }
     }

     
    if(!this.state.totalAnnutiyAuto){
        formIsValid = false;
        errors["annuity"] = "error_sell form-control-custom";
    }

    console.log('annuity: ', this.state.totalAnnutiyAuto);

    if(this.state.totalAnnutiyAuto){
        if(isNaN(this.state.totalAnnutiyAuto)){
            formIsValid = false;
            errors["annuity"] = "error_sell form-control-custom";
         }else if(parseInt(this.state.totalAnnutiyAuto) < 0){
            formIsValid = false;
            errors["annuity"] = "error_sell form-control-custom";
         }
     }

        this.setState({errors:errors});
        return formIsValid;
        
    }

    mockupToolsFun(e){

        e.preventDefault();
     if(this.validationCheck()){        
        var elmnt = document.getElementById("reportSectionIdss");
         elmnt.scrollIntoView({behavior:"smooth"});
       let initial_required_yield =0;
       let liquid_assets = this.state.fields.liquid_assets.replace(/,/g,"");
       let req_budget = this.state.fields.budget.replace(/,/g,"");
       let est_inflation = this.state.fields.est_inflation;
       let time_horizon = this.state.fields.time_horizon;
       let social_security = this.state.fields.social_security.replace(/,/g,"");
       let pension = this.state.fields.pension.replace(/,/g,"");
       let dividend_yield = this.state.fields.dividend_yield;
       let interest_rate = this.state.fields.interest_rate;
       let annuity_payout = this.state.fields.annuity_payout;
       let actualcash = ((parseInt(liquid_assets)*parseFloat(this.state.fields.cash))/100); 
       let actualstock = ((parseInt(liquid_assets)*parseFloat(this.state.fields.stock))/100); 
       let actualannuity = ((parseInt(liquid_assets)*parseFloat(this.state.totalAnnutiyAuto))/100); 
       let social_security_colas = parseFloat(this.state.fields.SS_colas);
       let pension_colas = parseFloat(this.state.fields.Pension_colas);
       let div_capGrowth = parseFloat(this.state.fields.div_growth_colas);

      
       let Actual_dividend = parseInt(liquid_assets)*(parseFloat(this.state.fields.stock/100))*(parseFloat(dividend_yield/100));
       let Actual_Annuity =   (actualannuity*(parseFloat(annuity_payout)/100));
       let i,inflation_budget,inf_socialSecurity,inf_pension,SS_pension,residual,inf_dividend,cash_needed,infusion,infu_cash,fromStock,stockPortfolio,untappedStock,percentageStock,org_RHS;
       let totalYearCash=0, totalYearStock=0,totalCashYear=0,EquitystockPortfolio;
       let stockPer = 0, stockXvalue = 0;
       const cashGraphDataPoint = [], stockPortfolioGraphDataPoint = [], stockPortfolioLineGraphDataPoint = [], EquityAllocationGraphDataPoint=[], FromstockEquity=[], InfuCashEquity=[];
       const AnnuityGraphDataPoint =[], SS_pensionGraphDataPoint =[], AreaGraphhighlightArray = [],ReqBudget_Max=[], DividendGraphDataPoint=[], infusionGraphDataPoint=[],req_budgetGraphDataPoint=[];

         
       console.log('First Annuity: ('+actualannuity+'*('+parseFloat(annuity_payout)+'/100))');
       
      if(req_budget && liquid_assets && social_security && pension){
        initial_required_yield = ((parseInt(req_budget)-parseInt(social_security)-parseInt(pension))/parseInt(liquid_assets))*(100);
        initial_required_yield =  initial_required_yield.toFixed(1);
     }


       //EQUITY ALLOCATION CONDITION

       let liquid_assets1 = this.state.fields.liquid_assets.replace(/,/g,"");
       let req_budget1 = this.state.fields.budget.replace(/,/g,"");
       let est_inflation1 = this.state.fields.est_inflation;
       let time_horizon1 = this.state.fields.time_horizon;
       let social_security1 = this.state.fields.social_security.replace(/,/g,"");
       let pension1 = this.state.fields.pension.replace(/,/g,"");
       let dividend_yield1 = this.state.fields.dividend_yield;
       let interest_rate1 = this.state.fields.interest_rate;
       let annuity_payout1 = this.state.fields.annuity_payout;
       let actualcash1 = ((parseInt(liquid_assets)*parseFloat(this.state.fields.cash))/100); 
       let actualstock1 = ((parseInt(liquid_assets)*parseFloat(this.state.fields.stock))/100); 
       
       let social_security_colas1 = parseFloat(this.state.fields.SS_colas);
       let pension_colas1 = parseFloat(this.state.fields.Pension_colas);
       let div_capGrowth1 = parseFloat(this.state.fields.div_growth_colas);

       let inflation_budget1,inf_socialSecurity1,inf_pension1,SS_pension1,residual1,inf_dividend1,cash_needed1,infusion1,infu_cash1,fromStock1,stockPortfolio1,untappedStock1,percentageStock1,org_RHS1;
       let totalYearCash1=0, totalYearStock1=0,totalCashYear1=0,EquitystockPortfolio1;
       let stockPer1 = 0, stockXvalue1 = 0;
       const cashGraphDataPoint1 = [], stockPortfolioGraphDataPoint1 = [], stockPortfolioLineGraphDataPoint1 = [], EquityAllocationGraphDataPoint1=[], FromstockEquity1=[], InfuCashEquity1=[];
       const AnnuityGraphDataPoint1 =[],EquityAllocationNaturalYearIncome=[], SS_pensionGraphDataPoint1 =[], DividendGraphDataPoint1=[], infusionGraphDataPoint1=[],req_budgetGraphDataPoint1=[];
       const org_RHSarray=[],InfuCashArray=[];


    let req_budget_point=0,org_RHS_point=0,social_security_ponit=0,pension_point=0,Actual_dividend_point=0,infu_cash_point=0,stockPortfolio_point=0,untappedStock_point=0;
    infu_cash=actualcash;
    console.log('ActualCash:',actualcash)
    console.log('infu_cash:',infu_cash)
            for(i=1;i<=parseInt(time_horizon);i++){
                console.log('=========='+i+'==========');
                /*--- SS+Pension ---*/
                SS_pension = (parseInt(social_security)+parseInt(pension));
                SS_pensionGraphDataPoint.push({x:i,y:SS_pension});

                console.log('SS_pension:',SS_pension)

                /*--- Residual ---*/
                residual = (parseInt(req_budget)-parseInt(SS_pension));
               
        
                /*--- Annuity ---*/ 
                 if(parseInt(i) <= parseInt(time_horizon)){
                    Actual_Annuity = Actual_Annuity;
                 }else{
                    Actual_Annuity = 0; 
                 }
                 console.log('Actual_Annuity:',Actual_Annuity);
                 AnnuityGraphDataPoint.push({x:i,y:Actual_Annuity});
                
        
                /*--- Cash Needed ---*/  
                cash_needed = (req_budget-SS_pension)-(Actual_dividend+Actual_Annuity);
                console.log('cash_neededCal:('+req_budget+'-'+SS_pension+')-('+Actual_dividend+'+'+Actual_Annuity+')');
                console.log('cash_needed:',cash_needed);

                /*--- Req Budget ---*/
                console.log('req_budget:',req_budget)  
                req_budgetGraphDataPoint.push({x:i,y:parseFloat(req_budget)});
                ReqBudget_Max.push(req_budget);
                if(i==1){
                    req_budget_point = req_budget;
                }else{
                    req_budget_point =  req_budget_point;
                }
                 inflation_budget = (parseFloat(req_budget_point)*(1+parseFloat(est_inflation)/100));
                 req_budget_point = inflation_budget;
                 req_budget = Math.round(req_budget_point);
                
     
                /*--- Social Security ---*/
                console.log('social_security:',social_security)  
                if(i==1){
                    social_security_ponit = social_security;
                 }else{
                    social_security_ponit =  social_security_ponit;
                 }
                 inf_socialSecurity = parseFloat(social_security_ponit)*(1+parseFloat(social_security_colas)/100);
                 social_security_ponit = inf_socialSecurity;
                 social_security = Math.round(social_security_ponit);
                
                /*--- Pension ---*/

                console.log('pension:',pension) 
                if(i==1){
                    pension_point = pension;
                 }else{
                    pension_point =  pension_point;
                 }
                 inf_pension = parseFloat(pension_point)*(1+parseFloat(pension_colas)/100);
                 pension_point = inf_pension;
                 pension = Math.round(pension_point);
                
             
                /*--- Infusion ---*/
                
                if(cash_needed > 0){
                    infusion = cash_needed;
                }else{
                    infusion = 0;
                }
                infusionGraphDataPoint.push({x:i,y:infusion}); 

                /*--- Cash --*/
 
                if(i==1){
                    infu_cash_point = infu_cash;
                    console.log('cashttttIF1:',infu_cash_point)
                 }else{
                    infu_cash_point =  infu_cash_point;
                    console.log('cashttttelse1:',infu_cash_point)
                 }

                 if(i == 1){
                       if(cash_needed < 0){
                           console.log('cashCalif1:('+infu_cash_point+'*(1+('+parseInt(interest_rate)+'/100))-('+cash_needed+'))')
                           infu_cash_point = (infu_cash_point*(1+(parseInt(interest_rate)/100))-(cash_needed));
                           infu_cash = Math.round(infu_cash_point);
                       }else{
                           console.log('cashCalelse1:(('+infu_cash_point+')-('+cash_needed+'))*(1+('+parseInt(interest_rate)+'/100))')
                           infu_cash_point = ((infu_cash_point)-(cash_needed))*(1+(parseInt(interest_rate)/100));
                           infu_cash = Math.round(infu_cash_point);
                       }
                 }else{
                    if(((infu_cash)-(cash_needed)) >0 ){
                       if(cash_needed < 0){ 
                          infu_cash_point = (infu_cash_point*(1+(parseInt(interest_rate)/100))-(cash_needed));
                          console.log('cashCalif:('+infu_cash_point+'*(1+('+parseInt(interest_rate)+'/100))-('+cash_needed+'))')
                          infu_cash = Math.round(infu_cash_point);
                       }else{
                          infu_cash_point = ((infu_cash_point)-(cash_needed))*(1+(parseInt(interest_rate)/100)); 
                          console.log('cashCalelse1:(('+infu_cash_point+')-('+cash_needed+'))*(1+('+parseInt(interest_rate)+'/100))') 
                          infu_cash = Math.round(infu_cash_point); 
                       }
                    }else{
                        infu_cash = 0;
                    }
                 }
        
                 InfuCashArray.push(infu_cash);
                 cashGraphDataPoint.push({x:i,y:infu_cash});
                 totalYearCash += infu_cash;
               
                 console.log('cash:',infu_cash);

            /*--- From Stock ---*/ 
                
                if(infu_cash == 0){
                    console.log('fromStockCal: (('+cash_needed+')-('+InfuCashArray[i-2]+'))')
                    fromStock = ((cash_needed)-(InfuCashArray[i-2]));
                }else{
                    fromStock = 0;
                }
                console.log('fromStock:',fromStock);
        
            /*--- Stock Portfolio ---*/
        
                if(i == 1){
                    stockPortfolio = actualstock;
                    stockPortfolio_point = stockPortfolio;
                   
                }else{
                    console.log('((('+i+':'+stockPortfolio_point+')-('+fromStock+'))*(1+('+parseFloat(div_capGrowth)+'/100)))');
                    stockPortfolio_point = (((stockPortfolio_point)-(fromStock))*(1+(parseFloat(div_capGrowth)/100)));
                    stockPortfolio = Math.round(stockPortfolio_point);
                }
                EquitystockPortfolio = stockPortfolio;
                stockPortfolioGraphDataPoint.push({x:i,y:stockPortfolio});
                totalYearStock += stockPortfolio;

                console.log('stockPortfolio:',stockPortfolio);
                console.log('stockPortfolioGraphDataPoint:',stockPortfolioGraphDataPoint);
        
            /*--- Untapped Stock ---*/
                if(i == 1){
                    untappedStock = actualstock;
                    untappedStock_point = untappedStock;
                }else{
                    untappedStock_point = ((untappedStock_point)*(1+(parseFloat(div_capGrowth)/100)));
                    untappedStock = Math.round(untappedStock_point);
                }
              
            /*--- % Stock ---*/
                percentageStock =((fromStock)/(actualstock));

            /*--- Stockpercentage/Org(RHS) ---*/
               org_RHS_point = ((stockPortfolio)/(untappedStock))*100;
               org_RHS = Math.round(((stockPortfolio)/(untappedStock))*100);
               org_RHSarray.push(org_RHS_point);
               stockPortfolioLineGraphDataPoint.push({x:i,y:org_RHS});

    
             
            /*--- Dividend ---*/
              if(i==1){
                  Actual_dividend_point = Actual_dividend;
                  org_RHS_point = 100;
              }else{
                  Actual_dividend_point =  Actual_dividend_point;
                  org_RHS_point = org_RHSarray[i-1];
              }
              DividendGraphDataPoint.push({x:i,y:Actual_dividend_point}); 
    
              inf_dividend = ((parseFloat(Actual_dividend_point)*(1+parseFloat(div_capGrowth)/100))*(parseFloat(org_RHS_point)/100));
              Actual_dividend_point = inf_dividend;
              Actual_dividend = Math.round(Actual_dividend_point);


         
            } 

             
            /*--- Lagecy Allocation ---*/

            //console.log('EquitystockPortfolio:', EquitystockPortfolio);
            //console.log('infu_cash:', infu_cash);
           let EquityCash =  infu_cash;
           let EstimatedCapital = (parseInt(EquitystockPortfolio)+parseInt(EquityCash));
           let r = (1/parseInt(time_horizon))*((parseInt(EstimatedCapital)/parseInt(liquid_assets1)) - 1);
           console.log('r:', r);
           let Rate = parseFloat(r*100).toFixed(1);
           console.log('Rate:', Rate);
           let totalRate = Math.round(parseFloat(Rate)*parseInt(time_horizon));
           console.log('totalRate:', totalRate);


             /*---Highlight--*/

                Array.prototype.max = function() {
                    return Math.max.apply(null, this);
                    };
                
                

                console.log('ReqBudget_Max:',ReqBudget_Max);

                for(let k=1; k<=parseInt(time_horizon); k++){
                    console.log('actualcash:',actualcash);
                    console.log('InfuCashArray:',InfuCashArray);
                    let maxCash ='',roundto='';
                    let number = parseInt(50000);
                    let offSetMax = ReqBudget_Max.max();
                    //if(parseInt(InfuCashArray[k-1]) < parseInt(actualcash)){
                    if(parseInt(InfuCashArray[k-1]) == 0){
                            maxCash  = (parseInt(50000)+parseInt(offSetMax));
                            console.log('maxCash:',maxCash);
                            roundto = (parseInt(number)*(Math.round(parseInt(maxCash)/parseInt(number))));
                            AreaGraphhighlightArray.push({x:k, y:roundto});
                    }else{
                            roundto = 0;
                    }
                }
        
                console.log('AreaGraphhighlightArray:',AreaGraphhighlightArray);

    // EQUITY ALLOCATION
  
    stockXvalue1 = parseInt(5);
    let cashper = parseInt(this.state.fields.cash);
    let totalPer=0, neturalYear=0;
    for(let j=1;j<=parseInt(time_horizon);j++){
        
        totalPer = parseInt(100 - ((cashper) + (stockXvalue1)));
        if(totalPer >= -10){
        let req_budget_point1=0,org_RHS_point1=0,social_security_ponit1=0,pension_point1=0,Actual_dividend_point1=0,infu_cash_point1=0,stockPortfolio_point1=0,untappedStock_point1=0;
  
        let Actual_dividend1 = parseInt(liquid_assets1)*(parseFloat(stockXvalue1/100))*(parseFloat(dividend_yield1/100));
        let actualannuity1 = ((parseInt(liquid_assets1)*parseFloat(totalPer))/100); 
        let Actual_Annuity1 =   (actualannuity1*(parseFloat(annuity_payout1/100)));
        let infu_cash1Array1 = [], org_RHSarray1=[];
        stockPortfolio1=0;
        fromStock1=0;
        cash_needed1=0;
        infu_cash1=0;
        let req_budget11 = req_budget1;
        SS_pension1=0;
        let Actual_dividend11=Actual_dividend1;
        residual1=0;
        inflation_budget1=0;
        inf_socialSecurity1=0;
        let social_security11=social_security1;
        inf_pension1=0;
        let pension11=pension1;
        inf_dividend1=0;
        infusion1=0;
        infu_cash_point1=0;
        org_RHS1=0;
       let stockXstop = cashper+stockXvalue1;
       console.log('stockXstop',stockXstop);
        let actualstockold1 = actualstock1;
        if(stockXstop <= 100){
            console.log('============='+stockXvalue1+'================');
            inf_dividend1 = parseFloat(Actual_dividend11)*(parseFloat(div_capGrowth1)/100);
            if(stockXvalue1 != parseInt(this.state.fields.stock)){
                console.log('actualstock1Cal:(('+parseInt(liquid_assets)+'*'+parseFloat(stockXvalue1)+')/100)')
                actualstock1 = ((parseInt(liquid_assets)*parseFloat(stockXvalue1))/100);  
                
            }
            console.log('actualstock1:',actualstock1)
  
          for(i=1;i<=parseInt(time_horizon1);i++){

            /*--- SS+Pension ---*/
            SS_pension1 = (parseInt(social_security11)+parseInt(pension11));
            SS_pensionGraphDataPoint1.push({x:i,y:SS_pension1});

            /*--- Residual ---*/
            residual1 = (parseInt(req_budget11)-parseInt(SS_pension1));
    
            /*--- Annuity ---*/ 
             if(parseInt(i) <= parseInt(time_horizon1)){
                Actual_Annuity1 = Actual_Annuity1;
             }else{
                Actual_Annuity1 = 0; 
             }
             AnnuityGraphDataPoint1.push({x:i,y:Actual_Annuity1});

            /*--- Cash Needed ---*/  
            cash_needed1 = (req_budget11-SS_pension1)-(Actual_dividend11+Actual_Annuity1);


            /*--- Req Budget ---*/
             req_budgetGraphDataPoint1.push({x:i,y:parseFloat(req_budget11)});
             if(i==1){
                 req_budget_point1 = req_budget11;
             }else{
                 req_budget_point1 =  req_budget_point1;
             }
             inflation_budget1 = (parseFloat(req_budget_point1)*(1+parseFloat(est_inflation1)/100));
             req_budget_point1 = inflation_budget1;
             req_budget11 = Math.round(req_budget_point1);



   
            /*--- Social Security ---*/
            if(i==1){
                social_security_ponit1 = social_security11;
             }else{
                social_security_ponit1 =  social_security_ponit1;
             }
             inf_socialSecurity1 = parseFloat(social_security_ponit1)*(1+parseFloat(social_security_colas1)/100);
             social_security_ponit1 = inf_socialSecurity1;
             social_security11 = Math.round(social_security_ponit1);

            
            /*--- Pension ---*/
        
            if(i==1){
                pension_point1 = pension11;
             }else{
                pension_point1 =  pension_point1;
             }
             inf_pension1 = parseFloat(pension_point1)*(1+parseFloat(pension_colas1)/100);
             pension_point1 = inf_pension1;
             pension11 = Math.round(pension_point1);

            /*--- Infusion ---*/
            if(cash_needed1 > 0){
                infusion1 = cash_needed1;
            }else{
                infusion1 = 0;
            }
            infusionGraphDataPoint1.push({x:i,y:infusion1}); 


           


            /*--- Cash --*/
             if(i==1){
                infu_cash_point1 = actualcash1;
             }else{
                infu_cash_point1 =  infu_cash_point1;
             }
             if(i == 1){
                   if(cash_needed1 < 0){
                       infu_cash_point1 = (infu_cash_point1*(1+(parseInt(interest_rate1)/100))-(cash_needed1));
                       infu_cash1 = Math.round(infu_cash_point1);
                   }else{
                       infu_cash_point1 = ((infu_cash_point1)-(cash_needed1))*(1+(parseInt(interest_rate1)/100));
                       infu_cash1 = Math.round(infu_cash_point1);
                   }
             }else{
                if(((infu_cash1)-(cash_needed1)) >0 ){
                   if(cash_needed1 < 0){ 
                      infu_cash_point1 = (infu_cash_point1*(1+(parseInt(interest_rate1)/100))-(cash_needed1));
                      infu_cash1 = Math.round(infu_cash_point1);
                   }else{
                      infu_cash_point1 = ((infu_cash_point1)-(cash_needed1))*(1+(parseInt(interest_rate1)/100));  
                      infu_cash1 = Math.round(infu_cash_point1); 
                   }
                }else{
                    infu_cash1 = 0;
                }
             }

             infu_cash1Array1.push(infu_cash1);
             cashGraphDataPoint1.push({x:i,y:infu_cash1});
             totalYearCash1 += infu_cash1;

            /*--- From Stock ---*/ 
            if(infu_cash1 == 0){
                let k = parseInt(parseInt(i)-parseInt(1));
                fromStock1 = parseInt(parseInt(cash_needed1)-parseInt(infu_cash1Array1[i-2]));
            }else{
                fromStock1 = 0;
            }
           
            /*--- Stock Portfolio ---*/
          
            if(i == 1){
                stockPortfolio1 = actualstock1;
                stockPortfolio_point1 = stockPortfolio1;
            }else{
                console.log('stockPorCal:((('+i+':'+stockPortfolio_point1+')-('+fromStock1+'))*(1+('+parseFloat(div_capGrowth1)+'/100)))');
                stockPortfolio_point1 = (((stockPortfolio_point1)-(fromStock1))*(1+(parseFloat(div_capGrowth1)/100)));
                stockPortfolio1 = Math.round(stockPortfolio_point1);
            }
            EquitystockPortfolio1 = stockPortfolio1;
            stockPortfolioGraphDataPoint1.push({x:i,y:stockPortfolio1});
            console.log('stockPortfolio1:',stockPortfolio1);
            totalYearStock1 += stockPortfolio1;
            console.log('totalYearStock1:',totalYearStock1);

    
            /*--- Untapped Stock ---*/
            if(i == 1){
                untappedStock1 = actualstock1;
                untappedStock_point1 = untappedStock1;
            }else{
                untappedStock_point1 = ((untappedStock_point1)*(1+(parseFloat(div_capGrowth1)/100)));
                untappedStock1 = Math.round(untappedStock_point1);
            }

            /*--- % Stock ---*/
            percentageStock1 = ((fromStock1)/(actualstock1));
          
           /*--- Stockpercentage/Org(RHS) ---*/
            org_RHS_point1 = ((stockPortfolio1)/(untappedStock1))*100;
            org_RHS1 = Math.round(((stockPortfolio1)/(untappedStock1))*100);
            org_RHSarray1.push(org_RHS_point1);
            stockPortfolioLineGraphDataPoint1.push({x:i,y:org_RHS1});
           
            /*--- Dividend ---*/
            if(i==1){
                Actual_dividend_point1 = Actual_dividend11;
                org_RHS_point1 = 100;
            }else{
                Actual_dividend_point1 =  Actual_dividend_point1;
                org_RHS_point1 = org_RHSarray1[i-1];
            }
            DividendGraphDataPoint1.push({x:i,y:Actual_dividend_point1}); 
            inf_dividend1 = ((parseFloat(Actual_dividend_point1)*(1+parseFloat(div_capGrowth1)/100))*(parseFloat(org_RHS_point1)/100));
            Actual_dividend_point1 = inf_dividend1;
            Actual_dividend11 = Math.round(Actual_dividend_point1);

             FromstockEquity1.push({stockXvalue:stockXvalue1,stock:stockPortfolio1});
             InfuCashEquity1.push({stockXvalue:stockXvalue1,cash:infu_cash1});
                if(infu_cash1 != 0){
                    neturalYear = i;
                }
          }
          console.log('TotalLagecy:',parseInt(stockPortfolio1) +'+'+ parseInt(infu_cash1));
          totalCashYear1 = parseInt(stockPortfolio1) + parseInt(infu_cash1);
          EquityAllocationGraphDataPoint.push({x:stockXvalue1,y:totalCashYear1});
          EquityAllocationNaturalYearIncome.push({x:stockXvalue1,y:neturalYear});
          stockXvalue1 = parseInt(stockXvalue1) +  parseInt(5);
          actualstock1=actualstockold1;
        }
      }
     }
console.log('EquityAllocationGraphDataPoint:',EquityAllocationGraphDataPoint)
console.log('EquityAllocationNaturalYearIncome:',EquityAllocationNaturalYearIncome)
      this.setState({ 
          reportSection:true,
          liquid_assets : liquid_assets,
          budget : req_budget,
          social_security : social_security,
          pension : pension,
          actualcash : actualcash,
          actualstock : actualstock,
          actualannuity : actualannuity,
          ini_required_yield:initial_required_yield,
          cashGraphDataPoints : cashGraphDataPoint,
          stockPortfolioLineGraphDataPoint11: stockPortfolioLineGraphDataPoint,
          stockPortfolioGraphDataPoint:stockPortfolioGraphDataPoint,
          EstimatedCapital:EstimatedCapital,
          EquitystockPortfoliocapital:EquitystockPortfolio,
          EquityCashcapital:EquityCash,
          perYearReturn:Rate,
          totalYearReturn:totalRate
            
      });

     
      const toolsInputs ={
          "id":this.state._id,
          "name":this.state.name,
            "liq_assets":this.state.fields["liquid_assets"],
            "budget":this.state.fields["budget"],
            "est_inflation":this.state.fields["est_inflation"],
            "social_sec":this.state.fields["social_security"],
            "colas":this.state.fields["SS_colas"],
            "pension":this.state.fields["pension"],
            "pension_colas":this.state.fields["Pension_colas"],
            "time_horizon":this.state.fields["time_horizon"],
            "dividend_yield":this.state.fields["dividend_yield"],
            "div_growth_colas":this.state.fields["div_growth_colas"],
            "interest_rate":this.state.fields["interest_rate"],
            "annuity_payout":this.state.fields["annuity_payout"],
            "cash":this.state.fields["cash"],
            "stock":this.state.fields["stock"],
            "total_annutiy_auto":this.state.totalAnnutiyAuto          
      }
      console.log('toolsInputs:',toolsInputs);
      API.toolsInputsActivityLog(toolsInputs)
        .then((result) => {
            if(result.data.success){
                // console.log('xxx res:', result );
                //this.resetForm();
                this.setState({
                    showAlert:true,    
                    color:'green',
                    message: result.data.message
                });
            }else{
                // console.log('xxx errocode:', result );
                this.setState({
                    showAlert:true,
                    color:'#b31313d6',
                    message: result.data.message
                });
    
            } 
        }).catch(err => {
            // console.log('xxx new:', err);
        }) 


   console.log('Large:',Math.max.apply(Math, EquityAllocationNaturalYearIncome.map(function(o) { return o.y; })));
     let yearMaxLimit = Math.max.apply(Math, EquityAllocationNaturalYearIncome.map(function(o) { return o.y; }));
      let yearInterval=0;

     if(yearMaxLimit >=40){
        yearMaxLimit=50;
        yearInterval=5; 
     }else if(yearMaxLimit >= 30){
        yearMaxLimit=50;
        yearInterval=5; 
     }else if(yearMaxLimit >= 20){
        yearMaxLimit=30;
        yearInterval=3; 

     }else if(yearMaxLimit >= 10){
        yearMaxLimit=20;
        yearInterval=2; 
     }else{
        yearMaxLimit=50;
        yearInterval=5; 
     }


     this.pieGraph(actualcash,actualstock,actualannuity);
     this.cashBarGraph(cashGraphDataPoint);
     this.stockPortfolioBarGraph(stockPortfolioGraphDataPoint,stockPortfolioLineGraphDataPoint);
     this.AllbudgetGraph(AreaGraphhighlightArray,AnnuityGraphDataPoint, SS_pensionGraphDataPoint, DividendGraphDataPoint, infusionGraphDataPoint,req_budgetGraphDataPoint); 
     this.EquityallocationGraph(EquityAllocationGraphDataPoint,EquityAllocationNaturalYearIncome,yearMaxLimit,yearInterval);
     }
    }


    handleChange(field,e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});

        if(this.state.fields.cash && this.state.fields.stock){
                let totalcashStock =  (parseInt(this.state.fields.cash) + parseInt(this.state.fields.stock));
                let totalAnnutiyAuto = (parseInt(100) - parseInt(totalcashStock));
                this.setState({totalAnnutiyAuto:totalAnnutiyAuto});

        }       

        if(this.state.fields.liquid_assets && this.state.fields.budget && this.state.fields.social_security && this.state.fields.pension){
            let liquid_assets = this.state.fields.liquid_assets.replace(/,/g,"");
            let req_budget = this.state.fields.budget.replace(/,/g,"");
            let social_security = this.state.fields.social_security.replace(/,/g,"");
            let pension = this.state.fields.pension.replace(/,/g,"");
            let initial_required_yield = ((parseInt(req_budget)-parseInt(social_security)-parseInt(pension))/parseInt(liquid_assets))*(100);
            initial_required_yield =  initial_required_yield.toFixed(1);
            this.setState({ ini_required_yield:initial_required_yield,});
         }

    }

    
    pieGraph(actualcash,actualstock,actualannuity){
        //console.log('actualcash:',actualcash);
        const options = {
            exportEnabled: false,
            animationEnabled: true,
            // legend: {
            //     horizontalAlign: "right",
            //     verticalAlign: "center"
            //   },
            data: [{
                type: "pie",
                startAngle: -30,
                toolTipContent: "<b>{label}</b>: ${y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 12,
                indexLabel: "${y}",
                radius: "70%",
                dataPoints: [
                    { y: actualannuity, label: "Fixed income", color: "#F79646"  },
                    { y: actualstock, label: "Stock", color: "#0070C0"  },
                    { y: actualcash, label: "Cash", color: "#00B050"  }
                ]
            }]
        }
        this.setState({
            pieGraphOption : options
        });
    } 

    cashBarGraph(cashGraphDataPoint){
        console.log('Hello Bar Graph:',cashGraphDataPoint);
        const cashoptions = {
			title: {
				text: ""
            },
            axisX:{
                title: "Years",
                interval: 6,
                labelFontSize: 12
             },
             axisY: {
                prefix: "$",
                labelFontSize: 12
			},
            dataPointWidth: 5, 
            data: [
                {
                  type: "column",
                  legendText: "Cash",
                  showInLegend: true, 
                  color:"#00B050",
                  dataPoints: cashGraphDataPoint

                }
                ]
        }
        console.log('cashoptions:',cashoptions);
        this.setState({
            cashBarGraphOption : cashoptions
        });
    }


    stockPortfolioBarGraph(stockPortfolioGraphDataPoint,stockPortfolioLineGraphDataPoint){
        const stockPortfoliooptions = {
			title: {
				text: ""
            },
            axisX:{
                title: "Years",
                interval: 6,
                labelFontSize: 12
             },
             axisY: {
                prefix: "$",
                labelFontSize: 12,
                gridColor: "#ccc"
            },
            axisY2: {
                suffix: "%",
				lineColor: "#00B0F0",
                tickColor: "#00B0F0",
                includeZero: true,
                maximum: 100,
                interval: 20
            },
            dataPointWidth: 8, 
            data: [
                {
                    type: "column",
                    legendText: "Stock Portfolio",
                    showInLegend: true, 
                    color:"#0070C0",
                    dataPoints: stockPortfolioGraphDataPoint
  
                  },
                {
                    type: "line",
                    axisYType: "secondary",
                    showInLegend: true,
                    markerType: "circle",
                    legendText: "Stock%/Orig(RHS)",
                    lineThickness: 6,
                    lineColor: "#00B0F0",
                    markerColor: "#00B0F0",
                    markerSize: 10,
                    dataPoints: stockPortfolioLineGraphDataPoint
                 }
                
                  
                ]
        }
        this.setState({
            stockPortfoliooptions : stockPortfoliooptions
        });

    }


    AllbudgetGraph(AreaGraphhighlightArray, AnnuityGraphDataPoint, SS_pensionGraphDataPoint, DividendGraphDataPoint, infusionGraphDataPoint,req_budgetGraphDataPoint){
        //console.log('req_budgetGraphDataPoint..xxx:',req_budgetGraphDataPoint);
        const AllbudgetGraphoptions = {
			animationEnabled: true,
			colorSet: "colorSet2",
			title: {
				text: ""
			},
			
			axisY: {
				prefix: "$",
				includeZero: true,
				//interval: 100000
			},
			axisX:{
               title: "Years",
			   interval: 6,
			   includeZero: false,
			},
			
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				//itemclick: this.toggleDataSeries,
				verticalAlign: "top"
            },
            dataPointWidth:10, 
			data: [
                {
				type: "area",
				name: "Profit",
				markerBorderColor: "white",
				legendText: "no marker",
				markerType: "none",
                lineThickness: 0,
                fillOpacity: .4, 
                color:'red',
                dataPoints: AreaGraphhighlightArray
            },
            {
				type: "stackedColumn",
                name: "Fixed income",
                color:"#F79646",
				showInLegend: true,
                dataPoints: AnnuityGraphDataPoint
			},{
				type: "stackedColumn",
                name: "SS+Pension",
                color:"#8064A2",
				showInLegend: true,
                dataPoints: SS_pensionGraphDataPoint
			},
			{
				type: "stackedColumn",
                name: "Dividend",
                color:'#0070C0',
				showInLegend: true,
                dataPoints: DividendGraphDataPoint
            },{
				type: "stackedColumn",
                name: "Infusion",
                color:'#C0504D',
				showInLegend: true,
                dataPoints: infusionGraphDataPoint
			},{
				type: "line",
                legendText: "Req budget",
                showInLegend: true,
				markerType: "none",
                lineColor:"#FF0000",
                lineThickness: 5,
                dataPoints: req_budgetGraphDataPoint
			}
        
        ]
        }
        
        this.setState({
            AllbudgetGraphoptions : AllbudgetGraphoptions
        });

    }

    EquityallocationGraph(EquityAllocationGraphDataPoint,EquityAllocationNaturalYearIncome,yearMaxLimit,yearInterval){
        const EquityAllocationGraphoptions = {
			title: {
				text: ""
            },
            axisX:{
                interval: 5,
                suffix: "%",
                labelFontSize: 12,
                title: "Initial stock allocation",
                titleFontSize: 12
             },
             axisY: {
                prefix: "$",
                labelFontSize: 12,
                gridColor: "#ccc"
            },
            axisY2: {
				lineColor: "#51CDA0",
                tickColor: "#51CDA0",
                includeZero: true,
                maximum:yearMaxLimit,
                interval: yearInterval
            },
            dataPointWidth: 8, 
            data: [
                {
                    type: "column",
                    legendText: "Legacy",
                    showInLegend: true, 
                    color:"#00B050",
                    dataPoints: EquityAllocationGraphDataPoint
                
                  },
                {
                    type: "line",
                    axisYType: "secondary",
                    showInLegend: true,
                    markerType: "triangle",
                    legendText: "# Years Natural Income",
                    lineThickness: 4,
                    lineColor: "#7F7F7F",
                    markerColor: "#7F7F7F",
                    markerSize: 8,
                    dataPoints: EquityAllocationNaturalYearIncome
                 }
                
                  
                ]
        }
        this.setState({
            EquityAllocationGraphoptions : EquityAllocationGraphoptions
        });
    }


 
render(){
   
            return(
                <div className="tool-section">

                        {/* <AlertModalBox
                            show={this.state.modalShow}
                        />                         */}

                            <Modal
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered     
                                show={this.state.modalShow}   
                            >        
                                <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    <h3>Alert</h3>
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <h5 style={{textAlign:'center',padding:10}}>You must be signed in to use the Set It and Leave It tool.</h5>
                                <div style={{paddingTop:20,textAlign:'center'}}>
                                    <Link className='btn btn-primary' style={{backgroundColor:'#7030a0',fontWeight:700}} to={'/front/register'}>SIGN IN</Link><br/>
                                    <br/><p>No thanks. <Link onClick={this.handleHideGoback}>Go back</Link></p>
                                </div>          
                                </Modal.Body>
                        
                            </Modal>


                        <section id="inner-page-banner">
                            <div className="container-fluid">  
                                <div className="row">
                                    <div className="inner-page-banner-heading hdng">
                                        <h2> RETIREMENT INCOME TOOL </h2>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="container">
                            <img src='' id='img_id'/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div style={{lineHeight: "1.6"}}className="disclimer not-sect ">
                                        <p className="toolp clearfix">
                                            <span className="ex-bf disclaimer_not_symbol">!</span>
                                            <div className="disclaimer_content">
                                                <span className="ex-bf1">DISCLAIMER:</span> 
                                                This tool is for illustration purposes only. It does not constitute investment advice and makes no recommendations. Please refer to the <Link target="_blank" to={'/front/tnc'}><span className="tool-terms" style={{fontSize: "21px" ,textDecorationLine: "underline"}}>terms and conditions</span></Link> for more information.
                                            </div>
                                        </p>
                                        <p className="note-toolp">
                                    
                                        <p class="note-tool"><span style={{fontWeight: "bold","fontSize": "21px","color": "red","marginTop": "0px!important","marginLeft":"5px"}}>NOTE:</span>Best viewed on larger screens (tablets, laptops, PCs, etc.)</p>
                                        </p>
                                   </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <img src='' id='img_id'/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="helpfulLink">
                                        <p style={{textAlign:'right', fontSize:'16px'}}><strong style={{color:'#7030A0'}}>HELPFUL LINKS:</strong> <a target="_blank" href="/front/videos#video6">VIDEO TUTORIAL</a> | <a href={userGuide} download >HELP MANUAL</a> | <Link target="_blank" to={"/front/faq"}>FAQ</Link> | <Link target="_blank" to={"/front/contact"}>CONTACT</Link> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.toolenable == true ? (
                            <form onSubmit={this.mockupToolsFun}>
                        <section className="tool-section">
                        <div className="container">
                        <div class="initial_required_yield_note"><span>NOTE: </span>Please modify/overwrite example inputs.</div>
                            <div className="row">
                            
                                <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                    <div className="tol-box-inner">
                                        <h4> USER INPUTS </h4>
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 head-text mb-res">LIQ ASSETS
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true"> <span className="tooltiptext">Liquid assets: The dollar value of liquid assets that can be readily invested in stocks, bonds, or other investments. </span> </i>
                                                    </span>
                                                   
                                                </div>

                                                

                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 input-file mb-res">
                                                    $
                                                    {/* <input type="text" className="form-control-custom big-input" placeholder="1,000,000"/> */}
                                                    <NumberFormat className={this.state.errors["liquid_assets"] ? this.state.errors["liquid_assets"] : 'form-control-custom big-input'}  thousandSeparator={true} value={this.state.fields["liquid_assets"]} onChange={this.handleChange.bind(this, "liquid_assets")} placeholder="1,000,000" name="liquid_assets" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 head-text mb-res">BUDGET
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true"> <span className="tooltiptext">Spending budget: Your estimate of current annual spending (in dollars).</span>  </i>
                                                    </span>
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 input-file mb-res">
                                                    $
                                                    {/* <input type="text" className="form-control-custom big-input" placeholder="100,000"/> */}
                                                    <NumberFormat className={this.state.errors["budget"] ? this.state.errors["budget"] : 'form-control-custom big-input'} thousandSeparator={true}  value={this.state.fields["budget"]} onChange={this.handleChange.bind(this, "budget")} placeholder="100,000" name="budget" />  
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-3 input-file mb-res">
                                                    <div className="form-group">
                                                        <label htmlFor="email" className="cols-sm-2 control-label">
                                                            INFL
                                                            <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                                <i className="fa fa-question-circle tooltip" aria-hidden="true"> <span className="tooltiptext">Inflation: An estimate for the annual rate of price increases for the goods and services you will purchase in retirement (measured in percent).</span> </i>
                                                            </span>
                                                        </label>
                                                        {/* <input type="text" className="form-control-custom" placeholder="3"/> % */}
                                                        <input type="text" placeholder="3" className={this.state.errors["est_inflation"] ? this.state.errors["est_inflation"] : 'form-control-custom'} value={this.state.fields["est_inflation"]} onChange={this.handleChange.bind(this, "est_inflation")} name="est_inflation" /> %
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 head-text mb-res">SOCIAL SEC
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true">  <span className="tooltiptext">Social security: A guaranteed source of life-time income provided by the U.S. government.</span> </i>
                                                    </span>
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 input-file mb-res">
                                                    $
                                                    {/* <input type="text" className="form-control-custom big-input" placeholder="35,000"/> */}
                                                    <NumberFormat className={this.state.errors["social_security"] ? this.state.errors["social_security"] : 'form-control-custom big-input'} thousandSeparator={true}  value={this.state.fields["social_security"]} onChange={this.handleChange.bind(this, "social_security")} placeholder="35,000" name="social_security" />
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-3 input-file mb-res">
                                                    <div className="form-group">
                                                        <label htmlFor="email" className="cols-sm-2 control-label">
                                                            COLA
                                                            <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                                <i className="fa fa-question-circle tooltip" aria-hidden="true">  <span className="tooltiptext">COLA: These are estimated ‘cost of living adjustments’ which are applied to sources of income in order to address inflation(measured in percent).</span> </i>
                                                            </span>
                                                        </label>
                                                        
                                                        {/* <input type="text" className="form-control-custom" placeholder="2"/> % */}
                                                        <input type="text" placeholder="2" className={this.state.errors["SS_colas"] ? this.state.errors["SS_colas"] : 'form-control-custom'} value={this.state.fields["SS_colas"]} onChange={this.handleChange.bind(this, "SS_colas")} name="SS_colas" /> %
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 head-text mb-res">PENSION
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true"> <span className="tooltiptext">Pension: A guaranteed source of life-time income provided by an employer. </span> </i>
                                                    </span>
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 input-file mb-res">
                                                    $
                                                    {/* <input type="text" className="form-control-custom big-input" placeholder="25,000"/> */}
                                                    <NumberFormat className={this.state.errors["pension"] ? this.state.errors["pension"] : 'form-control-custom big-input'} thousandSeparator={true}  value={this.state.fields["pension"]} onChange={this.handleChange.bind(this, "pension")} placeholder="25,000" name="pension"/>
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-3 input-file mb-res">
                                                    <div className="form-group"> 
                                                        {/* <input type="text" className="form-control-custom" placeholder="2"/> % */}
                                                        <input type="text" placeholder="2" className={this.state.errors["Pension_colas"] ? this.state.errors["Pension_colas"] : 'form-control-custom'}  value={this.state.fields["Pension_colas"]} onChange={this.handleChange.bind(this, "Pension_colas")} name="Pension_colas" /> %
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                      
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5 head-text mb-res">TIME
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true">  <span className="tooltiptext">Time: An estimate of the maximum likely time horizon for retirement (measured in years).</span> </i>
                                                    </span>
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 input-file mb-res">
                                                    &nbsp;&nbsp;
                                                    {/* <input type="text" className="form-control-custom" placeholder="30"/> Years */}
                                                    <input type="text" placeholder="30" className={this.state.errors["time_horizon"] ? this.state.errors["time_horizon"] : 'form-control-custom'}  value={this.state.fields["time_horizon"]} onChange={this.handleChange.bind(this, "time_horizon")} name="time_horizon" /> Years
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {this.state.ini_required_yield?( <div className="initial_required_yield"><span>{this.state.ini_required_yield ? this.state.ini_required_yield : ''}% </span>INITIAL REQUIRED YIELD </div>):''}

                                </div>


                                
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <div className="tol-box-inner">
                                        <h4> MARKET INPUTS </h4>
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 head-text mb-res">DIVIDEND YIELD
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true"> <span className="tooltiptext">Dividend yield: The estimated dividends to be paid over the next year divided by the current price (measured in percent). </span> </i>
                                                    </span>
                                                </div>

                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 input-file mb-res">
                                                    {/* <input type="text" className="form-control-custom" placeholder="2"/> % */}
                                                    <input type="text" placeholder="2" className={this.state.errors["dividend_yield"] ? this.state.errors["dividend_yield"] : 'form-control-custom'} value={this.state.fields["dividend_yield"]} onChange={this.handleChange.bind(this, "dividend_yield")} name="dividend_yield" /> %
                                                </div>

                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 input-file mb-res">
                                                    <div className="form-group">
                                                        <label htmlFor="email" className="cols-sm-2 control-label" style={{top: '-20px', left: '0' }}>Div/cap growth
                                                            <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                                <i className="fa fa-question-circle tooltip" aria-hidden="true"> <span className="tooltiptext">Dividend and capital growth rate: The estimated rate of growth for dividends and capital appreciation.</span> </i>
                                                            </span>
                                                        </label>
                                                        {/* <input type="text" className="form-control-custom" placeholder="5"/> % */}
                                                        <input type="text" placeholder="5" className={this.state.errors["div_growth_colas"] ? this.state.errors["div_growth_colas"] : 'form-control-custom'} value={this.state.fields["div_growth_colas"]} onChange={this.handleChange.bind(this, "div_growth_colas")} name="div_growth_colas" /> %
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 head-text mb-res">INTEREST RATE
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true"> <span className="tooltiptext">Interest rate: This is the rate of interest assumed for all cash holdings (measured in percent).</span> </i>
                                                    </span>
                                                </div>

                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 input-file mb-res">
                                                    {/* <input type="text" className="form-control-custom" placeholder="2"/> % */}
                                                    <input type="text" placeholder="2" className={this.state.errors["interest_rate"] ? this.state.errors["interest_rate"] : 'form-control-custom'} value={this.state.fields["interest_rate"]} onChange={this.handleChange.bind(this, "interest_rate")} name="interest_rate" /> %
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 head-text mb-res">ANNUITY PAYOUT
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true"> <span className="tooltiptext">Annuity payout: This is the estimated annual payout of a single premium immediate annuity (SPIA) divided by its upfront cost (measured in percent).</span> </i>
                                                    </span>
                                                </div>

                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 input-file mb-res">
                                                    {/* <input type="text" className="form-control-custom" placeholder="6"/> % */}
                                                    <input type="text" placeholder="6" className={this.state.errors["annuity_payout"] ? this.state.errors["annuity_payout"] : 'form-control-custom'} value={this.state.fields["annuity_payout"]} onChange={this.handleChange.bind(this, "annuity_payout")} name="annuity_payout" /> %
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                    <div className="tol-box-inner">
                                        <h4> ALLOCATIONS </h4>
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 head-text mb-res">CASH
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip " aria-hidden="true"> <span className="tooltiptext">Cash: This is the initial allocation to cash instruments and bonds (we assume a fixed interest rate) as a percentage of the liquid assets.</span> </i>
                                                    </span>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 input-file mb-res">
                                                    {/* <input type="text" className="form-control-custom" placeholder="5"/> % */}
                                                    <input type="text" placeholder="25" className={this.state.errors["cash"] ? this.state.errors["cash"] : 'form-control-custom'} value={this.state.fields["cash"]} onChange={this.handleChange.bind(this, "cash")} name="cash" /> %
                                                </div>

                                            </div>
                                        </div>
                                        
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 head-text mb-res">STOCK
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true"><span className="tooltiptext">Stock: This is the initial allocation to stocks as a percentage of the liquid assets.</span> </i>
                                                    </span>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 input-file mb-res">
                                                    {/* <input type="text" className="form-control-custom" placeholder="50"/> % */}
                                                    <input type="text" placeholder="50" className={this.state.errors["stock"] ? this.state.errors["stock"] : 'form-control-custom'} value={this.state.fields["stock"]} onChange={this.handleChange.bind(this, "stock")} name="stock" />%
                                                </div>
                                            </div>
                                        </div>
                                        
                                    
                                       
                                          
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 head-text mb-res">ANNUITY
                                                    <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top">
                                                        <i className="fa fa-question-circle tooltip" aria-hidden="true"> <span className="tooltiptext">Annuity: This is the initial allocation to a single premium immediate annuity (SPIA) as a percentage of the liquid assets.</span> </i>
                                                    </span>
                                                </div>
                                                 
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 input-file mb-res">
                                                    <input type="text" placeholder="25" className={this.state.errors["annuity"] ? this.state.errors["annuity"] : 'form-control-custom'} value={this.state.totalAnnutiyAuto ? this.state.totalAnnutiyAuto : ''}  onChange={this.handleChange.bind(this, "annuity")} name="annuity" /> %
                                                </div>
                                            </div>
                                        </div> 
                                        
                                        <div className="box-main">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 head-text mb-res">TOTAL
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">100%
                                                </div>
                                                {this.state.errors["annuity"] ? (<p className="annuityError">Missing or incorrect inputs</p>) : ''}
                                            </div>
                                        </div> 
                                      
                               

                                    </div>
                                </div>

                                
                            </div>


                            <div className="clearfix"></div>

                            <div className="row">
                                <div className="calculat">
                                <input type="hidden" ref="id" className="form-control" name="id" onChange={this.handleChange.bind(this, "id")} defaultValue={this.state.fields._id}/>
                                <input type="hidden" ref="id" className="form-control" name="id" onChange={this.handleChange.bind(this, "name")} defaultValue={this.state.fields.name}/>
                                     {/* <a onClick={ this.mockupToolsFun } href="javascript:void(0);"> CALCULATE </a>  */}
                                    <button className="submit-btn" type="submit">CALCULATE</button>
                                </div>
                            </div>

                        </div>
                    </section></form>) : ( <section>
                        <div className="container">
                            <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                               <h5 style={{textAlign:'center'}}> You have not permission to access this tool please wait admin review.</h5>
                            </div>
                            </div>
                        </div>
                    </section>)} 

 <div id="reportSectionIdss">
               { this.state.reportSection	? (   
                                     
                    <section className="report-section" id="reportSectionId">
                       <html><body  id='tools_pdf'>
                        <div className="container">
                            {/* <div className="report-heading" id="report-heading">
                            <div className="secondhead">
                            <p className="repprthead">By registering with <em>SET IT AND LEAVE IT</em> and using this tool, you agree to abide by our <a target="_blank" href="http://localhost:3000/front/tnc">Terms & Conditions</a>.</p>
                                 <hr />
                                 <h1>RETIREMENT INCOME ANALYSIS</h1> 
                            </div>
                            </div> */}

                            <img class="watermarkimg" src={watermark}/>

                            <div className="report-heading Mreport-heading " id="report-heading">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="top-logo">
                                        <img src={logo} />
                                    </div>
                                </div> 
                                <div className="col-md-4">
                                <p><strong>Prepared by:</strong> <span>SET IT AND LEAVE IT</span></p> 
                                <p><strong>For:</strong> <span>{this.state.email}</span></p> 
                                </div> 
                                <div className="col-md-4 info">
                                <p><strong>Phone:</strong>	1-866-900-5050</p>
                                <p><strong>Email:</strong>	info@SetItandLeaveIt.com</p>
                                <p><strong>Web:</strong>	www.SetItandLeaveIt.com</p>
                                </div> 
                            </div> 
                            <div className="secondhead">
                                <p className="repprthead">By registering with <em>SET IT AND LEAVE IT</em> and using this tool, you agree to abide by our <a target="_blank" href="http://ec2-18-221-255-18.us-east-2.compute.amazonaws.com/front/tnc">Terms & Conditions</a>.</p>
                            <hr />
                                <h1>RETIREMENT INCOME ANALYSIS</h1> 
                            </div>     
                            </div>


                          
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="report-upper-table">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th colSpan="3"> USER INPUTS </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> inflation </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Liquid assets </td>
                                                    <td style={{textAlign:'center'}}> <span> <NumberFormat value={this.state.fields.liquid_assets} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                    <td style={{textAlign:'center'}}> <span> {this.state.fields.est_inflation}% </span> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Estimated budget </td>
                                                    <td style={{textAlign:'center'}}> <span> <NumberFormat value={this.state.fields.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                    <td style={{textAlign:'center'}}> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Time horizon (yrs) </td>
                                                    <td> <span> {this.state.fields.time_horizon} </span> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td style={{textAlign:'center'}}> COLAs </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Social security </td>
                                                    <td style={{textAlign:'center'}}> <NumberFormat value={this.state.fields.social_security} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </td>
                                                    <td style={{textAlign:'center'}}> <span> {this.state.fields.SS_colas}% </span> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Pension </td>
                                                    <td style={{textAlign:'center'}}> <span> <NumberFormat value={this.state.fields.pension} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                    <td > <span> {this.state.fields.Pension_colas}% </span> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                      
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="report-upper-table">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th colSpan="3"> ALLOCATIONS </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td> </td>
                                                    <td> Percent </td>
                                                    <td> Doller </td>
                                                </tr>
                                                <tr>
                                                    <td> Cash </td>
                                                    <td> <span> {this.state.fields.cash}% </span> </td>
                                                    <td> <span> <NumberFormat value={this.state.actualcash} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                </tr>
                                                <tr>
                                                    <td> Stock </td>
                                                    <td> <span> {this.state.fields.stock}% </span> </td>
                                                    <td> <span> <NumberFormat value={this.state.actualstock} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                </tr>
                                                <tr>
                                                    <td> Annuity </td>
                                                    <td> <span> {this.state.totalAnnutiyAuto}% </span> </td>
                                                    <td> <span> <NumberFormat value={this.state.actualannuity} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="report-upper-table">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th colSpan="3"> MARKET INPUTS </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> Div + cap growth </td>
                                                </tr>
                                                <tr>
                                                    <td> Dividend yield </td>
                                                    <td> <span> {this.state.fields.dividend_yield}% </span> </td>
                                                    <td> <span> {this.state.fields.div_growth_colas}% </span> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> Annuity yield </td>
                                                    <td> <span> {this.state.fields.annuity_payout}% </span> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> Interest rate </td>
                                                    <td> <span> {this.state.fields.interest_rate}% </span> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>

                            <div  className="row pd-top-20">
                                <div className="col-md-6">
                                    <div className="pai-chart-box">
                                        <h3> Asset Allocation </h3>

                                        <div className="chart-inner-box ">
                                        { this.state.pieGraphOption ? ( <div className="graph-section">
                                                  <CanvasJSChart  options = {this.state.pieGraphOption} />
                                          </div>) : '' }
                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="pai-chart-box">
                                        <h3> Income vs Budget </h3>

                                        <div className="chart-inner-box">
                                        
                                        { this.state.AllbudgetGraphoptions ? (<div className="graph-section">
                                            <CanvasJSChart  options = {this.state.AllbudgetGraphoptions} />
                                        </div>) : '' }

                                        </div>

                                    </div>
                                </div>

                            </div>


                            <div className="row pd-top-10">
                                <div className="col-md-6">
                                    <div className="pai-chart-box">
                                        <h3> Cash Profile </h3>

                                        <div className="chart-inner-box">

                                        { this.state.cashBarGraphOption ? ( <div className="graph-section">
                                             <CanvasJSChart options = {this.state.cashBarGraphOption} />
                                        </div>) : '' }

                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="pai-chart-box">
                                        <h3> Stock Allocation </h3>

                                        <div className="chart-inner-box">

                                        { this.state.stockPortfoliooptions ? ( <div className="graph-section">
                                                <CanvasJSChart options = {this.state.stockPortfoliooptions} />
                                        </div>) : '' }

                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="row pd-top-10">
                                <div className="col-md-6">
                                    <div className="pai-chart-box">
                                        <h3> Legacy Capital </h3>
                                    
                                        

                                        <div className="chart-inner-box chart-ct">
                                            <p> Stock <span> <NumberFormat value={this.state.EquitystockPortfoliocapital} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </p>
                                            <p> Cash <span> <NumberFormat value={this.state.EquityCashcapital} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </p>
                                          
                                            <hr className="line" />
                                            <p> Total <span> <NumberFormat value={this.state.EstimatedCapital} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </p>
                                            <p> Return net of w/d <span> {this.state.perYearReturn}% ann. ({this.state.totalYearReturn}%) </span> </p>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="pai-chart-box">
                                        <h3> Initial Stock Allocation vs Success </h3>

                                        <div className="chart-inner-box">
                                        { this.state.EquityAllocationGraphoptions ? (<div className="graph-section">
                                            <CanvasJSChart options = {this.state.EquityAllocationGraphoptions} />
                                        </div>) : '' }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        </body> </html>
                         <div class="calculat">
                         {/* <a href="javascript:void(0)" className="convert_btn" onClick={this.priviewReport}>Generate Report</a> */}
                         <a href="javascript:void(0)" className="convert_btn" onClick={this.pdfPrintsuccess}>CONVERT TO PDF</a>
                         
                         </div>
                       
                    </section>
                    
                 ) : '' }
            </div>
            {/* Preview modal here  */}
            {/* <Modal show={this.state.show}
                            onHide={this.handleHide}
                            container={this}
                            aria-labelledby="contained-modal-title"
                            className="reportPreviewModal"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                  REPORT
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div id="testtttt">
                              
                                { this.state.reportSection	? (     
                                    <div className="report-section" > 
                                         <html><body  id='tools_pdf'>
                                         <div className="container">

                                        
                                         <img class="watermarkimg" src={watermark}/>

                                             <div className="report-heading Mreport-heading " id="report-heading">
                                              <div className="row">
                                                  <div className="col-md-4">
                                                     <div className="top-logo">
                                                         <img src={logo} />
                                                     </div>
                                                  </div> 
                                                  <div className="col-md-4">
                                                    <p><strong>Prepared by:</strong> <span>SET IT AND LEAVE IT</span></p> 
                                                    <p><strong>For:</strong> <span>{this.state.email}</span></p> 
                                                  </div> 
                                                  <div className="col-md-4 info">
                                                    <p><strong>Phone:</strong>	1-866-900-5050</p>
                                                    <p><strong>Email:</strong>	info@SetItandLeaveIt.com</p>
                                                    <p><strong>Web:</strong>	www.SetItandLeaveIt.com</p>
                                                  </div> 
                                              </div> 
                                              <div className="secondhead">
                                                 <p className="repprthead">By registering with <em>SET IT AND LEAVE IT</em> and using this tool, you agree to abide by our <a target="_blank" href="http://ec2-18-221-255-18.us-east-2.compute.amazonaws.com/front/tnc">Terms & Conditions</a>.</p>
                                                <hr />
                                                 <h1>RETIREMENT INCOME ANALYSIS</h1> 
                                              </div>     
                                             </div>
                 
                                             <div className="row">
                                                 <div className="col-md-4">
                                                     <div className="report-upper-table">
                                                         <table className="table table-bordered">
                                                             <thead>
                                                                 <tr>
                                                                     <th colSpan="3"> USER INPUTS </th>
                                                                 </tr>
                                                             </thead>
                                                             <tbody>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> inflation </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Liquid assets </td>
                                                    <td style={{textAlign:'center'}}> <span> <NumberFormat value={this.state.fields.liquid_assets} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                    <td style={{textAlign:'center'}}> <span> {this.state.fields.est_inflation}% </span> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Estimated budget </td>
                                                    <td style={{textAlign:'center'}}> <span> <NumberFormat value={this.state.fields.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                    <td style={{textAlign:'center'}}> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Time horizon (yrs) </td>
                                                    <td> <span> {this.state.fields.time_horizon} </span> </td>
                                                    <td> </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td style={{textAlign:'center'}}> COLAs </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Social security </td>
                                                    <td style={{textAlign:'center'}}> <NumberFormat value={this.state.fields.social_security} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </td>
                                                    <td style={{textAlign:'center'}}> <span> {this.state.fields.SS_colas}% </span> </td>
                                                </tr>
                                                <tr>
                                                    <td style={{textAlign:'right'}}> Pension </td>
                                                    <td style={{textAlign:'center'}}> <span> <NumberFormat value={this.state.fields.pension} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                    <td > <span> {this.state.fields.Pension_colas}% </span> </td>
                                                </tr>
                                            </tbody>
                                                         </table>
                                                       
                                                     </div>
                                                 </div>
                 
                                                 <div className="col-md-4">
                                                     <div className="report-upper-table">
                                                         <table className="table table-bordered">
                                                             <thead>
                                                                 <tr>
                                                                     <th colSpan="3"> ALLOCATIONS </th>
                                                                 </tr>
                                                             </thead>
                                                             <tbody>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> Percent </td>
                                                                     <td> Doller </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> Cash </td>
                                                                     <td> <span> {this.state.fields.cash}% </span> </td>
                                                                     <td> <span> <NumberFormat value={this.state.actualcash} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> Stock </td>
                                                                     <td> <span> {this.state.fields.stock}% </span> </td>
                                                                     <td> <span> <NumberFormat value={this.state.actualstock} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> Annuity </td>
                                                                     <td> <span> {this.state.totalAnnutiyAuto}% </span> </td>
                                                                     <td> <span> <NumberFormat value={this.state.actualannuity} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                             </tbody>
                                                         </table>
                                                     </div>
                                                 </div>
                 
                                                 <div className="col-md-4">
                                                     <div className="report-upper-table">
                                                         <table className="table table-bordered">
                                                             <thead>
                                                                 <tr>
                                                                     <th colSpan="3"> MARKET INPUTS </th>
                                                                 </tr>
                                                             </thead>
                                                             <tbody>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                     <td> Div + cap growth </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> Dividend yield </td>
                                                                     <td> <span> {this.state.fields.dividend_yield}% </span> </td>
                                                                     <td> <span> {this.state.fields.div_growth_colas}% </span> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> Annuity yield </td>
                                                                     <td> <span> {this.state.fields.annuity_payout}% </span> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> Interest rate </td>
                                                                     <td> <span> {this.state.fields.interest_rate}% </span> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                                 <tr>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                     <td> </td>
                                                                 </tr>
                                                             </tbody>
                                                         </table>
                                                     </div>
                                                 </div>
                 
                                             </div>
                 
                                             <div  className="row pd-top-20">
                                                 <div className="col-md-6">
                                                     <div className="pai-chart-box">
                                                         <h3> Asset Allocation </h3>
                 
                                                         <div className="chart-inner-box">
                                                         { this.state.pieGraphOption ? ( <div className="graph-section">
                                                                   <CanvasJSChart options = {this.state.pieGraphOption} />
                                                           </div>) : '' }
                                                         </div>
                 
                                                     </div>
                                                 </div>
                 
                                                 <div className="col-md-6">
                                                     <div className="pai-chart-box">
                                                         <h3> Income vs Budget </h3>
                 
                                                         <div className="chart-inner-box">
                                                         
                                                         { this.state.AllbudgetGraphoptions ? (<div className="graph-section">
                                                             <CanvasJSChart options = {this.state.AllbudgetGraphoptions} />
                                                         </div>) : '' }
                 
                                                         </div>
                 
                                                     </div>
                                                 </div>
                 
                                             </div>
                 
                 
                                             <div className="row pd-top-10">
                                                 <div className="col-md-6">
                                                     <div className="pai-chart-box">
                                                         <h3> Cash Profile </h3>
                 
                                                         <div className="chart-inner-box">
                 
                                                         { this.state.cashBarGraphOption ? ( <div className="graph-section">
                                                              <CanvasJSChart options = {this.state.cashBarGraphOption} />
                                                         </div>) : '' }
                 
                                                         </div>
                 
                                                     </div>
                                                 </div>
                 
                                                 <div className="col-md-6">
                                                     <div className="pai-chart-box">
                                                         <h3> Stock Allocation </h3>
                 
                                                         <div className="chart-inner-box">
                 
                                                         { this.state.stockPortfoliooptions ? ( <div className="graph-section">
                                                                 <CanvasJSChart options = {this.state.stockPortfoliooptions} />
                                                         </div>) : '' }
                 
                                                         </div>
                 
                                                     </div>
                                                 </div>
                 
                                             </div>
                 
                                             <div className="row pd-top-10">
                                                 <div className="col-md-6">
                                                     <div className="pai-chart-box">
                                                         <h3> Legacy Capital </h3>
                                                     
                                                         
                 
                                                         <div className="chart-inner-box chart-ct">
                                                             <p> Stock <span> <NumberFormat value={this.state.EquitystockPortfoliocapital} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </p>
                                                             <p> Cash <span> <NumberFormat value={this.state.EquityCashcapital} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </p>
                                                             <hr className="line" />
                                                             <p> Total <span> <NumberFormat value={this.state.EstimatedCapital} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </p>
                                                             <p> Return net of w/d <span> {this.state.perYearReturn}% ann. ({this.state.totalYearReturn}%) </span> </p>
                                                         </div>
                 
                                                     </div>
                                                 </div>
                 
                                                 <div className="col-md-6">
                                                     <div className="pai-chart-box">
                                                         <h3> Initial Stock Allocation vs Success </h3>
                 
                                                         <div className="chart-inner-box">
                                                         { this.state.EquityAllocationGraphoptions ? (<div className="graph-section">
                                                             <CanvasJSChart options = {this.state.EquityAllocationGraphoptions} />
                                                         </div>) : '' }
                                                         </div>
                 
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                       
                                        
                                         </body></html>
                                         <div class="calculat">
                                            <a href="javascript:void(0)" className="convert_btn" onClick={this.pdfPrintsuccess}>CONVERT TO PDF</a>
                                         </div>
                                     </div>
                                     
                                  ) : '' }

                                </div>

                            </Modal.Body>
                           
                        </Modal> */}



                        {/* PDF SUCCESS ALERT MESSAGE */}

                        <Modal  show={this.state.pdfmsgshow}
                            onHide={this.handleHide}
                            container={this}
                            aria-labelledby="contained-modal-title"
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header className="reportAlert" closeButton> 
                                <Modal.Title id="contained-modal-title">
                                PDF CREATED
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div id="pdfmessage">
                                 {this.state.pdfMsg ? (
                                    <div> 
                                   <p>Please check your browser’s downloads if the PDF does not open automatically. The filename is {this.state.pdfName ? this.state.pdfName : ''}.</p>
                                   <a href="javascript:void(0)" onClick={this.handleHide} class="modalcloseOk">OK</a>
                                   </div>
                                 ) : '' }
                                </div>

                            </Modal.Body>
                           
                        </Modal>


            </div>
            );
}
}
export default withRouter(Tool);