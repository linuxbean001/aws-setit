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
class ServiceSolution extends Component{
    constructor(props){
        super(props);
        this.state ={
            isHide:false,
            fields: [],        
            errors: {},
            whoData:{},
            showAlert:false,
            fcontent:'',
            ftitle:'',
            scontent:'',
            stitle:'',
            sectiontitle:'',
            id:''
            //editorState:EditorState.createEmpty()
        }
        this.AddServicesolutionFuc = this.AddServicesolutionFuc.bind(this);
        
    }



componentDidMount(){
    this.getServicesolutions()
}

getServicesolutions() {
    API.getServicesolution()
          .then(res => {
            console.log('name:',res.data.data[0]);
            this.setState({ 
                ftitle: res.data.data[0].ftitle,
                fcontent: res.data.data[0].fcontent,
                stitle: res.data.data[0].stitle,
                scontent: res.data.data[0].scontent,
                sectiontitle: res.data.data[0].sectiontitle,
                id: res.data.data[0]._id,
             });
          }).catch(err => {
              console.log('xxxxxxx xxxx ', err);
          });
  }

AddServicesolutionFuc(e){
        // var serviceInfoVo = new FormData()
        // serviceInfoVo.append('sectiontitle', this.refs.sectiontitle.value)
        // serviceInfoVo.append('ftitle', this.refs.ftitle.value)
        // serviceInfoVo.append('fcontent', this.refs.fcontent.value)
        // serviceInfoVo.append('stitle', this.refs.stitle.value)
        // serviceInfoVo.append('scontent', this.refs.scontent.value)
        // serviceInfoVo.append('id', this.refs.id.value)
        // serviceInfoVo.append('datetime', new Date())

        const serviceInfoVo = {
            'sectiontitle': this.refs.sectiontitle.value,
            'ftitle': this.refs.ftitle.value,
            'fcontent': this.refs.fcontent.value,
            'stitle': this.refs.stitle.value,
            'scontent': this.refs.scontent.value,
            'id': this.refs.id.value,
            'datetime': new Date()
        }


        API.AddServicesolution(serviceInfoVo).then((result) => {
            this.getServicesolutions()
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
                                                    <h5 class="panel-title">SERVICE SOLUTION CONTENT</h5>
                                                </div>
                                                <div class="panel-body">

                                                <form role="form">

                                                    <input className="form-control" onChange={this.handleChange.bind(this, "id")} type="hidden" ref="id" id="id" name="id" defaultValue={this.state.id} />

                                                    <div class="form-group">
                                                        <label>Section Title</label>
                                                        <input type="text" id="sectiontitle" ref="sectiontitle" onChange={this.handleChange.bind(this, "sectiontitle")}  value={this.state.fields["sectiontitle"] ? this.state.fields["sectiontitle"] : this.state.sectiontitle} className={this.state.errors["sectiontitle"] ? this.state.errors["sectiontitle"] : 'form-control'} />
                                                    </div>

                                                    
                                                    <div class="form-group">
                                                        <label>First Block Title</label>
                                                        <input type="text" id="ftitle" ref="ftitle" onChange={this.handleChange.bind(this, "ftitle")}  value={this.state.fields["ftitle"] ? this.state.fields["ftitle"] : this.state.ftitle} className={this.state.errors["ftitle"] ? this.state.errors["ftitle"] : 'form-control'} />
                                                    </div>

                                                    <div class="form-group">
                                                        <label>First Block Description</label>
                                                      
                                                        <textarea
                                                        className="form-control"
                                                        id="fcontent" 
                                                        ref="fcontent"
                                                        onChange={this.handleChange.bind(this, "fcontent")}  
                                                        value={this.state.fields["fcontent"] ? this.state.fields["fcontent"] : this.state.fcontent} 
                                                        className='form-control'
                                                        />

                                                    </div>


                                                    <div class="form-group">
                                                        <label>Second Block Title</label>
                                                        <input type="text" id="stitle" ref="stitle" onChange={this.handleChange.bind(this, "stitle")}  value={this.state.fields["stitle"] ? this.state.fields["stitle"] : this.state.stitle} className={this.state.errors["stitle"] ? this.state.errors["stitle"] : 'form-control'} />
                                                    </div>

                                                    <div class="form-group">
                                                        <label>Second Block Description</label>

                                                        <textarea
                                                        className="form-control"
                                                        id="scontent" 
                                                        ref="scontent"
                                                        onChange={this.handleChange.bind(this, "scontent")}  
                                                        value={this.state.fields["scontent"] ? this.state.fields["scontent"] : this.state.scontent} 
                                                        className='form-control'
                                                        />

                                                    </div>
                                                    <button type="button" onClick={this.AddServicesolutionFuc} class="btn btn-success" title="">Submit</button>
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

    export default ServiceSolution;