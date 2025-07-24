"use client"

import React, { useState } from "react";

export default function Overview() {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-3 bg-neutral-900 p-4 w-full">
                <span className="text-xl text-white">Startup Details</span>
                <div className="border-2 border-dashed border-neutral-600"></div>

                <div className="flex justify-between">
                    <span className="text-neutral-500">Raise Target</span>
                    <span className="text-white">$150,000</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">Minimum Goal</span>
                    <span className="text-white">$50,000</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">NFTs Issued</span>
                    <span className="text-white">85,000</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">Start Date</span>
                    <span className="text-white">January 01, 2024</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">End Date</span>
                    <span className="text-white">February 02, 2025</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-neutral-500">Smart Contract</span>
                    <span className="text-white">rdmx6-jaaaa-aaaah-qcaiq-cai</span>
                </div>
            </div>

            <div className="bg-neutral-800 p-4 flex flex-col gap-3 w-full h-fit">
                <span className="text-xl text-white">NFT Sale Progress</span>
                <div className="border-2 border-dashed border-neutral-600"></div>

                <div className="flex justify-between items-center">
                    <span className="text-white">Raise $85,000</span>
                    <small className="text-white text-xs">Target $150,000</small>
                </div>

                <div className="w-full h-2 bg-neutral-500 mt-2">
                    <div
                        className="h-full bg-white"
                        style={{ width: `${(85000 / 150000) * 100}%` }}
                    />
                </div>

                <div className="flex justify-between">
                    <span className="text-green-500 text-xl">57%</span>
                    <small className="text-red-500 text-xl">$65,000</small>
                </div>

                <div className="flex justify-between">
                    <span className="text-neutral-500 text-xs">Complete</span>
                    <small className="text-neutral-500 text-xs">Remaining</small>
                </div>
            </div>
        </div>
    )
}