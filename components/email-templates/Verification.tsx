import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from 'react-email';

interface VerificationEmailProps {
  actionUrl: string;
}

export const VerificationEmailTemplate: React.FC<VerificationEmailProps> = ({
  actionUrl,
}) => {
  return (
    <Html>
      <Preview>Verify your JobSprint AI account</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-slate-50 font-sans my-auto mx-auto font-normal">
          <Container className="bg-white border border-solid border-slate-200 rounded-xl mx-auto my-10 max-w-125 p-8">

            <Section className="mt-2">
              <Text className="text-[22px] font-extrabold text-slate-900 m-0 p-0">
                Job<span className="text-sky-500">Sprint</span> <span className="text-slate-400 font-medium text-base">AI</span>
              </Text>
            </Section>

            <Heading className="text-slate-900 text-[20px] font-bold p-0 my-6 mx-0">
              Verify your email address
            </Heading>

            <Text className="text-slate-700 text-[15px] leading-6">
              Thanks for signing up for JobSprint AI. Click the button below to verify your email address and get started with tailoring your resumes.
            </Text>

            <Section className="text-center my-8">
              <Button
                className="bg-sky-500 hover:bg-sky-600 rounded-lg text-white font-semibold text-[15px] px-6 py-3 text-center inline-block no-underline"
                href={actionUrl}
              >
                Verify Email Address
              </Button>
            </Section>

            <Text className="text-slate-500 text-[13px] leading-5 break-all">
              Or copy and paste this link into your browser:
              <br />
              <Link href={actionUrl} className="text-sky-500 underline">
                {actionUrl}
              </Link>
            </Text>

            <Hr className="border border-solid border-slate-100 my-6 mx-0 w-full" />

            <Text className="text-slate-400 text-[12px] leading-4.5">
              If you didn&apos;t request this email, you can safely ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmailTemplate;