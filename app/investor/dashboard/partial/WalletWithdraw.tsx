"use client"

import React from "react";

import { Button } from "@/components/ui/button";

import {
    Download,
    CircleCheckBig,
    MoveUpRight,
    Plus,
    Minus
} from "lucide-react";

export default function WalletWithdraw() {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Wallet Balance */}
            <div className="bg-neutral-800 p-4 flex flex-col gap-3 w-full">
                <span className="text-white text-xl font-semibold">Wallet Balance</span>
                <small className="text-neutral-400">Your available balance in ckUSDC</small>

                <div className="border border-dashed border-neutral-400 my-2" />

                <span className="text-white text-3xl">$1,250.75</span>
                <small className="text-neutral-400">Available for investment or withdrawal</small>

                <div className="border border-dashed border-neutral-400 my-2" />

                <Button
                    iconLeft={<Download />}
                    size="lg"
                    className="bg-white text-black hover:bg-transparent hover:border hover:border-white hover:text-white text-sm px-4 py-4 mt-4 w-full"
                >
                    Withdraw to Wallet
                </Button>
            </div>

            {/* Transaction History */}
            <div className="bg-neutral-900 p-4 flex flex-col gap-2 w-full">
                <span className="text-white text-xl font-semibold">Transaction History</span>
                <small className="text-neutral-400">Recent wallet transactions</small>

                <div className="border border-dashed border-neutral-400 my-2" />

                <div className="flex flex-col gap-4 w-full">
                    {/* Transaction Item */}
                    {[
                        {
                            icon: <CircleCheckBig />,
                            title: "Deposit",
                            date: "January 20, 2024",
                            amount: "+$500",
                            color: "text-green-500",
                        },
                        {
                            icon: <MoveUpRight />,
                            title: "Investment",
                            date: "January 20, 2024",
                            amount: "-$500",
                            color: "text-red-500",
                        },
                        {
                            icon: <Download />,
                            title: "Withdrawal",
                            date: "January 20, 2024",
                            amount: "-$500",
                            color: "text-red-500",
                        }
                    ].map((tx, i) => (
                        <div key={i} className="flex justify-between w-full items-start flex-col sm:flex-row">
                            <div className="flex gap-3 w-full sm:w-auto">
                                <div className="bg-neutral-800 p-4">{tx.icon}</div>
                                <div className="flex flex-col">
                                    <span>{tx.title}</span>
                                    <small>{tx.date}</small>
                                </div>
                            </div>
                            <div className={`${tx.color} flex items-center mt-2 sm:mt-0`}>
                                <span className="ml-1">{tx.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}