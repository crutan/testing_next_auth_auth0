import { Heading } from "ui/Text";

import { Button } from "../ui/Button";

const Hero = () => {
  return (
    <section className="flex h-[400px] w-full items-center justify-center bg-slate-100">
      <div className="container p-10">
        <Heading as="h2" size="h4" weight="bold">
          Auth0 Integration Exploration
        </Heading>
        <Button
          icon="EnvelopeIcon"
          iconFormat="solid"
          iconPosition="trailing"
          size="xsmall"
        >
          Get started
        </Button>
      </div>
    </section>
  );
};

export default Hero;
