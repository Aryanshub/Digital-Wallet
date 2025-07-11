"use client";

import { Card } from "@repo/ui/card";
import { motion } from "framer-motion";
import { ClockIcon, CheckCircleIcon, XCircleIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8 text-gray-400 text-sm">
          🚫 No Recent Transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="space-y-4">
        {transactions.map((t, index) => {
          const formattedAmount = `+ ₹${(t.amount / 100).toLocaleString("en-IN")}`;
          const formattedDate = new Date(t.time).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          });

          const statusColor =
            t.status === "Success"
              ? "bg-green-100 text-green-700"
              : t.status === "Failure"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600";

          const StatusIcon =
            t.status === "Success"
              ? CheckCircleIcon
              : t.status === "Failure"
              ? XCircleIcon
              : ClockIcon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition rounded-lg p-4"
            >
              {/* Left Info */}
              <div>
                <div className="flex items-center gap-2 font-medium text-gray-800">
                  <ArrowDownTrayIcon className="w-4 h-4 text-violet-600" />
                  Received via {t.provider}
                </div>
                <div className="text-xs text-gray-500 mt-1">{formattedDate}</div>

                <div
                  className={`mt-1 inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full w-fit capitalize transition-all duration-200 ${statusColor}`}
                >
                  <StatusIcon className="w-4 h-4" />
                  {t.status}
                </div>
              </div>

              {/* Right Amount */}
              <div className="text-right font-bold text-green-600 text-lg">
                {formattedAmount}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};
