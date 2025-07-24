import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/Textarea";

import {
    X,
    Check,
} from "lucide-react";

interface PostUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export default function PostUpdateModal({
    isOpen,
    onClose,
    onSave,
}: PostUpdateModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center">
            <div className="bg-neutral-800 p-6 w-full max-w-md">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-white text-lg font-semibold">Post Update to Investors</h2>
                        <p className="text-neutral-400 text-sm">Share news and progress with your investors</p>
                    </div>
                    <button className="text-white" onClick={onClose}>✕</button>
                </div>

                <div className="border border-dashed border-neutral-600 my-4"></div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <label className="text-white font-semibold">Update Title</label>
                        <Input placeholder="Enter update title" bgClass="bg-neutral-700 text-black" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-white font-semibold">Content</label>
                        <Textarea
                            placeholder="Share your progress, milestone, or news..."
                            bgClass="bg-neutral-700"
                        />
                    </div>
                </div>

                <div className="border border-dashed border-neutral-600 my-4"></div>

                <div className="flex justify-between gap-2">
                    <Button
                        onClick={onClose}
                        iconLeft={<X />}
                        size="lg"
                        className="bg-neutral-500 text-white hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSave}
                        iconLeft={<Check />}
                        size="lg"
                        className="bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white text-sm px-4 py-4 mt-4 w-fit"
                    >
                        Post Update
                    </Button>
                </div>
            </div>
        </div>
    );
}
