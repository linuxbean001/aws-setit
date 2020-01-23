module.exports = (newobj) => {
return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Tools</title>  
      <style>
      .report-heading h4 {
            color: #ff0000;
        }
      </style>
   </head>
   <body>
    <div className="report-heading">
    <h2>This SET IT AND LEAVE IT report was prepared for JOHN C. DOE.</h2>
    <h4>All illustrations are based on user inputs. Please read the DISCLAIMER at the end of this report.</h4>
    </div>

    <div className="row" style="padding:30px;">
        <div className="col-md-4">
            <div className="report-upper-table">
                <table className="table table-bordered" style="display:table; width:100%;">
                    <thead>
                        <tr>
                            <th colSpan="3"> USER INPUTS </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> inflation </td>
                        </tr>
                        <tr>
                            <td> Liquid assets </td>
                            <td> <span>${newobj.liquid_assets}  <NumberFormat value=${newobj.liquid_assets} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                            <td> <span> ${newobj.est_inflation}% </span> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> Estimated budget </td>
                            <td> <span> ${newobj.budget} <NumberFormat value=${newobj.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> Time horizon (yrs) </td>
                            <td> <span> ${newobj.time_horizon} </span> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> COLAs </td>
                        </tr>
                        <tr>
                            <td> Social security </td>
                            <td> <NumberFormat value=${newobj.social_security} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </td>
                            <td> <span> ${newobj.SS_colas}% </span> </td>
                        </tr>
                        <tr>
                            <td> Pension </td>
                            <td> <span> <NumberFormat value=${newobj.pension} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                            <td> <span> ${newobj.Pension_colas}% </span> </td>
                        </tr>
                    </tbody>
                </table>
            
            </div>
        </div>

        <div className="col-md-4">
            <div className="report-upper-table">
                <table className="table table-bordered" style="display:table; width:100%;">
                    <thead>
                        <tr>
                            <th colSpan="3"> ALLOCATIONS </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> </td>
                            <td> Percent </td>
                            <td> Doller </td>
                        </tr>
                        <tr>
                            <td> Cash </td>
                            <td> <span> ${newobj.cash}% </span> </td>
                            <td> <span> <NumberFormat value=${newobj.actualcash} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                        </tr>
                        <tr>
                            <td> Stock </td>
                            <td> <span> ${newobj.stock}% </span> </td>
                            <td> <span> <NumberFormat value=${newobj.actualstock} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                        </tr>
                        <tr>
                            <td> Annuity </td>
                            <td> <span> ${newobj.totalAnnutiyAuto}% </span> </td>
                            <td> <span> <NumberFormat value=${newobj.actualannuity} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="col-md-4">
            <div className="report-upper-table">
                <table className="table table-bordered" style="display:table; width:100%;">
                    <thead>
                        <tr>
                            <th colSpan="3"> MARKET INPUTS </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> Div + cap growth </td>
                        </tr>
                        <tr>
                            <td> Dividend yield </td>
                            <td> <span> ${newobj.dividend_yield}% </span> </td>
                            <td> <span> ${newobj.div_growth_colas}% </span> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> Annuity yield </td>
                            <td> <span> ${newobj.annuity_payout}% </span> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> Interest rate </td>
                            <td> <span> ${newobj.interest_rate}% </span> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </body>
    </html>
    `;
};