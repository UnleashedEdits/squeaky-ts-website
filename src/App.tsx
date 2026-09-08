import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, Gauge, MapPin, Menu, Phone, ShieldCheck, Sparkles, X } from "lucide-react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import * as Accordion from "@radix-ui/react-accordion";
import { business, surfaces, type SurfaceKey } from "./data/business";
import { BarChart } from "./components/charts/bar-chart";
import { Bar } from "./components/charts/bar";
import { Grid } from "./components/charts/grid";
import { BarXAxis } from "./components/charts/bar-x-axis";
import { ChartTooltip } from "./components/charts/tooltip/chart-tooltip";
import { chartCssVars } from "./components/charts/chart-context";
import { BackgroundPathLines } from "./components/kokonutui/background-paths";

const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;

const services = [
  { key: "siding", to: "/house-washing", n: "01", title: "House & soft washing", image: media("work-house-wash.jpg"), copy: "Lower-pressure exterior cleaning shaped around siding, trim, fixtures, and landscaping.", detail: "Best for siding, soffits, trim, and exterior walls that need a careful reset." },
  { key: "concrete", to: "/driveway-concrete", n: "02", title: "Driveways & concrete", image: media("work-driveway-wide.jpg"), copy: "Even passes across hard flatwork, with edges, drainage, and nearby surfaces checked first.", detail: "Best for driveways, sidewalks, curbs, brick, and concrete gathering areas." },
  { key: "wood", to: "/decks-patios", n: "03", title: "Decks & patios", image: media("work-deck.jpg"), copy: "A material-first plan for wood, composite, concrete, pavers, and outdoor living areas.", detail: "Best for refreshing outdoor spaces without treating every material the same." },
  { key: "fence", to: "/fences", n: "04", title: "Fence cleaning", image: media("work-house-finish.jpg"), copy: "A cleaning method matched to vinyl, painted, or wood fence finishes and conditions.", detail: "Best for brightening fence panels while accounting for gates, beds, and property edges." },
  { key: "commercial", to: "/commercial", n: "05", title: "Commercial exteriors", image: media("work-brick.jpg"), copy: "Scope-led cleaning for entries, walks, storefronts, and exterior property surfaces.", detail: "Best for customer-facing exteriors that need a plan built around access and foot traffic." },
] as const;

const reels = [
  { title: "THE FIRST PASS", image: media("work-driveway-pov.jpg") },
  { title: "EDGE WORK", image: media("work-deck.jpg") },
  { title: "THE CLEAN LINE", image: media("work-commercial-stairs.jpg") },
  { title: "FINAL RINSE", image: media("terez-working-steps.jpg") },
] as const;

const nav = [
  ["Home", "/"], ["Services", "/services"], ["Results", "/results"], ["Process", "/process"], ["About Terez", "/about"], ["Areas", "/service-areas"], ["FAQ", "/faq"],
];

function Brand() {
  return <Link className="brand" to="/" aria-label="Squeaky T’s home"><span className="brand-mark"><img src={media("instagram-profile.jpg")} alt=""/></span><span>SQUEAKY T’S</span></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="header-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label,to]) => <NavLink key={to} to={to}>{label}</NavLink>)}</nav><div className="header-actions"><a className="phone-link" href={business.phoneHref}><Phone size={17}/><span>{business.phoneDisplay}</span></a><Link className="button button-orange button-small" to="/free-estimate">Free estimate <ArrowRight size={17}/></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div></div><AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}>{nav.map(([label,to]) => <NavLink onClick={()=>setOpen(false)} key={to} to={to}>{label}</NavLink>)}<Link onClick={()=>setOpen(false)} to="/free-estimate">Get a free estimate</Link></motion.nav>}</AnimatePresence></header>;
}

function Footer() {
  return <footer><div className="footer-grid"><div><Brand/><p>Owner-led exterior cleaning across Charlotte and surrounding communities.</p><a href={business.instagram} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span> See recent work on Instagram</a></div><div><b>EXPLORE</b>{nav.slice(0,4).map(([l,t])=><Link key={t} to={t}>{l}</Link>)}</div><div><b>GET STARTED</b><a href={business.phoneHref}>{business.phoneDisplay}</a><Link to="/free-estimate">Free estimate</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Estimate terms</Link></div></div><div className="footer-bottom"><span>© 2026 Squeaky T’s Pressure Cleaning Service</span><span>Charlotte, North Carolina</span></div></footer>;
}

function SectionHead({kicker,title,body}:{kicker:string;title:string;body?:string}) {
  return <div className="section-head"><span className="kicker">{kicker}</span><h2>{title}</h2>{body&&<p>{body}</p>}</div>;
}

function Reveal({children,className=""}:{children:React.ReactNode;className?:string}) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.45,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}

function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.history.scrollRestoration="manual";window.scrollTo({top:0,left:0,behavior:"instant"})},[pathname]);return null}

function Hero() {
  return <section className="hero"><div className="hero-art"><img src={media("terez-equipment-candid.jpg")} alt="Terez preparing professional pressure-cleaning equipment"/><div className="hero-tint"/><BackgroundPathLines/></div><div className="hero-content"><motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.5}}><span className="eyebrow"><MapPin size={15}/> CHARLOTTE, NORTH CAROLINA</span><h1>Charlotte grime<br/><em>doesn’t get</em><br/>the last word.</h1><p>Owner-led pressure and soft washing for the surfaces that frame your home, business, and block.</p><div className="hero-buttons"><Link className="button button-orange" to="/free-estimate">Get a free estimate <ArrowRight/></Link><a className="button button-ghost" href={business.phoneHref}><Phone/> Talk with Terez</a></div></motion.div></div><div className="hero-note"><span>SERVICE AREA</span><b>CHARLOTTE + SURROUNDING COMMUNITIES</b></div></section>;
}

function TrustStrip() {
  return <div className="trust-strip"><span><ShieldCheck/> OWNER-LED</span><span><MapPin/> CHARLOTTE AREA</span><span><Sparkles/> FREE ESTIMATES</span><span><Phone/> DIRECT CALL</span></div>;
}

function SurfaceChooser() {
  const [active,setActive] = useState<SurfaceKey>("siding"); const s=surfaces[active];
  return <section className="section surface-section"><div className="shell"><SectionHead kicker="CHOOSE A SURFACE" title="Right force. Right finish." body="Tap what needs attention to see how the cleaning plan changes with the material."/><div className="surface-tabs" role="tablist" aria-label="Choose a surface type">{(Object.keys(surfaces) as SurfaceKey[]).map(k=><button role="tab" aria-selected={active===k} key={k} onClick={()=>setActive(k)}>{surfaces[k].label}</button>)}</div><AnimatePresence mode="wait"><motion.div className="surface-stage" key={active} initial={{opacity:0,clipPath:"inset(0 8% 0 8%)"}} animate={{opacity:1,clipPath:"inset(0 0 0 0)"}} exit={{opacity:0}} transition={{duration:.28,ease:[.22,1,.36,1]}}><div><span className="kicker">{s.eyebrow}</span><h3>{s.label}</h3><p>{s.method}</p><div className="protect"><ShieldCheck/><span><b>What gets considered</b>{s.protection}</span></div><Link className="text-link" to={`/free-estimate?surface=${active}`}>Add {s.label.toLowerCase()} to estimate <ArrowRight/></Link></div><div className={`surface-visual surface-${active}`}><img src={s.image} alt={s.imageAlt}/><span>{s.footage}</span></div></motion.div></AnimatePresence></div></section>;
}

function ServiceExplorer({intro=true}:{intro?:boolean}) { return <section className="section services-section"><div className="shell">{intro&&<SectionHead kicker="SERVICES" title="Expand a service. See what fits." body="Open any service for a quick overview, then visit the full page for more detail."/>}<Accordion.Root className="service-accordion" type="single" collapsible>{services.map((s,i)=><Accordion.Item className="service-expand" value={s.key} key={s.title}><Accordion.Header><Accordion.Trigger><span className="project-number">{s.n}</span><span className={`service-thumb thumb-${i}`}><img src={s.image} alt={`${s.title} service`}/></span><span className="service-summary"><span className="kicker">{surfaces[s.key].eyebrow}</span><strong>{s.title}</strong><span>{s.copy}</span></span><ChevronDown className="service-chevron"/></Accordion.Trigger></Accordion.Header><Accordion.Content><div className="service-detail"><p>{s.detail}</p><Link to={s.to}>View service page <ArrowRight/></Link><Link to={`/free-estimate?surface=${s.key}`}>Add to estimate <ArrowRight/></Link></div></Accordion.Content></Accordion.Item>)}</Accordion.Root></div></section> }

function ReelWall(){return <section className="reel-section"><div className="shell"><SectionHead kicker="FROM THE FIELD" title="The work, cut vertical." body="Concrete, decks, brick, and entries—one clean route, several surfaces."/><div className="reel-grid">{reels.map((item,i)=><div className="reel-card" key={item.title}><img src={item.image} alt="Recent Squeaky T’s pressure-cleaning work"/><span>0{i+1}</span><b>{item.title}</b></div>)}</div></div></section>}

function Process(){return <section className="section process-section"><div className="shell"><SectionHead kicker="HOW IT WORKS" title="Four steps. One clean route."/><div className="process-grid">{[["01","SEND THE SCOPE","Share the location and surfaces that need cleaning."],["02","WALK THE PROPERTY","Review access, materials, edges, and risks with Terez."],["03","CONFIRM THE PLAN","Approve the scope, timing, and estimate before work begins."],["04","RINSE & REVIEW","Take a final look at the finished surfaces."]].map(x=><div key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></div></section>}

const faqs=[["How do you choose between pressure washing and soft washing?","Durable hard surfaces can take more force, while siding usually needs a gentler application and rinse. The material and its condition determine the final method."],["Can I get a free estimate?","Yes. Share the location, surfaces, approximate size, and access notes so Terez can review the scope."],["Do you serve outside Charlotte?","Add the property ZIP to the estimate request. Terez will confirm whether it falls on the Charlotte-area route."],["Will I get an instant price online?","No. The online planner builds a concise project scope. Method, access, and project details are reviewed before a quote is provided."],["Should I move furniture or vehicles?","Mention movable items and access constraints in the request. Project-specific preparation guidance is provided before work begins."]];
function Faqs(){return <section className="section faq-section"><div className="shell faq-layout"><SectionHead kicker="GOOD QUESTIONS" title="Before the water turns on."/><Accordion.Root type="single" collapsible>{faqs.map(([q,a],i)=><Accordion.Item key={q} value={`q${i}`}><Accordion.Header><Accordion.Trigger>{q}<ChevronDown/></Accordion.Trigger></Accordion.Header><Accordion.Content>{a}</Accordion.Content></Accordion.Item>)}</Accordion.Root></div></section>}

function Owner(){return <section className="owner-section"><div className="shell owner-grid"><div className="owner-poster"><img src={media("terez-owner-portrait.jpg")} alt="Terez S., owner and operator of Squeaky T’s"/><div className="owner-caption"><span>TEREZ S.</span><small>OWNER / OPERATOR</small></div></div><Reveal><span className="kicker">MEET TEREZ</span><h2>The person on the page is behind the work.</h2><p>Work directly with Terez for residential and commercial exterior cleaning around Charlotte.</p><p>Each request becomes a clear project scope, ready for a surface-specific plan.</p><Link className="button button-dark" to="/about">Meet Terez <ArrowRight/></Link></Reveal></div></section>}

function FinalCta(){return <section className="final-cta"><div className="particles" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i}/>)}</div><div className="shell"><span className="kicker">READY FOR A RESET?</span><h2>Put the property<br/>on the clean route.</h2><div><Link className="button button-dark" to="/free-estimate">Get a free estimate <ArrowRight/></Link><a className="button button-light" href={business.phoneHref}><Phone/> Talk with Terez</a></div></div></section>}

function Home(){return <><Hero/><TrustStrip/><SurfaceChooser/><ServiceExplorer/><ReelWall/><Process/><Owner/><Faqs/><FinalCta/></>}

const pageData:Record<string,{kicker:string;title:string;intro:string;points:string[]}>= {
  "/house-washing":{kicker:"HOUSE / SOFT WASHING",title:"Curb appeal without the one-setting approach.",intro:"Exterior siding calls for a gentler plan than driveway concrete.",points:["Siding, trim, windows, and fixtures are reviewed","Landscaping and runoff paths shape the plan","Method, access, and estimate are confirmed before work"]},
  "/driveway-concrete":{kicker:"DRIVEWAY & CONCRETE",title:"An even pass from curb to garage.",intro:"Driveways, walks, brick, and pavers are assessed for material condition and delicate edges.",points:["Access and drainage are mapped","The process is matched to the surface","The finish gets a final review"]},
  "/decks-patios":{kicker:"DECKS & PATIOS",title:"Reset the outdoor space.",intro:"Wood, composite, concrete, and pavers each need a different touch.",points:["Boards, coatings, joints, and furniture are checked","The method follows material condition","Outlets, doors, and planting stay part of the plan"]},
  "/fences":{kicker:"FENCE CLEANING",title:"Bright panels. Careful edges.",intro:"The cleaning plan is matched to vinyl, paint, wood, hardware, and nearby beds.",points:["Material and finish are confirmed","Gates, planting, and property lines are considered","Each panel gets an even, controlled pass"]},
  "/commercial":{kicker:"COMMERCIAL CLEANING",title:"Make the entry feel open before the door is.",intro:"Scope-led exterior cleaning for commercial properties around Charlotte.",points:["Traffic and access constraints are reviewed","Surfaces and safe work zones are agreed","Schedule and scope are confirmed directly with Terez"]},
  "/auto-cleaning":{kicker:"VEHICLE CLEANING",title:"Ask about vehicle-cleaning availability.",intro:"Share the vehicle type and condition to confirm fit and availability.",points:["Share vehicle type and count","Describe exterior condition","Keep vehicle work separate from a property estimate when useful"]},
  "/results":{kicker:"RESULTS",title:"The clean line tells the story.",intro:"Explore recent surface work and find a result that matches the project at hand.",points:["Compare similar completed work","See the method matched to each material","Open Instagram for recent Charlotte-area projects"]},
  "/process":{kicker:"PROCESS",title:"Know the route before the rinse.",intro:"A rough idea becomes a clear project scope in four straightforward steps.",points:["Send the scope","Walk the surfaces","Confirm the method and estimate","Review the finished clean"]},
  "/about":{kicker:"ABOUT TEREZ",title:"Know who is behind the work.",intro:"Work directly with Terez for residential and commercial exterior cleaning around Charlotte.",points:["Direct communication with Terez","A surface-specific cleaning plan","Call or start a free estimate online"]},
  "/service-areas":{kicker:"SERVICE AREAS",title:"Charlotte is home base. A ZIP confirms the route.",intro:"Service is available throughout Charlotte and nearby communities.",points:["Charlotte, North Carolina","Surrounding communities confirmed by ZIP","Route confirmation before scheduling"]},
  "/reviews":{kicker:"RECENT WORK",title:"See the work before choosing a clean.",intro:"Browse field images and the Instagram project feed for recent results.",points:["Recent surface work","Several material types","Projects similar to the one at hand"]},
  "/faq":{kicker:"FAQ",title:"Answers before the estimate.",intro:"The details that help decide what to send and what happens next.",points:faqs.slice(0,4).map(x=>x[0])},
  "/privacy":{kicker:"PRIVACY",title:"Keep project details under control.",intro:"The estimate planner prepares a summary in the browser. Nothing is sent until the customer chooses to call or copy it.",points:["Share only details needed for the project","Keep sensitive information out of notes","Choose when to call or copy the summary"]},
  "/terms":{kicker:"ESTIMATE TERMS",title:"Know what an estimate confirms.",intro:"An online scope does not confirm price, timing, availability, or a completed booking.",points:["Scope and availability are confirmed directly","Material condition may change the recommended method","The final plan is approved before work begins"]},
};

function StandardPage({data}:{data:{kicker:string;title:string;intro:string;points:string[]}}){return <><section className="page-hero"><div className="shell"><span className="kicker">{data.kicker}</span><h1>{data.title}</h1><p>{data.intro}</p><Link className="button button-orange" to="/free-estimate">Get a free estimate <ArrowRight/></Link></div></section><section className="section"><div className="shell page-points">{data.points.map((p,i)=><Reveal key={p}><span>0{i+1}</span><p>{p}</p></Reveal>)}</div></section><FinalCta/></>}

function ServicesPage(){return <><section className="page-hero services-hero"><div className="shell"><span className="kicker">SERVICES</span><h1>A better clean starts with the surface.</h1><p>Expand each option, compare the surfaces, and open a full page for more detail.</p><Link className="button button-orange" to="/free-estimate">Get a free estimate <ArrowRight/></Link></div></section><ServiceExplorer intro={false}/><FinalCta/></>}

function ScopeBars({sizes}:{sizes:Record<SurfaceKey,number>}){const data=(Object.keys(sizes) as SurfaceKey[]).filter(k=>sizes[k]>0).map(k=>({surface:surfaces[k].label,area:sizes[k]}));return <div className="scope-chart" aria-label="Selected surface areas chart"><b>ENTERED SCOPE · SQ FT</b><BarChart data={data} xDataKey="surface" aspectRatio="2 / 1" margin={{top:18,right:18,bottom:34,left:18}} revealSignature={JSON.stringify(data)}><Grid horizontal/><Bar dataKey="area" fill={chartCssVars.linePrimary} lineCap={4}/><BarXAxis showAllLabels/><ChartTooltip/></BarChart></div>}

function Estimate(){const initial={siding:0,concrete:0,wood:0,fence:0,pavers:0,commercial:0};const [sizes,setSizes]=useState<Record<SurfaceKey,number>>(initial);const [summary,setSummary]=useState("");const selected=useMemo(()=>Object.entries(sizes).filter(([,v])=>v>0),[sizes]);function build(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const d=new FormData(e.currentTarget);setSummary(`Hi Terez, I’m ${d.get("name") || "in the Charlotte area"}. I’d like a free estimate for ${selected.map(([k,v])=>`${surfaces[k as SurfaceKey].label} (about ${v} sq ft)`).join(", ") || "surfaces I’d like to confirm with you"}. My property is ${d.get("property")}. My ZIP/city is ${d.get("location")}. My access or timing notes: ${d.get("notes") || "none"}. You can reach me at ${d.get("contact")}.`)}return <section className="estimate-page"><div className="shell estimate-grid"><div><span className="kicker">FREE ESTIMATE</span><h1>Build the scope.<br/>Confirm the plan.</h1><p>Prepare a clear request, then review the method, timing, and estimate directly with Terez.</p><div className="estimate-art"><Gauge/><span>THE SURFACE SETS<br/>THE CLEANING METHOD.</span></div></div><form onSubmit={build}><div className="field-row"><label>Name<input name="name" required/></label><label>Phone or email<input name="contact" required/></label></div><div className="field-row"><label>ZIP / city<input name="location" required/></label><label>Property<select name="property"><option>Residential</option><option>Commercial</option></select></label></div><fieldset><legend>Approximate surface area</legend><p>Enter what is known. Leave the rest at zero.</p>{(Object.keys(sizes) as SurfaceKey[]).map(k=><label className="size-field" key={k}><span>{surfaces[k].label}</span><input aria-label={`${surfaces[k].label} square feet`} type="number" min="0" step="50" value={sizes[k]} onChange={e=>setSizes({...sizes,[k]:Math.max(0,Number(e.target.value))})}/><small>sq ft</small></label>)}</fieldset>{selected.length>0&&<ScopeBars sizes={sizes}/>}<label>Access, preferred timing, or useful notes<textarea name="notes" rows={4}/></label><button className="button button-orange" type="submit">Prepare request <ArrowRight/></button>{summary&&<div className="summary" aria-live="polite"><b>COPY-READY MESSAGE</b><p>{summary}</p><button type="button" onClick={()=>navigator.clipboard?.writeText(summary)}><Check/> Copy request</button><a href={business.phoneHref}><Phone/> Talk with Terez</a></div>}</form></div></section>}

function NotFound(){return <section className="page-hero not-found"><div className="shell"><span className="kicker">404 / OFF ROUTE</span><h1>This page got rinsed away.</h1><p>Head home or start a free estimate.</p><Link className="button button-orange" to="/">Back home <ArrowRight/></Link></div></section>}

function RoutedPage(){const loc=useLocation();const d=pageData[loc.pathname];return d?<StandardPage data={d}/>:<NotFound/>}

export default function App(){const location=useLocation();return <div className="app"><ScrollToTop/><Header/><main><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.18}}><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/services" element={<ServicesPage/>}/><Route path="/free-estimate" element={<Estimate/>}/><Route path="*" element={<RoutedPage/>}/></Routes></motion.div></AnimatePresence></main><Footer/><div className="mobile-sticky"><a href={business.phoneHref}><Phone/> Talk with Terez</a><Link to="/free-estimate">Free estimate <ArrowRight/></Link></div></div>}
