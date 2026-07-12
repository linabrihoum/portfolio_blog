// projectsData.js
//
// To add a new project, add an object to this array:
//   title       — project name
//   description — one or two sentences about what it does
//   image       — a URL or a path under /public (e.g. "/image/my-project.png")
//   link        — GitHub repo or live site URL
//   tech        — list of technologies shown as chips on the card
//   featured    — true = large spotlight card at the top, false = grid card

const projects = [
  {
    id: 1,
    title: "Cloud Job Boards",
    description:
      "A website featuring jobs with an emphasis on cloud, DevOps, and site reliability.",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    link: "https://github.com/linabrihoum/cloud-job-board",
    tech: ["Next.js", "Supabase", "TailwindCSS"],
    featured: true,
  },
  {
    id: 2,
    title: "Raydrin",
    description: "Automatic AI Resume Generator based on job descriptions.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "https://github.com/linabrihoum/raydrin",
    tech: ["React", "OpenAI API", "Node.js"],
    featured: true,
  },
  {
    id: 3,
    title: "Song Genre Predictor",
    description:
      "ML Algorithm that predicts a genre of a song based on certain elements of the music.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    link: "https://github.com/linabrihoum/song-genre-predictor",
    tech: ["Python", "scikit-learn", "Pandas"],
    featured: false,
  },
  {
    id: 4,
    title: "This Website :)",
    description:
      "My personal portfolio using Next.JS, TailwindCSS, and Supabase.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "https://github.com/linabrihoum/portfolio_blog",
    tech: ["Next.js", "TailwindCSS", "Supabase"],
    featured: false,
  },
  {
    id: 5,
    title: "LaTeX Resume Templates",
    description: "Resume templates made for multiple disciplines using LaTeX!",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    link: "https://github.com/linabrihoum/latex-resume-templates",
    tech: ["LaTeX"],
    featured: false,
  },
  {
    id: 6,
    title: "File Sharing Platform",
    description: "Web app to help a company share large files locally.",
    image: "https://images.unsplash.com/photo-1534081333815-ae5019106622",
    link: "https://github.com/linabrihoum/file-sharing-platform",
    tech: ["JavaScript", "Express", "MongoDB"],
    featured: false,
  },
  {
    id: 7,
    title: "xv6",
    description:
      "Implementing various functions to the xv6 unix operating system.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    link: "https://github.com/linabrihoum/xv6",
    tech: ["C", "Operating Systems"],
    featured: false,
  },
  {
    id: 8,
    title: "Fluffy Feelings",
    description:
      "Mobile app to improve mental health with cute pictures of animals.",
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    link: "https://github.com/linabrihoum/FluffyFeelings",
    tech: ["React Native", "Firebase"],
    featured: false,
  },
  {
    id: 9,
    title: "Irma Moves",
    description:
      "Algebraic algorithm to record and describe hurricane movements.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    link: "https://github.com/linabrihoum/Irma_Moves",
    tech: ["Python", "NumPy"],
    featured: false,
  },
];

export default projects;
