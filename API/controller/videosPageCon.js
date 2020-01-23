const Videos = require('./../models/videosModel')

exports.getVideosTODb = (req, res, next) => {    
    Videos.find().then(result => {
        console.log('xxx x xxx', result);
        if (result){
            res.status(201).json({
                data: result,
                success: true,
                message: 'Content Updated successfully.'
            });
        }
    }).catch(err => {
        res.status(401).json({
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    });
}

exports.updateVideosTODb = async (req, res, next) => {
    try {
        const result = await Videos.findByIdAndUpdate({ _id: req.body.id, }, {
            title: req.body.title,
            content: req.body.content
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'Content Updated successfully.'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: result,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
}

exports.addVideosTODb = async (req, res, next) => { 
    console.log(req.body);    
    const videos = new Videos({
        title:req.body.title,
        content:req.body.content,
        section:req.body.section                                  
    }); 

    try {
            let result = await videos.save();
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