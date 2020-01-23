exports.addToActivityLog=(userid,name,action,activitydata)=>{
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