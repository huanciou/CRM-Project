import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import AdminProfileForm from './AdminProfileForm';

const AdminProfileComponent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const setUpProfile = `${apiUrl}/api/1.0/admin/fetchSetup`;

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    fetch(setUpProfile)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        setProfileData({});
        console.error('API Error:', error);
      });
  };

  const handleRefresh = () => {
    fetchProfileData();
  };

  return (
    <>
      <p type="primary" onClick={() => setOpen(true)}>
        商家資訊
      </p>
      <Modal
        title="Admin Profile"
        centered
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <AdminProfileForm profileData={profileData} onRefresh={handleRefresh} />
      </Modal>
    </>
  );
};

export default AdminProfileComponent;
