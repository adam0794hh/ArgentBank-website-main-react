import React, { useEffect, useState } from 'react'
import Navuser from '../components/Navuser'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, restoreUserData, updateUsername} from '../store/userDataSlice';
import "../pages/Signin.css";
import Footer from '../components/Footer';
import ButtonT from '../components/ButtonT';



function User() {

  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(userData.userData?.body.userName || '');
  const [firstName, setFirstName] = useState(userData.userData?.body.firstName || '');
  const [lastName, setLastName] = useState(userData.userData?.body.lastName || '');

  useEffect(() => {
    if (userData.userData) {
      setUsername(userData.userData.body.userName || '');
      setFirstName(userData.userData.body.firstName || '');
      setLastName(userData.userData.body.lastName || '');
    }
  }, [userData.userData]);


  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    const updatedUserData = {
      ...userData.userData,
      body: {
        ...userData.userData.body,
        userName: username,
        firstName,
        lastName
      }
    };
  
    dispatch(updateUsername(updatedUserData.body)).then(() => {
      setIsEditing(false);
    });
  };

  
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
  return (
    <div className='user-content'>
        <Navuser/>
        {userData.userData && (
        <div className='main user bg-dark'>
          <div className='user-info'>
            {isEditing ? (
              <>
                <h2>Edit User info</h2>
                <div>
                  <label>User name:</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label>First name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    disabled
                  />
                </div>
                <div>
                  <label>Last name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    disabled
                  />
                </div>
                <div className='button-style'>
                  <button className='edit-button' onClick={handleSaveChanges}>Save</button>
                  <button className='edit-button' onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
                
              </>
            ) : (
              <>
                <h1 className='user-details'>
                  Welcome back, {userData.userData.body.firstName} {userData.userData.body.lastName}!
                </h1>
                <button onClick={handleEditName} className='edit-button'>Edit Name</button>
              </>
            )}
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