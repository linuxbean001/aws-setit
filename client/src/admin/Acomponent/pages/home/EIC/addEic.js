import React, { Component } from 'react';
import Adminsidebar from '../../../adminsidebar';
import AdminService from '../../../../Aservice/adminservice'
const API = new AdminService();
class AddEIC extends Component{
    constructor(props){
        super(props);
        this.state ={
            isHide:false,
            fields: [],        
            errors: {},
            showAlert:false,
            title:'',
            content:'',
            EICImage:''
        }
        this.AddEicFuc = this.AddEicFuc.bind(this);
        this.EICImagehandleChange = this.EICImagehandleChange.bind(this);
        
    }


AddEicFucCheck(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(!fields["title"]){
        formIsValid = false;
        errors["title"] = "error_sell form-control";
    }
    if(!fields["content"]){
        formIsValid = false;
        errors["content"] = "error_sell form-control";
    }
    this.setState({errors:errors});
    return formIsValid;   
}

AddEicFuc(e){
    
    if(this.AddEicFucCheck()){ 
        // const eicInfoVo = {
        //     'title': this.state.fields.title,
        //     'content': this.state.fields.content,
        //     'datetime':new Date()
        // }

        var eicInfoVo = new FormData()
        eicInfoVo.append('title', this.state.fields.title)
        eicInfoVo.append('content', this.state.fields.content)
        eicInfoVo.append('image', this.state.EICImage)
        eicInfoVo.append('datetime', new Date())

        API.AdminAddEIC(eicInfoVo).then((result) => {
                console.log('xxx res:', result );
                this.props.history.replace('/admin/Eiclist');
        }).catch(err => {
            console.log('xxx new:', err);
        }) 
    }
}



EIChandleChange(field, e) { 
    let fields = this.state.fields;
    fields[field] = e.target.value;    
    this.setState({ fields });
    console.log('Contactfields..xx...xx:', fields);
}

EICImagehandleChange(e) { 
    this.setState({EICImage:e.target.files[0]});
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
                                                    <h5 class="panel-title">Add New EIC SECTION</h5>
                                                </div>
                                                <div class="panel-body">
                                                <form role="form">
                                                    <div class="form-group">
                                                        <label>EIC Title</label>
                                                        <input type="text" onChange={this.EIChandleChange.bind(this, "title")}  value={this.state.fields["title"] ? this.state.fields["title"] :'' } className={this.state.errors["title"] ? this.state.errors["title"] : 'form-control'} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>EIC Content</label>
                                                        <textarea className={this.state.errors["content"] ? this.state.errors["content"] : 'form-control'} onChange={this.EIChandleChange.bind(this, "content")} rows="4" cols="50" >{this.state.fields["content"] ? this.state.fields["content"] :'' }</textarea>
                                                    </div>

                                                    <div class="form-group">
                                                        <label>EIC Image</label>
                                                        <input required className="form-control" type="file" onChange={this.EICImagehandleChange} />
                                                    </div>

                                                    <button type="button" onClick={this.AddEicFuc} class="btn btn-success" title="">Submit</button>
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
export default AddEIC;