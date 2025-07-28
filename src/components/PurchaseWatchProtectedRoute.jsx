import { useGetWatchDetailWithStatusQuery } from "@/features/api/purchaseApi";

import { Navigate, useParams } from "react-router-dom";

const PurchaseWatchProtectedRoute = ({ children }) => {
    const { watchId } = useParams();
    const { data, isLoading } = useGetWatchDetailWithStatusQuery(watchId);

    if (isLoading) return <p>Loading...</p>

    return data?.purchased ? children : <Navigate to={`/watch-detail/${watchId}`} />
}
export default PurchaseWatchProtectedRoute;