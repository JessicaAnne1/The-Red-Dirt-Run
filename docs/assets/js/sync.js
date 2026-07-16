import {dbAll,dbPut,dbDelete} from './indexed-db.js';
import {syncOperations} from './api.js';
import {state,patchRecord,emit} from './store.js';
const deviceId=localStorage.getItem('rdr-device')||crypto.randomUUID();localStorage.setItem('rdr-device',deviceId);let counter=+localStorage.getItem('rdr-counter')||0;
export async function queue(op){counter++;localStorage.setItem('rdr-counter',counter);op={...op,op_id:`${deviceId}:${counter}`,device_id:deviceId,client_time:new Date().toISOString()};await dbPut('outbox',{id:op.op_id,op});await refreshPending();if(navigator.onLine)flush();return op}
export async function refreshPending(){state.pending=(await dbAll('outbox')).length;state.issues=await dbAll('issues');emit()}
async function saveIssue(row,result,kind){await dbPut('issues',{id:row.id,kind,op:row.op,result,created_at:new Date().toISOString()});if(result.current)patchRecord(row.op.entity,result.current);await dbDelete('outbox',row.id)}
export async function dismissIssue(id){await dbDelete('issues',id);await refreshPending()}
export async function flush(){if(!navigator.onLine)return;const rows=await dbAll('outbox');if(!rows.length)return;try{const {results=[]}=await syncOperations(rows.map(x=>x.op));for(const result of results){const row=rows.find(x=>x.id===result.op_id);if(!row)continue;if(result.record){patchRecord(row.op.entity,result.record);await dbDelete('outbox',row.id)}else if(result.conflict)await saveIssue(row,result,'conflict');else if(result.error)await saveIssue(row,result,'error')}await refreshPending()}catch(e){state.syncError=e.message;emit()}}
addEventListener('online',()=>{state.online=true;emit();flush()});addEventListener('offline',()=>{state.online=false;emit()});
