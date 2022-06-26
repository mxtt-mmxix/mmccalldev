declare global {
    namespace NodeJS {
        interface ProcessEnv {
            UNSPLASH_ACCESS_KEY: string,
            GITHUB_PERSONAL_ACCESS_TOKEN: string
        }
    }
}

export { }