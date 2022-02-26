import React, { useEffect, useState } from 'react';
import { Card, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../components/List';
import { RootState } from '../../store';
import {
  fetchAllChips, fetchBeverages, fetchChocolates, fetchActiveDeal
} from '../../slices';
import { IProduct } from '../../common/interfaces';
import { PRODUCT_TYPES } from '../../common/enums/productTypes';

const { TabPane } = Tabs;
const tabs = [{
  title: 'Chips',
  id: 1,
  productType: PRODUCT_TYPES.CHIPS
}, {
  title: 'Beverages',
  id: 2,
  productType: PRODUCT_TYPES.BEVERAGE
}, {
  title: 'Chocolates',
  id: 3,
  productType: PRODUCT_TYPES.CHOCOLATE
}];
interface ICombo{
  chips:IProduct,
  beverage:IProduct,
  chocolate:IProduct
}
function Home() {
  const chips:IProduct[] = useSelector((state: RootState) => state.products.chips);
  const beverages:IProduct[] = useSelector((state: RootState) => state.products.beverages);
  const chocolates:IProduct[] = useSelector((state: RootState) => state.products.chocolates);
  const activeDeals:Array<number> = useSelector((state: RootState) => state.products.activeDeals);
  const [combo, setCombo] = useState<ICombo>({
    chips: { id: 0, name: '', type: '' },
    beverage: { id: 0, name: '', type: '' },
    chocolate: { id: 0, name: '', type: '' }
  });
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllChips());
  }, []);

  const changeTab = (key?:string) => {
    if (key) {
      setActiveTab(parseInt(key, 10));
    } else {
      setActiveTab((_prevState) => (_prevState >= 3 ? 1 : _prevState + 1));
    }
  };

  const updateCombo = (key:PRODUCT_TYPES, product:IProduct) => {
    setCombo((_prevState) => ({ ..._prevState, [key]: product }));
    changeTab();
  };

  const fetchData = (productType:PRODUCT_TYPES) => {
    switch (productType) {
      case PRODUCT_TYPES.CHIPS:
        return chips;
      case PRODUCT_TYPES.BEVERAGE:
        return beverages;
      case PRODUCT_TYPES.CHOCOLATE:
        return chocolates;
      default:
        return [];
    }
  };

  useEffect(() => {
    dispatch(fetchBeverages({ chipsId: combo.chips.id }));
  }, [combo.chips]);

  useEffect(() => {
    dispatch(fetchChocolates({ chipsId: combo.chips.id, beverageId: combo.beverage.id }));
  }, [combo.beverage]);

  useEffect(() => {
    dispatch(fetchActiveDeal({ chocolateId: combo.chocolate.id }));
  }, [combo.chocolate]);
  return (
    <div className="container">
      <Tabs defaultActiveKey="1" activeKey={activeTab.toString()} onChange={changeTab} className="content">
        {
                tabs.map((item) => (
                  <TabPane tab={item.title} key={item.id}>
                    <List
                      productType={item.productType}
                      onSelectCombo={updateCombo}
                      data={fetchData(item.productType)}
                      title={item.title}
                    />
                  </TabPane>
                ))
            }
      </Tabs>
      {
        combo.chips.id && combo.beverage.id && combo.chocolate.id ? (
          <Card title={activeDeals[0]}>
            <p>
              Chips:
              {' '}
              <b>{combo.chips.name}</b>
            </p>
            <p>
              Drink:
              {' '}
              <b>{combo.beverage.name}</b>
            </p>
            <p>
              Chocolate:
              {' '}
              <b>{combo.chocolate.name}</b>
            </p>
          </Card>
        ) : null
      }
    </div>
  );
}
export default Home;
