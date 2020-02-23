import { types,getParent,destroy } from 'mobx-state-tree';

export const WishListItem = types.model({
    name:types.string,
    price:types.number,
    image:types.optional(types.string,"")
})

.actions(self=>({
    changeName(newName) {
        self.name = newName;
    },
    changePrice(newPrice) {
        self.price = newPrice
    },
    changeImage(newImage){
        self.image = newImage
    },
    delete(){
        getParent(self,2).remove(self)
    },
    beforeDestroy(){
        alert('Wishlist item deleted'+JSON.stringify(self));
    }
}))

export const WishList = types.model({
    items: types.optional( types.array(WishListItem),[])
})
.actions(self=>({
    add(item) {
        self.items.push(item);
    },
    remove(item) {
        destroy(item)
        // self.items.splice(self.items.indexOf(item),1)
    }
}))
.views(self=>({
    get totalPrice(){
        return self.items.reduce((sum,item)=>sum+item.price,0)
    }
}))
;