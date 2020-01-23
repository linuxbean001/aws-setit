import React, { Component } from 'react';
import Adminsidebar from './adminsidebar';
import { MDBDataTable  } from 'mdbreact';
import moment from 'moment';
import { Button,Modal,Alert,OverlayTrigger,Tooltip } from 'react-bootstrap';
import AdminService from '../Aservice/adminservice';
const AdminAPI = new AdminService();
let RowArray=[];

class Userlist extends Component{
   constructor(props){
       super(props);
       this.state ={
        users: {},
        show: false,
        userDetails: {},
        fields: {},
        id: '',
        name: '',
        email: '',
        showAlert:false,
        showModalDialog:false, 
       } 
       this.getAllUser = this.getAllUser.bind(this);
       this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
       this.handleHide = this.handleHide.bind(this);
       this.closeDialog = this.closeDialog.bind(this);
       this.confirmBtn = this.confirmBtn.bind(this);
       this.restPasswordEmail = this.restPasswordEmail.bind(this);
       this.toolsStatus = this.toolsStatus.bind(this);
   }

closeDialog() {
    this.setState({ showModalDialog: false, eventIdForDel: '' });
}

openDialogEvent(id) {
    this.setState({ eventIdForDel: id })
    this.openDialog();
}

openDialog() {
    this.setState({ showModalDialog: true });
}
confirmBtn() {
    this.delUser(this.state.eventIdForDel);
}

componentDidMount(){
  this.getAllUser();
}

getAllUser() {
  AdminAPI.getUserAll()
        .then(res => {
          //console.log('userServic..xx:', res.data.data);
          //console.log('userServic:', res.data.data[0].name);
          RowArray = [];
          for(let i=0; i<res.data.data.length; i++){
              var d_investor = res.data.data[i].investor;
              var d_financial = res.data.data[i].financial;
              var d_professor = res.data.data[i].professor;
              var d_tell_us_more = res.data.data[i].tell_us_more;
              var last_uses_date = moment(res.data.data[i].last_uses_date).format("DD-MM-YY hh:mm:ss a");
              var number_of_signins = res.data.data[i].number_of_signins;
              var tool_enabled = res.data.data[i].tool_enabled;
              var detail = 'Signup Date - '+moment(res.data.data[i].datetime).format("DD-MM-YY hh:mm:ss a")+' / Tool Enabled - '+tool_enabled+' / Number of Signins - '+number_of_signins+' / Last Activity Time - '+last_uses_date+' / ';
              var investor_d = d_investor?d_investor+' / ':'';
              var financial_d = d_financial?d_financial+' / ':'';
              var professor_d = d_professor?d_professor+' / ':'';
              var tell_us_more_d = d_tell_us_more?d_tell_us_more:'';

                 
              if(res.data.data[i].role==1){
                console.log('status'+i+':' , res.data.data[i].tool_enabled);
                RowArray.push({name:res.data.data[i].name,email:res.data.data[i].email,details:detail+investor_d+financial_d+professor_d+tell_us_more_d,action:[
                <OverlayTrigger overlay={<Tooltip id="tooltip-top">Edit</Tooltip>}>
                    <Button onClick={this.EditUser.bind(this, res.data.data[i])} variant="success" size="sm"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                </OverlayTrigger>,
                <OverlayTrigger overlay={<Tooltip id="tooltip-top">Delete</Tooltip>}>
                    <Button onClick={this.openDialogEvent.bind(this, res.data.data[i]._id, i)} variant="danger" size="sm"><i class="fa fa-trash-o" aria-hidden="true"></i></Button>
                </OverlayTrigger>,
                <OverlayTrigger overlay={<Tooltip id="tooltip-top">reset password E-mail</Tooltip>}>
                    <Button onClick={this.restPasswordEmail.bind(this, res.data.data[i]._id, i)} variant="primary" size="sm"><i class="fa fa-key" aria-hidden="true"></i></Button>
                </OverlayTrigger>,
                 <OverlayTrigger overlay={<Tooltip id="tooltip-top"> {res.data.data[i].tool_enabled == true  ? "Tool Enable" : "Tool Disable" }</Tooltip>}>
                      {res.data.data[i].tool_enabled == true ? (<Button onClick={this.toolsStatus.bind(this, res.data.data[i]._id,'false', i)} variant="success" size="sm"><i class="fa fa-eye" aria-hidden="true"></i></Button>) : (<Button onClick={this.toolsStatus.bind(this, res.data.data[i]._id,'true', i)} variant="danger" size="sm"><i class="fa fa-eye-slash" aria-hidden="true"></i></Button>) }
                    
                </OverlayTrigger>
                ]}) 
              }
        }
          //console.log('userServicArray:', RowArray);
          this.setState({ users: RowArray });
        }).catch(err => {
            console.log('xxxxxxx xxxx ', err);
        });
}


handleHide() {
  this.setState({ show: false });
}


toolsStatus(id,status){
    const toolInfoVo = {
        'id': id,
        'status': status
    }
    AdminAPI.AdminToolsStatus(toolInfoVo)
    .then(res => {
       
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
                    this.getAllUser();
                }
                    .bind(this),
                2000
            );

        }else{
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



restPasswordEmail(id){
    const userInfoVo = {
        'id': id
    }
    AdminAPI.AdminSendresetpassword(userInfoVo)
    .then(res => {
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

        }else{
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


delUser(id) { 
        console.log('userid: ',id);

  AdminAPI.AdmindeleteUserById(id)
      .then(res => {
         this.getAllUser();
          this.closeDialog();
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


EditUser(user) {
 // console.log('xxxxxxx xxxx user data ', user);
  this.setState({
      show: true,
      userDetails: user

  });
}

handleUpdateSubmit() {
  const userInfoVo = {
      'id': this.refs.id.value,
      'name': this.refs.name.value,
      'email': this.refs.email.value
  }
AdminAPI.AdminEditUserInfo(userInfoVo)
.then((result) => {
    //console.log('xxxhsdfgjasj: ', result);
   
    this.getAllUser();
    //console.log('getUser:',this.getAllUser());
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

handleChange(field, e) {
  let fields = this.state.fields;
  fields[field] = e.target.value;
  this.setState({ fields });
}

render(){
    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 50
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
          width: 270
        },
        {
            label: 'Other Details',
            field: 'details',
            sort: 'asc',
            width: 270
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 200
        }
      ],
      rows: RowArray
    }

    return(
        <div className="dashboard-section">   
            <section id="main-dashboard">
            <Adminsidebar />
            <div class="dashboard-content">
              <div className="heading"><h4>User lists</h4></div>
              
              <div class="edit-form-main userlistsection">
              {this.state.showAlert ? (<Alert bsStyle={this.state.color}><strong>{this.state.message}</strong></Alert> ) : ( null )}

                 <MDBDataTable striped bordered hover data={data}  />


    

              </div>


              <Modal className="static-modal-confirm" show={this.state.showModalDialog} onHide={this.closeDialog}>

                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                   Confirmation 
                              </Modal.Title>
                            </Modal.Header>

                                    <Modal.Body>
                                       <p>Are you sure you wish to delete this User?</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="success" size="sm" onClick={this.closeDialog} >Cancel</Button>
                                        <Button variant="danger" size="sm" onClick={this.confirmBtn} >Proceed</Button>
                                    </Modal.Footer>
             </Modal>


              <Modal
                            show={this.state.show}
                            onHide={this.handleHide}
                            container={this}
                            aria-labelledby="contained-modal-title"
                        >
                           <form >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                    Update Profile
            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                 
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input className="form-control" onChange={this.handleChange.bind(this, "id")} type="hidden" ref="id" id="id" name="id" defaultValue={this.state.userDetails._id} />
                                        <input className="form-control" onChange={this.handleChange.bind(this, "name")} type="text" ref="name" id="name" name="name" defaultValue={this.state.userDetails.name} placeholder="Write your name here" required="" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input className="form-control" readOnly onChange={this.handleChange.bind(this, "email")} ref="email" type="email" id="email" name="email" defaultValue={this.state.userDetails.email} placeholder="Enter your email address" required="" />
                                    </div>
                                    {/* <div className="form-group">
                                        <label>Message</label>
                                        <textarea ref="message" onChange={this.handleChange.bind(this, "message")} defaultValue={this.state.userDetails.message} className="form-control" id="message" name="message" placeholder="Enter free text, your purpose etc." rows="6"></textarea>
                                    </div> */}
                                    {/* <div className="form-group">
                                        <input className="submit_btn btn custom_theme_btn" onClick={this.handleUpdateSubmit} type="button" value="Send" />
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



export default Userlist; 