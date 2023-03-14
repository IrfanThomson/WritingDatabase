import StoryImage from "../assets/page-images/chrome.jpg";
import IdeasImage from "../assets/page-images/swordhero.png";
import WritingImage from "../assets/page-images/rift.png";
import ReferencesImage from "../assets/page-images/orb.png";


const pageInfo = [
    {
        pageName: "Stories",
        pageImage: StoryImage,
        pageDescription: "See all archived stories.",
        pageLink: "/stories",
    },
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
      },
  ];
  
  export { pageInfo };
