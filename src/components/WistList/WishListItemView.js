import React,{useState} from 'react';
import { observer } from 'mobx-react';
import { clone,applySnapshot,getSnapshot } from 'mobx-state-tree';
import WishListItemEdit from './WishListItemEdit';

const WishListItemView = ({item,readonly})=>{
    const [isEditable,setIsEditable] = useState(false);
    const [cloneItem,setCloneItem] = useState(null);

    const onCancel = ()=>{
        setIsEditable(false);
    }

    const onSave = ()=>{
       applySnapshot(item , getSnapshot(cloneItem));
       setCloneItem(null);
        setIsEditable(false);
    }

    const onDelete = () => {
        item.delete()
    }

    const renderEdit = () => {

        // const cloneItem = clone(item);
        return <li><WishListItemEdit item={cloneItem}  />
        <span> <button onClick={onSave} title='Cancel'>
        Done
    </button> </span>
         <span> <button onClick={onCancel} title='Cancel'>
        Cancel
    </button> </span>
        </li>
    }

    const onEdit = () => {
        setIsEditable(true)
        setCloneItem(clone(item));
    }

    return isEditable? renderEdit():<li>
    {item.image && <img src={item.image} alt='' />}
    <h3>{item.name}</h3>
    <span>{item.price}</span>
    { !readonly && <div><span> <button onClick={onDelete} title='Edit'>
        Delete
    </button> </span>
    <span> <button onClick={onEdit} title='Edit'>
        Edit
    </button> </span></div>}
</li> 
}

export default  WishListItemView;