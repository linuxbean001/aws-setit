import React from 'react';
import Adminsidebar from '../../adminsidebar';
import AdminService from '../../../Aservice/adminservice';
import {Alert } from 'react-bootstrap';
import { EditorState, convertToRaw , ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const AdminAPI = new AdminService();


class Content4 extends React.Component{
    state={
        title:'',
        content:'',
        data:[],
        showAlert:false,
        message:'',
        overview:{},
        editorState: EditorState.createEmpty(),
    } 

    componentDidMount(){
        this.getVideos();
    }
      
    handleChange = e =>{
        const {name,value} = e.target;
        const fields = {
            ...this.state.overview,
            [name]:value
        }
        this.setState({
            overview:fields
        })
    }

    onEditorStateChange = (editorState) => {
        const fields = {
            ...this.state.overview,
            content:draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
        this.setState({
          editorState,
          overview:fields
        });
      };

      getVideos() {
    AdminAPI.GetVideos()
            .then(res => {
                this.setState({ data: res.data.data });
                // console.log(this.state.data);
                
                this.state.data.map((dataItem,key)=>{
                    if(dataItem.section === 'videofourth'){
                        const contentBlock = htmlToDraft(dataItem.content);
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                       this.setState({
                            overview:dataItem,
                            editorState:editorState                            
                       })
                    }

                    console.log(key+'--------->'+dataItem._id)
                })

            }).catch(err => {
                console.log('xxxxxxx xxxx ', err);
            });
    }

    updateContent = e =>{
        e.preventDefault();        
        const data = {
            title:this.state.overview.title,
            content:this.state.overview.content,
            section:'videofourth',
            id:this.state.overview._id
        }
        // console.log(data)

        //to update data
        this.state.overview._id ?
        AdminAPI.UpdateVideos(data)
            .then((res)=>{
                console.log(res)
                if (res.data.success) {
                    this.setState({
                        showAlert: true,
                        color: 'success',
                        message: res.data.message
                    });
                    setTimeout(
                        function () {
                            this.setState({ show: false});
                            this.setState({ showAlert: false });
                        }
                        .bind(this),
                        2000
                    );
                } else {
                    this.setState({
                        showAlert: true,
                        color: 'warning',
                        message: res.data.message
                    });
                }
            }).catch(err=>{
                console.log(err)
            })
:
        //to add data

        AdminAPI.AddVideos(data)
            .then((res)=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
    }

    getData=e=>{
        this.setState({content:e})
        console.log(e)
    }

    render(){
        const { editorState } = this.state;
        // console.log(editorState)
        return(
            <div className="contact-section">
            <div className="dashboard-section">   
                <section id="main-dashboard">
                    <Adminsidebar />
                    <div class="dashboard-content">
                        <div class="edit-form-main">   
                        {this.state.showAlert ? (<Alert bsStyle={this.state.color}><strong>{this.state.message}</strong></Alert> ) : ( null )}
                           
                            <div class="row">
                                <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="panel panel-default">
                                    <div class="panel-heading clearfix">
                                        <i class="icon-calendar"></i>
                                        <h5 class="panel-title">Videos - Content & Video 4</h5>
                                    </div>
                                    <div class="panel-body">
    
                                    <form id='traditionalOverview'>
    
                                        <div className="form-group">
                                            <label><h5>Video URL</h5></label><br/>
                                            <input type="url" name="title"  id="title" className="form-control" value={this.state.overview.title} onChange={this.handleChange} />
                                        </div>
    
                                        <div className="form-group">
                                                <label><h5>Content</h5></label><br/>
                                                <Editor
                                                    editorState={editorState}
                                                    wrapperClassName="demo-wrapper"
                                                    editorClassName="demo-editor"
                                                    onEditorStateChange={this.onEditorStateChange}
                                                />
                                                <textarea
                                                    name="content"
                                                    hidden
                                                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                                    onChange={this.handleChange}
                                                />
                                        </div>
                                        <input type="submit" className="btn btn-success" onClick={this.updateContent} value="Submit" />
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
        )
    }
}

export default Content4