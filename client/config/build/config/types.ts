export type buildMode = 'development' | 'production';
export interface buildPaths {
    entry: string;
    dist: string;
    html: string;
    src: string;
    staticFrom: string;
    staticTo: string;
    mediaFrom: string;
    mediaTo: string;
}

export interface BuildOptions {
    mode: buildMode;
    paths: buildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
}

export interface BuildEnv {
    port: number;
    mode: buildMode;
    apiUrl: string;
}
