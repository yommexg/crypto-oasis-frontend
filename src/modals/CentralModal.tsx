import { AiOutlineCloseCircle } from "react-icons/ai";

interface CenteredModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: React.ReactNode;
  body: React.ReactNode;
}

const CenteredModal: React.FC<CenteredModalProps> = ({
  isOpen,
  onClose,
  header,
  body,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 text-xs md:text-base flex items-center justify-center z-40">
      <div className="w-full text-white max-w-2xl max-h-[90vh] mx-4 overflow-y-auto shadow-lg scrollbar-hide">
        <div className="bg-[#31323E] rounded-t-lg flex flex-col items-center py-2 relative">
          {header}
          <AiOutlineCloseCircle
            size={24}
            className="absolute top-2 right-2 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="bg-[#292932] rounded-b-lg py-2">{body}</div>
      </div>
    </div>
  );
};

export default CenteredModal;
