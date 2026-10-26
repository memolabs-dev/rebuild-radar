import test from 'node:test';
import assert from 'node:assert/strict';
import {loadFavorites,saveFavorites} from '../public/favorites.js';
test('corrupted storage falls back to empty favorites',()=>{
 assert.deepEqual([...loadFavorites(()=>({getItem:()=>'{broken'}))],[]);
 assert.deepEqual([...loadFavorites(()=>({getItem:()=>'"not-array"'}))],[]);
 assert.deepEqual([...loadFavorites(()=>({getItem:()=>JSON.stringify(['excel',5,'<script>','figma','excel'])}))],['excel','figma']);
});
test('restricted storage cannot crash favorite loading or writes',()=>{
 const denied=()=>{throw Error('Storage unavailable')};
 assert.deepEqual([...loadFavorites(denied)],[]);
 assert.equal(saveFavorites(denied,new Set(['excel'])),false);
 assert.equal(saveFavorites(()=>({setItem:()=>{throw Error('Quota exceeded')}}),new Set(['excel'])),false);
 assert.equal(saveFavorites(()=>null,new Set(['excel'])),false);
});
test('valid favorites persist and reload',()=>{
 let value;
 const storage={getItem:()=>value,setItem:(name,next)=>{assert.equal(name,'radar-followed');value=next}};
 assert.equal(saveFavorites(()=>storage,new Set(['excel','figma'])),true);
 assert.deepEqual([...loadFavorites(()=>storage)],['excel','figma']);
});
