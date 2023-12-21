import React from 'react';
import { Button, Modal } from 'antd';

const AutoModalComponent = ({ credits, name }) => {
  const [modal, contextHolder] = Modal.useModal();
  const countDown = () => {
    let secondsToGo = 5;
    const instance = modal.success({
      title: (
        <>
          <h2>{name}, 你好</h2>
          <br />
          <span>目前累積點數</span>{' '}
          <h1 style={{ display: 'inline', color: 'red' }}>{credits}</h1>
        </>
      ),
      // content: `${secondsToGo}秒後結束視窗`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `${secondsToGo}秒後結束視窗`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };
  return (
    <>
      <Button onClick={countDown} width={1000}>
        累積點數一覽
      </Button>
      {contextHolder}
    </>
  );
};

export default AutoModalComponent;
