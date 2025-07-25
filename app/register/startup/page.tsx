"use client"

import React from "react";

import Navbar from "@/components/ui/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    ArrowRight
} from "lucide-react";

export default function RegisterStartup() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section
                className="relative flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 2xl:px-24 pt-20 sm:pt-32 md:pt-24 pb-16 md:pb-24 bg-neutral-950"
            >
                <Breadcrumbs segments={[{ label: "Back to Home" }]} />

                <span className="text-white text-3xl my-4 font-semibold">Sign Up as Investor</span>

                <div className="bg-neutral-800 p-4 flex flex-col gap-3">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-white">Full Name <span className="text-red-500">*</span></span>
                        <Input placeholder="Enter your full name here" bgClass="bg-neutral-700 text-black" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-white">Email <span className="text-red-500">*</span></span>
                        <Input placeholder="Enter your email here" bgClass="bg-neutral-700 text-black" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-white">ID Number <span className="text-red-500">*</span></span>
                        <Input placeholder="Enter your id number here" bgClass="bg-neutral-700 text-black" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-white">Phone number <span className="text-red-500">*</span></span>
                        <Input placeholder="Enter your phone number here" bgClass="bg-neutral-700 text-black" />
                    </div>

                    <div className="border border-dashed border-neutral-500"></div>

                    <div className="flex justify-end">
                        <Button
                            iconRight={<ArrowRight />}
                            size="lg"
                            className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 w-fit"
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}