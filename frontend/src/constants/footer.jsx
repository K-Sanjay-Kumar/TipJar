import React from "react";

function Footer() {
    return(
        <div className="footer bg-dark p-3 text-center" style={{color:'white'}}>
            <a className="footer-body" href="/Contact-Us" style={{color:'white'}}><span style={{textDecoration:'underline', color:'#0078ff'}}>Contact-us</span> for support &copy; {new Date().getFullYear()} Copyright:
            <a className="footer-body" href="/" style={{color:'white'}}> Knowfinity</a></a>
        </div>
    )
}

export default Footer;