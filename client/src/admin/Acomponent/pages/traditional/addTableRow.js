import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Adminsidebar from '../../adminsidebar';
import AdminService from '../../../Aservice/adminservice'
const API = new AdminService();
class AddTableRow extends Component{
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
        this.AddTableRowFuc = this.AddTableRowFuc.bind(this);    
    }

    // onEditorStateChange = (editorState) => {
    //     this.setState({
    //       editorState,
    //     });
    //   };

AddTableRowFuc(e){
    
        const TableRowInfoVo = {
            'title': this.state.fields.title,
            'swr': this.state.fields.swr,
            'va': this.state.fields.va,
            'datetime':new Date()
        }
        API.AdminAddTableRow(TableRowInfoVo).then((result) => {
                console.log('xxx res:', result );
                this.props.history.replace('/admin/pages/traditional/tablerowlist');
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
                                                    <h5 class="panel-title">Add TableRow</h5>
                                                </div>
                                                <div class="panel-body">
                                                <form role="form">
                                                    <div class="form-group">
                                                        <label>Title</label>
                                                        <input type="text" onChange={this.EIChandleChange.bind(this, "title")}  value={this.state.fields["title"] ? this.state.fields["title"] :'' } className={this.state.errors["title"] ? this.state.errors["title"] : 'form-control'} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Safe Withdrawal Rate (SWR)</label>
                                                        <textarea type="text" onChange={this.EIChandleChange.bind(this, "swr")}  value={this.state.fields["swr"] ? this.state.fields["swr"] :'' } className={this.state.errors["swr"] ? this.state.errors["swr"] : 'form-control'} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Variable Annuity</label>
                                                        <textarea type="text" onChange={this.EIChandleChange.bind(this, "va")}  value={this.state.fields["va"] ? this.state.fields["va"] :'' } className={this.state.errors["va"] ? this.state.errors["va"] : 'form-control'} />
                                                    </div>
                                                    {/* <div class="form-group">
                                                        <label>TableRow Content</label>                                                        
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
                                                    </div> */}

                                                    <button type="button" onClick={this.AddTableRowFuc} class="btn btn-success" title="">Submit</button>
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
export default AddTableRow;