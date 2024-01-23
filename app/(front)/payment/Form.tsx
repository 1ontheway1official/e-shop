"use client";
import CheckoutSteps from "@/components/CheckoutSteps";
import useCartService from "@/libs/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Form = () => {
  const router = useRouter();
  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "PayPal");
  }, [paymentMethod, router, shippingAddress.address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod(selectedPaymentMethod);
    router.push("/place-order");
  };

  return (
    <div>
      <CheckoutSteps current={2} />
      <div className="max-w-sm mx-auto my-4 card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">Payment Method</h1>
          <form onSubmit={handleSubmit}>
            {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
              <div key={payment}>
                <label className="cursor-pointer label">
                  <span className="label-text">{payment}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio"
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                </label>
              </div>
            ))}
            <div className="my-2">
              <button type="submit" className="w-full btn btn-primary">
                Next
              </button>
            </div>
            <div className="my-2">
              <button
                type="button"
                className="w-full my-2 btn"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
