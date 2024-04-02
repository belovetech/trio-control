import React, { useState } from 'react';
import './Form.css';
import CompanyDetailsView from './CompanyDetailsView';
import { useAuth } from '../provider/AuthProvider';

import { CreateCompanyDto, createCompany } from '../services/createCompany';
import { updateCompany } from '../services/updateCompany';
import { getMyCompany } from '../services';

const initialCompany: CreateCompanyDto = {
  id: '',
  company_name: '',
  total_users: 0,
  total_products: 0,
  percentage: '0%',
  company_logo: 'bg-36ef0b94-cb92-46db-a6c1-293d39f1b034.jpg',
};

const CompanyInfoForm: React.FC = () => {
  const { auth } = useAuth();

  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [company, setCompany] = useState<CreateCompanyDto>(initialCompany);
  const [showView, setShowView] = useState<boolean>(false);

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });

    clearError(e);
  };

  // handle create
  const handleCreate = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await createCompany(company, token);
      const { company: newCompany } = response.body;

      setCompany({
        ...company,
        ...newCompany,
      });

      alert('Company details created successfully');
      setShowView(true);
    } catch (error) {
      setError((error as Error).message);
      console.error('handleSubmitError ', (error as Error).message);
    }
  };

  // handle update
  const handleUpdate = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const updatedCompany = await updateCompany(company, company.id, token);

      setCompany({
        ...company,
        ...updatedCompany.body.company,
      });

      alert('Company details updated successfully');
      setShowView(true);
      setIsEditing(false);
    } catch (error) {
      console.error('handleUpdate error: ', error);
    }
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const clearError = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setError('');
    }
  };

  if (showView && !isEditing) {
    return (
      <CompanyDetailsView
        company_name={company.company_name}
        total_users={company.total_users}
        total_products={company.total_products}
        percentage={company.percentage}
        company_logo={company.company_logo}
        onEditClick={handleEditClick}
      />
    );
  }

  const handleViewDetails = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await getMyCompany(token);
      setCompany({
        ...company,
        ...res.body?.company,
      });
      setIsEditing(false);
      setShowView(true);
    } catch (error) {
      console.error('handleViewDetails error: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h2>Enter your company details</h2>
      <div className='form-group'>
        <label htmlFor='company_name'>Company Name </label>
        <input
          type='text'
          id='company_name'
          name='company_name'
          value={company.company_name}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='total_users'>Number of Users </label>
        <input
          type='number'
          id='total_users'
          name='total_users'
          value={company.total_users}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='total_products'>Number of Products </label>
        <input
          type='number'
          id='total_products'
          name='total_products'
          value={company.total_products}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>Submit</button>

      {error.length > 0 && (
        <div>
          <p className='error'>
            Enter valid company details or view company details if already
            created'
          </p>
          <button type='button' onClick={handleViewDetails}>
            View Details
          </button>
        </div>
      )}
    </form>
  );
};

export default CompanyInfoForm;
