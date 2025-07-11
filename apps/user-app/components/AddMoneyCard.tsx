"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnrampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { motion } from "framer-motion"; // For smooth animation

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
  { name: "ICICI Bank", redirectUrl: "https://www.icicibank.com" },
  { name: "SBI Bank", redirectUrl: "https://www.onlinesbi.com" }
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAddMoney() {
    setError(null);
    setSuccess(null);

    if (!amount || amount <= 0) {
      setError("Please enter an amount greater than 0");
      return;
    }

    try {
      setLoading(true);
      await createOnrampTransaction(amount * 100, provider || "");
      setSuccess("✅ Transaction created successfully!");
      setTimeout(() => {
        window.location.href = "/transfer";
      }, 1200);
    } catch (err) {
      setError("❌ Failed to create transaction. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card title="💳 Add Money">
        <div className="mt-2">
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-200 space-y-4">
          <div >
          
            <TextInput
              label="Amount"
              placeholder="Enter amount (₹)"
              onChange={(value) => setAmount(Number(value))}
            />
          </div>

          <div>
            <label className=" block text-sm font-medium text-gray-700"><strong>Select Bank</strong></label>
            <Select
              onSelect={(value) => {
                const bank = SUPPORTED_BANKS.find((x) => x.name === value);
                setRedirectUrl(bank?.redirectUrl || "");
                setProvider(bank?.name || "");
              }}
              options={SUPPORTED_BANKS.map((x) => ({
                key: x.name,
                value: x.name
              }))}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm">{success}</p>
          )}

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleAddMoney}
            >
              {loading ? "Processing..." : "Add Money"}
            </Button>
          </div>
        </div>
        </div>
      </Card>
    </motion.div>
  );
};
