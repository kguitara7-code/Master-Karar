export interface RepoFile {
  type: string;
  oid: string;
  size: number;
  path: string;
  lfs?: {
    oid: string;
    size: number;
    pointerSize: number;
  };
  xetHash?: string;
}

export type SoftwareCategory = 
  | 'all'
  | 'apple_flashing'
  | 'remote_access'
  | 'schematics_hardware'
  | 'drivers_utilities';

export interface ProgramInfo {
  id: string;
  filename: string;
  name: string;
  arabicName: string;
  version: string;
  category: SoftwareCategory;
  categoryLabelAr: string;
  categoryLabelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  iconType: '3utools' | 'anydesk' | 'borneo' | 'jcid' | 'ultraviewer' | 'driver' | 'archive' | 'folder';
  brandColor: string;
  secondaryColor: string;
  officialSite?: string;
  logoUrl?: string;
  previewImageUrl?: string;
  taglineAr?: string;
  taglineEn?: string;
  architecture: 'x64' | 'x86/x64' | 'All';
  extension: 'exe' | 'zip' | 'rar' | 'md' | 'other';
  systemReq: string;
  sizeBytes?: number;
  oid?: string;
  xetHash?: string;
}
