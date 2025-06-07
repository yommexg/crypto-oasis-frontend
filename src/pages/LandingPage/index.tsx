import FAQ from "./faq";
import Features from "./features";
import Footer from "./footer";
import Header from "./Header";
import RoadMap from "./road-map";
import Teams from "./teams";
import WhoWeAre from "./who-we-are";

interface LandingPageType {
  handleShowModal: () => void;
}

const LandingPage: React.FC<LandingPageType> = ({ handleShowModal }) => {
  return (
    <>
      <Header handleShowModal={handleShowModal} />
      <WhoWeAre handleShowModal={handleShowModal} />
      <Features handleShowModal={handleShowModal} />
      <RoadMap />
      <Teams />
      <FAQ />
      <Footer handleShowModal={handleShowModal} />
    </>
  );
};

export default LandingPage;
