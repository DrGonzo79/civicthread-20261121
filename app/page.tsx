"use client";

import {useMemo, useState} from "react";
import demo from "@/data/demo.json";
import {buildTimeline, type CivicEvent, type CivicIssue} from "@/lib/timeline";

type EventKind = "meeting" | "vote" | "filing" | "delay";

export default function Home() {
  const [issueId, setIssueId] = useState(demo.issues[0].id);
  const [events, setEvents] = useState<CivicEvent[]>(demo.events as CivicEvent[]);
  const [query, setQuery] = useState("");
  const [followed, setFollowed] = useState<string[]>([]);
  const [kind, setKind] = useState<EventKind>("meeting");
  const [summary, setSummary] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const visibleIssues = useMemo(() => demo.issues.filter((candidate) => `${candidate.title} ${candidate.neighborhood} ${candidate.status}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const issue = demo.issues.find((candidate) => candidate.id === issueId) as CivicIssue;
  const timeline = buildTimeline(issue, events);

  function toggleFollow(id:string) {
    const isFollowed = followed.includes(id);
    setFollowed((current) => isFollowed ? current.filter((entry)=>entry!==id) : [...current,id]);
    setNotice(isFollowed ? "Removed from your demo watchlist." : "Added to your demo watchlist. No email will be sent.");
  }
  function addEvidence(event:React.FormEvent) {
    event.preventDefault(); setError(""); setNotice("");
    if (summary.trim().length < 12) return setError("Write at least 12 characters describing what changed.");
    try { const parsed = new URL(sourceUrl); if (!/^https?:$/.test(parsed.protocol)) throw new Error(); }
    catch { return setError("Add a complete http:// or https:// public-record URL."); }
    setEvents((current)=>[...current,{id:`demo-${Date.now()}`,issue_id:issue.id,date:"2026-11-21",kind,summary:summary.trim(),source_url:sourceUrl,source_label:"Contributor submission",verified:false}]);
    setSummary(""); setSourceUrl(""); setNotice("Demo evidence added as unverified. A human editor would review it before publication.");
  }

  return <main>
    <header className="topbar"><a className="brand" href="#workspace"><span>CT</span>CivicThread</a><div className="pilot"><i/> Fictional Riverbend pilot</div></header>
    <section className="hero"><div><p className="eyebrow">THE PUBLIC RECORD, WITH MEMORY</p><h1>What happened to<br/><em>that civic promise?</em></h1></div><p className="lede">CivicThread turns scattered agendas, votes, and postponements into one dated, sourced story residents can follow for years.</p></section>
    <section className="metrics" aria-label="Demo metrics"><div><b>{demo.issues.length}</b><span>Fictional live issues</span></div><div><b>{events.length}</b><span>Dated events</span></div><div><b>100%</b><span>Source-linked</span></div><div><b>$0</b><span>Alerts actually sent</span></div></section>
    <section id="workspace" className="workspace">
      <aside className="issue-panel card"><div className="section-head"><div><p className="eyebrow">01 · CHOOSE A THREAD</p><h2>Riverbend issues</h2></div><span className="demo-tag">DEMO DATA</span></div>
        <label htmlFor="search">Find an issue</label><input id="search" className="search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search zoning, streets…"/>
        <div className="issue-list">{visibleIssues.length ? visibleIssues.map((entry)=><button className={`issue-row ${entry.id===issueId?"active":""}`} key={entry.id} onClick={()=>setIssueId(entry.id)}><span className={`dot ${entry.status}`}/><span><b>{entry.title}</b><small>{entry.neighborhood} · {entry.status.replace("_"," ")}</small></span><em>{buildTimeline(entry as CivicIssue,events).eventCount}</em></button>) : <div className="empty"><b>No matching issues</b><p>Try a neighborhood, project, or status.</p></div>}</div>
      </aside>
      <div className="timeline card">
        <div className="thread-head"><div><p className="eyebrow">02 · VERIFIED CONTINUITY</p><h2>{issue.title}</h2><p>{issue.neighborhood} · opened {issue.opened}</p></div><button className={followed.includes(issue.id)?"following":""} onClick={()=>toggleFollow(issue.id)}>{followed.includes(issue.id)?"✓ Following":"＋ Follow thread"}</button></div>
        <div className="status-strip"><div><span>Current status</span><b>{issue.status.replace("_"," ")}</b></div><div><span>Days open</span><b>{timeline.daysOpen}</b></div><div><span>Last movement</span><b>{timeline.lastEventDate}</b></div></div>
        <p className="issue-summary">{issue.summary}</p>
        <ol className="events">{timeline.events.map((entry)=><li key={entry.id}><span className={`event-icon ${entry.kind}`}>{entry.kind.slice(0,1).toUpperCase()}</span><article><div><time>{entry.date}</time><span>{entry.kind}</span>{!entry.verified&&<mark>UNVERIFIED DEMO</mark>}</div><p>{entry.summary}</p><a href={entry.source_url} target="_blank" rel="noreferrer">{entry.source_label} ↗</a></article></li>)}</ol>
        <form className="evidence" onSubmit={addEvidence}><div className="section-head"><div><p className="eyebrow">03 · SIMULATE CONTRIBUTING</p><h3>Add public-record evidence</h3></div><span className="demo-tag">HUMAN REVIEW</span></div>
          <div className="form-grid"><div><label htmlFor="kind">Event type</label><select id="kind" value={kind} onChange={(e)=>setKind(e.target.value as EventKind)}><option value="meeting">Meeting</option><option value="vote">Vote</option><option value="filing">Filing</option><option value="delay">Delay</option></select></div><div><label htmlFor="source">Source URL</label><input id="source" value={sourceUrl} onChange={(e)=>setSourceUrl(e.target.value)} placeholder="https://city.example/agenda"/></div></div>
          <label htmlFor="summary">What changed?</label><textarea id="summary" value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Describe the decision, delay, or filing…"/>{error&&<p className="error" role="alert">{error}</p>}<button className="primary" type="submit">Add unverified demo evidence <span>→</span></button>
        </form>{notice&&<div className="toast" role="status">{notice}</div>}
      </div>
    </section>
    <footer><div><b>CivicThread</b><span>Issue continuity for local civic watchers</span></div><p>Fictional city + records · Simulated alerts · Python API not publicly hosted</p></footer>
  </main>;
}
