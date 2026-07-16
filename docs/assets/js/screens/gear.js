import {state} from '../store.js';
import {esc} from '../ui.js';

const quantity=(i,d)=>d.commitments.filter(c=>c.item_id===i.item_id&&c.status!=='archived').reduce((n,c)=>n+Number(c.qty||0),0);
const categoryIcon=(c)=>({"Mundiville essentials":"🏜️","Sleeping & shelter":"⛺","Camp kitchen":"🍳","Food & drink":"🥪","Day & night clothing":"🧥",Toiletries:"🧴","Emergency & road":"🛻","Concert area":"🎵","Fire & cooking":"🔥","Power & lighting":"💡","Water & waste":"💧","Games & extras":"🃏",Consumables:"🫘","Shelter & comfort":"🌤️"}[c]||'📦');

export function gear(){
  const d=state.data,categories=[...new Set(d.items.filter(i=>i.status==='active').map(i=>i.category))];
  return `<header class="top"><span class="brand">PACKING</span><button class="secondary" data-add-item-short>Add item</button></header><h1>What’s coming with us?</h1><div class="grid">${categories.map(c=>{const xs=d.items.filter(i=>i.category===c&&i.status==='active'),un=xs.filter(i=>i.scope==='communal'&&quantity(i,d)<i.qty_needed).length;return `<button class="tile" data-go="gear-category" data-category="${esc(c)}"><span class="category-art">${categoryIcon(c)}</span><strong>${esc(c)}</strong><span class="small">${xs.length} things · ${un?un+' unclaimed':'all allocated'}</span></button>`}).join('')}</div>`;
}

export function gearCategory(category){
  const d=state.data;let xs=d.items.filter(i=>i.category===category&&i.status==='active');
  if(state.filter==='needs')xs=xs.filter(i=>i.scope==='communal'&&quantity(i,d)<i.qty_needed);
  if(state.filter==='claimed')xs=xs.filter(i=>i.scope==='communal'&&quantity(i,d)>0);
  return `<header class="top"><button class="back" data-back>← Packing</button><button class="secondary" data-add-item-short>Add item</button></header><h1>${esc(category)}</h1><div class="filters">${[['needs','Needs allocation'],['claimed','Allocated'],['all','All']].map(([v,l])=>`<button data-filter="${v}" class="${state.filter===v?'selected':''}">${l}</button>`).join('')}</div><div class="item-grid">${xs.length?xs.map(i=>{const q=quantity(i,d);return `<button class="item-tile" data-item="${i.item_id}"><span class="item-state">${i.scope==='communal'?'◉':'○'}</span><b>${esc(i.name)}</b><span class="small">${i.scope==='communal'?`${q} / ${i.qty_needed} ${esc(i.unit)} allocated`:'One per crew'}</span></button>`}).join(''):'<p class="empty">No items in this view.</p>'}</div>`;
}
