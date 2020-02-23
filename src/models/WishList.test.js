import { getSnapshot,onSnapshot,onPatch } from 'mobx-state-tree';
import { reaction } from 'mobx';

import { WishListItem,WishList } from './WishList';

it('can create Wishlist item',()=>{
    const item = WishListItem.create({
        "name":"demo",
        "price":3
    })
    expect(item.name).toBe('demo')
    // item.name = 'test';
    item.changeName('test');
    item.changePrice(9)
    expect(item.name).toBe('test');
    expect(item.price).toBe(9)


    

    
})

it('can create wishlist',()=>{
    const WistListItems = WishList.create({
        items:[
            {
                "name":"demo",
                "price":3
            }
        ]
    })
    
    expect(WistListItems.items.length).toBe(1);
    expect(WistListItems.items[0].price).toBe(3);
    expect(WistListItems.items[0].image).toBe('');

})

it('can add item to wistlist',()=>{
    const wistlist = WishList.create();
    const states = [];
    onSnapshot(wistlist,snapshot=>{
        states.push(snapshot);
    })
    wistlist.add({
        "name":"demo",
        "price":3
    });
    expect(wistlist.items.length).toBe(1);
    expect(wistlist.items[0].price).toBe(3);
    wistlist.items[0].changeName('change this name');
    expect(wistlist.items[0].name).toBe('change this name');
    expect(getSnapshot(wistlist)).toMatchSnapshot()

    wistlist.items[0].changePrice(21);
    expect(wistlist.items[0].price).toBe(21);

    expect(states).toMatchSnapshot();

})


it('can record patch',()=>{
    const list = WishList.create();
    const patches = [];
    onPatch(list,patch=>{
        patches.push(patch)
    })

    list.add({
        name:'hello',
        price:90
    })
    list.items[0].changeName('good');
    list.items[0].changePrice(87);
    expect(patches).toMatchSnapshot();
})

it('can calculate total price',()=>{
    const list = WishList.create({
        items:[
            {
                name:'First',
                price:19
            },
            {
                name:'second',
                price:61
            }
        ]
    })
    expect(list.totalPrice).toBe(80);
    let count=0;
    reaction(()=>list.totalPrice,()=>count++);
    expect(count).toBe(0);
    list.items[0].changeName('New Name');
    expect(count).toBe(0);
    list.items[0].changePrice(21);
    expect(count).toBe(1);
    expect(list.totalPrice).toBe(82);
})