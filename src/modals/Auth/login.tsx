import CenteredModal from "../CentralModal";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  return (
    <CenteredModal
      onClose={onClose}
      isOpen={isOpen}
      header={<div>Header</div>}
      body={<div>Body</div>}
    />
  );
};

export default Login;
