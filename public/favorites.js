const KEY='radar-followed';
export function loadFavorites(getStorage){
 try{
  const list=JSON.parse(getStorage()?.getItem(KEY)||'[]');
  if(!Array.isArray(list))return new Set();
  return new Set(list.filter(x=>typeof x==='string'&&/^[a-z0-9-]+$/.test(x)).slice(0,100));
 }catch{return new Set()}
}
export function saveFavorites(getStorage,followed){
 try{
  const store=getStorage();
  if(!store)return false;
  store.setItem(KEY,JSON.stringify([...followed]));
  return true;
 }catch{return false}
}
