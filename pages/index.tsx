import type { GetStaticProps, NextPage } from 'next'
import VCenter from '../components/VCenter'
import Image from 'next/image'

import CloudPractitioner from '../public/aws-certified-cloud-practitioner.png'
import Widget from '../components/GlassPane'
import GlassButton from '../components/GlassButton'
import Wallpaper from '../components/Wallpaper'
import { Random } from 'unsplash-js/dist/methods/photos/types'
import { createApi } from 'unsplash-js'
import { Octokit } from 'octokit'
import {
    GetResponseTypeFromEndpointMethod,
    GetResponseDataTypeFromEndpointMethod,
} from "@octokit/types";
import GlassPane from '../components/GlassPane'
import InvHexShadow from '../lib/InvHexShadow'

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
});

const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN
});

type ListUserReposType = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listForUser>

interface HomeProps {
    wallpapers: Random[],
    quote: string,
    repos: ListUserReposType
}

export const getStaticProps: GetStaticProps = async (context) => {
    const result = await unsplash.photos.getRandom({ count: 2, orientation: 'landscape', topicIds: ['bo8jQKTaE0Y', 'Fzo3zuOHN6w'], contentFilter: "high" });

    if (result.errors) {
        console.log(result.errors);
    }

    return {
        props: {
            wallpapers: result.response as Random[] ? result.response : [result.response],
            quote: (await (await fetch('https://api.github.com/zen')).text()),
            repos: (await octokit.rest.repos.listForUser({
                username: 'mxtt-mmxix',
                sort: 'updated'
            })).data
        },
        revalidate: 86400
    }
}
const Home: NextPage<HomeProps> = ({ wallpapers, quote, repos }) => {
    return (
        <>
            <Wallpaper wallpaper={wallpapers[0]}>
                <div className='container text-center' style={{ textShadow: InvHexShadow(wallpapers[0].color!) }}>
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
                                    <GlassButton fallbackColor={wallpapers[0].color!}>
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
            <Wallpaper wallpaper={wallpapers[1]}>
                <div className='container'>
                    <div className='py-5'>
                        <h1 className='display-3'>Projects</h1>
                    </div>
                    <div className='row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3'>
                        {repos.map(repo => {
                            return (
                                <div key={repo.id} className='col'>
                                    <GlassPane fallbackColor={wallpapers[1].color!}>
                                        <div className='p-3'>
                                            <h4>{repo.name}</h4>
                                            <div className='pb-2'>
                                                <a className='text-reset' href={repo.html_url}>
                                                    <span className='badge text-bg-primary me-1'><i className='bi-github' /></span>
                                                </a>
                                                {repo.homepage &&
                                                    <a className='text-reset' href={repo.homepage}>
                                                        <span className='badge text-bg-primary me-1'><i className='bi-globe' /></span>
                                                    </a>
                                                }
                                                <span className='badge text-bg-primary me-1'>{repo.language}</span>
                                                {repo.fork && <span className='badge text-bg-primary'>Forked</span>}
                                            </div>
                                            <p>{repo.description}</p>
                                        </div>
                                    </GlassPane>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Wallpaper>
            <div className='bg-light text-dark p-5'>
                <div className='container'>
                    <div className='row row-cols-1 row-cols-md-2'>
                        <div className='col'>
                            <h1>Certifications</h1>
                            <div className='d-flex flex-row'>
                                <div className='col-3'>
                                    <Image src={CloudPractitioner} alt="AWS Certified Cloud Practioner" />
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <h1>Education</h1>
                            <p>Rensselaer</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
