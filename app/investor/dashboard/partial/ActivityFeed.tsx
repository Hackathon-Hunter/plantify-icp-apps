"use client";

import React from "react";
import { Investment } from "@/service/declarations/plantify-backend.did";

import { MoveUpRight, Minus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityFeedProps {
  investments?: Investment[];
  onRefresh?: () => void;
}

// Utility functions for ICP timestamp conversion
const icpTimestampToDate = (timestamp: bigint): Date => {
  // Convert nanoseconds to milliseconds by dividing by 1,000,000
  const milliseconds = Number(timestamp) / 1_000_000;
  return new Date(milliseconds);
};

const formatIcpTimestampWithTime = (timestamp: bigint): string => {
  const date = icpTimestampToDate(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatIcpAmount = (amount: bigint, decimals: number = 2): string => {
  const icpAmount = Number(amount) / 100_000_000; // Convert from e8s to ICP/USD
  return icpAmount.toFixed(decimals);
};

export default function ActivityFeed({
  investments = [],
  onRefresh,
}: ActivityFeedProps) {
  if (investments.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-white text-xl font-semibold">
            Recent Activity
          </span>
          <small className="text-neutral-400">Your investment history</small>
        </div>

        <div className="bg-neutral-800 p-6 text-center rounded-lg">
          <span className="text-neutral-400">No investment activity found</span>
          <p className="text-neutral-500 mt-2">
            Start investing to see your activity here.
          </p>

          {onRefresh && (
            <Button
              onClick={onRefresh}
              iconLeft={<RefreshCw size={16} />}
              className="mt-4 bg-white text-black hover:bg-neutral-200"
            >
              Refresh
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <span className="text-white text-xl font-semibold">
          Recent Activity
        </span>
        <small className="text-neutral-400">Your investment history</small>
      </div>

      {investments
        .sort((a, b) => Number(b.investmentDate) - Number(a.investmentDate))
        .slice(0, 10) // Show only the 10 most recent
        .map((investment) => (
          <div
            key={investment.id}
            className="bg-neutral-800 p-4 flex justify-between rounded-lg"
          >
            <div className="flex gap-3 items-center">
              <MoveUpRight className="text-red-500" size={20} />
              <div className="flex flex-col">
                <span className="text-white text-xl">
                  Invested in {investment.projectId.slice(0, 8)}...
                </span>
                <small className="text-neutral-400">
                  {formatIcpTimestampWithTime(investment.investmentDate)}
                </small>
              </div>
            </div>
            <div className="text-red-500 flex items-center w-fit">
              <Minus size={15} />
              <span>${formatIcpAmount(investment.amount)}</span>
            </div>
          </div>
        ))}

      {onRefresh && (
        <div className="text-center mt-4">
          <Button
            onClick={onRefresh}
            iconLeft={<RefreshCw size={16} />}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Refresh Activity
          </Button>
        </div>
      )}
    </div>
  );
}
