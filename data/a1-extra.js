/* Verbos: pr = presente (je..ils sin pronombre), pp = participio, aux */
COURSE.verbs = [
{inf:'être',es:'ser / estar',g:'irregular',pr:['suis','es','est','sommes','êtes','sont'],pp:'été',aux:'avoir',imp:'sois, soyons, soyez'},
{inf:'avoir',es:'tener / haber',g:'irregular',pr:['ai','as','a','avons','avez','ont'],pp:'eu',aux:'avoir',imp:'aie, ayons, ayez'},
{inf:'aller',es:'ir',g:'irregular',pr:['vais','vas','va','allons','allez','vont'],pp:'allé',aux:'être',imp:'va, allons, allez'},
{inf:'venir',es:'venir',g:'irregular',pr:['viens','viens','vient','venons','venez','viennent'],pp:'venu',aux:'être',imp:'viens, venons, venez'},
{inf:'faire',es:'hacer',g:'irregular',pr:['fais','fais','fait','faisons','faites','font'],pp:'fait',aux:'avoir',imp:'fais, faisons, faites'},
{inf:'prendre',es:'tomar / coger',g:'irregular',pr:['prends','prends','prend','prenons','prenez','prennent'],pp:'pris',aux:'avoir',imp:'prends, prenons, prenez'},
{inf:'pouvoir',es:'poder',g:'irregular',pr:['peux','peux','peut','pouvons','pouvez','peuvent'],pp:'pu',aux:'avoir',imp:'—'},
{inf:'vouloir',es:'querer',g:'irregular',pr:['veux','veux','veut','voulons','voulez','veulent'],pp:'voulu',aux:'avoir',imp:'veuillez (cortesía)'},
{inf:'devoir',es:'deber',g:'irregular',pr:['dois','dois','doit','devons','devez','doivent'],pp:'dû',aux:'avoir',imp:'—'},
{inf:'sortir',es:'salir',g:'irregular',pr:['sors','sors','sort','sortons','sortez','sortent'],pp:'sorti',aux:'être',imp:'sors, sortons, sortez'},
{inf:'partir',es:'irse / marcharse',g:'irregular',pr:['pars','pars','part','partons','partez','partent'],pp:'parti',aux:'être',imp:'pars, partons, partez'},
{inf:'dormir',es:'dormir',g:'irregular',pr:['dors','dors','dort','dormons','dormez','dorment'],pp:'dormi',aux:'avoir',imp:'dors, dormons, dormez'},
{inf:'boire',es:'beber',g:'irregular',pr:['bois','bois','boit','buvons','buvez','boivent'],pp:'bu',aux:'avoir',imp:'bois, buvons, buvez'},
{inf:'lire',es:'leer',g:'irregular',pr:['lis','lis','lit','lisons','lisez','lisent'],pp:'lu',aux:'avoir',imp:'lis, lisons, lisez'},
{inf:'écrire',es:'escribir',g:'irregular',pr:['écris','écris','écrit','écrivons','écrivez','écrivent'],pp:'écrit',aux:'avoir',imp:'écris, écrivons, écrivez'},
{inf:'voir',es:'ver',g:'irregular',pr:['vois','vois','voit','voyons','voyez','voient'],pp:'vu',aux:'avoir',imp:'vois, voyons, voyez'},
{inf:'savoir',es:'saber',g:'irregular',pr:['sais','sais','sait','savons','savez','savent'],pp:'su',aux:'avoir',imp:'sache, sachons, sachez'},
{inf:'mettre',es:'poner',g:'irregular',pr:['mets','mets','met','mettons','mettez','mettent'],pp:'mis',aux:'avoir',imp:'mets, mettons, mettez'},
{inf:'dire',es:'decir',g:'irregular',pr:['dis','dis','dit','disons','dites','disent'],pp:'dit',aux:'avoir',imp:'dis, disons, dites'},
{inf:'connaître',es:'conocer',g:'irregular',pr:['connais','connais','connaît','connaissons','connaissez','connaissent'],pp:'connu',aux:'avoir',imp:'—'},
{inf:'parler',es:'hablar',g:'regular -er',pr:['parle','parles','parle','parlons','parlez','parlent'],pp:'parlé',aux:'avoir',imp:'parle, parlons, parlez'},
{inf:'aimer',es:'gustar / amar',g:'regular -er',pr:['aime','aimes','aime','aimons','aimez','aiment'],pp:'aimé',aux:'avoir',imp:'aime, aimons, aimez'},
{inf:'habiter',es:'vivir (en)',g:'regular -er',pr:['habite','habites','habite','habitons','habitez','habitent'],pp:'habité',aux:'avoir',imp:'habite, habitons, habitez'},
{inf:'travailler',es:'trabajar',g:'regular -er',pr:['travaille','travailles','travaille','travaillons','travaillez','travaillent'],pp:'travaillé',aux:'avoir',imp:'travaille, travaillons, travaillez'},
{inf:'jouer',es:'jugar / tocar',g:'regular -er',pr:['joue','joues','joue','jouons','jouez','jouent'],pp:'joué',aux:'avoir',imp:'joue, jouons, jouez'},
{inf:'manger',es:'comer',g:'regular -er (nous mangeons)',pr:['mange','manges','mange','mangeons','mangez','mangent'],pp:'mangé',aux:'avoir',imp:'mange, mangeons, mangez'},
{inf:'acheter',es:'comprar',g:'regular -er (è)',pr:['achète','achètes','achète','achetons','achetez','achètent'],pp:'acheté',aux:'avoir',imp:'achète, achetons, achetez'},
{inf:'préférer',es:'preferir',g:'regular -er (è)',pr:['préfère','préfères','préfère','préférons','préférez','préfèrent'],pp:'préféré',aux:'avoir',imp:'—'},
{inf:'appeler',es:'llamar',g:'regular -er (ll)',pr:['appelle','appelles','appelle','appelons','appelez','appellent'],pp:'appelé',aux:'avoir',imp:'appelle, appelons, appelez'},
{inf:'finir',es:'terminar',g:'regular -ir',pr:['finis','finis','finit','finissons','finissez','finissent'],pp:'fini',aux:'avoir',imp:'finis, finissons, finissez'},
{inf:'choisir',es:'elegir',g:'regular -ir',pr:['choisis','choisis','choisit','choisissons','choisissez','choisissent'],pp:'choisi',aux:'avoir',imp:'choisis, choisissons, choisissez'},
{inf:'arriver',es:'llegar',g:'regular -er',pr:['arrive','arrives','arrive','arrivons','arrivez','arrivent'],pp:'arrivé',aux:'être',imp:'arrive, arrivons, arrivez'},
{inf:'rester',es:'quedarse',g:'regular -er',pr:['reste','restes','reste','restons','restez','restent'],pp:'resté',aux:'être',imp:'reste, restons, restez'},
{inf:'se lever',es:'levantarse',g:'pronominal',refl:true,pr:['me lève','te lèves','se lève','nous levons','vous levez','se lèvent'],pp:'levé',aux:'être',imp:'lève-toi, levons-nous, levez-vous'},
{inf:'s’appeler',es:'llamarse',g:'pronominal',refl:true,pr:['m’appelle','t’appelles','s’appelle','nous appelons','vous appelez','s’appellent'],pp:'appelé',aux:'être',imp:'—'},
{inf:'se coucher',es:'acostarse',g:'pronominal',refl:true,pr:['me couche','te couches','se couche','nous couchons','vous couchez','se couchent'],pp:'couché',aux:'être',imp:'couche-toi, couchons-nous, couchez-vous'}
];

COURSE.grammarExtra = [
{t:'Esquema de la frase francesa', h:`<p><b>Afirmativa:</b> sujeto + (ne) + (pronombre) + verbo + (pas) + complemento.</p><p><span class="fr" data-say="Je ne le mange pas.">Je ne le mange pas.</span> · <span class="fr" data-say="Elle n'y va pas demain.">Elle n’y va pas demain.</span> · <span class="fr" data-say="Nous ne nous levons pas tôt.">Nous ne nous levons pas tôt.</span></p><p>En pasado: <i>Je ne l’ai pas mangé.</i> · Futuro próximo: <i>Je ne vais pas le manger.</i></p>`},
{t:'Todos los artículos de un vistazo', h:TB(['Tipo','Masc.','Fem.','Vocal','Plural','Tras negación'],[['Definido','le','la','l’','les','no cambia'],['Indefinido','un','une','un / une','des','de / d’'],['Partitivo','du','de la','de l’','des','de / d’'],['à + definido','au','à la','à l’','aux','—'],['de + definido','du','de la','de l’','des','—']])},
{t:'Los determinantes', h:TB(['Tipo','Masc. sing.','Fem. sing.','Plural'],[['Posesivo (je)','mon','ma (mon + vocal)','mes'],['Posesivo (tu)','ton','ta','tes'],['Posesivo (il/elle)','son','sa','ses'],['Posesivo (nous / vous / ils)','notre / votre / leur','notre / votre / leur','nos / vos / leurs'],['Demostrativo','ce / cet','cette','ces'],['Interrogativo','quel','quelle','quels / quelles']])},
{t:'Los pronombres', h:TB(['Sujeto','Tónico','Reflexivo','COD'],[['je','moi','me','me'],['tu','toi','te','te'],['il','lui','se','le'],['elle','elle','se','la'],['nous','nous','nous','nous'],['vous','vous','vous','vous'],['ils','eux','se','les'],['elles','elles','se','les']])+`<p>Y además <b>y</b> (lugar: allí) y <b>on</b> (nosotros / la gente).</p>`},
{t:'Los tiempos del A1', h:TB(['Tiempo','Formación','Ejemplo','Uso'],[['Presente','raíz + -e, -es, -e, -ons, -ez, -ent (verbos -er)','Je parle français.','Hábitos, descripciones, ahora'],['Futuro próximo','aller + infinitivo','Je vais partir.','Planes, futuro cercano'],['Passé composé','avoir / être + participio','J’ai mangé. Je suis parti(e).','Acciones pasadas terminadas'],['Imperativo','presente sin sujeto (tu, nous, vous)','Viens ! Allons-y ! Écoutez !','Órdenes, consejos, recetas'],['Pasado reciente (extra)','venir de + infinitivo','Je viens de manger.','Acabar de'],['Presente continuo (extra)','être en train de + infinitivo','Je suis en train de lire.','Estar haciendo algo']])},
{t:'Errores típicos de hispanohablantes', h:`<ul class="clean"><li>❌ Je suis 20 ans → ✅ <b>J’ai</b> 20 ans.</li><li>❌ Me gusta… = «Me plaît» → ✅ <b>J’aime</b>…</li><li>❌ Soy un profesor → ✅ Je suis professeur (sin artículo).</li><li>❌ Olvidar el sujeto: «Parle français» → ✅ <b>Je</b> parle français.</li><li>❌ Je ne mange pas du pain → ✅ Je ne mange pas <b>de</b> pain.</li><li>❌ Je vais à France → ✅ Je vais <b>en</b> France.</li><li>❌ La problema → ✅ <b>le</b> problème (y: le lait, la mer, le nez, la voiture).</li><li>❌ Pronunciar todas las letras: «París» con s → ✅ [parí].</li><li>❌ «Je suis allé» para una chica → ✅ Je suis allé<b>e</b>.</li><li>❌ «Il y a» en plural «il y ont» → ✅ il y a (siempre).</li></ul>`}
];

COURSE.phonetics = `<div class="card"><h2 style="margin-top:0">Tabla de sonidos y grafías</h2><p>Pulsa los ejemplos para escucharlos.</p>`+TB(['Grafía','Sonido aproximado','Ejemplos'],[
['ou','u española','vous, rouge, jour'],['u','i con labios de u','tu, rue, salut'],['oi','ua','moi, voiture, trois'],['au / eau','o','chaud, beau, eau'],['ai / ei','e abierta','lait, maison, neige'],['é / -er / -ez','e cerrada','été, manger, nez'],['è / ê','e abierta','père, fête'],['eu / œu','e con labios redondos','deux, bleu, sœur, heure'],['e (final o átona)','muda o «ö» débil','madame, le, petit'],['an / en / am / em','a nasal','France, enfant, temps'],['on / om','o nasal','bon, nom, Japon'],['in / ain / ein / un','e nasal','vin, pain, plein, lundi'],['ch','sh inglesa','chat, chocolat'],['j / ge / gi','y argentina suave','je, manger, girafe'],['gn','ñ','montagne, champignon'],['ill (tras vocal)','y','fille, travailler, famille'],['qu','k','qui, quatre'],['ç / ce / ci','s','ça, merci, ce'],['s entre vocales','z','maison, rose, cuisine'],['ss','s','poisson, aussi'],['h','nunca se pronuncia','hôtel, homme, heure'],['r','r gutural (garganta)','Paris, rouge, merci'],['th','t','thé, théâtre'],['ph','f','photo, pharmacie']])+`</div>
<div class="card"><h2 style="margin-top:0">Pares mínimos para entrenar el oído</h2><p>Escucha y repite. ¿Notas la diferencia?</p>`+TB(['Par','Contraste'],[['dessus / dessous','[y] / [u]'],['vu / vous','[y] / [u]'],['le / les','[ə] / [e]'],['deux / des','[ø] / [e]'],['beau / bon','[o] / [ɔ̃]'],['vin / vent','[ɛ̃] / [ɑ̃]'],['chou / joue','[ʃ] / [ʒ]'],['poisson / poison','[s] / [z]'],['ils sont / ils ont','[s] / [z]']])+`</div>`;

/* ---------- DELF A1 ---------- */
COURSE.delfInfo = {A1:`<h1>🎓 El examen DELF A1</h1>
<div class="card"><p>El <b>DELF</b> (Diplôme d’études en langue française) es el diploma oficial del Ministerio de Educación francés, gestionado por France Éducation international. Es <b>válido de por vida</b> y está reconocido en todo el mundo. Se puede hacer en los Institutos Franceses y Alianzas Francesas de España varias veces al año. Existen versiones «tout public», «junior» y «prim».</p>
<p>El nivel <b>A1</b> corresponde al primer nivel del Marco Común Europeo (MCER): «usuario básico». Validas que puedes comunicarte de forma sencilla sobre ti mismo y tu entorno inmediato.</p></div>
<div class="card"><h2 style="margin-top:0">Las 4 pruebas (total 100 puntos)</h2>`+TB(['Prueba','Duración','Puntos','Qué tienes que hacer'],[
['<b>Compréhension de l’oral</b> (comprensión oral)','unos 20 min','/25','Responder preguntas sobre 3–4 grabaciones muy cortas de la vida cotidiana (anuncios, mensajes de contestador, instrucciones, diálogos). Se escucha cada documento 2 veces.'],
['<b>Compréhension des écrits</b> (comprensión escrita)','30 min','/25','Leer 4–5 documentos cortos (correo, anuncio, cartel, horario, menú, indicaciones) y contestar preguntas de opción múltiple o respuesta breve.'],
['<b>Production écrite</b> (expresión escrita)','30 min','/25','1) Rellenar un formulario (nombre, nacionalidad, dirección, gustos…). 2) Escribir un mensaje sencillo de unas 40–50 palabras (postal, correo, invitación, nota) describiendo hechos cotidianos.'],
['<b>Production orale</b> (expresión oral)','5–7 min + 10 min de preparación','/25','1) Entretien dirigé: te presentas respondiendo preguntas. 2) Échange d’informations: haces preguntas al examinador a partir de palabras escritas en tarjetas. 3) Dialogue simulé: role-play de compra (pedir, preguntar el precio, pagar) con imágenes de objetos.']])+`
<div class="note">✅ <b>Aprobar:</b> mínimo <b>50/100</b> en total y al menos <b>5/25</b> en cada prueba. Las tres primeras son colectivas (≈1 h 20 en total); la oral es individual, a veces otro día.</div></div>
<div class="card"><h2 style="margin-top:0">Qué debes saber hacer en A1 (según el MCER)</h2><ul class="clean">
<li><b>Escuchar:</b> entender palabras y frases muy básicas sobre ti, tu familia y tu entorno cuando se habla despacio y claro.</li>
<li><b>Leer:</b> entender nombres, palabras y frases muy sencillas en carteles, anuncios y catálogos.</li>
<li><b>Hablar (conversación):</b> participar en una conversación simple si el otro repite o reformula; hacer y responder preguntas sencillas sobre necesidades inmediatas.</li>
<li><b>Hablar (monólogo):</b> describir dónde vives y a la gente que conoces con frases simples.</li>
<li><b>Escribir:</b> escribir postales cortas, rellenar formularios con datos personales.</li></ul></div>
<div class="card"><h2 style="margin-top:0">Temas frecuentes</h2><div class="chips">${['Presentarse','Familia','Vivienda','Rutina y horarios','Ocio y gustos','Comida y restaurante','Compras y precios','Ciudad y direcciones','Transportes','Tiempo y fechas','Vacaciones','El tiempo meteorológico','Ropa','Trabajo y estudios','Salud básica'].map(x=>`<span class="chip">${x}</span>`).join('')}</div>
<p>En esta web, <b>todas</b> estas competencias están cubiertas por las unidades 00–08.</p></div>
<div class="card"><h2 style="margin-top:0">Consejos para el día del examen</h2><ul class="clean">
<li>Lee las preguntas <b>antes</b> de escuchar el audio.</li><li>Respeta el número de palabras en la expresión escrita (un texto demasiado corto pierde puntos).</li><li>Empieza y termina los mensajes con fórmulas: <i>Salut / Bonjour… Bises / À bientôt / Cordialement</i>.</li><li>En el oral, sonríe, saluda, habla despacio y si no entiendes di <i>« Pouvez-vous répéter, s’il vous plaît ? »</i>.</li><li>En el role-play usa <b>vous</b> con el vendedor y fórmulas de cortesía.</li></ul></div>
<div class="row"><a class="btn" href="#/simulacro">Hacer el simulacro →</a></div>`};

COURSE.exam = {A1:{parts:[
{t:'1. Compréhension de l’oral', info:'Pulsa para escuchar cada documento (máximo 2 veces) y responde.', docs:[
{audio:'Bonjour, c’est Julien. Je t’appelle pour samedi. Le rendez-vous est à quinze heures, devant la gare. N’oublie pas ton maillot de bain, on va à la piscine. À samedi !', qs:[
Q('¿Qué día es la cita?','samedi','dimanche','vendredi'),Q('¿A qué hora?','15 h','5 h','13 h'),Q('¿Dónde quedan?','devant la gare','devant la piscine','à la maison'),Q('¿Qué debe llevar?','un maillot de bain','un livre','un parapluie')]},
{audio:'Mesdames et messieurs, le train numéro quatre cent douze à destination de Lyon partira du quai numéro sept, avec dix minutes de retard. Merci de votre compréhension.', qs:[
Q('¿Destino del tren?','Lyon','Lille','Nice'),Q('¿Andén?','7','17','12'),Q('¿Qué pasa con el tren?','Tiene 10 minutos de retraso','Está cancelado','Sale antes')]},
{audio:'Bonjour madame, je voudrais un kilo de tomates et une barquette de fraises, s’il vous plaît. — Voilà. Ça fait six euros cinquante. — Je peux payer par carte ? — Oui, bien sûr.', qs:[
Q('¿Dónde están?','Au marché','À la pharmacie','À la banque'),Q('¿Cuánto paga?','6,50 €','16,50 €','5,60 €'),Q('¿Cómo paga?','Con tarjeta','En efectivo','No paga')]},
{audio:'Salut, moi c’est Nadia. J’ai vingt-huit ans et je suis infirmière. J’habite à Bordeaux avec mon mari et notre fils. Le week-end, j’adore faire du vélo et cuisiner.', qs:[
Q('¿Edad de Nadia?','28','38','24'),Q('¿Profesión?','infirmière','professeure','vendeuse'),Q('¿Con quién vive?','Con su marido y su hijo','Sola','Con sus padres'),Q('¿Qué le gusta?','Montar en bici y cocinar','El cine','Leer')]}
]},
{t:'2. Compréhension des écrits', info:'Lee los documentos y responde. Tiempo recomendado: 30 minutos.', docs:[
{text:`<b>De :</b> claire.martin@mail.fr\n<b>Objet :</b> Fête !\n\nSalut Marc,\nSamedi prochain, c’est mon anniversaire ! Je fais une petite fête chez moi, 12 rue des Lilas, à partir de 19 h. Il y a un repas et après on va danser. Tu peux apporter une boisson ? Mon appartement est au 4e étage, il n’y a pas d’ascenseur, désolée !\nRéponds-moi avant jeudi.\nBises,\nClaire`, qs:[
Q('¿Por qué hace una fiesta Claire?','Es su cumpleaños','Se muda','Termina sus estudios'),Q('¿A qué hora empieza?','A partir de las 19 h','A las 12 h','A las 4 h'),Q('¿Qué debe llevar Marc?','Una bebida','Un pastel','Música'),Q('¿Cuándo debe responder?','Antes del jueves','El sábado','No tiene que responder'),F('¿En qué piso vive Claire? (escribe el número)','4/cuatro/quatre/4e')]},
{text:`<b>MUSÉE DE LA VILLE</b>\nOuvert du mardi au dimanche, de 10 h à 18 h.\nFermé le lundi.\nTarif : 8 € — Étudiants : 5 € — Gratuit pour les moins de 18 ans.\nLe premier dimanche du mois : entrée gratuite pour tous.\nInterdit de manger et de boire dans les salles.`, qs:[
Q('¿Qué día cierra el museo?','El lunes','El domingo','El martes'),Q('¿Cuánto paga un estudiante?','5 €','8 €','Nada'),Q('¿Quién entra gratis siempre?','Los menores de 18 años','Los estudiantes','Los jubilados'),Q('¿Qué está prohibido?','Comer y beber','Hacer fotos','Hablar')]},
{text:`<b>À LOUER</b> — Studio meublé 25 m², centre-ville, 2e étage avec ascenseur. Cuisine équipée, salle de douche. Proche tram et commerces. 520 € charges comprises. Idéal étudiant. Libre le 1er octobre. Tél. : 06 45 78 21 09`, qs:[
Q('¿Qué tipo de vivienda es?','Un estudio amueblado','Una casa con jardín','Un piso de 3 dormitorios'),Q('¿Hay ascensor?','Sí','No','No se sabe'),Q('El precio…','incluye los gastos','no incluye los gastos','es por semana'),Q('¿Desde cuándo está libre?','1 de octubre','1 de septiembre','Ahora')]}
]},
{t:'3. Production écrite', info:'Escribe en francés. Autoevalúate con los criterios de abajo (o pide a un nativo/profesor que lo corrija).', write:[
'<b>Ejercicio 1 — Formulario.</b> Te inscribes en un club de deporte. Escribe: Nom, Prénom, Âge, Nationalité, Adresse, Profession, Sport préféré, Jours disponibles.',
'<b>Ejercicio 2 — Mensaje (40–50 palabras).</b> Estás de vacaciones. Escribe una postal a un amigo francés: dónde estás, con quién, qué tiempo hace, qué haces, qué te gusta.'],
oral:`<div class="note"><b>Criterios (sobre 25):</b> respetar la consigna y la longitud · dar la información pedida · fórmulas de saludo y despedida · vocabulario adecuado · gramática básica (presente, concordancias, artículos) · ortografía.</div><details><summary style="cursor:pointer;color:var(--blue)">Ver una postal modelo</summary><div class="note">Salut Paul ! Je suis en vacances à Nice avec ma sœur. Il fait très beau et chaud. Le matin, on va à la plage et l’après-midi, on visite la ville. J’adore la vieille ville et les marchés. Le soir, on mange des spécialités. On rentre dimanche. Bises, Ana</div></details>`},
{t:'4. Production orale', info:'Prepárala en voz alta, grabándote con el móvil. Prepara 10 minutos las partes 2 y 3.', oral:`
<h3>Parte 1 · Entretien dirigé (1 min)</h3><p>Responde en voz alta: <i>Comment vous appelez-vous ? Quel âge avez-vous ? Vous êtes de quelle nationalité ? Où habitez-vous ? Qu’est-ce que vous faites dans la vie ? Vous avez des frères et sœurs ? Qu’est-ce que vous aimez faire le week-end ? Pourquoi vous apprenez le français ?</i></p>
<h3>Parte 2 · Échange d’informations (2 min)</h3><p>Haz una pregunta al examinador con cada palabra: <span class="chip">Sport ?</span> <span class="chip">Âge ?</span> <span class="chip">Week-end ?</span> <span class="chip">Animal ?</span> <span class="chip">Vacances ?</span> <span class="chip">Cuisine ?</span></p><details><summary style="cursor:pointer;color:var(--blue)">Ejemplos</summary><p>Est-ce que vous faites du sport ? · Quel âge avez-vous ? · Qu’est-ce que vous faites le week-end ? · Vous avez un animal ? · Où allez-vous en vacances ? · Vous aimez cuisiner ?</p></details>
<h3>Parte 3 · Dialogue simulé (2 min)</h3><p>Estás en una tienda de ropa. Quieres comprar un jersey y unos zapatos. Pregunta los colores, las tallas, los precios y paga. Precios: jersey 35 €, zapatos 59,90 €.</p>
<div class="note"><b>Criterios:</b> presentarse y responder · formular preguntas correctas · saludar y despedirse con cortesía · usar vous · pronunciación comprensible · números y precios correctos.</div>`}
]}};

COURSE.nextInfo = `<h1>🚀 Tu camino: A1 → A2 → B1 → B2</h1>
<div class="card"><h2 style="margin-top:0">¿Estás listo para el A2?</h2><div id="readiness"></div></div>
<div class="card"><h2 style="margin-top:0">El mapa de niveles (MCER)</h2>`+TB(['Nivel','Horas aprox. acumuladas','Qué podrás hacer','Diploma'],[
['A1 · Découverte','60–100 h','Presentarte, hablar de tu entorno inmediato con frases simples','DELF A1'],
['A2 · Survie','160–200 h','Contar experiencias en pasado, hacer gestiones en la vida diaria','DELF A2'],
['B1 · Seuil','350–400 h','Desenvolverte en viajes, dar tu opinión, contar sueños y proyectos','DELF B1'],
['B2 · Avancé','550–650 h','Argumentar, entender noticias y series, trabajar en francés','DELF B2'],
['C1 / C2','800–1000 h +','Dominio casi nativo','DALF C1 / C2']])+`</div>
<div class="card"><h2 style="margin-top:0">Qué vendrá en el A2</h2><ul class="clean">
<li><b>Imperfecto</b> (imparfait) y su contraste con el passé composé: describir el pasado.</li>
<li><b>Futuro simple</b>: je parlerai, j’irai…</li><li><b>Condicional</b> de cortesía: je voudrais, j’aimerais, pourriez-vous…</li>
<li><b>Pronombres COI</b> (lui, leur), <b>en</b> y doble pronombre básico.</li><li><b>Comparativo y superlativo</b>: plus… que, le meilleur.</li>
<li><b>Pronombres relativos</b> qui, que, où.</li><li>Vocabulario: salud, el tiempo meteorológico, trabajo, estudios, medio ambiente, medios de comunicación, viajes.</li></ul>
<p class="muted">Cuando completes el A1, vuelve a pedírmelo y añado el nivel A2 a esta misma web, con el mismo formato.</p></div>
<div class="card"><h2 style="margin-top:0">Recursos gratuitos para complementar</h2><ul class="clean">
<li><b>TV5Monde – Apprendre le français</b>: ejercicios con vídeos reales por nivel.</li>
<li><b>RFI – Journal en français facile</b>: noticias diarias en francés sencillo (10 min).</li>
<li><b>France Éducation international</b>: ejemplos oficiales de exámenes DELF.</li>
<li>Series con subtítulos en francés; canciones con letra; podcasts para principiantes.</li></ul></div>`;
