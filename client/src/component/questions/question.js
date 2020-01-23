import React, { Component } from 'react';
import {Link,NavLink,withRouter, BrowserRouter as Router } from 'react-router-dom'

import UserService from '../../reactservice/UserService'
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const API = new UserService();
class Questions extends Component{
    
   constructor(props){
        let fields1=API.getProfile();
        let fields2=API.getProfile().data;
        let newFields;
        if(fields1.data){
            newFields=fields2;
        }else{
            newFields=fields1;
        }
        // console.log('f1:',fields1);
        // console.log('f2:',fields2);
       super(props);
       this.props.onHeaderHover(true);
       this.state ={
           open:false,
           fields:newFields,          
           errors: {},
           showAlert:false,
            currentStep: 1,
            name:  '',
            address: '',
            phone: '',
            reasonGoalConsultation:'',
            reasonSIALI:'',
            email:'',
            age:'',
            married:'',
            Kids:'',
            grandkid:'',
            pets:'',
            liquid:'',
            ss:'',
            pension:'',
            others:'',
            annualspend:'',
            potential:'',
            health:'',
            longtermcare:'',
            lifeamount:'',
            inother:'',
            goal:'',
            experience_1_10:'',
            expectations:'',
            experience_gb:'',
            reaction:'',
            risk_tolerance:'',
            risk_select:'',
            risk_score:'',
            otherRelevent:''
       };
     this.handleSubmit = this.handleSubmit.bind(this);
     this.getQuestionLists = this.getQuestionLists.bind(this);

    this.handleChange = this.handleChange.bind(this)
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
    console.log('f2:',this.state.fields);
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

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
    
  }

  handleSubmit = (event) => {
    event.preventDefault()
    var elmnt = document.getElementById("profileDashboard");
    elmnt.scrollIntoView({behavior:"smooth"});
    const questionInfoVo ={
        'name': this.state.name,
        'address': this.state.address,
        'phone': this.state.phone,
        'reasonGoalConsultation':this.state.reasonGoalConsultation,
        'reasonSIALI':this.state.reasonSIALI,
        'email':this.state.email,
        'age':this.state.age,
        'married':this.state.married,
        'Kids':this.state.Kids,
        'grandkid':this.state.grandkid,
        'pets':this.state.pets,
        'liquid':this.state.liquid,
        'ss':this.state.ss,
        'pension':this.state.pension,
        'others':this.state.others,
        'annualspend':this.state.annualspend,
        'potential':this.state.potential,
        'health':this.state.health,
        'longtermcare':this.state.longtermcare,
        'lifeamount':this.state.lifeamount,
        'inother':this.state.inother,
        'goal':this.state.goal,
        'experience_1_10':this.state.experience_1_10,
        'expectations':this.state.expectations,
        'experience_gb':this.state.experience_gb,
        'reaction':this.state.reaction,
        'risk_tolerance':this.state.risk_tolerance,
        'risk_select':this.state.risk_select,
        'risk_score':this.state.risk_score,
        'otherRelevent':this.state.otherRelevent,
        'datetime':new Date(),
        'id': this.state.fields._id,
        'loginuser': this.state.fields.username
    }

    console.log('Details:',questionInfoVo);
        API.submitQuestionService(questionInfoVo)
        .then((result) => { 
          this.getQuestionLists();
            if(result.data.success){
                this.setState({
                    showAlert:true,
                    color:'green',
                    message: result.data.message
                });
              
            }else{
                this.setState({
                    showAlert:true,
                    color:'#b31313d6',
                    message: result.data.message
                });
    
            } 
         }).catch(err => {
             console.log('xxxxxxxxxxxx......xxx:',err)
        }) 

    // alert(`Your registration detail: ${questionInfoVo}`);

  }

  get previousButton(){
    let currentStep = this.state.currentStep
    if(currentStep !==1){
      return (
        <button className="btn btn-primary previousbtn" type="button" onClick={this._prev}><i class="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Back</button>
      )
    }
    return null
  }

  get nextButton(){
    let currentStep = this.state.currentStep
    if(currentStep <=9){
      return (
          <div>
        <button onClick={this.handleSubmit} className={`btn btn-success saveexit class${this.state.currentStep}`}>Save & Exit</button>
        <button className={`btn btn-primary nextbtn float-right classnext${this.state.currentStep}`} type="button" onClick={this._next}>Next <i class="fa fa-angle-double-right" aria-hidden="true"></i>
 </button>
        </div>        
      )
    }
    return null
  }


getQuestionLists() {

    const Userdata ={
            'userId':this.state.fields._id
    }

    API.getQuestionService(Userdata)
          .then(res => {
              console.log('frontres:',res.data.data[0]);
              this.setState({ 
                Questionfields: res.data.data[0],
                name: res.data.data[0].name,
                address: res.data.data[0].address,
                phone: res.data.data[0].phone,
                reasonGoalConsultation:res.data.data[0].reasonGoalConsultation,
                reasonSIALI:res.data.data[0].reasonSIALI,
                email:res.data.data[0].email,
                age:res.data.data[0].age,
                married:res.data.data[0].married,
                Kids:res.data.data[0].Kids,
                grandkid:res.data.data[0].grandkid,
                pets:res.data.data[0].pets,
                liquid:res.data.data[0].liquid,
                ss:res.data.data[0].ss,
                pension:res.data.data[0].pension,
                others:res.data.data[0].others,
                annualspend:res.data.data[0].annualspend,
                potential:res.data.data[0].potential,
                health:res.data.data[0].health,
                longtermcare:res.data.data[0].longtermcare,
                lifeamount:res.data.data[0].lifeamount,
                inother:res.data.data[0].inother,
                goal:res.data.data[0].goal,
                experience_1_10:res.data.data[0].experience_1_10,
                expectations:res.data.data[0].expectations,
                experience_gb:res.data.data[0].experience_gb,
                reaction:res.data.data[0].reaction,
                risk_tolerance:res.data.data[0].risk_tolerance,
                risk_select:res.data.data[0].risk_select,
                risk_score:res.data.data[0].risk_score,
                otherRelevent:res.data.data[0].otherRelevent
            });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }

componentDidMount(){
    this.getQuestionLists();
}

logout = () => {
    API.logout();
    this.props.history.replace('/front/register');
}

render(){
        // console.log('f:',this.state.fields);
        return(
                   <div className="profile-section">        
                    <section id="dashboard-main">
                        <div className="container">
         
                            
                            <h2 style={{textAlign:'center'}}>Questionnaire</h2>
                            
                            <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                    <nav className="woocommerce-MyAccount-navigation left_panels">
                                        <ul>
                                            <li >
                                            <NavLink activeClassName="is-active" to={"/front/profile"}><i className="fa fa-user-circle aj_fa" aria-hidden="true"></i>My details</NavLink>
                                            </li>
                                            <li>
                                                <NavLink activeClassName="is-active" to={"/front/questions"}><i class="fa fa-question-circle aj_fa" aria-hidden="true"></i>Questions</NavLink>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" onClick={this.logout.bind(this)}><i className="fa fa-address-book aj_fa" aria-hidden="true"></i>Logout</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="dashboard-content" id="profileDashboard">
                                        <div class="row">
                                          <div class="col-md-3">
                                             <div class="question-left-tabs">
                                               <ul>
                                                   <li>  <span className={this.state.currentStep == 2 ? 'active' : ''}>Contact</span> </li>
                                                   <li>  <span className={this.state.currentStep == 3 ? 'active' : ''}>Personal</span> </li>
                                                   <li>  <span className={this.state.currentStep == 4 ? 'active' : ''}>ASSETS</span> </li>
                                                   <li>  <span className={this.state.currentStep == 5 ? 'active' : ''}>BUDGET</span> </li>
                                                   <li>  <span className={this.state.currentStep == 6 ? 'active' : ''}>INSURANCE</span> </li>
                                                   <li>  <span className={this.state.currentStep == 7 ? 'active' : ''}>INVESTING</span> </li>
                                                   <li>  <span className={this.state.currentStep == 8 ? 'active' : ''}>RISK</span> </li>
                                                   <li>  <span className={this.state.currentStep == 9 ? 'active' : ''}>OTHER</span> </li>
                                               </ul>
                                             </div>
                                    
                                          </div> 
                                           {/* col-md-3 closed  */}

                                         <div class="col-md-9">
                                         { this.state.showAlert	? (<div style={{background:this.state.color}} className="Idmessage">{this.state.message}</div>) : '' }    
                                         <div className="row dashboard-content-inner">
                                     
      <form className="row" onSubmit={this.handleSubmit}>

        <Step1 
           currentStep={this.state.currentStep} 
        />

        <Step2 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          name={this.state.name}
          address={this.state.address}
          phone={this.state.phone}
          email={this.state.email}
          reasonGoalConsultation={this.state.reasonGoalConsultation}
          reasonSIALI={this.state.reasonSIALI}
        />
        <Step3 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            age={this.state.age}
            married={this.state.married}
            Kids={this.state.Kids}
            grandkid={this.state.grandkid}
            pets={this.state.pets}
        />
        <Step4 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          liquid={this.state.liquid}
          ss={this.state.ss}
          pension={this.state.pension}
          others={this.state.others}
          canSubmit={this.state.canSubmit}
        />
        <Step5 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          annualspend={this.state.annualspend}
          potential={this.state.potential}
          canSubmit={this.state.canSubmit}
        />

        <Step6 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            health={this.state.health}
            longtermcare={this.state.longtermcare}
            lifeamount={this.state.lifeamount}
            inother={this.state.inother}
            canSubmit={this.state.canSubmit}
        />

        <Step7 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            goal={this.state.goal}
            experience_1_10={this.state.experience_1_10}
            expectations={this.state.expectations}
            experience_gb={this.state.experience_gb}
            canSubmit={this.state.canSubmit}
        />

        
        <Step8 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            reaction={this.state.reaction}
            risk_tolerance={this.state.risk_tolerance}
            risk_select={this.state.risk_select}
            risk_score={this.state.risk_score}
            canSubmit={this.state.canSubmit}
        />

        <Step9
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            otherRelevent={this.state.otherRelevent}
            canSubmit={this.state.canSubmit}
        />

        

        {this.previousButton}
        {this.nextButton}
        <input type="hidden" ref="id" className="form-control" name="id" value={this.state.fields._id}/>
        <input type="hidden" ref="loginuser" className="form-control" name="loginuser" value={this.state.fields.username}/>
 
      </form>
                                           
                                        </div>
                                         </div>

                                        </div>
                                        
                 
                                    </div>
                                </div>
                            </div>
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
      <h5>PREFACE</h5>
      <div className="col-md-12 col-sm-12">
              <div className="col-md-12 col-sm-12"> 
              <div className="form-group">
                <p> In order to make your free consultation as productive as possible, please fill out the following 
                    questionnaire. Our goal is to obtain a high-level understanding of your financial situation, risk
                    profile, needs, and goals.</p>
              </div>
             </div> 
             <div className="form-group">
             <h6>Please note:</h6>
             <ul className="preface_list">
                <li>- This survey is broken into 8 sections and should take approximately 15-20 minutes to complete.</li>
                <li>- Exact numbers are not required and we do not expect you to know the answer to each question. So please use estimates or simply state you are not sure to some questions.</li>
                <li>- Our time is valuable and we are happy to help.</li>
                <li>- Respectfully ask you fill this out in good faith.</li>
                <li>- If you just have a quick question or two, then please use our contact form.</li>
             </ul>
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
            onChange={this.props.handleChange} />
        </div>       
        </div>

        <div className="col-md-12 col-sm-12">
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            className="form-control"
            id="phone"
            name="phone"
            type="number"
            placeholder="Enter phone number"
            value={this.props.phone}
            onChange={this.props.handleChange}
          />
        </div>
        </div>

        <div className="col-md-12 col-sm-12">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            id="email"
            name="email"
            type="text"
            placeholder="Enter email"
            value={this.props.email}
            onChange={this.props.handleChange}
          />
        </div>
        </div>

        <div className="col-md-12 col-sm-12">
        <div className="form-group">
          <label htmlFor="reasonGoalConsultation"> Reason for reaching out + goals for this consultation:</label>
            <textarea 
            className="form-control"
            id="reasonGoalConsultation"
            name="reasonGoalConsultation" 
            value={this.props.reasonGoalConsultation} 
            onChange={this.props.handleChange} />
        </div>       
        </div>

        <div className="col-md-12 col-sm-12">
        <div className="form-group">
          <label htmlFor="reasonSIALI"> How you found and reason for selecting SIALI:</label>
            <textarea 
            className="form-control"
            id="reasonSIALI"
            name="reasonSIALI" 
            value={this.props.reasonSIALI} 
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
      return(
      <React.Fragment>
           <h5>PERSONAL DETAILS</h5>
          

        <div className="col-md-12 col-sm-12">
            <div className="row">
            <div className="col-md-3 col-sm-12"> 
            <div className="form-group">
            <label htmlFor="name">Age</label>
            <input
                className="form-control"
                id="age"
                name="age"
                type="text"
                placeholder="Age (24)"
                value={this.props.age}
                onChange={this.props.handleChange}
            />
            </div>
            </div>
 
            <div className="col-md-3 col-sm-12">
            <div className="form-group">
            <label htmlFor="name">Married</label>
            {/* <input
                className="form-control"
                id="married"
                name="married"
                type="text"
                placeholder="Yes/No"
                value={this.props.married}
                onChange={this.props.handleChange}
            /> */}

               <select value={this.props.married}  id="married" name="married" onChange={this.props.handleChange}  className="form-control" >
                  <option value=""> Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No"> No </option>
                </select>

            </div>
            </div>

            <div className="col-md-3 col-sm-12">
            <div className="form-group">
            <label htmlFor="name">Kids</label>
            <input
                className="form-control"
                id="kid"
                name="kid"
                type="text"
                placeholder="(2)"
                value={this.props.kid}
                onChange={this.props.handleChange}
            />
            </div>
            </div>

            <div className="col-md-3 col-sm-12">
            <div className="form-group">
            <label htmlFor="name">Grand Kids</label>
            <input
                className="form-control"
                id="grandkid"
                name="grandkid"
                type="text"
                placeholder="(2)"
                value={this.props.grandkid}
                onChange={this.props.handleChange}
            />
            </div>
            </div>

            <div className="col-md-3 col-sm-12">
            <div className="form-group">
            <label htmlFor="name">Pets</label>
            <input
                className="form-control"
                id="pets"
                name="pets"
                type="text"
                placeholder="(2)"
                value={this.props.pets}
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
  
  class Step4 extends React.Component {
    render() {
      if (this.props.currentStep !== 4) {
        return null
      } 
      return(
      <React.Fragment>
           <h5>ASSETS DETAILS</h5>
          
           <div className="col-md-12 col-sm-12">
            <div className="row">
                <div className="col-md-6 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Liquid</label>
                <input
                    className="form-control"
                    id="liquid"
                    name="liquid"
                    type="text"
                    placeholder="HOUSE: Own, mtg, rent?"
                    value={this.props.liquid}
                    onChange={this.props.handleChange}
                />
                </div>
                </div>

                <div className="col-md-6 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">SS</label>
                <input
                    className="form-control"
                    id="ss"
                    name="ss"
                    type="text"
                    placeholder=""
                    value={this.props.ss}
                    onChange={this.props.handleChange}
                />
                </div>
                </div>

        </div>    

        <div className="row">
                <div className="col-md-6 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Pension</label>
                <input
                    className="form-control"
                    id="pension"
                    name="pension"
                    type="text"
                    placeholder=""
                    value={this.props.pension}
                    onChange={this.props.handleChange}
                />
                </div>
                </div>

                <div className="col-md-6 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Other</label>
                <input
                    className="form-control"
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


    
  class Step5 extends React.Component {
    render() {
      if (this.props.currentStep !== 5) {
        return null
      } 
      return(
      <React.Fragment>
           <h5>BUDGET DETAILS</h5>
          
           <div className="col-md-12 col-sm-12">
           
                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Annual spend</label>
                <input
                    className="form-control"
                    id="annualspend"
                    name="annualspend"
                    type="text"
                    placeholder=""
                    value={this.props.annualspend}
                    onChange={this.props.handleChange}
                />
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Potential or known one-off expenses</label>
                <textarea 
                    className="form-control"
                    id="potential"
                    name="potential" 
                    value={this.props.potential} 
                    onChange={this.props.handleChange} 
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
                <label htmlFor="name">Health</label>
                <input
                    className="form-control"
                    id="health"
                    name="health"
                    type="text"
                    placeholder=""
                    value={this.props.health}
                    onChange={this.props.handleChange}
                />
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Long term care</label>
                <input
                    className="form-control"
                    id="longtermcare"
                    name="longtermcare"
                    type="text"
                    placeholder=""
                    value={this.props.longtermcare}
                    onChange={this.props.handleChange}
                />
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Life -> amount</label>
                <input
                    className="form-control"
                    id="lifeamount"
                    name="lifeamount"
                    type="text"
                    placeholder=""
                    value={this.props.lifeamount}
                    onChange={this.props.handleChange}
                />
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Other </label>
                <textarea 
                    className="form-control"
                    id="inother"
                    name="inother" 
                    value={this.props.inother} 
                    onChange={this.props.handleChange} 
                />
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
      return(
      <React.Fragment>
           <h5>INVESTING DETAILS</h5>
        
           <div className="col-md-12 col-sm-12">
           
                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Goals</label>
                <textarea 
                    className="form-control"
                    id="goal"
                    name="goal" 
                    value={this.props.goal} 
                    onChange={this.props.handleChange} 
                />
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Experience (1-10)</label>
                <input
                    className="form-control"
                    id="experience_1_10"
                    name="experience_1_10"
                    type="text"
                    placeholder=""
                    value={this.props.experience_1_10}
                    onChange={this.props.handleChange}
                />
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Expectations</label>
                <input
                    className="form-control"
                    id="expectations"
                    name="expectations"
                    type="text"
                    placeholder=""
                    value={this.props.expectations}
                    onChange={this.props.handleChange}
                />
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Experiences (good & bad) </label>
                <textarea 
                    className="form-control"
                    id="experience_gb"
                    name="experience_gb" 
                    value={this.props.experience_gb} 
                    onChange={this.props.handleChange} 
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
      return(
      <React.Fragment>
           <h5>RISK DETAILS</h5>
        
           <div className="col-md-12 col-sm-12">
           
                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Reaction to last turbulent period?</label>
                <textarea 
                    className="form-control"
                    id="reaction"
                    name="reaction" 
                    value={this.props.reaction} 
                    onChange={this.props.handleChange} 
                />
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Risk tolerance</label>
                <select value={this.props.risk_tolerance}  id="risk_tolerance" name="risk_tolerance" onChange={this.props.handleChange}  className="form-control" >
                  <option value=""> Select</option>
                  <option value="Healthy appetite"> Healthy appetite  </option>
                  <option value="balanced"> balanced   </option>
                  <option value="little"> little </option>
                  <option value="None (vs returns)"> None (vs returns) </option>
                </select>
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Select</label>
                  <select value={this.props.risk_select}  id="risk_select" name="risk_select" onChange={this.props.handleChange}  className="form-control" >
                    <option value=""> Select</option>
                    <option value="Return/value"> Return/value  </option>
                    <option value="profiles"> profiles   </option>
                  </select>
                </div>
                </div>

                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Score</label>
                  <select value={this.props.risk_score}  id="risk_score" name="risk_score" onChange={this.props.handleChange}  className="form-control" >
                    <option value=""> Select</option>
                    <option value="Preservation">Preservation</option>
                    <option value="Income"> Income </option>
                    <option value="Growth"> Growth </option>
                  </select>
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
                <div className="col-md-12 col-sm-12"> 
                <div className="form-group">
                <label htmlFor="name">Other relevant details: Med conditions, etc.</label>
                <textarea 
                    className="form-control"
                    id="otherRelevent"
                    name="otherRelevent" 
                    value={this.props.otherRelevent} 
                    onChange={this.props.handleChange} 
                />
                </div>
                </div>
        </div>
  
      </React.Fragment>
    )
   }
  }



export default withRouter (Questions);
