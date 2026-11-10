U({
id:'u1', n:'01', title:'Portrait-robot', es:'Identidad: el alfabeto, los números, être y avoir, la edad, las profesiones, París y Francia', color:'#d6303c',
goals:['Deletrear tu nombre con el alfabeto francés','Contar de 0 a 100 y más','Decir tu edad, tu teléfono y tu e-mail','Conjugar être y avoir en presente','Usar los artículos definidos le, la, l’, les','Decir tu profesión en masculino y femenino','Usar los números ordinales (premier, deuxième…)'],
lessons:[
{t:'El alfabeto', h:`<p>Pulsa cada letra para escucharla. Las más difíciles para hispanohablantes están marcadas.</p><div class="chips">${'A a|B bé|C cé|D dé|E e (como «ö»)|F èf|G gé (como «yé»)|H ach|I i|J ji (como «yi» suave)|K ka|L èl|M èm|N èn|O o|P pé|Q ku|R èr|S ès|T té|U u (francesa)|V vé|W double vé|X iks|Y i grec|Z zèd'.split('|').map(x=>{const[l,...r]=x.split(' ');return `<span class="chip fr" data-say="${l}">${l} <span class="muted">· ${r.join(' ')}</span></span>`}).join('')}</div>
<div class="warn">⚠️ Cuidado: <b>E</b> [ə] vs <b>I</b> [i] · <b>G</b> [ʒe] vs <b>J</b> [ʒi] · <b>U</b> [y] (no es nuestra u).</div>
<h3>Acentos y signos</h3>`+TB(['Signo','Nombre','Ejemplo'],[['é','e accent aigu','café, été'],['è','e accent grave','père, très'],['ê','e accent circonflexe','fête, être'],['ç','c cédille (suena «s»)','français, ça'],['ë / ï','tréma','Noël, naïf'],['à / ù','accent grave','à Paris, où']])+
`<div class="note">Para deletrear: <span class="fr" data-say="Ça s'écrit comment ? M, A, R, T, I, N.">Ça s’écrit comment ? — M-A-R-T-I-N.</span> Doble letra: <i>deux L</i> (Pollet = P-O-deux L-E-T). Mayúscula: <i>majuscule</i>; minúscula: <i>minuscule</i>.</div>`},
{t:'Los números de 0 a 69', h:TB(['Nº','Francés','Nº','Francés'],[['0','zéro','11','onze'],['1','un / une','12','douze'],['2','deux','13','treize'],['3','trois','14','quatorze'],['4','quatre','15','quinze'],['5','cinq','16','seize'],['6','six','17','dix-sept'],['7','sept','18','dix-huit'],['8','huit','19','dix-neuf'],['9','neuf','20','vingt'],['10','dix','21','vingt et un']].map(r=>[`<span class="fr" data-say="${r[1]}">${r[0]}</span>`,r[1],`<span class="fr" data-say="${r[3]}">${r[2]}</span>`,r[3]]))+
`<p>Decenas: <b>30</b> trente · <b>40</b> quarante · <b>50</b> cinquante · <b>60</b> soixante.</p><p>Se forman con guion: <i>vingt-deux, trente-cinq</i>. Pero con <b>1</b> se usa <b>et</b>: <i>vingt et un, trente et un, quarante et un, cinquante et un, soixante et un</i>.</p>`},
{t:'Los números de 70 a 1000 (¡ojo!)', h:`<p>Los franceses (de Francia) cuentan así a partir de 70:</p>`+TB(['Nº','Francés','Lógica'],[['70','soixante-dix','60 + 10'],['71','soixante et onze','60 + 11'],['75','soixante-quinze','60 + 15'],['80','quatre-vingts','4 × 20'],['81','quatre-vingt-un','4 × 20 + 1 (sin et, sin s)'],['90','quatre-vingt-dix','4 × 20 + 10'],['99','quatre-vingt-dix-neuf','4×20 + 19'],['100','cent',''],['200','deux cents',''],['1000','mille','']].map(r=>[`<span class="fr" data-say="${r[1]}">${r[0]}</span>`,r[1],r[2]]))+
`<div class="tip">💡 En <b>Bélgica y Suiza</b> se dice <i>septante</i> (70), <i>nonante</i> (90), y en Suiza también <i>huitante</i> (80). ¡Mucho más fácil!</div>`},
{t:'Los verbos être (ser/estar) y avoir (tener)', h:`<div class="grid"><div>`+TB(['être','ser / estar'],[['je suis','yo soy'],['tu es','tú eres'],['il / elle / on est','él/ella es'],['nous sommes','somos'],['vous êtes','sois / usted es'],['ils / elles sont','son']])+`</div><div>`+TB(['avoir','tener'],[['j’ai','tengo'],['tu as','tienes'],['il / elle / on a','tiene'],['nous avons','tenemos'],['vous avez','tenéis / usted tiene'],['ils / elles ont','tienen']])+`</div></div>
<div class="warn">⚠️ <b>La edad se dice con avoir</b>, no con être: <span class="fr" data-say="J'ai vingt-cinq ans.">J’ai 25 ans.</span> (¡y siempre con <b>ans</b>!). Preguntar: <span class="fr" data-say="Tu as quel âge ?">Tu as quel âge ?</span> / <span class="fr" data-say="Quel âge avez-vous ?">Quel âge avez-vous ?</span></div>
<p>Otros usos de avoir: <i>avoir faim</i> (tener hambre), <i>avoir soif</i> (sed), <i>avoir froid / chaud</i> (frío/calor), <i>avoir sommeil</i> (sueño), <i>avoir peur</i> (miedo).</p>`},
{t:'Los artículos definidos', h:TB(['','Masculino','Femenino'],[['Singular','<b>le</b> métro','<b>la</b> ville'],['Delante de vocal o h muda','<b>l’</b>hôtel','<b>l’</b>école'],['Plural','<b>les</b> musées','<b>les</b> rues']])+
`<p>En plural, <b>les</b> + vocal hace <i>liaison</i> con sonido [z]: <span class="fr" data-say="les amis, les hôtels">les‿amis, les‿hôtels</span>.</p><div class="warn">El género en francés no siempre coincide con el español: <i>la mer</i> (el mar), <i>le lait</i> (la leche), <i>la voiture</i> (el coche), <i>le nez</i> (la nariz). ¡Aprende siempre la palabra con su artículo!</div>`},
{t:'Los números ordinales', h:TB(['Ordinal','Español'],[['premier / première','1.º / 1.ª'],['deuxième (second)','2.º'],['troisième','3.º'],['quatrième','4.º'],['cinquième','5.º'],['neuvième','9.º'],['dixième','10.º'],['vingtième','20.º']])+`<p>Regla: número + <b>-ième</b> (si acaba en -e, se quita: quatre → quatrième; cinq → cinqu<b>ième</b>; neuf → neu<b>v</b>ième).</p><p>Se usan para pisos, distritos y siglos: <i>J’habite au troisième étage. — Le Louvre est dans le premier arrondissement.</i></p>`},
{t:'Las profesiones: masculino y femenino', h:`<p>Para decir la profesión se usa <b>être + profesión SIN artículo</b>: <span class="fr" data-say="Je suis médecin.">Je suis médecin.</span> (no «je suis un médecin»).</p>`+TB(['Regla','Masculino','Femenino'],[['+ e','avocat','avocate'],['-ien → -ienne','informaticien','informaticienne'],['-er → -ère','boulanger','boulangère'],['-eur → -euse','vendeur','vendeuse'],['-teur → -trice','acteur','actrice'],['-e → igual','journaliste','journaliste'],['igual','médecin','médecin'],['igual (o -e)','professeur','professeur(e)'],['-ier → -ière','infirmier','infirmière']])+
`<p>Preguntar: <span class="fr" data-say="Qu'est-ce que vous faites dans la vie ?">Qu’est-ce que vous faites dans la vie ?</span> / <span class="fr" data-say="Tu fais quoi ?">Tu fais quoi ?</span> / <span class="fr" data-say="Quelle est votre profession ?">Quelle est votre profession ?</span></p>`},
{t:'Dar tus datos personales', h:TB(['Pregunta','Respuesta'],[['Quel est ton nom ?','Mon nom est Garcia.'],['Quel est ton prénom ?','Mon prénom est Ana.'],['Tu habites où ?','J’habite à Madrid.'],['Quel est ton numéro de téléphone ?','C’est le 06 45 12 33 80.'],['Quelle est ton adresse e-mail ?','ana.garcia arobase gmail point com'],['Tu as quel âge ?','J’ai trente ans.']])+`<p>En el e-mail: <b>@</b> = <i>arobase</i>, <b>.</b> = <i>point</i>, <b>-</b> = <i>tiret</i>, <b>_</b> = <i>tiret bas</i>. Los números de teléfono franceses se leen de dos en dos: 06 / 45 / 12…</p>`}
],
phon:`<h3>El acento en la última sílaba</h3><p>En francés, la fuerza de voz cae siempre en la <b>última sílaba pronunciada</b> del grupo de palabras: <span class="fr" data-say="Paris, restaurant, université">Pa-<b>ris</b>, res-tau-<b>rant</b>, u-ni-ver-si-<b>té</b></span>. Nunca «PA-ris».</p><h3>La liaison (enlace)</h3><p>Una consonante final muda se pronuncia si la palabra siguiente empieza por vocal: <span class="fr" data-say="vous avez, les amis, deux ans, trois euros">vous‿avez [vuzavé], les‿amis, deux‿ans [döza], trois‿euros</span>. Es obligatoria entre artículo/pronombre y palabra. Está <b>prohibida</b> después de <i>et</i>: <i>un garçon et | une fille</i>.</p>`,
vocab:{
'Lugares de la ciudad':'la ville|la ciudad;la rue|la calle;le quartier|el barrio;la place|la plaza;le musée|el museo;le monument|el monumento;l’église|la iglesia;le pont|el puente;le parc|el parque;la gare|la estación de tren;le métro|el metro;la station|la estación (de metro);l’hôtel|el hotel;le restaurant|el restaurante;le café|la cafetería / el café;la boulangerie|la panadería;le cinéma|el cine;la tour|la torre;le fleuve|el río (grande);l’arrondissement|el distrito (de París)',
'Números':'zéro|0;un|1;deux|2;trois|3;quatre|4;cinq|5;six|6;sept|7;huit|8;neuf|9;dix|10;onze|11;douze|12;treize|13;quatorze|14;quinze|15;seize|16;vingt|20;trente|30;quarante|40;cinquante|50;soixante|60;soixante-dix|70;quatre-vingts|80;quatre-vingt-dix|90;cent|100;mille|1000',
'Profesiones':'le médecin|el/la médico;l’avocat / l’avocate|el/la abogado/a;le professeur|el/la profesor/a;l’infirmier / l’infirmière|el/la enfermero/a;l’ingénieur|el/la ingeniero/a;le serveur / la serveuse|el/la camarero/a;le vendeur / la vendeuse|el/la vendedor/a;le cuisinier / la cuisinière|el/la cocinero/a;le boulanger / la boulangère|el/la panadero/a;l’acteur / l’actrice|el actor / la actriz;le / la journaliste|el/la periodista;l’informaticien / l’informaticienne|el/la informático/a;l’étudiant / l’étudiante|el/la estudiante;le policier / la policière|el/la policía;le chauffeur|el/la conductor/a;le / la secrétaire|el/la secretario/a;l’architecte|el/la arquitecto/a;le / la dentiste|el/la dentista;au chômage|en paro;retraité(e)|jubilado/a',
'Identidad':'le nom|el apellido;le prénom|el nombre;l’âge|la edad;l’adresse|la dirección;le numéro de téléphone|el nº de teléfono;l’adresse e-mail|el correo electrónico;arobase|arroba (@);point|punto;la nationalité|la nacionalidad;habiter|vivir;né(e) le…|nacido/a el…;célibataire|soltero/a;les chiffres|las cifras'
},
dialogs:[
{t:'En la recepción del hotel', l:[['Recepcionista','Bonjour madame, bienvenue à l’hôtel Lumière.','Buenos días, señora, bienvenida al hotel Lumière.'],['Clienta','Bonjour. J’ai une réservation au nom de Ruiz.','Buenos días. Tengo una reserva a nombre de Ruiz.'],['Recepcionista','Ruiz… Ça s’écrit comment ?','Ruiz… ¿Cómo se escribe?'],['Clienta','R-U-I-Z.','R-U-I-Z.'],['Recepcionista','Parfait. Votre prénom ?','Perfecto. ¿Su nombre?'],['Clienta','Carmen.','Carmen.'],['Recepcionista','Vous avez un numéro de téléphone ?','¿Tiene un número de teléfono?'],['Clienta','Oui, c’est le 06 72 18 44 90.','Sí, es el 06 72 18 44 90.'],['Recepcionista','Merci. Vous avez la chambre 38, au troisième étage.','Gracias. Tiene la habitación 38, en el tercer piso.']], q:[['¿Cómo se apellida la clienta?','Ruiz'],['¿Qué habitación tiene?','La 38, en el 3.er piso']]},
{t:'Un nuevo compañero', l:[['Julie','Salut ! Tu es nouveau ?','¡Hola! ¿Eres nuevo?'],['Karim','Oui, je m’appelle Karim. J’ai vingt-deux ans.','Sí, me llamo Karim. Tengo veintidós años.'],['Julie','Tu es étudiant ?','¿Eres estudiante?'],['Karim','Non, je suis informaticien. Et toi ?','No, soy informático. ¿Y tú?'],['Julie','Moi, je suis infirmière. J’habite dans le onzième arrondissement.','Yo soy enfermera. Vivo en el distrito 11.'],['Karim','Ah, moi aussi !','¡Ah, yo también!']]}
],
culture:[
{t:'París en cifras y lugares', h:`<p>París tiene unos <b>2,1 millones</b> de habitantes (más de 12 millones con su área metropolitana) y está dividida en <b>20 distritos</b> (<i>arrondissements</i>) que giran en espiral desde el centro como un caracol. El río que la cruza es <b>la Seine</b>.</p><ul class="clean"><li><b>La tour Eiffel</b> (1889): 330 metros.</li><li><b>Le Louvre</b>: el museo más visitado del mundo.</li><li><b>Notre-Dame</b>, catedral gótica en la isla de la Cité.</li><li><b>Montmartre</b> y la basílica del Sacré-Cœur.</li><li><b>Les Champs-Élysées</b> y el Arc de Triomphe.</li></ul><p>El <b>metro</b> de París abrió en 1900, tiene 16 líneas y más de 300 estaciones.</p>`},
{t:'Francia y los franceses', h:`<ul class="clean"><li>Población: unos <b>68 millones</b>.</li><li>Capital: Paris. Otras ciudades: Marseille, Lyon, Toulouse, Nice, Nantes, Bordeaux, Lille, Strasbourg.</li><li>Lema: <b>Liberté, Égalité, Fraternité</b>.</li><li>Símbolos: la bandera azul-blanca-roja, Marianne, el gallo.</li><li>Fiesta nacional: el <b>14 de julio</b>.</li><li>Se llama «l’Hexagone» por su forma de seis lados.</li><li>Las profesiones se feminizan cada vez más: hoy se dice <i>la ministre, l’autrice, la cheffe</i>.</li></ul>`}
],
ex:[
SEC('Alfabeto', Q('¿Qué letra suena [ʒi]?','J','G','I')),
Q('¿Qué letra suena [ʒe]?','G','J','E'),
Q('«ç» se pronuncia como…','s','k','ch'),
Q('«arobase» es…','@','.','-'),
SEC('Números', F('17 en letras:','dix-sept')),
F('21 en letras:','vingt et un/vingt-et-un'),
F('48 en letras:','quarante-huit'),
F('70 en letras:','soixante-dix'),
F('80 en letras:','quatre-vingts','lleva -s porque no le sigue otro número'),
F('92 en letras:','quatre-vingt-douze'),
Q('«soixante-quinze» =','75','65','95'),
Q('«quatre-vingt-un» =','81','84','61'),
Q('«seize» =','16','6','60'),
Q('En Bélgica 90 se dice…','nonante','quatre-vingt-dix','neufante'),
SEC('Être y avoir', F('Je ___ espagnole. (être)','suis')),
F('Nous ___ étudiants. (être)','sommes'),
F('Vous ___ français ? (être)','êtes'),
F('Ils ___ à Paris. (être)','sont'),
F('Tu ___ quel âge ? (avoir)','as'),
F('J’___ 30 ans. (avoir)','ai'),
F('Elle ___ un chat. (avoir)','a'),
F('Nous ___ faim. (avoir)','avons'),
F('Elles ___ une voiture. (avoir)','ont'),
Q('«Tengo 20 años»:','J’ai 20 ans.','Je suis 20 ans.','J’ai 20.'),
SEC('Artículos', Q('___ musée','le','la','l’')),
Q('___ ville','la','le','les'),
Q('___ hôtel','l’','le','la'),
Q('___ rues','les','la','le'),
Q('___ école','l’','la','le'),
Q('___ mer (el mar)','la','le','l’'),
SEC('Profesiones y ordinales', F('Il est acteur. Elle est ___.','actrice')),
F('Il est vendeur. Elle est ___.','vendeuse'),
F('Il est informaticien. Elle est ___.','informaticienne'),
F('Il est boulanger. Elle est ___.','boulangère'),
F('Il est infirmier. Elle est ___.','infirmière'),
Q('«Soy médico»:','Je suis médecin.','Je suis un médecin.','J’ai médecin.'),
F('3.º = ___','troisième'),
F('1.ª (femenino) = ___','première'),
T('Tengo veinticinco años.','J’ai vingt-cinq ans./J\'ai vingt-cinq ans./J’ai 25 ans./J\'ai 25 ans.'),
T('Ella es periodista.','Elle est journaliste.'),
T('Vivo en París.','J’habite à Paris./J\'habite à Paris.')
],
prod:[
{t:'Tu ficha de identidad', h:'Escribe tu ficha completa: nombre, apellido (deletréalo), edad, nacionalidad, profesión, ciudad, teléfono inventado y e-mail.', model:'Je m’appelle Víctor Chacón. C-H-A-C-O-N. J’ai trente ans. Je suis espagnol. Je suis informaticien. J’habite à Madrid. Mon numéro, c’est le 06 12 34 56 78. Mon e-mail, c’est victor point chacon arobase mail point com.'},
{t:'Mi autorretrato en cifras', h:'Describe tu vida con números: «J’ai 2 frères, 1 chat, 3 langues…».', model:'J’ai 30 ans. J’ai deux sœurs et un chien. Je parle trois langues. J’habite au quatrième étage. J’ai cinq amis français.'},
{t:'Oral', oral:true, h:'Practica: deletrea en voz alta tu nombre completo y tu e-mail. Luego di tu número de teléfono de dos en dos.'}
]
});
