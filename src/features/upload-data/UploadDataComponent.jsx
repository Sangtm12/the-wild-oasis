import { useEffect } from "react";
import useUploadData from "./useUploadData";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

function UploadDataComponent() {
  const { refreshData, isRefreshingData } = useUploadData();
  const navigate = useNavigate();

  useEffect(() => {
    refreshData(null, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  }, [refreshData, navigate]);

  if (isRefreshingData) return <Spinner />;

  return <div>If this shows up, it means something is not working</div>;
}

export default UploadDataComponent;
