const updateProfile = require('../models/registerModel');
const Activitylog = require('../models/useractivityModel');
const jwt = require('jsonwebtoken');


exports.toolsInputsTODb = async (req, res, next) => {  
    addToActivityLog(req.body.id,req.body.name,'Tool Inputs',' Tool Inputs -||| Liquid Assets:'+req.body.liq_assets+'||| Budget:'+req.body.budget+'||| Estimated Inflation:'+req.body.est_inflation+'||| Social Security:'+req.body.social_security+'||| Social Security Colas:'+req.body.SS_colas+'||| Pension:'+req.body.pension+'||| Pension Colas:'+req.body.pension_colas+'||| Time Horizon:'+req.body.time_horizon+'||| Dividend Yield:'+req.body.dividend_yield+'||| Dividend Growth Colas:'+req.body.div_growth_colas+'||| Interest Rate:'+req.body.interest_rate+'||| Annuity Payout:'+req.body.annuity_payout+'||| Cash:'+req.body.cash+'||| Stock:'+req.body.stock+'||| Total Annutiy:'+req.body.total_annutiy_auto);
    toolEnableNow(req.body.id);
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
    }else{
        console.log('No store');
    }
}

toolEnableNow= async (userid)=>{
    console.log('Inside ToolEnableNow:',userid);
    const result = await updateProfile.findByIdAndUpdate({ _id: userid, }, {
        tool_enabled:true,
        last_uses_date:new Date()
    });

    if (result) {
        console.log('Tool enabled now');
    }else{
        console.log('Tool not enabled');
    }
}