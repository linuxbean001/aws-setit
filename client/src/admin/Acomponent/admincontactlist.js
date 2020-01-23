import React, { Component } from 'react';
import Adminsidebar from './adminsidebar';
import { MDBDataTable  } from 'mdbreact';
import { Button,Alert } from 'react-bootstrap';
import AdminService from '../Aservice/adminservice'
const AdminAPI = new AdminService();
let RowArray=[];

class ContactList extends Component{
   constructor(props){
       super(props);
       this.state ={
        users: {},
        show: false,
        showAlert:false
       } 
       this.getAllContactList = this.getAllContactList.bind(this);
   }

componentDidMount(){
  this.getAllContactList();
}

getAllContactList() {
  AdminAPI.getAllContactList()
        .then(res => {
          RowArray = [];
          //console.log('name:',res.data.data);
        for(let i=0; i<res.data.data.length; i++){
             RowArray.push({name:res.data.data[i].name,email:res.data.data[i].email,message:res.data.data[i].message,action:<Button onClick={this.delUserContact.bind(this, res.data.data[i]._id, i)}  variant="danger" size="sm"><i class="fa fa-trash-o" aria-hidden="true"></i></Button>}) 
          }
         // console.log('ContacutServicArray:', res);
          this.setState({ users: RowArray });
        }).catch(err => {
            console.log('xxxxxxx xxxx ', err);
        });
}

delUserContact(id) {
AdminAPI.AdmindeleteUserContactById(id)
  .then(res => {
     this.getAllContactList();
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


render(){
    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
          width: 270
        },
        {
            label: 'Message',
            field: 'message',
            sort: 'asc',
            width: 270
          },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 100
        }
      ],
      rows: RowArray
    }

    return(
        <div className="dashboard-section">   
            <section id="main-dashboard">
            <Adminsidebar />
            <div class="dashboard-content">
              <div className="heading"><h4>Contact lists</h4></div>
              
                <div class="edit-form-main">
                    {this.state.showAlert ? (<Alert bsStyle={this.state.color}><strong>{this.state.message}</strong></Alert> ) : ( null )}

                    <MDBDataTable striped bordered hover data={data}  />
                </div>            
              </div>
            </section>
        </div>
    );
   }
}



export default ContactList; 