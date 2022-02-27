import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { Card, Tabs, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../components/List';
import { RootState } from '../../store';

import { IProduct } from '../../common/interfaces';
import { PRODUCT_TYPES } from '../../common/enums/productTypes';
import { fetchAllProducts, fetchFilteredProducts } from '../../slices';

const { TabPane } = Tabs;
const tabs = [{
  title: 'Chips',
  id: 1,
  productType: PRODUCT_TYPES.CHIPS
}, {
  title: 'Drinks',
  id: 2,
  productType: PRODUCT_TYPES.DRINK
}, {
  title: 'Chocolates',
  id: 3,
  productType: PRODUCT_TYPES.CHOCOLATE
}];
function Home() {
  const products:IProduct[] = useSelector((state: RootState) => state.products);
  const [combo, setCombo] = useState<IProduct[]>([]);
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();

  const filterProducts = (productType:PRODUCT_TYPES) => products.filter(
    (item) => item.type === productType
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const changeTab = (key?:string) => {
    if (key) {
      setActiveTab(parseInt(key, 10));
    } else {
      setActiveTab((_prevState) => (_prevState >= 3 ? 1 : _prevState + 1));
    }
  };

  const isProductSelected = useCallback((id:number) => {
    const prodObj = combo.find((item) => item.id === id);
    return Boolean(prodObj);
  }, [combo]);

  const updateCombo = (product:IProduct) => {
    if (isProductSelected(product.id)) {
      return;
    }
    setCombo((_prevState) => ([..._prevState, product]));
    changeTab();
  };
  useEffect(() => {
    if (combo.length) {
      dispatch(fetchFilteredProducts(combo));
    }
  }, [combo]);
  return (
    <div className="container">
      <Tabs defaultActiveKey="1" activeKey={activeTab.toString()} onChange={changeTab} className="content">
        {
                tabs.map((item) => (
                  <TabPane tab={item.title} key={item.id}>
                    <List
                      isProductSelected={isProductSelected}
                      onSelectCombo={updateCombo}
                      data={useMemo(() => filterProducts(item.productType), [products])}
                      title={item.title}
                    />
                  </TabPane>
                ))
            }
      </Tabs>
      {
        combo.length === 3 ? (
          <>
            <Card title="Combo">
              <p>
                Chips:
                {' '}
                <b>{combo.find((item) => item.type === PRODUCT_TYPES.CHIPS)?.name}</b>
              </p>
              <p>
                Drink:
                {' '}
                <b>{combo.find((item) => item.type === PRODUCT_TYPES.DRINK)?.name}</b>
              </p>
              <p>
                Chocolate:
                {' '}
                <b>{combo.find((item) => item.type === PRODUCT_TYPES.CHOCOLATE)?.name}</b>
              </p>
            </Card>
            <div className="footer">
              <Button
                type="primary"
                onClick={() => {
                  changeTab('1');
                  setCombo([]);
                  dispatch(fetchAllProducts());
                }}
              >
                Modify

              </Button>
            </div>
          </>
        ) : null
      }
    </div>
  );
}
export default Home;
