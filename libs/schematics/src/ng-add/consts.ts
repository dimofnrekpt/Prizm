interface Package {
  name: string;
  version: string;
}

interface ImportingModule {
  name: string;
  packageName: string;
}

export const MAIN_PACKAGES: ReadonlyArray<Package> = [
  {
    name: '@prizm-ui/core',
    version: '1.4.2',
  },
  {
    name: '@prizm-ui/components',
    version: '1.4.2',
  },
  {
    name: '@prizm-ui/helpers',
    version: '1.4.2',
  },
];

export const INSTALL_PACKAGE: Readonly<Package> = {
  name: '@prizm-ui/install',
  version: '1.4.2',
};

export const MAIN_MODULES: ReadonlyArray<ImportingModule> = [
  {
    name: 'PrizmUiRootModule',
    packageName: '@prizm-ui/components',
  },
];
