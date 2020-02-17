import axios from 'axios';
import decode from 'jwt-decode';

export default class RegisterService {   

    constructor() {
        
        this.domain = 'ec2-18-221-255-18.us-east-2.compute.amazonaws.com'; 
         //this.domain = 'http://localhost:3300';
    }    

    getProfile() {
        return decode(this.getToken()); 
    }
    
    registerUser(userInfoVo) {
           return axios.post( '/sellandleave/addUser', userInfoVo) 
            .then((result) => {
                console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
                return (err);
            });

        //console.log('UserInformation...xxx: ',userInfoVo);
    }

    login(email, password) {
        return axios.post( '/sellandleave/login', {
            email: email,
            pass: password
        }).then(result => {
               if(result.data.success == true){
                    //console.log('lOGIN:', result);
                    this.setToken(result.data.token);
                    return Promise.resolve(result);
               }else{
                    //console.log('eRRO:', result);
                    return result;
               }
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
                return (err);
            });
    }
    setToken(idToken) {
        localStorage.setItem('id_token', JSON.stringify(idToken));
    }

    logout() {
        localStorage.removeItem('id_token');
    }
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { 
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    getToken() {
        let token = '';
        if (localStorage.getItem('id_token')) {
            token = JSON.parse(localStorage.getItem('id_token'));
        }
        return token
    }

    loggedIn() {
        const token = this.getToken() 
        return !!token && !this.isTokenExpired(token) 
    }

    contactUsService(userInfoVo) {
        console.log('hello: ',userInfoVo);
        return axios.post( '/sellandleave/contactus', userInfoVo) 
         .then((result) => {
             console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }

    updateProfileUser(userInfoVo) {
        console.log('updateuser:',userInfoVo );
        return axios.post( '/sellandleave/updateProfile', userInfoVo) 
         .then((result) => {
             console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
             localStorage.removeItem('id_token');
             this.setToken(result.data.token);
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }

    passwordReset(userInfoVo) {
        console.log('updateuser:',userInfoVo );
        return axios.post( '/sellandleave/resetpassword', userInfoVo) 
         .then((result) => {
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }

    
    emailpasswordReset(userInfoVo) {
        console.log('updateuser:',userInfoVo);
        return axios.post( '/sellandleave/useremailsendresetlink', userInfoVo) 
         .then((result) => {
             console.log('resultuserInfoVo',userInfoVo);
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }
    emailpasswordResetWithSendEmail(userInfoVo) {
        console.log('updateuser:',userInfoVo );
        return axios.post( '/sellandleave/useremailresetpassword', userInfoVo) 
         .then((result) => {
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }

    getpasswordlinkstatus(userInfoVo) {
        console.log('updateuser:',userInfoVo );
        return axios.post( '/sellandleave/passwordlinkstatus', userInfoVo) 
         .then((result) => {
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }


    getemailverificationStatus(userInfoVo) {
        console.log('updateuser:',userInfoVo );
        return axios.post( '/sellandleave/emailstatus', userInfoVo) 
         .then((result) => {
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }



    toolsInputsActivityLog(toolsInputs) {        

        return axios.post( '/sellandleave/toolsInputs', toolsInputs) 
         .then((result) => {           
            
             console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
             localStorage.removeItem('id_token');
             this.setToken(result.data.token);
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }

    generatePDFActivityLog(generatePDF) {        
        
        return axios.post( '/sellandleave/generatePDF', generatePDF) 
         .then((result) => {           
            
             console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
             localStorage.removeItem('id_token');
             this.setToken(result.data.token);
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }

    submitQuestionService(questionInfoVo) {
        console.log('submitQuestionService:',questionInfoVo );
        return axios.post( '/sellandleave/submitquestion', questionInfoVo) 
         .then((result) => {
             console.log('xxxxxxx xxxxxxxxxxx here yes  is::: ', result);
             return (result);
         }).catch(err => {
             console.log('xxxxxxx xxxxxxxxxxx err is::: ', err);
             return (err);
         });
    }

    getQuestionService(id){
        console.log('usergetQuestionService...xx..x',id);
        return axios.post( '/sellandleave/questionList', id)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }


}
