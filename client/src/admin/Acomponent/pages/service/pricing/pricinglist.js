import React, { Component } from 'react';
import { MDBDataTable  } from 'mdbreact';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button,Alert,Modal } from 'react-bootstrap';
import Adminsidebar from '../../../adminsidebar';
import AdminService from '../../../../Aservice/adminservice'
 const AdminAPI = new AdminService();
let RowArray=[];




class PricingList extends Component{
   constructor(props){
       super(props);
       this.state ={
        users: {},
        show: false,
        EICDetails: {},
        fields: {},
        id: '',
        title: '',
        content: '',
        showAlert:false,
        EICImage:'',
        editorState:EditorState.createEmpty()
       } 
      
       this.getAllPricingLists = this.getAllPricingLists.bind(this);
       this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
       this.handleHide = this.handleHide.bind(this);
       //this.EICImagehandleChange = this.EICImagehandleChange.bind(this);
    
   }

componentDidMount(){
  this.getAllPricingLists();
}

onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };


  getAllPricingLists() {
  AdminAPI.getAllPriceList()
        .then(res => {
          RowArray = [];
          console.log('name:',res.data.data);
        for(let i=0; i<res.data.data.length; i++){
             RowArray.push({title:res.data.data[i].title,action:[<Button onClick={this.EditPrice.bind(this, res.data.data[i])} variant="success" size="sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>,<Button onClick={this.delPrice.bind(this, res.data.data[i]._id, i)}  variant="danger" size="sm"><i class="fa fa-trash-o" aria-hidden="true"></i></Button>]}) 
          }
         // console.log('ContacutServicArray:', res);
          this.setState({ users: RowArray });
        }).catch(err => {
            console.log('xxxxxxx xxxx ', err);
        });
}

handleHide() {
  this.setState({ show: false });
}

EditPrice(EicData){

console.log('EicData:',EicData)
    const contentBlock = htmlToDraft(EicData.content);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
        show: true,
        EICDetails: EicData,
        editorState:editorState,
    });
}

handleUpdateSubmit() {
  const EICInfoVo = {
      'id': this.refs.id.value,
      'title': this.refs.title.value,
      'content': this.refs.content.value
  }
AdminAPI.AdminEditPriceInfo(EICInfoVo)
.then((result) => {
    this.getAllPricingLists();
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
    console.log('xxx', err);
});
//console.log('xxxxxxxxx', userInfoVo);
}


EIChandleChange(field, e) {
  let fields = this.state.fields;
  fields[field] = e.target.value;
  this.setState({ fields });
}

delPrice(id) {
    AdminAPI.AdmindeletePriceById(id)
      .then(res => {
         this.getAllPricingLists();
          console.log('xxxxxxxx', res);
          if (res.data.success) {
              this.setState({
                  showAlert: true,
                  color: 'success',
                  message: res.data.message
    
              });
    
              setTimeout(
                  function () {
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
    
      }).catch(err => {
          console.log('xxxxxxxxxx xxxxxxxxx err from com ' + err)
      });
    
    }

    // EICImagehandleChange(e) { 
    //     this.setState({EICImage:e.target.files[0]});
    // }

render(){

   const { editorState } = this.state;

    const data = {
      columns: [
        {
          label: 'Title',
          field: 'title',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 150
        }
      ],
      rows: RowArray
    }


  
    return(
        <div className="dashboard-section">   
            <section id="main-dashboard">
            <Adminsidebar />
            <div class="dashboard-content">
              <div className="heading"><h4>Pricing lists</h4></div>
              
                <div class="edit-form-main">
                    {this.state.showAlert ? (<Alert bsStyle={this.state.color}><strong>{this.state.message}</strong></Alert> ) : ( null )}
                    <MDBDataTable striped bordered hover data={data}  />
                </div>    

                <Modal
                            show={this.state.show}
                            onHide={this.handleHide}
                            container={this}
                            size="lg"
                            aria-labelledby="contained-modal-title"
                        >
                           <form >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                    Update Pricing
            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input className="form-control" onChange={this.EIChandleChange.bind(this, "id")} type="hidden" ref="id" id="id" name="id" defaultValue={this.state.EICDetails._id} />
                                        <input className="form-control" onChange={this.EIChandleChange.bind(this, "title")} type="text" ref="title" id="title" name="title" defaultValue={this.state.EICDetails.title}  required="" />
                                    </div>
                                    <div className="form-group">
                                        <label>Content</label>

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
                                    ref="content"  id="content" 
                                    hidden
                                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                    />
                                     
                                    </div>

                                 

                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" variant="success" size="sm" onClick={this.handleUpdateSubmit} >Update</Button> &nbsp; <Button variant="danger" size="sm" onClick={this.handleHide}>Close</Button>
                            </Modal.Footer>
                            </form>
                        </Modal>


              </div>
            </section>
        </div>
    );
   }
}



export default PricingList; 