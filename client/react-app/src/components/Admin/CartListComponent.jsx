// import React from 'react';
// import { List } from 'antd';

// const CartListComponent = ({ cartItems }) => {
//   console.log('Cart items:', cartItems);

//   return (
//     <List
//       itemLayout="vertical"
//       size="large"
//       pagination={{
//         onChange: (page) => {
//           console.log(page);
//         },
//         pageSize: 3,
//       }}
//       dataSource={cartItems}
//       footer={
//         <div>
//           <b>enjoy the meals</b>
//         </div>
//       }
//       renderItem={(item) => (
//         <List.Item
//           key={item._id}
//           extra={
//             <img
//               width={272}
//               alt="Product"
//               src={`https://d3nexs9enmvorf.cloudfront.net/${item.main_image}`}
//             />
//           }
//         >
//           <List.Item.Meta
//             title={<a href="https://ant.design">{item.name}</a>}
//             description={item.story}
//           />
//           {`Quantity: 1, Price: ${item.price}, Total: ${item.price}`}
//         </List.Item>
//       )}
//     />
//   );
// };

// export default CartListComponent;

import React from 'react';
import { List } from 'antd';

const CartListComponent = ({ cartItems }) => {
  console.log('Cart items:', cartItems);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={cartItems}
      footer={<div></div>}
      renderItem={(item) => (
        <List.Item
          key={item._id}
          extra={
            <img
              width={272}
              alt="Product"
              src={`https://d3nexs9enmvorf.cloudfront.net/${item.main_image}`}
            />
          }
        >
          <List.Item.Meta
            title={<a href="https://ant.design">{item.name}</a>}
            description={item.story}
          />
          {/* 显示更新后的数量和总额信息 */}
          {`Quantity: ${item.qty}, Price: ${item.price}, Total: ${item.amount}`}
        </List.Item>
      )}
    />
  );
};

export default CartListComponent;
