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
import pdfIcon from '../../../../../assets/img/pdf-png.png'; 
const AdminAPI = new AdminService();
let RowArray=[];


class ResearchList extends Component{
   constructor(props){
       super(props);
       this.state ={
        users: {},
        show: false,
        researchDetails: {},
        fields: {},
        id: '',
        title: '',
        content: '',
        showAlert:false,
        editorState:EditorState.createEmpty(),
        ResearchImage:''
       } 
      
       this.getAllResearchLists = this.getAllResearchLists.bind(this);
       this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
       this.handleHide = this.handleHide.bind(this);
       this.ResearchImagehandleChange = this.ResearchImagehandleChange.bind(this);
   }

componentDidMount(){
  this.getAllResearchLists();
}

onEditorStateChange= (editorState) => {
    this.setState({
      editorState,
    });
  };


getAllResearchLists() {
  AdminAPI.getAllResearchList()
        .then(res => {
          RowArray = [];
          console.log('name:',res.data.data);
        for(let i=0; i<res.data.data.length; i++){
            var stripedHtmlLinks = res.data.data[i].links.replace(/<[^>]+>/g, '');

            RowArray.push({
                title:res.data.data[i].title,
                description:<p dangerouslySetInnerHTML={{ __html: res.data.data[i].description }}  />,
                files:<img style={{width: 30}} src={res.data.data[i].files? pdfIcon : 'No pdf found'}/>,
                action:[<Button onClick={this.EditResearch.bind(this, res.data.data[i])} variant="success" size="sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>,<Button onClick={this.delResearch.bind(this, res.data.data[i]._id, i)}  variant="danger" size="sm"><i class="fa fa-trash-o" aria-hidden="true"></i></Button>]
            }) 
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

EditResearch(ResearchData){

console.log('ResearchData:',ResearchData)
    const contentBlock = htmlToDraft(ResearchData.links);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
        show: true, 
        researchDetails: ResearchData,
        editorState:editorState,
    });
}

handleUpdateSubmit() {
//   const EICInfoVo = {
//       'id': this.refs.id.value,
//       'title': this.refs.title.value,
//       'content': this.refs.content.value
//   }

console.log(this.refs.oldimage)

var researchInfoVo = new FormData()
researchInfoVo.append('title', this.refs.title.value)
researchInfoVo.append('description', this.refs.description.value)
researchInfoVo.append('image',this.state.ResearchImage )
researchInfoVo.append('oldimage', this.refs.oldimage.value)
researchInfoVo.append('links', this.refs.links.value)
researchInfoVo.append('id', this.refs.id.value)

AdminAPI.AdminEditResearchInfo(researchInfoVo)
.then((result) => {
    this.getAllResearchLists();
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


researchHandleChange=(field, e) =>{
    console.log(e.target);
  let fields = this.state.fields;
  fields[field] = e.target.value;
  this.setState({ fields });
}

delResearch(id) {
    AdminAPI.AdmindeleteResearchById(id)
      .then(res => {
         this.getAllResearchLists();
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

    ResearchImagehandleChange(e) { 
        console.log(e.target.files[0]);
        this.setState({ResearchImage:e.target.files[0]});
    }

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
            label: 'Description',
            field: 'description',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Uploads',
            field: 'files',
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
              <div className="heading"><h4>Research lists</h4></div>
              
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
                                    Update Research
            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input className="form-control" onChange={this.researchHandleChange.bind(this, "id")} type="hidden" ref="id" id="id" name="id" defaultValue={this.state.researchDetails._id} />
                                        <input className="form-control" onChange={this.researchHandleChange.bind(this, "title")} type="text" ref="title" id="title" name="title" defaultValue={this.state.researchDetails.title}  required="" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" onChange={this.researchHandleChange.bind(this, "description")}  ref="description" id="description" name="description"   required="" defaultValue={this.state.researchDetails.description}></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label>Update Uploads</label>
                                        <input className="form-control" onChange={this.researchHandleChange.bind(this, "oldimage")} type="hidden" ref="oldimage" id="oldimage" name="oldimage" defaultValue={this.state.researchDetails.files} />
                                        <input className="form-control"  onChange={this.ResearchImagehandleChange}  type="file" />
                                         <div className="imgOver">
                                             <img style={{width: 30}} src={this.state.researchDetails.files ? pdfIcon : 'No pdf found'}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Links</label>

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
                                        ref="links"  id="links" 
                                        hidden
                                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                        />
                                     
                                    </div>

                                    {/* <div className="form-group">
                                        <label>Upload New EIC Image</label>
                                        <input className="form-control" onChange={this.researchHandleChange.bind(this, "oldimage")} type="hidden" ref="oldimage" id="oldimage" name="oldimage" defaultValue={this.state.EICDetails.image} />
                                        <input className="form-control"  onChange={this.EICImagehandleChange}  type="file" />
                                         <div className="imgOver">
                                             <img style={{width: 100}} src={process.env.PUBLIC_URL + '/upload-file/'+this.state.researchDetails.image}/>
                                        </div>
                                    </div> */}

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



export default ResearchList; 