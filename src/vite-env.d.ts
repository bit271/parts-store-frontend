interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // здесь можно добавить другие переменные окружения
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}