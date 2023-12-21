import React, { useEffect } from 'react';
import LayoutComponent from './LayoutComponent';
import FormComponent from './FormComponent';
import MenuRespondComponent from './MenuRespondComponent';
import DividerComponent from './DividerComponent';

const FormPage = () => {
  useEffect(() => {
    document.title = 'Menu Setup';
  }, []);

  return (
    <div>
      <LayoutComponent>
        <React.Fragment>
          <DividerComponent>
            <h2 className="ant-form-text" style={{ marginLeft: 20, zIndex: 1 }}>
              編輯菜單
            </h2>
          </DividerComponent>
          <MenuRespondComponent />
          <FormComponent />
        </React.Fragment>
      </LayoutComponent>
    </div>
  );
};

export default FormPage;
