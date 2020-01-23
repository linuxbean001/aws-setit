const Activitylog = require('../models/useractivityModel');

exports.getUserAvtivityLogListTODb = (req, res, next) => {    
    Activitylog.find({}).then(result => {
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

exports.delActivityLogTODb = (req, res, next) => {
    console.log('deleteNode:',req);
    Activitylog.deleteOne({_id:req.params.id}).then(result => {

        if (result) {
            res.status(201).json({
                data: result,
                success:true,
                message: 'Activity log data has been successfully deleted.'
            });

        }

    }).catch(err => {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Activity log not delete'
        });
        console.log('xxx x xxx', err);
    });
} 



// exports.delUserContactListTODb = (req, res, next) => {
//     console.log('deleteNode:',req);
//     ContactUs.deleteOne({_id:req.params.id}).then(result => {

//         if (result) {
//             res.status(201).json({
//                 data: result,
//                 success:true,
//                 message: 'User contact us data has been successfully deleted.'
//             });

//         }

//     }).catch(err => {
//         res.status(401).json({
//             data: err,
//             success: false,
//             message: 'User contact us not delete'
//         });
//         console.log('xxx x xxx', err);
//     });
// } 