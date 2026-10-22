/* The Lantern Lineup — original character data and deterministic rules. */
(function(root){
'use strict';
const names=['Alba','Bram','Cleo','Dara','Emil','Fern','Gio','Hana','Ivo','Juno','Kit','Lumi','Milo','Nell','Oren','Pia','Quinn','Remy','Sage','Tavi','Uma','Vale','Wren','Zuri'];
const hairs=['ink','copper','gold','silver'];
const people=names.map((name,id)=>Object.freeze({id,name,hair:hairs[id%4],hat:!!(id&1),glasses:!!(id&2),scarf:!!(id&4),earrings:!!(id&8),freckles:!!(id&16),style:Math.floor(id/4)%3,skin:['#efbf9b','#bb7959','#8f563e','#f3cfaa','#d79a71','#a4664b'][id%6]}));
const questions=[...hairs.map(h=>({id:'hair-'+h,label:`Do they have ${h==='ink'?'dark':h} hair?`,short:`${h==='ink'?'Dark':h[0].toUpperCase()+h.slice(1)} hair`,test:p=>p.hair===h})),...['hat','glasses','scarf','earrings','freckles'].map(k=>({id:k,label:`${k==='freckles'?'Do they have freckles':`Are they wearing ${k==='hat'?'a hat':k==='scarf'?'a scarf':k}`}?`,short:{hat:'Hat',glasses:'Glasses',scarf:'Scarf',earrings:'Earrings',freckles:'Freckles'}[k],test:p=>p[k]}))];
const ids=()=>people.map(p=>p.id);
function narrow(candidates,qid,answer){const q=questions.find(q=>q.id===qid);if(!q||typeof answer!=='boolean')throw Error('Invalid answer');return candidates.filter(id=>q.test(people[id])===answer);}
// Deliberately no match, secret, opponent identity, or player board input.
function chooseAction({candidates,asked}){if(!candidates.length)throw Error('No candidates');if(candidates.length===1)return {type:'guess',id:candidates[0]};let best=null,score=Infinity;for(const q of questions){if(asked.includes(q.id))continue;const yes=narrow(candidates,q.id,true).length;const s=Math.abs(candidates.length-2*yes);if(yes>0&&yes<candidates.length&&s<score){score=s;best=q.id;}}return best?{type:'ask',qid:best}:{type:'guess',id:candidates[0]};}
function createMatch(secret,{random=Math.random,computerStarts=false}={}){
if(!Number.isInteger(secret)||!people[secret])throw Error('Choose a character');
const sample=random();if(!(sample>=0&&sample<1))throw Error('Invalid random source');const rival=Math.floor(sample*people.length);
let phase=computerStarts?'computer':'player',winner=null,reason='',asked=[],evidence=[],candidates=ids(),computerAsked=[],history=[],turn=1;
function view(){return {phase,winner,reason,turn,secret,asked:[...asked],evidence:evidence.map(x=>({...x})),computerCount:candidates.length,history:history.map(x=>({...x})),...(phase==='over'?{rival}: {})};}
function ask(qid){if(phase!=='player'||asked.includes(qid))return false;const q=questions.find(q=>q.id===qid);if(!q)return false;const answer=q.test(people[rival]);asked.push(qid);evidence.push({qid,answer});history.unshift({who:'You',text:q.label,answer});phase='computer';return true;}
function guess(id){if(phase!=='player'||!Number.isInteger(id)||!people[id])return false;winner=id===rival?'player':'computer';reason=id===rival?'You found the secret neighbor.':'Your final guess was incorrect.';history.unshift({who:'You',text:`Is it ${people[id].name}?`,answer:id===rival});phase='over';return true;}
function computerTurn(){if(phase!=='computer')return false;const a=chooseAction({candidates:[...candidates],asked:[...computerAsked]});if(a.type==='guess'){const correct=a.id===secret;winner=correct?'computer':'player';reason=correct?'The Archivist found your secret neighbor.':'The Archivist made an incorrect final guess.';history.unshift({who:'Archivist',text:`Is it ${people[a.id].name}?`,answer:correct});phase='over';}else{const q=questions.find(q=>q.id===a.qid),answer=q.test(people[secret]);computerAsked.push(a.qid);candidates=narrow(candidates,a.qid,answer);history.unshift({who:'Archivist',text:q.label,answer});phase='player';turn++;}return true;}
return Object.freeze({view,ask,guess,computerTurn});
}
const api={people,questions,ids,narrow,chooseAction,createMatch};Object.freeze(api);if(typeof module!=='undefined')module.exports=api;else root.Lantern=api;
})(typeof window==='undefined'?globalThis:window);
