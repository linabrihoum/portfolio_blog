// Comet streak colors (cyan → indigo → violet, plus pink and aurora). A plain module,
// not a client one, so server code like the link preview images can read the values.
export const COMET_GRADIENTS = {
  beam: "linear-gradient(90deg,rgba(174,72,255,0) 0%,#6344F5 55%,#18CCFC 92%,#E6FAFF 100%)",
  pink: "linear-gradient(90deg,rgba(174,72,255,0),#FF5FC8 75%,#FFE6F7)",
  aurora: "linear-gradient(90deg,rgba(92,242,176,0),#5CF2B0 70%,#F5F3FF)",
};
