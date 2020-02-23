import React,{useState} from 'react';
import classes from './App.module.css';
import WishListView from '../components/WistList/WishListView';
import { observer } from 'mobx-react'

const App = props => {
  const [selectedUser,setSelectedUser] = useState(null);
  const user = props.group.users.find(user=>{
    return user.id === selectedUser;
  })
  const onSelectUser = event => {
    setSelectedUser(event.target.value)
  }
  const onSuggestion = ()=>{
    user.getSuggestions();
  }
  return <div className={classes.center}>
    <p>MobX State Tree</p>
    <button onClick={props.group.reload} title='Reload'>Reload</button>
    <select onChange={onSelectUser}>
      {props.group.users.map(user=><option key={user.id} value={user.id}>{user.name}</option>)}
    </select>
    { user && <WishListView wishList={user.wishList} />}
    {user && <button onClick={onSuggestion} >Get Suggestions</button>}
    <hr />
    {user && user.reciptient?<h2>{user.reciptient.name}</h2>:''}
    { user && user.reciptient && <WishListView wishList={user.reciptient.wishList} readonly />}
  </div>
}

export default observer(App);