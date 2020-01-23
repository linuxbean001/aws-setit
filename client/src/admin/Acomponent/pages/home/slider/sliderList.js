import React, { Component } from 'react';
import { MDBDataTable  } from 'mdbreact';
import { Button,Alert } from 'react-bootstrap';
import Adminsidebar from '../../../adminsidebar';
import AdminService from '../../../../Aservice/adminservice'
 const AdminAPI = new AdminService();
let RowArray=[];
class SliderList extends Component{
   constructor(props){
       super(props);
       this.state ={
        users: {},
        show: false,
        showAlert:false
       } 
       this.getAllSliderLists = this.getAllSliderLists.bind(this);
   }

componentDidMount(){
  this.getAllSliderLists();
}

getAllSliderLists() {
  AdminAPI.getAllSliderList()
        .then(res => {
          RowArray = [];
          console.log('name:',res.data.data);
        for(let i=0; i<res.data.data.length; i++){
            
             RowArray.push({slidertitle:res.data.data[i].slidertitle,sliderimage:<img style={{width: 100}} src={process.env.PUBLIC_URL + '/upload-file/'+res.data.data[i].sliderimage}/>,action:<Button onClick={this.delSlider.bind(this, res.data.data[i]._id, i)}  variant="danger" size="sm"><i class="fa fa-trash-o" aria-hidden="true"></i></Button>}) 
          }
         // console.log('ContacutServicArray:', res);
          this.setState({ users: RowArray });
        }).catch(err => {
            console.log('xxxxxxx xxxx ', err);
        });
}


delSlider(id) {
    AdminAPI.AdmindeleteSliderById(id)
      .then(res => {
         this.getAllSliderLists();
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
          label: 'Slider Title',
          field: 'slidertitle',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Slider Image',
          field: 'sliderimage',
          sort: 'asc',
          width: 150
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
              <div className="heading"><h4>Slider lists</h4></div>
              
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



export default SliderList; 