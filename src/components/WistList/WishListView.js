import React from 'react';
import { observer } from 'mobx-react';
import WishListItemView from './WishListItemView';
import WishListItemAdd from './WishListItemAdd';

const WishListView = ({wishList,readonly}) => {
    return <div>
        <ul>
            {wishList.items.map((item,index)=><WishListItemView readonly={readonly} item={item} key={index} />)}
        </ul>
        <p>Total price: {wishList.totalPrice}</p>
       { !readonly  && <WishListItemAdd wishList={wishList} />}
    </div>
}

export default observer(WishListView);