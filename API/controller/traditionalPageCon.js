const Traditional = require('./../models/traditionalModel')

exports.getTraditionalTODb = (req, res, next) => {    
    Traditional.find().then(result => {
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

exports.updateTraditionalTODb = async (req, res, next) => {
    try {
        const result = await Traditional.findByIdAndUpdate({ _id: req.body.id, }, {
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

exports.addTraditionalTODb = async (req, res, next) => { 
    console.log(req.body);    
    const traditional = new Traditional({
        title:req.body.title,
        content:req.body.content,
        section:req.body.section                                  
    }); 

    try {
            let result = await traditional.save();
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