// Editorial seed data: statuses are attributed claims, NOT independent benchmarks.
// Do not present unsourced readiness scores as measured percentages.
export const categories = [
  { id: 'all', label: 'Tout explorer' },
  { id: 'creative', label: 'Création' },
  { id: 'office', label: 'Bureautique' },
  { id: 'design', label: 'Design & CAO' },
  { id: 'productivity', label: 'Productivité' },
  { id: 'media', label: 'Audio & vidéo' }
];

const p = (id, name, repository, mode, maturity, summary, features = []) => ({
  id, name, repository, mode, maturity, summary,
  lastReviewed: '2026-10-16',
  evidence: { type: 'repository', url: `https://github.com/${repository}`, level: 'source-declared' },
  features
});

export const software = [
  {
    slug:'photoshop', name:'Adobe Photoshop', maker:'Adobe', category:'creative', color:'#4353FF', initials:'Ps',
    pitch:'Retouche photo, compositions et édition bitmap professionnelle.',
    features:['Édition par calques','Masques','Import PSD','Retouche non destructive','Export haute fidélité'],
    projects:[
      p('photocraft','PhotoCraft','storytold/photocraft','rebuild','alpha','Réimplémentation expérimentale orientée édition photo.',[
        ['Édition par calques','declared'],['Masques','unknown'],['Import PSD','unknown']]),
      p('gimp','GIMP','GNOME/gimp','alternative','established','Éditeur d’images libre, avec ses propres workflows.',[
        ['Édition par calques','documented'],['Masques','documented'],['Import PSD','partial']]),
      p('krita','Krita','KDE/krita','alternative','established','Peinture numérique et édition raster.',[
        ['Édition par calques','documented'],['Import PSD','partial']])
    ]
  },
  {
    slug:'illustrator',name:'Adobe Illustrator',maker:'Adobe',category:'creative',color:'#FF8F31',initials:'Ai',
    pitch:'Illustration vectorielle, typographie et identités visuelles.',
    features:['Tracés vectoriels','Opérations booléennes','Import AI','Export SVG'],
    projects:[
      p('vectorcraft','VectorCraft','storytold/vectorcraft','rebuild','alpha','Projet de recréation des outils vectoriels.',[['Tracés vectoriels','declared'],['Export SVG','declared'],['Import AI','unknown']]),
      p('inkscape','Inkscape','inkscape/inkscape','alternative','established','Éditeur vectoriel libre axé sur SVG.',[['Tracés vectoriels','documented'],['Export SVG','documented']])
    ]
  },
  {
    slug:'premiere-pro',name:'Adobe Premiere Pro',maker:'Adobe',category:'media',color:'#9C83FF',initials:'Pr',
    pitch:'Montage vidéo, timeline multi-pistes et post-production.',
    features:['Timeline','Montage multipiste','Transitions','Export vidéo','Projets Premiere'],
    projects:[
      p('filmcraft','FilmCraft','storytold/filmcraft','rebuild','alpha','Éditeur vidéo expérimental.',[['Timeline','declared'],['Projets Premiere','unknown']]),
      p('kdenlive','Kdenlive','KDE/kdenlive','alternative','established','Montage vidéo libre et multiplateforme.',[['Timeline','documented'],['Export vidéo','documented']])
    ]
  },
  {
    slug:'after-effects',name:'Adobe After Effects',maker:'Adobe',category:'media',color:'#9E7DDE',initials:'Ae',
    pitch:'Animation graphique, effets et compositing.',
    features:['Calques','Compositions','Images clés','Effets','Export vidéo'],
    projects:[p('effectcraft','EffectCraft','storytold/effectcraft','rebuild','alpha','Reconstruction open source encore en alpha.',[['Calques','declared'],['Images clés','declared']])]
  },
  {
    slug:'excel',name:'Microsoft Excel',maker:'Microsoft',category:'office',color:'#10835F',initials:'Xl',
    pitch:'Tableurs, formules, analyses et automatisations.',
    features:['Formules','Formats XLSX','Graphiques','Tableaux croisés','Macros VBA'],
    projects:[
      p('gridcraft','GridCraft','storytold/gridcraft','rebuild','alpha','Tableur en cours de reconstruction ; ne pas assimiler commandes présentes et compatibilité réelle.',[['Formules','declared'],['Formats XLSX','unknown']]),
      p('libreoffice','LibreOffice Calc','LibreOffice/core','alternative','established','Tableur mature, interopérabilité variable selon les fichiers.',[['Formules','documented'],['Formats XLSX','partial']])
    ]
  },
  {
    slug:'word',name:'Microsoft Word',maker:'Microsoft',category:'office',color:'#3478CE',initials:'Wd',
    pitch:'Rédaction et édition de documents complexes.',
    features:['Styles','Commentaires','Révisions','Import DOCX','Export PDF'],
    projects:[
      p('wordcraft','WordCraft','storytold/wordcraft','rebuild','alpha','Traitement de texte en développement.',[['Styles','declared'],['Import DOCX','unknown']]),
      p('libreoffice-writer','LibreOffice Writer','LibreOffice/core','alternative','established','Traitement de texte open source.',[['Styles','documented'],['Import DOCX','partial']])
    ]
  },
  {
    slug:'powerpoint',name:'Microsoft PowerPoint',maker:'Microsoft',category:'office',color:'#E96845',initials:'Pp',
    pitch:'Présentations, diapositives et narration visuelle.',
    features:['Diapositives','Animations','Import PPTX','Export PDF'],
    projects:[p('deckcraft','DeckCraft','storytold/deckcraft','rebuild','alpha','Réimplémentation en développement.',[['Diapositives','declared'],['Import PPTX','unknown']])]
  },
  {
    slug:'autocad',name:'Autodesk AutoCAD',maker:'Autodesk',category:'design',color:'#ED5147',initials:'AC',
    pitch:'Dessin technique, CAO 2D et modélisation.',
    features:['Dessin 2D','Cotation','Import DWG','Export DXF'],
    projects:[
      p('cadcraft','CADCraft','storytold/cadcraft','rebuild','experimental','Projet de CAO en phase précoce.',[['Dessin 2D','declared'],['Import DWG','unknown']]),
      p('librecad','LibreCAD','LibreCAD/LibreCAD','alternative','established','Outils de CAO 2D libres.',[['Dessin 2D','documented'],['Export DXF','documented']])
    ]
  },
  {
    slug:'figma',name:'Figma',maker:'Figma',category:'design',color:'#8855DA',initials:'Fi',
    pitch:'Interface design, composants et collaboration.',
    features:['Composants','Auto-layout','Collaboration','Import Figma','Prototypage'],
    projects:[
      p('penpot','Penpot','penpot/penpot','alternative','established','Outil collaboratif de conception open source.',[['Composants','documented'],['Collaboration','documented']]),
      p('openpencil','OpenPencil','open-pencil/open-pencil','alternative','developing','Projet open source à vérifier avant recommandation.',[['Import Figma','unknown']])
    ]
  },
  {
    slug:'notion',name:'Notion',maker:'Notion',category:'productivity',color:'#383F4B',initials:'No',
    pitch:'Documents, bases de données et espaces de travail.',
    features:['Blocs','Bases de données','Collaboration','Import Notion'],
    projects:[
      p('appflowy','AppFlowy','AppFlowy-IO/AppFlowy','alternative','established','Espace de travail orienté notes et bases de données.',[['Blocs','documented'],['Bases de données','documented']]),
      p('affine','AFFiNE','toeverything/AFFiNE','alternative','established','Espace de connaissance open source.',[['Blocs','documented']])
    ]
  }
];

export const projectCount = software.reduce((n,s)=>n+s.projects.length,0);
export const findSoftware = slug => software.find(x=>x.slug===slug);
export const allProjects = software.flatMap(s=>s.projects.map(p=>({...p, software: s.name, softwareSlug: s.slug})));
export const verifyCatalog = () => {
  const problems = [];
  const slugs = new Set();
  for (const app of software) {
    if(slugs.has(app.slug)) problems.push('Duplicate software '+app.slug);
    slugs.add(app.slug);
    if(!app.features?.length || !app.projects?.length) problems.push('Empty app '+app.slug);
    for(const project of app.projects) {
      if(!/^[\w.-]+\/[\w.-]+$/.test(project.repository)) problems.push('Invalid repository '+project.id);
      if(!project.evidence?.url || !project.lastReviewed) problems.push('Missing source '+project.id);
      if(project.features?.some(f=>!['declared','documented','partial','verified','unknown'].includes(f[1]))) problems.push('Bad evidence '+project.id);
    }
  }
  return problems;
};
