import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface VerifyEmailProps {
  username?: string;
  verifyUrl?: string;
}

const VerifyEmail = (props: VerifyEmailProps) => {
  const { username, verifyUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Verify your email address</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto px-[40px] py-[32px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Verify Your Email Address
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Welcome! Please confirm your email to get started
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hello{username ? ` ${username}` : ''},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Thank you for signing up! To complete your registration and access all features, please verify your email address.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                Click the button below to verify your email address:
              </Text>

              {/* Verify Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={verifyUrl}
                  className="bg-blue-600 text-white text-[16px] font-semibold py-[12px] px-[24px] rounded-[6px] box-border inline-block no-underline"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
                If the button above doesn't work, you can copy and paste the following link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] m-0 mb-[24px] break-all">
                <Link href={verifyUrl} className="text-blue-600 underline">
                  {verifyUrl}
                </Link>
              </Text>

              {/* Security Notice */}
              <Section className="bg-blue-50 border-l-[4px] border-blue-400 p-[16px] rounded-[4px] mb-[24px]">
                <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px] font-semibold">
                  Important:
                </Text>
                <Text className="text-[14px] text-gray-700 leading-[20px] m-0">
                  If you didn't create an account with us, please ignore this email. No account has been created yet.
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 leading-[24px] m-0">
                If you have any questions or need assistance, please don't hesitate to contact our support team.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                Best regards,<br />
                The Team
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                123 Security Street, Tech City, TC 12345
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                <Link href="#" className="text-gray-500 underline">Unsubscribe</Link> | 
                <Link href="#" className="text-gray-500 underline ml-[4px]">Privacy Policy</Link> | 
                © 2025 Weybre AI
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;
