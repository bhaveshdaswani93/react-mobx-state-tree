import { types,flow,getSnapshot,onSnapshot } from 'mobx-state-tree';

export const createStorable = (collection,attribute) =>{
    return types.model({}).actions(self=>({
        save:flow(function * save(){
            yield window.fetch(`http://localhost:3001/${collection}/${self[attribute]}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(getSnapshot(self))
            })
        }),
        afterCreate() {
            onSnapshot(self,self.save)
        },
    }))
}

