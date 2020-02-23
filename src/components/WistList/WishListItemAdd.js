import React,{useState} from 'react';
import WishListItemEdit from './WishListItemEdit';
import { WishListItem } from '../../models/WishList';

const WishListItemAdd = ({wishList}) => {
    const [wishListItem,setWishListItem] = useState(WishListItem.create({
        name:'',
        price:0
    }));
    const onAdd =()=>{
        wishList.add(wishListItem);
        setWishListItem(WishListItem.create({
            name:'',
            price:0
        }))
    }
    return (
    <div>
        <WishListItemEdit item={wishListItem} />
    <span>
        <button onClick={onAdd}>Add</button>
    </span>
    </div>
    
    )

}

export default WishListItemAdd;