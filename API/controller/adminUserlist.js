const User = require('../models/registerModel');

exports.getUserTODb = (req, res, next) => {    
    User.find({}).then(result => {
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

exports.editUserTODb = async (req, res, next) => {
    //console.log('yaha pe hu ya nhi ');
    try {
        const result = await User.findByIdAndUpdate({ _id: req.body.id, }, {
            name: req.body.name,
            email: req.body.email
        });
        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                message: 'User Update successfully'
            });
        }
    } catch (err) {
        res.status(401).json({
            data: result,
            success: false,
            message: 'User not Update successfully'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}


exports.delUserTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    User.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'User delete successfully'
            });

        }

    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'User not delete'
        });
        console.log('xxx x xxx', err);
    });
} 