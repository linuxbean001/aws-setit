import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import UserService from '../../reactservice/UserService';

const API = new UserService();


const PrintButton = ({label}) => (<div className="tc mb4 mt2">
  <div
    className="calculat"
    onClick={() => {     
      let userData=API.getProfile().data;
      var date = (new Date()).toISOString().split('T')[0];
      html2canvas(document.querySelector('#tools_pdf')).then(canvas => {  
        var dataURL = canvas.toDataURL();
        var pdf = new jsPDF({compress: true});
       // pdf.addImage(dataURL, 'PNG', 5, -200, 200, 500); 
        pdf.addImage(dataURL, 'PNG',  5, -190, 200, 500);
        //addImage(image, format, x-coordinate, y-coordinate, width, height)
        // pdf.setTextColor(239,225,225);
        // pdf.setFontSize(50);
        // pdf.text(20, 200, 'NOT FOR COMMERCIAL USE', 45);
        // pdf.setFont("helvetica");
        // pdf.setFontType("bold");
       
        pdf.save(userData.name+'-'+date+".pdf");
      });   
     
      const generatePDF ={
        "id":userData._id,
        "name":userData.name            
      }

      API.generatePDFActivityLog(generatePDF)
        .then((result) => {
            if(result.data.success){
                // console.log('xxx res:', result );
                //this.resetForm();
                this.setState({
                    showAlert:true,
                    color:'green',
                    message: result.data.message
                });
            }else{
                // console.log('xxx errocode:', result );
                this.setState({
                    showAlert:true,
                    color:'#b31313d6',
                    message: result.data.message
                });
    
            } 
        }).catch(err => {
            // console.log('xxx new:', err);
        })       

    }}
  >
    <a hre='#/' style={{color:'white'}}>{label}</a>
  </div>
</div>);

export default PrintButton;