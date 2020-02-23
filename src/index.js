import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { onSnapshot,getSnapshot,addMiddleware } from 'mobx-state-tree';

import { WishList } from './models/WishList';
import { Group } from './models/Group';

// let initialState = {
//     items:[
//         {
//             name:'demo',
//             price:12
//         },
//         {
//             name:'sub',
//             price:26
//         }
//     ]
// };


let initialState = {
    users:[
       
    ]
};

// if(localStorage.getItem('wishListApp')) {
//     const preCheckinitialState = JSON.parse( localStorage.getItem('wishListApp'));
//     let isGroup = Group.
//     if(Group.is(preCheckinitialState)) {
//         initialState = preCheckinitialState;
//     }
// }


// const wishList = WishList.create(initialState);
const group = window.group=  Group.create(initialState);
// group.load();
// addMiddleware(group,(call,next)=>{
//     console.log(`${call.type} ${call.name}`);
    
//     next(call);
// })
console.log(getSnapshot(group));

onSnapshot(group,snapshot=>{
    console.log(typeof snapshot);
    console.log(snapshot);
    localStorage.setItem('wishListApp',JSON.stringify(snapshot));
})



ReactDOM.render(<App appTitle="Person Manager" group={group} />, document.getElementById('root'));

// setInterval(()=>{
//     wishList.items[0].changePrice(wishList.items[0].price + 1);
// },1000)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
