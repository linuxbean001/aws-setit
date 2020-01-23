import React, { Component } from 'react';
import Adminsidebar from '../../../adminsidebar';
import AdminService from '../../../../Aservice/adminservice'
const API = new AdminService();
class AddSlider extends Component{
    constructor(props){
        super(props);
        this.state ={
            isHide:false,
            fields: [],        
            errors: {},
            showAlert:false,
            sliderTitle:'',
            sliderImage:''
        }
        this.AddSliderFuc = this.AddSliderFuc.bind(this);
        this.SliderhandleChange1 = this.SliderhandleChange1.bind(this);
    }


AddSliderFucCheck(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(!fields["sliderTitle"]){
        formIsValid = false;
        errors["sliderTitle"] = "error_sell form-control";
    }

    // if(!fields["sliderImage"]){
    //     formIsValid = false;
    //     errors["sliderImage"] = "error_sell form-control";
    // }

    this.setState({errors:errors});
    return formIsValid;   
}

AddSliderFuc(e){
    
    if(this.AddSliderFucCheck()){ 
        // const sliderInfoVo = {
        //     'sliderTitle': this.state.fields.sliderTitle,
        //     'datetime':new Date()
        // }

        var sliderInfoVo = new FormData()
        sliderInfoVo.append('sliderTitle', this.state.fields.sliderTitle)
        sliderInfoVo.append('image', this.state.sliderImage)
        sliderInfoVo.append('datetime', new Date())

        API.AdminAddSlider(sliderInfoVo).then((result) => {
                console.log('xxx res:', result );
                this.props.history.replace('/admin/sliderlist');
        }).catch(err => {
            console.log('xxx new:', err);
        }) 
    }
}



SliderhandleChange(field, e) { 
    console.log('field:',field);
    console.log('e:',e);
    let fields = this.state.fields;
    fields[field] = e.target.value;    
    this.setState({ fields });
    console.log('sliderfields..xx...xx:', fields);
}

SliderhandleChange1(e) { 
    this.setState({sliderImage:e.target.files[0]});
}

    
render(){

         return(
                <div className="contact-section">
                    <div className="dashboard-section">   
                        <section id="main-dashboard">
                            <Adminsidebar />
                            <div class="dashboard-content">
                                    <div class="edit-form-main">
                                        <div class="row">
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <div class="panel panel-default">
                                                <div class="panel-heading clearfix">
                                                    <i class="icon-calendar"></i>
                                                    <h5 class="panel-title">Add New Slider</h5>
                                                </div>
                                                <div class="panel-body">
                                                <form role="form">
                                                    <div class="form-group">
                                                        <label>Slider Title</label>
                                                        <input type="text" onChange={this.SliderhandleChange.bind(this, "sliderTitle")}  value={this.state.fields["sliderTitle"] ? this.state.fields["sliderTitle"] :'' } className={this.state.errors["sliderTitle"] ? this.state.errors["sliderTitle"] : 'form-control'} />
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Slider Image</label>
                                                        <input required className="form-control" type="file" onChange={this.SliderhandleChange1} />
                                                    </div>

                                                    <button type="button" onClick={this.AddSliderFuc} class="btn btn-success" title="">Submit</button>
                                                </form>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </section>
                    </div>
                </div>
         );
}
}
export default AddSlider;