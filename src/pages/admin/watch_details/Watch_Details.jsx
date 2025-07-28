import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Watch_Details = ({ watch_details, watchId, index }) => {
  const navigate = useNavigate();
  const goToUpdateWatch_Details = () => {
    navigate(`${watch_details._id}`);
  };
  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        Watch_Details - {index + 1}: {watch_details.watch_detailsTitle}
      </h1>
      <Edit
        onClick={goToUpdateWatch_Details}
        size={20}
        className=" cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      />
    </div>
  );
};

export default Watch_Details;
