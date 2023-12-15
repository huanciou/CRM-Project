import React from 'react';
import LayoutComponent from './LayoutComponent';
import FormComponent from './FormComponent';
import MenuRespondComponent from './MenuRespondComponent';

const FormPage = () => {
  return (
    <div>
      <LayoutComponent>
        <React.Fragment>
          <FormComponent />
          <MenuRespondComponent />
        </React.Fragment>
      </LayoutComponent>
    </div>
  );
};

export default FormPage;
