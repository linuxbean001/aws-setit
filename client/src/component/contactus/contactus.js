import React, { Component } from 'react';
import contact_banner from '../../assets/img/contact-banner-bg.jpg';
import UserService from '../../reactservice/UserService'
const API = new UserService();
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
class Contactus extends Component{
    constructor(props){
        super(props);
        this.props.onHeaderHover(true);
        this.state ={
            isHide:false,
            fields: [],        
            errors: {},
            showAlert:false
        }
        this.ContactusMe = this.ContactusMe.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }
    
componentDidMount(){
    window.scrollTo(0, 0);
    document.title = "CONTACT - SET IT AND LEAVE IT"
}

resetForm(){
    this.setState({ fields:[] });  
}

contactusvalidationCheck(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(!fields["message"]){
        formIsValid = false;
        errors["message"] = "error_sell form-control";
    }
    if(!fields["name"]){
        formIsValid = false;
        errors["name"] = "error_sell form-control";
    }
    if(!fields["email"]){
        formIsValid = false;
        errors["email"] = "error_sell form-control cstm-ct";
    }
    if(fields["email"]){
            if (reg.test(fields["email"]) === false){
                formIsValid = false;
                errors["email"] = "error_sell form-control cstm-ct";
            }
    }  

    // if(!fields["investor"]){
    //     formIsValid = false;
    //     errors["investor"] = "error_sell";
    // }

    this.setState({errors:errors});
    return formIsValid;
        
}

ContactusMe(e){
    console.log('first');
    if(this.contactusvalidationCheck()){ 

         console.log('first:', this.refs.id.value);
        const userInfoVo ={
            'name': this.state.fields.name,
            'email': this.state.fields.email,
            'message': this.state.fields.message,
            'hireyou': this.state.fields.hireyou,
            'question': this.state.fields.question,
            'feedback': this.state.fields.feedback,
            'business_synergy': this.state.fields.business_synergy,
            'other': this.state.fields.other,
            'datetime':new Date(),
            'userid': this.refs.id.value
        }
        API.contactUsService(userInfoVo).then((result) => {
                console.log('xxx res:', result );
                this.resetForm();
                this.setState({
                    showAlert:true,
                    color:'green',
                    message: result.data.message
                });

        }).catch(err => {
            console.log('xxx new:', err);
        }) 
    }
}



contactushandleChange(field, e) { 
    let fields = this.state.fields;
    fields[field] = e.target.value;    
    this.setState({ fields });
    console.log('Contactfields..xx...xx:', fields);
}

    
render(){

    if (API.loggedIn()){
        API.getProfile();
    }

         return(
                <div className="contact-section">
                     <section id="inner-page-banner">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="inner-page-banner-heading">
                                    <h2>Contact Us</h2>
                                </div>

                                <div class="inner-page-banner-image">
                                    <img src={contact_banner}/>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="blouq-content">
                        <div class="container">
                            <div class="blouq-content-inner">
                                <h5>Have a question? Want to give some feedback? Whatever the reason, please use the form or contact information below to get in touch.</h5>
                            </div>
                        </div>
                    </section>

                    
                    <section class="contact-form-section">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="contact-form-box">
                                        <form >
                                       
                                            <div class="form-group">
                                                <label> Tell us what you’re up to <span> (message) </span> </label>
                                                <textarea className={this.state.errors["message"] ? this.state.errors["message"] : 'form-control'} onChange={this.contactushandleChange.bind(this, "message")} rows="4" cols="50" placeholder="Message">{this.state.fields["message"] ? this.state.fields["message"] :'' }</textarea>
                                            </div>

                                            <div class="form-group">
                                                <label> Tick a box <span> (optional)</span> </label>
                                                <p> <input type="checkbox" onChange={this.contactushandleChange.bind(this, "hireyou")} value={this.state.fields["hireyou"] ? this.state.fields["hireyou"] :'I want to hire you' } for="" name="hireyou"/> I want to hire you </p>
                                                <p> <input type="checkbox" onChange={this.contactushandleChange.bind(this, "question")} value={this.state.fields["question"] ? this.state.fields["question"] :'I have a question' } for="" name="question"/> I have a question </p>
                                                <p> <input type="checkbox" onChange={this.contactushandleChange.bind(this, "feedback")} value={this.state.fields["feedback"] ? this.state.fields["feedback"] :'I have feedback' } for="" name="feedback"/> I have feedback </p>
                                                <p> <input type="checkbox" onChange={this.contactushandleChange.bind(this, "business_synergy")} value={this.state.fields["business_synergy"] ? this.state.fields["business_synergy"] :'Business synergy' } for="" name="business_synergy"/> Business synergy </p>
                                                <p> <input type="checkbox" onChange={this.contactushandleChange.bind(this, "other")} value={this.state.fields["other"] ? this.state.fields["other"] :'Other' } for="" name="other"/> Other </p>
                                            </div>

                                            <div class="form-group">
                                                <label> Contact details <span> (required but kept private) </span> </label>
                                                <input type="text" for="name" onChange={this.contactushandleChange.bind(this, "name")}  value={this.state.fields["name"] ? this.state.fields["name"] :'' } className={this.state.errors["name"] ? this.state.errors["name"] : 'form-control'} placeholder="Name"/>
                                                <input type="email" for="email" onChange={this.contactushandleChange.bind(this, "email")} value={this.state.fields["email"] ? this.state.fields["email"] :'' } className={this.state.errors["email"] ? this.state.errors["email"] : 'form-control cstm-ct'} placeholder="Email"/>
                                            </div>

                                            <input type="hidden" ref="id" class="form-control" name="id" onChange={this.contactushandleChange.bind(this, "id")} defaultValue={API.loggedIn() ? API.getProfile().data._id : '0'}/>

                                             <div class="submit-btn">
                                                <button onClick={this.ContactusMe} type="button" class="btn"> SEND </button>
                                            </div>
                                             
                                        </form>
                                        { this.state.showAlert	? (<div style={{background:this.state.color}} className="IdmessageContact">{this.state.message}</div>) : '' }
                                        
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="contact-detail">
                                        <h3> CONTACT DETAILS </h3>
                                        <div class="c-detail">
                                            <p> Phone: <span> 1-866-900-5050 </span> </p>
                                            <p> Email: <span> <a href="mailto: info@setitandleaveit.com">info@setitandleaveit.com</a>  </span> </p>
                                           
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
export default Contactus;