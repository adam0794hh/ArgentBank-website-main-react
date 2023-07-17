import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal'
import { updateUsername } from '../store/userDataSlice';

function EditUserModal({ isOpen, onRequestClose, userData }) {
    const [username, setUsername] = useState(userData.userData.body.userName || "");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        console.log("New username:", newUsername);
        setUsername(newUsername);
    };

    const handleSaveChanges = () => {
        console.log("Saving changes...");
        console.log("New username:", username);
        dispatch(updateUsername({ userName: username, token })).then(() => {
            // Mettre à jour le nom d'utilisateur dans l'état local
            setUsername(username);
        });
        onRequestClose();
    };
  return (
    <>
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Edit User</h2>
            <input
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                
            />
            <input
                type="text"
                name="firstName"
                value={userData.userData.body.firstName}
                disabled
            />
            <input
                type="text"
                name="lastName"
                value={userData.userData.body.lastName}
                disabled
            />
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={onRequestClose}>Cancel</button>
        </Modal>
    </>
  )
}

export default EditUserModal