import React, { Component } from 'react';
import Adminsidebar from '../../../adminsidebar';
import AdminService from '../../../../Aservice/adminservice'
const API = new AdminService();
class AddResearch extends Component{
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
            ResearchImage:''
        }
        this.AddResearchFuc = this.AddResearchFuc.bind(this);
        this.ResearchImagehandleChange = this.ResearchImagehandleChange.bind(this);
    }


AddResearchFucCheck(){
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

AddResearchFuc(e){
    
    if(this.AddResearchFucCheck()){ 

        var researchInfoVo = new FormData()
        researchInfoVo.append('title', this.state.fields.title)
        researchInfoVo.append('description', this.state.fields.description)
        researchInfoVo.append('links', this.state.fields.links)
        researchInfoVo.append('image', this.state.ResearchImage)
        researchInfoVo.append('datetime', new Date())

        console.log(researchInfoVo)
        API.AdminAddResearch(researchInfoVo).then((result) => {
                console.log('xxx res:', result );
                this.props.history.replace('/admin/pages/research/ourresearchlist');
        }).catch(err => {
            console.log('xxx new:', err);
        }) 
    }
}



researchHandleChange(field, e) { 
    let fields = this.state.fields;
    fields[field] = e.target.value;    
    this.setState({ fields });
    console.log('Contactfields..xx...xx:', fields);
}

ResearchImagehandleChange(e) { 
    console.log(e.target.files[0])
    this.setState({ResearchImage:e.target.files[0]});
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
                                                    <h5 class="panel-title">Add New Research</h5>
                                                </div>
                                                <div class="panel-body">
                                                <form role="form">
                                                    <div class="form-group">
                                                        <label>Research Title</label>
                                                        <input type="text" onChange={this.researchHandleChange.bind(this, "title")}  value={this.state.fields["title"] ? this.state.fields["title"] :'' } className={this.state.errors["title"] ? this.state.errors["title"] : 'form-control'} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Research Description</label>
                                                        <textarea className={this.state.errors["description"] ? this.state.errors["description"] : 'form-control'} onChange={this.researchHandleChange.bind(this, "description")} rows="4" cols="50" >{this.state.fields["description"] ? this.state.fields["description"] :'' }</textarea>
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Upload PDF</label>
                                                        <input required className="form-control" type="file" onChange={this.ResearchImagehandleChange} />
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Research Links</label>
                                                        <textarea className={this.state.errors["links"] ? this.state.errors["links"] : 'form-control'} onChange={this.researchHandleChange.bind(this, "links")} rows="4" cols="50" >{this.state.fields["links"] ? this.state.fields["links"] :'' }</textarea>
                                                    </div>

                                                    {/* <div className="form-group">
                                                        <label><h5>Research Links</h5></label><br/>
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

                                                    <button type="button" onClick={this.AddResearchFuc} class="btn btn-success" title="">Submit</button>
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
export default AddResearch;