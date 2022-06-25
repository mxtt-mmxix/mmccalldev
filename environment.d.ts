declare global {
    namespace NodeJS {
        interface ProcessEnv {
            UNSPLASH_ACCESS_KEY: string
        }
    }
}

export { }