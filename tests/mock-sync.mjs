import {CONFIG} from '../docs/assets/js/config.js';
CONFIG.apiUrl='';
import {bootstrap,syncOperations} from '../docs/assets/js/api.js';
const data=await bootstrap(),item=data.items.find(x=>x.scope==='communal');
const op={op_id:'test:one',entity:'commitment',action:'create',actor_person_id:'P-JESSICA',device_id:'test',payload:{commitment_id:'COM-TEST-A',item_id:item.item_id,crew_id:'C-JESSICA-MICHAEL',qty:2,state:'claimed',status:'active'}};
const replay=await syncOperations([op,op,op]);if(replay.results.filter(x=>x.record).length!==3)throw Error('Idempotent replay did not return stored result');
const second={...op,op_id:'test:two',payload:{...op.payload,commitment_id:'COM-TEST-B',crew_id:'C-TAYA-SIMON',qty:1}};if(!(await syncOperations([second])).results[0].record)throw Error('Second contribution failed');
const stale={op_id:'test:stale',entity:'commitment',action:'update',actor_person_id:'P-JESSICA',device_id:'test',base_version:0,payload:{...op.payload,qty:3}};if(!(await syncOperations([stale])).results[0].conflict)throw Error('Stale version did not conflict');
console.log('PASS: mock replay idempotency, multiple contributions, structured conflict');
