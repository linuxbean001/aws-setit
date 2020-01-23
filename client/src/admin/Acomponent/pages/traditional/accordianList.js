import React, { Component } from 'react';
import { MDBDataTable  } from 'mdbreact';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button,Alert,Modal } from 'react-bootstrap';
import Adminsidebar from '../../adminsidebar';
import AdminService from '../../../Aservice/adminservice'
 const AdminAPI = new AdminService();
let RowArray=[];




class AccordianList extends Component{
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
      
       this.getAllAccordianLists = this.getAllAccordianLists.bind(this);
       this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
       this.handleHide = this.handleHide.bind(this);
       //this.EICImagehandleChange = this.EICImagehandleChange.bind(this);
    
   }

componentDidMount(){
  this.getAllAccordianLists();
}

onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };


getAllAccordianLists() {
  AdminAPI.getAllAccordianList()
        .then(res => {
          RowArray = [];
          console.log('name:',res.data.data);
        for(let i=0; i<res.data.data.length; i++){
             RowArray.push({title:res.data.data[i].title,action:[<Button onClick={this.EditAccordian.bind(this, res.data.data[i])} variant="success" size="sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>,<Button onClick={this.delAccordian.bind(this, res.data.data[i]._id, i)}  variant="danger" size="sm"><i class="fa fa-trash-o" aria-hidden="true"></i></Button>]}) 
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

EditAccordian(EicData){

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
AdminAPI.AdminEditAccordianInfo(EICInfoVo)
.then((result) => {
    this.getAllAccordianLists();
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

delAccordian(id) {
    AdminAPI.AdmindeleteAccordianById(id)
      .then(res => {
         this.getAllAccordianLists();
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
              <div className="heading"><h4>Accordian lists</h4></div>
              
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
                                    Update Accordian
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
                                    />
                                    <textarea
                                    className="form-control"
                                    ref="content"  id="content" 
                                    hidden
                                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                    />
                                     
                                    </div>

                                    {/* <div className="form-group">
                                        <label>Upload New EIC Image</label>
                                        <input className="form-control" onChange={this.EIChandleChange.bind(this, "oldimage")} type="hidden" ref="oldimage" id="oldimage" name="oldimage" defaultValue={this.state.EICDetails.image} />
                                        <input className="form-control"  onChange={this.EICImagehandleChange}  type="file" />
                                         <div className="imgOver">
                                             <img style={{width: 100}} src={process.env.PUBLIC_URL + '/upload-file/'+this.state.EICDetails.image}/>
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



export default AccordianList; 