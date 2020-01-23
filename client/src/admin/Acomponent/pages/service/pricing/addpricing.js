import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Adminsidebar from '../../../adminsidebar';
import AdminService from '../../../../Aservice/adminservice'
const API = new AdminService();
class AddPriceing extends Component{
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
        this.AddPriceFuc = this.AddPriceFuc.bind(this);    
    }

    onEditorStateChange: Function = (editorState) => {
        this.setState({
          editorState,
        });
      };

AddPriceFuc(e){
    
        const PriceInfoVo = {
            'title': this.state.fields.title,
            'content': this.refs.content.value,
            'datetime':new Date()
        }
        API.AdminAddPrice(PriceInfoVo).then((result) => {
                console.log('xxx res:', result );
                this.props.history.replace('/admin/pricinglist');
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
                                                    <h5 class="panel-title">Add Service Pricing</h5>
                                                </div>
                                                <div class="panel-body">
                                                <form role="form">
                                                    <div class="form-group">
                                                        <label>Pricing Title</label>
                                                        <input type="text" onChange={this.EIChandleChange.bind(this, "title")}  value={this.state.fields["title"] ? this.state.fields["title"] :'' } className={this.state.errors["title"] ? this.state.errors["title"] : 'form-control'} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>Pricing Content</label>
                                                        {/* <textarea className={this.state.errors["content"] ? this.state.errors["content"] : 'form-control'} onChange={this.EIChandleChange.bind(this, "content")} rows="4" cols="50" >{this.state.fields["content"] ? this.state.fields["content"] :'' }</textarea> */}
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

                                                    <button type="button" onClick={this.AddPriceFuc} class="btn btn-success" title="">Submit</button>
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
export default AddPriceing;