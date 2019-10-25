import React, { Component } from 'react';
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdbreact";

class Footer extends Component {
    render() {
        return (
            <div class="fixed-bottom">
                <MDBFooter color="black" className="font-small pt-4 mt-4">
                    <div className="footer-copyright text-center py-3">
                        <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a href=""> courseportal.com </a>
                        </MDBContainer>
                    </div>
                </MDBFooter>
            </div>
        );

    }
}

export default Footer;