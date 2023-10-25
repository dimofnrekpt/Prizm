export interface PrizmVersionMeta {
  label: string;
  link: URL;
  stackblitz: string | null;
  otherLinks: URL[];
  version?: string;
  baseHref?: string;
  cb?: (hostName: string, current: PrizmVersionMeta) => boolean;
}

export const PRIZM_VERSIONS_META: readonly PrizmVersionMeta[] = [
  {
    label: '3.3.0 (ng16)',
    version: '3.3.0',
    stackblitz: 'https://stackblitz.com/edit/prizm-v3-demo',
    link: new URL('http://prizm.site'),
    otherLinks: [new URL('https://prizm-v3.web.app')],
    cb: (hostName: string, current: PrizmVersionMeta) => {
      return hostName.startsWith('prizm-v3--');
    },
  },
  {
    label: '2.3.0 (ng15)',
    version: '2.3.0',
    stackblitz: 'https://stackblitz.com/edit/prizm-v2-demo',
    link: new URL('https://prizm-v2.web.app'),
    otherLinks: [],
    cb: (hostName: string, current: PrizmVersionMeta) => {
      return hostName.startsWith('prizm-v2--');
    },
  },
  {
    label: '1.7.0 (ng14)',
    version: '1.7.0',
    stackblitz: 'https://stackblitz.com/edit/prizm-v1-demo',
    link: new URL('https://prizm-v1.web.app'),
    otherLinks: [],
    cb: (hostName: string, current: PrizmVersionMeta) => {
      return hostName.startsWith('prizm-v1--');
    },
  },
  {
    label: '3.3.0-next (ng16)',
    version: '3.3.0-next',
    stackblitz: 'https://stackblitz.com/edit/prizm-v3-next-demo',
    link: new URL('https://prizm-v3-next.web.app'),
    otherLinks: [],
  },
  {
    label: '2.3.0-next (ng15)',
    stackblitz: 'https://stackblitz.com/edit/prizm-v2-next-demo',
    version: '2.3.0-next',
    link: new URL('https://prizm-v2-next.web.app'),
    otherLinks: [],
  },
  {
    label: '1.7.0-next (ng14)',
    version: '1.7.0-next',
    stackblitz: 'https://stackblitz.com/edit/prizm-v1-next-demo',
    link: new URL('https://prizm-v1-next.web.app'),
    otherLinks: [],
  },
  {
    label: '3.3.0-beta (ng16)',
    version: '3.3.0-beta',
    stackblitz: 'https://stackblitz.com/edit/prizm-v3-beta-demo',
    link: new URL('https://prizm-v3-beta.web.app'),
    otherLinks: [],
  },
  {
    label: '2.3.0-beta (ng15)',
    version: '2.3.0-beta',
    stackblitz: 'https://stackblitz.com/edit/prizm-v2-beta-demo',
    link: new URL('https://prizm-v2-beta.web.app'),
    otherLinks: [],
  },
  {
    label: '1.7.0-beta (ng14)',
    version: '1.7.0-beta',
    stackblitz: 'https://stackblitz.com/edit/prizm-v1-beta-demo',
    link: new URL('https://prizm-v1-beta.web.app'),
    otherLinks: [],
  },
];
