export type CivicIssue={id:string;title:string;neighborhood:string;opened:string;status:string;summary:string};
export type CivicEvent={id:string;issue_id:string;date:string;kind:string;summary:string;source_url:string;source_label:string;verified:boolean};
export function buildTimeline(issue:CivicIssue, allEvents:CivicEvent[]) {
  const events=allEvents.filter((event)=>event.issue_id===issue.id).sort((a,b)=>b.date.localeCompare(a.date));
  const opened=new Date(`${issue.opened}T00:00:00Z`); const today=new Date("2026-11-21T00:00:00Z");
  return {events,eventCount:events.length,daysOpen:Math.max(0,Math.round((today.getTime()-opened.getTime())/86400000)),lastEventDate:events[0]?.date??"No events",verifiedCount:events.filter((event)=>event.verified).length};
}
