import React from 'react';
import { observer } from 'mobx-react';

const WishListItemEdit = ({item}) =>{
    const onChangeName = event=>{
        item.changeName(event.target.value)
    }

    const onChangePrice = event=>{
        const price = parseInt(event.target.value)
        if(!isNaN(price)) {
            item.changePrice(price)
        }
    }

    const onChangeImage = event=>{
        item.changeImage(event.target.value)
    }
    
    return <div>
        Things <input value={item.name} onChange={onChangeName} />
        Price <input value={item.price} onChange={onChangePrice} />
        Image <input value={item.image} onChange={onChangeImage} />
    </div>
}



export default observer(WishListItemEdit);