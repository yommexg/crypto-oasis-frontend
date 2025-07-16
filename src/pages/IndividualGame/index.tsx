import IndividualGameHeader from "./header";
import IndividualGameTable from "./table";

const IndividualGame: React.FC = () => {
  return (
    <div className="pt-24 md:pl-20 pb-6 min-h-screen">
      <IndividualGameHeader />
      <IndividualGameTable />
    </div>
  );
};

export default IndividualGame;
