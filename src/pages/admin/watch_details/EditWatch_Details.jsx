import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Watch_DetailsTab from "./Watch_DetailsTab";

const EditWatch_Details = () => {
  const params = useParams();
  const watchId = params.watchId;
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/watch/${watchId}/watch_details`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-xl">Update Your Watch_Details</h1>
        </div>
      </div>
      <Watch_DetailsTab />
    </div>
  );
};

export default EditWatch_Details;
