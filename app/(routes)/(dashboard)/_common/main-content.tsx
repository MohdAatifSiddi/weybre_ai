"use client";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const MainContent = ({ children }: Props) => {
    return (
        <>
        <main className="relative w-full h-auto overflow-hidden">{children}</main>
        </>
    )
}

export default MainContent;