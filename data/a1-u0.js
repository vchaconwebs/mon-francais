window.COURSE = {A1:{units:[]}};
window.U = u => COURSE.A1.units.push(u);
window.Q = (q,a,...w) => ({t:'qcm',q,a,w});
window.F = (q,a,x) => ({t:'fill',q,a,x});
window.T = (q,a,x) => ({t:'trans',q:'Traduce: «'+q+'»',a,x});
window.SEC = (s,e) => (e.sec=s, e);
/* tablas rápidas */
window.TB = (head, rows) => '<div class="tw"><table><tr>'+head.map(h=>'<th>'+h+'</th>').join('')+'</tr>'+rows.map(r=>'<tr>'+r.map((c,i)=>i===0&&c&&!/</.test(c)&&!/^(|regla|tipo|uso|función|registro|tiempo|nivel|abreviatura|nº|prueba|grafía|signo)$/i.test(head[0])?'<td><span class="fr" data-say="'+c.replace(/"/g,'')+'">'+c+'</span></td>':'<td>'+c+'</td>').join('')+'</tr>').join('')+'</table></div>';

U({
id:'u0', n:'00', title:'Bonjour !', es:'Dosier de descubrimiento: saludar, presentarse, tú o usted, la francofonía', color:'#6b7280',
goals:['Saludar y despedirte en distintas situaciones','Decir cómo te llamas y preguntarlo','Elegir entre «tu» y «vous»','Usar los pronombres personales sujeto','Pedir ayuda en clase','Reconocer algunos países francófonos'],
lessons:[
{t:'Saludar y despedirse', h:`<p>En francés se saluda distinto según el momento del día y la confianza:</p>`+TB(['Francés','Español','Cuándo'],[
['Bonjour','Buenos días / Hola','Todo el día, situación neutra o formal'],['Bonsoir','Buenas tardes / noches','A partir de las 18 h aprox.'],['Salut','Hola / Chao','Con amigos (informal)'],['Coucou','Holi','Muy familiar'],['Au revoir','Adiós','Neutro'],['À bientôt','Hasta pronto',''],['À demain','Hasta mañana',''],['Bonne journée','Buen día','Al despedirse por la mañana'],['Bonne soirée','Buena tarde/noche','Al despedirse por la tarde'],['Bonne nuit','Buenas noches','Solo al ir a dormir']])+
`<div class="tip">💡 Al entrar en una tienda en Francia siempre se dice <b>«Bonjour madame / monsieur»</b>. ¡No saludar se considera de mala educación!</div>
<h3>Preguntar «¿qué tal?»</h3>`+TB(['Pregunta','Respuesta'],[['Comment allez-vous ?','Je vais bien, merci. Et vous ? (formal)'],['Comment vas-tu ?','Ça va bien, et toi ?'],['Ça va ?','Ça va. / Oui, ça va. / Pas mal. / Bof…']])},
{t:'El verbo s’appeler (llamarse)', h:`<p>Para decir tu nombre usamos <b>s’appeler</b>, un verbo <i>pronominal</i> (lleva un pronombre como «me», «te», «se»). Fíjate en la doble <b>ll</b> cuando la terminación no se pronuncia.</p>`+TB(['Forma','Español'],[['je m’appelle','me llamo'],['tu t’appelles','te llamas'],['il / elle s’appelle','se llama'],['nous nous appelons','nos llamamos'],['vous vous appelez','os llamáis / se llama usted'],['ils / elles s’appellent','se llaman']])+
`<div class="note"><b>Preguntar:</b> <span class="fr" data-say="Comment tu t'appelles ?">Comment tu t’appelles ?</span> (informal) · <span class="fr" data-say="Comment vous appelez-vous ?">Comment vous appelez-vous ?</span> (formal)<br><b>Responder:</b> <span class="fr" data-say="Je m'appelle Lucas. Et toi ?">Je m’appelle Lucas. Et toi ?</span> · también: <span class="fr" data-say="Moi, c'est Lucas.">Moi, c’est Lucas.</span></div>`},
{t:'Los pronombres personales sujeto', h:`<p>En francés <b>el sujeto es obligatorio</b>: no se puede decir solo «suis» como en español «soy». Siempre: <i>je suis</i>.</p>`+TB(['Pronombre','Español','Nota'],[['je (j’)','yo','Se convierte en <b>j’</b> delante de vocal o h: j’aime, j’habite'],['tu','tú','Informal'],['il','él',''],['elle','ella',''],['on','nosotros / se / uno','Muy usado al hablar = «nous». Verbo en 3.ª del singular'],['nous','nosotros/as',''],['vous','vosotros/as · usted · ustedes','Plural o forma de cortesía'],['ils','ellos','También grupo mixto'],['elles','ellas','Solo femenino']])+
`<div class="warn">⚠️ Un grupo de 10 mujeres y 1 hombre = <b>ils</b>. Basta un masculino para usar el masculino.</div>`},
{t:'¿Tu o vous?', h:`<ul class="clean"><li><b>Tu</b>: familia, amigos, niños, compañeros jóvenes, animales.</li><li><b>Vous</b>: desconocidos, personas mayores, en tiendas, con clientes, en el trabajo (al principio), y siempre para hablar a <b>varias personas</b>.</li></ul><div class="tip">Si dudas, usa <b>vous</b>. La otra persona te propondrá: <span class="fr" data-say="On peut se tutoyer ?">« On peut se tutoyer ? »</span> (¿Nos tuteamos?). Tutear = <i>tutoyer</i>; tratar de usted = <i>vouvoyer</i>.</div>`},
{t:'Los pronombres tónicos', h:`<p>Sirven para insistir o después de una preposición: <i>Moi, je suis espagnol. — Et toi ? — C’est pour lui.</i></p>`+TB(['Sujeto','Tónico','Ejemplo'],[['je','moi','Moi, je m’appelle Ana.'],['tu','toi','Et toi ?'],['il','lui','C’est lui !'],['elle','elle','Avec elle.'],['nous','nous','Chez nous.'],['vous','vous','Et vous ?'],['ils','eux','Pour eux.'],['elles','elles','Sans elles.']])},
{t:'Fórmulas de cortesía y frases de clase', h:TB(['Francés','Español'],[['S’il vous plaît / S’il te plaît','Por favor (usted / tú)'],['Merci (beaucoup)','Gracias (muchas)'],['De rien / Je vous en prie','De nada'],['Excusez-moi / Pardon','Disculpe / Perdón'],['Je ne comprends pas.','No entiendo.'],['Vous pouvez répéter, s’il vous plaît ?','¿Puede repetir, por favor?'],['Plus lentement, s’il vous plaît.','Más despacio, por favor.'],['Comment on dit « gato » en français ?','¿Cómo se dice «gato» en francés?'],['Qu’est-ce que ça veut dire ?','¿Qué significa eso?'],['Comment ça s’écrit ?','¿Cómo se escribe?'],['Je ne sais pas.','No sé.'],['J’ai une question.','Tengo una pregunta.']])+`<h3>Palabras para animar</h3><div class="chips">${['Bravo !','Super !','Génial !','Très bien !','Parfait !','Courage !','Allez !','Pas de problème !'].map(x=>`<span class="chip fr" data-say="${x}">${x}</span>`).join('')}</div>`}
],
phon:`<h3>Las primeras claves del sonido francés</h3><ul class="clean"><li>La mayoría de las <b>consonantes finales no se pronuncian</b>: <span class="fr" data-say="Paris">Paris</span> [parí], <span class="fr" data-say="salut">salut</span> [salú], <span class="fr" data-say="vous">vous</span> [vu]. Excepción frecuente: c, r, f, l (piensa en «CaReFuL»): <span class="fr" data-say="bonjour">bonjour</span>, <span class="fr" data-say="avec">avec</span>, <span class="fr" data-say="neuf">neuf</span>.</li><li>La <b>e</b> final no se pronuncia: <span class="fr" data-say="madame">madame</span>, <span class="fr" data-say="France">France</span>.</li><li><b>ou</b> = u española: <span class="fr" data-say="vous, bonjour, beaucoup">vous, bonjour</span>. <b>u</b> = sonido entre i y u (pon labios de «u» y di «i»): <span class="fr" data-say="tu, salut, bienvenue">tu, salut</span>.</li><li><b>oi</b> = «ua»: <span class="fr" data-say="moi, toi, au revoir">moi, toi, au revoir</span>. <b>au/eau</b> = o: <span class="fr" data-say="au revoir, beaucoup">beaucoup</span>.</li></ul>`,
vocab:{
'Saludos':'Bonjour|Buenos días / Hola;Bonsoir|Buenas tardes/noches;Salut|Hola / Chao (informal);Coucou|Holi;Au revoir|Adiós;À bientôt|Hasta pronto;À demain|Hasta mañana;À plus tard|Hasta luego;Bonne journée|Que tengas buen día;Bonne nuit|Buenas noches (al dormir);Bienvenue|Bienvenido',
'Presentarse':'Je m’appelle…|Me llamo…;Comment tu t’appelles ?|¿Cómo te llamas?;Comment vous appelez-vous ?|¿Cómo se llama usted?;Enchanté(e)|Encantado/a;Ça va ?|¿Qué tal?;Ça va bien|Va bien;Et toi ?|¿Y tú?;Et vous ?|¿Y usted?;monsieur|señor;madame|señora;mademoiselle|señorita',
'Cortesía y clase':'S’il vous plaît|Por favor (usted);S’il te plaît|Por favor (tú);Merci|Gracias;Merci beaucoup|Muchas gracias;De rien|De nada;Pardon|Perdón;Excusez-moi|Disculpe;Je ne comprends pas|No entiendo;Répétez, s’il vous plaît|Repita, por favor;oui|sí;non|no;le professeur|el profesor;l’élève|el alumno;le livre|el libro;le cahier|el cuaderno;le stylo|el bolígrafo;la classe|la clase'
},
dialogs:[
{t:'En la clase de francés', l:[['Prof.','Bonjour à tous ! Je m’appelle Claire. Je suis votre professeure.','¡Hola a todos! Me llamo Claire. Soy vuestra profesora.'],['Marco','Bonjour madame !','¡Buenos días, señora!'],['Claire','Comment vous appelez-vous ?','¿Cómo se llama usted?'],['Marco','Je m’appelle Marco. Je suis italien.','Me llamo Marco. Soy italiano.'],['Claire','Enchantée, Marco. Et vous ?','Encantada, Marco. ¿Y usted?'],['Ana','Moi, c’est Ana. Je suis espagnole.','Yo soy Ana. Soy española.'],['Claire','Bienvenue, Ana !','¡Bienvenida, Ana!']], q:[['¿Cómo se llama la profesora?','Claire'],['¿De dónde es Marco?','De Italia (italien)']]},
{t:'Dos amigos en la calle', l:[['Léa','Salut Tom ! Ça va ?','¡Hola Tom! ¿Qué tal?'],['Tom','Salut Léa ! Ça va bien, et toi ?','¡Hola Léa! Bien, ¿y tú?'],['Léa','Bof… je suis fatiguée.','Bah… estoy cansada.'],['Tom','Oh ! Allez, courage ! À demain !','¡Oh! ¡Venga, ánimo! ¡Hasta mañana!'],['Léa','À demain, Tom !','¡Hasta mañana, Tom!']]},
{t:'En una panadería', l:[['Clienta','Bonjour monsieur.','Buenos días, señor.'],['Panadero','Bonjour madame. Vous désirez ?','Buenos días, señora. ¿Qué desea?'],['Clienta','Une baguette, s’il vous plaît.','Una baguette, por favor.'],['Panadero','Voilà. Un euro vingt, s’il vous plaît.','Aquí tiene. Un euro veinte, por favor.'],['Clienta','Merci. Bonne journée !','Gracias. ¡Buen día!'],['Panadero','Merci, à vous aussi !','¡Gracias, igualmente!']]}
],
culture:[
{t:'La francofonía', h:`<p>Más de <b>320 millones de personas</b> hablan francés en los cinco continentes. Es lengua oficial en 29 países. Algunos ejemplos:</p>`+TB(['País','Algo típico'],[['la France','La torre Eiffel, el queso, la baguette'],['la Belgique','Las patatas fritas, el chocolate, los cómics (Tintín)'],['la Suisse','Los Alpes, los relojes, la fondue'],['le Canada (Québec)','El jarabe de arce, la poutine, el hockey'],['le Sénégal','El thieboudienne (arroz con pescado), la música mbalax'],['le Maroc','El cuscús, el tajín, la medina de Marrakech'],['le Luxembourg','Instituciones europeas'],['Haïti','La pintura naïf, la lengua criolla']])},
{t:'¿Besos o mano?', h:`<p>En Francia, entre amigos y familia se saluda con <b>«la bise»</b>: besos en las mejillas. ¡El número depende de la región! (2 en París, 3 en el sur, hasta 4 en algunas zonas). En el trabajo o con desconocidos, se da <b>la mano</b> (<i>serrer la main</i>).</p>`}
],
ex:[
SEC('Saludos', Q('Son las 21 h y entras en un restaurante. Dices…','Bonsoir','Bonne nuit','Salut')),
Q('Te despides de un amigo que verás mañana:','À demain !','Bonjour !','Bonsoir !'),
Q('¿Qué es informal?','Salut','Bonjour','Au revoir'),
Q('«Ça va ?» — Respuesta correcta:','Ça va bien, merci.','Je m’appelle Paul.','Au revoir.'),
Q('Te vas a dormir. Dices:','Bonne nuit','Bonne journée','Bonsoir madame'),
SEC('S’appeler', F('Je ___ Sophie. (s’appeler)','m’appelle/m\'appelle')),
F('Tu ___ comment ? (s’appeler)','t’appelles/t\'appelles'),
F('Il ___ Marc. (s’appeler)','s’appelle/s\'appelle'),
F('Nous ___ Hugo et Max. (s’appeler)','nous appelons'),
F('Vous ___ comment ? (s’appeler)','vous appelez'),
F('Elles ___ Inès et Zoé. (s’appeler)','s’appellent/s\'appellent'),
SEC('Pronombres', Q('Hablas de María y Lucía:','elles','ils','nous')),
Q('Hablas de Pedro y Ana:','ils','elles','vous'),
Q('Hablas a tu jefa por primera vez:','vous','tu','on'),
Q('Hablas a tu hermano:','tu','vous','il'),
Q('___, je suis français. (pronombre tónico)','Moi','Je','Me'),
Q('Et ___ ? (a un amigo)','toi','tu','te'),
F('C’est pour ___ (él).','lui'),
F('Je pars avec ___ (ellos).','eux'),
SEC('Cortesía', Q('No entiendes al profesor. Dices:','Je ne comprends pas.','De rien.','Enchanté.')),
Q('Alguien te da las gracias. Respondes:','De rien','Pardon','S’il te plaît'),
Q('Quieres saber cómo se escribe una palabra:','Comment ça s’écrit ?','Comment ça va ?','Comment tu t’appelles ?'),
T('Me llamo Ana. ¿Y tú?','Je m’appelle Ana. Et toi ?/Je m\'appelle Ana. Et toi ?/Je m’appelle Ana et toi/Je m\'appelle Ana et toi'),
T('Muchas gracias','Merci beaucoup'),
T('Hasta pronto','À bientôt/A bientôt'),
T('Por favor (a un desconocido)','S’il vous plaît/S\'il vous plaît')
],
prod:[
{t:'Preséntate por escrito', h:'Escribe 3–4 frases: saluda, di tu nombre, tu nacionalidad y despídete.', model:'Bonjour ! Je m’appelle Víctor. Je suis espagnol. Enchanté ! À bientôt !'},
{t:'Habla', oral:true, h:'Grábate (con el móvil) saludando a tu profesor/a de manera formal y luego a un amigo de forma informal. Compara la entonación con los diálogos.'}
]
});
