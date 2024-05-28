import Link from "next/link";
import React from 'react';
import Image from 'next/image';

interface LogoProps {
  height?: string;
  width?: string;
}

const Logo: React.FC<LogoProps> = ({ height = "32", width = "32" }) => {
  return (
    <Image
      width={32}
      height={32}
      src="/images/capgemini.png"
      alt="Capgemini logo"
    />
  );
};

export default Logo;

export function NamedLogoWithLink() {
  return (
    <Link href="/" className="flex flex-row items-center gap-3">
      <Logo height="24" width="24" />
      <h3 className="font-semibold text-lg">Engineer Assistant</h3>
    </Link>
  );
}
