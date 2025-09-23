import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
  Preview,
} from "@react-email/components";

type ForgotPasswordEmailProps = {
  userEmail?: string;
  resetLink?: string;
};

const ForgotPasswordEmail = ({
  userEmail = "user@example.com",
  resetLink = "https://yourapp.com/reset-password?token=demo123",
}: ForgotPasswordEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Reset your password – valid for the next 24 hours
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white max-w-[600px] mx-auto rounded-lg shadow-sm">
            {/* Header */}
            <Section className="bg-blue-600 text-white text-center py-[32px] rounded-t-lg">
              <Text className="text-[24px] font-bold m-0">
                Password Reset Request
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-[32px] py-[40px]">
              <Text className="text-[18px] font-semibold text-gray-800 mb-[16px]">
                Hello there,
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[24px] leading-[24px]">
                We received a request to reset the password for your account
                associated with <strong>{userEmail}</strong>.
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[32px] leading-[24px]">
                If you made this request, click the button below to reset your
                password. This link will expire in 24 hours for security reasons.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={resetLink}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-lg text-[16px] font-semibold no-underline box-border hover:bg-blue-700 transition-colors"
                >
                  Reset Your Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-500 mb-[24px] leading-[20px]">
                If the button above doesn’t work, copy and paste this link into
                your browser:
              </Text>

              <Text className="text-[14px] text-blue-600 bg-gray-50 p-[12px] rounded-md border border-gray-200 break-all mb-[32px]">
                {resetLink}
              </Text>

              <Hr className="border-gray-200 my-[32px]" />

              {/* Security Notice */}
              <Section className="bg-yellow-50 border-l-4 border-yellow-400 p-[16px] rounded-r-md mb-[24px]">
                <Text className="text-[14px] text-yellow-800 m-0 font-semibold mb-[8px]">
                  Security Notice
                </Text>
                <Text className="text-[14px] text-yellow-700 m-0 leading-[20px]">
                  If you didn’t request this password reset, please ignore this
                  email. Your password will remain unchanged.
                </Text>
              </Section>

              <Text className="text-[14px] text-gray-500 leading-[20px]">
                For security reasons, this link will expire in 24 hours. After
                that, please request a new password reset.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 px-[32px] py-[24px] rounded-b-lg border-t border-gray-200">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                This email was sent to {userEmail}
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                123 Business Street, Suite 100, City, State 12345
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ForgotPasswordEmail.PreviewProps = {
  userEmail: "mababwbi@gmail.com",
  resetLink: "https://yourapp.com/reset-password?token=abc123xyz789",
};

export default ForgotPasswordEmail;
