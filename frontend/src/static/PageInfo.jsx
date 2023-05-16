import StoryImage from "../assets/page-images/stories.png";
import IdeasImage from "../assets/page-images/ideas.png";
import WritingImage from "../assets/page-images/notes.png";
import ReferencesImage from "../assets/page-images/references.png";


const pageInfo = [
    {
        pageName: "Stories",
        pageImage: StoryImage,
        pageDescription: "See all archived stories.",
        pageLink: "/stories",
    },
    {
      pageName: "About",
      pageImage: WritingImage,
      pageDescription: "Learn about the author.",
      pageLink: "/about",
  },
    /* Work in progress
    {
        pageName: "Story Ideas",
        pageImage: IdeasImage,
        pageDescription: "See all in-progress stories",
        pageLink: "/ideas",
      },
      {
        pageName: "Writing Notes",
        pageImage: WritingImage,
        pageDescription: "See general writing notes",
        pageLink: "/notes",
      },
      {
        pageName: "References",
        pageImage: ReferencesImage,
        pageDescription: "See analyses of popular stories",
        pageLink: "/references",
      },*/
  ];
  
  export { pageInfo };
