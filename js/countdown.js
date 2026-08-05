const target=new Date('2026-09-07T06:00:00');
function tick(){
const now=new Date();
const d=target-now;
if(d<0){document.getElementById('countdown').textContent='Welcome!';return;}
const days=Math.floor(d/86400000);
const hrs=Math.floor(d%86400000/3600000);
const mins=Math.floor(d%3600000/60000);
const secs=Math.floor(d%60000/1000);
document.getElementById('countdown').textContent=`${days} Days ${hrs} Hours ${mins} Minutes ${secs} Seconds`;
}
setInterval(tick,1000);tick();
