export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  skills: string[];
  coverImage?: string;
  posts: BlogPostMeta[];
}

const blogs: BlogMeta[] = [
  {
    slug: 'stage-obs',
    title: 'Journal de bord : Stage chez Orange Business Services',
    subtitle: 'Intégrateur IoT et développeur mobile',
    summary:
      'Retour sur six semaines d’immersion au cœur du projet Live Tag : entre développement Flutter, conception d’API Python et automatisation via CI/CD en environnement professionnel.',
    skills: ['Flutter', 'Python', 'CI/CD', 'JIRA', 'Red Hat OpenShift', 'GitLab'],
    coverImage: '/images/livetag.png',
    posts: [
      {
        slug: 'mission',
        title: 'Immersion et enjeux du projet Live Tag',
        date: '03/07/2024',
        excerpt: 'Premier contact avec Orange Business Services et découverte de la mission Live Tag : un défi logistique et technique.'
      },
      {
        slug: 'team',
        title: 'Culture agile et dynamique d’équipe',
        date: '09/07/2024',
        excerpt: 'Intégration au sein d’une équipe OBS, gestion de projet via JIRA et réalité opérationnelle du travail collaboratif.'
      },
      {
        slug: 'campus-du-numerique',
        title: 'Innovation : Visite du Campus du Numérique',
        date: '20/07/2024',
        excerpt: 'Mise en avant des projets et importance de la communication technique lors de la préparation d’un stand d’innovation.'
      },
      {
        slug: 'new-skills',
        title: 'Pivot technique : Python, Conteneurs et CI/CD',
        date: '30/07/2024',
        excerpt: 'Au-delà du mobile : conception d’une API Python et orchestration de conteneurs sur Red Hat OpenShift.'
      },
      {
        slug: 'end',
        title: 'Bilan de stage et perspectives',
        date: '10/08/2024',
        excerpt: 'Démonstration finale, bilan des acquis techniques et transition vers un engagement de long terme (alternance).'
      }
    ]
  },
  {
    slug: 'alternance-obs',
    title: 'Journal de bord : Alternance chez Orange Business Services',
    subtitle: 'Intégrateur et développeur fullstack',
    summary:
      'Suivi de mon alternance chez OBS : approfondissement de l’écosystème IoT et déploiement opérationnel de solutions de planification industrielle (PlanetTogether).',
    skills: ['Flutter', 'Python', 'PlanetTogether', 'JIRA', 'GitLab'],
    coverImage: '/images/orangebusinessservices.jpg',
    posts: [
      {
        slug: 'mission',
        title: 'L’ordonnancement industriel avec PlanetTogether',
        date: '01/10/2024',
        excerpt: 'Début de l’alternance et immersion dans les problématiques complexes de planification de production.'
      }
    ]
  }
];

export default blogs;
