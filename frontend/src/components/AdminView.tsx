import React, { useState } from 'react';
import './Form.css';
import { useAuth } from '../provider/AuthProvider';
import { uploadFile } from '../services';
import { CompanyDetails } from '../services/types';
import CompanyDetailsView from './CompanyDetailsView';

interface AdminViewProps {
  companyDetails: CompanyDetails[];
  setCompanyDetails: (companyDetails: CompanyDetails[]) => void;
}

const AdminView: React.FC<AdminViewProps> = ({
  companyDetails,
  setCompanyDetails,
}) => {
  const { auth } = useAuth();
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProfileImg(files[0]);
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    company_id: string
  ) => {
    e.preventDefault();
    if (profileImg) {
      const token = (await auth.currentUser?.getIdToken()) ?? '';

      uploadFile(profileImg, company_id, token)
        .then((res) => {
          const updatedCompanyDetails = companyDetails.map((company) => {
            if (company.id === company_id) {
              return { ...company };
            }
            return company;
          });
          setCompanyDetails(updatedCompanyDetails);
          setIsFileUploaded(true);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div>
      <h2 className='admin-view-header'>Admin View - Company Details</h2>
      {companyDetails.map((company) => (
        <div key={company.id}>
          <CompanyDetailsView {...company} />
          <form
            className='flex-container'
            onSubmit={(e) => onSubmit(e, company.id)}
          >
            <label htmlFor='fileInput' className='label-button'>
              <input
                type='file'
                id='fileInput'
                className='form-control'
                onChange={onFileChange}
              />
            </label>
            <button className='btn' type='submit'>
              Upload
            </button>
          </form>
          {isFileUploaded && (
            <div className='success'>File successfully uploaded!</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminView;
