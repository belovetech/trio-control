import React, { useState } from 'react';
import { useAuth } from '../provider/AuthProvider';

import Login from './Login';
import CompanyInfoForm from './CompanyInfoForm';
import AdminView from './AdminView';

import { getAllCompany } from '../services';
import { CompanyDetails } from '../services/types';
import { Admin } from '../utils/isAdmin';

interface AuthenticatedContentProps {
  isAdmin: boolean;
  companyDetails: CompanyDetails[];
  setCompanyDetails: (companyDetails: CompanyDetails[]) => void;
}
const AuthenticatedContent = ({
  isAdmin,
  companyDetails,
  setCompanyDetails,
}: AuthenticatedContentProps) => {
  return isAdmin ? (
    <AdminView
      companyDetails={companyDetails}
      setCompanyDetails={setCompanyDetails}
    />
  ) : (
    <CompanyInfoForm />
  );
};

const ParentComponent: React.FC = () => {
  const { auth } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails[]>([]);

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    getCurrentUser();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const getCurrentUser = async () => {
    const uid = (await auth.currentUser?.uid) ?? '';
    const token = await auth.currentUser?.getIdToken();

    try {
      if (Admin(uid)) {
        const companies = await getAllCompany(token);
        const allCompanies = companies.body.companies;
        setCompanyDetails([...allCompanies]);
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Login
          onSuccessfulLogin={handleSuccessfulLogin}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <>
          <AuthenticatedContent
            isAdmin={isAdmin}
            companyDetails={companyDetails}
            setCompanyDetails={setCompanyDetails}
          />
          <button className='logout' onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default ParentComponent;
