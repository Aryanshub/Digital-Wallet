"use client";

import { Card } from "@repo/ui/card";
import { motion } from "framer-motion";
import {
  BanknotesIcon,
  LockClosedIcon,
  CurrencyRupeeIcon
} from "@heroicons/react/24/outline";

export const BalanceCard = ({
  amount,
  locked
}: {
  amount: number;
  locked: number;
}) => {
  const formattedAmount = (amount / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR"
  });
  const formattedLocked = (locked / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR"
  });
  const formattedTotal = ((locked + amount) / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card title={"Balance"}>
        <h2 className="text-lg font-semibold text-violet-600 mb-4 flex items-center gap-2">
          💼 Wallet Summary
        </h2>

        <div className=" space-y-5 text-[15px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <BanknotesIcon className="w-5 h-5 text-violet-500" />
              Unlocked Balance
            </div>
            <div className="text-right font-semibold text-gray-800">
              {formattedAmount}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <LockClosedIcon className="w-5 h-5 text-yellow-500" />
              Locked Balance
            </div>
            <div className="text-right font-semibold text-gray-800">
              {formattedLocked}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-gray-600 font-semibold">
              <CurrencyRupeeIcon className="w-5 h-5 text-emerald-600" />
              Total Balance
            </div>
            <div className="text-right text-violet-700 text-lg font-bold">
              {formattedTotal}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
