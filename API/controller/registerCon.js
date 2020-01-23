const Register = require('../models/registerModel');
const Activitylog = require('../models/useractivityModel');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const creds = require('./config');
sgMail.setApiKey(creds.SENDGRID_API_KEY);
exports.addRegisterTODb = async (req, res, next) => { 
    const reg = new Register({
        name: req.body.name,
        email: req.body.email,
        //username: req.body.username,
        password: req.body.password,
        investor: req.body.investor,
        financial: req.body.financial,
        professor: req.body.professor,
        tell_us_more: req.body.tell_us_more,
        role: req.body.role,
        datetime: req.body.datetime,
        tool_enabled:req.body.tool_enabled,
        signup_status:false,
        number_of_signins:0,
        last_uses_date:new Date()    
    });    
    try {
            let user = await Register.findOne({ email: req.body.email});
            console.log('user:', user);
            if(user){

                res.status(201).json({
                    data: user, 
                    success:false, 
                    message:'Email already exist !!'
                });
            }else{
                let result = await reg.save();
                    if (result) {
                        res.status(201).json({
                            data: result, 
                            success:true, 
                            message:'Thank you for signing up! We are sending you an email verification link. Please check your spam folder if you do not see the verification email.'
                        });


                    const emailForAdmin = `
                        <div style="padding:10px 100px 0px 0px;width:60%">
                            <center><h1 style="margin:0;">New User!</h1></center>
                            <br/>                            
                            <h3 style="margin:0;">Registration Details - </h3>
                            <ul>
                                <li>Name : ${req.body.name}</li>
                                <li>Email : ${req.body.email}</li>
                                <li>Password : ${req.body.password}</li>
                            </ul>
                            <br/>
                            <h5 style="margin:0;">Support,</h5>
                            <p style="margin:0;">Save It And Leave It Team</p>
                            <p style="margin:0;">support@saveitandleaveit.com</p>
                        </div>                        
                      `;

         
                    const emailForUser = `
                      <div style="padding:10px 100px 10px 10px;width:65%;border:0px solid #7030a0">			
                          
                          <br/>
                          <p style="margin:0;font-size:16px">Hello ${req.body.name},</p>
                          <br/>
                          <p style="margin:0;font-size:16px">Please use the link below to verify this email address for your <em style="color:#9464B8">SET IT <span style="font-size:10px;">AND</span> LEAVE IT</em> account.</p>
                          <br/>
                          <p style="margin:0;font-size:18px; font-weight:600;text-align:center;" ><a style="text-decoration:none;"  href="${creds.domain}/front/emailverification?email=${req.body.email}">Verify my email</a></p>
                          <br/><br/>
                         
                          <p style="margin:0;font-size:14px">Best regards,</p>
                          <p style="margin:0;font-size:16px"><em style="color:#9464B8">SET IT <span style="font-size:10px;">AND</span> LEAVE IT</em> Team</p><br><br/><br/>
                          <a style="text-decoration:none;"  href="${creds.domain}/front"> <img class="logo" style="width:200px;height:auto" src="http://ec2-18-221-255-18.us-east-2.compute.amazonaws.com/static/media/logo1.8cbebd0f.png"  alt="My_Logo"></a>
                          <br><br/><br/><p style="margin:0;font-size:16px"><b>Phone:</b> <a href="tel:18669005050">1-866-900-5050</a> | <b>Email:</b> <a href="mailto:info@setitandleaveit.com">info@SetItandLeaveIt.com</a> | <b>Web:</b> <a href="www.setitandleaveit.com">www.SetItandLeaveIt.com</a></p>
                      </div>
                  `;


                  const Adminmsg = {
                        from: '"New User" <'+creds.USER+'>', // sender address
                        to: creds.USER, //creds.USER, // list of receivers
                        subject: 'New Registration', // Subject line
                        html: emailForAdmin // html body
                  };
                  sgMail.send(Adminmsg);


                  const Usermsg = {
                    from: 'SET IT AND LEAVE IT <'+creds.USERFROM+'>',
                    to: req.body.email,
                    subject:  'Please verify your email with SET IT AND LEAVE IT',
                    html: emailForUser,
                  };
                  sgMail.send(Usermsg);


                 

                        /*--- User activity log ---*/
                        
                        let userLogid = await Register.findOne({ email: req.body.email});

                        addToActivityLog(userLogid._id,userLogid.name,'SignUp','Sign-up with email:'+userLogid.email);
                    }
                    
            }

    } catch (err) {

        res.status(401).json({
            data: err,
            success: false,
            message: 'Oops, something missing. Please check the fields highlighted in red.'

        });
        console.log('eeeeeeeeeeeee eeeeeeeeeee ', err)
    }
}


exports.getUserLoginTODb = async (req, res, next) => {
    console.log('xxxxxxxxxx xxxxx', req.body.email);
    
    Register.findOne({ email: req.body.email.email, password: req.body.email.password })
    .then(data => {

        console.log('logindata:', data);
        if (data) {
            if(data.signup_status == true){

                const userrole = data.role;
                const token = jwt.sign({
                    // email: data.email,
                    // name: data.name,
                    // username: data.username,
                    // role: data.role,
                    data:data,
                   // _id: data._id
                },
                    '@' + data._id + '-' + data.email,
                    {
                        expiresIn: "1h"
                    });
                res.status(201).json({
                    message: "Loged In",
                    role: userrole,
                    email: data.email,
                    token: token,
                    success: true 
                });
    
                  
                /*--- User activity log ---*/
                
                addToActivityLog(data._id,data.name,'SignIn','Sign-in with email:'+data.email);
                updateSigninCount(data._id,data.number_of_signins);

            }else{
                res.status(201).json({
                    message: "Your email has not yet been verified.Please check your spam folder if you do not see the verifiaction email.",
                    success: false 
                });
            }
        } else {
            res.status(201).json({
                message: "Invalid email and password please try again.",
                success: false 
            });
        }
    }).catch(err => {
        res.status(401).json({
            message: 'Invalid user',
            success:false
        });
    })
}

    addToActivityLog=(userid,name,action,activitydata)=>{
        const userLog = new Activitylog({
            userid: userid,
            name: name,
            action: action,
            datetime: new Date(),
            activitydata: activitydata            
        }); 

        let Logresult =  userLog.save();

        if (Logresult) {
            console.log('Activity Store');

            const emailForAdmin = `
            <div style="padding:10px 100px 0px 0px;width:60%">
                <center><h1 style="margin:0;">New User!</h1></center>
                <br/>                            
                <h3 style="margin:0;">Activity updates Details - </h3>
                <ul>
                    <li>Activity Data : ${activitydata}</li>
                </ul>
                <br/>
                <h5 style="margin:0;">Support,</h5>
                <p style="margin-bottom:10px;font-size:16px"><a href="${creds.domain}"><em style="color:#9464B8">SET IT <span style="font-size:10px;">AND<span> LEAVE IT</em>!</a> Team</p>
                <p style="margin:0;">support@saveitandleaveit.com</p>
            </div>                        
          `;


          const Adminmsg = {
            from: '"New User" <'+creds.USER+'>', // sender address
            to: creds.USER, //creds.USER, // list of receivers
            subject: 'Activity updates', // Subject line
            html: emailForAdmin // html body
          };
            sgMail.send(Adminmsg);

        }else{
            console.log('No store');
        }
    }

    updateSigninCount= async (userid,count)=>{
        const result = await Register.findByIdAndUpdate({ _id: userid, }, {
            number_of_signins: count+1,
            last_uses_date:new Date()
        });

        if (result) {
            console.log('Signin count incremented by 1');
            const emailForAdmin = `
            <div style="padding:10px 100px 0px 0px;width:60%">
                <center><h1 style="margin:0;">New User!</h1></center>
                <br/>                            
                <h3 style="margin:0;">Activity updates Details - </h3>
                <ul>
                    <li>Number of signin : ${number_of_signins}</li>
                </ul>
                <br/>
                <h5 style="margin:0;">Support,</h5>
                <p style="margin-bottom:10px;font-size:16px"><a href="${creds.domain}"><em style="color:#9464B8">SET IT <span style="font-size:10px;">AND<span> LEAVE IT</em>!</a> Team</p>
                <p style="margin:0;">support@saveitandleaveit.com</p>
            </div>                        
          `;


          
          const Adminmsg = {
            from: '"New User" <'+creds.USER+'>', // sender address
            to: creds.USER, //creds.USER, // list of receivers
            subject: 'Activity updates', // Subject line
            html: emailForAdmin // html body
          };
            sgMail.send(Adminmsg);

        }else{
            console.log('Updation failed');
        }
    }
