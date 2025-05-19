import React from 'react';
import { IconType } from 'react-icons';

interface SocialLinkProps {
  href: string;
  Icon: IconType;
  label: string;
}

export default function SocialLink({ href, Icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center p-2 rounded-md bg-[var(--background)] bg-opacity-30 
                hover:bg-[var(--background)] hover:bg-opacity-40 transition-all duration-300 
                text-[var(--primary)] hover:scale-110 hover:shadow-md relative overflow-hidden"
      aria-label={label}
      title={label}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></span>
      <Icon className="text-xl transition-transform duration-300 group-hover:scale-110" />
    </a>
  );
}
