import Logo from "@/components/logo";
import React from "react";
import ForgotPasswordForm from "../_common/forgot-password";

const Page = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="relative flex w-full max-w-sm flex-col gap-6">
                <div className="w-full flex items-center justify-center">
                    <Logo />
                </div>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}

export default Page;