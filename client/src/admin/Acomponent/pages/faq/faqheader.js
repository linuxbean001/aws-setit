import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Alert } from 'react-bootstrap';
import Adminsidebar from '../../adminsidebar';
import AdminService from '../../../Aservice/adminservice'
const API = new AdminService();
class FAQheader extends Component{
    constructor(props){
        super(props);
        this.state ={
            isHide:false,
            fields: [],        
            errors: {},
            whoData:{},
            showAlert:false,
            content:'',
            title:'',
            image:'',
            id:'',
            editorState:EditorState.createEmpty()
        }
        this.AddFAQheaderFuc = this.AddFAQheaderFuc.bind(this);
        this.ImagehandleChange = this.ImagehandleChange.bind(this);
        
    }


onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

componentDidMount(){
    this.getFAQheaders()
}

getFAQheaders() {
    API.getFAQheader()
          .then(res => {
            console.log('name:',res.data.data[0]);

            const contentBlock = htmlToDraft(res.data.data[0].content);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);

            this.setState({ 
                title: res.data.data[0].title,
                editorState:editorState,
                image: res.data.data[0].image,
                id: res.data.data[0]._id,
             });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }

AddFAQheaderFuc(e){
        var eicInfoVo = new FormData()
        eicInfoVo.append('title', this.refs.title.value)
        eicInfoVo.append('content', this.refs.content.value)
        eicInfoVo.append('image', this.state.EICImage)
        eicInfoVo.append('oldimage', this.refs.oldimage.value)
        eicInfoVo.append('id', this.refs.id.value)
        eicInfoVo.append('datetime', new Date())

        API.AddFAQheader(eicInfoVo).then((result) => {
            this.getFAQheaders()
                console.log('xxx res:', result );
                if (result.data.success) {
                    this.setState({
                        showAlert: true,
                        color: 'success',
                        message: result.data.message
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
                        message: result.data.message
                    });
                }

        }).catch(err => {
            console.log('xxx new:', err);
        }) 
}



handleChange(field, e) { 
    let fields = this.state.fields;
    fields[field] = e.target.value;    
    this.setState({ fields });
    console.log('Contactfields..xx...xx:', fields);
}

ImagehandleChange(e) { 
    this.setState({EICImage:e.target.files[0]});
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
                                    {this.state.showAlert ? (<Alert bsStyle={this.state.color}><strong>{this.state.message}</strong></Alert> ) : ( null )}
                            
                                        <div class="row">
                                            
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <div class="panel panel-default">
                                                <div class="panel-heading clearfix">
                                                    <i class="icon-calendar"></i>
                                                    <h5 class="panel-title">FAQ PAGE CONTENT</h5>
                                                </div>
                                                <div class="panel-body">

                                                <form role="form">

                                                    <input className="form-control" onChange={this.handleChange.bind(this, "id")} type="hidden" ref="id" id="id" name="id" defaultValue={this.state.id} />

                                                    <div class="form-group">
                                                        <label>Header Title</label>
                                                        <input type="text" id="title" ref="title" onChange={this.handleChange.bind(this, "title")}  value={this.state.fields["title"] ? this.state.fields["title"] : this.state.title} className={this.state.errors["title"] ? this.state.errors["title"] : 'form-control'} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Header Description</label>
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
                                                        className="form-control"
                                                        id="content" 
                                                        ref="content"
                                                        hidden
                                                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                                        />
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Banner Image</label>
                                                        <input required className="form-control" type="file" onChange={this.ImagehandleChange} />
                                                    </div>

                                                    <div class="form-group">
                                                        <img style={{width: 100}} src={process.env.PUBLIC_URL + '/upload-file/'+this.state.image}/>
                                                        <input hidden className="form-control" onChange={this.handleChange.bind(this, "oldimage")} type="text" ref="oldimage" id="oldimage" name="oldimage" defaultValue={this.state.image} />
                                                    </div>
                                                    <button type="button" onClick={this.AddFAQheaderFuc} class="btn btn-success" title="">Submit</button>
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

    export default FAQheader;