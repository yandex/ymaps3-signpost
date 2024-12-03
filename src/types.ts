declare module '@yandex/ymaps3-types/import' {
    interface Import {
        (pkg: 'ymaps3-signpost'): Promise<typeof import('./index')>;
    }
}

export {};
