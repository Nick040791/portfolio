import { ReactNode } from 'react';

export type AccentColor = 'cyan' | 'magenta' | 'lime';

export interface JourneyItem {
  phase: string;
  date: string;
  color: AccentColor;
  icon: ReactNode;
  details: string[];
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link: string;
  accent: AccentColor;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

export interface CredentialCategory {
  title: string;
  icon: ReactNode;
  color: AccentColor;
  certs: Certificate[];
}

export type CredentialSector = 'software' | 'ai' | 'data';

export type CredentialsData = Record<CredentialSector, CredentialCategory>;

export interface SocialLink {
  label: string;
  url: string;
  iconName: 'github' | 'linkedin' | 'mail';
  variant: 'cyan' | 'fuchsia' | 'lime';
}
