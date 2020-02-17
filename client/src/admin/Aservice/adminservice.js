import axios from 'axios';
export default class AdminService {

    constructor() {
        this.domain = 'ec2-18-221-255-18.us-east-2.compute.amazonaws.com';
        //this.domain = 'http://localhost:3300';
    }

    getUserAll(){
        console.log('adminService...xx..x');
        return axios.get( '/sellandleave/userlist')
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getAllContactList(){
        console.log('adminContactService...xx..x');
        return axios.get( '/sellandleave/userContactlist')
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    getAllActivityLogList(){
        console.log('adminuserlogService...xx..x');
        return axios.get( '/sellandleave/userActivityLog')
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    AdminEditUserInfo(userInfoVo){
        console.log('editAdminService:',userInfoVo);
        return axios.post( '/sellandleave/userEditInfo', userInfoVo)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    AdmindeleteUserById(id) {
        console.log('userSid:',id);
        return axios.delete( '/sellandleave/delUser/'+id)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    AdmindeleteUserContactById(id) {
        console.log('userSid:',id);
        return axios.delete( '/sellandleave/delUserContact/'+id)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    AdminDeleteActivityLogById(id) {
        console.log('ActivityLogId:',id);
        return axios.delete( '/sellandleave/delActivityLog/'+id)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    AdminAddSlider(sliderInfoVo){
         console.log('sliderInfoVo:',sliderInfoVo);
        //return axios.post('/sellandleave/addSlider', sliderInfoVo) 

        return axios.post( '/sellandleave/addSlider', sliderInfoVo, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }).then((result) => {
            console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
            return (err);
        });
    }

    getAllSliderList(){
        console.log('adminSliderService...xx..x');
        return axios.get( '/sellandleave/sliderList')
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    AdmindeleteSliderById(id) {
        console.log('sliderID:',id);
        return axios.delete( '/sellandleave/delSlider/'+id)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }

    AdminAddEIC(eicInfoVo){
        console.log('sliderInfoVo:',eicInfoVo);
       return axios.post( '/sellandleave/addEIC', eicInfoVo,
       {
        headers: {
            'Content-Type':'multipart/form-data'
        }
       }) 
       .then((result) => {
           console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
           return (result);
       }).catch(err => {
           console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
           return (err);
       });
   }

   getAllEICList(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/Eiclist')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

  AdmindeleteEICById(id) {
    console.log('EICID:',id);
    return axios.delete( '/sellandleave/delEIC/'+id)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

  AdminEditEICInfo(EICInfoVo){
    console.log('editAdminServiceEIC:',EICInfoVo);
    return axios.post( '/sellandleave/EICEditInfo', EICInfoVo,{
        headers: {
            'Content-Type':'multipart/form-data'
        }
    }).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 }

 
 AddWhocanuseit(EICInfoVo){
    console.log('whoeditAdminServiceEIC:',EICInfoVo);
    return axios.post( '/sellandleave/WhocanUseitInfo', EICInfoVo,{
        headers: {
            'Content-Type':'multipart/form-data'
        }
    }).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 }

 getWhoCanUseIt(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/Getwhocanuseit')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }



  AddPeaceofmind(EICInfoVo){
    console.log('whoeditAdminServiceEIC:',EICInfoVo);
    return axios.post( '/sellandleave/PeaceofmindInfo', EICInfoVo,{
        headers: {
            'Content-Type':'multipart/form-data'
        }
    }).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 }

 getPeaceOfMind(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/getpeaceofmind')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  } 

  AddEasyToUse(EICInfoVo){
    console.log('whoeditAdminServiceEIC:',EICInfoVo);
    return axios.post( '/sellandleave/EasytouseInfo', EICInfoVo,{
        headers: {
            'Content-Type':'multipart/form-data'
        }
    }).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 }

 getEasytouse(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/geteasytouse')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  } 

  AdminAddFAQ(FAQInfoVo){
    console.log('sliderInfoVo:',FAQInfoVo);
   return axios.post( '/sellandleave/addFAQ', FAQInfoVo) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
}

getAllFAQList(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/FAQlist')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

  AdmindeleteFAQById(id) {
    console.log('EICID:',id);
    return axios.delete( '/sellandleave/delFAQ/'+id)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

  AdminEditFAQInfo(FAQInfoVo){
    console.log('editAdminServiceEIC:',FAQInfoVo);
    return axios.post( '/sellandleave/FAQEditInfo', FAQInfoVo).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 }

 AddFAQheader(faqHeaderInfoVo){
    console.log('whoeditAdminServiceEIC:',faqHeaderInfoVo);
    return axios.post( '/sellandleave/faqheaderInfo', faqHeaderInfoVo,{
        headers: {
            'Content-Type':'multipart/form-data'
        }
    }).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 }

 getFAQheader(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/Getfaqheader')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }


  /**=== SERVICE PAGE API SERVICES ===*/

  AddServiceheader(serviceHeaderInfoVo){
    console.log('whoeditAdminServiceEIC:',serviceHeaderInfoVo);
    return axios.post( '/sellandleave/serviceheaderInfo', serviceHeaderInfoVo,{
        headers: {
            'Content-Type':'multipart/form-data'
        }
    }).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 }

 getServiceheader(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/Getserviceheader')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

  

AddServicesolution(serviceSolutionInfoVo){
    console.log('whoeditAdminServiceEIC:',serviceSolutionInfoVo);
    return axios.post( '/sellandleave/servicesolutionInfo', serviceSolutionInfoVo)
    .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 }

getServicesolution(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/Getservicesolution')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }


AdminAddServices(ServicesInfoVo){
    console.log('sliderInfoVo:',ServicesInfoVo);
   return axios.post( '/sellandleave/addServices', ServicesInfoVo) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
} 

getAllServiceList(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/Servicelist')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

  AdmindeleteServiceById(id) {
    console.log('EICID:',id);
    return axios.delete( '/sellandleave/delService/'+id)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

  AdminEditServiceInfo(ServiceInfoVo){
    console.log('editAdminServiceEIC:',ServiceInfoVo);
    return axios.post( '/sellandleave/ServiceEditInfo', ServiceInfoVo).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 }
 
 
 
 AdminAddPrice(PriceInfoVo){
    console.log('sliderInfoVo:',PriceInfoVo);
   return axios.post( '/sellandleave/addpricing', PriceInfoVo) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
}

getAllPriceList(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/pricelist')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

  AdmindeletePriceById(id) {
    console.log('EICID:',id);
    return axios.delete( '/sellandleave/delPrice/'+id)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

  AdminEditPriceInfo(PriceInfoVo){
    console.log('editAdminServiceEIC:',PriceInfoVo);
    return axios.post( '/sellandleave/PriceEditInfo', PriceInfoVo).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
 } 
 

 AdminSendresetpassword(userInfoVo) {
    console.log('updateuser:',userInfoVo );
    return axios.post( '/sellandleave/emailresetpassword', userInfoVo) 
     .then((result) => {
         return (result);
     }).catch(err => {
         console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
         return (err);
     });
}

AdminToolsStatus(toolInfoVo) {
    console.log('toolstatus:',toolInfoVo );
    return axios.post( '/sellandleave/toolenablestatus', toolInfoVo) 
     .then((result) => {
      
         return (result);
     }).catch(err => {
         console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
         return (err);
     });
}


 //*******************************vks block*/
 getTraditionalOverview(){
    return axios.get( '/sellandleave/traditionalOverview')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

TraditionalOverviewAdd(data){
    console.log("data check : ",data)
    return axios.post( '/sellandleave/traditionalOverviewAdd/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

TraditionalOverviewUpdate(data){
    console.log('Traditional Update: ',data);
    return axios.post( '/sellandleave/traditionalOverviewUpdate/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}


getTraditionalTab(){
    return axios.get( '/sellandleave/traditionalTab')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

TraditionalTabAdd(data){
    console.log("data check : ",data)
    return axios.post( '/sellandleave/traditionalTabAdd/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

TraditionalTabUpdate(data){
    console.log('Traditional Update: ',data);
    return axios.post( '/sellandleave/traditionalTabUpdate/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}


GetSIALI(){
    return axios.get( '/sellandleave/getSIALI')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

AddSIALIT(data){
    console.log("data check : ",data)
    return axios.post( '/sellandleave/addSIALI/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

UpdateSIALI(data){
    console.log('Traditional Update: ',data);
    return axios.post( '/sellandleave/updateSIALI/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

GetVideos(){
    return axios.get( '/sellandleave/getVideos')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

AddVideos(data){
    return axios.post( '/sellandleave/addVideos/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

UpdateVideos(data){
    return axios.post( '/sellandleave/updateVideos/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

GetAbout(){
    return axios.get( '/sellandleave/getAbout')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

AddAbout(data){
    return axios.post( '/sellandleave/addAbout/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

UpdateAbout(data){
    return axios.post( '/sellandleave/updateAbout/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

/** research service */

GetResearchOverview(){
    return axios.get( '/sellandleave/getResearchOverview')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

GetResearch(){
    return axios.get( '/sellandleave/getResearch')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

GetResource(){
    return axios.get( '/sellandleave/getResource')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

AddResearch(data){
    return axios.post( '/sellandleave/addResearch/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

UpdateResearch(data){
    return axios.post( '/sellandleave/updateResearch/',data)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}



AdminAddResource(resourceInfoVo){
    console.log('ResourceInfoVo:',resourceInfoVo);
   return axios.post( '/sellandleave/addNewResource', resourceInfoVo,
   {
    headers: {
        'Content-Type':'multipart/form-data'
    }
   }) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
}

getAllResourceList(){
console.log('admineicService...xx..x');
return axios.get( '/sellandleave/resourcelist')
    .then((result) => {
        return (result);
    }).catch(err => {
        console.log('xxxxxxx xxxxxxxxxxx err is ', err);
    });
}

AdmindeleteResourceById(id) {
console.log('ResourceID:',id);
return axios.delete( '/sellandleave/delResource/'+id)
    .then((result) => {
        return (result);
    }).catch(err => {
        console.log('xxxxxxx xxxxxxxxxxx err is ', err);
    });
}

AdminEditResourceInfo(resourceInfoVo){
console.log('editAdminServiceResource:',resourceInfoVo);
return axios.post( '/sellandleave/resourceEditInfo', resourceInfoVo,{
    headers: {
        'Content-Type':'multipart/form-data'
    }
   })
    .then((result) => {
        return (result);
    }).catch(err => {
        console.log('xxxxxxx xxxxxxxxxxx err is ', err);
    });
}


AdminAddResearch(researchInfoVo){
    console.log('ResearchInfoVo:',researchInfoVo);
   return axios.post( '/sellandleave/addNewResearch', researchInfoVo , {
    headers: {
        'Content-Type':'multipart/form-data'
    }
   }) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
}

getAllResearchList(){
console.log('admineicService...xx..x');
return axios.get( '/sellandleave/researchlist')
    .then((result) => {
        return (result);
    }).catch(err => {
        console.log('xxxxxxx xxxxxxxxxxx err is ', err);
    });
}

AdmindeleteResearchById(id) {
console.log('ResearchID:',id);
return axios.delete( '/sellandleave/delResearch/'+id)
    .then((result) => {
        return (result);
    }).catch(err => {
        console.log('xxxxxxx xxxxxxxxxxx err is ', err);
    });
}

AdminEditResearchInfo(researchInfoVo){
console.log('editAdminServiceResearch:',researchInfoVo);
return axios.post( '/sellandleave/researchEditInfo', researchInfoVo, {
    headers: {
        'Content-Type':'multipart/form-data'
    }
   })
    .then((result) => {
        return (result);
    }).catch(err => {
        console.log('xxxxxxx xxxxxxxxxxx err is ', err);
    });
}

//***************vks block closed */



/*******************new block */


AdminAddAccordian(AccordianInfoVo){
    console.log('sliderInfoVo:',AccordianInfoVo);
   return axios.post( '/sellandleave/addAccordian', AccordianInfoVo) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
}

getAllAccordianList(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/Accordianlist')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

AdmindeleteAccordianById(id) {
    return axios.delete( '/sellandleave/delAccordian/'+id)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

AdminEditAccordianInfo(AccordianInfoVo){
    console.log('editAdminServiceEIC:',AccordianInfoVo);
    return axios.post( '/sellandleave/AccordianEditInfo', AccordianInfoVo).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}



AdminAddTableRow(TableRowInfoVo){
    console.log('sliderInfoVo:',TableRowInfoVo);
   return axios.post( '/sellandleave/addTableRow', TableRowInfoVo) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
}

getAllTableRowList(){
    console.log('admineicService...xx..x');
    return axios.get( '/sellandleave/TableRowlist')
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
  }

AdmindeleteTableRowById(id) {
    return axios.delete( '/sellandleave/delTableRow/'+id)
        .then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}

AdminEditTableRowInfo(TableRowInfoVo){
    console.log('editAdminServiceEIC:',TableRowInfoVo);
    return axios.post( '/sellandleave/TableRowEditInfo', TableRowInfoVo).then((result) => {
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}
//***************vks block closed */


getQuestionnaireAll(){
    console.log('adminService...xx..x');
    return axios.get( '/sellandleave/questionnairelist')
        .then((result) => {
            console.log('resut:',result);
            return (result);
        }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
}



AdminpdfPrintSubmit(pdfInfoVo){
    console.log('pdfInfoVo:',pdfInfoVo);
   return axios.post( '/sellandleave/convertpdf', pdfInfoVo) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
}


AdminpdfPrintDelete(pdfInfoVo){
    console.log('pdfInfoVo:',pdfInfoVo);
   return axios.post( '/sellandleave/convertpdfdelete', pdfInfoVo) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
}

UserQueDelete(queId){
    console.log('pdfInfoVo:',queId);
   return axios.post( '/sellandleave/userquedelete/' + queId) 
   .then((result) => {
       console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
       return (result);
   }).catch(err => {
       console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
       return (err);
   });
}


}  