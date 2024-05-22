import React from 'react';

interface FooterProps {
    companyName: string;
    year: number;
  }
  
  const Footer: React.FC<FooterProps> = ({ companyName, year }) => {
    return (
      <footer className="footer"> {/* Przypisujemy klasę "footer" */}
        <div>&copy; {year} {companyName}</div>
        <div>All rights reserved.</div>
      </footer>
    );
  };
  
  export default Footer;