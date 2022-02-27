import React from 'react';
import { List } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { ICustomList, IProduct } from '../../common/interfaces';

function CustomList({
  data, title, onSelectCombo, isProductSelected
}:ICustomList) {
  return (
    <List
      header={<div>{title}</div>}
      bordered
      dataSource={data}
      renderItem={(item:IProduct) => (
        <List.Item
          key={item.id}
          className={`${isProductSelected(item.id) ? 'selected' : ''}`}
          onClick={() => onSelectCombo(item)}
        >
          {item.name}

          {isProductSelected(item.id) && <CheckOutlined color="green" />}
        </List.Item>
      )}
    />
  );
}

export default CustomList;
