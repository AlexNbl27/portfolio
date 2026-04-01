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
    title: 'Blog de stage chez Orange Business Services',
    subtitle: 'Intégrateur IoT et développeur mobile',
    summary:
      'Retour sur mon stage de 6 semaines chez Orange Business Services autour du projet Live Tag, du développement Flutter, d’une API Python et de la découverte des pratiques CI/CD en environnement pro.',
    skills: ['Flutter', 'Python', 'CI/CD', 'JIRA', 'Red Hat OpenShift', 'GitLab'],
    coverImage: '/images/livetag.png',
    posts: [
      {
        slug: 'mission',
        title: 'Découverte du projet',
        date: '03/07/2024',
        excerpt: 'Mes premiers jours chez OBS et la découverte du projet Live Tag.'
      },
      {
        slug: 'team',
        title: 'Intégration dans l’équipe',
        date: '09/07/2024',
        excerpt: 'Une équipe accueillante, la découverte de JIRA et la réalité du travail en entreprise.'
      },
      {
        slug: 'campus-du-numerique',
        title: 'Visite du campus du numérique',
        date: '20/07/2024',
        excerpt: 'Préparation d’un stand et immersion dans un écosystème d’innovation régional.'
      },
      {
        slug: 'new-skills',
        title: 'Acquérir de nouvelles compétences',
        date: '30/07/2024',
        excerpt: 'Développement d’une API Python et premiers déploiements sur OpenShift avec GitLab CI/CD.'
      },
      {
        slug: 'end',
        title: 'Fin du stage',
        date: '10/08/2024',
        excerpt: 'Bilan de stage, démonstration finale et apprentissages retenus.'
      }
    ]
  },
  {
    slug: 'alternance-obs',
    title: 'Blog d’alternance chez Orange Business Services',
    subtitle: 'Intégrateur et développeur fullstack',
    summary:
      'Journal de bord de mon alternance chez OBS, entre continuité sur les sujets IoT et découverte de PlanetTogether et d’un environnement fullstack plus large.',
    skills: ['Flutter', 'Python', 'PlanetTogether', 'JIRA', 'GitLab'],
    coverImage: '/images/orangebusinessservices.jpg',
    posts: [
      {
        slug: 'mission',
        title: 'Découverte du projet PlanetTogether',
        date: '01/10/2024',
        excerpt: 'Début de l’alternance et premières découvertes autour de la planification industrielle.'
      }
    ]
  }
];

export default blogs;
