const express = require('express');
const router = express.Router();
const registerCon = require('../controller/registerCon'); 
const contactUsCon = require('../controller/contactUsCon'); 
const profileUpdateCon = require('../controller/updateprofileCon'); 
const toolsInputsCon = require('../controller/toolsInputsCon'); 
const generatePDFCon = require('../controller/generatePDFCon');
const adminUserlistCon = require('../controller/adminUserlist'); 
const adminActivityLoglistCon = require('../controller/activityLogCon'); 
const adminCMSCon = require('../controller/adminCMSCon'); 
// const checkAuth = require('../middleware/check-auth');

const traditionalPageCon= require('../controller/traditionalPageCon');
const sialiPageCon = require('../controller/sialiPageCon');
const videosPageCon = require('../controller/videosPageCon');
const aboutPageCon = require('../controller/aboutPageCon');
const researchPageCon= require('../controller/researchPageCon');

router.post('/addUser', registerCon.addRegisterTODb);
router.post('/login', registerCon.getUserLoginTODb);
router.post('/contactus', contactUsCon.addContactusTODb);
router.post('/updateProfile', profileUpdateCon.updateProfileTODb);
router.post('/resetpassword', profileUpdateCon.resetpasswordTODb);
router.post('/emailresetpassword', profileUpdateCon.emailresetpasswordTODb);
router.post('/useremailresetpassword', profileUpdateCon.useremailresetpasswordTODb);
router.post('/useremailsendresetlink',profileUpdateCon.useremailsendresetlinkTODb);
router.post('/passwordlinkstatus', profileUpdateCon.passwordlinkstatusTODb);
router.post('/emailstatus', profileUpdateCon.emailstatusTODb);

router.post('/getemailbytoken', profileUpdateCon.getemailbytokenToDb)

router.post('/toolenablestatus', profileUpdateCon.toolenablestatusTODb);
router.post('/toolsInputs', toolsInputsCon.toolsInputsTODb);
router.post('/generatePDF', generatePDFCon.generatePDFTODb);
router.get('/userlist', adminUserlistCon.getUserTODb);
router.post('/userEditInfo', adminUserlistCon.editUserTODb);
router.delete('/delUser/:id', adminUserlistCon.delUserTODb);
router.get('/userContactlist', contactUsCon.getUserContactListTODb);
router.delete('/delUserContact/:id', contactUsCon.delUserContactListTODb);
router.get('/userActivityLog', adminActivityLoglistCon.getUserAvtivityLogListTODb);
router.delete('/delActivityLog/:id', adminActivityLoglistCon.delActivityLogTODb);
router.post('/addSlider', adminCMSCon.addsliderTODb);
router.get('/sliderList', adminCMSCon.getSliderListTODb);
router.delete('/delSlider/:id', adminCMSCon.delSliderListTODb);
router.post('/addEIC', adminCMSCon.addEicTODb);
router.get('/Eiclist', adminCMSCon.getEICListTODb);
router.delete('/delEIC/:id', adminCMSCon.delEICListTODb);
router.post('/EICEditInfo', adminCMSCon.editEICTODb);
router.post('/WhocanUseitInfo', adminCMSCon.WhocanuseitTODb);
router.get('/Getwhocanuseit', adminCMSCon.Getwhocanuseit);
router.post('/PeaceofmindInfo', adminCMSCon.PeaceofmindTODb);
router.get('/getpeaceofmind', adminCMSCon.Getpeaceofmind);

router.post('/EasytouseInfo', adminCMSCon.EasytouseTODb);
router.get('/geteasytouse', adminCMSCon.Geteasytouse);
router.post('/addFAQ', adminCMSCon.addFAQTODb);
router.get('/FAQlist', adminCMSCon.getFAQListTODb);
router.delete('/delFAQ/:id', adminCMSCon.delFAQListTODb);
router.post('/FAQEditInfo', adminCMSCon.editFAQTODb);
router.post('/faqheaderInfo', adminCMSCon.FAQheaderBannerTODb);
router.get('/getFAQheader', adminCMSCon.Getfaqheaderbanner);
router.post('/serviceheaderInfo', adminCMSCon.ServiceheaderBannerTODb);
router.get('/Getserviceheader', adminCMSCon.Getserviceheaderbanner);
router.post('/servicesolutionInfo', adminCMSCon.ServiceSolutionTODb);
router.get('/Getservicesolution', adminCMSCon.GetserviceSolution);
router.post('/addServices', adminCMSCon.addServiceTODb);
router.get('/Servicelist', adminCMSCon.getServiceListTODb);
router.post('/ServiceEditInfo', adminCMSCon.editServiceTODb);
router.delete('/delService/:id', adminCMSCon.delServiceListTODb);
router.post('/addpricing', adminCMSCon.addPriceTODb);
router.get('/pricelist', adminCMSCon.getPriceListTODb);
router.delete('/delPrice/:id', adminCMSCon.delPriceListTODb);
router.post('/PriceEditInfo', adminCMSCon.editPriceTODb);
router.post('/submitquestion', profileUpdateCon.userQuestionTODb);
router.post('/submitpdfquestion', profileUpdateCon.userQuePdfTODb)
router.post('/questionList', profileUpdateCon.getuserQuestionTODb); 
router.get('/questionnairelist', profileUpdateCon.getAllQuestionnaireTODb); 
router.post('/convertpdf', profileUpdateCon.convertpdfTODb);
router.post('/convertpdfdelete', profileUpdateCon.convertpdfDeleteTODb);
router.post('/userquedelete/:id',profileUpdateCon.deleteUserQue)
/*** vks ****/

router.get('/traditionalOverview', traditionalPageCon.getTraditionalTODb);
router.post('/traditionalOverviewAdd', traditionalPageCon.addTraditionalTODb);
router.post('/traditionalOverviewUpdate', traditionalPageCon.updateTraditionalTODb);
router.get('/traditionalTab', traditionalPageCon.getTraditionalTODb);
router.post('/traditionalTabAdd', traditionalPageCon.addTraditionalTODb);
router.post('/traditionalTabUpdate', traditionalPageCon.updateTraditionalTODb);

router.get('/getSIALI', sialiPageCon.getSIALITODb);
router.post('/addSIALI', sialiPageCon.addSIALITODb);
router.post('/updateSIALI', sialiPageCon.updateSIALITODb);

router.get('/getVideos', videosPageCon.getVideosTODb);
router.post('/addVideos', videosPageCon.addVideosTODb);
router.post('/updateVideos', videosPageCon.updateVideosTODb);

router.get('/getAbout', aboutPageCon.getAboutTODb);
router.post('/addAbout', aboutPageCon.addAboutTODb);
router.post('/updateAbout', aboutPageCon.updateAboutTODb);

router.get('/getResearchOverview', researchPageCon.getResearchTODb);
router.post('/addResearch', researchPageCon.addResearchTODb);
router.post('/updateResearch', researchPageCon.updateResearchTODb);

router.post('/addNewResearch', adminCMSCon.addResearchTODb);
router.get('/Researchlist', adminCMSCon.getResearchListTODb);
router.delete('/delResearch/:id', adminCMSCon.delResearchListTODb);
router.post('/ResearchEditInfo', adminCMSCon.editResearchTODb);
router.get('/getResearch', adminCMSCon.getResearchListTODb);

router.post('/addNewResource', adminCMSCon.addResourceTODb);
router.get('/resourcelist', adminCMSCon.getResourceListTODb);
router.delete('/delResource/:id', adminCMSCon.delResourceListTODb);
router.post('/resourceEditInfo', adminCMSCon.editResourceTODb);
router.get('/getResource', adminCMSCon.getResourceListTODb);


router.post('/addAccordian', adminCMSCon.addAccordianTODb);
router.get('/Accordianlist', adminCMSCon.getAccordianListTODb);
router.delete('/delAccordian/:id', adminCMSCon.delAccordianListTODb);
router.post('/AccordianEditInfo', adminCMSCon.editAccordianTODb);

router.post('/addTableRow', adminCMSCon.addTableRowTODb);
router.get('/TableRowlist', adminCMSCon.getTableRowListTODb);
router.delete('/delTableRow/:id', adminCMSCon.delTableRowListTODb);
router.post('/TableRowEditInfo', adminCMSCon.editTableRowTODb);





module.exports = router; 