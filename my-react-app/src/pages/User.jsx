import React, { useEffect, useState } from 'react'
import Navuser from '../components/Navuser'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, restoreUserData } from '../store/userDataSlice';
import "../pages/Signin.css"
import Footer from '../components/Footer';
import ButtonT from '../components/ButtonT';
import EditUserModal from '../components/EditUserModal';


function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const userData = useSelector(state => state.userData);
  console.log(userData);
  const dispatch = useDispatch();
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    dispatch(restoreUserData()); // Restaurer les données depuis le local storage
  }, [dispatch]);

  useEffect(() => {
    if (!hasFetchedData && !userData.loading && !userData.userData) {
      dispatch(fetchUserData()); // Appel à l'API si les données ne sont pas déjà présentes
      setHasFetchedData(true);
    }
  }, [dispatch, userData.loading, userData.userData, hasFetchedData]);
  if (userData.loading) {
    return <p>Loading...</p>;
  }
  console.log("User data:", userData);
  return (
    <div className='user-content'>
        <Navuser/>
        {userData.userData && (
        <div className='main user bg-dark'>
          <div className='user-info'>
            <h1 className='user-details'>Welcome back, {userData.userData.body.firstName} {userData.userData.body.lastName}!</h1>
            <button onClick={openModal} className='edit-button'>Edit Name</button>
            <EditUserModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            userData={userData}
            />
        
          </div>
          <ButtonT/>
          <ButtonT/>
          <ButtonT/> 
        
        </div>
      )}
      <Footer/>
    </div>
  )
}

export default User