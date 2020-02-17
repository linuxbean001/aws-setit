import React, { Component } from 'react';
import { Link, NavLink, withRouter, BrowserRouter as Router } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UserService from '../../reactservice/UserService'
import NumberFormat from 'react-number-format';
import portfolioimg from '../../assets/img/portfolio.png'
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const API = new UserService();
let AssetsApproxEquity = 0, AssetsApproxTotal = 0, AssetsApproxBudget = 0, dbAssetsApproxTotal = 0;
class Profile extends Component {

    constructor(props) {
        let fields1 = API.getProfile();
        let fields2 = API.getProfile().data;
        let newFields;
        if (fields1.data) {
            newFields = fields2;
        } else {
            newFields = fields1;
        }
        // console.log('f1:',fields1);
        // console.log('f2:',fields2);
        super(props);
        this.props.onHeaderHover(true);
        this.state = {
            open: false,
            fields: newFields,
            errors: {},
            showAlert: false,
            queshowAlert: false,
            pshowAlert: false,
            selectedIndex: 0,
            CsetItAndLeaveItRetirement: false,
            CfixedAnnuityProduct: false,
            CinsuranceProduct: false,
            CinvestmentAdvice: false,
            CestatePlanning: false,
            CtaxPlanning: false,
            CotherGoalServicecheck: false,

            ChomeBox: false,
            CiWeRent: false,
            ChomeBanking: false,
            ChomeBrokerage: false,
            ChomeRetirementAccount: false,
            ChomeRothAccount: false,
            ChomeOther: false,
            ChomeSS: false,
            ChomePension: false,

            CnoInsurance: false,
            Cmedicare: false,
            CsupplementalHealth: false,
            Clongtermcare: false,
            ClifeInsurance: false,
            Cinotherbox: false,

            CanalyticalInExperience: false,
            CcapitalPreservation: false,
            CinvestIncome: false,
            CinvestGrowth: false,
            CinvestGrowthIncome: false,
            CinvestAggressiveGrowth: false,

            CriskAggressive: false,
            CriskModerate: false,
            CriskConservative: false,
            Cportfolio1: false,
            Cportfolio2: false,
            Cportfolio3: false,
            Cportfolio4: false,
            Cportfolio5: false,

            Caaii: false,
            CadvisorPerspectives: false,
            CalphaArchiect: false,
            Creferral: false,
            CotherOthers: false,

            Errorindicator: [],
            currentStep: 1,
            showModal: false,
            name: '',
            nameError: '',
            address: '',
            phone: '',
            reasonGoalConsultation: '',
            age: '',
            married: '',
            Kids: '',
            grandkid: '',
            pets: '',
            personalOtherDetails: '',
            homeValue: '',
            Mortgage: '',
            approxEquity: '',
            homeBox: '',
            iWeRent: '',
            monthlyRent: '',
            homeBanking: '',
            homeBrokerage: '',
            homeRetirementAccount: '',
            homeRothAccount: '',
            homeOther: '',
            homeSS: '',
            homePension: '',
            banking: '',
            brokerage: '',
            retirementAccount: '',
            rothAccount: '',
            otherTypes: '',
            otherApproxValue: '',
            dbAssetsApproxTotal: '',
            socailSecurity: '',
            pension: '',
            others: '',
            essential: '',
            discretionary: '',
            oneOffExpenses: '',
            noInsurance: '',
            medicare: '',
            supplementalHealth: '',
            longtermcare: '',
            lifeInsurance: '',
            lifeInType: '',
            lifeamount: '',
            inother: '',
            inotherbox: '',
            analyticalInExperience: '',
            capitalPreservation: '',
            investIncome: '',
            investGrowth: '',
            investGrowthIncome: '',
            investAggressiveGrowth: '',
            currentAllocationStock: '',
            experience_1_10: '',
            expectations: '',
            experience_gb: '',
            riskAggressive: '',
            riskModerate: '',
            riskConservative: '',
            portfolioDrawdown: '',
            riskPreservation: '',
            riskIncome: '',
            riskGrowth: '',
            lastMarketDownturn: '',
            portfolio1: '',
            portfolio2: '',
            portfolio3: '',
            portfolio4: '',
            portfolio5: '',
            aaii: '',
            advisorPerspectives: '',
            alphaArchiect: '',
            referral: '',
            referralContent: '',
            otherOthers: '',
            otherOthersContent: '',
            whatAttracted: '',
            improveQuestionnaire: '',

            setItAndLeaveItRetirement: '',
            fixedAnnuityProduct: '',
            insuranceProduct: '',
            investmentAdvice: '',
            estatePlanning: '',
            taxPlanning: '',
            otherGoalServicecheck: '',
            otherGoalService: '',
            goalComment: '',
            goalQuestion: '',


            Eaddress: '',
            Ephone: '',
            EreasonGoalConsultation: '',
            Eage: '',
            Emarried: '',
            EKids: '',
            Egrandkid: '',
            Epets: '',
            EpersonalOtherDetails: '',

            EhomeValue: '',
            EMortgage: '',
            EhomeBox: '',
            EiWeRent: '',
            EmonthlyRent: '',
            EhomeBanking: '',
            EhomeBrokerage: '',
            EhomeRetirementAccount: '',
            EhomeRothAccount: '',
            EhomeOther: '',
            EhomeSS: '',
            EhomePension: '',
            Ebanking: '',
            Ebrokerage: '',
            EretirementAccount: '',
            ErothAccount: '',
            EotherTypes: '',
            EotherApproxValue: '',
            EsocailSecurity: '',
            Epension: '',
            Eothers: '',




            EsetItAndLeaveItRetirement: '',
            EfixedAnnuityProduct: '',
            EinsuranceProduct: '',
            EinvestmentAdvice: '',
            EestatePlanning: '',
            EtaxPlanning: '',
            EotherGoalService: '',
            EgoalComment: '',
            EgoalQuestion: '',

            Eessential: '',
            Ediscretionary: '',
            EoneOffExpenses: '',


            Emedicare: '',
            EsupplementalHealth: '',
            Elongtermcare: '',
            ElifeInsurance: '',
            ElifeInType: '',
            Elifeamount: '',
            Einother: '',
            Einotherbox: '',



            Eaaii: '',
            EadvisorPerspectives: '',
            EalphaArchiect: '',
            Ereferral: '',
            EreferralContent: '',
            EotherOthers: '',
            EotherOthersContent: '',
            EwhatAttracted: '',
            EimproveQuestionnaire: '',

            pdfmsgshow: false,


        };
        this.profileupdate = this.profileupdate.bind(this);
        this.passwordupdate = this.passwordupdate.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getQuestionLists = this.getQuestionLists.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
        this._start = this._start.bind(this)
        this.moveFuc = this.moveFuc.bind(this);
        this.sideButtonFuc = this.sideButtonFuc.bind(this);
        this.questionvalidationCheck = this.questionvalidationCheck.bind(this);

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getQuestionLists();

    }

    handleHide() {
        this.setState({ show: false, pdfmsgshow: false });
    }
    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    handleSelect = index => {
        this.setState({ selectedIndex: index });
    };



    moveFuc(e) {

        if (e.currentTarget.dataset.id == 1) {
            window.scrollTo(500, 0);
            this.props.history.replace('/front');
        } else if (e.currentTarget.dataset.id == 2) {
            window.scrollTo(500, 0);
            this.props.history.replace('/front/profile');
            this.setState({
                currentStep: 1,
                selectedIndex: 0,
                queshowAlert: false
            })
        } else if (e.currentTarget.dataset.id == 3) {
            window.scrollTo(500, 0);
            this.props.history.replace('/front/tool');
        }
    }

    sideButtonFuc(step) {
        var elmnt = document.getElementById("profileDashboard");
        elmnt.scrollIntoView({ behavior: "smooth" });
        let currentStep = parseInt(step.currentTarget.dataset.id);
        this.setState({
            currentStep: currentStep
        })
    }


    questionvalidationCheck() {
        let fields = this.state.fields;
        //let errors = {};
        let formIsValid = true;
        let Errorindicator = [], unique = [];

        const errors = {
            nameError: '',
            Eaddress: '',
            Ephone: '',
            EreasonGoalConsultation: '',
            Eage: '',
            Emarried: '',
            EKids: '',
            Egrandkid: '',
            Epets: '',
            EpersonalOtherDetails: '',

            EhomeValue: '',
            EMortgage: '',
            EhomeBox: '',
            EiWeRent: '',
            EmonthlyRent: '',
            EhomeBanking: '',
            EhomeBrokerage: '',
            EhomeRetirementAccount: '',
            EhomeRothAccount: '',
            EhomeOther: '',
            EhomeSS: '',
            EhomePension: '',
            Ebanking: '',
            Ebrokerage: '',
            EretirementAccount: '',
            ErothAccount: '',
            EotherTypes: '',
            EotherApproxValue: '',
            EsocailSecurity: '',
            Epension: '',
            Eothers: '',

            EsetItAndLeaveItRetirement: '',
            EfixedAnnuityProduct: '',
            EinsuranceProduct: '',
            EinvestmentAdvice: '',
            EestatePlanning: '',
            EtaxPlanning: '',
            EotherGoalServicecheck: '',
            EotherGoalService: '',
            EgoalComment: '',
            EgoalQuestion: '',

            Eessential: '',
            Ediscretionary: '',
            EoneOffExpenses: '',

            EnoInsurance: '',
            Emedicare: '',
            EsupplementalHealth: '',
            Elongtermcare: '',
            ElifeInsurance: '',
            ElifeInType: '',
            Elifeamount: '',
            Einother: '',

            EcurrentAllocationStock: '',
            Eexperience_1_10: '',
            Eexpectations: '',
            Eexperience_gb: '',
            EanalyticalInExperience: '',
            EcapitalPreservation: '',
            EinvestIncome: '',
            EinvestGrowth: '',
            EinvestGrowthIncome: '',
            EinvestAggressiveGrowth: '',



            EportfolioDrawdown: '',
            EriskPreservation: '',
            EriskIncome: '',
            EriskGrowth: '',
            ElastMarketDownturn: '',

            EriskAggressive: '',
            EriskModerate: '',
            EriskConservative: '',
            Eportfolio1: '',
            Eportfolio2: '',
            Eportfolio3: '',
            Eportfolio4: '',
            Eportfolio5: '',

            EwhatAttracted: '',
            EimproveQuestionnaire: '',
        }

        if (!this.state.name) {
            formIsValid = true;
            errors.nameError = "error_sell form-control";
            Errorindicator.push(2);

        }
        if (!this.state.address) {
            formIsValid = true;
            errors.Eaddress = "error_sell form-control";
            Errorindicator.push(2);
        }
        if (!this.state.phone) {
            formIsValid = true;
            errors.Ephone = "error_sell form-control";
            Errorindicator.push(2);
        }
        if (!this.state.reasonGoalConsultation) {
            formIsValid = true;
            errors.EreasonGoalConsultation = "error_sell form-control";
            Errorindicator.push(2);
        }
        if (!this.state.age) {
            formIsValid = true;
            errors.Eage = "error_sell form-control";
            Errorindicator.push(4);
        }

        if (!this.state.married) {
            formIsValid = true;
            errors.Emarried = "error_sell form-control";
            Errorindicator.push(4);
        }
        if (!this.state.Kids) {
            formIsValid = true;
            errors.EKids = "error_sell form-control";
            Errorindicator.push(4);
        }
        if (!this.state.grandkid) {
            formIsValid = true;
            errors.Egrandkid = "error_sell form-control";
            Errorindicator.push(4);
        }
        // if (!this.state.pets) {
        //     formIsValid = true;
        //     errors.Epets = "error_sell form-control";
        //     Errorindicator.push(4);
        // }

        // if(!this.state.personalOtherDetails){
        //     formIsValid = true;
        //     errors.EpersonalOtherDetails = "error_sell form-control";
        //     Errorindicator.push(4);
        // }

 //////// living ///////////////////
 if(this.state.iWeRent) {
     if(!this.state.monthlyRent) {
         formIsValid = true;
         errors.EmonthlyRent = "error_sell form-control";
         Errorindicator.push(5);
     }
 }

 if(this.state.homeBox) {
     if(!this.state.homeValue){
        formIsValid = true;
        errors.EhomeValue = "error_sell form-control";
        Errorindicator.push(5);
     }
 }

 if(this.state.homeBox) {
    if(!this.state.Mortgage){
       formIsValid = true;
       errors.EMortgage = "error_sell form-control";
       Errorindicator.push(5);
    }
}

        // if (!this.state.homeBox) {
        //     if (!this.state.homeValue && !this.state.Mortgage) {
        //         formIsValid = true;
        //         errors.EhomeValue = "error_sell form-control";
        //         errors.EMortgage = "error_sell form-control";
        //         Errorindicator.push(5);
        //     } else {
        //         formIsValid = true;
        //         errors.EhomeValue = "form-control";
        //         errors.EMortgage = "form-control";
        //         Errorindicator.push(5);
        //     }

        //     if (this.state.homeValue || this.state.Mortgage) {
        //         if (!this.state.homeBox) {
        //             formIsValid = true;
        //             errors.EhomeBox = "checkfalse";
        //             Errorindicator.push(5);
        //         }
        //     }

        //     if (this.state.iWeRent) {
        //         if (!this.state.monthlyRent) {
        //             formIsValid = true;
        //             errors.EmonthlyRent = "error_sell form-control";
        //             Errorindicator.push(5);
        //         }
        //     }

        //     if (this.state.monthlyRent) {
        //         if (!this.state.iWeRent) {
        //             formIsValid = true;
        //             errors.EiWeRent = "error_sell form-control";
        //             Errorindicator.push(5);
        //         }
        //     }
        // }
        // if (this.state.iWeRent) {
        //     formIsValid = true;
        //     errors.EhomeBox = "checktrue"
        //     Errorindicator.push(5);
        // }
        // if (this.state.iWeRent) {
        //     formIsValid = true;
        //     errors.EiWeRent = "checktrue";
        //     Errorindicator.push(5);
        // } else {
        //     errors.EhomeBox = "checkfalse";

        //     formIsValid = true;
        // }
        // if (this.state.iWeRent) {
        //     formIsValid = true;
        //     errors.EiWeRent = "checktrue";
        //     Errorindicator.push(5);
        // }

        // if (this.state.homeBox) {
        //     formIsValid = true;
        //     errors.EhomeBox = "checktrue";

        //     Errorindicator.push(5);
        // }

        // if (!this.state.homeBox) {
        //     formIsValid = true;
        //     errors.EhomeBox = "checkfalse";
        //     Errorindicator.push(5);
        // } else {
        //     formIsValid = true;
        //     errors.EhomeBox = "checktrue";
        // }

        // if (this.state.monthlyRent) {
        //     if (!this.state.iWeRent) {
        //         formIsValid = true;
        //         errors.EiWeRent = "checkfalse";
        //         Errorindicator.push(5);
        //     }
        // }

        /////////// living ///////////////////

        // if (!this.state.homeBox && this.state.iWeRent) {
        //     formIsValid = true;
        //     errors.EhomeBox = "checkfalse";
        //     errors.EiWeRent = "checkfalse";
        //     Errorindicator.push(5);
        // } else {
        //     formIsValid = true;
        //     errors.EhomeBox = "checktrue";
        //     errors.EiWeRent = "checktrue";
        // }


        // if (this.state.homeBox) {
        //     if (!this.state.iWeRent) {
        //         formIsValid = true;
        //         errors.CiWeRent = "form-control";
        //     }
        // }




        // if (!this.state.homeBanking) {
        //     if (this.state.banking) {
        //         formIsValid = true;
        //         errors.Ebanking = "error_sell form-control";
        //         Errorindicator.push(5);
        //     }
        // }

        // if (this.state.banking) {
        //     if (this.state.homeBanking) {
        //         formIsValid = true;
        //         errors.EhomeBanking = "checkfalse";
        //         Errorindicator.push(5);
        //     }
        // }

        if (this.state.homeBrokerage) {
            if (!this.state.brokerage) {
                formIsValid = true;
                errors.Ebrokerage = "checkfalse";
                Errorindicator.push(6);
            }
        }
        if (this.state.brokerage) {
            if (!this.state.homeBrokerage) {
                formIsValid = true;
                errors.EhomeBrokerage = "error_sell form-control";
                Errorindicator.push(6);

            }
        }
        if (!this.state.brokerage) {
            if (this.state.homeBrokerage) {
                formIsValid = true;
                errors.Ebrokerage = "error_sell form-control"
                Errorindicator.push(6);
            }
        }

        // if (this.state.monthlyRent) {
        //     if (!this.state.homeBanking && !this.state.homeBrokerage) {
        //         formIsValid = true;
        //         errors.EhomeBanking = "checkfalse";
        //         errors.EhomeBrokerage = "checkfalse";
        //         Errorindicator.push(5);
        //     }
        // }



        // if (!this.state.homeBox && !this.state.iWeRent) {
        //     formIsValid = true;
        //     errors.EhomeBox = "checkfalse";
        //     errors.EiWeRent = "checkfalse";
        //     Errorindicator.push(5);
        // } else {
        //     formIsValid = true;
        //     errors.EhomeBox = "checktrue";
        //     errors.EiWeRent = "checktrue";
        // }
        if (!this.state.homeBox && !this.state.iWeRent) {
            formIsValid = true;
            errors.EhomeBox = "checkfalse";
            errors.EiWeRent = "checkfalse";
            Errorindicator.push(5);
        } else {
            formIsValid = true;
            errors.EhomeBox = "checktrue";
            errors.EiWeRent = "checktrue";
        }

        if (!this.state.homeBrokerage && !this.state.homeBanking && !this.state.homeOther && !this.state.homeRetirementAccount && !this.state.homeRothAccount) {
            formIsValid = true;
            errors.EhomeBrokerage = "checkfalse";
            errors.EhomeBanking = "checkfalse";
            errors.EhomeOther = "checkfalse";
            errors.EhomeRetirementAccount = "checkfalse";
            errors.EhomeRothAccount = "checkfalse";
            Errorindicator.push(6);
        } else {
            formIsValid = true;
            errors.EhomeBrokerage = "checktrue";
            errors.EhomeBanking = "checktrue";
            errors.EhomeOther = "checktrue";
            errors.EhomeRetirementAccount = "checktrue";
            errors.EhomeRothAccount = "checktrue";
        }


   

        if (this.state.homeRetirementAccount) {
            if (!this.state.retirementAccount) {
                formIsValid = true;
                errors.EretirementAccount = "error_sell form-control";
                Errorindicator.push(6);
            }
        }

        if (this.state.retirementAccount) {
            if (!this.state.homeRetirementAccount) {
                formIsValid = true;
                errors.EhomeRetirementAccount = "checkfalse";
                Errorindicator.push(6);
            }
        }

        if (this.state.homeRothAccount) {
            if (!this.state.rothAccount) {
                formIsValid = true;
                errors.ErothAccount = "error_sell form-control";
                Errorindicator.push(6);
            }
        }
        if (this.state.rothAccount) {
            if (!this.state.homeRothAccount) {
                formIsValid = true;
                errors.EhomeRothAccount = "checkfalse";
                Errorindicator.push(6);
            }
        }

        if (this.state.homeOther) {
            if (!this.state.otherTypes) {
                formIsValid = true;
                errors.EotherTypes = "error_sell form-control";
                Errorindicator.push(6);
            }
            if (!this.state.otherApproxValue) {
                formIsValid = true;
                errors.EotherApproxValue = "error_sell form-control";
                Errorindicator.push(6);
            }
        }
        if (this.state.otherTypes || this.state.otherApproxValue) {
            if (!this.state.homeOther) {
                formIsValid = true;
                errors.EhomeOther = "checkfalse";
                Errorindicator.push(6);
            }
        }



        // if(!this.state.homeSS && !this.state.homePension){
        //     formIsValid = true;
        //     errors.EhomeSS = "checkfalse";
        //     errors.EhomePension = "checkfalse";
        //     Errorindicator.push(5);
        // }else{
        //     formIsValid = true;
        //     errors.EhomeSS = "checktrue";
        //     errors.EhomePension = "checktrue";
        // }



        if (this.state.homeSS) {
            if (!this.state.socailSecurity) {
                formIsValid = true;
                errors.EsocailSecurity = "error_sell form-control";
                Errorindicator.push(6);
            }
        }
        if (this.state.socailSecurity) {
            if (!this.state.homeSS) {
                formIsValid = true;
                errors.EhomeSS = "checkfalse";
                Errorindicator.push(6);
            }
        }


        if (this.state.homePension) {
            if (!this.state.pension) {
                formIsValid = true;
                errors.Epension = "error_sell form-control";
                Errorindicator.push(6);
            }
        }
        if (this.state.pension) {
            if (!this.state.homePension) {
                formIsValid = true;
                errors.EhomePension = "checkfalse";
                Errorindicator.push(6);
            }
        }

        // if(!this.state.others){
        //         formIsValid = true;
        //         errors.Eothers = "error_sell form-control";
        //         Errorindicator.push(5);
        // }



        if (!this.state.setItAndLeaveItRetirement && !this.state.fixedAnnuityProduct && !this.state.insuranceProduct && !this.state.investmentAdvice && !this.state.estatePlanning && !this.state.taxPlanning && !this.state.otherGoalService && !this.state.otherGoalServicecheck) {
            formIsValid = true;
            errors.EsetItAndLeaveItRetirement = "checkfalse";
            errors.EfixedAnnuityProduct = "checkfalse";
            errors.EinsuranceProduct = "checkfalse";
            errors.EinvestmentAdvice = "checkfalse";
            errors.EestatePlanning = "checkfalse";
            errors.EtaxPlanning = "checkfalse";
            //errors.EotherGoalService = "error_sell form-control"; 
            errors.EotherGoalServicecheck = "checkfalse";
            Errorindicator.push(3);
        } else {
            formIsValid = true;
            errors.EsetItAndLeaveItRetirement = "checktrue";
            errors.EfixedAnnuityProduct = "checktrue";
            errors.EinsuranceProduct = "checktrue";
            errors.EinvestmentAdvice = "checktrue";
            errors.EestatePlanning = "checktrue";
            errors.EtaxPlanning = "checktrue";
            errors.EotherGoalServicecheck = "checktrue";
            errors.EotherGoalService = "form-control";
        }

        if (this.state.otherGoalServicecheck && !this.state.otherGoalService) {
            errors.EotherGoalService = "error_sell form-control";
            Errorindicator.push(3);
        } else if (!this.state.otherGoalServicecheck && this.state.otherGoalService) {
            errors.EotherGoalServicecheck = "checkfalse";
            Errorindicator.push(3);
        }

        // if(!this.state.goalComment){
        //     formIsValid = true;
        //     errors.EgoalComment = "error_sell form-control";
        //     Errorindicator.push(3);
        // }

        // if(!this.state.goalQuestion){
        //     formIsValid = true;
        //     errors.EgoalQuestion = "error_sell form-control";
        //     Errorindicator.push(3);
        // }


        if (!this.state.essential) {
            formIsValid = true;
            errors.Eessential = "error_sell form-control";
            Errorindicator.push(7);
        }

        // if(!this.state.discretionary){
        //     formIsValid = true;
        //     errors.Ediscretionary = "error_sell form-control";
        //     Errorindicator.push(6);
        // }
        // if(!this.state.oneOffExpenses){
        //     formIsValid = true;
        //     errors.EoneOffExpenses = "error_sell form-control";
        //     Errorindicator.push(6);
        // }



        if (!this.state.medicare && !this.state.supplementalHealth && !this.state.longtermcare && !this.state.noInsurance && !this.state.lifeInsurance && !this.state.inotherbox) {
            formIsValid = true;
            errors.EnoInsurance = "checkfalse";
            errors.Emedicare = "checkfalse";
            errors.EsupplementalHealth = "checkfalse";
            errors.Elongtermcare = "checkfalse";
            errors.ElifeInsurance = "checkfalse";
            errors.Einotherbox = "checkfalse";
            Errorindicator.push(8);
        } else {
            formIsValid = true;
            errors.EnoInsurance = "checktrue";
            errors.Emedicare = "checktrue";
            errors.EsupplementalHealth = "checktrue";
            errors.Elongtermcare = "checktrue";
            errors.ElifeInsurance = "checktrue";
            errors.Einotherbox = "checktrue";
        }

        if (this.state.lifeInsurance) {
            if (!this.state.lifeInType) {
                formIsValid = true;
                errors.ElifeInType = "error_sell form-control";
                Errorindicator.push(8);
            }
            if (!this.state.lifeamount) {
                formIsValid = true;
                errors.Elifeamount = "error_sell form-control";
                Errorindicator.push(8);
            }
        }
        if (this.state.lifeInType || this.state.lifeamount) {
            if (!this.state.lifeInsurance) {
                formIsValid = true;
                errors.ElifeInsurance = "checkfalse";
                Errorindicator.push(8);
            }
        }

        if (this.state.inotherbox) {
            if (!this.state.inother) {
                formIsValid = true;
                errors.Einother = "error_sell form-control";
                Errorindicator.push(8);
            }
        }

        if (this.state.inother) {
            if (!this.state.inotherbox) {
                formIsValid = true;
                errors.Einotherbox = "checkfalse";
                Errorindicator.push(8);
            }
        }



        if (!this.state.currentAllocationStock) {
            formIsValid = true;
            errors.EcurrentAllocationStock = "error_sell form-control";
            Errorindicator.push(9);
        }

        if (!this.state.experience_1_10) {
            formIsValid = true;
            errors.Eexperience_1_10 = "error_sell form-control";
            Errorindicator.push(9);
        }
        if (!this.state.expectations) {
            formIsValid = true;
            errors.Eexpectations = "error_sell form-control";
            Errorindicator.push(9);
        }
        // if(!this.state.experience_gb){
        //     formIsValid = true;
        //     errors.Eexperience_gb = "error_sell form-control";
        //     Errorindicator.push(8);
        // }

        // if(!this.state.analyticalInExperience){
        //     formIsValid = true;
        //     errors.EanalyticalInExperience = "checkfalse";
        //     Errorindicator.push(8);
        // }

        if (!this.state.capitalPreservation && !this.state.investIncome && !this.state.investGrowth && !this.state.investGrowthIncome && !this.state.investAggressiveGrowth) {
            formIsValid = true;
            errors.EcapitalPreservation = "checkfalse";
            errors.EinvestIncome = "checkfalse";
            errors.EinvestGrowth = "checkfalse";
            errors.EinvestGrowthIncome = "checkfalse";
            errors.EinvestAggressiveGrowth = "checkfalse";
            Errorindicator.push(9);
        } else {
            formIsValid = true;
            errors.EcapitalPreservation = "checktrue";
            errors.EinvestIncome = "checktrue";
            errors.EinvestGrowth = "checktrue";
            errors.EinvestGrowthIncome = "checktrue";
            errors.EinvestAggressiveGrowth = "checktrue";
        }



        if (!this.state.portfolioDrawdown) {
            formIsValid = true;
            errors.EportfolioDrawdown = "error_sell form-control";
            Errorindicator.push(10);
        }
        if (!this.state.riskPreservation) {
            formIsValid = true;
            errors.EriskPreservation = "error_sell form-control";
            Errorindicator.push(10);
        }
        if (!this.state.riskIncome) {
            formIsValid = true;
            errors.EriskIncome = "error_sell form-control";
            Errorindicator.push(10);
        }
        if (!this.state.riskGrowth) {
            formIsValid = true;
            errors.EriskGrowth = "error_sell form-control";
            Errorindicator.push(10);
        }
        // if(!this.state.lastMarketDownturn){
        //     formIsValid = true;
        //     errors.ElastMarketDownturn = "error_sell form-control";
        //     Errorindicator.push(9);
        // }



        if (!this.state.riskAggressive && !this.state.riskModerate && !this.state.riskConservative) {
            formIsValid = true;
            errors.EriskAggressive = "checkfalse";
            errors.EriskModerate = "checkfalse";
            errors.EriskConservative = "checkfalse";
            Errorindicator.push(10);
        } else {
            formIsValid = true;
            errors.EriskAggressive = "checktrue";
            errors.EriskModerate = "checktrue";
            errors.EriskConservative = "checktrue";
        }

        if (!this.state.portfolio1 && !this.state.portfolio2 && !this.state.portfolio3 && !this.state.portfolio4 && !this.state.portfolio5) {
            formIsValid = true;
            errors.Eportfolio1 = "checkfalse";
            errors.Eportfolio2 = "checkfalse";
            errors.Eportfolio3 = "checkfalse";
            errors.Eportfolio4 = "checkfalse";
            errors.Eportfolio5 = "checkfalse";
            Errorindicator.push(10);
        } else {
            formIsValid = true;
            errors.Eportfolio1 = "checktrue";
            errors.Eportfolio2 = "checktrue";
            errors.Eportfolio3 = "checktrue";
            errors.Eportfolio4 = "checktrue";
            errors.Eportfolio5 = "checktrue";
        }


        // if(!this.state.aaii && !this.state.advisorPerspectives && !this.state.alphaArchiect){
        //     formIsValid = true;
        //     errors.Eaaii = "checkfalse";
        //     errors.EadvisorPerspectives = "checkfalse";
        //     errors.EalphaArchiect = "checkfalse";

        //     Errorindicator.push(10);
        // }else{
        //     formIsValid = true;
        //     errors.Eaaii = "checktrue";
        //     errors.EadvisorPerspectives = "checktrue";
        //     errors.EalphaArchiect = "checktrue";

        // }

        // if(!this.state.referral && !this.state.otherOthers){
        //     errors.Ereferral = "checkfalse";
        //     errors.EotherOthers = "checkfalse";
        //     Errorindicator.push(10);
        // }else{
        //     errors.Ereferral = "checktrue";
        //     errors.EotherOthers = "checktrue";
        // }


        if (this.state.referral) {
            if (!this.state.referralContent) {
                formIsValid = true;
                errors.EreferralContent = "error_sell form-control";
                Errorindicator.push(11);
            }
        }
        if (this.state.referralContent) {
            if (!this.state.referral) {
                formIsValid = true;
                errors.Ereferral = "checkfalse";
                Errorindicator.push(11);
            }
        }

        if (this.state.otherOthers) {
            if (!this.state.otherOthersContent) {
                formIsValid = true;
                errors.EotherOthersContent = "error_sell form-control";
                Errorindicator.push(11);
            }
        }
        if (this.state.otherOthersContent) {
            if (!this.state.otherOthers) {
                formIsValid = true;
                errors.EotherOthers = "checkfalse";
                Errorindicator.push(11);
            }
        }


        if (this.state.brokerage) {
            if (!this.state.homeBrokerage) {
                formIsValid = true;
                errors.EhomeBrokerage = "checkfalse";
                Errorindicator.push(6);
            }
        }

        // if (this.state.banking) {
        //     if (!this.state.homeBanking) {
        //         formIsValid = true;
        //         errors.EhomeBanking = "checkfalse";
        //         Errorindicator.push(6);
        //     }
        // }

        // if (this.state.homeBanking) {
        //     if (!this.state.banking) {
        //         formIsValid = true;
        //         errors.Ebanking = "checkfalse";
        //         Errorindicator.push(6)
        //     }
        // }



        // if(!this.state.whatAttracted){
        //     formIsValid = true;
        //     errors.EwhatAttracted = "error_sell form-control";
        //     Errorindicator.push(10);
        // }

        // if(!this.state.improveQuestionnaire){
        //     formIsValid = true;
        //     errors.EimproveQuestionnaire = "error_sell form-control";
        //     Errorindicator.push(10);
        // }

        console.log('Errorindicator', Errorindicator);
        unique = [...new Set(Errorindicator)];
        //console.log(unique); 

        this.setState({
            ...this.state,
            ...errors,
            Errorindicator: unique
        })
        return formIsValid;
    }

    _next() {
        if (this.questionvalidationCheck()) {
            var elmnt = document.getElementById("profileDashboard");
            elmnt.scrollIntoView({ behavior: "smooth" });
            let currentStep = this.state.currentStep
            currentStep = currentStep >= 11 ? 11 : currentStep + 1
            this.setState({
                currentStep: currentStep
            })

        }
    }

    _prev() {
        if (this.questionvalidationCheck()) {
            var elmnt = document.getElementById("profileDashboard");
            elmnt.scrollIntoView({ behavior: "smooth" });
            let currentStep = this.state.currentStep
            currentStep = currentStep <= 1 ? 1 : currentStep - 1
            this.setState({
                currentStep: currentStep
            })
        }
    }

    _start() {
        var elmnt = document.getElementById("profileDashboard");
        elmnt.scrollIntoView({ behavior: "smooth" });
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 1 ? 1 : 1
        this.setState({
            currentStep: currentStep
        })
    }



    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })


        /*=== Onchange Filed error ===*/

        if (name == 'name') {
            console.log('name:' + name + ' value:' + value);
            if (value) {
                //this.state.nameError = "form-control";
                this.setState({ nameError: "form-control" })
            } else {
                this.setState({ nameError: " error_sell form-control" })
            }
        }
        if (name == 'address') {
            if (value) {
                //this.state.nameError = "form-control";
                this.setState({ Eaddress: "form-control" })
            } else {
                this.setState({ Eaddress: "error_sell form-control" })
            }
        }
        if (name == 'phone') {
            if (value) {
                this.setState({ Ephone: "form-control" })
            }
        }
        if (name == 'reasonGoalConsultation') {
            if (value) {
                this.setState({ EreasonGoalConsultation: "form-control" })
            } else {
                this.setState({ EreasonGoalConsultation: " error_sell form-control" })
            }
        }

        //  if(this.state.otherGoalServicecheck && !this.state.otherGoalService){
        //     errors.EotherGoalService = "error_sell form-control"; 
        //     Errorindicator.push(3);
        // }else if(!this.state.otherGoalServicecheck && this.state.otherGoalService){
        //     errors.EotherGoalServicecheck = "checkfalse";
        //     Errorindicator.push(3);
        // }


        if (name == 'otherGoalService') {
            if (value) {
                if (!this.state.otherGoalServicecheck) {
                    this.setState({ EotherGoalServicecheck: 'checkfalse' })
                }
                this.setState({ EotherGoalService: "form-control" })
            } else {
                this.setState({ EotherGoalServicecheck: 'checkfalse', EotherGoalService: "error_sell form-control" })
            }
        }



        if (name == 'age') {
            if (value) {
                this.setState({ Eage: "form-control" })
            } else {
                this.setState({ Eage: "error_sell form-control" })
            }
        }
        if (name == 'married') {
            if (value) {
                this.setState({ Emarried: "form-control" })
            } else {
                this.setState({ Emarried: "error_sell form-control" })
            }
        }
        if (name == 'Kids') {
            if (value) {
                this.setState({ EKids: "form-control" })
            } else {
                this.setState({ EKids: "error_sell form-control" })
            }
        }
        if (name == 'pets') {
            if (value) {
                this.setState({ Epets: "form-control" })
            } else {
                this.setState({ Epets: "error_sell form-control" })
            }
        }
        if (name == 'grandkid') {
            if (value) {
                this.setState({ Egrandkid: "form-control" })
            } else {
                this.setState({ Egrandkid: "error_sell form-control" })
            }
        }
        if (name == 'homeValue') {
            if (value) {
                if (!this.state.homeBox) {
                    this.setState({ EhomeBox: 'checkfalse' })
                }
                this.setState({ EhomeValue: "form-control" })
            } else {
                this.setState({ EhomeBox: 'checktrue', EhomeValue: "error_sell form-control" })
            }
        }

        if (name == 'Mortgage') {
            if (value) {
                this.setState({ EMortgage: "form-control" })
            } else {
                this.setState({ EMortgage: "error_sell form-control" })
            }
        }

        if (name == 'monthlyRent') {
            if (value) {
                if (!this.state.iWeRent) {
                    this.setState({ EiWeRent: 'checkfalse' })
                }
                this.setState({ EmonthlyRent: "form-control" })
            } else {
                this.setState({ EiWeRent: 'checktrue', EmonthlyRent: "error_sell form-control" })
            }
        }

        if (name == 'retirementAccount') {
            if (value) {
                if (!this.state.homeRetirementAccount) {
                    this.setState({ EhomeRetirementAccount: 'checkfalse' })
                }
                this.setState({ EretirementAccount: "form-control" })
            } else {
                this.setState({ retirementAccount: '', EhomeRetirementAccount: 'checktrue', EretirementAccount: "error_sell form-control" })
            }
        }
        if (name == 'banking') {
            if (value) {
                if (!this.state.homeBanking) {
                    this.setState({ EhomeBanking: 'checkfalse' })
                }
                this.setState({ Ebanking: "form-control" })
            } else {
                this.setState({ banking: '', EhomeBanking: 'checktrue', Ebanking: "error_sell form-control" })
            }
        }

        if (name == 'brokerage') {
            if (value) {
                if (!this.state.homeBrokerage) {
                    this.setState({ EhomeBrokerage: 'checkfalse' })
                }
                this.setState({ Ebrokerage: "form-control" })
            } else {
                this.setState({ brokerage: '', EhomeBrokerage: 'checktrue', Ebrokerage: "error_sell form-control" })
            }
        }

        if (name == 'rothAccount') {
            if (value) {
                if (!this.state.homeRothAccount) {
                    this.setState({ EhomeRothAccount: 'checkfalse' })
                }
                this.setState({ ErothAccount: "form-control" })
            } else {
                this.setState({ EhomeRothAccount: 'checktrue', ErothAccount: "error_sell form-control" })
            }
        }
        if (name == 'otherApproxValue') {
            if (value) {
                if (!this.state.homeOther) {
                    this.setState({ EhomeOther: 'checkfalse' })
                }
                this.setState({ EotherApproxValue: "form-control" })
            } else {
                this.setState({ EhomeOther: 'checktrue', EotherApproxValue: "error_sell form-control" })
            }
        }
        if (name == 'otherTypes') {
            if (value) {
                if (!this.state.homeOther) {
                    this.setState({ EhomeOther: 'checkfalse' })
                }
                this.setState({ EotherTypes: "form-control" })
            } else {
                this.setState({ EhomeOther: 'checktrue', EotherTypes: "error_sell form-control" })
            }
        }
        if (name == 'socailSecurity') {
            if (value) {

                if (!this.state.homeSS) {
                    this.setState({ EhomeSS: 'checkfalse' })
                }
                this.setState({ EsocailSecurity: "form-control" })
            } else {
                this.setState({ EhomeSS: 'checktrue', EsocailSecurity: "error_sell form-control" })
            }
        }
        if (name == 'pension') {
            if (value) {
                if (!this.state.homePension) {
                    this.setState({ EhomePension: 'checkfalse' })
                }
                this.setState({ Epension: "form-control" })
            } else {
                this.setState({ EhomePension: 'checktrue', Epension: "error_sell form-control" })
            }
        }
        if (name == 'essential') {
            if (value) {
                this.setState({ Eessential: "form-control" })
            } else {
                this.setState({ Eessential: "error_sell form-control" })
            }
        }
        if (name == 'discretionary') {
            if (value) {
                this.setState({ Ediscretionary: "form-control" })
            } else {
                this.setState({ Ediscretionary: "error_sell form-control" })
            }
        }
        if (name == 'oneOffExpenses') {
            if (value) {
                this.setState({ EoneOffExpenses: "form-control" })
            } else {
                this.setState({ EoneOffExpenses: "error_sell form-control" })
            }
        }
        if (name == 'lifeInType') {
            if (value) {
                if (!this.state.lifeInsurance) {
                    this.setState({ ElifeInsurance: 'checkfalse' })
                }
                this.setState({ ElifeInType: "form-control" })
            } else {
                this.setState({ ElifeInsurance: 'checktrue', ElifeInType: "error_sell form-control" })
            }
        }
        if (name == 'lifeamount') {
            if (value) {
                if (!this.state.lifeInsurance) {
                    this.setState({ ElifeInsurance: 'checkfalse' })
                }
                this.setState({ Elifeamount: "form-control" })
            } else {
                this.setState({ ElifeInsurance: 'checktrue', Elifeamount: "error_sell form-control" })
            }
        }
        if (name == 'inother') {
            if (value) {
                if (!this.state.inotherbox) {
                    this.setState({ Einotherbox: 'checkfalse' })
                }
                this.setState({ Einother: "form-control" })
            } else {
                this.setState({ Einotherbox: 'checktrue', Einother: "error_sell form-control" })
            }
        }
        if (name == 'currentAllocationStock') {
            if (value) {
                this.setState({ EcurrentAllocationStock: "form-control" })
            } else {
                this.setState({ EcurrentAllocationStock: "error_sell form-control" })
            }
        }
        if (name == 'currentAllocationStock') {
            if (value) {
                this.setState({ EcurrentAllocationStock: "form-control" })
            } else {
                this.setState({ EcurrentAllocationStock: "error_sell form-control" })
            }
        }


        if (name == 'currentAllocationStock') {
            if (value) {
                this.setState({ EcurrentAllocationStock: "form-control" })
            } else {
                this.setState({ EcurrentAllocationStock: "error_sell form-control" })
            }
        }
        if (name == 'experience_1_10') {
            if (value) {
                this.setState({ Eexperience_1_10: "form-control" })
            } else {
                this.setState({ Eexperience_1_10: "error_sell form-control" })
            }
        }
        if (name == 'expectations') {
            if (value) {
                this.setState({ Eexpectations: "form-control" })
            } else {
                this.setState({ Eexpectations: "error_sell form-control" })
            }
        }
        if (name == 'experience_gb') {
            if (value) {
                this.setState({ Eexperience_gb: "form-control" })
            } else {
                this.setState({ Eexperience_gb: "error_sell form-control" })
            }
        }
        if (name == 'portfolioDrawdown') {
            if (value) {
                this.setState({ EportfolioDrawdown: "form-control" })
            } else {
                this.setState({ EportfolioDrawdown: "error_sell form-control" })
            }
        }
        if (name == 'riskPreservation') {
            if (value) {
                this.setState({ EriskPreservation: "form-control" })
            } else {
                this.setState({ EriskPreservation: "error_sell form-control" })
            }
        }
        if (name == 'riskIncome') {
            if (value) {
                this.setState({ EriskIncome: "form-control" })
            } else {
                this.setState({ EriskIncome: "error_sell form-control" })
            }
        }
        if (name == 'riskGrowth') {
            if (value) {
                this.setState({ EriskGrowth: "form-control" })
            } else {
                this.setState({ EriskGrowth: "error_sell form-control" })
            }
        }
        if (name == 'lastMarketDownturn') {
            if (value) {
                this.setState({ ElastMarketDownturn: "form-control" })
            } else {
                this.setState({ ElastMarketDownturn: "error_sell form-control" })
            }
        }

        if (name == 'referralContent') {
            if (value) {
                if (!this.state.referral) {
                    this.setState({ Ereferral: 'checkfalse' })
                }
                this.setState({ EreferralContent: "form-control" })
            } else {
                this.setState({ Ereferral: 'checktrue', EreferralContent: "error_sell form-control" })
            }
        }
        if (name == 'otherOthersContent') {
            if (value) {

                if (!this.state.otherOthers) {
                    this.setState({ EotherOthers: 'checkfalse' })
                }
                this.setState({ EotherOthersContent: "form-control" })
            } else {
                this.setState({ EotherOthers: 'checktrue', EotherOthersContent: "error_sell form-control" })
            }
        }
        /*=== End Onchage Field error  ===*/



        if (name == 'setItAndLeaveItRetirement') {
            this.setState({ CsetItAndLeaveItRetirement: !this.state.CsetItAndLeaveItRetirement })
            if (this.state.CsetItAndLeaveItRetirement) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (this.state.CsetItAndLeaveItRetirement && !this.state.CfixedAnnuityProduct && !this.state.CinsuranceProduct && !this.state.CinvestmentAdvice && !this.state.CestatePlanning && !this.state.CtaxPlanning && !this.state.CotherGoalServicecheck) {
                    this.setState({
                        EsetItAndLeaveItRetirement: "checkfalse",
                        EfixedAnnuityProduct: "checkfalse",
                        EinsuranceProduct: "checkfalse",
                        EinvestmentAdvice: "checkfalse",
                        EestatePlanning: "checkfalse",
                        EtaxPlanning: "checkfalse",
                        EotherGoalServicecheck: "checkfalse",
                    });
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EsetItAndLeaveItRetirement: "checktrue",
                    EfixedAnnuityProduct: "checktrue",
                    EinsuranceProduct: "checktrue",
                    EinvestmentAdvice: "checktrue",
                    EestatePlanning: "checktrue",
                    EtaxPlanning: "checktrue",
                    EotherGoalServicecheck: "checktrue",
                });
            }
        }

        if (name == 'fixedAnnuityProduct') {
            this.setState({ CfixedAnnuityProduct: !this.state.CfixedAnnuityProduct })
            console.log('chnage CsetItAndLeaveItRetirement:', this.state.CsetItAndLeaveItRetirement)
            console.log('chnage CfixedAnnuityProduct:', this.state.CfixedAnnuityProduct)
            if (this.state.CfixedAnnuityProduct) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CsetItAndLeaveItRetirement && this.state.CfixedAnnuityProduct && !this.state.CinsuranceProduct && !this.state.CinvestmentAdvice && !this.state.CestatePlanning && !this.state.CtaxPlanning && !this.state.CotherGoalServicecheck) {
                    this.setState({
                        EsetItAndLeaveItRetirement: "checkfalse",
                        EfixedAnnuityProduct: "checkfalse",
                        EinsuranceProduct: "checkfalse",
                        EinvestmentAdvice: "checkfalse",
                        EestatePlanning: "checkfalse",
                        EtaxPlanning: "checkfalse",
                        EotherGoalServicecheck: "checkfalse",
                    });
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EsetItAndLeaveItRetirement: "checktrue",
                    EfixedAnnuityProduct: "checktrue",
                    EinsuranceProduct: "checktrue",
                    EinvestmentAdvice: "checktrue",
                    EestatePlanning: "checktrue",
                    EtaxPlanning: "checktrue",
                    EotherGoalServicecheck: "checktrue",
                });
            }
        }

        if (name == 'insuranceProduct') {
            this.setState({ CinsuranceProduct: !this.state.CinsuranceProduct })
            if (this.state.CinsuranceProduct) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CsetItAndLeaveItRetirement && !this.state.CfixedAnnuityProduct && this.state.CinsuranceProduct && !this.state.CinvestmentAdvice && !this.state.CestatePlanning && !this.state.CtaxPlanning && !this.state.CotherGoalServicecheck) {
                    this.setState({
                        EsetItAndLeaveItRetirement: "checkfalse",
                        EfixedAnnuityProduct: "checkfalse",
                        EinsuranceProduct: "checkfalse",
                        EinvestmentAdvice: "checkfalse",
                        EestatePlanning: "checkfalse",
                        EtaxPlanning: "checkfalse",
                        EotherGoalServicecheck: "checkfalse",
                    });
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EsetItAndLeaveItRetirement: "checktrue",
                    EfixedAnnuityProduct: "checktrue",
                    EinsuranceProduct: "checktrue",
                    EinvestmentAdvice: "checktrue",
                    EestatePlanning: "checktrue",
                    EtaxPlanning: "checktrue",
                    EotherGoalServicecheck: "checktrue",
                });
            }
        }

        if (name == 'investmentAdvice') {
            this.setState({ CinvestmentAdvice: !this.state.CinvestmentAdvice })
            if (this.state.CinvestmentAdvice) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CsetItAndLeaveItRetirement && !this.state.CfixedAnnuityProduct && !this.state.CinsuranceProduct && this.state.CinvestmentAdvice && !this.state.CestatePlanning && !this.state.CtaxPlanning && !this.state.CotherGoalServicecheck) {
                    this.setState({
                        EsetItAndLeaveItRetirement: "checkfalse",
                        EfixedAnnuityProduct: "checkfalse",
                        EinsuranceProduct: "checkfalse",
                        EinvestmentAdvice: "checkfalse",
                        EestatePlanning: "checkfalse",
                        EtaxPlanning: "checkfalse",
                        EotherGoalServicecheck: "checkfalse",
                    });
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EsetItAndLeaveItRetirement: "checktrue",
                    EfixedAnnuityProduct: "checktrue",
                    EinsuranceProduct: "checktrue",
                    EinvestmentAdvice: "checktrue",
                    EestatePlanning: "checktrue",
                    EtaxPlanning: "checktrue",
                    EotherGoalServicecheck: "checktrue",
                });
            }
        }

        if (name == 'estatePlanning') {
            this.setState({ CestatePlanning: !this.state.CestatePlanning })
            if (this.state.CestatePlanning) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CsetItAndLeaveItRetirement && !this.state.CfixedAnnuityProduct && !this.state.CinsuranceProduct && !this.state.CinvestmentAdvice && this.state.CestatePlanning && !this.state.CtaxPlanning && !this.state.CotherGoalServicecheck) {
                    this.setState({
                        EsetItAndLeaveItRetirement: "checkfalse",
                        EfixedAnnuityProduct: "checkfalse",
                        EinsuranceProduct: "checkfalse",
                        EinvestmentAdvice: "checkfalse",
                        EestatePlanning: "checkfalse",
                        EtaxPlanning: "checkfalse",
                        EotherGoalServicecheck: "checkfalse",
                    });
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EsetItAndLeaveItRetirement: "checktrue",
                    EfixedAnnuityProduct: "checktrue",
                    EinsuranceProduct: "checktrue",
                    EinvestmentAdvice: "checktrue",
                    EestatePlanning: "checktrue",
                    EtaxPlanning: "checktrue",
                    EotherGoalServicecheck: "checktrue",
                });
            }
        }

        if (name == 'taxPlanning') {
            this.setState({ CtaxPlanning: !this.state.CtaxPlanning })
            if (this.state.CtaxPlanning) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CsetItAndLeaveItRetirement && !this.state.CfixedAnnuityProduct && !this.state.CinsuranceProduct && !this.state.CinvestmentAdvice && !this.state.CestatePlanning && this.state.CtaxPlanning && !this.state.CotherGoalServicecheck) {
                    this.setState({
                        EsetItAndLeaveItRetirement: "checkfalse",
                        EfixedAnnuityProduct: "checkfalse",
                        EinsuranceProduct: "checkfalse",
                        EinvestmentAdvice: "checkfalse",
                        EestatePlanning: "checkfalse",
                        EtaxPlanning: "checkfalse",
                        EotherGoalServicecheck: "checkfalse",
                    });
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EsetItAndLeaveItRetirement: "checktrue",
                    EfixedAnnuityProduct: "checktrue",
                    EinsuranceProduct: "checktrue",
                    EinvestmentAdvice: "checktrue",
                    EestatePlanning: "checktrue",
                    EtaxPlanning: "checktrue",
                    EotherGoalServicecheck: "checktrue",
                });
            }
        }

        if (name == 'otherGoalServicecheck') {


            if (!this.state.otherGoalService) {
                this.setState({ EotherGoalService: "error_sell form-control" })
            }
            this.setState({ CotherGoalServicecheck: !this.state.CotherGoalServicecheck })
            if (this.state.CotherGoalServicecheck) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, EotherGoalService: "form-control" })
                if (!this.state.CsetItAndLeaveItRetirement && !this.state.CfixedAnnuityProduct && !this.state.CinsuranceProduct && !this.state.CinvestmentAdvice && !this.state.CestatePlanning && !this.state.CtaxPlanning && this.state.CotherGoalServicecheck) {
                    this.setState({
                        EsetItAndLeaveItRetirement: "checkfalse",
                        EfixedAnnuityProduct: "checkfalse",
                        EinsuranceProduct: "checkfalse",
                        EinvestmentAdvice: "checkfalse",
                        EestatePlanning: "checkfalse",
                        EtaxPlanning: "checkfalse",
                        EotherGoalServicecheck: "checkfalse",
                    });
                }

            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EsetItAndLeaveItRetirement: "checktrue",
                    EfixedAnnuityProduct: "checktrue",
                    EinsuranceProduct: "checktrue",
                    EinvestmentAdvice: "checktrue",
                    EestatePlanning: "checktrue",
                    EtaxPlanning: "checktrue",
                    EotherGoalServicecheck: "checktrue",
                });

            }
        }


        if (name == 'homeBox') {
            if (!this.state.homeValue) {
                this.setState({ EhomeValue: "error_sell form-control" })
            }
            this.setState({ ChomeBox: !this.state.ChomeBox })
            if (this.state.ChomeBox) {
                console.log('clicknotvaluehere');
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, EhomeValue: "form-control" })
                if (this.state.CiWeRent) {
                    this.setState({ EiWeRent: 'checktrue' })
                } else {
                    this.setState({ EiWeRent: 'checkfalse', EhomeBox: 'checkfalse' })
                }
            } else {
                console.log('clickvaluehere');
                this.setState({ [name]: value, EiWeRent: 'checktrue', EhomeBox: 'checktrue' }) //here checktrue
            }
        }

        if (name == 'iWeRent') {
            if (!this.state.monthlyRent) {
                this.setState({ EmonthlyRent: "error_sell form-control" })
            }
            this.setState({ CiWeRent: !this.state.CiWeRent })
            if (this.state.CiWeRent) {
                console.log('iWeRentnotvalue');
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, EmonthlyRent: "form-control" })
                console.log('this.state.ChomeBox', this.state.ChomeBox);
                if (this.state.ChomeBox) {
                    this.setState({ EhomeBox: 'checktrue' })
                } else {
                    this.setState({ EhomeBox: 'checkfalse', EiWeRent: 'checkfalse' })
                }
            } else {
                console.log('iWeRentvalue');
                this.setState({ [name]: value, EhomeBox: 'checktrue', EiWeRent: 'checktrue' })
            }
        }

        if (name == 'homeBanking') {
            console.log('homeBanking12345');

            if (!this.state.banking) {
                this.setState({ Ebanking: "error_sell form-control" })
            }
            this.setState({ ChomeBanking: !this.state.ChomeBanking })
            if (this.state.ChomeBanking) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, Ebanking: "form-control" })
                if (this.state.ChomeBanking && !this.state.ChomeBrokerage && !this.state.ChomeRetirementAccount && !this.state.ChomeRothAccount && !this.state.ChomeOther) {
                    this.setState({
                        EhomeBanking: 'checkfalse',
                        EhomeBrokerage: 'checkfalse',
                        EhomeRetirementAccount: 'checkfalse',
                        EhomeRothAccount: 'checkfalse',
                        EhomeOther: 'checkfalse',

                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EhomeBanking: 'checktrue',
                    EhomeBrokerage: 'checktrue',
                    EhomeRetirementAccount: 'checktrue',
                    EhomeRothAccount: 'checktrue',
                    EhomeOther: 'checktrue',
                })
            }
        }

        if (name == 'homeBrokerage') {
            if (!this.state.brokerage) {
                this.setState({ Ebrokerage: "error_sell form-control" })
            }
            this.setState({ ChomeBrokerage: !this.state.ChomeBrokerage })
            if (this.state.ChomeBrokerage) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, Ebrokerage: "form-control" })
                if (!this.state.ChomeBanking && this.state.ChomeBrokerage && !this.state.ChomeRetirementAccount && !this.state.ChomeRothAccount && !this.state.ChomeOther) {
                    this.setState({
                        EhomeBanking: 'checkfalse',
                        EhomeBrokerage: 'checkfalse',
                        EhomeRetirementAccount: 'checkfalse',
                        EhomeRothAccount: 'checkfalse',
                        EhomeOther: 'checkfalse',

                    })
                }

            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EhomeBanking: 'checktrue',
                    EhomeBrokerage: 'checktrue',
                    EhomeRetirementAccount: 'checktrue',
                    EhomeRothAccount: 'checktrue',
                    EhomeOther: 'checktrue',
                })
            }
        }
        if (name == 'homeRetirementAccount') {
            if (!this.state.retirementAccount) {
                this.setState({ EretirementAccount: "error_sell form-control" })
            }
            this.setState({ ChomeRetirementAccount: !this.state.ChomeRetirementAccount })
            if (this.state.ChomeRetirementAccount) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, EretirementAccount: "form-control" })
                if (!this.state.ChomeBanking && !this.state.ChomeBrokerage && this.state.ChomeRetirementAccount && !this.state.ChomeRothAccount && !this.state.ChomeOther) {
                    this.setState({
                        EhomeBanking: 'checkfalse',
                        EhomeBrokerage: 'checkfalse',
                        EhomeRetirementAccount: 'checkfalse',
                        EhomeRothAccount: 'checkfalse',
                        EhomeOther: 'checkfalse',

                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EhomeBanking: 'checktrue',
                    EhomeBrokerage: 'checktrue',
                    EhomeRetirementAccount: 'checktrue',
                    EhomeRothAccount: 'checktrue',
                    EhomeOther: 'checktrue',
                })
            }
        }
        if (name == 'homeRothAccount') {
            if (!this.state.rothAccount) {
                this.setState({ ErothAccount: "error_sell form-control" })
            }
            this.setState({ ChomeRothAccount: !this.state.ChomeRothAccount })
            if (this.state.ChomeRothAccount) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, ErothAccount: "form-control" })
                if (!this.state.ChomeBanking && !this.state.ChomeBrokerage && !this.state.ChomeRetirementAccount && this.state.ChomeRothAccount && !this.state.ChomeOther) {
                    this.setState({
                        EhomeBanking: 'checkfalse',
                        EhomeBrokerage: 'checkfalse',
                        EhomeRetirementAccount: 'checkfalse',
                        EhomeRothAccount: 'checkfalse',
                        EhomeOther: 'checkfalse',

                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EhomeBanking: 'checktrue',
                    EhomeBrokerage: 'checktrue',
                    EhomeRetirementAccount: 'checktrue',
                    EhomeRothAccount: 'checktrue',
                    EhomeOther: 'checktrue',
                })
            }
        }
        if (name == 'homeOther') {
            if (!this.state.otherTypes) {
                this.setState({ EotherTypes: "error_sell form-control" })
            }
            if (!this.state.otherApproxValue) {
                this.setState({ EotherApproxValue: "error_sell form-control" })
            }
            this.setState({ ChomeOther: !this.state.ChomeOther })
            if (this.state.ChomeOther) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, EotherTypes: "form-control", EotherApproxValue: "form-control" })

                if (!this.state.ChomeBanking && !this.state.ChomeBrokerage && !this.state.ChomeRetirementAccount && !this.state.ChomeRothAccount && this.state.ChomeOther) {
                    this.setState({
                        EhomeBanking: 'checkfalse',
                        EhomeBrokerage: 'checkfalse',
                        EhomeRetirementAccount: 'checkfalse',
                        EhomeRothAccount: 'checkfalse',
                        EhomeOther: 'checkfalse',

                    })
                }

            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EhomeBanking: 'checktrue',
                    EhomeBrokerage: 'checktrue',
                    EhomeRetirementAccount: 'checktrue',
                    EhomeRothAccount: 'checktrue',
                    EhomeOther: 'checktrue',
                })
            }
        }
        if (name == 'homeSS') {
            if (!this.state.socailSecurity) {
                this.setState({ EsocailSecurity: "error_sell form-control" })
            }
            this.setState({ ChomeSS: !this.state.ChomeSS })
            if (this.state.ChomeSS) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, EsocailSecurity: "form-control" })
            } else {
                this.setState({ [name]: value, })
            }
        }
        if (name == 'homePension') {
            if (!this.state.pension) {
                this.setState({ Epension: "error_sell form-control" })
            }
            this.setState({ ChomePension: !this.state.ChomePension })
            if (this.state.ChomePension) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, Epension: "form-control" })
            } else {
                this.setState({ [name]: value, })
            }
        }


        if (name == 'noInsurance') {
            this.setState({ CnoInsurance: !this.state.CnoInsurance })
            if (this.state.CnoInsurance) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })

                if (!this.state.Cmedicare && !this.state.CsupplementalHealth && !this.state.Clongtermcare && this.state.CnoInsurance && !this.state.ClifeInsurance && !this.state.Cinotherbox) {
                    this.setState({
                        EnoInsurance: "checkfalse",
                        Emedicare: "checkfalse",
                        EsupplementalHealth: "checkfalse",
                        Elongtermcare: "checkfalse",
                        ElifeInsurance: "checkfalse",
                        Einotherbox: "checkfalse"
                    });
                }

            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EnoInsurance: "checktrue",
                    Emedicare: "checktrue",
                    EsupplementalHealth: "checktrue",
                    Elongtermcare: "checktrue",
                    ElifeInsurance: "checktrue",
                    Einotherbox: "checktrue"
                })
            }
        }

        if (name == 'medicare') {
            this.setState({ Cmedicare: !this.state.Cmedicare })
            if (this.state.Cmedicare) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (this.state.Cmedicare && !this.state.CsupplementalHealth && !this.state.Clongtermcare && !this.state.CnoInsurance && !this.state.ClifeInsurance && !this.state.Cinotherbox) {
                    this.setState({
                        EnoInsurance: "checkfalse",
                        Emedicare: "checkfalse",
                        EsupplementalHealth: "checkfalse",
                        Elongtermcare: "checkfalse",
                        ElifeInsurance: "checkfalse",
                        Einotherbox: "checkfalse"

                    });
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EnoInsurance: "checktrue",
                    Emedicare: "checktrue",
                    EsupplementalHealth: "checktrue",
                    Elongtermcare: "checktrue",
                    ElifeInsurance: "checktrue",
                    Einotherbox: "checktrue"
                })
            }
        }

        if (name == 'supplementalHealth') {
            this.setState({ CsupplementalHealth: !this.state.CsupplementalHealth })
            if (this.state.CsupplementalHealth) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.Cmedicare && this.state.CsupplementalHealth && !this.state.Clongtermcare && !this.state.CnoInsurance && !this.state.ClifeInsurance && !this.state.Cinotherbox) {
                    this.setState({
                        EnoInsurance: "checkfalse",
                        Emedicare: "checkfalse",
                        EsupplementalHealth: "checkfalse",
                        Elongtermcare: "checkfalse",
                        ElifeInsurance: "checkfalse",
                        Einotherbox: "checkfalse"
                    });
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EnoInsurance: "checktrue",
                    Emedicare: "checktrue",
                    EsupplementalHealth: "checktrue",
                    Elongtermcare: "checktrue",
                    ElifeInsurance: "checktrue",
                    Einotherbox: "checktrue"
                })
            }
        }

        if (name == 'longtermcare') {
            this.setState({ Clongtermcare: !this.state.Clongtermcare })
            if (this.state.Clongtermcare) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.Cmedicare && !this.state.CsupplementalHealth && this.state.Clongtermcare && !this.state.CnoInsurance && !this.state.ClifeInsurance && !this.state.Cinotherbox) {
                    this.setState({
                        EnoInsurance: "checkfalse",
                        Emedicare: "checkfalse",
                        EsupplementalHealth: "checkfalse",
                        Elongtermcare: "checkfalse",
                        ElifeInsurance: "checkfalse",
                        Einotherbox: "checkfalse"
                    });
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EnoInsurance: "checktrue",
                    Emedicare: "checktrue",
                    EsupplementalHealth: "checktrue",
                    Elongtermcare: "checktrue",
                    ElifeInsurance: "checktrue",
                    Einotherbox: "checktrue"
                })
            }
        }


        if (name == 'lifeInsurance') {
            if (!this.state.lifeInType) {
                this.setState({ ElifeInType: "error_sell form-control" })
            }
            if (!this.state.lifeamount) {
                this.setState({ Elifeamount: "error_sell form-control" })
            }
            this.setState({ ClifeInsurance: !this.state.ClifeInsurance })
            if (this.state.ClifeInsurance) {
                let t = '';
                if (value) { t = ''; }

                if (!this.state.Cmedicare && !this.state.CsupplementalHealth && !this.state.Clongtermcare && !this.state.CnoInsurance && this.state.ClifeInsurance && !this.state.Cinotherbox) {
                    this.setState({
                        EnoInsurance: "checkfalse",
                        Emedicare: "checkfalse",
                        EsupplementalHealth: "checkfalse",
                        Elongtermcare: "checkfalse",
                        ElifeInsurance: "checkfalse",
                        Einotherbox: "checkfalse"
                    });
                }

                this.setState({ [name]: t, ElifeInType: "form-control", Elifeamount: "form-control" })
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EnoInsurance: "checktrue",
                    Emedicare: "checktrue",
                    EsupplementalHealth: "checktrue",
                    Elongtermcare: "checktrue",
                    ElifeInsurance: "checktrue",
                    Einotherbox: "checktrue"
                })
            }
        }


        // if (name == 'inotherbox') {
        //     if (!this.state.inother) {
        //         this.setState({ Einother: "error_sell form-control" })
        //     }
        //     this.setState({ Cinotherbox: !this.state.Cinotherbox })
        //     if (this.state.Cinotherbox) {
        //         let t = '';
        //         if (value) { t = ''; }
        //         this.setState({ [name]: t, Einother: "form-control" })
        //     } else {
        //         this.setState({ [name]: value, })
        //     }
        // }

        if (name == 'inotherbox') {
            if (!this.state.inother) {
                this.setState({ Einother: "error_sell form-control" })
            }
            this.setState({ Cinotherbox: !this.state.Cinotherbox })
            if (this.state.Cinotherbox) {
                let t = '';
                if (value) { t = ''; }

                if (!this.state.Cmedicare && !this.state.CsupplementalHealth && !this.state.Clongtermcare && !this.state.CnoInsurance && this.state.ClifeInsurance && this.state.Cinotherbox) {
                    this.setState({
                        EnoInsurance: "checkfalse",
                        Emedicare: "checkfalse",
                        EsupplementalHealth: "checkfalse",
                        Elongtermcare: "checkfalse",
                        ElifeInsurance: "checkfalse",
                        Einotherbox: "checkfalse"
                    });
                }

                this.setState({ [name]: t, Einother: "form-control", Elifeamount: "form-control" })
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EnoInsurance: "checktrue",
                    Emedicare: "checktrue",
                    EsupplementalHealth: "checktrue",
                    Elongtermcare: "checktrue",
                    ElifeInsurance: "checktrue",
                    Einotherbox: "checktrue"
                })
            }
        }


        if (name == 'analyticalInExperience') {
            this.setState({ CanalyticalInExperience: !this.state.CanalyticalInExperience })
            if (this.state.CanalyticalInExperience) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
            } else {
                this.setState({ [name]: value, })
            }
        }

        if (name == 'capitalPreservation') {
            this.setState({ CcapitalPreservation: !this.state.CcapitalPreservation })
            if (this.state.CcapitalPreservation) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (this.state.CcapitalPreservation && !this.state.CinvestIncome && !this.state.CinvestGrowth && !this.state.CinvestGrowthIncome && !this.state.CinvestAggressiveGrowth) {
                    this.setState({
                        EcapitalPreservation: "checkfalse",
                        EinvestIncome: "checkfalse",
                        EinvestGrowth: "checkfalse",
                        EinvestGrowthIncome: "checkfalse",
                        EinvestAggressiveGrowth: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EcapitalPreservation: "checktrue",
                    EinvestIncome: "checktrue",
                    EinvestGrowth: "checktrue",
                    EinvestGrowthIncome: "checktrue",
                    EinvestAggressiveGrowth: "checktrue"
                })
            }
        }

        if (name == 'investIncome') {
            this.setState({ CinvestIncome: !this.state.CinvestIncome })
            if (this.state.CinvestIncome) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CcapitalPreservation && this.state.CinvestIncome && !this.state.CinvestGrowth && !this.state.CinvestGrowthIncome && !this.state.CinvestAggressiveGrowth) {
                    this.setState({
                        EcapitalPreservation: "checkfalse",
                        EinvestIncome: "checkfalse",
                        EinvestGrowth: "checkfalse",
                        EinvestGrowthIncome: "checkfalse",
                        EinvestAggressiveGrowth: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EcapitalPreservation: "checktrue",
                    EinvestIncome: "checktrue",
                    EinvestGrowth: "checktrue",
                    EinvestGrowthIncome: "checktrue",
                    EinvestAggressiveGrowth: "checktrue"
                })
            }
        }
        if (name == 'investGrowth') {
            this.setState({ CinvestGrowth: !this.state.CinvestGrowth })
            if (this.state.CinvestGrowth) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CcapitalPreservation && !this.state.CinvestIncome && this.state.CinvestGrowth && !this.state.CinvestGrowthIncome && !this.state.CinvestAggressiveGrowth) {
                    this.setState({
                        EcapitalPreservation: "checkfalse",
                        EinvestIncome: "checkfalse",
                        EinvestGrowth: "checkfalse",
                        EinvestGrowthIncome: "checkfalse",
                        EinvestAggressiveGrowth: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EcapitalPreservation: "checktrue",
                    EinvestIncome: "checktrue",
                    EinvestGrowth: "checktrue",
                    EinvestGrowthIncome: "checktrue",
                    EinvestAggressiveGrowth: "checktrue"
                })
            }
        }
        if (name == 'investGrowthIncome') {
            this.setState({ CinvestGrowthIncome: !this.state.CinvestGrowthIncome })
            if (this.state.CinvestGrowthIncome) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CcapitalPreservation && !this.state.CinvestIncome && !this.state.CinvestGrowth && this.state.CinvestGrowthIncome && !this.state.CinvestAggressiveGrowth) {
                    this.setState({
                        EcapitalPreservation: "checkfalse",
                        EinvestIncome: "checkfalse",
                        EinvestGrowth: "checkfalse",
                        EinvestGrowthIncome: "checkfalse",
                        EinvestAggressiveGrowth: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EcapitalPreservation: "checktrue",
                    EinvestIncome: "checktrue",
                    EinvestGrowth: "checktrue",
                    EinvestGrowthIncome: "checktrue",
                    EinvestAggressiveGrowth: "checktrue"
                })
            }
        }
        if (name == 'investAggressiveGrowth') {
            this.setState({ CinvestAggressiveGrowth: !this.state.CinvestAggressiveGrowth })
            if (this.state.CinvestAggressiveGrowth) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CcapitalPreservation && !this.state.CinvestIncome && !this.state.CinvestGrowth && !this.state.CinvestGrowthIncome && this.state.CinvestAggressiveGrowth) {
                    this.setState({
                        EcapitalPreservation: "checkfalse",
                        EinvestIncome: "checkfalse",
                        EinvestGrowth: "checkfalse",
                        EinvestGrowthIncome: "checkfalse",
                        EinvestAggressiveGrowth: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EcapitalPreservation: "checktrue",
                    EinvestIncome: "checktrue",
                    EinvestGrowth: "checktrue",
                    EinvestGrowthIncome: "checktrue",
                    EinvestAggressiveGrowth: "checktrue"
                })
            }
        }


        if (name == 'riskAggressive') {
            this.setState({ CriskAggressive: !this.state.CriskAggressive })
            if (this.state.CriskAggressive) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })

                if (this.state.CriskAggressive && !this.state.CriskModerate && !this.state.CriskConservative) {
                    this.setState({
                        EriskAggressive: "checkfalse",
                        EriskModerate: "checkfalse",
                        EriskConservative: "checkfalse"
                    })
                }

            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EriskAggressive: "checktrue",
                    EriskModerate: "checktrue",
                    EriskConservative: "checktrue"
                })
            }
        }
        if (name == 'riskModerate') {
            this.setState({ CriskModerate: !this.state.CriskModerate })
            if (this.state.CriskModerate) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CriskAggressive && this.state.CriskModerate && !this.state.CriskConservative) {
                    this.setState({
                        EriskAggressive: "checkfalse",

                        EriskModerate: "checkfalse",
                        EriskConservative: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EriskAggressive: "checktrue",
                    EriskModerate: "checktrue",
                    EriskConservative: "checktrue"
                })
            }
        }
        if (name == 'riskConservative') {
            this.setState({ CriskConservative: !this.state.CriskConservative })
            if (this.state.CriskConservative) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.CriskAggressive && !this.state.CriskModerate && this.state.CriskConservative) {
                    this.setState({
                        EriskAggressive: "checkfalse",
                        EriskModerate: "checkfalse",
                        EriskConservative: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    EriskAggressive: "checktrue",
                    EriskModerate: "checktrue",
                    EriskConservative: "checktrue"
                })
            }
        }
        if (name == 'portfolio1') {
            this.setState({ Cportfolio1: !this.state.Cportfolio1 })
            if (this.state.Cportfolio1) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (this.state.Cportfolio1 && !this.state.Cportfolio2 && !this.state.Cportfolio3 && !this.state.Cportfolio4 && !this.state.Cportfolio5) {
                    this.setState({
                        Eportfolio1: "checkfalse",
                        Eportfolio2: "checkfalse",
                        Eportfolio3: "checkfalse",
                        Eportfolio4: "checkfalse",
                        Eportfolio5: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    Eportfolio1: "checktrue",
                    Eportfolio2: "checktrue",
                    Eportfolio3: "checktrue",
                    Eportfolio4: "checktrue",
                    Eportfolio5: "checktrue"
                })
            }
        }
        if (name == 'portfolio2') {
            this.setState({ Cportfolio2: !this.state.Cportfolio2 })
            if (this.state.Cportfolio2) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.Cportfolio1 && this.state.Cportfolio2 && !this.state.Cportfolio3 && !this.state.Cportfolio4 && !this.state.Cportfolio5) {
                    this.setState({
                        Eportfolio1: "checkfalse",
                        Eportfolio2: "checkfalse",
                        Eportfolio3: "checkfalse",
                        Eportfolio4: "checkfalse",
                        Eportfolio5: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    Eportfolio1: "checktrue",
                    Eportfolio2: "checktrue",
                    Eportfolio3: "checktrue",
                    Eportfolio4: "checktrue",
                    Eportfolio5: "checktrue"
                })
            }
        }
        if (name == 'portfolio3') {
            this.setState({ Cportfolio3: !this.state.Cportfolio3 })
            if (this.state.Cportfolio3) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.Cportfolio1 && !this.state.Cportfolio2 && this.state.Cportfolio3 && !this.state.Cportfolio4 && !this.state.Cportfolio5) {
                    this.setState({
                        Eportfolio1: "checkfalse",
                        Eportfolio2: "checkfalse",
                        Eportfolio3: "checkfalse",
                        Eportfolio4: "checkfalse",
                        Eportfolio5: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    Eportfolio1: "checktrue",
                    Eportfolio2: "checktrue",
                    Eportfolio3: "checktrue",
                    Eportfolio4: "checktrue",
                    Eportfolio5: "checktrue"
                })
            }
        }
        if (name == 'portfolio4') {
            this.setState({ Cportfolio4: !this.state.Cportfolio4 })
            if (this.state.Cportfolio4) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.Cportfolio1 && !this.state.Cportfolio2 && !this.state.Cportfolio3 && this.state.Cportfolio4 && !this.state.Cportfolio5) {
                    this.setState({
                        Eportfolio1: "checkfalse",
                        Eportfolio2: "checkfalse",
                        Eportfolio3: "checkfalse",
                        Eportfolio4: "checkfalse",
                        Eportfolio5: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    Eportfolio1: "checktrue",
                    Eportfolio2: "checktrue",
                    Eportfolio3: "checktrue",
                    Eportfolio4: "checktrue",
                    Eportfolio5: "checktrue"
                })
            }
        }
        if (name == 'portfolio5') {
            this.setState({ Cportfolio5: !this.state.Cportfolio5 })
            if (this.state.Cportfolio5) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
                if (!this.state.Cportfolio1 && !this.state.Cportfolio2 && !this.state.Cportfolio3 && !this.state.Cportfolio4 && this.state.Cportfolio5) {
                    this.setState({
                        Eportfolio1: "checkfalse",
                        Eportfolio2: "checkfalse",
                        Eportfolio3: "checkfalse",
                        Eportfolio4: "checkfalse",
                        Eportfolio5: "checkfalse"
                    })
                }
            } else {
                this.setState({ [name]: value, })
                this.setState({
                    Eportfolio1: "checktrue",
                    Eportfolio2: "checktrue",
                    Eportfolio3: "checktrue",
                    Eportfolio4: "checktrue",
                    Eportfolio5: "checktrue"
                })
            }
        }



        if (name == 'aaii') {
            this.setState({ Caaii: !this.state.Caaii })
            if (this.state.Caaii) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
            } else {
                this.setState({ [name]: value, })
            }
        }

        if (name == 'advisorPerspectives') {
            this.setState({ CadvisorPerspectives: !this.state.CadvisorPerspectives })
            if (this.state.CadvisorPerspectives) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
            } else {
                this.setState({ [name]: value, })
            }
        }

        if (name == 'alphaArchiect') {
            this.setState({ CalphaArchiect: !this.state.CalphaArchiect })
            if (this.state.CalphaArchiect) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, })
            } else {
                this.setState({ [name]: value, })
            }
        }

        if (name == 'referral') {
            if (!this.state.referralContent) {
                this.setState({ EreferralContent: "error_sell form-control" })
            }
            this.setState({ Creferral: !this.state.Creferral })
            if (this.state.Creferral) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, EreferralContent: "form-control" })
            } else {
                this.setState({ [name]: value, })
            }
        }
        if (name == 'otherOthers') {
            if (!this.state.otherOthersContent) {
                this.setState({ EotherOthersContent: "error_sell form-control" })
            }
            this.setState({ CotherOthers: !this.state.CotherOthers })
            if (this.state.CotherOthers) {
                let t = '';
                if (value) { t = ''; }
                this.setState({ [name]: t, EotherOthersContent: "form-control" })
            } else {
                this.setState({ [name]: value, })
            }
        }



        console.log('name:', name + '==' + value)
        if (name == 'phone') {
            var numbers = value.replace(/\D/g, ''),
                char = { 0: '(', 3: ') ', 6: ' - ' };
            var tvalue = '';
            for (var i = 0; i < numbers.length; i++) {
                tvalue += (char[i] || '') + numbers[i];
            }
            this.setState({
                [name]: tvalue
            })
        }

    }

    handleChange1 = () => {
        this.setState({
            name: ''
        })
    }

    handleClick = (queId) => {
        console.log('xxxxxxxx', queId);
        this.setState({
            showModal: true
        })
    }


    handleSubmit = (event) => {
        console.log('event.currentTarget.dataset.id:', event.currentTarget.dataset.id)
        event.preventDefault()
        if ((event.currentTarget.dataset.id == '1') || (event.currentTarget.dataset.id == '000') || (this.state.Errorindicator.length === 0)) {
            var elmnt = document.getElementById("profileDashboard");
            elmnt.scrollIntoView({ behavior: "smooth" });
            const questionInfoVo = {
                'name': this.state.name,
                'address': this.state.address,
                'phone': this.state.phone,
                'reasonGoalConsultation': this.state.reasonGoalConsultation,
                //'reasonSIALI':this.state.reasonSIALI,
                //'email':this.state.email,
                'age': this.state.age,
                'married': this.state.married,
                'Kids': this.state.Kids,
                'grandkid': this.state.grandkid,
                'pets': this.state.pets,
                'personalOtherDetails': this.state.personalOtherDetails,
                'homeValue': this.state.homeValue,
                'Mortgage': this.state.Mortgage,
                'approxEquity': this.state.approxEquity,
                'homeBox': this.state.homeBox,
                'iWeRent': this.state.iWeRent,
                'monthlyRent': this.state.monthlyRent,
                'homeBanking': this.state.homeBanking,
                'homeBrokerage': this.state.homeBrokerage,
                'homeRetirementAccount': this.state.homeRetirementAccount,
                'homeRothAccount': this.state.homeRothAccount,
                'homeOther': this.state.homeOther,
                'homeSS': this.state.homeSS,
                'homePension': this.state.homePension,
                'banking': this.state.banking,
                'brokerage': this.state.brokerage,
                'retirementAccount': this.state.retirementAccount,
                'rothAccount': this.state.rothAccount,
                'otherTypes': this.state.otherTypes,
                'otherApproxValue': this.state.otherApproxValue,
                'dbAssetsApproxTotal': dbAssetsApproxTotal,
                'socailSecurity': this.state.socailSecurity,
                'pension': this.state.pension,
                'others': this.state.others,
                'essential': this.state.essential,
                'discretionary': this.state.discretionary,
                'oneOffExpenses': this.state.oneOffExpenses,
                'noInsurance': this.state.noInsurance,
                'medicare': this.state.medicare,
                'supplementalHealth': this.state.supplementalHealth,
                'longtermcare': this.state.longtermcare,
                'lifeInsurance': this.state.lifeInsurance,
                'lifeInType': this.state.lifeInType,
                'lifeamount': this.state.lifeamount,
                'inother': this.state.inother,
                'inotherbox': this.state.inotherbox,
                'analyticalInExperience': this.state.analyticalInExperience,
                'capitalPreservation': this.state.capitalPreservation,
                'investIncome': this.state.investIncome,
                'investGrowth': this.state.investGrowth,
                'investGrowthIncome': this.state.investGrowthIncome,
                'investAggressiveGrowth': this.state.investAggressiveGrowth,
                'currentAllocationStock': this.state.currentAllocationStock,
                'experience_1_10': this.state.experience_1_10,
                'expectations': this.state.expectations,
                'experience_gb': this.state.experience_gb,
                'riskAggressive': this.state.riskAggressive,
                'riskModerate': this.state.riskModerate,
                'riskConservative': this.state.riskConservative,
                'portfolioDrawdown': this.state.portfolioDrawdown,
                'riskPreservation': this.state.riskPreservation,
                'riskIncome': this.state.riskIncome,
                'riskGrowth': this.state.riskGrowth,
                'lastMarketDownturn': this.state.lastMarketDownturn,
                'portfolio1': this.state.portfolio1,
                'portfolio2': this.state.portfolio2,
                'portfolio3': this.state.portfolio3,
                'portfolio4': this.state.portfolio4,
                'portfolio5': this.state.portfolio5,
                'aaii': this.state.aaii,
                'advisorPerspectives': this.state.advisorPerspectives,
                'alphaArchiect': this.state.alphaArchiect,
                'referral': this.state.referral,
                'referralContent': this.state.referralContent,
                'otherOthers': this.state.otherOthers,
                'otherOthersContent': this.state.otherOthersContent,
                'whatAttracted': this.state.whatAttracted,
                'improveQuestionnaire': this.state.improveQuestionnaire,

                'setItAndLeaveItRetirement': this.state.setItAndLeaveItRetirement,
                'fixedAnnuityProduct': this.state.fixedAnnuityProduct,
                'insuranceProduct': this.state.insuranceProduct,
                'investmentAdvice': this.state.investmentAdvice,
                'estatePlanning': this.state.estatePlanning,
                'taxPlanning': this.state.taxPlanning,
                'otherGoalServicecheck': this.state.otherGoalServicecheck,
                'otherGoalService': this.state.otherGoalService,
                'goalComment': this.state.goalComment,
                'goalQuestion': this.state.goalQuestion,

                'datetime': new Date(),
                'id': this.state.fields._id,
                'loginuser': this.state.fields.username,
                'data_id': event.currentTarget.dataset.id
            }

            console.log('questionInfoVoquestionInfoVo', questionInfoVo);


            var queshowAlert = false;

            if (event.currentTarget.dataset.id == 1) {
                queshowAlert = false;
                this.setState({
                    currentStep: 1,
                    selectedIndex: 0
                })
            } else {
                queshowAlert = true;
            }

            console.log('Details:', questionInfoVo);
            API.submitQuestionService(questionInfoVo)
                .then((result) => {
                    this.getQuestionLists();
                    if (result.data.success) {
                        this.setState({
                            queshowAlert: queshowAlert,
                            color: 'green',
                            message: result.data.message,
                            pdfmsgshow: false
                        });

                    } else {
                        this.setState({
                            queshowAlert: queshowAlert,
                            color: '#b31313d6',
                            message: result.data.message
                        });

                    }
                }).catch(err => {
                    console.log('xxxxxxxxxxxx......xxx:', err)
                })
        } else {
            this.setState({
                pdfmsgshow: true
            });
        }

    }

    get previousButton() {
        let currentStep = this.state.currentStep
        if (currentStep !== 1) {
            return (
                <div className="buttonGroups">
                    {/* <button hidden className="btn btn-primary previousbtn" type="button" onClick={this._start}><i class="fa fa-angle-left" aria-hidden="true"></i>&nbsp;Start</button> */}

                    <button className="btn btn-primary previousbtn" type="button" onClick={this._prev}><i class="fa fa-angle-left" aria-hidden="true"></i>&nbsp;BACK</button>
                </div>
            )
        }
        return null
    }

    get nextButton() {
        let currentStep = this.state.currentStep
        if (currentStep <= 11) {

            return (
                <div className="buttonGroups">
                    <button className={`btn btn-primary nextbtn float-right contQuebtn classnext${this.state.currentStep}`} type="button" onClick={this._next}>START QUESTIONNAIRE</button>
                    <button className={`btn btn-primary nextbtn  classnext${this.state.currentStep}`} type="button" onClick={this._next}>NEXT <i class="fa fa-angle-right" aria-hidden="true"></i></button>

                    <button onClick={this.handleSubmit} data-id="1" className={`btn btn-success saveexit class${this.state.currentStep}`}>SAVE & EXIT </button>
                    <button hidden={this.state.currentStep == 11 ? false : true} onClick={this.handleSubmit} data-id="2" className={`btn btn-success submitexit class${this.state.currentStep}`}>SUBMIT</button>
                </div>
            )
        }
        return null
    }


    getQuestionLists() {
        const Userdata = {
            'userId': this.state.fields._id
        }

        API.getQuestionService(Userdata)
            .then(res => {
                console.log('Questionfrontres:', res.data.data[0]);

                if (res.data.data[0].phone) {
                    var numbers = res.data.data[0].phone.replace(/\D/g, ''),
                        char = { 0: '(', 3: ') ', 6: ' - ' };
                    var tvalue = '';
                    for (var i = 0; i < numbers.length; i++) {
                        tvalue += (char[i] || '') + numbers[i];
                    }
                }



                this.setState({
                    Questionfields: res.data.data[0],
                    name: res.data.data[0].name,
                    address: res.data.data[0].address,
                    phone: tvalue,
                    reasonGoalConsultation: res.data.data[0].reasonGoalConsultation,
                    //reasonSIALI:res.data.data[0].reasonSIALI,
                    //email:res.data.data[0].email,
                    age: res.data.data[0].age,
                    married: res.data.data[0].married,
                    Kids: res.data.data[0].Kids,
                    grandkid: res.data.data[0].grandkid,
                    pets: res.data.data[0].pets,
                    personalOtherDetails: res.data.data[0].personalOtherDetails,
                    homeValue: res.data.data[0].homeValue,
                    Mortgage: res.data.data[0].Mortgage,
                    approxEquity: res.data.data[0].approxEquity,
                    homeBox: res.data.data[0].homeBox,
                    iWeRent: res.data.data[0].iWeRent,
                    monthlyRent: res.data.data[0].monthlyRent,
                    homeBanking: res.data.data[0].homeBanking,
                    homeBrokerage: res.data.data[0].homeBrokerage,
                    homeRetirementAccount: res.data.data[0].homeRetirementAccount,
                    homeRothAccount: res.data.data[0].homeRothAccount,
                    homeOther: res.data.data[0].homeOther,
                    homeSS: res.data.data[0].homeSS,
                    homePension: res.data.data[0].homePension,
                    banking: res.data.data[0].banking,
                    brokerage: res.data.data[0].brokerage,
                    retirementAccount: res.data.data[0].retirementAccount,
                    rothAccount: res.data.data[0].rothAccount,
                    otherTypes: res.data.data[0].otherTypes,
                    otherApproxValue: res.data.data[0].otherApproxValue,
                    dbAssetsApproxTotal: res.data.data[0].dbAssetsApproxTotal,
                    socailSecurity: res.data.data[0].socailSecurity,
                    pension: res.data.data[0].pension,
                    others: res.data.data[0].others,
                    essential: res.data.data[0].essential,
                    discretionary: res.data.data[0].discretionary,
                    oneOffExpenses: res.data.data[0].oneOffExpenses,
                    noInsurance: res.data.data[0].noInsurance,
                    medicare: res.data.data[0].medicare,
                    supplementalHealth: res.data.data[0].supplementalHealth,
                    longtermcare: res.data.data[0].longtermcare,
                    lifeInsurance: res.data.data[0].lifeInsurance,
                    lifeInType: res.data.data[0].lifeInType,
                    lifeamount: res.data.data[0].lifeamount,
                    inother: res.data.data[0].inother,
                    inotherbox: res.data.data[0].inotherbox,
                    analyticalInExperience: res.data.data[0].analyticalInExperience,
                    capitalPreservation: res.data.data[0].capitalPreservation,
                    investIncome: res.data.data[0].investIncome,
                    investGrowth: res.data.data[0].investGrowth,
                    investGrowthIncome: res.data.data[0].investGrowthIncome,
                    investAggressiveGrowth: res.data.data[0].investAggressiveGrowth,
                    currentAllocationStock: res.data.data[0].currentAllocationStock,
                    experience_1_10: res.data.data[0].experience_1_10,
                    expectations: res.data.data[0].expectations,
                    experience_gb: res.data.data[0].experience_gb,
                    riskAggressive: res.data.data[0].riskAggressive,
                    riskModerate: res.data.data[0].riskModerate,
                    riskConservative: res.data.data[0].riskConservative,
                    portfolioDrawdown: res.data.data[0].portfolioDrawdown,
                    riskPreservation: res.data.data[0].riskPreservation,
                    riskIncome: res.data.data[0].riskIncome,
                    riskGrowth: res.data.data[0].riskGrowth,
                    lastMarketDownturn: res.data.data[0].lastMarketDownturn,
                    portfolio1: res.data.data[0].portfolio1,
                    portfolio2: res.data.data[0].portfolio2,
                    portfolio3: res.data.data[0].portfolio3,
                    portfolio4: res.data.data[0].portfolio4,
                    portfolio5: res.data.data[0].portfolio5,
                    aaii: res.data.data[0].aaii,
                    advisorPerspectives: res.data.data[0].advisorPerspectives,
                    alphaArchiect: res.data.data[0].alphaArchiect,
                    referral: res.data.data[0].referral,
                    referralContent: res.data.data[0].referralContent,
                    otherOthers: res.data.data[0].otherOthers,
                    otherOthersContent: res.data.data[0].otherOthersContent,
                    whatAttracted: res.data.data[0].whatAttracted,
                    improveQuestionnaire: res.data.data[0].improveQuestionnaire,
                    setItAndLeaveItRetirement: res.data.data[0].setItAndLeaveItRetirement,
                    fixedAnnuityProduct: res.data.data[0].fixedAnnuityProduct,
                    insuranceProduct: res.data.data[0].insuranceProduct,
                    investmentAdvice: res.data.data[0].investmentAdvice,
                    estatePlanning: res.data.data[0].estatePlanning,
                    taxPlanning: res.data.data[0].taxPlanning,
                    otherGoalServicecheck: res.data.data[0].otherGoalServicecheck,
                    otherGoalService: res.data.data[0].otherGoalService,
                    goalComment: res.data.data[0].goalComment,
                    goalQuestion: res.data.data[0].goalQuestion
                });


                if (res.data.data[0].setItAndLeaveItRetirement) {
                    this.setState({ CsetItAndLeaveItRetirement: true });
                }
                if (res.data.data[0].fixedAnnuityProduct) {
                    this.setState({ CfixedAnnuityProduct: true });
                }
                if (res.data.data[0].insuranceProduct) {
                    this.setState({ CinsuranceProduct: true });
                }
                if (res.data.data[0].investmentAdvice) {
                    this.setState({ CinvestmentAdvice: true });
                }
                if (res.data.data[0].estatePlanning) {
                    this.setState({ CestatePlanning: true });
                }
                if (res.data.data[0].taxPlanning) {
                    this.setState({ CtaxPlanning: true });
                }
                if (res.data.data[0].otherGoalServicecheck) {
                    this.setState({ CotherGoalServicecheck: true });
                }


                if (res.data.data[0].homeBox) {
                    this.setState({ ChomeBox: true });
                }
                if (res.data.data[0].iWeRent) {
                    this.setState({ CiWeRent: true });
                }
                if (res.data.data[0].homeBanking) {
                    this.setState({ ChomeBanking: true });
                }
                if (res.data.data[0].homeBrokerage) {
                    this.setState({ ChomeBrokerage: true });
                }
                if (res.data.data[0].homeRetirementAccount) {
                    this.setState({ ChomeRetirementAccount: true });
                }
                if (res.data.data[0].homeRothAccount) {
                    this.setState({ ChomeRothAccount: true });
                }
                if (res.data.data[0].homeOther) {
                    this.setState({ ChomeOther: true });
                }
                if (res.data.data[0].homeSS) {
                    this.setState({ ChomeSS: true });
                }
                if (res.data.data[0].homePension) {
                    this.setState({ ChomePension: true });
                }

                if (res.data.data[0].noInsurance) {
                    this.setState({ CnoInsurance: true });
                }
                if (res.data.data[0].medicare) {
                    this.setState({ Cmedicare: true });
                }
                if (res.data.data[0].supplementalHealth) {
                    this.setState({ CsupplementalHealth: true });
                }
                if (res.data.data[0].longtermcare) {
                    this.setState({ Clongtermcare: true });
                }
                if (res.data.data[0].lifeInsurance) {
                    this.setState({ ClifeInsurance: true });
                }
                if (res.data.data[0].inotherbox) {
                    this.setState({ Cinotherbox: true });
                }

                if (res.data.data[0].analyticalInExperience) {
                    this.setState({ CanalyticalInExperience: true });
                }

                if (res.data.data[0].capitalPreservation) {
                    this.setState({ CcapitalPreservation: true });
                }
                if (res.data.data[0].investIncome) {
                    this.setState({ CinvestIncome: true });
                }
                if (res.data.data[0].investGrowth) {
                    this.setState({ CinvestGrowth: true });
                }
                if (res.data.data[0].investGrowthIncome) {
                    this.setState({ CinvestGrowthIncome: true });
                }
                if (res.data.data[0].investAggressiveGrowth) {
                    this.setState({ CinvestAggressiveGrowth: true });
                }

                if (res.data.data[0].riskAggressive) {
                    this.setState({ CriskAggressive: true });
                }
                if (res.data.data[0].riskModerate) {
                    this.setState({ CriskModerate: true });
                }
                if (res.data.data[0].riskConservative) {
                    this.setState({ CriskConservative: true });
                }

                if (res.data.data[0].portfolio1) {
                    this.setState({ Cportfolio1: true });
                }
                if (res.data.data[0].portfolio2) {
                    this.setState({ Cportfolio2: true });
                }
                if (res.data.data[0].portfolio3) {
                    this.setState({ Cportfolio3: true });
                }
                if (res.data.data[0].portfolio4) {
                    this.setState({ Cportfolio4: true });
                }
                if (res.data.data[0].portfolio5) {
                    this.setState({ Cportfolio5: true });
                }

                if (res.data.data[0].aaii) {
                    this.setState({ Caaii: true });
                }
                if (res.data.data[0].advisorPerspectives) {
                    this.setState({ CadvisorPerspectives: true });
                }
                if (res.data.data[0].alphaArchiect) {
                    this.setState({ CalphaArchiect: true });
                }
                if (res.data.data[0].referral) {
                    this.setState({ Creferral: true });
                }
                if (res.data.data[0].otherOthers) {
                    this.setState({ CotherOthers: true });
                }

            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }

    passwordupdateMevalidationCheck() {
        // console.log('222222222');
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.refs.oldpassword.value) {
            formIsValid = false;
            errors["oldpassword"] = "error_sell form-control";
        }
        if (!this.refs.newpassword.value) {
            formIsValid = false;
            errors["newpassword"] = "error_sell form-control";
        }
        if (!this.refs.confirmpassword.value) {
            formIsValid = false;
            errors["confirmpassword"] = "error_sell form-control";
        }

        if (this.refs.confirmpassword.value != this.refs.newpassword.value) {
            formIsValid = false;
            errors["confirmpassword"] = "error_sell form-control";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    updateMevalidationCheck() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.refs.name.value) {
            formIsValid = false;
            errors["name"] = "error_sell form-control";
        }
        if (!this.refs.email.value) {
            formIsValid = false;
            errors["email"] = "error_sell form-control";
        }
        if (this.refs.email.value) {
            if (reg.test(this.refs.email.value) === false) {
                formIsValid = false;
                errors["email"] = "error_sell form-control";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    profileupdate() {
        if (this.updateMevalidationCheck()) {
            const userInfoVo = {
                'name': this.refs.name.value,
                'email': this.refs.email.value,
                'username': this.refs.username.value,
                'id': this.refs.id.value
            }

            API.updateProfileUser(userInfoVo)
                .then((result) => {
                    if (result.data.success) {
                        // console.log('xxx res:', result );
                        //this.resetForm();
                        this.setState({
                            showAlert: true,
                            color: 'green',
                            message: result.data.message
                        });
                    } else {
                        // console.log('xxx errocode:', result );
                        this.setState({
                            showAlert: true,
                            color: '#b31313d6',
                            message: result.data.message
                        });

                    }
                }).catch(err => {
                    // console.log('xxx new:', err);
                })
        }
    }


    passwordupdate() {
        if (this.passwordupdateMevalidationCheck()) {
            const userInfoVo = {
                'oldpassword': this.refs.oldpassword.value,
                'newpassword': this.refs.newpassword.value,
                'confirmpassword': this.refs.confirmpassword.value,
                'id': this.refs.id.value
            }
            API.passwordReset(userInfoVo)
                .then((result) => {
                    if (result.data.success) {
                        this.setState({
                            pshowAlert: true,
                            color: 'green',
                            message: result.data.message
                        });
                    } else {
                        this.setState({
                            pshowAlert: true,
                            color: '#b31313d6',
                            message: result.data.message
                        });

                    }
                }).catch(err => {
                    // console.log('xxx new:', err);
                })
        }

    }

    updateMehandleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        // console.log('updatefields..xx...xx:', fields);
    }

    passwordupdateMehandleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    logout = () => {
        API.logout();
        this.props.history.replace('/front/register');
    }


    render() {
        console.log('xxx name is handle', this.state.name);


        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });


        if (this.state.homeValue || this.state.Mortgage) {
            if (this.state.homeValue && !this.state.Mortgage) {
                AssetsApproxEquity = parseInt(this.state.homeValue.replace(/,/g, ""));
            } else if (this.state.homeValue && this.state.Mortgage) {
                AssetsApproxEquity = parseInt(this.state.homeValue.replace(/,/g, "")) - parseInt(this.state.Mortgage.replace(/,/g, ""));
            }

        }

        if (this.state.banking || this.state.brokerage || this.state.retirementAccount || this.state.rothAccount  || this.state.otherApproxValue) {
            let banking = 0, brokerage = 0, retirementAccount = 0, rothAccount = 0, otherApproxValue = 0;
            if (this.state.banking) {
                banking = parseInt(this.state.banking.replace(/,/g, ""));
            } else {
                banking = 0;
            }

            if (this.state.brokerage) {
                brokerage = parseInt(this.state.brokerage.replace(/,/g, ""));
            } else {
                brokerage = 0;
            }

            if (this.state.retirementAccount) {
                retirementAccount = parseInt(this.state.retirementAccount.replace(/,/g, ""));
            } else {
                retirementAccount = 0;
            }

            if (this.state.rothAccount) {
                rothAccount = parseInt(this.state.rothAccount.replace(/,/g, ""));
            } else {
                rothAccount = 0;
            }

            // if (this.state.otherTypes) {
            //     otherTypes = parseInt(this.state.otherTypes.replace(/,/g, ""))
            // } else {
            //     otherTypes = 0;
            // }

            if (this.state.otherApproxValue) {
                otherApproxValue = parseInt(this.state.otherApproxValue.replace(/,/g, ""))
            } else {
                otherApproxValue = 0;
            }

            AssetsApproxTotal = banking + brokerage + retirementAccount + rothAccount + otherApproxValue;
            console.log('banking:', this.state.banking)
            console.log('brokerage:', this.state.brokerage)
            console.log('retirementAccount:', this.state.retirementAccount)
            console.log('AssetsApproxTotal:', AssetsApproxTotal)
            dbAssetsApproxTotal = formatter.format(AssetsApproxTotal);

        } else {
            AssetsApproxTotal = 0;
            dbAssetsApproxTotal = 0;
        }

        // if (this.state.essential || this.state.discretionary) {

        //     if (this.state.essential && !this.state.discretionary) {
        //         AssetsApproxBudget = parseInt(this.state.essential.replace(/,/g, ""));
        //     } else if (this.state.essential && this.state.discretionary) {
        //         AssetsApproxBudget = parseInt(this.state.essential.replace(/,/g, "")) + parseInt(this.state.discretionary.replace(/,/g, ""));
        //     }
        // }
        if (this.state.essential || this.state.discretionary) {

            if (this.state.essential && !this.state.discretionary) {
                AssetsApproxBudget = parseInt(this.state.essential.replace(/,/g, ""));
            }
            else if (this.state.essential && this.state.discretionary) {
                AssetsApproxBudget = parseInt(this.state.essential.replace(/,/g, "")) + parseInt(this.state.discretionary.replace(/,/g, ""));
            }
            else if (!this.state.essential && this.state.discretionary) {
                AssetsApproxBudget = parseInt(this.state.discretionary.replace(/,/g, ""))
            }
        }

        console.log('RenderErrorindicator:', this.state.Errorindicator)

        var n = this.state.Errorindicator.includes(2);
        console.log('nnnnnn:', n)


        return (
            <div className="profile-section procont">
                <section id="dashboard-main">
                    <div className="container">
                        <h2 style={{ textAlign: 'center' }}>My Account</h2>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <Tabs selectedIndex={this.state.selectedIndex} onSelect={this.handleSelect} id="noanim-tab-example">
                                    <div className="protab">
                                        <TabList >
                                            <Tab>User information</Tab>
                                            <Tab>Change password</Tab>
                                            <Tab>Questionnaire</Tab>
                                        </TabList>
                                    </div>
                                    <TabPanel>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="dashboard-content">
                                                <div className="row dashboard-content-inner">
                                                    <h5>User Information</h5>
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        {this.state.showAlert ? (<div style={{ background: this.state.color }} className="Idmessage">{this.state.message}</div>) : ''}
                                                        <form className="row">
                                                            <div className="col-md-12 col-sm-12">
                                                                <div className="col-md-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>Name</label>
                                                                        <input type="text" ref="name" className={this.state.errors["name"] ? this.state.errors["name"] : 'form-control'} name="name" placeholder="Name" onChange={this.updateMehandleChange.bind(this, "name")} defaultValue={this.state.fields.name} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-sm-12">
                                                                <div className="col-md-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>Email</label>
                                                                        <input type="text" readOnly ref="email" className={this.state.errors["email"] ? this.state.errors["email"] : 'form-control'} name="email" placeholder="email" onChange={this.updateMehandleChange.bind(this, "email")} defaultValue={this.state.fields.email} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div hidden className="col-md-12 col-sm-12">
                                                                <div className="col-md-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <label>Username</label>
                                                                        <input type="text" readOnly ref="username" className="form-control" name="username" onChange={this.updateMehandleChange.bind(this, "username")} defaultValue={this.state.fields.username} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <input type="hidden" ref="id" className="form-control" name="id" onChange={this.updateMehandleChange.bind(this, "id")} defaultValue={this.state.fields._id} />
                                                            <div className="col-md-12 col-sm-12">
                                                                <div className="col-md-12 col-sm-12 buttonSec">
                                                                    <input type="button" onClick={this.profileupdate} className="light-btn" value="Update" style={{ background: '#7030a0', borderColor: '#7030a0' }} />
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>

                                    <TabPanel>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="dashboard-content">
                                                <div class="row dashboard-content-inner">
                                                    <h5>Reset Password</h5>
                                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                                        {this.state.pshowAlert ? (<div style={{ background: this.state.color }} className="Idmessage">{this.state.message}</div>) : ''}

                                                        <form className="row">
                                                            <div className="col-md-12 col-sm-12">
                                                                <div class="col-md-6 col-sm-12">
                                                                    <div class="form-group">
                                                                        <label>Current password</label>
                                                                        <input type="password" ref="oldpassword" className={this.state.errors["oldpassword"] ? this.state.errors["oldpassword"] : 'form-control'} onChange={this.passwordupdateMehandleChange.bind(this, "oldpassword")} name="oldpassword" placeholder="Enter current password" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-sm-12">
                                                                <div class="col-md-6 col-sm-12">
                                                                    <div class="form-group">
                                                                        <label>New password</label>
                                                                        <input type="password" ref="newpassword" className={this.state.errors["newpassword"] ? this.state.errors["newpassword"] : 'form-control'} onChange={this.passwordupdateMehandleChange.bind(this, "newpassword")} name="newpassword" placeholder="Enter new password" required="" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-sm-12">
                                                                <div class="col-md-6 col-sm-12">
                                                                    <div class="form-group">
                                                                        <label>Confirm new password</label>
                                                                        <input type="password" ref="confirmpassword" className={this.state.errors["confirmpassword"] ? this.state.errors["confirmpassword"] : 'form-control'} onChange={this.passwordupdateMehandleChange.bind(this, "confirmpassword")} name="confirmpassword" placeholder="Enter confirm password" required="" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-sm-12">
                                                                <div className="col-md-12 col-sm-12 buttonSec">
                                                                    <input type="button" onClick={this.passwordupdate} className="light-btn" value="UPDATE" style={{ background: '#7030a0', borderColor: '#7030a0' }} />
                                                                </div>
                                                            </div>
                                                            <input type="hidden" ref="id" className="form-control" name="id" onChange={this.passwordupdateMehandleChange.bind(this, "id")} defaultValue={this.state.fields._id} />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>

                                    <TabPanel>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="dashboard-content" id="profileDashboard">

                                                {this.state.queshowAlert ? (<div className="thankuContent">
                                                    <h4>THANK YOU!</h4>
                                                    <br />
                                                    <p>Thank you for taking the time to answers these questions. We will get back to you shortly to coordinate a time for your free consultation.</p>
                                                    <br />
                                                    <p>Feel free to email us at info@SETITANDLEAVEIT.com if you have any questions in the meantime.</p>
                                                    <br />
                                                    <p style={{ marginBottom: '0px' }}>Best regards,</p>
                                                    <p><em>SET IT <span style={{ fontSize: '10px' }}>AND</span> LEAVE IT</em> team</p>

                                                    <div className="col-md-12 col-sm-12">
                                                        <div class="row">
                                                            <div className="col-md-4 col-sm-12 buttonSec">
                                                                <input type="button" data-id="1" onClick={this.moveFuc.bind(this)} className="light-btn" value="Home" style={{ background: '#7030a0', borderColor: '#7030a0' }} />
                                                            </div>
                                                            <div className="col-md-4 col-sm-12 buttonSec">
                                                                <input type="button" data-id="2" onClick={this.moveFuc.bind(this)} className="light-btn" value="Profile" style={{ background: '#7030a0', borderColor: '#7030a0' }} />
                                                            </div>
                                                            <div className="col-md-4 col-sm-12 buttonSec">
                                                                <input type="button" data-id="3" onClick={this.moveFuc.bind(this)} className="light-btn" value="Tool" style={{ background: '#7030a0', borderColor: '#7030a0' }} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>) : (<div class="row">
                                                    <div hidden={this.state.currentStep == 1 ? 'hidden' : ''} class="col-md-3">
                                                        <div class="question-left-tabs">
                                                            <ul>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="2" className={this.state.currentStep == 2 ? 'active' : ''}>Contact <i class={this.state.Errorindicator.includes(2) == true ? 'fa fa-times-circle indicator allwrong' : 'fa fa-check-circle indicator allright'}></i></span> </li>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="3" className={this.state.currentStep == 3 ? 'active' : ''}>Goals <i class={this.state.Errorindicator.includes(3) == true ? 'fa fa-times-circle indicator allwrong' : 'fa fa-check-circle indicator allright'}></i></span> </li>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="4" className={this.state.currentStep == 4 ? 'active' : ''}>Personal <i class={this.state.Errorindicator.includes(4) == true ? 'fa fa-times-circle indicator allwrong' : 'fa fa-check-circle indicator allright'}></i></span> </li>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="5" className={this.state.currentStep == 5 ? 'active' : ''}>LIVING <i class={this.state.Errorindicator.includes(5) == true ? 'fa fa-times-circle indicator allwrong' : 'fa fa-check-circle indicator allright'}></i></span> </li>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="6" className={this.state.currentStep == 6 ? 'active' : ''}>ASSETS <i class={this.state.Errorindicator.includes(6) == true ? 'fa fa-times-circle indicator allwrong' : 'fa fa-check-circle indicator allright'}></i></span> </li>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="7" className={this.state.currentStep == 7 ? 'active' : ''}>BUDGET <i class={this.state.Errorindicator.includes(7) == true ? 'fa fa-times-circle indicator allwrong' : 'fa fa-check-circle indicator allright'}></i></span> </li>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="8" className={this.state.currentStep == 8 ? 'active' : ''}>INSURANCE <i class={this.state.Errorindicator.includes(8) == true ? 'fa fa-times-circle indicator allwrong' : 'fa fa-check-circle indicator allright'}></i></span> </li>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="9" className={this.state.currentStep == 9 ? 'active' : ''}>INVESTING <i class={this.state.Errorindicator.includes(9) == true ? 'fa fa-times-circle indicator allwrong' : 'fa fa-check-circle indicator allright'}></i></span> </li>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="10" className={this.state.currentStep == 10 ? 'active' : ''}>RISK <i class={this.state.Errorindicator.includes(10) == true ? 'fa fa-times-circle indicator allwrong' : 'fa fa-check-circle indicator allright'}></i></span> </li>
                                                                <li>  <span onClick={this.sideButtonFuc.bind(this)} data-id="11" className={this.state.currentStep == 11 ? 'active' : ''}>OTHER </span> </li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                    <div class={this.state.currentStep == 1 ? 'col-md-12' : 'col-md-9'}>
                                                        {/* { this.state.showAlert	? (<div style={{background:this.state.color}} className="Idmessage">{this.state.message}</div>) : '' }     */}
                                                        <div className="row dashboard-content-inner">

                                                            <form className="row" onSubmit={this.handleSubmit}>
                                                                <Step1
                                                                    currentStep={this.state.currentStep}
                                                                />

                                                                <Step2
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    handleChange1={this.handleChange1}
                                                                    name={this.state.name}
                                                                    address={this.state.address}
                                                                    phone={this.state.phone}
                                                                    reasonGoalConsultation={this.state.reasonGoalConsultation}
                                                                    nameError={this.state.nameError}
                                                                    Eaddress={this.state.Eaddress}
                                                                    Ephone={this.state.Ephone}
                                                                    EreasonGoalConsultation={this.state.EreasonGoalConsultation}
                                                                />

                                                                <Step3
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    setItAndLeaveItRetirement={this.state.setItAndLeaveItRetirement}
                                                                    isChecked={this.state.isChecked}
                                                                    fixedAnnuityProduct={this.state.fixedAnnuityProduct}
                                                                    insuranceProduct={this.state.insuranceProduct}
                                                                    investmentAdvice={this.state.investmentAdvice}
                                                                    estatePlanning={this.state.estatePlanning}
                                                                    taxPlanning={this.state.taxPlanning}
                                                                    otherGoalServicecheck={this.state.otherGoalServicecheck}
                                                                    otherGoalService={this.state.otherGoalService}
                                                                    goalComment={this.state.goalComment}
                                                                    goalQuestion={this.state.goalQuestion}

                                                                    EsetItAndLeaveItRetirement={this.state.EsetItAndLeaveItRetirement}
                                                                    EfixedAnnuityProduct={this.state.EfixedAnnuityProduct}
                                                                    EinsuranceProduct={this.state.EinsuranceProduct}
                                                                    EinvestmentAdvice={this.state.EinvestmentAdvice}
                                                                    EestatePlanning={this.state.EestatePlanning}
                                                                    EtaxPlanning={this.state.EtaxPlanning}
                                                                    EotherGoalServicecheck={this.state.EotherGoalServicecheck}
                                                                    EotherGoalService={this.state.EotherGoalService}
                                                                    EgoalComment={this.state.EgoalComment}
                                                                    EgoalQuestion={this.state.EgoalQuestion}

                                                                    CsetItAndLeaveItRetirement={this.state.CsetItAndLeaveItRetirement}
                                                                    CfixedAnnuityProduct={this.state.CfixedAnnuityProduct}
                                                                    CinsuranceProduct={this.state.CinsuranceProduct}
                                                                    CinvestmentAdvice={this.state.CinvestmentAdvice}
                                                                    CestatePlanning={this.state.CestatePlanning}
                                                                    CtaxPlanning={this.state.CtaxPlanning}
                                                                    CotherGoalServicecheck={this.state.CotherGoalServicecheck}

                                                                />

                                                                <Step4
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    age={this.state.age}
                                                                    married={this.state.married}
                                                                    Kids={this.state.Kids}
                                                                    grandkid={this.state.grandkid}
                                                                    pets={this.state.pets}
                                                                    personalOtherDetails={this.state.personalOtherDetails}

                                                                    Eage={this.state.Eage}
                                                                    Emarried={this.state.Emarried}
                                                                    EKids={this.state.EKids}
                                                                    Egrandkid={this.state.Egrandkid}
                                                                    Epets={this.state.Epets}
                                                                    EpersonalOtherDetails={this.state.EpersonalOtherDetails}
                                                                />

                                                                <Step5
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    homeValue={this.state.homeValue}
                                                                    Mortgage={this.state.Mortgage}
                                                                    approxEquity={AssetsApproxEquity}
                                                                    homeBox={this.state.homeBox}
                                                                    iWeRent={this.state.iWeRent}
                                                                    monthlyRent={this.state.monthlyRent}
                                                                    canSubmit={this.state.canSubmit}

                                                                    ChomeBox={this.state.ChomeBox}
                                                                    CiWeRent={this.state.CiWeRent}

                                                                    EhomeValue={this.state.EhomeValue}
                                                                    EMortgage={this.state.EMortgage}
                                                                    EhomeBox={this.state.EhomeBox}
                                                                    EiWeRent={this.state.EiWeRent}
                                                                    EmonthlyRent={this.state.EmonthlyRent}
                                                                />

                                                                <Step6
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    homeBanking={this.state.homeBanking}
                                                                    homeBrokerage={this.state.homeBrokerage}
                                                                    homeRetirementAccount={this.state.homeRetirementAccount}
                                                                    homeRothAccount={this.state.homeRothAccount}
                                                                    homeOther={this.state.homeOther}
                                                                    homeSS={this.state.homeSS}
                                                                    homePension={this.state.homePension}
                                                                    banking={this.state.banking}
                                                                    brokerage={this.state.brokerage}
                                                                    retirementAccount={this.state.retirementAccount}
                                                                    rothAccount={this.state.rothAccount}
                                                                    otherTypes={this.state.otherTypes}
                                                                    otherApproxValue={this.state.otherApproxValue}
                                                                    dbAssetsApproxTotal={dbAssetsApproxTotal}
                                                                    AssetsApproxTotal={AssetsApproxTotal}
                                                                    socailSecurity={this.state.socailSecurity}
                                                                    pension={this.state.pension}
                                                                    others={this.state.others}
                                                                    canSubmit={this.state.canSubmit}


                                                                    ChomeBanking={this.state.ChomeBanking}
                                                                    ChomeBrokerage={this.state.ChomeBrokerage}
                                                                    ChomeRetirementAccount={this.state.ChomeRetirementAccount}
                                                                    ChomeRothAccount={this.state.ChomeRothAccount}
                                                                    ChomeOther={this.state.ChomeOther}
                                                                    ChomeSS={this.state.ChomeSS}
                                                                    ChomePension={this.state.ChomePension}


                                                                    EhomeBanking={this.state.EhomeBanking}
                                                                    EhomeBrokerage={this.state.EhomeBrokerage}
                                                                    EhomeRetirementAccount={this.state.EhomeRetirementAccount}
                                                                    EhomeRothAccount={this.state.EhomeRothAccount}
                                                                    EhomeOther={this.state.EhomeOther}
                                                                    EhomeSS={this.state.EhomeSS}
                                                                    EhomePension={this.state.EhomePension}
                                                                    Ebanking={this.state.Ebanking}
                                                                    Ebrokerage={this.state.Ebrokerage}
                                                                    EretirementAccount={this.state.EretirementAccount}
                                                                    ErothAccount={this.state.ErothAccount}
                                                                    EotherTypes={this.state.EotherTypes}
                                                                    EotherApproxValue={this.state.EotherApproxValue}
                                                                    EsocailSecurity={this.state.EsocailSecurity}
                                                                    Epension={this.state.Epension}
                                                                    Eothers={this.state.Eothers}

                                                                />

                                                                <Step7
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    essential={this.state.essential}
                                                                    discretionary={this.state.discretionary}
                                                                    AssetsApproxBudget={AssetsApproxBudget}
                                                                    oneOffExpenses={this.state.oneOffExpenses}

                                                                    Eessential={this.state.Eessential}
                                                                    Ediscretionary={this.state.Ediscretionary}
                                                                    EoneOffExpenses={this.state.EoneOffExpenses}

                                                                    canSubmit={this.state.canSubmit}
                                                                />

                                                                <Step8
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    noInsurance={this.state.noInsurance}
                                                                    medicare={this.state.medicare}
                                                                    supplementalHealth={this.state.supplementalHealth}
                                                                    longtermcare={this.state.longtermcare}
                                                                    lifeInsurance={this.state.lifeInsurance}
                                                                    lifeInType={this.state.lifeInType}
                                                                    lifeamount={this.state.lifeamount}
                                                                    inother={this.state.inother}
                                                                    inotherbox={this.state.inotherbox}
                                                                    canSubmit={this.state.canSubmit}

                                                                    EnoInsurance={this.state.EnoInsurance}
                                                                    Emedicare={this.state.Emedicare}
                                                                    EsupplementalHealth={this.state.EsupplementalHealth}
                                                                    Elongtermcare={this.state.Elongtermcare}
                                                                    ElifeInsurance={this.state.ElifeInsurance}
                                                                    ElifeInType={this.state.ElifeInType}
                                                                    Elifeamount={this.state.Elifeamount}
                                                                    Einother={this.state.Einother}
                                                                    Einotherbox={this.state.Einotherbox}

                                                                    CnoInsurance={this.state.CnoInsurance}
                                                                    Cmedicare={this.state.Cmedicare}
                                                                    CsupplementalHealth={this.state.CsupplementalHealth}
                                                                    Clongtermcare={this.state.Clongtermcare}
                                                                    ClifeInsurance={this.state.ClifeInsurance}
                                                                    Cinotherbox={this.state.Cinotherbox}

                                                                />

                                                                <Step9
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    analyticalInExperience={this.state.analyticalInExperience}
                                                                    capitalPreservation={this.state.capitalPreservation}
                                                                    investIncome={this.state.investIncome}
                                                                    investGrowth={this.state.investGrowth}
                                                                    investGrowthIncome={this.state.investGrowthIncome}
                                                                    investAggressiveGrowth={this.state.investAggressiveGrowth}
                                                                    currentAllocationStock={this.state.currentAllocationStock}
                                                                    experience_1_10={this.state.experience_1_10}
                                                                    expectations={this.state.expectations}
                                                                    experience_gb={this.state.experience_gb}
                                                                    canSubmit={this.state.canSubmit}

                                                                    EcurrentAllocationStock={this.state.EcurrentAllocationStock}
                                                                    Eexperience_1_10={this.state.Eexperience_1_10}
                                                                    Eexpectations={this.state.Eexpectations}
                                                                    Eexperience_gb={this.state.Eexperience_gb}
                                                                    EanalyticalInExperience={this.state.EanalyticalInExperience}
                                                                    EcapitalPreservation={this.state.EcapitalPreservation}
                                                                    EinvestIncome={this.state.EinvestIncome}
                                                                    EinvestGrowth={this.state.EinvestGrowth}
                                                                    EinvestGrowthIncome={this.state.EinvestGrowthIncome}
                                                                    EinvestAggressiveGrowth={this.state.EinvestAggressiveGrowth}

                                                                    CanalyticalInExperience={this.state.CanalyticalInExperience}
                                                                    CcapitalPreservation={this.state.CcapitalPreservation}
                                                                    CinvestIncome={this.state.CinvestIncome}
                                                                    CinvestGrowth={this.state.CinvestGrowth}
                                                                    CinvestGrowthIncome={this.state.CinvestGrowthIncome}
                                                                    CinvestAggressiveGrowth={this.state.CinvestAggressiveGrowth}

                                                                />


                                                                <Step10
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    riskAggressive={this.state.riskAggressive}
                                                                    riskModerate={this.state.riskModerate}
                                                                    riskConservative={this.state.riskConservative}
                                                                    portfolioDrawdown={this.state.portfolioDrawdown}
                                                                    riskPreservation={this.state.riskPreservation}
                                                                    riskIncome={this.state.riskIncome}
                                                                    riskGrowth={this.state.riskGrowth}
                                                                    lastMarketDownturn={this.state.lastMarketDownturn}
                                                                    portfolio1={this.state.portfolio1}
                                                                    portfolio2={this.state.portfolio2}
                                                                    portfolio3={this.state.portfolio3}
                                                                    portfolio4={this.state.portfolio4}
                                                                    portfolio5={this.state.portfolio5}
                                                                    canSubmit={this.state.canSubmit}

                                                                    EportfolioDrawdown={this.state.EportfolioDrawdown}
                                                                    EriskPreservation={this.state.EriskPreservation}
                                                                    EriskIncome={this.state.EriskIncome}
                                                                    EriskGrowth={this.state.EriskGrowth}
                                                                    ElastMarketDownturn={this.state.ElastMarketDownturn}
                                                                    EriskAggressive={this.state.EriskAggressive}
                                                                    EriskModerate={this.state.EriskModerate}
                                                                    EriskConservative={this.state.EriskConservative}
                                                                    Eportfolio1={this.state.Eportfolio1}
                                                                    Eportfolio2={this.state.Eportfolio2}
                                                                    Eportfolio3={this.state.Eportfolio3}
                                                                    Eportfolio4={this.state.Eportfolio4}
                                                                    Eportfolio5={this.state.Eportfolio5}

                                                                    CriskAggressive={this.state.CriskAggressive}
                                                                    CriskModerate={this.state.CriskModerate}
                                                                    CriskConservative={this.state.CriskConservative}
                                                                    Cportfolio1={this.state.Cportfolio1}
                                                                    Cportfolio2={this.state.Cportfolio2}
                                                                    Cportfolio3={this.state.Cportfolio3}
                                                                    Cportfolio4={this.state.Cportfolio4}
                                                                    Cportfolio5={this.state.Cportfolio5}

                                                                />

                                                                <Step11
                                                                    currentStep={this.state.currentStep}
                                                                    handleChange={this.handleChange}
                                                                    aaii={this.state.aaii}
                                                                    advisorPerspectives={this.state.advisorPerspectives}
                                                                    alphaArchiect={this.state.alphaArchiect}
                                                                    referral={this.state.referral}
                                                                    referralContent={this.state.referralContent}
                                                                    otherOthers={this.state.otherOthers}
                                                                    otherOthersContent={this.state.otherOthersContent}
                                                                    whatAttracted={this.state.whatAttracted}
                                                                    improveQuestionnaire={this.state.improveQuestionnaire}

                                                                    EwhatAttracted={this.state.EwhatAttracted}
                                                                    EimproveQuestionnaire={this.state.EimproveQuestionnaire}
                                                                    Eaaii={this.state.Eaaii}
                                                                    EadvisorPerspectives={this.state.EadvisorPerspectives}
                                                                    EalphaArchiect={this.state.EalphaArchiect}
                                                                    Ereferral={this.state.Ereferral}
                                                                    EreferralContent={this.state.EreferralContent}
                                                                    EotherOthers={this.state.EotherOthers}
                                                                    EotherOthersContent={this.state.EotherOthersContent}

                                                                    Caaii={this.state.Caaii}
                                                                    CadvisorPerspectives={this.state.CadvisorPerspectives}
                                                                    CalphaArchiect={this.state.CalphaArchiect}
                                                                    Creferral={this.state.Creferral}
                                                                    CotherOthers={this.state.CotherOthers}


                                                                    canSubmit={this.state.canSubmit}
                                                                />


                                                                <div className="buttonSectionForm">
                                                                    {this.previousButton}
                                                                    {this.nextButton}
                                                                </div>

                                                                <input type="hidden" ref="id" className="form-control" name="id" value={this.state.fields._id} />
                                                                <input type="hidden" ref="loginuser" className="form-control" name="loginuser" value={this.state.fields.username} />

                                                            </form>

                                                        </div>
                                                    </div>

                                                </div>)}

                                            </div>
                                        </div>
                                    </TabPanel>



                                </Tabs>
                            </div>
                        </div>
                    </div>


                    {/* POPUP ALERT MESSAGE */}

                    <Modal show={this.state.pdfmsgshow}
                        onHide={this.handleHide}
                        container={this}
                        aria-labelledby="contained-modal-title"
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="reportAlert" closeButton>
                            <Modal.Title id="contained-modal-title">
                                Questionnaire Alert
                                </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div id="pdfmessage">

                                <div>
                                    <p>You still have not entered some of the required fields (highlighted in red).</p>
                                    <div className="butonPop">
                                        <a href="javascript:void(0)" onClick={this.handleHide} class="modalcloseOk">GO BACK</a>
                                        <a href="javascript:void(0)" onClick={this.handleSubmit} data-id="000" class="modalcloseOk">STILL SUBMIT</a>
                                    </div>
                                </div>

                            </div>

                        </Modal.Body>

                    </Modal>



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
        return (
            <React.Fragment>
                <h5 className="overHeading">QUESTIONNAIRE OVERVIEW</h5>
                <div className="col-md-12 col-sm-12">

                    {/* <div className="questionNote not-sect nst">
                        <p><span>!</span><p><div className="notediv"><b>NOTE:</b> <p>
                            You may SAVE &amp; EXIT at any time if you would like to complete and SUBMIT later.
                        </p></div></p></p>
                    </div> */}

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <p style={{ textAlign: "left" }}> We are happy to offer you a free consultation. In order to make it as productive as possible,
                                please fill out the following questionnaire. Our goal is to obtain a solid grasp of your financial
                                situation, risk profile, needs, and goals. Once you complete and submit the questionnaire,
                      we will get back to you as soon as possible to schedule your free consultation.</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <h6 style={{ textAlign: "left" }}>Please note:</h6>
                        <ul className="preface_list">
                            <li><div className="qicone"><i style={{ color: "black", textAlign: "left" }} class="fa fa-square"></i> </div><div className="qiconess">This questionnaire has 9 sections and generally takes approximately 5-10 minutes to complete.</div></li>
                            <li><div className="qicone"><i style={{ color: "black", textAlign: "left" }} class="fa fa-square"></i> </div><div className="qiconess">Exact numbers are not required and you do not have to answer every question (<span style={{ 'color': 'red' }}>red highlighting</span> indicates required/missing information).</div></li>
                            <li><div className="qicone"><i style={{ color: "black", textAlign: "left" }} class="fa fa-square"></i> </div><div className="qiconess">You may SAVE &amp; EXIT at any time if you would like to complete and SUBMIT later.</div></li>
                            <li><div className="qicone"><i style={{ color: "black", textAlign: "left" }} class="fa fa-square"></i> </div><div className="qiconess">We do not sell or share any of your data.</div></li>
                        </ul>
                    </div>
                    <div className="footerContent">
                        <p style={{ textAlign: "left" }}>Thank you for your interest,</p>
                        <p style={{ textAlign: "right" }}><em style={{ color: 'purple' }}>SET IT AND LEAVE IT</em> team</p>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

class Step2 extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            name1: this.props.name
        }
    }

    handleClick1 = () => {
        this.setState({
            showModal: true
        })
        console.log('clear state is handleChange1');
    }

    render() {
        if (this.props.currentStep !== 2) {
            return null
        }
        return (
            <React.Fragment>
                <h5>CONTACT DETAILS</h5>

                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px", fontSize: "18px" }}>Name</label>
                        <input
                            className={this.props.nameError ? this.props.nameError : 'form-control'}
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            defaultValue={this.state.name1}
                            onChange={this.props.handleChange}
                        />
                    </div>
                </div>

                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="address" style={{ fontWeight: 700, fontSize: "18px" }}> Address</label>
                        <textarea
                            className={this.props.Eaddress ? this.props.Eaddress : 'form-control'}
                            id="address"
                            name="address"
                            value={this.props.address}
                            onChange={this.props.handleChange} />
                    </div>
                </div>

                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="phone" style={{ fontWeight: 700, fontSize: "18px" }}>Phone</label>
                        <input
                            className={this.props.Ephone ? this.props.Ephone : 'form-control'}
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Enter phone number"
                            value={this.props.phone}
                            onChange={this.props.handleChange}
                        />
                    </div>
                </div>

                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="reasonGoalConsultation" style={{ fontWeight: 700, fontSize: "18px" }}> Best time(s) to schedule free consultation</label>
                        <textarea
                            className={this.props.EreasonGoalConsultation ? this.props.EreasonGoalConsultation : 'form-control'}
                            id="reasonGoalConsultation"
                            name="reasonGoalConsultation"
                            value={this.props.reasonGoalConsultation}
                            onChange={this.props.handleChange} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


class Step3 extends React.Component {
    render() {
        if (this.props.currentStep !== 3) {
            return null
        }
        return (
            <React.Fragment>
                <h5>GOALS</h5>


                <div className="col-md-12 col-sm-12">
                    <div className="row">


                        <div className="col-md-12 col-sm-12">
                            <div class="form-group goalServiceList">
                                <label style={{ fontWeight: 700, fontSize: "18px" }}>Services you may be interested in </label>


                                {/* <p className="checkboxContent"> 
                            <input type="checkbox"  className={this.props.EsetItAndLeaveItRetirement ? this.props.EsetItAndLeaveItRetirement : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CsetItAndLeaveItRetirement ? 'checked' : ''}   value="Set It and Leave It retirement (comprehensive planning)" for="" name="setItAndLeaveItRetirement"/> Set It and Leave It retirement (comprehensive planning) 
                        </p>
                        <p className="checkboxContent"> <input type="checkbox" className={this.props.EfixedAnnuityProduct ? this.props.EfixedAnnuityProduct : 'checktrue'} defaultChecked={this.props.CfixedAnnuityProduct ? 'checked' : ''} onChange={this.props.handleChange} value="Fixed annuity product(s)" for="" name="fixedAnnuityProduct"/> Fixed annuity product(s) </p>
                        <p className="checkboxContent"> <input type="checkbox" className={this.props.EinsuranceProduct ? this.props.EinsuranceProduct : 'checktrue'} defaultChecked={this.props.CinsuranceProduct ? 'checked' : ''} onChange={this.props.handleChange} value="Insurance product(s) (e.g., life insurance or long-term care" for="" name="insuranceProduct"/> Insurance product(s) (e.g., life insurance or long-term care) </p>
                        <p className="checkboxContent"> <input type="checkbox" className={this.props.EinvestmentAdvice ? this.props.EinvestmentAdvice : 'checktrue'} defaultChecked={this.props.CinvestmentAdvice ? 'checked' : ''} onChange={this.props.handleChange} value="Investment advice/management" for="" name="investmentAdvice"/> Investment advice/management</p>
                        <p className="checkboxContent"> <input type="checkbox" className={this.props.EestatePlanning ? this.props.EestatePlanning : 'checktrue'} defaultChecked={this.props.CestatePlanning ? 'checked' : ''} onChange={this.props.handleChange} value="Estate planning" for="" name="estatePlanning"/> Estate planning</p>
                        <p className="checkboxContent"> <input type="checkbox" className={this.props.EtaxPlanning ? this.props.EtaxPlanning : 'checktrue'} defaultChecked={this.props.CtaxPlanning ? 'checked' : ''} onChange={this.props.handleChange} value="Tax planning" for="" name="taxPlanning"/> Tax planning</p> */}


                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" className={this.props.EsetItAndLeaveItRetirement ? this.props.EsetItAndLeaveItRetirement : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CsetItAndLeaveItRetirement ? 'checked' : ''} value="Set It and Leave It retirement (comprehensive planning)" for="" name="setItAndLeaveItRetirement" /> Retirement planning (e.g., SET IT AND LEAVE IT)
                           </span>
                                    </span>
                                </p>

                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" className={this.props.EfixedAnnuityProduct ? this.props.EfixedAnnuityProduct : 'checktrue'} defaultChecked={this.props.CfixedAnnuityProduct ? 'checked' : ''} onChange={this.props.handleChange} value="Fixed annuity product(s)" for="" name="fixedAnnuityProduct" /> Fixed annuity product(s)
                            </span>
                                    </span>
                                </p>

                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" className={this.props.EinsuranceProduct ? this.props.EinsuranceProduct : 'checktrue'} defaultChecked={this.props.CinsuranceProduct ? 'checked' : ''} onChange={this.props.handleChange} value="Insurance product(s) (e.g., life insurance or long-term care" for="" name="insuranceProduct" /> Insurance product(s) (e.g., life insurance or long-term care)
                            </span>
                                    </span>
                                </p>

                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" className={this.props.EinvestmentAdvice ? this.props.EinvestmentAdvice : 'checktrue'} defaultChecked={this.props.CinvestmentAdvice ? 'checked' : ''} onChange={this.props.handleChange} value="Investment advice/management" for="" name="investmentAdvice" /> Investment advice/management
                            </span>
                                    </span>
                                </p>

                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" className={this.props.EestatePlanning ? this.props.EestatePlanning : 'checktrue'} defaultChecked={this.props.CestatePlanning ? 'checked' : ''} onChange={this.props.handleChange} value="Estate planning" for="" name="estatePlanning" /> Estate planning
                            </span>
                                    </span>
                                </p>


                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" className={this.props.EtaxPlanning ? this.props.EtaxPlanning : 'checktrue'} defaultChecked={this.props.CtaxPlanning ? 'checked' : ''} onChange={this.props.handleChange} value="Tax planning" for="" name="taxPlanning" /> Tax planning
                            </span>
                                    </span>
                                </p>



                                <div className="sideFix ">
                                    <p style={{ 'marginTop': '15px' }} className="checkboxContent sidefixbox">
                                        {/* <input type="checkbox" className={this.props.EotherGoalServicecheck ? this.props.EotherGoalServicecheck : 'checktrue'} defaultChecked={this.props.CotherGoalServicecheck ? 'checked' : ''} onChange={this.props.handleChange} vaule="other Goal Service" name="otherGoalServicecheck" /> Other  */}
                                        <div className="form-group">
                                            <span class="wpcf7-checkbox">
                                                <span class="wpcf7-list-item other">
                                                    <input type="checkbox" style={{ marginTop: "20px" }} className={this.props.EotherGoalServicecheck ? this.props.EotherGoalServicecheck : 'checktrue'} defaultChecked={this.props.CotherGoalServicecheck ? 'checked' : ''} onChange={this.props.handleChange} vaule="other Goal Service" name="otherGoalServicecheck" /> Other
                                            </span>
                                            </span>
                                        </div>

                                    </p>
                                    {/* <input
                                        className="form-control"
                                        style={{ width: "100%" }}
                                        className={this.props.EotherGoalService ? this.props.EotherGoalService : 'form-control'}
                                        id="otherGoalService"
                                        name="otherGoalService"
                                        value={this.props.otherGoalService}
                                        placeholder="Other goals"
                                        onChange={this.props.handleChange} /> */}
                                    <textarea
                                        className="form-control"
                                        style={{ width: "100%" }}
                                        className={this.props.EotherGoalService ? this.props.EotherGoalService : 'form-control'}
                                        id="otherGoalService"
                                        name="otherGoalService"
                                        value={this.props.otherGoalService}
                                        placeholder="Other goals"
                                        onChange={this.props.handleChange} />
                                </div>


                            </div>
                        </div>

                        <div className="col-md-12 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="goalComment" style={{ fontWeight: 700, fontSize: "18px" }}> Comments regarding your goals for this consultation</label>
                                <textarea
                                    className={this.props.EgoalComment ? this.props.EgoalComment : 'form-control'}
                                    id="goalComment"
                                    name="goalComment"
                                    value={this.props.goalComment}
                                    onChange={this.props.handleChange} />
                            </div>
                        </div>

                        <div className="col-md-12 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="goalQuestion" style={{ fontWeight: 700, fontSize: "18px" }}> Specific questions/topics you would like to address</label>
                                <textarea
                                    className={this.props.EgoalQuestion ? this.props.EgoalQuestion : 'form-control'}
                                    id="goalQuestion"
                                    name="goalQuestion"
                                    value={this.props.goalQuestion}
                                    onChange={this.props.handleChange} />
                            </div>
                        </div>

                    </div>
                </div>


            </React.Fragment>
        )
    }
}



class Step4 extends React.Component {

    createAge = () => {
        let ages = []
        for (let i = 18; i <= 99; i++) {
            ages.push(<option value={`${i}`}>{i}</option>)
        }
        return ages
    }

    render() {
        console.log('StepProps:', this.props.currentStep)
        if (this.props.currentStep !== 4) {
            return null
        }

        return (
            <React.Fragment>
                <h5>PERSONAL DETAILS</h5>


                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-3 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Age</label>
                                <select value={this.props.age} id="age" name="age" onChange={this.props.handleChange} className={this.props.Eage ? this.props.Eage : 'form-control'} >
                                    <option value=""> Select</option>
                                    {this.createAge()}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Married</label>


                                <select value={this.props.married} id="married" name="married" onChange={this.props.handleChange} className={this.props.Emarried ? this.props.Emarried : 'form-control'} >
                                    <option value=""> Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No"> No </option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Kids</label>
                                <select value={this.props.Kids} id="Kids" name="Kids" onChange={this.props.handleChange} className={this.props.EKids ? this.props.EKids : 'form-control'} >
                                    <option value="Select">Select</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2"> 2 </option>
                                    <option value="3"> 3 </option>
                                    <option value="4"> 4 </option>
                                    <option value="5"> 5 </option>
                                    <option value="more">more</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Grandkids</label>
                                <select value={this.props.grandkid} id="grandkid" name="grandkid" onChange={this.props.handleChange} className={this.props.Egrandkid ? this.props.Egrandkid : 'form-control'} >
                                    <option value="Select">Select</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2"> 2 </option>
                                    <option value="3"> 3 </option>
                                    <option value="4"> 4 </option>
                                    <option value="5"> 5 </option>
                                    <option value="more">more</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Pets</label>
                                <select value={this.props.pets} id="pets" name="pets" onChange={this.props.handleChange} className={this.props.Epets ? this.props.Epets : 'form-control'} >
                                    <option value="Select">Select</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2"> 2 </option>
                                    <option value="3"> 3 </option>
                                    <option value="4"> 4 </option>
                                    <option value="5"> 5 </option>
                                    <option value="more">more</option>
                                </select>
                            </div>
                        </div>


                        <div className="col-md-12 col-sm-12">
                            <div className="form-group">
                                <label htmlFor="personalOtherDetails" style={{ fontWeight: 700, fontSize: "18px" }}> Other relevant details</label>
                                <textarea
                                    className={this.props.EpersonalOtherDetails ? this.props.EpersonalOtherDetails : 'form-control'}
                                    id="personalOtherDetails"
                                    name="personalOtherDetails"
                                    placeholder="E.g., medical situation, legacy goals (specific heirs, charities, or beneficiaries), etc."
                                    value={this.props.personalOtherDetails}
                                    onChange={this.props.handleChange} />
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
            minimumFractionDigits: 0
        });
        return (
            <React.Fragment>
                <h5>LIVING</h5>
                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <h6>Types of assets</h6>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <table class="assestTable1">
                                        <tr>
                                            <td>
                                                <p className="checkboxContent">
                                                    <span class="wpcf7-checkbox">
                                                        <span class="wpcf7-list-item">
                                                            <input type="checkbox" class={this.props.EhomeBox ? this.props.EhomeBox : 'checktrue'} defaultChecked={this.props.ChomeBox ? 'checked' : ''} onChange={this.props.handleChange} for="" value="home" name="homeBox" /> Home
                                    </span>
                                                    </span>
                                                </p>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Home value</label>
                                                    <NumberFormat
                                                        className={this.props.EhomeValue ? this.props.EhomeValue : 'form-control'}
                                                        id="homeValue"
                                                        name="homeValue"
                                                        type="text"
                                                        value={this.props.homeValue}
                                                        onChange={this.props.handleChange}
                                                        thousandSeparator={true}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <label htmlFor="name" className="profile-value" style={{ fontWeight: 700, fontSize: "18px", lineHeight: 27 + 'px!important' }}>Mortgage</label>
                                                    <NumberFormat
                                                        className={this.props.EMortgage ? this.props.EMortgage : 'form-control'}
                                                        id="Mortgage"
                                                        name="Mortgage"
                                                        type="text"
                                                        value={this.props.Mortgage}
                                                        onChange={this.props.handleChange}
                                                        thousandSeparator={true}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Approx. equity</label>
                                                    <h6 className="approxEquityValue">{this.props.approxEquity ? formatter.format(this.props.approxEquity) : '$0,000'}</h6>
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
                                                <p className="checkboxContent">
                                                    <span class="wpcf7-checkbox">
                                                        <span class="wpcf7-list-item">
                                                            <input type="checkbox" class={this.props.EiWeRent ? this.props.EiWeRent : 'checktrue'} defaultChecked={this.props.CiWeRent ? 'checked' : ''} onChange={this.props.handleChange} for="" value="I/we rent" name="iWeRent" /> I/we rent
                                    </span>
                                                    </span>
                                                </p>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Monthly rent</label>
                                                    <NumberFormat
                                                        className={this.props.EmonthlyRent ? this.props.EmonthlyRent : 'form-control'}
                                                        id="monthlyRent"
                                                        name="monthlyRent"
                                                        type="text"
                                                        value={this.props.monthlyRent}
                                                        onChange={this.props.handleChange}
                                                        thousandSeparator={true}
                                                    />
                                                </div>
                                            </td>

                                        </tr>
                                    </table>
                                </div>
                            </div>
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

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });

        return (
            <React.Fragment>
                <h5>ASSETS DETAILS</h5>

                <div className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <h6>Types of assets</h6>

                        </div>

                    </div>





                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <table class="assestTable">
                                <tr>
                                    <td> </td>
                                    <td style={{ fontWeight: "bold", fontSize: "18px" }}> Estimated value in accounts </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p className="checkboxContent">
                                            <span class="wpcf7-checkbox">
                                                <span class="wpcf7-list-item">
                                                    <input type="checkbox" class={this.props.EhomeBanking ? this.props.EhomeBanking : 'checktrue'} defaultChecked={this.props.ChomeBanking ? 'checked' : ''} onChange={this.props.handleChange} for="" value="homeBanking" name="homeBanking" /> Banking
                                    </span>
                                            </span>
                                        </p>
                                    </td>
                                    <td>
                                        <NumberFormat
                                            className={this.props.Ebanking ? this.props.Ebanking : 'form-control'}
                                            id="banking"
                                            name="banking"
                                            type="text"
                                            value={this.props.banking}
                                            onChange={this.props.handleChange}
                                            placeholder="Checking and savings accounts"
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p className="checkboxContent">
                                            <span class="wpcf7-checkbox">
                                                <span class="wpcf7-list-item">
                                                    <input type="checkbox" class={this.props.EhomeBrokerage ? this.props.EhomeBrokerage : 'checktrue'} defaultChecked={this.props.ChomeBrokerage ? 'checked' : ''} onChange={this.props.handleChange} for="" value="homeBrokerage" name="homeBrokerage" /> Brokerage (taxable)
                                    </span>
                                            </span>
                                        </p>
                                    </td>
                                    <td>
                                        <NumberFormat
                                            className={this.props.Ebrokerage ? this.props.Ebrokerage : 'form-control'}
                                            id="brokerage"
                                            name="brokerage"
                                            type="text"
                                            value={this.props.brokerage}
                                            onChange={this.props.handleChange}
                                            placeholder="Schwab, Fidelity, etc."
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p className="checkboxContent">
                                            {/* <input type="checkbox" class={this.props.EhomeRetirementAccount ? this.props.EhomeRetirementAccount : 'checktrue'}  defaultChecked={this.props.ChomeRetirementAccount ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homeRetirementAccount" name="homeRetirementAccount" /> Retirement accounts */}
                                            <span class="wpcf7-checkbox">
                                                <span class="wpcf7-list-item">
                                                    <input type="checkbox" class={this.props.EhomeRetirementAccount ? this.props.EhomeRetirementAccount : 'checktrue'} defaultChecked={this.props.ChomeRetirementAccount ? 'checked' : ''} onChange={this.props.handleChange} for="" value="homeRetirementAccount" name="homeRetirementAccount" /> Retirement accounts
                                </span>
                                            </span>
                                        </p>
                                    </td>
                                    <td>
                                        <NumberFormat
                                            className={this.props.EretirementAccount ? this.props.EretirementAccount : 'form-control'}
                                            id="retirementAccount"
                                            name="retirementAccount"
                                            type="text"
                                            value={this.props.retirementAccount}
                                            onChange={this.props.handleChange}
                                            placeholder="Traditional IRA, 401K, 403B, etc."
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p className="checkboxContent">
                                            {/* <input type="checkbox" class={this.props.EhomeRothAccount ? this.props.EhomeRothAccount : 'checktrue'} defaultChecked={this.props.ChomeRothAccount ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homeRothAccount" name="homeRothAccount" /> Roth accounts */}

                                            <span class="wpcf7-checkbox">
                                                <span class="wpcf7-list-item">
                                                    <input type="checkbox" class={this.props.EhomeRothAccount ? this.props.EhomeRothAccount : 'checktrue'} defaultChecked={this.props.ChomeRothAccount ? 'checked' : ''} onChange={this.props.handleChange} for="" value="homeRothAccount" name="homeRothAccount" /> Roth accounts
                                </span>
                                            </span>

                                        </p>
                                    </td>
                                    <td>
                                        <NumberFormat
                                            className={this.props.ErothAccount ? this.props.ErothAccount : 'form-control'}
                                            id="rothAccount"
                                            name="rothAccount"
                                            type="text"
                                            value={this.props.rothAccount}
                                            onChange={this.props.handleChange}
                                            placeholder="Roth IRA or Roth 401K"
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <p className="checkboxContent">
                                            {/* <input type="checkbox" class={this.props.EhomeOther ? this.props.EhomeOther : 'checktrue'}  defaultChecked={this.props.ChomeOther ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homeOther" name="homeOther" /> Other */}
                                            <span class="wpcf7-checkbox">
                                                <span class="wpcf7-list-item">
                                                    <input type="checkbox" class={this.props.EhomeOther ? this.props.EhomeOther : 'checktrue'} defaultChecked={this.props.ChomeOther ? 'checked' : ''} onChange={this.props.handleChange} for="" value="homeOther" name="homeOther" /> Other
                                </span>
                                            </span>
                                        </p>
                                    </td>
                                    <td>

                                        <NumberFormat
                                            className={this.props.EotherApproxValue ? this.props.EotherApproxValue : 'form-control'}
                                            id="otherApproxValue"
                                            name="otherApproxValue"
                                            type="text"
                                            value={this.props.otherApproxValue}
                                            onChange={this.props.handleChange}
                                            placeholder="Approx. value"
                                            thousandSeparator={true}
                                        />
                                        <input
                                            className={this.props.EotherTypes ? this.props.EotherTypes : 'form-control'}
                                            id="otherTypes"
                                            name="otherTypes"
                                            type="text"
                                            value={this.props.otherTypes}
                                            onChange={this.props.handleChange}
                                            placeholder="Type(s)"
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td style={{ fontWeight: "bold", paddingLeft: "31px" }}>Approx. asset total</td>
                                    <td>
                                        <input

                                            className="form-control"
                                            id="dbAssetsApproxTotal"
                                            name="dbAssetsApproxTotal"
                                            onChange={this.props.handleChange}
                                            type="text"
                                            value={formatter.format(this.props.AssetsApproxTotal)}
                                        />
                                        {this.props.AssetsApproxTotal ? formatter.format(this.props.AssetsApproxTotal) : '$0,000'}
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
                                            <td style={{ fontWeight: "bold", fontSize: "18px" }}>Total annual income</td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <p className="checkboxContent">
                                                    {/* 
                            <input type="checkbox" class={this.props.EhomeSS ? this.props.EhomeSS : 'checktrue'}  defaultChecked={this.props.ChomeSS ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homeSS" name="homeSS" /> Social security */}
                                                    <span class="wpcf7-checkbox">
                                                        <span class="wpcf7-list-item">
                                                            <input type="checkbox" class={this.props.EhomeSS ? this.props.EhomeSS : 'checktrue'} defaultChecked={this.props.ChomeSS ? 'checked' : ''} onChange={this.props.handleChange} for="" value="homeSS" name="homeSS" /> Social security
                                </span>
                                                    </span>
                                                </p>
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    className={this.props.EsocailSecurity ? this.props.EsocailSecurity : 'form-control'}
                                                    id="socailSecurity"
                                                    name="socailSecurity"
                                                    type="text"
                                                    value={this.props.socailSecurity}
                                                    onChange={this.props.handleChange}
                                                    thousandSeparator={true}

                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <p className="checkboxContent">
                                                    {/* <input type="checkbox" class={this.props.EhomePension ? this.props.EhomePension : 'checktrue'}  defaultChecked={this.props.ChomePension ? 'checked' : ''} onChange={this.props.handleChange}  for="" value="homePension" name="homePension" /> Pension(s) */}

                                                    <span class="wpcf7-checkbox">
                                                        <span class="wpcf7-list-item">
                                                            <input type="checkbox" class={this.props.EhomePension ? this.props.EhomePension : 'checktrue'} defaultChecked={this.props.ChomePension ? 'checked' : ''} onChange={this.props.handleChange} for="" value="homePension" name="homePension" /> Pension(s)
                                </span>
                                                    </span>

                                                </p>
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    className={this.props.Epension ? this.props.Epension : 'form-control'}
                                                    id="pension"
                                                    name="pension"
                                                    type="text"
                                                    value={this.props.pension}
                                                    onChange={this.props.handleChange}
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
                                <label htmlFor="name" style={{ fontWeight: "bold" }}>Other</label>
                                <textarea
                                    className={this.props.Eothers ? this.props.Eothers : 'form-control'}
                                    id="others"
                                    name="others"
                                    type="text"
                                    placeholder=""
                                    value={this.props.others}
                                    onChange={this.props.handleChange}
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



    render() {
        if (this.props.currentStep !== 7) {
            return null
        }

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });

        return (
            <React.Fragment>
                <h5>BUDGET DETAILS (ANNUAL SPENDING)</h5>

                <div className="col-md-12 col-sm-12">

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Essential spending (bare minimum spending requirement)</label>
                            <NumberFormat
                                className={this.props.Eessential ? this.props.Eessential : 'form-control'}
                                id="essential"
                                name="essential"
                                type="text"
                                placeholder=""
                                value={this.props.essential}
                                onChange={this.props.handleChange}
                                thousandSeparator={true}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Discretionary</label>
                            <NumberFormat
                                className={this.props.Ediscretionary ? this.props.Ediscretionary : 'form-control'}
                                id="discretionary"
                                name="discretionary"
                                type="text"
                                placeholder=""
                                value={this.props.discretionary}
                                onChange={this.props.handleChange}
                                thousandSeparator={true}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Approx. total: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                            {this.props.AssetsApproxBudget ? formatter.format(this.props.AssetsApproxBudget) : '$0,000'}
                            {/* <NumberFormat
                                className={this.props.AssetsApproxBudget ? this.props.AssetsApproxBudget : 'form-control'}
                                id="AssetsApproxBudget"
                                name="AssetsApproxBudget"
                                type="text"
                                placeholder=""
                                value={this.props.AssetsApproxBudget}
                                onChange={this.props.handleChange}
                                thousandSeparator={true}
                            /> */}
                        </div>
                    </div>

                    {/* <tr>
                        <td>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EhomeOther ? this.props.EhomeOther : 'checktrue'} defaultChecked={this.props.ChomeOther ? 'checked' : ''} onChange={this.props.handleChange} for="" value="homeOther" name="homeOther" /> Other
                                </span>
                                </span>
                            </p>
                        </td>
                        <td>
                            <NumberFormat
                                className={this.props.EotherApproxValue ? this.props.EotherApproxValue : 'form-control'}
                                id="otherApproxValue"
                                name="otherApproxValue"
                                type="text"
                                value={this.props.otherApproxValue}
                                onChange={this.props.handleChange}
                                placeholder="Approx. value"
                                thousandSeparator={true}
                            />
                            <input
                                className={this.props.EotherTypes ? this.props.EotherTypes : 'form-control'}
                                id="otherTypes"
                                name="otherTypes"
                                type="text"
                                value={this.props.otherTypes}
                                onChange={this.props.handleChange}
                                placeholder="Type(s)"
                            />
                        </td>
                    </tr> */}


                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Expected trend for expenses & one-off expenses</label>
                            <textarea
                                className={this.props.EoneOffExpenses ? this.props.EoneOffExpenses : 'form-control'}
                                id="oneOffExpenses"
                                name="oneOffExpenses"
                                value={this.props.oneOffExpenses}
                                onChange={this.props.handleChange}
                                placeholder="E.g., Expenses likely to decrease with less travel, expenses likely to increase with more medical costs, etc."
                            />
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

class Step8 extends React.Component {
    render() {
        if (this.props.currentStep !== 8) {
            return null
        }
        return (
            <React.Fragment>
                <h5>INSURANCE DETAILS</h5>

                <div className="col-md-12 col-sm-12">

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">



                            {/* <p className="checkboxContent"> <input type="checkbox" className={this.props.EnoInsurance ? this.props.EnoInsurance : 'checktrue'}  defaultChecked={this.props.CnoInsurance ? 'checked' : ''}  onChange={this.props.handleChange}  value="I/we have no insurance" for="" name="noInsurance"/> I/we have no insurance</p>
 
                        <p className="checkboxContent"> <input type="checkbox" className={this.props.Emedicare ? this.props.Emedicare : 'checktrue'}  defaultChecked={this.props.Cmedicare ? 'checked' : ''}  onChange={this.props.handleChange}  value="Medicare" for="" name="medicare"/> Medicare</p>
                        <p className="checkboxContent"> <input type="checkbox" className={this.props.EsupplementalHealth ? this.props.EsupplementalHealth : 'checktrue'}  defaultChecked={this.props.CsupplementalHealth ? 'checked' : ''} onChange={this.props.handleChange} value="Supplemental health" for="" name="supplementalHealth"/> Supplemental health </p>
                        <p className="checkboxContent"> <input type="checkbox" className={this.props.Elongtermcare ? this.props.Elongtermcare : 'checktrue'} defaultChecked={this.props.Clongtermcare ? 'checked' : ''} onChange={this.props.handleChange} value="Long term care" for="" name="longtermcare"/> Long term care</p> */}

                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" className={this.props.EnoInsurance ? this.props.EnoInsurance : 'checktrue'} defaultChecked={this.props.CnoInsurance ? 'checked' : ''} onChange={this.props.handleChange} value="I/we have no insurance" for="" name="noInsurance" /> I/we have no insurance
                                </span>
                                </span>
                            </p>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" className={this.props.Emedicare ? this.props.Emedicare : 'checktrue'} defaultChecked={this.props.Cmedicare ? 'checked' : ''} onChange={this.props.handleChange} value="Medicare" for="" name="medicare" /> Medicare
                                </span>
                                </span>
                            </p>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" className={this.props.EsupplementalHealth ? this.props.EsupplementalHealth : 'checktrue'} defaultChecked={this.props.CsupplementalHealth ? 'checked' : ''} onChange={this.props.handleChange} value="Supplemental health" for="" name="supplementalHealth" /> Supplemental health
                                </span>
                                </span>
                            </p>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" className={this.props.Elongtermcare ? this.props.Elongtermcare : 'checktrue'} defaultChecked={this.props.Clongtermcare ? 'checked' : ''} onChange={this.props.handleChange} value="Long term care" for="" name="longtermcare" /> Long term care
                                </span>
                                </span>
                            </p>


                        </div>
                    </div>


                    <div className="col-md-12 col-sm-12">

                        <table class="assestTable">
                            <tr>
                                <td>
                                    <p style={{ 'marginTop': '35px' }} className="checkboxContent">
                                        {/* <input type="checkbox" class={this.props.ElifeInsurance ? this.props.ElifeInsurance : 'checktrue'} defaultChecked={this.props.ClifeInsurance ? 'checked' : ''} onChange={this.props.handleChange} value="lifeInsurance" for="" name="lifeInsurance"/> Life insurance */}

                                        <span class="wpcf7-checkbox">
                                            <span class="wpcf7-list-item">
                                                <input type="checkbox" class={this.props.ElifeInsurance ? this.props.ElifeInsurance : 'checktrue'} defaultChecked={this.props.ClifeInsurance ? 'checked' : ''} onChange={this.props.handleChange} value="lifeInsurance" for="" name="lifeInsurance" /> Life insurance
                                </span>
                                        </span>


                                    </p>
                                </td>
                                <td>
                                    <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Type</label>
                                    <select value={this.props.lifeInType} id="lifeInType" name="lifeInType" onChange={this.props.handleChange} className={this.props.ElifeInType ? this.props.ElifeInType : 'form-control'}  >
                                        <option value=""> Select</option>
                                        <option value="Whole life">Whole life</option>
                                        <option value="Term">Term</option>
                                    </select>
                                </td>

                                <td>
                                    <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Amount</label>
                                    <NumberFormat
                                        className={this.props.Elifeamount ? this.props.Elifeamount : 'form-control'}
                                        id="lifeamount"
                                        name="lifeamount"
                                        type="text"
                                        placeholder=""
                                        value={this.props.lifeamount}
                                        onChange={this.props.handleChange}
                                        thousandSeparator={true}
                                    />
                                </td>

                            </tr>
                        </table>
                    </div>

                    {/* <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <div className="sideFix">
                                <p className="checkboxContent sidefixbox">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" class={this.props.Einotherbox ? this.props.Einotherbox : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.Cinotherbox ? 'checked' : ''} value="inotherbox" for="" name="inotherbox" /> Other
                                </span>
                                    </span>
                                </p>
                                <textarea
                                    className={this.props.Einother ? this.props.Einother : 'form-control'}
                                    id="inother"
                                    name="inother"
                                    value={this.props.inother}
                                    onChange={this.props.handleChange}
                                    placeholder="E.g., medical condition"
                                />
                            </div>
                        </div>
                    </div> */}

                    <div className="sideFix ">
                        <p style={{ marginTop: "-52px" }} className="checkboxContent sidefixbox">
                            {/* <input type="checkbox" className={this.props.EotherGoalServicecheck ? this.props.EotherGoalServicecheck : 'checktrue'} defaultChecked={this.props.CotherGoalServicecheck ? 'checked' : ''} onChange={this.props.handleChange} vaule="other Goal Service" name="otherGoalServicecheck" /> Other  */}
                            <div className="form-group">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item other12">
                                        <input type="checkbox" style={{ marginTop: "20px" }} class={this.props.Einotherbox ? this.props.Einotherbox : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.Cinotherbox ? 'checked' : ''} value="inotherbox" for="" name="inotherbox" /> Other
                                            </span>
                                </span>
                            </div>

                        </p>
                        {/* <input
                                        className="form-control"
                                        style={{ width: "100%" }}
                                        className={this.props.EotherGoalService ? this.props.EotherGoalService : 'form-control'}
                                        id="otherGoalService"
                                        name="otherGoalService"
                                        value={this.props.otherGoalService}
                                        placeholder="Other goals"
                                        onChange={this.props.handleChange} /> */}
                        <textarea
                            className="form-control"
                            style={{ width: "94%", marginLeft: "-10%", marginBottom: "20px", marginTop: "26px" }}
                            className={this.props.Einother ? this.props.Einother : 'form-control'}
                            id="inother"
                            name="inother"
                            value={this.props.inother}
                            placeholder="E.g., medical condition"
                            onChange={this.props.handleChange} />
                    </div>


                </div>


            </React.Fragment>
        )
    }
}

class Step9 extends React.Component {

    createInExp = () => {
        let InExp = []
        for (let i = 1; i <= 10; i++) {
            InExp.push(<option value={`${i}`}>{i}</option>)
        }
        return InExp
    }

    render() {
        if (this.props.currentStep !== 9) {
            return null
        }
        return (
            <React.Fragment>
                <h5>INVESTING DETAILS</h5>

                <div className="col-md-12 col-sm-12">

                    <div className="col-md-8 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Investment experience (1= novice / 10 = expert)</label>
                            <select value={this.props.experience_1_10} id="experience_1_10" name="experience_1_10" onChange={this.props.handleChange} className={this.props.Eexperience_1_10 ? this.props.Eexperience_1_10 : 'form-control'} >
                                <option value=""> Select</option>
                                {this.createInExp()}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <p className="checkboxContent">
                                {/* <input type="checkbox" class={this.props.EanalyticalInExperience ? this.props.EanalyticalInExperience : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.CanalyticalInExperience ? 'checked' : ''}   value="Yes" for="" name="analyticalInExperience"/> I am/we are very analytical (regardless of investment experience) */}

                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EanalyticalInExperience ? this.props.EanalyticalInExperience : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CanalyticalInExperience ? 'checked' : ''} value="Yes" for="" name="analyticalInExperience" /> I am/we are very analytical (regardless of investment experience)
                                </span>
                                </span>

                            </p>
                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Performance expectations</label>
                            <textarea
                                className={this.props.Eexpectations ? this.props.Eexpectations : 'form-control'}
                                id="expectations"
                                name="expectations"
                                type="text"
                                placeholder="E.g., returns, level of income, withdrawal rates, prefer to discuss, etc."
                                value={this.props.expectations}
                                onChange={this.props.handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Notable investment experiences (good and/or bad)</label>
                            <textarea
                                className={this.props.Eexperience_gb ? this.props.Eexperience_gb : 'form-control'}
                                id="experience_gb"
                                name="experience_gb"
                                value={this.props.experience_gb}
                                onChange={this.props.handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label style={{ fontWeight: 700, fontSize: "18px" }}>Investment performance goals (tick all that apply)</label>

                            {/* <p className="checkboxContent"> <input type="checkbox" class={this.props.EcapitalPreservation ? this.props.EcapitalPreservation : 'checktrue'}   onChange={this.props.handleChange} defaultChecked={this.props.CcapitalPreservation ? 'checked' : ''}   value="Capital preservation (lower returns are OK if volatility is low)" for="" name="capitalPreservation"/> Capital preservation (lower returns are OK if volatility is low)</p>
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.EinvestIncome ? this.props.EinvestIncome : 'checktrue'}    defaultChecked={this.props.CinvestIncome ? 'checked' : ''} onChange={this.props.handleChange} value="Income (income for retirement or other purposes is a top priority)" for="" name="investIncome"/> Income (income for retirement or other purposes is a top priority) </p>
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.EinvestGrowth ? this.props.EinvestGrowth : 'checktrue'} defaultChecked={this.props.CinvestGrowth ? 'checked' : ''} onChange={this.props.handleChange} value="Growth (willing to accept higher volatility for higher returns)" for="" name="investGrowth"/> Growth (willing to accept higher volatility for higher returns)</p>
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.EinvestGrowthIncome ? this.props.EinvestGrowthIncome : 'checktrue'} defaultChecked={this.props.CinvestGrowthIncome ? 'checked' : ''} onChange={this.props.handleChange} value="Growth + income (higher volatility acceptable if income is secure)" for="" name="investGrowthIncome"/> Growth + income (higher volatility acceptable if income is secure)</p>
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.EinvestAggressiveGrowth ? this.props.EinvestAggressiveGrowth : 'checktrue'}  defaultChecked={this.props.CinvestAggressiveGrowth ? 'checked' : ''} onChange={this.props.handleChange} value="Aggressive growth (returns are top priority and significant volatility is acceptable)" for="" name="investAggressiveGrowth"/> Aggressive growth (returns are top priority and significant volatility is acceptable)</p> */}

                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EcapitalPreservation ? this.props.EcapitalPreservation : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CcapitalPreservation ? 'checked' : ''} value="Capital preservation (lower returns are OK if volatility is low)" for="" name="capitalPreservation" /> Capital preservation (lower returns are OK if volatility is low)
                            </span>
                                </span>
                            </p>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EinvestIncome ? this.props.EinvestIncome : 'checktrue'} defaultChecked={this.props.CinvestIncome ? 'checked' : ''} onChange={this.props.handleChange} value="Income (income for retirement or other purposes is a top priority)" for="" name="investIncome" /> Income (income for retirement or other purposes is a top priority)
                            </span>
                                </span>
                            </p>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EinvestGrowth ? this.props.EinvestGrowth : 'checktrue'} defaultChecked={this.props.CinvestGrowth ? 'checked' : ''} onChange={this.props.handleChange} value="Growth (willing to accept higher volatility for higher returns)" for="" name="investGrowth" /> Growth (willing to accept higher volatility for higher returns)
                            </span>
                                </span>
                            </p>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EinvestGrowthIncome ? this.props.EinvestGrowthIncome : 'checktrue'} defaultChecked={this.props.CinvestGrowthIncome ? 'checked' : ''} onChange={this.props.handleChange} value="Growth + income (higher volatility acceptable if income is secure)" for="" name="investGrowthIncome" /> Growth + income (higher volatility acceptable if income is secure)
                            </span>
                                </span>
                            </p>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EinvestAggressiveGrowth ? this.props.EinvestAggressiveGrowth : 'checktrue'} defaultChecked={this.props.CinvestAggressiveGrowth ? 'checked' : ''} onChange={this.props.handleChange} value="Aggressive growth (returns are top priority and significant volatility is acceptable)" for="" name="investAggressiveGrowth" /> Aggressive growth (returns are top priority and significant volatility is acceptable)
                            </span>
                                </span>
                            </p>

                        </div>
                    </div>


                    <div className="col-md-8 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 500, fontSize: "18px", color: "black" }}>Current allocation to stocks and other risky assets</label>
                            <select value={this.props.currentAllocationStock} id="currentAllocationStock" name="currentAllocationStock" onChange={this.props.handleChange} className={this.props.EcurrentAllocationStock ? this.props.EcurrentAllocationStock : 'form-control'} >
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


class Step10 extends React.Component {

    createInExp = () => {
        let InExp = []
        for (let i = 1; i <= 10; i++) {
            InExp.push(<option value={`${i}`}>{i}</option>)
        }
        return InExp
    }

    render() {
        if (this.props.currentStep !== 10) {
            return null
        }
        return (
            <React.Fragment>
                <h5>RISK DETAILS</h5>

                <div className="col-md-12 col-sm-12">

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>How do you view your risk tolerance? </label>
                            {/* <p className="checkboxContent"> <input type="checkbox" class={this.props.EriskAggressive ? this.props.EriskAggressive : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.CriskAggressive ? 'checked' : ''} value="Aggressive (healthy appetite for risk)" for="" name="riskAggressive"/> Aggressive (healthy appetite for risk)</p>
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.EriskModerate ? this.props.EriskModerate : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.CriskModerate ? 'checked' : ''} value="Moderate (seek more balanced risk)" for="" name="riskModerate"/> Moderate (seek more balanced risk)</p>
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.EriskConservative ? this.props.EriskConservative : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.CriskConservative ? 'checked' : ''} value="Conservative (generally prefer less risk)" for="" name="riskConservative"/> Conservative (generally prefer less risk)</p> */}

                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EriskAggressive ? this.props.EriskAggressive : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CriskAggressive ? 'checked' : ''} value="Aggressive (healthy appetite for risk)" for="" name="riskAggressive" /> Aggressive (healthy appetite for risk)
                            </span>
                                </span>
                            </p>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EriskModerate ? this.props.EriskModerate : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CriskModerate ? 'checked' : ''} value="Moderate (seek more balanced risk)" for="" name="riskModerate" /> Moderate (seek more balanced risk)
                            </span>
                                </span>
                            </p>
                            <p className="checkboxContent">
                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EriskConservative ? this.props.EriskConservative : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CriskConservative ? 'checked' : ''} value="Conservative (generally prefer less risk)" for="" name="riskConservative" /> Conservative (generally prefer less risk)
                            </span>
                                </span>
                            </p>

                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Assuming your financial security would not be compromised, what is the maximum portfolio drawdown (decrease) you could tolerate?</label>
                            <select value={this.props.portfolioDrawdown} id="portfolioDrawdown" name="portfolioDrawdown" onChange={this.props.handleChange} className={this.props.EportfolioDrawdown ? this.props.EportfolioDrawdown : 'form-control'} >
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
                        <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Please score the importance of each factor:</label>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Preservation</label>
                                    <select value={this.props.riskPreservation} id="riskPreservation" name="riskPreservation" onChange={this.props.handleChange} className={this.props.EriskPreservation ? this.props.EriskPreservation : 'form-control'} >
                                        <option value=""> Select</option>
                                        {this.createInExp()}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Income</label>
                                    <select value={this.props.riskIncome} id="riskIncome" name="riskIncome" onChange={this.props.handleChange} className={this.props.EriskIncome ? this.props.EriskIncome : 'form-control'} >
                                        <option value=""> Select</option>
                                        {this.createInExp()}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Growth </label>
                                    <select value={this.props.riskGrowth} id="riskGrowth" name="riskGrowth" onChange={this.props.handleChange} className={this.props.EriskGrowth ? this.props.EriskGrowth : 'form-control'} >
                                        <option value=""> Select</option>
                                        {this.createInExp()}
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>How did you and your portfolio hold up during the last major market downturn (e.g., the credit crisis in 2008)?</label>
                            <textarea
                                className={this.props.ElastMarketDownturn ? this.props.ElastMarketDownturn : 'form-control'}
                                id="lastMarketDownturn"
                                name="lastMarketDownturn"
                                value={this.props.lastMarketDownturn}
                                onChange={this.props.handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col-sm-12">
                        <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>Please look at the example portfolios below and select the one with the most appealing risk-return profile over this hypothetical 10-year period.</label>
                        <div className="col-md-12 col-sm-12 riskportfolio">
                            <div className="form-group">


                                {/* <p className="checkboxContent"> <input type="checkbox" class={this.props.Eportfolio1 ? this.props.Eportfolio1 : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio1 ? 'checked' : ''} value="Portfolio 1 (most conservative)" for="" name="portfolio1"/> Portfolio 1 (most conservative)</p>
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.Eportfolio2 ? this.props.Eportfolio2 : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio2 ? 'checked' : ''} value="Portfolio 2" for="" name="portfolio2"/> Portfolio 2</p>
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.Eportfolio3 ? this.props.Eportfolio3 : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio3 ? 'checked' : ''} value="Portfolio 3" for="" name="portfolio3"/> Portfolio 3</p>
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.Eportfolio4 ? this.props.Eportfolio4 : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio4 ? 'checked' : ''} value="Portfolio 4" for="" name="portfolio4"/> Portfolio 4</p>
 
                        <p className="checkboxContent"> <input type="checkbox" class={this.props.Eportfolio5 ? this.props.Eportfolio5 : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio5 ? 'checked' : ''} value="Portfolio 5 (most aggressive)" for="" name="portfolio5"/> Portfolio 5 (most aggressive)</p> */}


                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" class={this.props.Eportfolio1 ? this.props.Eportfolio1 : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio1 ? 'checked' : ''} value="Portfolio 1 (most conservative)" for="" name="portfolio1" /> Portfolio 1 (most conservative)
                            </span>
                                    </span>
                                </p>
                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" class={this.props.Eportfolio2 ? this.props.Eportfolio2 : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio2 ? 'checked' : ''} value="Portfolio 2" for="" name="portfolio2" /> Portfolio 2
                            </span>
                                    </span>
                                </p>
                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" class={this.props.Eportfolio3 ? this.props.Eportfolio3 : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio3 ? 'checked' : ''} value="Portfolio 3" for="" name="portfolio3" /> Portfolio 3
                            </span>
                                    </span>
                                </p>
                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" class={this.props.Eportfolio4 ? this.props.Eportfolio4 : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio4 ? 'checked' : ''} value="Portfolio 4" for="" name="portfolio4" /> Portfolio 4
                            </span>
                                    </span>
                                </p>
                                <p className="checkboxContent">
                                    <span class="wpcf7-checkbox">
                                        <span class="wpcf7-list-item">
                                            <input type="checkbox" class={this.props.Eportfolio5 ? this.props.Eportfolio5 : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.Cportfolio5 ? 'checked' : ''} value="Portfolio 5 (most aggressive)" for="" name="portfolio5" /> Portfolio 5 (most aggressive)
                            </span>
                                    </span>
                                </p>


                            </div>
                        </div>
                        <div className="col-md-10 col-sm-12 riskportfolio">
                            <img style={{ 'marginBottom': '44px' }} src={portfolioimg} />
                        </div>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}


class Step11 extends React.Component {
    render() {
        if (this.props.currentStep !== 11) {
            return null
        }
        return (
            <React.Fragment>
                <h5>OTHER QUESTIONS (OPTIONAL)</h5>

                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>How did you discover SET IT AND LEAVE IT?</label>

                        <p className="checkboxContent">
                            {/* <input type="checkbox" class={this.props.Eaaii ? this.props.Eaaii : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.Caaii ? 'checked' : ''} value="American Association of Individual Investors (AAII)" for="" name="aaii"/> American Association of Individual Investors (AAII) */}

                            <span class="wpcf7-checkbox">
                                <span class="wpcf7-list-item">
                                    <input type="checkbox" class={this.props.Eaaii ? this.props.Eaaii : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.Caaii ? 'checked' : ''} value="American Association of Individual Investors (AAII)" for="" name="aaii" /> American Association of Individual Investors (AAII)
                            </span>
                            </span>

                        </p>

                        <p className="checkboxContent">
                            {/* <input type="checkbox" class={this.props.EadvisorPerspectives ? this.props.EadvisorPerspectives : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.CadvisorPerspectives ? 'checked' : ''} value="Advisor Perspectives" for="" name="advisorPerspectives"/> Advisor Perspectives  */}
                            <span class="wpcf7-checkbox">
                                <span class="wpcf7-list-item">
                                    <input type="checkbox" class={this.props.EadvisorPerspectives ? this.props.EadvisorPerspectives : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CadvisorPerspectives ? 'checked' : ''} value="Advisor Perspectives" for="" name="advisorPerspectives" /> Advisor Perspectives
                            </span>
                            </span>
                        </p>

                        <p className="checkboxContent">
                            {/* <input type="checkbox" class={this.props.EalphaArchiect ? this.props.EalphaArchiect : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.CalphaArchiect ? 'checked' : ''} value="Alpha Architect" for="" name="alphaArchiect"/> Alpha Architect  */}

                            <span class="wpcf7-checkbox">
                                <span class="wpcf7-list-item">
                                    <input type="checkbox" class={this.props.EalphaArchiect ? this.props.EalphaArchiect : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CalphaArchiect ? 'checked' : ''} value="Alpha Architect" for="" name="alphaArchiect" /> Alpha Architect
                            </span>
                            </span>

                        </p>

                        <div className="sideFix">
                            <p style={{ 'marginTop': '15px', marginLeft: '10px' }} className="checkboxContent sidefixbox">
                                {/* <input type="checkbox" class={this.props.Ereferral ? this.props.Ereferral : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.Creferral ? 'checked' : ''} value="Referral" for="" name="referral"/> Referral */}

                                <span class="wpcf7-checkbox" >
                                    <span class="wpcf7-list-item" style={{ margin: '-12px' }}>
                                        <input type="checkbox" class={this.props.Ereferral ? this.props.Ereferral : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.Creferral ? 'checked' : ''} value="Referral" for="" name="referral" /> Referral
                            </span>
                                </span>


                            </p>
                            <input
                                style={{ 'width': '40%', marginLeft: "1%" }}
                                className={this.props.EreferralContent ? this.props.EreferralContent : 'form-control sidefixbox'}
                                id="referralContent"
                                name="referralContent"
                                value={this.props.referralContent}
                                onChange={this.props.handleChange}
                                placeholder="Source"
                            />
                        </div>

                        <div className="sideFix" style={{ marginTop: "31px" }}>
                            <p style={{ 'marginTop': '15px' }} className="checkboxContent sidefixbox">
                                {/* <input type="checkbox" class={this.props.EotherOthers ? this.props.EotherOthers : 'checktrue'}  onChange={this.props.handleChange} defaultChecked={this.props.CotherOthers ? 'checked' : ''} value="Other" for="" name="otherOthers"/> Other  */}

                                <span class="wpcf7-checkbox">
                                    <span class="wpcf7-list-item">
                                        <input type="checkbox" class={this.props.EotherOthers ? this.props.EotherOthers : 'checktrue'} onChange={this.props.handleChange} defaultChecked={this.props.CotherOthers ? 'checked' : ''} value="Other" for="" name="otherOthers" /> Other
                        </span>
                                </span>


                            </p>
                            <input
                                style={{ 'width': '40%', marginLeft: "2%" }}
                                className="form-control"
                                className={this.props.EotherOthersContent ? this.props.EotherOthersContent : 'form-control'}
                                id="otherOthersContent"
                                name="otherOthersContent"
                                value={this.props.otherOthersContent}
                                onChange={this.props.handleChange}
                            />

                        </div>


                    </div>
                </div>

                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>What attracted you to SET IT AND LEAVE IT?</label>
                        <textarea
                            className={this.props.EwhatAttracted ? this.props.EwhatAttracted : 'form-control'}
                            id="whatAttracted"
                            name="whatAttracted"
                            value={this.props.whatAttracted}
                            onChange={this.props.handleChange}
                            placeholder="E.g., innovation, academic rigor, avoid conflicts of interest and salesmanship, etc."
                        />
                    </div>
                </div>

                <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                        <label htmlFor="name" style={{ fontWeight: 700, fontSize: "18px" }}>We welcome suggestions to help us improve this questionnaire:</label>
                        <textarea
                            className={this.props.EimproveQuestionnaire ? this.props.EimproveQuestionnaire : 'form-control'}
                            id="improveQuestionnaire"
                            name="improveQuestionnaire"
                            value={this.props.improveQuestionnaire}
                            onChange={this.props.handleChange}
                            placeholder="E.g., shorter, longer, we missed something, etc."
                        />
                    </div>
                </div>



            </React.Fragment>
        )
    }
}

export default withRouter(Profile);
