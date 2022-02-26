import React from 'react';
import { List } from 'antd';
import { ICustomList, IProduct } from '../../common/interfaces';

function CustomList({
  data, title, onSelectCombo, productType
}:ICustomList) {
  return (
    <List
      header={<div>{title}</div>}
      bordered
      dataSource={data}
      renderItem={(item:IProduct) => (
        <List.Item key={item.id} onClick={() => onSelectCombo(productType, item)}>
          {item.name}
        </List.Item>
      )}
    />
  );
}

export default CustomList;
