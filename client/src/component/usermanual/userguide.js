import React from 'react';
import PDFViewer from 'pdf-viewer-reactjs';
import userGuide from '../../../src/assets/img/GUIDE - Set It and Leave It.pdf'

const UserManualPdf = () => {
    return (
        <PDFViewer
            document={{
                url: userGuide
            }}
        />
    );
};
 
export default UserManualPdf;