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


class Background extends React.Component{
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
        this.getResearch();
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

    getResearch() {
    AdminAPI.GetResearch()
            .then(res => {
                this.setState({ data: res.data.data });
                
                this.state.data.map((dataItem,key)=>{
                    if(dataItem.section === 'tab1'){
                        console.log('condition matched');
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
            section:'tab1',
            id:this.state.overview._id
        }
        // console.log(data)

        //to update data
        this.state.overview._id ?
        AdminAPI.UpdateResearch(data)
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

        //to add data
            :
        AdminAPI.AddResearch(data)
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
                                        <h5 class="panel-title">Research - Our Research</h5>
                                    </div>
                                    <div class="panel-body">
                                    <form id='traditionalOverview'>
                                    <div className="form-group">
                                    <label><h5>Title</h5></label><br/>
                                    <input type="text" name="title"  id="title" className="form-control" value={this.state.overview.title} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label><h5>Content</h5></label><br/>
                                        <Editor
                                            editorState={editorState}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onEditorStateChange={this.onEditorStateChange}
                                            toolbar={{
                                                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                                inline: {
                                                  inDropdown: false,
                                                  className: undefined,
                                                  component: undefined,
                                                  dropdownClassName: undefined,
                                                  options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                                                  bold: {className: undefined },
                                                  italic: { className: undefined },
                                                  underline: {  className: undefined },
                                                  strikethrough: {className: undefined },
                                                  monospace: {className: undefined },
                                                  superscript: {  className: undefined },
                                                  subscript: { className: undefined },
                                                },
                                                blockType: {
                                                  inDropdown: true,
                                                  options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                                                  className: undefined,
                                                  component: undefined,
                                                  dropdownClassName: undefined,
                                                },
                                                fontSize: {
                                                 
                                                  options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                                                  className: undefined,
                                                  component: undefined,
                                                  dropdownClassName: undefined,
                                                },
                                                fontFamily: {
                                                  options: ['Arial', 'Georgia', 'Impact', 'Tahoma' , 'Montserrat' , 'Times New Roman', 'Verdana'],
                                                  className: undefined,
                                                  component: undefined,
                                                  dropdownClassName: undefined,
                                                },
                                                list: {
                                                  inDropdown: false,
                                                  className: undefined,
                                                  component: undefined,
                                                  dropdownClassName: undefined,
                                                  options: ['unordered', 'ordered', 'indent', 'outdent'],
                                                  unordered: {  className: undefined },
                                                  ordered: {  className: undefined },
                                                  indent: {  className: undefined },
                                                  outdent: { className: undefined },
                                                },
                                                textAlign: {
                                                  inDropdown: false,
                                                  className: undefined,
                                                  component: undefined,
                                                  dropdownClassName: undefined,
                                                  options: ['left', 'center', 'right', 'justify'],
                                                  left: { className: undefined },
                                                  center: {  className: undefined },
                                                  right: {  className: undefined },
                                                  justify: {  className: undefined },
                                                },
                                                colorPicker: {
                                                 
                                                  className: undefined,
                                                  component: undefined,
                                                  popupClassName: undefined,
                                                  colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                                                    'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                                                    'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                                                    'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                                                    'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                                                    'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
                                                },
                                                link: {
                                                  inDropdown: false,
                                                  className: undefined,
                                                  component: undefined,
                                                  popupClassName: undefined,
                                                  dropdownClassName: undefined,
                                                  showOpenOptionOnHover: true,
                                                  defaultTargetOption: '_self',
                                                  options: ['link', 'unlink'],
                                                  link: {  className: undefined },
                                                  unlink: {className: undefined },
                                                  linkCallback: undefined
                                                },
                                                emoji: {
                                                 
                                                  className: undefined,
                                                  component: undefined,
                                                  popupClassName: undefined,
                                                  emojis: [
                                                    '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
                                                    '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
                                                    '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                                                    '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
                                                    '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
                                                    '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
                                                    '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
                                                    '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
                                                    '✅', '❎', '💯',
                                                  ],
                                                },
                                                embedded: {
                                                
                                                  className: undefined,
                                                  component: undefined,
                                                  popupClassName: undefined,
                                                  embedCallback: undefined,
                                                  defaultSize: {
                                                    height: 'auto',
                                                    width: 'auto',
                                                  },
                                                },
                                                image: {
                                                 
                                                  className: undefined,
                                                  component: undefined,
                                                  popupClassName: undefined,
                                                  urlEnabled: true,
                                                  uploadEnabled: true,
                                                  alignmentEnabled: true,
                                                  uploadCallback: undefined,
                                                  previewImage: false,
                                                  inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                                  alt: { present: false, mandatory: false },
                                                  defaultSize: {
                                                    height: 'auto',
                                                    width: 'auto',
                                                  },
                                                },
                                                remove: {  className: undefined, component: undefined },
                                                history: {
                                                  inDropdown: false,
                                                  className: undefined,
                                                  component: undefined,
                                                  dropdownClassName: undefined,
                                                  options: ['undo', 'redo'],
                                                  undo: {  className: undefined },
                                                  redo: {  className: undefined },
                                                },
                                              }}
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

export default Background