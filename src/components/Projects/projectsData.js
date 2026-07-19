// projectsData.js
//
// To add a new project, add an object to this array:
//   id          — unique number; cards are displayed in ascending id order
//   title       — project name
//   description — one or two sentences about what it does
//   image       — a direct image URL (must be images.unsplash.com, not an
//                 unsplash.com/photos page link) or a path under /public
//                 (e.g. "/image/my-project.png")
//   link        — GitHub repo or live site URL
//   tech        — list of technologies shown as chips on the card
//   featured    — true = large spotlight card at the top, false = grid card

const projects = [
  {
    id: 1,
    title: "Cloud Job Boards",
    description:
      "A website featuring jobs with an emphasis on cloud, DevOps, and site reliability.",
    image:
      "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1200&auto=format&fit=crop",
    link: "https://github.com/linabrihoum/cloud-job-board",
    tech: ["Next.js", "Supabase", "Javascript"],
    featured: true,
  },
  {
    id: 2,
    title: "This Website :)",
    description:
      "My personal portfolio using Next.JS, Javascript, TailwindCSS, and Supabase.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    link: "https://github.com/linabrihoum/portfolio_blog",
    tech: ["Next.js", "Javascript", "Supabase"],
    featured: true,
  },
  {
    id: 3,
    title: "Finance Bot",
    description:
      "ML Algorithm that compares reinforcement learning and rules-based trading strategies.",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
    link: "https://github.com/linabrihoum/finance-bot",
    tech: ["Python", "scikit-learn", "Pandas"],
    featured: false,
  },
  {
    id: 4,
    title: "Song Genre Predictor",
    description:
      "ML Algorithm that predicts a genre of a song based on certain elements of the music.",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop",
    link: "https://github.com/linabrihoum/song-genre-predictor",
    tech: ["Python", "scikit-learn", "Pandas"],
    featured: false,
  },
  {
    id: 5,
    title: "Raydrin",
    description: "Automatic AI Resume Generator based on job descriptions.",
    image:
      "https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?q=80&w=1200&auto=format&fit=crop",
    link: "https://github.com/linabrihoum/raydrin",
    tech: ["React", "OpenAI API", "Node.js"],
    featured: false,
  },
  {
    id: 6,
    title: "LaTeX Resume Templates",
    description: "Resume templates made for multiple disciplines using LaTeX!",
    image:
      "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?q=80&w=1200&auto=format&fit=crop",
    link: "https://github.com/linabrihoum/latex-resume-templates",
    tech: ["LaTeX"],
    featured: false,
  },
];

export default projects;
