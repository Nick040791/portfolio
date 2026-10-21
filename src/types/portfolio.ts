import { ReactNode } from 'react';

export type AccentColor = 'cyan' | 'magenta' | 'lime';

export interface JourneyItem {
  phase: string;
  date: string;
  color: AccentColor;
  icon: ReactNode;
  details: string[];
  telemetryTag?: string;
  isCurrent?: boolean;
  commitHash?: string;
  branch?: string;
  tag?: string;
  scope?: string;
  tech?: string[];
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link: string;
  accent?: AccentColor | string;
  githubUrl?: string;
  liveUrl?: string;
  containerPort?: string;
  statusBadge?: string;
  systemMetrics?: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  logoId?: string;
  credentialId?: string;
  skills?: string[];
  verifyUrl?: string;
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
