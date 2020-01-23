import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Adminsidebar from '../../adminsidebar';
import AdminService from '../../../Aservice/adminservice'
const API = new AdminService();
class AddAccordian extends Component{
    constructor(props){
        super(props);
        this.state ={
            isHide:false,
            fields: [],        
            errors: {},
            showAlert:false,
            title:'',
            content:'',
            EICImage:'',
            editorState:EditorState.createEmpty()
        }
        this.AddAccordianFuc = this.AddAccordianFuc.bind(this);    
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };

AddAccordianFuc(e){
    
        const AccordianInfoVo = {
            'title': this.state.fields.title,
            'content': this.refs.content.value,
            'datetime':new Date()
        }
        API.AdminAddAccordian(AccordianInfoVo).then((result) => {
                console.log('xxx res:', result );
                this.props.history.replace('/admin/pages/traditional/accordianlist');
        }).catch(err => {
            console.log('xxx new:', err);
        }) 
   // }
}

 
EIChandleChange(field, e) { 
    let fields = this.state.fields;
    fields[field] = e.target.value;    
    this.setState({ fields });
    console.log('Contactfields..xx...xx:', fields);
}



render(){
 const { editorState } = this.state;
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
                                                    <h5 class="panel-title">Add Accordian</h5>
                                                </div>
                                                <div class="panel-body">
                                                <form role="form">
                                                    <div class="form-group">
                                                        <label>Accordian Title</label>
                                                        <input type="text" onChange={this.EIChandleChange.bind(this, "title")}  value={this.state.fields["title"] ? this.state.fields["title"] :'' } className={this.state.errors["title"] ? this.state.errors["title"] : 'form-control'} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Accordian Content</label>
                                                        {/* <textarea className={this.state.errors["content"] ? this.state.errors["content"] : 'form-control'} onChange={this.EIChandleChange.bind(this, "content")} rows="4" cols="50" >{this.state.fields["content"] ? this.state.fields["content"] :'' }</textarea> */}
                                                        <Editor
                                                        editorState={editorState}
                                                        wrapperClassName="demo-wrapper"
                                                        editorClassName="demo-editor"
                                                        onEditorStateChange={this.onEditorStateChange}
                                                        />
                                                        <textarea
                                                        className="form-control"
                                                        id="content" 
                                                        ref="content"
                                                        hidden
                                                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                                        />
                                                    </div>

                                                    <button type="button" onClick={this.AddAccordianFuc} class="btn btn-success" title="">Submit</button>
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
export default AddAccordian;