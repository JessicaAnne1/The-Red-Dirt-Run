var RDR_SHEETS={
  Crews:['crew_id','display_name','colour','emoji','sort_order','active'],People:['person_id','display_name','crew_id','sort_order','active'],
  Items:['item_id','name','category','scope','source','qty_needed','unit','priority','official_note','notes','created_by','created_at','updated_at','version','status'],
  PersonalChecks:['personal_check_id','item_id','crew_id','qty','state','notes','updated_by','updated_at','version'],
  Commitments:['commitment_id','item_id','crew_id','qty','state','notes','updated_by','updated_at','version','status'],
  Tasks:['task_id','title','stage','due_date','crew_id','person_id','status','notes','created_by','created_at','updated_at','version'],
  TripLegs:['leg_id','direction','day_label','sequence','date','depart_time','from_place','to_place','via','drive_time','stop_type','booking_ref','map_url','notes','decision_status','created_by','updated_at','version','status'],
  LegCrews:['leg_crew_id','leg_id','crew_id','joining','notes','updated_by','updated_at','version','status'],Links:['link_id','label','url','thumbnail_url','source','created_by','created_at','updated_at','version','status'],Activity:['activity_id','op_id','person_id','crew_id','entity_type','entity_id','action','summary','created_at','device_id'],ProcessedOps:['op_id','device_id','received_at','result_json'],Config:['key','value','group','sort_order','active']
};
var RDR_IDS={item:'item_id',personal_check:'personal_check_id',commitment:'commitment_id',task:'task_id',trip_leg:'leg_id',leg_crew:'leg_crew_id',link:'link_id'};
var RDR_COLLECTIONS={item:'Items',personal_check:'PersonalChecks',commitment:'Commitments',task:'Tasks',trip_leg:'TripLegs',leg_crew:'LegCrews',link:'Links'};
function rdrNow_(){return new Date().toISOString();}function rdrId_(prefix){return prefix+'-'+Utilities.getUuid().slice(0,8).toUpperCase();}
function rdrSheet_(){return SpreadsheetApp.getActive();}function rdrJson_(x){return ContentService.createTextOutput(JSON.stringify(x)).setMimeType(ContentService.MimeType.JSON);}
