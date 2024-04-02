import React from 'react';
import './CompanyDetailsView.css';

import { IMG_URL } from '../utils/constants';

interface CompanyProps {
  company_name: string;
  total_users: number;
  total_products: number;
  percentage?: string;
  company_logo?: string;
  onEditClick?: () => void;
}
const CompanyDetailsView: React.FC<CompanyProps> = ({
  company_name,
  total_users,
  total_products,
  percentage,
  company_logo,
  onEditClick,
}) => {
  return (
    <div className='company-details-container'>
      <h2>Company Details</h2>
      <div className='header'>
        <div className='company-logo '>
          <img src={`${IMG_URL}/${company_logo}`} alt='Company Logo' />
        </div>
        <h3>{company_name}</h3>
      </div>
      <div className='details'>
        <div className='detail'>
          <span>Company Name:</span>
          <span>{company_name}</span>
        </div>
        <div className='detail'>
          <span>Number of Users:</span>
          <span>{total_users}</span>
        </div>
        <div className='detail'>
          <span>Number of Products:</span>
          <span>{total_products}</span>
        </div>
        <div className='detail'>
          <span>Percentage:</span>
          <span>{percentage}</span>
        </div>
      </div>
      <button className='edit-button' onClick={onEditClick}>
        Edit
      </button>
    </div>
  );
};

export default CompanyDetailsView;
