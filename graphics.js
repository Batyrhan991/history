/* Museum Deluxe graphics layer — original hand-drawn pixel geometry, no external game engine. */
'use strict';
const G={
  shadow:'#141b29', ink:'#27343c', gold:'#f5d990', brass:'#bb873e', bright:'#fff0ba',
  walls:{hall:['#31475a','#203445','#d5b16a'],khanate:['#634332','#392c30','#e2b86b'],alash:['#384d40','#27372f','#d1ad74'],zheltoksan:['#304a68','#1b304f','#a2c7d5'],final:['#246579','#123f57','#ffdd83']},
  flooring:{hall:['#9e744d','#b58c5f','#c89d68'],khanate:['#90613b','#ad7951','#c48e59'],alash:['#765d46','#92755a','#b99a74'],zheltoksan:['#436077','#53798e','#7394a6'],final:['#3e7a89','#569ba3','#80b5b2']}
};
const ROOM_LORE={
  khanate:{badge:{ru:'♛ XV–XVI ВЕКА',kk:'♛ XV–XVI ҒАСЫР'},title:{ru:'Зал «Қазақ хандығы»',kk:'«Қазақ хандығы» залы'},p1:{ru:'Ты входишь в зал, посвящённый рождению Казахского ханства. Здесь собраны символы власти, первые правители и законы, которые укрепили единство степи.',kk:'Сен Қазақ хандығының қалыптасуына арналған залға кірдің. Мұнда билік белгілері, алғашқы хандар мен бірлікті нығайтқан заңдар көрсетілген.'},p2:{ru:'Осмотри витрины, чтобы узнать, как Керей и Жанибек заложили основы государственности, а затем ответь на вопросы гида.',kk:'Керей мен Жәнібек қалаған мемлекеттіліктің негізін білу үшін витриналарды зерттеп, кейін гидтің сұрақтарына жауап бер.'},tip:{ru:'В этом зале тебя сопровождает Асан Қайғы.',kk:'Бұл залда сені Асан Қайғы қарсы алады.'}},
  alash:{badge:{ru:'✒ НАЧАЛО XX ВЕКА',kk:'✒ ХХ ҒАСЫР БАСЫ'},title:{ru:'Зал «Алаш»',kk:'«Алаш» залы'},p1:{ru:'Этот зал переносит тебя в эпоху пробуждения национальной мысли. Здесь хранятся образы лидеров движения «Алаш», статьи, документы и идеи о будущем страны.',kk:'Бұл зал сені ұлттық ой-сана оянған кезеңге алып барады. Мұнда Алаш қозғалысы көшбасшыларының бейнелері, мақалалар, құжаттар мен ел болашағы туралы идеялар берілген.'},p2:{ru:'Изучи материалы витрин и послушай вопросы Әлихана Бөкейханова, чтобы глубже понять смысл движения.',kk:'Қозғалыстың маңызын терең түсіну үшін витрина материалдарын зерттеп, Әлихан Бөкейхановтың сұрақтарына жауап бер.'},tip:{ru:'В этом зале важно обращать внимание на документы и идеи.',kk:'Бұл залда құжаттар мен идеяларға мұқият қара.'}},
  zheltoksan:{badge:{ru:'❄ 1986 · АЛМАТЫ',kk:'❄ 1986 · АЛМАТЫ'},title:{ru:'Зал «Желтоксан — путь к независимости»',kk:'«Желтоқсан – тәуелсіздікке бастар жол» залы'},p1:{ru:'Перед тобой эмоциональный зал, посвящённый декабрьским событиям 1986 года. Здесь атмосфера зимнего Алматы, архивные материалы и память о молодёжи, заявившей о своём праве на голос.',kk:'Алдыңда 1986 жылғы Желтоқсан оқиғасына арналған әсерлі зал. Мұнда қысқы Алматының атмосферасы, архив деректері және өз үнін білдірген жастар туралы естелік бар.'},p2:{ru:'Подойди к витринам, чтобы увидеть ключевые эпизоды, а затем ответь на вопросы исторического гида.',kk:'Негізгі оқиғаларды көру үшін витриналарға жақындап, кейін тарихи гидтің сұрақтарына жауап бер.'},tip:{ru:'Здесь особенно важно внимательно читать описание экспоната.',kk:'Бұл залда жәдігер сипаттамаларын мұқият оқу маңызды.'}}
};
const EXHIBIT_CAPTIONS={
  khanate:[{ru:'Карта и символ основания ханства',kk:'Хандық құрылуының картасы мен белгісі'},{ru:'Два правителя — Керей и Жәнібек',kk:'Екі билеуші — Керей мен Жәнібек'},{ru:'Свод законов Касым-хана',kk:'Қасым хан заңдарының жинағы'}],
  alash:[{ru:'Портрет и документ лидера движения',kk:'Қозғалыс жетекшісінің портреті мен құжаты'},{ru:'Книга и перо как символ идей Алаша',kk:'Алаш идеясының белгісі — кітап пен қауырсын'},{ru:'Газетный лист Алаш-Орды',kk:'Алашорда газет парағы'}],
  zheltoksan:[{ru:'Календарь декабрьских событий',kk:'Желтоқсан оқиғаларының күнтізбесі'},{ru:'Молодёжь и плакат протеста',kk:'Жастар мен наразылық плакаты'},{ru:'Символ пути к независимости',kk:'Тәуелсіздікке апарар жолдың белгісі'}]
};
function npcName(room){return room==='khanate'?'Асан Қайғы':room==='alash'?'Әлихан Бөкейханов':room==='zheltoksan'?(state.lang==='ru'?'Исторический гид':'Тарихи гид'):(state.lang==='ru'?'Виртуальный гид':'Виртуалды гид')}
function npcPortraitPath(room){return room==='khanate'?'portraits/asan.png':room==='alash'?'portraits/alikhan.png':room==='zheltoksan'?'portraits/historian.png':'portraits/guide.png'}
function exhibitImagePath(id,i){return `exhibits/${id}_${i}.png`}

function px(x,y,w,h,c){rect(Math.round(x),Math.round(y),w,h,c)}
function linePx(x,y,x2,y2,c,w=2){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(Math.round(x),Math.round(y));ctx.lineTo(Math.round(x2),Math.round(y2));ctx.stroke()}
function diamond(x,y,r,c){ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x,y-r);ctx.lineTo(x+r,y);ctx.lineTo(x,y+r);ctx.lineTo(x-r,y);ctx.closePath();ctx.fill()}
function spriteTile(x,y,color,outline='#4c3b35'){px(x,y,32,30,outline);px(x+2,y+2,28,26,color);px(x+4,y+4,13,2,'#fff2');px(x+20,y+22,9,2,'#0018')}
const oldCarpet=carpet;carpet=function(x,y,w,h,c='#214e66'){
  px(x+10,y+12,w,h,'#070e1777');px(x-4,y-4,w+8,h+8,'#71402c');px(x,y,w,h,'#e8ba65');px(x+6,y+6,w-12,h-12,'#6a3e38');px(x+13,y+13,w-26,h-26,c);
  px(x+24,y+24,w-48,h-48,'#ffffff13');ctx.strokeStyle='#e5b463';ctx.lineWidth=3;ctx.strokeRect(x+22,y+22,w-44,h-44);
  for(let i=x+21;i<x+w-20;i+=24){diamond(i,y+9,4,'#fcdb88');diamond(i,y+h-9,4,'#fcdb88')}
  for(let i=y+22;i<y+h-20;i+=24){diamond(x+9,i,4,'#fcdb88');diamond(x+w-9,i,4,'#fcdb88')}
  let cy=y+h/2,cx=x+w/2;diamond(cx,cy,45,'#d2ab62');diamond(cx,cy,31,c);diamond(cx,cy,17,'#e4c080');diamond(cx,cy,9,c);
  for(let yy=y+53;yy<y+h-52;yy+=54){diamond(x+48,yy,8,'#d6b46c');diamond(x+w-48,yy,8,'#d6b46c')}
};
const oldColumn=column;column=function(x,y){
 ellipse(x+8,y+54,39,13,'#060f1888');px(x-30,y+38,60,13,'#6a543d');px(x-32,y+41,64,8,'#c99e5d');px(x-25,y-38,50,81,'#9b7850');px(x-19,y-35,38,75,'#e5c99b');
 for(let i=0;i<4;i++){px(x-15+i*10,y-30,4,65,i%2?'#f6dcaa':'#d5b180');px(x-12+i*10,y-30,2,65,'#fff4c8')}
 px(x-30,y-46,60,13,'#8d6946');px(x-25,y-50,50,11,'#eed0a0');px(x-22,y-55,44,7,'#b99251');diamond(x,y-56,5,'#f6da98')
};
const oldPlant=plant;plant=function(x,y){
 ellipse(x+5,y+18,25,9,'#0008');px(x-15,y+1,30,17,'#6d3d2e');px(x-19,y-1,38,7,'#ba7750');px(x-11,y+8,22,3,'#cc8d62');
 for(let i=0;i<10;i++){let a=i*2.399,t=Math.sin(a);px(x-4+Math.round(t*17),y-23+Math.round(Math.cos(a)*17),9,19,['#2e6d4f','#3d8f5b','#63aa66','#265c50'][i%4]);px(x+Math.round(t*15),y-23+Math.round(Math.cos(a)*17),3,9,'#c8ce7188')}
 px(x-4,y-36,8,13,'#367853');px(x-2,y-31,3,5,'#8bc877')
};
function trophy(x,y){ellipse(x,y+24,32,8,'#0007');px(x-17,y+8,34,14,'#a37b42');px(x-13,y+4,26,10,'#ffce67');px(x-6,y-20,12,24,'#d6a34c');px(x-21,y-45,42,29,'#f4cb68');px(x-16,y-40,32,16,'#fff0ae');px(x-26,y-43,7,21,'#d4a655');px(x+19,y-43,7,21,'#d4a655');diamond(x,y-32,9,'#bd8347')}
function blueVase(x,y){ellipse(x,y+25,24,7,'#0007');px(x-18,y-13,36,32,'#245c6b');px(x-23,y-21,46,11,'#54acb0');px(x-13,y-26,26,8,'#357f98');px(x-10,y-7,20,14,'#80c9c2');diamond(x,y+3,6,'#e8c879');px(x-6,y+20,12,4,'#94c6bd')}
function bust(x,y){ellipse(x,y+36,34,11,'#0007');px(x-30,y+12,60,23,'#756c65');px(x-24,y+7,48,8,'#d8be8d');px(x-6,y-10,12,19,'#d7c5aa');px(x-15,y-38,30,30,'#d6bea3');px(x-12,y-43,24,10,'#e2cbb2');px(x-21,y-12,42,18,'#baa991');px(x-11,y-30,3,3,'#675b55');px(x+7,y-30,3,3,'#675b55')}
function chest(x,y){ellipse(x,y+26,50,8,'#0006');px(x-43,y-21,86,48,'#52352b');px(x-37,y-16,74,36,'#956038');px(x-40,y-25,80,12,'#c69051');px(x-39,y+1,78,5,'#d9ab66');px(x-28,y-16,5,40,'#c99f60');px(x+23,y-16,5,40,'#c99f60');px(x-6,y+2,12,15,'#f9dc86');px(x-2,y+8,4,7,'#63472d')}
function chandelier(x,y){
 ellipse(x,y+17,48,17,'#eac16c13');px(x-4,y-60,8,35,'#cca967');px(x-41,y-27,82,7,'#b88b49');px(x-49,y-24,12,21,'#c59344');px(x+37,y-24,12,21,'#c59344');px(x-7,y-31,14,19,'#f5ce7e');
 for(let dx of [-42,-22,0,22,42]){px(x+dx-4,y-27,8,12,'#e4b96a');px(x+dx-7,y-39,14,15,'#ffe7a2');ellipse(x+dx,y-31,20,22,'#f3c76b13')}diamond(x,y-12,8,'#ffefa1')
}
function windowArt(x,y,theme){
 px(x-55,y-53,110,114,'#563f37');px(x-49,y-47,98,102,'#e4ba6c');px(x-43,y-41,86,91,'#294a62');px(x-37,y-35,74,77,theme==='winter'?'#83b1c5':'#6689a4');
 if(theme==='winter'){px(x-31,y+5,62,25,'#d0dfe3');px(x-23,y-6,16,34,'#b7cbd2');px(x+12,y-14,13,44,'#d0e6e8');for(let k=0;k<10;k++){let sx=x-30+(k*23)%60,sy=y-30+(k*17)%45;px(sx,sy,3,3,'#e9f4fc')}}
 else{px(x-32,y+15,65,23,'#264c57');px(x-29,y+3,36,24,'#3c6d62');px(x+11,y-7,20,34,'#315d57');px(x-12,y-31,15,15,'#f5d68f')}
 px(x-3,y-44,6,94,'#d4ab6b');px(x-43,y-3,86,6,'#d4ab6b');px(x-58,y+52,116,8,'#ac7b48');px(x-53,y+55,106,3,'#e2bd7d')
}
function displayCabinet(x,y,kind='ceramic'){
 ellipse(x+6,y+47,75,15,'#0007');px(x-73,y+22,146,29,'#593b35');px(x-66,y+29,132,14,'#a0774b');px(x-71,y-38,142,69,'#3a5760');px(x-65,y-32,130,57,'#88b1b09c');px(x-65,y-32,130,9,'#f6e2b255');
 px(x-72,y-41,144,9,'#bd9658');px(x-69,y+18,138,10,'#d8b270');px(x-70,y-34,6,56,'#e9c77c');px(x+64,y-34,6,56,'#e9c77c');px(x-3,y-32,6,54,'#ecdfb36b');
 if(kind==='ceramic'){blueVase(x-32,y+1);blueVase(x+30,y+1)}else if(kind==='books'){for(let i=0;i<7;i++){px(x-46+i*14,y-11-(i%3)*6,10,23+(i%3)*6,['#965044','#c6aa78','#456f6b'][i%3]);px(x-45+i*14,y-2,8,2,'#eadc9a')}}else if(kind==='winter'){for(let dx of [-35,35]){px(x+dx-16,y-15,30,26,'#eee7d9');px(x+dx-12,y-12,22,20,'#5f7585');diamond(x+dx,y-1,7,'#c8dfde')}}else{for(let dx of [-32,30]){px(x+dx-17,y-15,34,27,'#d4b77d');diamond(x+dx,y-3,10,'#5c7e80')}}
}

function drawExhibitStand(x,y,room,index,finished){
 const kinds={khanate:['artifact','crowns','scroll'],alash:['portrait','bookquill','newspaper'],zheltoksan:['calendar','crowd','sunflag']};
 const kind=(kinds[room]||['artifact','artifact','artifact'])[index];
 displayCabinet(x,y+3,room==='alash'?'books':room==='zheltoksan'?'winter':'ceramic');
 px(x-58,y-36,116,8,'#f3dfb06a');
 if(kind==='artifact'){
   px(x-30,y-12,60,24,'#d8c39c');px(x-19,y-26,14,14,'#9f7148');px(x+2,y-30,14,18,'#9f7148');diamond(x+31,y-27,9,'#f4d97b');diamond(x-31,y-20,7,'#d9b96a');
 }else if(kind==='crowns'){
   for(let off of [-30,8]){px(x+off,y-13,28,15,'#d6a34a');px(x+off+5,y-19,5,7,'#ffeb9d');px(x+off+12,y-23,5,11,'#fff2bc');px(x+off+19,y-19,5,7,'#ffeb9d');px(x+off+3,y+2,22,4,'#8a5f2c')}
 }else if(kind==='scroll'){
   px(x-31,y-18,62,30,'#eddcb0');px(x-25,y-12,50,18,'#be9961');px(x-32,y-21,11,11,'#9c6f48');px(x+21,y+1,11,11,'#9c6f48');for(let yy of [-10,-4,2])px(x-15,y+yy,30,2,'#8e714a');
 }else if(kind==='portrait'){
   px(x-26,y-28,52,44,'#d9c69f');px(x-20,y-22,40,32,'#4f6473');px(x-7,y-17,14,11,'#deb184');px(x-10,y-3,20,11,'#5d443b');px(x-15,y+10,30,3,'#c69f63');
 }else if(kind==='bookquill'){
   px(x-31,y-19,24,31,'#9d6247');px(x-5,y-19,29,31,'#d8c39c');px(x+13,y-31,9,31,'#ece8dd');px(x+9,y-30,4,23,'#b4a38b');px(x-24,y-13,10,2,'#e5cf90');px(x+1,y-13,12,2,'#b89f6c');
 }else if(kind==='newspaper'){
   px(x-31,y-23,62,35,'#ebe7dd');for(let yy of [-17,-11,-5,1])px(x-23,y+yy,40,2,'#7a8386');px(x-22,y-20,16,9,'#c3c7c8');px(x+9,y-20,13,9,'#b8bcbd');
 }else if(kind==='calendar'){
   px(x-29,y-26,58,40,'#e2ecef');px(x-29,y-26,58,9,'#b1514d');px(x-17,y-36,8,15,'#667b8d');px(x+9,y-36,8,15,'#667b8d');px(x-8,y-6,16,15,'#6e8bab');for(let gx of [-16,-4,8])for(let gy of [-12,0])px(x+gx,y+gy,8,7,'#f5f9fb');
 }else if(kind==='crowd'){
   px(x-36,y-7,23,12,'#48a7ca');px(x-13,y-8,4,30,'#8b6a4a');for(let dx of [-6,8,22]){px(x+dx,y-8,6,14,'#e2b98c');px(x+dx-3,y+7,12,11,'#50667e')}px(x-25,y-9,10,3,'#f2dd8f');
 }else if(kind==='sunflag'){
   diamond(x,y-8,14,'#f0cc63');for(let a=0;a<8;a++)diamond(x+Math.cos(a*0.785)*21,y-8+Math.sin(a*0.785)*21,4,'#f0cc63');px(x-29,y+12,58,7,'#8a6844');px(x-18,y+4,36,4,'#d7b26f');
 }
 if(finished){ellipse(x,y-26,56,35,'#ffd56422');sparkleDot(x-32,y-28);sparkleDot(x+30,y-20)}
 else {ctx.fillStyle='#0b0f1660';ctx.fillRect(x-58,y-34,116,58)}
 museumLabel(x,y+84,102,finished?(state.lang==='ru'?'ИЗУЧЕНО':'ЗЕРТТЕЛДІ'):(state.lang==='ru'?'ЭКСПОНАТ':'ЖӘДІГЕР'))
}

function wallPlaque(x,y,s){px(x-51,y-32,102,62,'#684a30');px(x-46,y-27,92,52,'#dfba77');px(x-39,y-20,78,39,'#173a51');text(s,x,y+9,27,'#f5daa4')}
function ornateRug(x,y,w,h,c){carpet(x,y,w,h,c);for(let i=0;i<5;i++){let dx=x+43+i*(w-86)/4;diamond(dx,y+h/2,12,'#bf9653')}}
// Low-frequency, deterministic detail pattern; every room has a unique palette and architecture.
floor=function(room){
 const pal=G.flooring[room],wp=G.walls[room];px(0,0,ROOM_W,ROOM_H,pal[0]);
 for(let y=76;y<ROOM_H-35;y+=32){let row=Math.floor(y/32);for(let x=31;x<ROOM_W-29;x+=64){let off=row%2?32:0,xx=x+off,bit=((row*13+Math.floor(xx/64)*7)%11);px(xx,y,62,30,pal[bit<3?2:bit<7?1:0]);px(xx,y+29,62,2,'#372e2c48');px(xx+2,y+2,50,2,'#ffffff11');px(xx+9+(bit*3)%27,y+19,15,2,'#493c332c')}}
 px(0,0,ROOM_W,78,wp[1]);px(0,0,ROOM_W,12,'#102335');px(0,14,ROOM_W,37,wp[0]);
 for(let x=20;x<ROOM_W;x+=38){px(x,20,34,25,wp[1]);px(x+4,24,26,17,'#ffffff10');px(x+14,26,6,13,wp[2]);px(x+17,28,3,9,'#31445a')}
 px(0,48,ROOM_W,9,wp[2]);px(0,60,ROOM_W,11,'#73533d');px(0,71,ROOM_W,9,'#ecb971');
 px(0,0,34,ROOM_H,'#1b3445');px(ROOM_W-34,0,34,ROOM_H,'#1b3445');
 for(let y=77;y<ROOM_H;y+=32){for(let x of [0,ROOM_W-34]){px(x+3,y,28,30,wp[0]);px(x+6,y+3,22,24,'#ffffff12');px(x+13,y+10,8,10,wp[2])}}
 px(0,ROOM_H-32,ROOM_W,32,'#4f3932');px(0,ROOM_H-35,ROOM_W,6,wp[2]);for(let x=10;x<ROOM_W;x+=35)px(x,ROOM_H-19,21,8,'#bc8e5c');
 for(let x of [85,995]){px(x-5,79,10,30,'#8f623a');px(x-9,89,18,12,'#e9b977');px(x-20,104,40,8,'#e9c17e33')}
};

function spotlightCone(x,y,w=120,h=180,c='#ffe7a233'){
 const g=ctx.createLinearGradient(x,y,x,y+h);g.addColorStop(0,c);g.addColorStop(1,'#ffffff00');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-w/2,y+h);ctx.lineTo(x+w/2,y+h);ctx.closePath();ctx.fill();
}
function bench(x,y){ellipse(x,y+17,55,8,'#0007');px(x-42,y-7,84,12,'#6a4832');px(x-35,y-12,70,8,'#b58758');px(x-39,y-22,6,16,'#8c6547');px(x+33,y-22,6,16,'#8c6547');px(x-30,y-28,60,8,'#80553a');px(x-26,y-26,52,3,'#ddb579')}
function ropeBarrier(x,y,w=130){for(let dx of [-w/2,w/2]){px(x+dx-4,y-26,8,26,'#d5b067');px(x+dx-6,y-4,12,8,'#91663d');ellipse(x+dx,y+4,11,4,'#0006')}linePx(x-w/2,y-18,x+w/2,y-18,'#c44b4b',4);linePx(x-w/2,y-14,x+w/2,y-14,'#f0c67c',2)}
function wallFrame(x,y,w=64,h=54,icon='✦',bg='#23445b'){px(x-w/2-6,y-h/2-6,w+12,h+12,'#6b4c35');px(x-w/2-2,y-h/2-2,w+4,h+4,'#e2bd78');px(x-w/2,y-h/2,w,h,bg);text(icon,x,y+8,22,'#f6de9e')}
function museumLabel(x,y,w=98,text1='EXHIBIT'){px(x-w/2,y, w,22,'#563a2c');px(x-w/2+4,y+4,w-8,14,'#dcbf84');text(text1,x,y+15,9,'#53392b')}
function sparkleDot(x,y,c='#ffe9a5'){px(x,y,2,2,c);px(x-2,y+2,2,2,c);px(x+2,y+2,2,2,c)}

// Pixel doors can be independently animated on the overlay.
door=function(x,y,icon,active){
 ellipse(x,y+45,65,16,'#0007');px(x-63,y-60,126,112,'#513a35');px(x-60,y-64,120,18,'#d5a968');px(x-57,y-46,114,100,'#aa7d4a');px(x-50,y-41,100,86,'#314657');
 for(let side of [-1,1]){let a=side<0?x-45:x+2;px(a,y-35,43,77,active?'#73513d':'#4e4340');px(a+5,y-30,33,67,active?'#8b6746':'#59534c');px(a+9,y-25,25,24,'#38546a');px(a+9,y+7,25,22,'#3b5161');px(a+21,y+3,7,7,'#e8be69')}
 px(x-3,y-35,6,80,'#c9a36d');px(x-65,y+43,130,11,'#ba8b4f');px(x-59,y+47,118,4,'#f6d085');
 if(active){for(let dx of [-60,60]){px(x+dx-3,y-63,6,112,'#edc67466')}diamond(x,y-53,7,'#fff1ad')}
 text(active?icon:'♜',x,y-3,24,active?'#ffdfa0':'#a5a2a0')
};
renderHall=function(){
 ornateRug(340,168,400,470,'#205873');
 carpet(454,80,172,112,'#274c67');
 for(let x of [110,970])for(let y of [190,420,646])column(x,y);
 for(let x of [56,1024])for(let y of [124,330,536,684])plant(x,y);
 for(let x of [310,770])chandelier(x,117);
 for(let x of [225,540,855])wallFrame(x,122,72,52,'✦','#1f4257');
 windowArt(413,120);windowArt(667,120);
 bench(252,610);bench(828,610);ropeBarrier(540,608,170);
 for(let x of [154,926]){wallPlaque(x,109,'✦');for(let y of [286,552]){displayCabinet(x,y,'ceramic');px(x-45,y+59,90,5,'#d7b67f')}wallFrame(x,204,54,44,'☼','#35536a')}
 for(let x of [305,775]){blueVase(x,519);plant(x,655)}
 bust(280,364);bust(800,364);ropeBarrier(280,398,82);ropeBarrier(800,398,82);
 for(let d of doors){let active=d.id!=='final'||roomCount()===3;spotlightCone(d.x,118,140,150,active?'#ffe7a229':'#ffffff11');door(d.x,d.y,d.emoji,active);text(d.id==='final'?(state.lang==='ru'?'Финал':'Соңы'):data[d.id].title[ix()],d.x,d.y+75,d.id==='zheltoksan'?10:12,active?'#ffe2a5':'#b5b4bb')}
 px(471,353,138,7,'#e9d095');px(464,362,152,72,'#593f30');px(472,367,136,59,'#a1774a');px(483,375,114,42,'#224760');px(490,381,100,28,'#38788b');diamond(540,397,15,'#f2cd75');text('i',540,404,15,'#1b4960');
 drawCharacter(540,340,'receptionist',0,Math.sin(clock*2)*.2,3.0);
 museumLabel(540,446,120,state.lang==='ru'?'ИНФОРМАЦИЯ':'АҚПАРАТ');
 for(let x of [323,757]){trophy(x,238);spotlightCone(x,130,120,110,'#ffd76d22')}
 for(let i=0;i<14;i++)sparkleDot(110+i*67,92+((i*13)%7),'#ffffff18')
};
renderRoom=function(id){
 const final=id==='final',rug=id==='khanate'?'#844a3b':id==='alash'?'#396454':id==='zheltoksan'?'#2e6680':'#18768b';
 ornateRug(352,316,376,352,rug);
 for(let x of [105,975]){column(x,180);column(x,585)}
 for(let x of [60,1020])for(let y of [297,457,666])plant(x,y);
 for(let x of [320,760])chandelier(x,96);
 for(let x of [240,540,840])wallFrame(x,120,64,48,id==='khanate'?'♛':id==='alash'?'✒':id==='zheltoksan'?'❄':'☀',id==='zheltoksan'?'#315a77':'#23445b');
 bench(210,618);bench(870,618);
 if(id==='khanate'){
   for(let x of [360,720]){wallPlaque(x,126,'♛');blueVase(x,535)}
   throne(540,154);for(let x of [165,915]){banner(x,138,'♛');chest(x,515)}
   bust(300,177);bust(780,177);for(let x of [156,924])displayCabinet(x,368,'ceramic');ropeBarrier(540,248,210);
 }else if(id==='alash'){
   for(let x of [156,924]){bookshelf(x,142);displayCabinet(x,416,'books')}
   for(let x of [355,725])wallPlaque(x,132,'✒');desk(540,166);
   for(let x of [274,806]){px(x-51,556,102,47,'#563f30');px(x-45,550,90,43,'#a77849');for(let b=0;b<5;b++)px(x-36+b*16,550+(b%2)*5,12,30,['#c7a76a','#6f826f','#9b5747'][b%3]);}
   ropeBarrier(540,244,185);wallFrame(540,205,88,46,'АЛАШ','#345346');
 }else if(id==='zheltoksan'){
   for(let x of [165,915]){windowArt(x,151,'winter');displayCabinet(x,423,'winter')}
   for(let x of [369,710])wallPlaque(x,128,'❄');
   for(let x of [260,820]){px(x-45,536,90,43,'#304e66');px(x-39,540,78,35,'#60869a');px(x-30,544,60,25,'#b1cbd4');for(let i=0;i<5;i++)px(x-23+i*11,547+(i%2)*5,6,8,'#d9e7e9')}
   ropeBarrier(540,246,210);for(let i=0;i<18;i++){let xx=176+(i*49)%760,yy=88+(i*29)%84;px(xx,yy,3+(i%2),3+(i%2),'#d4ecf5aa')}
 }else{
   for(let x of [170,910]){windowArt(x,175);banner(x,401,'☀');trophy(x,560)}
   wallPlaque(315,145,'✦');wallPlaque(765,145,'✦');
   px(415,128,250,130,'#19a7c3');for(let i=0;i<11;i++){diamond(430+i*20,245,4,'#ebc65d');diamond(430+i*20,137,3,'#efd074')}
   ellipse(540,174,31,30,'#f2d175');for(let i=0;i<10;i++)diamond(540+Math.sin(i*Math.PI/5)*50,174+Math.cos(i*Math.PI/5)*47,4,'#f2d175');
   diamond(540,219,20,'#e4c36c');text(state.lang==='ru'?'НЕЗАВИСИМЫЙ КАЗАХСТАН':'ТӘУЕЛСІЗ ҚАЗАҚСТАН',540,306,20,'#ffe49d');
   trophy(540,418);chest(340,468);chest(740,468);ropeBarrier(540,470,250);
 }
 if(!final){
  for(let i=0;i<3;i++){
   let p=exhibitPos[i],e=data[id].ex[i],finished=isCorrect(id,i);
   spotlightCone(p.x,138,130,150,finished?'#ffd76d33':'#ffffff15');
   ctx.save();ctx.filter=finished?'none':'grayscale(1)';
   drawExhibitStand(p.x,p.y,id,i,finished);
   const glow=ctx.createRadialGradient(p.x,p.y-26,2,p.x,p.y-26,72);glow.addColorStop(0,finished?'#fbd67766':'#ffffff19');glow.addColorStop(1,'#ffffff00');ctx.fillStyle=glow;ctx.fillRect(p.x-76,p.y-92,152,130);
   ctx.restore();
   text(e.emoji,p.x,p.y-24,30,'#fff2bb');
   if(finished){ellipse(p.x,p.y-25,68+Math.sin(clock*2)*2,46,'#f5ca5f14');diamond(p.x+52,p.y-44,7,'#ffe093')}
  }
  spotlightCone(npcPos.x,270,140,120,'#ffffff12');
  drawCharacter(npcPos.x,npcPos.y,state.room==='khanate'?'asan':state.room==='alash'?'alikhan':'historian',0,Math.sin(clock*2)*.22,2.95);
  museumLabel(npcPos.x,npcPos.y+52,120,data[id].guide);
 }else{
  spotlightCone(540,290,150,140,'#ffe39922');
  drawCharacter(540,520,'guide',0,Math.sin(clock*2)*.15,3.05);
  museumLabel(540,571,130,state.lang==='ru'?'ВИРТУАЛЬНЫЙ ГИД':'ВИРТУАЛДЫ ГИД');
 }
 door(540,688,'↩',final||answeredCount(id)===3);text(L().exit,540,748,12,'#ffdda1');
};
// 16x25 original pixel-character, headwear / clothing variants, body shadows, directional face.
function drawCharacter(x,y,kind='player',dir=0,walk=0,scale=2.7){
 let sets={
  player:{coat:'#155f8d',mid:'#2ea4c1',trim:'#efd48a',boots:'#252d42',skin:'#e1a579',hair:'#302b2e',accent:'#8fd4ff'},
  asan:{coat:'#7a5738',mid:'#bb8d4e',trim:'#efe0b7',boots:'#41332f',skin:'#d8a983',hair:'#ddd7c3',accent:'#f7e7bf'},
  alikhan:{coat:'#434d56',mid:'#73828a',trim:'#cbb378',boots:'#1f2831',skin:'#dda878',hair:'#28292c',accent:'#d7d9de'},
  historian:{coat:'#295477',mid:'#478cb0',trim:'#d8c89d',boots:'#23374a',skin:'#dfab88',hair:'#2c333e',accent:'#b7dbef'},
  guide:{coat:'#1b7380',mid:'#5cb3b5',trim:'#f2cd80',boots:'#294355',skin:'#deb08c',hair:'#343131',accent:'#ccf0ef'},
  receptionist:{coat:'#8b5a40',mid:'#c79359',trim:'#f2da9d',boots:'#353b4b',skin:'#dfb28b',hair:'#45332d',accent:'#ffefc7'}
 }[kind]||{coat:'#215f7b',mid:'#4192a0',trim:'#ecd290',boots:'#23384b',skin:'#dcb08c',hair:'#342e2d',accent:'#b8e4e8'};
 const u=scale,bob=Math.sin(clock*2+walk)*0.8,armSwing=Math.round(Math.sin(walk)*2),legSwing=Math.round(Math.cos(walk)*2);
 function b(xx,yy,w,h,c){px(x+xx*u,y+(yy+bob)*u,w*u,h*u,c)}
 ellipse(x+2,y+23,22,7,'#0008');
 // cape / back shadow
 b(-9,-10,18,18,'#151f2cc0');
 // legs
 b(-7,6+legSwing,6,2,sets.boots); b(1,6-legSwing,6,2,sets.boots); b(-6,3,5,4,sets.boots); b(1,3,5,4,sets.boots);
 // coat body
 b(-8,-12,16,17,sets.coat); b(-6,-10,12,13,sets.mid); b(-2,-11,4,15,sets.trim); b(-7,1,14,2,'#b68f4a');
 // belt and buttons
 b(-6,0,12,2,'#6c4d2c'); b(-1,-6,2,2,sets.accent); b(-1,-2,2,2,sets.accent);
 // arms
 b(-11,-10,3,11,sets.coat); b(8,-10,3,11,sets.coat); b(-11,-1+armSwing,3,3,sets.skin); b(8,-1-armSwing,3,3,sets.skin);
 // neck and head
 b(-2,-15,4,3,sets.skin); b(-7,-25,14,6,sets.hair); b(-6,-22,12,13,sets.skin);
 // hair/headwear variations
 if(kind==='asan'){b(-8,-26,16,4,'#f0e1be');b(-6,-29,12,4,'#c6b48c');b(-5,-14,10,5,'#ebe1cd');b(-3,-9,6,3,'#dfd4c1')}
 else if(kind==='alikhan'){b(-7,-27,14,5,'#2c3033');b(-5,-29,10,3,'#383c40');b(-4,-14,8,2,'#5d4231')}
 else if(kind==='historian'){b(-7,-27,14,5,'#2e2f34');b(-5,-27,10,2,'#3d3e43');b(-7,-20,14,2,'#d8c79f')}
 else if(kind==='guide'){b(-7,-26,14,5,sets.hair);b(-6,-27,12,3,'#5f4945')}
 else if(kind==='receptionist'){b(-7,-26,14,5,sets.hair);b(-6,-28,12,3,'#66463c')}
 else {b(-7,-26,14,5,sets.hair);b(-5,-28,10,3,sets.hair)}
 // face
 if(dir!==1){b(-4,-18,2,2,'#2b2628');b(2,-18,2,2,'#2b2628');b(-3,-13,6,1,'#a87663')}
 else {b(-6,-18,12,2,sets.hair);b(-3,-20,6,3,'#c6a180')}
 if(dir===2){b(-8,-18,3,4,sets.hair);b(-7,-16,1,2,sets.skin)}
 if(dir===3){b(5,-18,3,4,sets.hair);b(6,-16,1,2,sets.skin)}
 // shoulder trim / accessories
 b(-7,-12,2,12,'#ffffff23'); b(5,-11,2,12,'#00000018');
 if(kind==='player'){b(6,-8,3,6,'#f2d884');b(7,-7,1,4,'#8e6731')}
 if(kind==='historian'){b(-10,-9,2,6,'#f1df95')}
 if(kind==='guide'){b(-1,-6,2,7,'#e8f3f2')}
}
npc=function(x,y){drawCharacter(x,y,state.room==='khanate'?'asan':state.room==='alash'?'alikhan':'historian',0,Math.sin(clock*2)*.22,2.95)};
renderPlayer=function(){drawCharacter(player.x,player.y,'player',player.dir,player.step,3.0)};
// Offline illustrated portraits for every guide; historic archive portrait online when available.
function portraitHTML(room){
 const captions={khanate:state.lang==='ru'?'Пиксельный исторический персонаж':'Пиксельдік тарихи кейіпкер',alash:state.lang==='ru'?'Пиксельный исторический персонаж':'Пиксельдік тарихи кейіпкер',zheltoksan:state.lang==='ru'?'Пиксельный гид зала':'Залдың пиксельдік гиді',final:state.lang==='ru'?'Пиксельный виртуальный гид':'Пиксельдік виртуалды гид'};
 return `<div class="npc-portrait-layout"><div class="npc-photo-frame"><img class="npc-photo" src="${npcPortraitPath(room)}" alt="${npcName(room)}"><span class="photo-caption">${captions[room]}</span></div><div class="npc-message"><span class="dialogue-tag">✦ ${state.lang==='ru'?'Исторический музей':'Тарихи музей'}</span><h2>${npcName(room)}</h2>`
}
function exhibitArtHTML(room,index){
 const ex=data[room].ex[index],caption=EXHIBIT_CAPTIONS[room][index][state.lang==='ru'?'ru':'kk'];
 return `<div class="exhibit-art-layout"><div class="exhibit-photo-frame"><img class="exhibit-photo" src="${exhibitImagePath(room,index)}" alt="${ex.title[ix()]}"><span class="photo-caption">${caption}</span></div><div class="exhibit-info"><span class="dialogue-tag">✦ ${state.lang==='ru'?'Экспонат зала':'Зал жәдігері'}</span><h2>${ex.title[ix()]}</h2><p class="dialogue-copy">${ex.desc[ix()]}</p></div></div>`
}
function showRoomIntro(room){
 const lore=ROOM_LORE[room]; if(!lore)return;
 openModal(`<div class="history-intro">${lore.badge[state.lang]}</div><h2>${lore.title[state.lang]}</h2><p>${lore.p1[state.lang]}</p><p>${lore.p2[state.lang]}</p><div class="dialogue-tip">${lore.tip[state.lang]}</div>${buttons([L().continue,'closeModal()',true])}`)
}
function showExhibit(room,index,msg=''){
 let ex=data[room].ex[index],result=getResult(room,index),answered=!!result,correct=!!(result&&result.correct),order=getQuizOrder(room,index),correctText=ex.opts[ix()][ex.answer];
 let status='';
 if(msg==='correct')status=`<p class="success">${L().correct}</p>`; else if(msg==='wrong')status=`<p class="error">${L().wrong}</p>`;
 if(answered){status+=correct?`<p class="success">✓ ${state.lang==='ru'?'Ответ принят. Экспонат восстановлен в цвете.':'Жауап қабылданды. Жәдігер түске енді.'}</p>`:`<p class="error">✕ ${state.lang==='ru'?'Ответ уже зафиксирован. Верный ответ:':'Жауап сақталды. Дұрыс жауап:'} <strong>${escapeHTML(correctText)}</strong></p>`}
 let choices=answered?buttons([L().close,'closeModal()',true]):order.map((optIndex,j)=>`<button class="choice" onclick="answerQuiz('${room}',${index},${optIndex})">${String.fromCharCode(65+j)}. ${escapeHTML(ex.opts[ix()][optIndex])}</button>`).join('')+buttons([L().close,'closeModal()']);
 openModal(`${exhibitArtHTML(room,index)}<div class="quiz-guide-box"><img class="quiz-guide-avatar" src="${npcPortraitPath(room)}" alt="${npcName(room)}"><div class="quiz-guide-content"><span class="dialogue-tag">✦ ${npcName(room)}</span><h3>${state.lang==='ru'?'Вопрос по экспонату':'Жәдігер бойынша сұрақ'}</h3><p class="dialogue-copy">${ex.q[ix()]}</p>${status}${choices}</div></div>`)
}
window.showExhibit=showExhibit
const legacyInteract=interact;
interact=function(){
 if(modalOpen||fadeBusy)return;
 const o=nearest();
 if(o&&o.type==='npc'){
   const d=data[state.room];beep(540,.09);
   openModal(`${portraitHTML(state.room)}<p class="dialogue-copy">${d.intro[ix()].replace('{name}',escapeHTML(state.name||'Гость'))}</p><div class="dialogue-tip">${state.lang==='ru'?'Подойдите к трём витринам, изучите историю и ответьте на вопросы.':'Үш көрмені аралап, тарихын зерттеп, сұрақтарға жауап беріңіз.'}</div></div></div>${buttons([L().continue,'closeModal()',true])}`);
   return;
 }
 legacyInteract();
};
// Destination-aware 1.25-second door opening, glow, camera-like zoom and fade.
transition=function(room){
 if(fadeBusy)return;
 fadeBusy=true;closeModal();beep(420,.19);const el=document.createElement('div');el.className='door-scene';
 el.innerHTML=`<div class="door-zoom"><div class="door-stone"><div class="door-crest">✦</div><div class="door-leaf left"><i></i><i></i></div><div class="door-leaf right"><i></i><i></i></div><div class="door-light"></div></div></div><div class="door-shade"></div><div class="door-scene-title">${escapeHTML(room==='hall'?L().hall:room==='final'?(state.lang==='ru'?'Независимый Казахстан':'Тәуелсіз Қазақстан'):data[room].title[ix()])}</div>`;
 document.body.appendChild(el);
 requestAnimationFrame(()=>el.classList.add('is-opening'));
 setTimeout(()=>{
   state.room=room;player.x=540;player.y=room==='hall'?550:room==='final'?580:570;save();updateHUD();near=null;
   el.classList.add('is-arriving');
 },760);
 setTimeout(()=>{
   el.remove();fadeBusy=false;
   if(room!=='hall'&&room!=='final')showRoomIntro(room);
   if(room==='final')showFinal();
 },1420)
};
showFinal=function(){
 openModal(`${portraitHTML('final')}<p class="dialogue-copy">${state.lang==='ru'?`${escapeHTML(state.name||'Путешественник')}, поздравляем! Ты изучил важные страницы истории Казахстана.`:`${escapeHTML(state.name||'Саяхатшы')}, құттықтаймыз! Сен Қазақстан тарихының маңызды кезеңдерін зерттедің.`}</p><div class="final-stats"><span>🏛 ${L().rooms}: ${roomCount()}/3</span><span>✦ ${L().exhibits}: ${exhibitCount()}/9</span><span>✓ ${state.lang==='ru'?'Верных ответов':'Дұрыс жауаптар'}: ${correctTotal()}/9</span></div></div></div>${buttons([L().achievements,'showAchievements()',true],[L().exit,"transition('hall')"],[L().again,'resetGame()'])}`)
};
