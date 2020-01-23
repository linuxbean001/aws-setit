const Slider = require('../models/sliderModel');
const EIC = require('../models/EICModel');
const HomeContent = require('../models/homeContentModel');
const FAQ = require('../models/FAQModel');
const FAQbanner = require('../models/FAQbannerModel');
const SERVICEbanner = require('../models/ServicebannerModel');
const SERVICEsolution = require('../models/servicesolutionModel');
const SERVICEservices = require('../models/ServicesModel');
const SERVICEPrice = require('../models/PriceModel');
const Research = require('../models/researchModel');
const Resource = require('../models/resourceModel');
const HomeBGimage = require('../models/homeBackgroundImage');

/** vks block */
const Accordian = require('../models/accordianModel');
const TableRow = require('../models/tableRowModel');

var fs = require('fs');
var filePath ='';
exports.addsliderTODb = async (req, res, next) => { 
   console.log('vivek:',req)
    const slider = new Slider({
        slidertitle: req.body.sliderTitle,
        sliderimage: req.file.filename,
        datetime: req.body.datetime
    }); 

    try {
            let result = await slider.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'Slider Added successfully.'
                });
            }
            
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
}


exports.getSliderListTODb = (req, res, next) => {    
    Slider.find({}).then(result => {
        console.log('Slider xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}



exports.delSliderListTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    Slider.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'Slider deleted successfully.'
            });

        }
    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong.'
        });
        console.log('xxx x xxx', err);
    });
} 


exports.addEicTODb = async (req, res, next) => { 
    const eicCode = new EIC({
        title: req.body.title,
        content: req.body.content,
        image: req.file.filename,
        datetime: req.body.datetime
    }); 

    try {
            let result = await eicCode.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'EIC Added successfully.'
                });
            }
            
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
}


exports.getEICListTODb = (req, res, next) => {    
    EIC.find({}).then(result => {
        console.log('Slider xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}


exports.delEICListTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    EIC.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'EIC deleted successfully.'
            });

        }
    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong.'
        });
        console.log('xxx x xxx', err);
    });
} 


exports.editEICTODb = async (req, res, next) => {
    //console.log('vivekreq:',req.file.destination)
    try {
        var image ='';
        if(req.file){
            image = req.file.filename;
            filePath = req.file.destination+req.body.oldimage; 
             if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                  }
        }else{
            image = req.body.oldimage;
        }
        const result = await EIC.findByIdAndUpdate({ _id: req.body.id, }, {
            title: req.body.title,
            content: req.body.content,
            image: image
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'EIC Content Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}


exports.WhocanuseitTODb = async (req, res, next) => {
    console.log('vivekreq:',req)
   var result='';
   var image='';
    try {
        if(req.file){
            image = req.file.filename;
            if(req.body.oldimage){
                filePath = req.file.destination+req.body.oldimage; 
                if (fs.existsSync(filePath)) {
                     if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                  }
                  }
            }
        }else{
            image = req.body.oldimage;
        }

        if(req.body.id){
                 result = await HomeContent.findByIdAndUpdate({ _id: req.body.id, }, {
                    title: req.body.title,
                    content: req.body.content,
                    image: image
                });
        }else{
            const HomeContentData = new HomeContent({
                title: req.body.title,
                content: req.body.content,
                image: req.file.filename,
                datetime: req.body.datetime,
                option:'whocanuseit'
            });
           
             result = await HomeContentData.save();
        }

        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'Content Update successfully'
            });
        }
    }catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

} 


exports.Getwhocanuseit = (req, res, next) => {    
    HomeContent.find({}).then(result => {
        console.log('Whocanuseit xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}



exports.PeaceofmindTODb = async (req, res, next) => {
   console.log('vivekreq:',req)
   var result='';
   var image='';
    try {
        if(req.file){
            image = req.file.filename;
            if(req.body.oldimage){
                filePath = req.file.destination+req.body.oldimage; 
                 if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                  }
            }
        }else{
            image = req.body.oldimage;
        }

        if(req.body.id){
                 result = await HomeContent.findByIdAndUpdate({ _id: req.body.id, }, {
                    title: req.body.title,
                    content: req.body.content,
                    image: image
                });
        }else{

            const HomeContentData = new HomeContent({
                title: req.body.title,
                content: req.body.content,
                image: req.file.filename,
                datetime: req.body.datetime,
                option:'peaceofmind'
            });
           
             result = await HomeContentData.save();
        }

        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'Content Update successfully'
            });
        }
    }catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

} 


exports.Getpeaceofmind = (req, res, next) => {    
    HomeContent.find({}).then(result => {
        console.log('Whocanuseit xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}





exports.EasytouseTODb = async (req, res, next) => {
    console.log('vivekreq:',req)
    var result='';
    var image='';
     try {
         if(req.file){
             image = req.file.filename;
             if(req.body.oldimage){
                 filePath = req.file.destination+req.body.oldimage; 
                  if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                  }
             }
         }else{
             image = req.body.oldimage;
         }
 
         if(req.body.id){
                  result = await HomeContent.findByIdAndUpdate({ _id: req.body.id, }, {
                     title: req.body.title,
                     content: req.body.content,
                     image: image
                 });
         }else{
 
             const HomeContentData = new HomeContent({
                 title: req.body.title,
                 content: req.body.content,
                 image: req.file.filename,
                 datetime: req.body.datetime,
                 option:'easytouse'
             });
            
              result = await HomeContentData.save();
         }
 
         if (result) {
             res.status(201).json({
                 data: result,
                 success: true,
                 message: 'Content Update successfully'
             });
         }
     }catch (err) {
         res.status(401).json({
             data: err,
             success: false,
             message: 'Something going wrong please check.'
         });
         console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
     }
 
 } 
 
 
 exports.Geteasytouse = (req, res, next) => {    
     HomeContent.find({}).then(result => {
         console.log('Whocanuseit xxx x xxx', result);
         if (result){
             res.status(201).json({
                 data: result
             });
 
         }
     }).catch(err => {
         console.log('xxx x xxx', err);
     });
 }


 exports.addFAQTODb = async (req, res, next) => { 
    const faqData = new FAQ({
        title: req.body.title,
        content: req.body.content,
        datetime: req.body.datetime
    }); 

    try {
            let result = await faqData.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'FAQ Added successfully.'
                });
            }
            
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
} 

exports.getFAQListTODb = (req, res, next) => {    
    FAQ.find({}).then(result => {
        console.log('Slider xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}

exports.delFAQListTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    FAQ.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'FAQ deleted successfully.'
            });

        }
    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong.'
        });
        console.log('xxx x xxx', err);
    });
} 


exports.editFAQTODb = async (req, res, next) => {
    //console.log('vivekreq:',req)
    try {
        const result = await FAQ.findByIdAndUpdate({ _id: req.body.id, }, {
            title: req.body.title,
            content: req.body.content
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'FAQ Content Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}


exports.FAQheaderBannerTODb = async (req, res, next) => {
    //console.log('vivekreq:',req)
    var result='';
    var image='';
     try {
         if(req.file){
             image = req.file.filename;
             if(req.body.oldimage){
                 filePath = req.file.destination+req.body.oldimage; 
                  if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                  }
             }
         }else{
             image = req.body.oldimage;
         }
 
         if(req.body.id){
                  result = await FAQbanner.findByIdAndUpdate({ _id: req.body.id, }, {
                     title: req.body.title,
                     content: req.body.content,
                     image: image
                 });
         }else{
 
             const FAQContentData = new FAQbanner({
                 title: req.body.title,
                 content: req.body.content,
                 image: req.file.filename,
                 datetime: req.body.datetime,
                 option:'easytouse'
             });
            
              result = await FAQContentData.save();
         }
 
         if (result) {
             res.status(201).json({
                 data: result,
                 success: true,
                 message: 'Content Update successfully'
             });
         }
     }catch (err) {
         res.status(401).json({
             data: err,
             success: false,
             message: 'Something going wrong please check.'
         });
         console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
     }
 
 } 


 exports.Getfaqheaderbanner = (req, res, next) => {    
    FAQbanner.find({}).then(result => {
        console.log('Whocanuseit xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}


/**==  SERVICE BANNER PAGE ==*/


exports.ServiceheaderBannerTODb = async (req, res, next) => {
    //console.log('vivekreq:',req)
    var result='';
    var image='';
     try {
         if(req.file){
             image = req.file.filename;
             if(req.body.oldimage){
                 filePath = req.file.destination+req.body.oldimage; 
                  if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                  }
             }
         }else{
             image = req.body.oldimage;
         }
 
         if(req.body.id){
                  result = await SERVICEbanner.findByIdAndUpdate({ _id: req.body.id, }, {
                     title: req.body.title,
                     content: req.body.content,
                     footercontent:req.body.footercontent,
                     image: image
                 });
         }else{
 
             const SERVICEContentData = new SERVICEbanner({
                 title: req.body.title,
                 content: req.body.content,
                 footercontent:req.body.footercontent,
                 image: req.file.filename,
                 datetime: req.body.datetime
             });
            
              result = await SERVICEContentData.save();
         }
 
         if (result) {
             res.status(201).json({
                 data: result,
                 success: true,
                 message: 'Content Update successfully'
             });
         }
     }catch (err) {
         res.status(401).json({
             data: err,
             success: false,
             message: 'Something going wrong please check.'
         });
         console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
     }
 
 } 


 exports.Getserviceheaderbanner = (req, res, next) => {    
    SERVICEbanner.find({}).then(result => {
        console.log('Whocanuseit xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}



exports.ServiceSolutionTODb = async (req, res, next) => {
    var result='';
    console.log('vivek:',req);
     try {
         if(req.body.id){
                  result = await SERVICEsolution.findByIdAndUpdate({ _id: req.body.id, }, {
                     sectiontitle: req.body.sectiontitle, 
                     ftitle: req.body.ftitle,
                     fcontent: req.body.fcontent,
                     stitle: req.body.stitle,
                     scontent: req.body.scontent
                 });
         }else{
 
             const SERVICEContentData = new SERVICEsolution({
                sectiontitle: req.body.sectiontitle, 
                ftitle: req.body.ftitle,
                fcontent: req.body.fcontent,
                stitle: req.body.stitle,
                scontent: req.body.scontent,
                datetime: req.body.datetime
             });
            
              result = await SERVICEContentData.save();
         }
 
         if (result) {
             res.status(201).json({
                 data: result,
                 success: true,
                 message: 'Content Update successfully'
             });
         }
     }catch (err) {
         res.status(401).json({
             data: err,
             success: false,
             message: 'Something going wrong please check.'
         });
         console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
     }
 
 } 


 exports.GetserviceSolution = (req, res, next) => {    
    SERVICEsolution.find({}).then(result => {
        console.log('Whocanuseit xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}



exports.addServiceTODb = async (req, res, next) => { 
    const servicesData = new SERVICEservices({
        title: req.body.title,
        content: req.body.content,
        shortcontent: req.body.shortcontent,
        datetime: req.body.datetime
    }); 

    try {
            let result = await servicesData.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'Services Added successfully.'
                });
            }
            
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
} 

exports.getServiceListTODb = (req, res, next) => {    
    SERVICEservices.find({}).then(result => {
        console.log('Slider xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}

exports.delServiceListTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    SERVICEservices.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'Service deleted successfully.'
            });

        }
    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong.'
        });
        console.log('xxx x xxx', err);
    });
} 


exports.editServiceTODb = async (req, res, next) => {
    console.log('test',req);
    try {
        const result = await SERVICEservices.findByIdAndUpdate({ _id: req.body.id, }, {
            title: req.body.title,
            content: req.body.content,
            shortcontent: req.body.shortcontent
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'Service Content Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
}



/*-- service pricing ---*/

exports.addPriceTODb = async (req, res, next) => { 
    const priceData = new SERVICEPrice({
        title: req.body.title,
        content: req.body.content,
        datetime: req.body.datetime
    }); 

    try {
            let result = await priceData.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'Pricing Data Added successfully.'
                });
            }
            
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
} 

exports.getPriceListTODb = (req, res, next) => {    
    SERVICEPrice.find({}).then(result => {
        console.log('Slider xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}

exports.delPriceListTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    SERVICEPrice.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'Pricing data deleted successfully.'
            });

        }
    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong.'
        });
        console.log('xxx x xxx', err);
    });
} 


exports.editPriceTODb = async (req, res, next) => {
    //console.log('vivekreq:',req)
    try {
        const result = await SERVICEPrice.findByIdAndUpdate({ _id: req.body.id, }, {
            title: req.body.title,
            content: req.body.content
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'Pricing Content Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}

/*-----------------vks----------------*/

exports.addResearchTODb = async (req, res, next) => { 
    console.log(req)
    var links='',doc='';
    console.log('vivektest:',req.body.links)
    if(req.body.links != 'undefined'){
        links = req.body.links
    }else{
        links = '';
    }
    if(this.file){
        doc=req.file.filename;
    }else{
        doc='';
    }
    const researchCode = new Research({
        title: req.body.title,
        description: req.body.description,
        links: links,
        files: doc,
        datetime: req.body.datetime
    }); 

    try {
            let result = await researchCode.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'Research Added successfully.'
                });
            }
            
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
}


exports.getResearchListTODb = (req, res, next) => {    
    Research.find({}).then(result => {
        console.log('Slider xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}


exports.delResearchListTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    Research.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'Research deleted successfully.'
            });

        }
    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong.'
        });
        console.log('xxx x xxx', err);
    });
} 


exports.editResearchTODb = async (req, res, next) => {
    //console.log('vivekreq:',req)
    try {
        var image ='';
        if(req.file){
            image = req.file.filename;            
            if(req.body.oldimage){
                filePath = req.file.destination+req.body.oldimage; 
                 if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                 }
            }
 
        }else{
            image = req.body.oldimage;
        }

        var links='';
        //console.log('vivektest:',req.body.links)
        if(req.body.links != 'undefined'){
            links = req.body.links
        }else{
            links = '';
        }
        
        const result = await Research.findByIdAndUpdate({ _id: req.body.id, }, {
            title: req.body.title,
            description: req.body.description,
            links: links,
            files:image
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'Research Content Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}

exports.addResourceTODb = async (req, res, next) => {
    console.log(req) 

    var links='',doc='';
    console.log('vivektest:',req.body.links)

    if(req.body.links != 'undefined'){
        links = req.body.links
    }else{
        links = '';
    }
    if(req.file){
       doc = req.file.filename;
    }else{
       doc = '';
    }

    const resourceCode = new Resource({
        title: req.body.title,
        description: req.body.description,
        files: doc,
        links: links,
        datetime: req.body.datetime
    }); 

    try {
            let result = await resourceCode.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'Resource Added successfully.'
                });
            }
            
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
}


exports.getResourceListTODb = (req, res, next) => {    
    Resource.find({}).then(result => {
        console.log('Slider xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}


exports.delResourceListTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    Resource.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'Resource deleted successfully.'
            });

        }
    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong.'
        });
        console.log('xxx x xxx', err);
    });
} 


exports.editResourceTODb = async (req, res, next) => {
    console.log('vks test data: ',req)
    try {
        var image ='';
        if(req.file){
            if(req.body.oldimage){
                filePath = req.file.destination+req.body.oldimage; 
                console.log('pathhhhhhhhh',filePath)
                 if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                  }
            }
               
            image = req.file.filename;            

        }else{
            image = req.body.oldimage;
        }

        var links='';
        console.log('vivektest:',req.body.links)
        if(req.body.links != 'undefined'){
            links = req.body.links
        }else{
            links = '';
        }

        const result = await Resource.findByIdAndUpdate({ _id: req.body.id }, {
            title: req.body.title,
            description: req.body.description,
            links: links,
            files:image
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'Resource Content Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}



/** vks block */

exports.addAccordianTODb = async (req, res, next) => { 
    const accordianData = new Accordian({
        title: req.body.title,
        content: req.body.content,
        datetime: req.body.datetime
    }); 

    try {
            let result = await accordianData.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'Accordian Added successfully.'
                });
            }
            
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
} 

exports.getAccordianListTODb = (req, res, next) => {    
    Accordian.find({}).then(result => {
        console.log('Slider xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}

exports.delAccordianListTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    Accordian.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'Accordian deleted successfully.'
            });

        }
    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong.'
        });
        console.log('xxx x xxx', err);
    });
} 


exports.editAccordianTODb = async (req, res, next) => {
    //console.log('vivekreq:',req)
    try {
        const result = await Accordian.findByIdAndUpdate({ _id: req.body.id, }, {
            title: req.body.title,
            content: req.body.content
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'Accordian Content Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}


exports.addTableRowTODb = async (req, res, next) => { 
    const tableRowData = new TableRow({
        title: req.body.title,
        swr: req.body.swr,
        va: req.body.va,
        datetime: req.body.datetime
    }); 

    try {
            let result = await tableRowData.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'TableRow Added successfully.'
                });
            }
            
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Backend error'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
} 

exports.getTableRowListTODb = (req, res, next) => {    
    TableRow.find({}).then(result => {
        console.log('Slider xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}

exports.delTableRowListTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    TableRow.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'TableRow deleted successfully.'
            });

        }
    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong.'
        });
        console.log('xxx x xxx', err);
    });
} 


exports.editTableRowTODb = async (req, res, next) => {
    //console.log('vivekreq:',req)
    try {
        const result = await TableRow.findByIdAndUpdate({ _id: req.body.id, }, {
            title: req.body.title,
            swr: req.body.swr,
            va: req.body.va,
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'TableRow Content Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}

