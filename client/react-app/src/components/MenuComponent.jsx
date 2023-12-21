import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/menu.css';

const MenuComponent = () => {
  const params = useParams();
  const menuUrl = `${window.location.origin}/api/1.0/user/menu/${params.db}`;

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(menuUrl);
        const data = await response.json();
        setMenu(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenu();
  }, [menuUrl]);
  return <div></div>;
};

export default MenuComponent;
