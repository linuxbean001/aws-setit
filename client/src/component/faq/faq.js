import React, { Component } from 'react';
import { Accordion, AccordionItem,AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import AdminService from '../../admin/Aservice/adminservice';
const AdminAPI = new AdminService();


class FAQ extends Component{
    constructor(props){
        super(props);
        this.props.onHeaderHover(true);
        this.state ={
            isHide:false,
            open:false,
            searchString: "",
            AccordionData:[],
            FAQheaderData:[],
            FAQData:[]
        }
        this.expandall = this.expandall.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getFAQheaders = this.getFAQheaders.bind(this);
        this.getAllFAQLists = this.getAllFAQLists.bind(this);
    }

    expandall(){
        const currentState = this.state.open;
        this.setState({ 
            open: !currentState,
         });
         console.log('yesssssssss');
    }

     componentDidMount() {
        window.scrollTo(0, 0);
         this.getFAQheaders();
         this.getAllFAQLists();
        this.refs.search.focus();
        document.title = "FAQ - SET IT AND LEAVE IT"
      }
    
      handleChange() {
        this.setState({
          searchString: this.refs.search.value
        });
      }

      getFAQheaders() {
        AdminAPI.getFAQheader()
              .then(res => {
                this.setState({ 
                    FAQheaderData: res.data.data[0]
                 });
              }).catch(err => {
                  console.log('xxxxxxx xxxx ', err);
              });
      }

      getAllFAQLists() {
        AdminAPI.getAllFAQList()
              .then(res => {
                console.log('name:',res.data.data);
                this.setState({ AccordionData: res.data.data });
              }).catch(err => {
                  console.log('xxxxxxx xxxx ', err);
              });
      }



render(){ 
 //console.log('FAQheaderData',this.state.FAQheaderData)
    let _users = this.state.AccordionData;
      let search = this.state.searchString.trim().toLowerCase();
  
      if (search.length > 0) {
        _users = _users.filter(function(AccordionData) {
          return AccordionData.title.toLowerCase().match(search);
        });
      }

         return(
                <div className="faq-section">

                   <section id="inner-page-banner">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="inner-page-banner-heading">
                                    <h2>{this.state.FAQheaderData.title}</h2>
                                </div>

                                <div class="inner-page-banner-image">
                                    <img src={process.env.PUBLIC_URL + '/upload-file/'+ this.state.FAQheaderData.image}/>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="blouq-content">    
                        <div class="container">
                            <div class="blouq-content-inner">
                                <p dangerouslySetInnerHTML={{ __html: this.state.FAQheaderData.content }} className="lh-17" />
                            </div>
                        </div>
                    </section>

                    <section class="faq-section">
                        <div class="container">
                            <div class="row pd-bottom-30">
                                <div class="col-md-3">
                                    <h3 class="s-title"> SEARCH FAQ </h3>
                                </div>
                                <div class="col-md-4">
                                    <div class="serch-faq-box">
                                        <input type="text" value={this.state.searchString} ref="search" onChange={this.handleChange} class="form-control" placeholder="Enter text"/>
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>

   
                    <div class="clearfix"></div> 
                            <Accordion allowZeroExpanded={true} >

                            {_users.map(l => {
                                return (
                                        <AccordionItem  >
                                        <AccordionItemHeading>
                                            <AccordionItemButton  >
                                            {l.title}
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel >
                                           
                                            <p dangerouslySetInnerHTML={{ __html: l.content }} />
                                        </AccordionItemPanel>
                                        </AccordionItem>
                                    );
                             })}
                        </Accordion>
                        
                        </div>
                    </section>


                    
                </div>
         );
}
}
export default FAQ;