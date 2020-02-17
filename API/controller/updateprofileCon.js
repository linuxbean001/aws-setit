const updateProfile = require('../models/registerModel');
const Activitylog = require('../models/useractivityModel');
const userQusetion = require('../models/questionModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const creds = require('./config');
const pdf = require('html-pdf');
var path = require('path');
sgMail.setApiKey(creds.SENDGRID_API_KEY);
var pdfcrowd = require("pdfcrowd");
// create the API client instance
var client = new pdfcrowd.HtmlToPdfClient("set123", "0b2dd715e7356f8ccfec32665d353774");
var fs = require('fs');
exports.updateProfileTODb = async (req, res, next) => {

    try {
        const result = await updateProfile.findByIdAndUpdate({ _id: req.body.id, }, {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
        });

        const token = jwt.sign({
            email: req.body.email,
            name: req.body.name,
            username: req.body.username,
            role: req.body.role,
            _id: req.body.id
        }, '@' + req.body.id + '-' + req.body.email,
            {
                expiresIn: "1h"
            });

        if (result) {
            res.status(201).json({
                data: result,
                success: true,
                token: token,
                message: 'Profile Updated successfully.'
            });
        }

        addToActivityLog(result._id, result.name, 'Update Profile', 'User : ' + result.username + ' updates profile- Name: ' + req.body.name + ' Email: ' + req.body.email);
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}

addToActivityLog = (userid, name, action, activitydata) => {
    const userLog = new Activitylog({
        userid: userid,
        name: name,
        action: action,
        datetime: new Date(),
        activitydata: activitydata
    });

    let Logresult = userLog.save();
    if (Logresult) {
        console.log('Activity Store');
    } else {
        console.log('No store');
    }
}



exports.resetpasswordTODb = async (req, res, next) => {
    try {
        let oldpass = await updateProfile.findOne({ password: req.body.oldpassword });
        console.log('oldpass:', oldpass);
        if (oldpass) {
            const result = await updateProfile.findByIdAndUpdate({ _id: req.body.id, }, {
                password: req.body.newpassword
            });

            if (result) {
                res.status(201).json({
                    data: result,
                    success: true,
                    message: 'Your password has been changed successfully.'
                });
            }
        } else {
            res.status(201).json({
                data: oldpass,
                success: false,
                message: 'your current password is wrong please try once.'
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


exports.emailresetpasswordTODb = async (req, res, next) => {
    try {
        let user = await updateProfile.findOne({ _id: req.body.id });
        console.log('user:', user);
        if (user) {

            const emailForAdmin = `
            <div style="padding:10px 100px 0px 0px;width:60%">
            <center><h1 style="margin:0;"> Reset Your Password</h1></center>
            <br/>          
            <p>Hello ${user.name},</p>                  
            <p style="margin:0;">Need to reset password? No problem! just click the button below 
            and you'll be on your way. if you did not make this request, please ignore this email. </p>
            <a href="${creds.domain}/front/resetpassword?user=${user.email}">Reset your password</a>
            </div>`;

            const UpdateProfilemsg = {
                from: '"Reset your password" <' + creds.USER + '>', // sender address
                to: user.email, //creds.USER, // list of receivers
                subject: 'Reset your password.', // Subject line
                html: emailForAdmin // html body
            };
            sgMail.send(UpdateProfilemsg);


            const result = await updateProfile.findByIdAndUpdate({ _id: req.body.id, }, {
                presetemail: new Date(),
                presetlink: "0"
            });

            if (result) {
                res.status(201).json({
                    data: result,
                    success: true,
                    message: 'Password reset email send successfully.'
                });
            }

        } else {
            res.status(201).json({
                data: user,
                success: false,
                message: 'Something going wrong please check.'
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
function _getToken(data) {
    return new Promise((resolve, reject) => {
        console.log(data);
        const tokenData = _setDataForToken(data);
        const secret = "JWT_TOKEN_SECRET";
        const token = jwt.sign(tokenData, secret,
            {
                expiresIn: "5h"
            });
        resolve(token);
    });
}

function _setDataForToken(data) {
    console.log('xxxxxxxxxx xxxxxxxxxxxx', data);

    const tokenData = {

        email: data.email,

    }
    return tokenData;
}

exports.useremailsendresetlinkTODb = async (req, res, next) => {

    console.log('xx data is useremail', req.body.useremail);

    try {
        let userdata = await updateProfile.findOne({ email: req.body.useremail });
        console.log('userdatauserdata', userdata);

        _getToken(userdata)
            .then(token => {
                console.log('token12345', token);
              
                let localUrl = `http://ec2-18-221-255-18.us-east-2.compute.amazonaws.com/front/resetpassword/` + token
                //let localUrl = `http://localhost:3000/front/resetpassword/`+token
                const emailForUser = `<!docType html>
                <body>
                <p>We received a request to change your SET IT AND LEAVE IT password. If you initiated this request, then please click on this <a href=` + localUrl + `>link</a> to reset you password. If you did not initiate a password reset, please reply to this email to let is know.
                </p>
                <p style="margin:0;font-size:14px">Best Regards,</p>
                <p style="margin-bottom:10px;font-size:16px"><em style="color:#9464B8">SET IT <span style="font-size:10px;">AND</span> LEAVE IT</em> Team</p><br/><br/>
                <p><img src="https://firebasestorage.googleapis.com/v0/b/test-85de8.appspot.com/o/logo1.096101be.png?alt=media&token=c8c17d4d-ac1d-46a6-ae59-8afb7dba94da" style="width:200px;height:auto"/></p>
                <p style="margin-top:10px;font-size:16px"><b>Phone:</b> <a href="tel:18669005050">1-866-900-5050</a> | <b>Email:</b> <a href="mailto:info@setitandleaveit.com">info@SetItandLeaveIt.com</a> | <b>Web:</b> <a href="www.setitandleaveit.com">www.SetItandLeaveIt.com</a></p>
                </body></html>`;
               
                const UpdateProfilemsg = {
                    from: '"SET IT AND LEAVE IT" <' + creds.USER + '>', // sender address
                    to: req.body.useremail, //creds.USER, // list of receivers
                    subject: 'Reset your password.', // Subject line
                    //html: '<!docType html><body><p>We have received a request to change the password for your account. If you initiated this request,then please click ' + 'http://ec2-18-221-255-18.us-east-2.compute.amazonaws.com/front/resetpassword/' + token + 'on this link to reset your password. If this was NOT you, please let us know.</p><p>Best Regards</p><p>SET IT AND LEAVE IT TEAM</p><p><img src="https://firebasestorage.googleapis.com/v0/b/test-85de8.appspot.com/o/logo1.096101be.png?alt=media&token=c8c17d4d-ac1d-46a6-ae59-8afb7dba94da" height="42" width="42"/></p><p>Phone:1-866-900-5050 | Email: info@set0itandleaveit.com<p/></body></html>',
                    // html: '<!docType html><body><p>We have received a request to change the password for your account. If you initiated this request,then please click ' + 'http://localhost:3000/front/resetpassword/'+token+'on this link to reset your password. If this was NOT you, please let us know.</p><p>Best Regards</p><p>SET IT AND LEAVE IT TEAM</p><p><img src="https://firebasestorage.googleapis.com/v0/b/test-85de8.appspot.com/o/logo1.096101be.png?alt=media&token=c8c17d4d-ac1d-46a6-ae59-8afb7dba94da" height="42" width="42"/></p><p>Phone:1-866-900-5050 | Email: info@set0itandleaveit.com<p/></body></html>',
                    
                    html: emailForUser
                };
                sgMail.send(UpdateProfilemsg);
                res.status(201).json({
                    success: true,
                    message: 'WE EMAILED YOU A LINK TO RESET YOUR PASSWORD(CHECK SPAM IF YOU DO NOT SEE IT)'
                });
            
            })

    } catch (err) {
        // res.status(401).json({
        //     data: err,
        //     success: false,
        //     message: 'Something going wrong please check.'
        // });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

    // const emailForAdmin = `
    // <div style="padding:10px 100px 0px 0px;width:60%">
    // <center><h1 style="margin:0;"> Reset Your Password</h1></center>
    // <br/>          
    // <p>Hello ${user.name},</p>                  
    // <p style="margin:0;">Need to reset password? No problem! just click the button below 
    // and you'll be on your way. if you did not make this request, please ignore this email. </p>
    // <a href="${creds.domain}/front/resetpassword?user=${user.req.body.useremail}">Reset your password</a>
    // </div>`;


}



exports.useremailresetpasswordTODb = async (req, res, next) => {
    console.log('req.body.token', req.body.token);

    const decoded = jwt.verify(req.body.token, 'JWT_TOKEN_SECRET')

    try {
        let userdata = await updateProfile.findOne({ email: decoded.email });
        console.log('userdatauserdata', userdata);
        if (userdata) {


            const result = await updateProfile.findByIdAndUpdate({ _id: userdata._id, }, {
                password: req.body.password,
                presetemail: new Date(),
                presetlink: "1"
            });
            if (result) {
                res.status(201).json({
                    data: result,
                    success: true,
                    message: 'Your password has been reset successfully.'
                });
            }
        } else {
            res.status(201).json({
                data: userdata,
                success: false,
                message: 'Something going wrong please check.'
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


exports.toolenablestatusTODb = async (req, res, next) => {
    try {
        let userdata = await updateProfile.findOne({ _id: req.body.id });
        console.log('userdata:', userdata);
        if (userdata) {
            const result = await updateProfile.findByIdAndUpdate({ _id: userdata._id, }, {
                tool_enabled: req.body.status
            });
            if (result) {
                if (req.body.status == "true") {
                    res.status(201).json({
                        data: result,
                        success: true,
                        message: 'Tool Enable for ' + userdata.name
                    });
                } else {
                    res.status(201).json({
                        data: result,
                        success: true,
                        message: 'Tool Disable for ' + userdata.name
                    });
                }
            }
        } else {
            res.status(201).json({
                data: userdata,
                success: false,
                message: 'Something going wrong please check.'
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


exports.passwordlinkstatusTODb = async (req, res, next) => {
    try {
        let userdata = await updateProfile.findOne({ email: req.body.useremail });
        console.log('userdata:', userdata);
        if (userdata) {
            res.status(201).json({
                data: userdata,
                success: true,
                message: 'success'
            });
        } else {
            console.log('test here')
            res.status(201).json({
                data: userdata,
                success: false,
                message: 'Something going wrong please check.'
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



exports.emailstatusTODb = async (req, res, next) => {
    try {
        let userdata = await updateProfile.findOne({ email: req.body.useremail });
        console.log('userdata:', userdata);
        if (userdata) {

            const result = await updateProfile.findByIdAndUpdate({ _id: userdata._id, }, {
                signup_status: true
            });


            const emailForUser = `
            <div style="padding:10px 100px 10px 10px;width:65%;border:0px solid #7030a0">			
                <center><h2 style="margin:0;font-weight:600;">Thank you for registering with <em style="color:#9464B8">SET IT <span style="font-size:10px;">AND</span> LEAVE IT</em>. </h2></center>
                <br/>
                <p style="margin:0;font-size:16px">You may now sign in with email  ${userdata.email} and password  ${userdata.password} .</p>
                <br/> 
                <p style="margin:0;font-size:16px">We hope you find the resources on the <em style="color:#9464B8">SET IT <span style="font-size:10px;">AND</span> LEAVE IT</em> website useful. Please <a href="${creds.domain}/front/contact">let us know</a> if you have any questions or feedback.</p>
                <br/>
                <br/>
                <p style="margin:0;font-size:14px">Best regards,</p>
                <p style="margin-bottom:10px;font-size:16px"><em style="color:#9464B8">SET IT <span style="font-size:10px;">AND</span> LEAVE IT</em> Team</p><br/><br/>
                <a style="text-decoration:none;"  href="${creds.domain}/front"><img class="logo" style="width:200px;height:auto" src="https://firebasestorage.googleapis.com/v0/b/test-85de8.appspot.com/o/logo1.096101be.png?alt=media&token=c8c17d4d-ac1d-46a6-ae59-8afb7dba94da" alt="My_Logo"></a>
                <br/><br/> <p style="margin-top:10px;font-size:16px"><b>Phone:</b> <a href="tel:18669005050">1-866-900-5050</a> | <b>Email:</b> <a href="mailto:info@setitandleaveit.com">info@SetItandLeaveIt.com</a> | <b>Web:</b> <a href="www.setitandleaveit.com">www.SetItandLeaveIt.com</a></p>
            </div>
        `;

            const emailsubject = `Thank you for registering with SET IT AND LEAVE IT!`;

            const UpdateEmailmsg = {
                from: 'SET IT AND LEAVE IT <' + creds.USERFROM + '>',//'"Signing Up" <'+creds.USER+'>', // sender address
                to: userdata.email, //creds.USER, // list of receivers
                subject: emailsubject, // Subject line
                html: emailForUser // html body
            };
            sgMail.send(UpdateEmailmsg);

            //  // create reusable transporter object using the default SMTP transport
            //  let transporter = nodemailer.createTransport({
            //     host: 'mail.setitandleaveit.com',
            //     port: 587,
            //     auth: {
            //         user: creds.USER, // generated ethereal user
            //         pass: creds.PASS  // generated ethereal password
            //     },
            //     tls:{
            //       rejectUnauthorized:false
            //     }
            //   });

            //     // setup email data with unicode symbols
            //     let mailOptionsUser = { 
            //         from: `${userdata.name} to SET IT AND LEAVE IT <'${creds.USERFROM}'>`,//'"Signing Up" <'+creds.USER+'>', // sender address
            //         to: userdata.email, // list of receivers
            //         subject: emailsubject, // Subject line
            //         html: emailForUser // html body
            //     };



            //       // send mail with defined transport object
            //       transporter.sendMail(mailOptionsUser, (error, info) => {
            //           if (error) {
            //               return console.log(error);
            //           }
            //           console.log('Message sent: %s', info.messageId);   
            //           console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            //       });


            res.status(201).json({
                data: userdata,
                success: true,
                message: 'success'
            });
        } else {
            console.log('test here')
            res.status(201).json({
                data: userdata,
                success: false,
                message: 'Something going wrong please check.'
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


exports.userQuestionTODb = async (req, res, next) => {
    var result = '';
    // console.log('req upadte user:',req.body)
    try {
        console.log('req upadte user1:', req.body)
        userQusetion.find({ userid: req.body.id }).then(async resresult => {
            console.log('req upadte user11:', resresult)
            updateProfile.find({ _id: req.body.id }).then(async userdetailsresult => {
                console.log('req upadte user22:', req)
                //console.log('userdetailsresult',userdetailsresult[0].email)
                if (resresult != '') {

                    console.log('yesssssssss');

                    const userQusetionVo = new userQusetion({
                        name: req.body.name,
                        address: req.body.address,
                        phone: req.body.phone,
                        reasonGoalConsultation: req.body.reasonGoalConsultation,
                        reasonSIALI: req.body.reasonSIALI,
                        email: req.body.email,
                        age: req.body.age,
                        married: req.body.married,
                        Kids: req.body.Kids,
                        grandkid: req.body.grandkid,
                        pets: req.body.pets,
                        personalOtherDetails: req.body.personalOtherDetails,
                        homeValue: req.body.homeValue,
                        Mortgage: req.body.Mortgage,
                        approxEquity: req.body.approxEquity,
                        homeBox: req.body.homeBox,
                        iWeRent: req.body.iWeRent,
                        monthlyRent: req.body.monthlyRent,
                        homeBanking: req.body.homeBanking,
                        homeBrokerage: req.body.homeBrokerage,
                        homeRetirementAccount: req.body.homeRetirementAccount,
                        homeRothAccount: req.body.homeRothAccount,
                        homeOther: req.body.homeOther,
                        homeSS: req.body.homeSS,
                        homePension: req.body.homePension,
                        banking: req.body.banking,
                        brokerage: req.body.brokerage,
                        retirementAccount: req.body.retirementAccount,
                        rothAccount: req.body.rothAccount,
                        otherTypes: req.body.otherTypes,
                        otherApproxValue: req.body.otherApproxValue,
                        dbAssetsApproxTotal: req.body.dbAssetsApproxTotal,
                        socailSecurity: req.body.socailSecurity,
                        pension: req.body.pension,
                        others: req.body.others,
                        essential: req.body.essential,
                        discretionary: req.body.discretionary,
                        oneOffExpenses: req.body.oneOffExpenses,
                        noInsurance: req.body.noInsurance,
                        medicare: req.body.medicare,
                        supplementalHealth: req.body.supplementalHealth,
                        longtermcare: req.body.longtermcare,
                        lifeInsurance: req.body.lifeInsurance,
                        inotherbox: req.body.inotherbox,
                        lifeInType: req.body.lifeInType,
                        lifeamount: req.body.lifeamount,
                        inother: req.body.inother,
                        analyticalInExperience: req.body.analyticalInExperience,
                        capitalPreservation: req.body.capitalPreservation,
                        investIncome: req.body.investIncome,
                        investGrowth: req.body.investGrowth,
                        investGrowthIncome: req.body.investGrowthIncome,
                        investAggressiveGrowth: req.body.investAggressiveGrowth,
                        currentAllocationStock: req.body.currentAllocationStock,
                        experience_1_10: req.body.experience_1_10,
                        expectations: req.body.expectations,
                        experience_gb: req.body.experience_gb,
                        riskAggressive: req.body.riskAggressive,
                        riskModerate: req.body.riskModerate,
                        riskConservative: req.body.riskConservative,
                        portfolioDrawdown: req.body.portfolioDrawdown,
                        riskPreservation: req.body.riskPreservation,
                        riskIncome: req.body.riskIncome,
                        riskGrowth: req.body.riskGrowth,
                        lastMarketDownturn: req.body.lastMarketDownturn,
                        portfolio1: req.body.portfolio1,
                        portfolio2: req.body.portfolio2,
                        portfolio3: req.body.portfolio3,
                        portfolio4: req.body.portfolio4,
                        portfolio5: req.body.portfolio5,
                        aaii: req.body.aaii,
                        advisorPerspectives: req.body.advisorPerspectives,
                        alphaArchiect: req.body.alphaArchiect,
                        referral: req.body.referral,
                        referralContent: req.body.referralContent,
                        otherOthers: req.body.otherOthers,
                        otherOthersContent: req.body.otherOthersContent,
                        whatAttracted: req.body.whatAttracted,
                        improveQuestionnaire: req.body.improveQuestionnaire,
                        setItAndLeaveItRetirement: req.body.setItAndLeaveItRetirement,
                        fixedAnnuityProduct: req.body.fixedAnnuityProduct,
                        insuranceProduct: req.body.insuranceProduct,
                        investmentAdvice: req.body.investmentAdvice,
                        estatePlanning: req.body.estatePlanning,
                        taxPlanning: req.body.taxPlanning,
                        otherGoalServicecheck: req.body.otherGoalServicecheck,
                        otherGoalService: req.body.otherGoalService,
                        goalComment: req.body.goalComment,
                        goalQuestion: req.body.goalQuestion,
                        datetime: req.body.datetime
                    })

                    result = await userQusetionVo.save(

                    );
                } else {
                    console.log('nooooooooooo');
                    const QuestionContentData = new userQusetion({
                        name: req.body.name,
                        address: req.body.address,
                        phone: req.body.phone,
                        reasonGoalConsultation: req.body.reasonGoalConsultation,
                        reasonSIALI: req.body.reasonSIALI,
                        email: req.body.email,
                        age: req.body.age,
                        married: req.body.married,
                        Kids: req.body.Kids,
                        grandkid: req.body.grandkid,
                        pets: req.body.pets,
                        personalOtherDetails: req.body.personalOtherDetails,
                        homeValue: req.body.homeValue,
                        Mortgage: req.body.Mortgage,
                        approxEquity: req.body.approxEquity,
                        homeBox: req.body.homeBox,
                        iWeRent: req.body.iWeRent,
                        monthlyRent: req.body.monthlyRent,
                        homeBanking: req.body.homeBanking,
                        homeBrokerage: req.body.homeBrokerage,
                        homeRetirementAccount: req.body.homeRetirementAccount,
                        homeRothAccount: req.body.homeRothAccount,
                        homeOther: req.body.homeOther,
                        homeSS: req.body.homeSS,
                        homePension: req.body.homePension,
                        banking: req.body.banking,
                        brokerage: req.body.brokerage,
                        retirementAccount: req.body.retirementAccount,
                        rothAccount: req.body.rothAccount,
                        otherTypes: req.body.otherTypes,
                        otherApproxValue: req.body.otherApproxValue,
                        dbAssetsApproxTotal: req.body.dbAssetsApproxTotal,
                        socailSecurity: req.body.socailSecurity,
                        pension: req.body.pension,
                        others: req.body.others,
                        essential: req.body.essential,
                        discretionary: req.body.discretionary,
                        oneOffExpenses: req.body.oneOffExpenses,
                        noInsurance: req.body.noInsurance,
                        medicare: req.body.medicare,
                        supplementalHealth: req.body.supplementalHealth,
                        longtermcare: req.body.longtermcare,
                        lifeInsurance: req.body.lifeInsurance,
                        inotherbox: req.body.inotherbox,
                        lifeInType: req.body.lifeInType,
                        lifeamount: req.body.lifeamount,
                        inother: req.body.inother,
                        analyticalInExperience: req.body.analyticalInExperience,
                        capitalPreservation: req.body.capitalPreservation,
                        investIncome: req.body.investIncome,
                        investGrowth: req.body.investGrowth,
                        investGrowthIncome: req.body.investGrowthIncome,
                        investAggressiveGrowth: req.body.investAggressiveGrowth,
                        currentAllocationStock: req.body.currentAllocationStock,
                        experience_1_10: req.body.experience_1_10,
                        expectations: req.body.expectations,
                        experience_gb: req.body.experience_gb,
                        riskAggressive: req.body.riskAggressive,
                        riskModerate: req.body.riskModerate,
                        riskConservative: req.body.riskConservative,
                        portfolioDrawdown: req.body.portfolioDrawdown,
                        riskPreservation: req.body.riskPreservation,
                        riskIncome: req.body.riskIncome,
                        riskGrowth: req.body.riskGrowth,
                        lastMarketDownturn: req.body.lastMarketDownturn,
                        portfolio1: req.body.portfolio1,
                        portfolio2: req.body.portfolio2,
                        portfolio3: req.body.portfolio3,
                        portfolio4: req.body.portfolio4,
                        portfolio5: req.body.portfolio5,
                        aaii: req.body.aaii,
                        advisorPerspectives: req.body.advisorPerspectives,
                        alphaArchiect: req.body.alphaArchiect,
                        referral: req.body.referral,
                        referralContent: req.body.referralContent,
                        otherOthers: req.body.otherOthers,
                        otherOthersContent: req.body.otherOthersContent,
                        whatAttracted: req.body.whatAttracted,
                        improveQuestionnaire: req.body.improveQuestionnaire,
                        setItAndLeaveItRetirement: req.body.setItAndLeaveItRetirement,
                        fixedAnnuityProduct: req.body.fixedAnnuityProduct,
                        insuranceProduct: req.body.insuranceProduct,
                        investmentAdvice: req.body.investmentAdvice,
                        estatePlanning: req.body.estatePlanning,
                        taxPlanning: req.body.taxPlanning,
                        otherGoalServicecheck: req.body.otherGoalServicecheck,
                        otherGoalService: req.body.otherGoalService,
                        goalComment: req.body.goalComment,
                        goalQuestion: req.body.goalQuestion,
                        datetime: req.body.datetime,
                        userid: req.body.id
                    });

                    result = await QuestionContentData.save();
                }

                // if (req.body.name !='' && req.body.address !='' && req.body.phone !='' && req.body.reasonGoalConsultation !='' && req.body.reasonSIALI !='' && req.body.email !='' && req.body.age !='' && req.body.married !='' && req.body.Kids !='' && req.body.grandkid !='' && req.body.pets !='' && req.body.liquid !='' && req.body.ss !='' && req.body.pension !='' && req.body.others !='' && req.body.essential !='' && req.body.oneOffExpenses !='' && req.body.medicare !='' && req.body.longtermcare !='' && req.body.lifeamount !='' && req.body.inother !='' && req.body.goal !='' && req.body.experience_1_10 !='' && req.body.expectations !='' && req.body.experience_gb !='' && req.body.riskAggressive !='' && req.body.riskModerate !='' && req.body.riskConservative !='' && req.body.portfolioDrawdown !='' ) {
                let approxTotal = '', mailSubject = '';
                let emailForAdmin = '', emailForUser = '';

                if (!req.body.dbAssetsApproxTotal) {
                    approxTotal = 'N/A';
                } else {
                    approxTotal = req.body.dbAssetsApproxTotal;
                }


                if (req.body.data_id == '1') {
                    console.log('Save Vivek', userdetailsresult[0].email);
                    mailSubject = 'Partial questionnaire saved (Total assets: ' + approxTotal + ')';
                    emailForAdmin = `
            <div style="padding:10px 100px 0px 0px;width:60%">
                <center><h1 style="margin:0;">Questionnaire</h1></center>
                <br/>          
                <p>${userdetailsresult[0].name} submitted questionnaire</p>
                <p>Name: ${userdetailsresult[0].name} </p>
                <p>Email: ${userdetailsresult[0].email} </p>
                <p>Total assets: ${approxTotal} </p>
            </div>`;

                    emailForUser = `
            <div style="padding:10px 100px 0px 0px;width:60%">
                <center><h1 style="margin-bottom:20px;">THANK YOU!</h1></center> 
                <br/>          
                <p>Thank you for taking the time to fill out our questionnaire. We will get back to you shortly to coordinate a time for your free consultation.
                </p>
                <br/><br/>   
                <p>Feel free to email us at info@SETITANDLEAVEIT.com if you have any questions in the meantime.
                </p>
                <br/><br/>   
                <br/><br/>   
                <p style="margin:0;font-size:14px">Best regards,</p>
                 <p style="margin-bottom:10px;font-size:16px"><em style="color:#9464B8">SET IT <span style="font-size:10px;">AND</span> LEAVE IT</em> Team</p><br/><br/>
                <a style="text-decoration:none;"  href="${creds.domain}/front"><img class="logo" style="width:200px;height:auto" src="https://firebasestorage.googleapis.com/v0/b/test-85de8.appspot.com/o/logo1.096101be.png?alt=media&token=c8c17d4d-ac1d-46a6-ae59-8afb7dba94da"  alt="My_Logo"></a>
                <br/><br/> <p style="margin-top:10px;font-size:16px"><b>Phone:</b> <a href="tel:18669005050">1-866-900-5050</a> | <b>Email:</b> <a href="mailto:info@setitandleaveit.com">info@SetItandLeaveIt.com</a> | <b>Web:</b> <a href="www.setitandleaveit.com">www.SetItandLeaveIt.com</a></p>

            </div>`;

                } else {
                    console.log('Submit Vivek', userdetailsresult[0].email);
                    mailSubject = 'New questionnaire submission (Total assets: ' + approxTotal + ')';
                    emailForAdmin = `
            <div style="padding:10px 100px 0px 0px;width:60%">
                <center><h1 style="margin:0;">Questionnaire</h1></center>
                <br/>          
                <p>${userdetailsresult[0].name} submitted questionnaire</p>
                <p>Name: ${userdetailsresult[0].name} </p>
                <p>Email: ${userdetailsresult[0].email} </p>
                <p>Total assets: ${approxTotal} </p>
            </div>`;

                    emailForUser = `
            <div style="padding:10px 100px 0px 0px;width:60%">
                <center><h1 style="margin-bottom:20px;">THANK YOU!</h1></center>
                <br/>          
                <p>Thank you for taking the time to fill out our questionnaire. We will get back to you shortly to coordinate a time for your free consultation.
                </p>
                <br/><br/>   
                <p>Feel free to email us at info@SETITANDLEAVEIT.com if you have any questions in the meantime.
                </p>
                <br/><br/>   
                <br/><br/>   
                <p style="margin:0;font-size:14px">Best regards,</p>
                 <p style="margin-bottom:10px;font-size:16px"><em style="color:#9464B8">SET IT <span style="font-size:10px;">AND</span> LEAVE IT</em> Team</p><br/><br/>
                <a style="text-decoration:none;"  href="${creds.domain}/front"><img class="logo" style="width:200px;height:auto" src="https://firebasestorage.googleapis.com/v0/b/test-85de8.appspot.com/o/logo1.096101be.png?alt=media&token=c8c17d4d-ac1d-46a6-ae59-8afb7dba94da"  alt="My_Logo"></a>
                <br/><br/> <p style="margin-top:10px;font-size:16px"><b>Phone:</b> <a href="tel:18669005050">1-866-900-5050</a> | <b>Email:</b> <a href="mailto:info@setitandleaveit.com">info@SetItandLeaveIt.com</a> | <b>Web:</b> <a href="www.setitandleaveit.com">www.SetItandLeaveIt.com</a></p>

            </div>`;

                }
                const QuestionAdminmsg = {
                    from: '"Questionnaire form alert" <' + creds.USER + '>', // sender address
                    to: creds.USER, // list of receivers
                    subject: mailSubject, // Subject line
                    html: emailForAdmin // html body
                };
                sgMail.send(QuestionAdminmsg)
                    .then(result => {
                        console.log('xxx result');

                    })

                const QuestionUsermsg = {
                    from: '' + userdetailsresult[0].name + '  to SET IT AND LEAVE IT <' + creds.USER + '>',   //'"Questionnaire form alert" <'+creds.USER+'>', // sender address
                    to: userdetailsresult[0].email, // list of receivers
                    subject: 'Thank you!', // Subject line
                    html: emailForUser // html body
                };
                sgMail.send(QuestionUsermsg);


                res.status(201).json({
                    data: result,
                    success: true,
                    message: 'Your all details sumbited successfully'
                });
                //}
            })
        })
    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
}

exports.getuserQuestionTODb = (req, res, next) => {
    console.log('getUestion:', req);
    userQusetion.find({ userid: req.body.userId }).then(result => {
        console.log('getUestionresult:', result);
        if (result) {
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}


exports.getAllQuestionnaireTODb = (req, res, next) => {


    userQusetion.find({}).then(result => {
        if (result) {
            console.log('resultvivek:', result)
            res.status(201).json({
                data: result
            });

        }
    }).catch(err => {
        console.log('xxx x xxx', err);
    });
}


exports.convertpdfTODb = (req, res, next) => {
    //var callbacks = pdfcrowd.saveToFile("./client/public/upload-file/HelloWorld.pdf"); 

    // var callbacks = pdfcrowd.saveToFile("./client/build/upload-file/HelloWorld.pdf");
    // res.status(201).json({
    //     data: 'Success'
    // });
    // callbacks.error = function (errMessage, statusCode) {
    //     if (statusCode) {
    //         console.error("Pdfcrowd Error: " + statusCode + " - " + errMessage);
    //     } else {
    //         console.error("Pdfcrowd Error: " + errMessage);
    //     }
    // };
    // client.convertString(req.body.pdfContent, callbacks);



    pdf
        .create(req.body.pdfContent, {})
        .toFile(
            //path.join(__dirname, `../../client/public/upload-file/HelloWorld.pdf`),
            path.join(__dirname, `../../client/build/upload-file/HelloWorld.pdf`),
            err => {
                res.status(201).json({
                    message: 'Pdf Download',
                    success: true
                })
            }
        )
}


exports.convertpdfDeleteTODb = (req, res, next) => {
    console.log('File ready for delete:', req.body.pdfpath);
    if (req.body.pdfpath) {
        if (fs.existsSync(req.body.pdfpath)) {
            fs.unlinkSync(req.body.pdfpath);
        }
        res.status(201).json({
            data: 'Success'
        });
    }


}

exports.deleteUserQue = async (req, res, next) => {
    //console.log('vivekreq:',req)
    try {
        userQusetion.deleteOne({ _id: req.params.id }).then(result => {

            if (result) {
                res.status(201).json({
                    data: result,
                    success: true,
                    message: ' question deleted successfully.'
                });

            }
        })

    } catch (err) {
        res.status(401).json({
            data: err,
            success: false,
            message: 'Something going wrong please check.'
        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }

}
