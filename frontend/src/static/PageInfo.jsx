import JobImage from "../assets/page-images/job.png";
import CityImage from "../assets/page-images/city.png";
import HomeImage from "../assets/page-images/home.png";


const pageInfo = [
    {
      pageName: "Jobs",
      pageImage: JobImage,
      pageDescription: "Find your dream job!",
      pageLink: "/jobs",
    },
    {
        pageName: "Cities",
        pageImage: CityImage,
        pageDescription: "Find your dream city!",
        pageLink: "/cities",
    },
    {
        pageName: "Apartments",
        pageImage: HomeImage,
        pageDescription: "Find your dream apartment!",
        pageLink: "/apartments",
      },
  ];
  
  export { pageInfo };
