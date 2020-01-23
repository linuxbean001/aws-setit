const Research = require('../models/researchPageModel')

exports.getResearchTODb = (req, res, next) => {    
    Research.find().then(result => {
  // console.log('nODE ');
        console.log('xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}

exports.updateResearchTODb = async (req, res, next) => {
    try {
        const result = await Research.findByIdAndUpdate({ _id: req.body.id, }, {
            title: req.body.title,
            content: req.body.content
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'Content Updated successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: result,
            success: false,
            message: 'Something going wrong please check'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}

exports.addResearchTODb = async (req, res, next) => { 
    console.log(req.body);    
    const research = new Research({
        title:req.body.title,
        content:req.body.content,
        section:req.body.section                                  
    }); 

    try {
            let result = await research.save();
            if (result) {
                res.status(201).json({
                    data: result, 
                    success:true, 
                    message:'Successfully Added Section Content'
                });
                console.log(data)
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