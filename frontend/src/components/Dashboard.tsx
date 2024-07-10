import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getUserData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/user/profile', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user data');
    }
};

const saveUserData = async (data: any) => {
    try {
        await axios.post('http://localhost:3000/api/v1/user/complete', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
    } catch (error) {
        throw new Error('Error saving user data');
    }
};

export { getUserData, saveUserData };

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editedData, setEditedData] = useState<any>({});

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const data = await getUserData(); // Replace with your API call to fetch user data
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleEditClick = () => {
        setEditMode(true);
        setEditedData({
            dob: userData.dob,
            workLocation: userData.workLocation,
            bio: userData.bio,
        });
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setEditedData({});
    };

    const handleSaveClick = async () => {
        try {
            await saveUserData(editedData); // Replace with your API call to save user data
            setUserData(editedData);
            setEditMode(false);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            {userData ? (
                <form>
                    <label>
                        Name:
                        <input type="text" name="name" value={userData.name} disabled />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={userData.email} disabled />
                    </label>
                    <label>
                        Date of Birth:
                        {editMode ? (
                            <input
                                type="date"
                                name="dob"
                                value={editedData.dob || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <input type="text" value={userData.dob} disabled />
                        )}
                    </label>
                    <label>
                        Work Location:
                        {editMode ? (
                            <input
                                type="text"
                                name="workLocation"
                                value={editedData.workLocation || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <input type="text" value={userData.workLocation} disabled />
                        )}
                    </label>
                    <label>
                        Bio:
                        {editMode ? (
                            <textarea
                                name="bio"
                                value={editedData.bio || ''}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <textarea value={userData.bio} disabled />
                        )}
                    </label>
                    {editMode ? (
                        <>
                            <button type="button" onClick={handleCancelClick}>
                                Cancel
                            </button>
                            <button type="button" onClick={handleSaveClick}>
                                Save
                            </button>
                        </>
                    ) : (
                        <button type="button" onClick={handleEditClick}>
                            Edit
                        </button>
                    )}
                </form>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;
