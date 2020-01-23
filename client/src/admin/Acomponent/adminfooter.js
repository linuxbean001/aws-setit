import React, { Component } from 'react';
class adminFooter extends Component{
   constructor(props){
       super(props);
       this.state ={
       } 
   }
   render(){
    return(
        <div className="adminfooter-section">
              <div id="footer-small">
                <div class="copyright">
                    <p>Copyright © 2019 BIM. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
   }
}
export default adminFooter; 