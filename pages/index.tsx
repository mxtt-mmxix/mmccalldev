import type { GetStaticProps, NextPage } from 'next'
import VCenter from '../components/VCenter'
import Image from 'next/image'

import CloudPractitioner from '../public/aws-certified-cloud-practitioner.png'
import Widget from '../components/GlassPane'
import GlassButton from '../components/GlassButton'
import Wallpaper from '../components/Wallpaper'
import { Random } from 'unsplash-js/dist/methods/photos/types'
import { createApi } from 'unsplash-js'


interface HomeProps {
    wallpapers: Random[],
    quote: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const unsplash = createApi({
        accessKey: process.env.UNSPLASH_ACCESS_KEY
    });

    const result = await unsplash.photos.getRandom({ count: 2, orientation: 'landscape', topicIds: ['bo8jQKTaE0Y', 'Fzo3zuOHN6w'], contentFilter: "high" });

    if (result.errors) {
        console.log(result.errors);
    }

    return {
        props: {
            wallpapers: result.response as Random[] ? result.response : [result.response],
            quote: (await (await fetch('https://api.github.com/zen')).text())
        },
        revalidate: 86400
    }
}
const Home: NextPage<HomeProps> = ({ wallpapers, quote }) => {
    return (
        <>
            <Wallpaper wallpaper={wallpapers[0]}>
                <div className='container text-center' style={{ textShadow: '0 0 2em white' }}>
                    <h1 className='display-1'>Matthew McCall</h1>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        {
                            [
                                { icon: 'linkedin', url: 'https://linkedin.com/in/96d9' },
                                { icon: 'github', url: 'https://github.com/mxtt-mmxix' },
                                { icon: 'twitter', url: 'https://twitter.com/__mmccall' },
                                { icon: 'instagram', url: 'https://instagram.com/__mmccall' },
                                { icon: 'twitch', url: 'https://twitch.tv/mmapptv' },
                                { icon: 'youtube', url: 'https://www.youtube.com/channel/UCW_31sZAGpg8DTO_aM09oeQ' },

                            ].map(social =>
                                <div key={social.icon} className='me-3 mb-3'>
                                    <GlassButton fallbackColor={wallpapers[0].color as string}>
                                        <a className="text-reset" href={social.url}>
                                            <i className={`bi-${social.icon}`} style={{ fontSize: '1.5rem' }} />
                                        </a>
                                    </GlassButton>
                                </div>
                            )
                        }
                    </div>
                    <p className='lead'>{quote}</p>
                </div>
            </Wallpaper>
            <div className='bg-light text-dark p-5'>
                <div className='container'>
                    <h1>About Me</h1>
                    <p>My name is Matthew McCall, I am currently a C++ developer working on game engines!</p>
                    <ul>
                        <li>🤖 FRC 5599 BNCHS Sentinels</li>
                        <li>⚙️ C++ Game Engine Developer</li>
                        <li>☁️ AWS Certified Cloud Practitioner</li>
                    </ul>
                </div>
            </div>
            <Wallpaper wallpaper={wallpapers[1]} />
        </>
    )
}

export default Home
