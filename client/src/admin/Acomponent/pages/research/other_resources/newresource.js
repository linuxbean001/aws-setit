import React, { Component } from 'react';
import Adminsidebar from '../../../adminsidebar';
import AdminService from '../../../../Aservice/adminservice'
const API = new AdminService();
class AddResource extends Component{
    constructor(props){
        super(props);
        this.state ={
            isHide:false,
            fields: [],        
            errors: {},
            showAlert:false,
            title:'',
            description:'',
            links:'',
            ResourceImage:''
        }
        this.AddResourceFuc = this.AddResourceFuc.bind(this);
        this.ResourceImagehandleChange = this.ResourceImagehandleChange.bind(this);
    }


AddResourceFucCheck(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if(!fields["title"]){
        formIsValid = false;
        errors["title"] = "error_sell form-control";
    }
    if(!fields["description"]){
        formIsValid = false;
        errors["description"] = "error_sell form-control";
    }
    this.setState({errors:errors});
    return formIsValid;   
}

AddResourceFuc(e){
    
    if(this.AddResourceFucCheck()){ 

        var resourceInfoVo = new FormData()
        resourceInfoVo.append('title', this.state.fields.title)
        resourceInfoVo.append('description', this.state.fields.description)
        resourceInfoVo.append('links', this.state.fields.links)
        resourceInfoVo.append('image', this.state.ResourceImage)
        resourceInfoVo.append('datetime', new Date())

        API.AdminAddResource(resourceInfoVo).then((result) => {
                console.log('xxx res:', result );
                this.props.history.replace('/admin/pages/research/otherresourcelist');
        }).catch(err => {
            console.log('xxx new:', err);
        }) 
    }
}



resourceHandleChange(field, e) { 
    let fields = this.state.fields;
    fields[field] = e.target.value;    
    this.setState({ fields });
    console.log('Contactfields..xx...xx:', fields);
}

ResourceImagehandleChange(e) { 
    this.setState({ResourceImage:e.target.files[0]});
}

render(){
    console.log(this.state.ResourceImage)
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
                                                    <h5 class="panel-title">Add New Resource</h5>
                                                </div>
                                                <div class="panel-body">
                                                <form role="form">
                                                    <div class="form-group">
                                                        <label>Resource Title</label>
                                                        <input type="text" onChange={this.resourceHandleChange.bind(this, "title")}  value={this.state.fields["title"] ? this.state.fields["title"] :'' } className={this.state.errors["title"] ? this.state.errors["title"] : 'form-control'} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Resource Description</label>
                                                        <textarea className={this.state.errors["description"] ? this.state.errors["description"] : 'form-control'} onChange={this.resourceHandleChange.bind(this, "description")} rows="4" cols="50" >{this.state.fields["description"] ? this.state.fields["description"] :'' }</textarea>
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Upload PDF1</label>
                                                        <input required className="form-control" type="file" onChange={this.ResourceImagehandleChange} />
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Resource Links</label>
                                                        <textarea className={this.state.errors["links"] ? this.state.errors["links"] : 'form-control'} onChange={this.resourceHandleChange.bind(this, "links")} rows="4" cols="50" >{this.state.fields["links"] ? this.state.fields["links"] :'' }</textarea>
                                                    </div>

                                                    {/* <div className="form-group">
                                                        <label><h5>Resource Links</h5></label><br/>
                                                        <Editor
                                                            editorState={editorState}
                                                            wrapperClassName="demo-wrapper"
                                                            editorClassName="demo-editor"
                                                            onEditorStateChange={this.onEditorStateChange}
                                                        />
                                                        <textarea
                                                            name="links"
                                                            hidden
                                                            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div> */}

                                                    <button type="button" onClick={this.AddResourceFuc} class="btn btn-success" title="">Submit</button>
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
export default AddResource;