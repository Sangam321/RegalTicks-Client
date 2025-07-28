import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const BuyWatchButton = ({ watchId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseWatchHandler = async () => {
    await createCheckoutSession(watchId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; // Redirect to checkout
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Checkout session failed.");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseWatchHandler}
      className="w-full bg-[#146321] hover:bg-[#0f4f1c] text-white"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting...
        </>
      ) : (
        "Buy watch Now"
      )}
    </Button>
  );
};

export default BuyWatchButton;
