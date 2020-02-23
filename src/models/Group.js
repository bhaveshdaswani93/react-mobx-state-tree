import { types,flow, getParent,applySnapshot,getSnapshot,onSnapshot } from 'mobx-state-tree';
import { WishList } from "./WishList";
import { createStorable } from "./Storable";

export const UserBase = types.model({
    id:types.identifier,
    name:types.string,
    gender: types.union( types.literal('m'), types.literal('f')),
    wishList:types.optional(WishList,{}),
    reciptient:types.maybe( types.reference(types.late(()=>User)))
});

 const UserAction = types.model({}).actions(self=>({
        
     getSuggestions:flow( function * () {
        
        const response = yield window.fetch(`http://localhost:3001/suggestions_${self.gender}`);
        const suggestions = yield response.json();
        self.wishList.items.push(...suggestions);
        

        // window.fetch(`http://localhost:3001/suggestions_${self.gender}`)
        // .then(response=>response.json())
        // .then(suggestions=>{
        //     self.wishList.items.push(...suggestions)
        // })
    }
    ),
    
    
}))

export const User  = types.compose(UserAction,UserBase,createStorable('users','id'))

export const Group = types.model({
    users:types.array(User)
})
.actions(self=> {
        let controller;
        return {
            afterCreate() {
                self.load();
                
            },
            beforeDestroy() {
                alert('destroy called');
                if(controller){controller.abort()}
            },
            reload(){
                if(controller){
                    console.log('abort called');
                    
                    controller.abort()
                    
                }
                self.load();
            },
            load:flow(function * load() {
                try {
                     controller = new window.AbortController()
                    //  yield new Promise((res,rej)=>setTimeout(()=>res(),2000))
                const response = yield window.fetch('http://localhost:3001/users',{
                    // signal:controller.signal,
                });
                const response2 = yield window.fetch('https://jsonplaceholder.typicode.com/todos/1',{
                    signal:controller.signal,
                });
                const users = yield response.json();
                applySnapshot(self.users,users);
                console.log('success')
                } catch(e) {
                    console.log('request aborted',e.name)
                }
                
        
            }),
            drawLots(){
                const allUsers = self.users.values()
                if(allUsers <=1) return;
                
                const remaining = allUsers.slice();
        
                allUsers.forEach(user=>{
                    if(remaining.length === 1 && remaining[0] === user){
        
                    }
                })
            }
        }
    }
)