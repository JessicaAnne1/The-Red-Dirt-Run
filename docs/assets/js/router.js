import {state,emit} from './store.js';
const read=()=>{const [path,query='']=location.hash.slice(1).split('?'),parts=path.split('/'),p=new URLSearchParams(query);return {screen:parts[0]||'home',id:parts[1]||'',category:p.get('category')||'',filter:p.get('filter')||''}};
export function go(screen,params={}){state.route={screen,...params};const p=new URLSearchParams();if(params.category)p.set('category',params.category);if(params.filter)p.set('filter',params.filter);history.pushState(state.route,'','#'+screen+(params.id?'/'+encodeURIComponent(params.id):'')+(p.size?'?'+p.toString():''));emit()}
export function back(){history.length>1?history.back():go('home')}
export function initRouter(){state.route=read();history.replaceState(state.route,'',location.href);addEventListener('popstate',()=>{state.route=read();emit()})}
