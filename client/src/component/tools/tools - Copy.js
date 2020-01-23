import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import './assets/css/mockupTools.css';
import CanvasJSReact from './assets/js/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//var CanvasJS = CanvasJSReact.CanvasJS;
class mockupTools extends Component{

    constructor(props){
        super(props);
        this.state={
            fields:{},
            errors:{},
            liquid_assets:'',
            budget:'',
            est_inflation:'',
            time_horizon:'',
            social_security:'',
            ini_required_yield:'',
            pension:'',
            SS_colas:'',
            Pension_colas:'',
            dividend_yield:'',
            div_growth_colas:'',
            interest_rate:'',
            annuity_payout:'',
            actualcash:'',
            actualstock:'',
            actualannuity:'',
            totalAnnutiyAuto:'',
            reportSection:false,
            pieGraphOption:'',
            cashBarGraphOption:'',
            stockPortfoliooptions:'',
            AllbudgetGraphoptions:'',
            stockPortfolioLineGraphDataPoint11:'',
            stockPortfolioGraphDataPoint:'',
            EquityAllocationGraphoptions:'',
            errors:{}
        }
        this.mockupToolsFun = this.mockupToolsFun.bind(this);
        this.pieGraph = this.pieGraph.bind(this);
        this.cashBarGraph = this.cashBarGraph.bind(this);
        this.stockPortfolioBarGraph = this.stockPortfolioBarGraph.bind(this);
        this.AllbudgetGraph = this.AllbudgetGraph.bind(this);
        this.EquityallocationGraph = this.EquityallocationGraph.bind(this);
    }


    validationCheck(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
 
       if(!fields["liquid_assets"]){
           formIsValid = false;
           errors["liquid_assets"] = "error_sell input_f";
       }


       if(!fields["budget"]){
        formIsValid = false;
        errors["budget"] = "error_sell input_f";
      }

    if(!fields["est_inflation"]){
        formIsValid = false;
        errors["est_inflation"] = "error_sell input_sec";
    }
    
    if(fields["est_inflation"]){
        if(isNaN(fields["est_inflation"])){
            formIsValid = false;
            errors["est_inflation"] = "error_sell input_sec";
         }
     }

    if(!fields["time_horizon"]){
        formIsValid = false;
        errors["time_horizon"] = "error_sell input_f";
    }
    
    if(fields["time_horizon"]){
        if(isNaN(fields["time_horizon"])){
            formIsValid = false;
            errors["time_horizon"] = "error_sell input_f";
         }
     }

    if(!fields["social_security"]){
        formIsValid = false;
        errors["social_security"] = "error_sell input_f";
    }

    if(!fields["pension"]){
        formIsValid = false;
        errors["pension"] = "error_sell input_f";
    }

    if(!fields["SS_colas"]){
        formIsValid = false;
        errors["SS_colas"] = "error_sell input_sec";
    }
    if(fields["SS_colas"]){
        if(isNaN(fields["SS_colas"])){
            formIsValid = false;
            errors["SS_colas"] = "error_sell input_sec";
         }
     }

    if(!fields["Pension_colas"]){
        formIsValid = false;
        errors["Pension_colas"] = "error_sell input_sec";
    }
    if(fields["Pension_colas"]){
        if(isNaN(fields["Pension_colas"])){
            formIsValid = false;
            errors["Pension_colas"] = "error_sell input_sec";
         }
     }


    if(!fields["dividend_yield"]){
        formIsValid = false;
        errors["dividend_yield"] = "error_sell input_f";
    }
    if(fields["dividend_yield"]){
        if(isNaN(fields["dividend_yield"])){
            formIsValid = false;
            errors["dividend_yield"] = "error_sell input_f";
         }
     }

    if(!fields["interest_rate"]){
        formIsValid = false;
        errors["interest_rate"] = "error_sell input_f";
    }
    if(fields["interest_rate"]){
        if(isNaN(fields["interest_rate"])){
            formIsValid = false;
            errors["interest_rate"] = "error_sell input_f";
         }
     }

    if(!fields["annuity_payout"]){
        formIsValid = false;
        errors["annuity_payout"] = "error_sell input_f";
    }
    if(fields["annuity_payout"]){
        if(isNaN(fields["annuity_payout"])){
            formIsValid = false;
            errors["annuity_payout"] = "error_sell input_f";
         }
     }

    if(!fields["div_growth_colas"]){
        formIsValid = false;
        errors["div_growth_colas"] = "error_sell input_sec";
    }
    if(fields["div_growth_colas"]){
        if(isNaN(fields["div_growth_colas"])){
            formIsValid = false;
            errors["div_growth_colas"] = "error_sell input_f";
         }
     }

    if(!fields["cash"]){
        formIsValid = false;
        errors["cash"] = "error_sell input_f";
    }
    if(fields["cash"]){
        if(isNaN(fields["cash"])){
            formIsValid = false;
            errors["cash"] = "error_sell input_f";
         }
     }

    if(!fields["stock"]){
        formIsValid = false;
        errors["stock"] = "error_sell input_f";
    }
    if(fields["stock"]){
        if(isNaN(fields["stock"])){
            formIsValid = false;
            errors["stock"] = "error_sell input_f";
         }
     }

        this.setState({errors});
        return formIsValid;
        
    }


    mockupToolsFun(e){
        e.preventDefault();
     if(this.validationCheck()){ 
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
       const AnnuityGraphDataPoint =[], SS_pensionGraphDataPoint =[], DividendGraphDataPoint=[], infusionGraphDataPoint=[],req_budgetGraphDataPoint=[];


       
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

      // let Actual_dividend1 = parseInt(liquid_assets1)*(parseFloat(this.state.fields.stock/100))*(parseFloat(dividend_yield1/100));
       //let actualannuity1 = ((parseInt(liquid_assets)*parseFloat(this.state.fields.annuity))/100); 
      // let Actual_Annuity1 =   (actualannuity1*(parseFloat(annuity_payout1/100)));
       let inflation_budget1,inf_socialSecurity1,inf_pension1,SS_pension1,residual1,inf_dividend1,cash_needed1,infusion1,infu_cash1,fromStock1,stockPortfolio1,untappedStock1,percentageStock1,org_RHS1;
       let totalYearCash1=0, totalYearStock1=0,totalCashYear1=0,EquitystockPortfolio1;
       let stockPer1 = 0, stockXvalue1 = 0;
       const cashGraphDataPoint1 = [], stockPortfolioGraphDataPoint1 = [], stockPortfolioLineGraphDataPoint1 = [], EquityAllocationGraphDataPoint1=[], FromstockEquity1=[], InfuCashEquity1=[];
       const AnnuityGraphDataPoint1 =[],EquityAllocationNaturalYearIncome=[], SS_pensionGraphDataPoint1 =[], DividendGraphDataPoint1=[], infusionGraphDataPoint1=[],req_budgetGraphDataPoint1=[];
       const org_RHSarray=[],InfuCashArray=[];


    let req_budget_point=0,org_RHS_point=0,social_security_ponit=0,pension_point=0,Actual_dividend_point=0,infu_cash_point=0,stockPortfolio_point=0,untappedStock_point=0;
    infu_cash=actualcash;
            for(i=1;i<=parseInt(time_horizon);i++){
       
                /*--- SS+Pension ---*/
                SS_pension = (parseInt(social_security)+parseInt(pension));
                SS_pensionGraphDataPoint.push({x:i,y:SS_pension});

                /*--- Residual ---*/
                residual = (parseInt(req_budget)-parseInt(SS_pension));
               
        
                /*--- Annuity ---*/ 
                 if(parseInt(i) <= parseInt(time_horizon)){
                    Actual_Annuity = Actual_Annuity;
                 }else{
                    Actual_Annuity = 0; 
                 }
                 AnnuityGraphDataPoint.push({x:i,y:Actual_Annuity});
                
        
                /*--- Cash Needed ---*/  
                cash_needed = (req_budget-SS_pension)-(Actual_dividend+Actual_Annuity);
                

                /*--- Req Budget ---*/
                req_budgetGraphDataPoint.push({x:i,y:parseFloat(req_budget)});
                if(i==1){
                    req_budget_point = req_budget;
                }else{
                    req_budget_point =  req_budget_point;
                }
                 inflation_budget = (parseFloat(req_budget_point)*(1+parseFloat(est_inflation)/100));
                 req_budget_point = inflation_budget;
                 req_budget = Math.round(req_budget_point);
                  
     
                /*--- Social Security ---*/
                if(i==1){
                    social_security_ponit = social_security;
                 }else{
                    social_security_ponit =  social_security_ponit;
                 }
                 inf_socialSecurity = parseFloat(social_security_ponit)*(1+parseFloat(social_security_colas)/100);
                 social_security_ponit = inf_socialSecurity;
                 social_security = Math.round(social_security_ponit);
        
                /*--- Pension ---*/

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
                 }else{
                    infu_cash_point =  infu_cash_point;
                 }

                 if(i == 1){
                       if(cash_needed < 0){
                           infu_cash_point = (infu_cash_point*(1+(parseInt(interest_rate)/100))-(cash_needed));
                           infu_cash = Math.round(infu_cash_point);
                       }else{
                           infu_cash_point = ((infu_cash_point)-(cash_needed))*(1+(parseInt(interest_rate)/100));
                           infu_cash = Math.round(infu_cash_point);
                       }
                 }else{
                    if(((infu_cash)-(cash_needed)) >0 ){
                       if(cash_needed < 0){ 
                          infu_cash_point = (infu_cash_point*(1+(parseInt(interest_rate)/100))-(cash_needed));
                          infu_cash = Math.round(infu_cash_point);
                       }else{
                          infu_cash_point = ((infu_cash_point)-(cash_needed))*(1+(parseInt(interest_rate)/100));  
                          infu_cash = Math.round(infu_cash_point); 
                       }
                    }else{
                        infu_cash = 0;
                    }
                 }
        
                 InfuCashArray.push(infu_cash);
                 cashGraphDataPoint.push({x:i,y:infu_cash});
                 totalYearCash += infu_cash;

            /*--- From Stock ---*/ 
                
                if(infu_cash == 0){
                    fromStock = ((cash_needed)-(InfuCashArray[i-2]));
                }else{
                    fromStock = 0;
                }
        
            /*--- Stock Portfolio ---*/
        
                if(i == 1){
                    stockPortfolio = actualstock;
                    stockPortfolio_point = stockPortfolio;
                }else{
                    stockPortfolio_point = (((stockPortfolio_point)-(fromStock))*(1+(parseFloat(div_capGrowth)/100)));
                    stockPortfolio = Math.round(stockPortfolio_point);
                }
                EquitystockPortfolio = stockPortfolio;
                stockPortfolioGraphDataPoint.push({x:i,y:stockPortfolio});
                totalYearStock += stockPortfolio;
        
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
        //Actual_Annuity1=0;
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
       

        if(stockXvalue1 <= 100){
            
            inf_dividend1 = parseFloat(Actual_dividend11)*(parseFloat(div_capGrowth1)/100);
            if(stockXvalue1 != parseInt(this.state.fields.stock)){
                actualstock1 = ((parseInt(liquid_assets)*parseFloat(stockXvalue1))/100);  
            }
  
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
              //req_budget = Math.round(parseFloat(req_budget)+parseFloat(inflation_budget));
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
                stockPortfolio_point1 = (((stockPortfolio_point1)-(fromStock1))*(1+(parseFloat(div_capGrowth1)/100)));
                stockPortfolio1 = Math.round(stockPortfolio_point1);
            }
            EquitystockPortfolio1 = stockPortfolio1;
            stockPortfolioGraphDataPoint1.push({x:i,y:stockPortfolio1});
            totalYearStock1 += stockPortfolio1;

    
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
                    //continue;
                    console.log('cashneturalYear:',i, neturalYear);
                    console.log('infu_cash1:',i, infu_cash1);
                }
     
          }
          totalCashYear1 = parseInt(stockPortfolio1) + parseInt(infu_cash1);
          EquityAllocationGraphDataPoint.push({x:stockXvalue1,y:totalCashYear1});
          EquityAllocationNaturalYearIncome.push({x:stockXvalue1,y:neturalYear});
          stockXvalue1 = parseInt(stockXvalue1) +  parseInt(5);
          console.log('neturalYear:',neturalYear);

        }
      }
     }

  
     

    /*--- LAGACY HERE ---*/
    console.log("FromstockEquity:",FromstockEquity1);
    console.log("InfuCashEquity:",InfuCashEquity1);
    console.log("EquityAllocationNaturalYearIncome:",EquityAllocationNaturalYearIncome);
    console.log('EquityAllocationGraphDataPoint:', EquityAllocationGraphDataPoint);





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
          stockPortfolioGraphDataPoint:stockPortfolioGraphDataPoint
         
      });


     this.pieGraph(actualcash,actualstock,actualannuity);
     this.cashBarGraph(cashGraphDataPoint);
     this.stockPortfolioBarGraph(stockPortfolioGraphDataPoint,stockPortfolioLineGraphDataPoint);
     this.AllbudgetGraph(AnnuityGraphDataPoint, SS_pensionGraphDataPoint, DividendGraphDataPoint, infusionGraphDataPoint,req_budgetGraphDataPoint); 
     this.EquityallocationGraph(EquityAllocationGraphDataPoint,EquityAllocationNaturalYearIncome);
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
                    { y: actualannuity, label: "Annuity", color: "#aac473"  },
                    { y: actualstock, label: "Stock", color: "#bf5956"  },
                    { y: actualcash, label: "Cash", color: "#588dc9"  }
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
                  color:"#aac473",
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
				lineColor: "#51CDA0",
                tickColor: "#51CDA0",
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
                    color:"#aac473",
                    dataPoints: stockPortfolioGraphDataPoint
  
                  },
                {
                    type: "line",
                    axisYType: "secondary",
                    showInLegend: true,
                    markerType: "circle",
                    legendText: "Stock%/Orig(RHS)",
                    lineThickness: 6,
                    lineColor: "#588dc9",
                    markerColor: "#588dc9",
                    markerSize: 10,
                    dataPoints: stockPortfolioLineGraphDataPoint
                 }
                
                  
                ]
        }
        this.setState({
            stockPortfoliooptions : stockPortfoliooptions
        });

    }


    AllbudgetGraph(AnnuityGraphDataPoint, SS_pensionGraphDataPoint, DividendGraphDataPoint, infusionGraphDataPoint,req_budgetGraphDataPoint){
        console.log('req_budgetGraphDataPoint..xxx:',req_budgetGraphDataPoint);
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
            //     {
			// 	type: "area",
			// 	name: "Profit",
			// 	markerBorderColor: "white",
			// 	legendText: "no marker",
			// 	markerType: "none",
			// 	lineThickness: 0,
			// 	dataPoints: [
			// 	    { x:14, y: 450000},
			// 		{ x:15, y: 450000},
			// 		{ x:16, y: 450000},
			// 		{ x:17, y: 450000},
			// 		{ x:18, y: 450000},
			// 		{ x:19, y: 450000},
			// 		{ x:20, y: 450000}
				
					
			// 	]
            // },
            {
				type: "stackedColumn",
                name: "Annuity",
                color:"#aac473",
				showInLegend: true,
                dataPoints: AnnuityGraphDataPoint
			},{
				type: "stackedColumn",
                name: "SS+Pension",
                color:"#895FDC",
				showInLegend: true,
                dataPoints: SS_pensionGraphDataPoint
			},
			{
				type: "stackedColumn",
                name: "Dividend",
                color:'#efa613',
				showInLegend: true,
                dataPoints: DividendGraphDataPoint
            },{
				type: "stackedColumn",
                name: "Infusion",
                color:'#84e0ff',
				showInLegend: true,
                dataPoints: infusionGraphDataPoint
			},{
				type: "line",
                legendText: "Req budget",
                showInLegend: true,
				markerType: "none",
                lineColor:"#3d7232",
                lineThickness: 5,
                dataPoints: req_budgetGraphDataPoint
			}
        
        ]
        }
        
        this.setState({
            AllbudgetGraphoptions : AllbudgetGraphoptions
        });

    }

    EquityallocationGraph(EquityAllocationGraphDataPoint,EquityAllocationNaturalYearIncome){
        const EquityAllocationGraphoptions = {
			title: {
				text: ""
            },
            axisX:{
                interval: 5,
                suffix: "%",
                labelFontSize: 12
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
                maximum: 45,
                interval: 5
            },
            dataPointWidth: 8, 
            data: [
                {
                    type: "column",
                    legendText: "Legacy",
                    showInLegend: true, 
                    color:"#c12424",
                    dataPoints: EquityAllocationGraphDataPoint
                
                  },
                {
                    type: "line",
                    axisYType: "secondary",
                    showInLegend: true,
                    markerType: "triangle",
                    legendText: "# Years Natural Income",
                    lineThickness: 4,
                    lineColor: "#588dc9",
                    markerColor: "#000",
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
              <div className="mock-tools">
                
                   <div className="container">
                   <form>
                    <div className="row">
                    <div className="col-sm-12">
                        <h5 className="page-title">SET IT AND LEAVE IT</h5>
                        </div>
                     
                        <div className="col-sm">
                            <div className="table-section">
                              <h5>USER INPUT</h5>
                                <table className="table form-table">
                                   <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                  </tr>
                                    <tr>
                                        <td> LIQUID ASSETS </td>
                                        <td>$<NumberFormat class={this.state.errors["liquid_assets"] ? this.state.errors["liquid_assets"] : 'input_f'}  thousandSeparator={true} value={this.state.fields["liquid_assets"]} onChange={this.handleChange.bind(this, "liquid_assets")} placeholder="10,000,000" name="liquid_assets" /></td>
                                        <td>INFL.</td>
                                    </tr>
                                    <tr>
                                        <td> BUDGET  </td>
                                        <td>$<NumberFormat class={this.state.errors["budget"] ? this.state.errors["budget"] : 'input_f'} thousandSeparator={true}  value={this.state.fields["budget"]} onChange={this.handleChange.bind(this, "budget")} placeholder="10,000,000" name="budget" />  </td>
                                        <td> <input type="text" class={this.state.errors["est_inflation"] ? this.state.errors["est_inflation"] : 'input_sec'} value={this.state.fields["est_inflation"]} onChange={this.handleChange.bind(this, "est_inflation")} name="est_inflation" />% </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>COLA</td>
                                    </tr>
                                    <tr>
                                        <td>SOCIAL SECURITY </td>
                                        <td>$<NumberFormat class={this.state.errors["social_security"] ? this.state.errors["social_security"] : 'input_f'} thousandSeparator={true}  value={this.state.fields["social_security"]} onChange={this.handleChange.bind(this, "social_security")} placeholder="10,000,000" name="social_security" /></td>
                                        <td><input type="text" class={this.state.errors["SS_colas"] ? this.state.errors["SS_colas"] : 'input_sec'} value={this.state.fields["SS_colas"]} onChange={this.handleChange.bind(this, "SS_colas")} name="SS_colas" />%</td>
                                    </tr>
                                    <tr>
                                        <td>PENSION </td>
                                        <td>$<NumberFormat class={this.state.errors["pension"] ? this.state.errors["pension"] : 'input_f'} thousandSeparator={true}  value={this.state.fields["pension"]} onChange={this.handleChange.bind(this, "pension")} placeholder="10,000,000" name="pension"/></td>
                                        <td><input type="text" class={this.state.errors["Pension_colas"] ? this.state.errors["Pension_colas"] : 'input_sec'}  value={this.state.fields["Pension_colas"]} onChange={this.handleChange.bind(this, "Pension_colas")} name="Pension_colas" />%</td>
                                    </tr>
                                    <tr>
                                        <td>TIME HORIZON </td>
                                        <td><input type="text" class={this.state.errors["time_horizon"] ? this.state.errors["time_horizon"] : 'input_f'}  value={this.state.fields["time_horizon"]} onChange={this.handleChange.bind(this, "time_horizon")} name="time_horizon" />years</td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="col-sm">
                        <div className="table-section">
                        <h5>MARKET INPUTS</h5>
                             <table className="table  form-table">
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td>Div/cap growth</td>
                                  </tr>

                                  
                                  <tr>
                                      <td> DIVIDEND YIELD </td>
                                      <td><input type="text" class={this.state.errors["dividend_yield"] ? this.state.errors["dividend_yield"] : 'input_f'} value={this.state.fields["dividend_yield"]} onChange={this.handleChange.bind(this, "dividend_yield")} name="dividend_yield" />%</td>
                                      <td><input type="text" class={this.state.errors["div_growth_colas"] ? this.state.errors["div_growth_colas"] : 'input_sec'} value={this.state.fields["div_growth_colas"]} onChange={this.handleChange.bind(this, "div_growth_colas")} name="div_growth_colas" />%</td>
                                  </tr>
                                  <tr>
                                      <td> INTEREST RATE  </td>
                                      <td><input type="text" class={this.state.errors["interest_rate"] ? this.state.errors["interest_rate"] : 'input_f'} value={this.state.fields["interest_rate"]} onChange={this.handleChange.bind(this, "interest_rate")} name="interest_rate" />%</td>
                                      <td></td>
                                  </tr>
                                  <tr>
                                      <td> ANNUITY PAYOUT  </td>
                                      <td><input type="text" class={this.state.errors["annuity_payout"] ? this.state.errors["annuity_payout"] : 'input_f'} value={this.state.fields["annuity_payout"]} onChange={this.handleChange.bind(this, "annuity_payout")} name="annuity_payout" />%</td>
                                      <td></td>
                                  </tr>
                             </table>
                             </div>
                        </div>
                        <div className="col-sm">
                        <div className="table-section">
                        <h5>ALLOCATION INPUTS</h5>
                             <table className="table  form-table">
                                  <tr>
                                      <td> CASH </td>
                                      <td><input type="text" class={this.state.errors["cash"] ? this.state.errors["cash"] : 'input_f'} value={this.state.fields["cash"]} onChange={this.handleChange.bind(this, "cash")} name="cash" />%</td>
                                  </tr>
                                  <tr>
                                      <td> STOCK </td>
                                      <td><input type="text" class={this.state.errors["stock"] ? this.state.errors["stock"] : 'input_f'} value={this.state.fields["stock"]} onChange={this.handleChange.bind(this, "stock")} name="stock" />%</td>
                                  </tr>
                                  {this.state.totalAnnutiyAuto ? (
                                  <tr>
                                      <td> ANNUITY  </td>
                                      <td><input type="text" class="input_f" value={this.state.totalAnnutiyAuto ? this.state.totalAnnutiyAuto : 0}  onChange={this.handleChange.bind(this, "annuity")} name="annuity" />%</td>
                                  </tr>) : '' }
                             </table>
                             </div>
                        </div>
                        
                    </div>
                    <button type="submit" onClick={ this.mockupToolsFun } className="btn btn-info mockup-button">CALCULATE</button>	
                  </form>
                  </div>
                  
                  { this.state.reportSection	? (
                  <div className="mockup-report-section">
                        
                  <div className="container">
                    <div className="row">
                    <div className="col-sm-12">
                        <h5 className="report-page-title">SET IT AND LEAVE IT RETIREMENT ANALYSIS </h5>
                        </div>
                     
                        <div className="col-sm">
                            <div className="report-table-section">
                              <h5>USER INPUT</h5>
                                <table className="table report-form-table">
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td className="tbl-head">Inflation</td>
                                    </tr>

                                    <tr>
                                        <td>Liquid assets </td>
                                        <td><NumberFormat value={this.state.fields.liquid_assets} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </td>
                                        <td>{this.state.fields.est_inflation}%</td>
                                    </tr>
                                    <tr>
                                        <td>Estimated budget </td>
                                        <td><NumberFormat value={this.state.fields.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Time horizon (yrs)  </td>
                                        <td>{this.state.fields.time_horizon}</td>
                                        <td className="tbl-head">COLAs</td>
                                    </tr>
                                    <tr>
                                        <td>Social security </td>
                                        <td><NumberFormat value={this.state.fields.social_security} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                        <td>{this.state.fields.SS_colas}%</td>
                                    </tr>
                                    <tr>
                                        <td>Pension</td>
                                        <td><NumberFormat value={this.state.fields.pension} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                        <td>{this.state.fields.Pension_colas}%</td>
                                    </tr>
                                </table>
                                <div class="initial_required_yield"><span>{this.state.ini_required_yield ? this.state.ini_required_yield : ''}% </span>INITIAL REQUIRED YIELD </div>
                            </div>
                        </div>
                        <div className="col-sm">
                        <div className="report-table-section">
                        <h5>ALLOCATIONS</h5>
                             <table className="table  report-form-table">
                                  <tr>
                                      <td></td>
                                      <td className="tbl-head">Percent</td>
                                      <td className="tbl-head">Dollar </td>
                                  </tr>
                                  <tr>
                                      <td> Cash </td>
                                      <td>{this.state.fields.cash}%</td>
                                      <td><NumberFormat value={this.state.actualcash} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                  </tr>
                                  <tr>
                                      <td> Stock  </td>
                                      <td>{this.state.fields.stock}%</td>
                                      <td><NumberFormat value={this.state.actualstock} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                  </tr>
                                  <tr>
                                      <td> Annuity   </td>
                                      <td>{this.state.totalAnnutiyAuto}%</td>
                                      <td><NumberFormat value={this.state.actualannuity} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                  </tr>
                             </table>
                             </div>
                        </div>
                        <div className="col-sm">
                        <div className="report-table-section">
                        <h5>MARKET INPUTS </h5>
                             <table className="table  report-form-table">
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td className="tbl-head">Div + cap growth </td>
                                  </tr>
                                  <tr>
                                      <td> Dividend yield </td>
                                      <td>{this.state.fields.dividend_yield}%</td>
                                      <td>{this.state.fields.div_growth_colas}%</td>
                                  </tr>
                                  <tr>
                                      <td> Annuity yield  </td>
                                      <td>{this.state.fields.annuity_payout}%</td>
                                      <td> </td>
                                  </tr>
                                  <tr>
                                      <td>Interest rate </td>
                                      <td>{this.state.fields.interest_rate}%</td>
                                      <td></td>
                                  </tr>
                             </table>
                             </div>
                        </div>
                      
                    </div>
                  </div>

                  </div>) : '' }


                  <div className="mockup-report-graph">
                     <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                            { this.state.pieGraphOption ? ( <div className="graph-section">
                               <CanvasJSChart options = {this.state.pieGraphOption} />
                                </div>) : '' }
                            </div>

                            <div className="col-sm-6 ">
                            { this.state.cashBarGraphOption ? ( <div className="graph-section">
                               <CanvasJSChart options = {this.state.cashBarGraphOption} />
                            </div>) : '' }
                            </div>
                          
                            <div className="col-sm-12 ">
                            { this.state.stockPortfoliooptions ? ( <div className="graph-section">
                               <CanvasJSChart options = {this.state.stockPortfoliooptions} />
                            </div>) : '' }
                            </div>

                            <div className="col-sm-12 ">
                            { this.state.AllbudgetGraphoptions ? (<div className="graph-section">
                                <CanvasJSChart options = {this.state.AllbudgetGraphoptions} />
                                </div>) : '' }
                            </div> 

                            <div className="col-sm-12 ">
                            { this.state.EquityAllocationGraphoptions ? (<div className="graph-section">
                                <CanvasJSChart options = {this.state.EquityAllocationGraphoptions} />
                                </div>) : '' }
                            </div> 

                            
                        </div>
                    </div>
                  </div>
              </div>
        );
    }
}
export default mockupTools;
