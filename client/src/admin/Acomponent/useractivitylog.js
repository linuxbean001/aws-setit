import React, { Component } from 'react';
import Adminsidebar from './adminsidebar';
import { MDBDataTable  } from 'mdbreact';
import { Button,Alert } from 'react-bootstrap';
import AdminService from '../Aservice/adminservice';
import moment from 'moment';
import { CSVLink } from 'react-csv';
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
       this.getAllActivityLogList = this.getAllActivityLogList.bind(this);
   }

componentDidMount(){
  this.getAllActivityLogList();
}

getAllActivityLogList() {
  AdminAPI.getAllActivityLogList()
        .then(res => {
          RowArray = [];
          let activityData=[];
          console.log('name:',res.data.data);
        for(let i=0; i<res.data.data.length; i++){          
          activityData = res.data.data[i].activitydata.split('|||');
          var activityDate = res.data.data[i].datetime;
          const fActivityDate = moment(activityDate).format("YYYY-MM-DD HH:mm");
          // console.log('activity',JSON.stringify(activityData));
             RowArray.push({name:res.data.data[i].name,activityaction:res.data.data[i].action,activitydata:activityData.join('/'),datetime: fActivityDate,action:<Button onClick={this.delActivityLog.bind(this, res.data.data[i]._id, i)}  variant="danger" size="sm"><i class="fa fa-trash-o" aria-hidden="true"></i></Button>}) 
          }
         // console.log('ContacutServicArray:', res);
          this.setState({ users: RowArray });
        }).catch(err => {
            console.log('xxxxxxx xxxx ', err);
        });
}




delActivityLog(id) {
  AdminAPI.AdminDeleteActivityLogById(id)
    .then(res => {
       this.getAllActivityLogList();
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
          label: 'Action',
          field: 'activityaction',
          sort: 'asc',
          width: 150
        },
        {
            label: 'Data',
            field: 'activitydata',
            sort: 'asc',
            width: 250
        },
        {
            label: 'Date/Time',
            field: 'datetime',
            sort: 'asc',
            width: 300
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
            
              <div className="heading"><h4>Activity Log lists</h4></div>
              
                <div class="edit-form-main">
                  <CSVLink data={RowArray} filename={"CustomerActivityLog.csv"} className="btn btn-primary" target="_blank">Download CSV</CSVLink>
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