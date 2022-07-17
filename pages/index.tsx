import type { GetStaticProps, NextPage } from 'next'
import VCenter from '../components/VCenter'
import Image from 'next/image'

import CloudPractitioner from '../public/aws-certified-cloud-practitioner.png'
import RensselaerSeal from '../public/RF0010-04 Small Seal-RGB-White.png'
import GlassButton from '../components/Glass/Button'
import GlassPane from '../components/Glass/Pane'
import Wallpaper from '../components/Wallpaper'
import { Random } from 'unsplash-js/dist/methods/photos/types'
import { createApi } from 'unsplash-js'
import { Octokit } from 'octokit'
import {
    GetResponseTypeFromEndpointMethod,
    GetResponseDataTypeFromEndpointMethod,
} from "@octokit/types";
import InvHexShadow from '../lib/InvHexShadow'
import { useEffect, useRef } from 'react'

import WallpaperStyles from '../components/Wallpaper/wallpaper.module.css'
import Link from 'next/link'
import Footer from '../components/Footer'

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
    const result = await unsplash.photos.getRandom({ count: 2, orientation: 'landscape', topicIds: ['bo8jQKTaE0Y', '6sMVjTLSkeQ'], contentFilter: "high" });

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
            })).data.filter(repo => repo.archived == false)
        },
        revalidate: 3600
    }
}
const Home: NextPage<HomeProps> = ({ wallpapers, quote, repos }) => {

    const offcanvasRef = useRef<HTMLDivElement>(null)
    const scrollSpySrc = useRef<HTMLDivElement>(null)
    const scrollSpyTarget = useRef<HTMLElement>(null)
    const toastRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        import('bootstrap/js/dist/offcanvas').then(Offcanvas => {
            const bsOffcanvas = new Offcanvas.default(offcanvasRef.current!);
        });

        import('bootstrap/js/dist/scrollspy').then(ScrollSpy => {
            new ScrollSpy.default(scrollSpySrc.current!, { target: scrollSpyTarget.current! })
        })

        import('bootstrap/js/dist/toast').then(Toast => {
            const toast = new Toast.default(toastRef.current!, { delay: 30000 });
            toast.show();
        })
    }, [])

    return (
        <>
            <div ref={offcanvasRef} className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='d-flex flex-column h-100'>
                        <div className='flex-grow-1'>
                            <nav ref={scrollSpyTarget} className="navbar flex-column align-items-stretch">
                                <a className="navbar-brand" href='#MatthewMcCall'>mmccall.dev</a>
                                <nav className="nav nav-pills flex-column">
                                    <a className="nav-link" href="#AboutMe">About Me</a>
                                    <a className="nav-link" href="#Projects">Projects</a>
                                    <a className="nav-link" href="#CertsAndEdu">Certifications and Education</a>
                                    <a className="nav-link" href="#Minecraft">Paper Minecraft Server Plugins</a>
                                    <nav className="nav nav-pills flex-column">
                                        <a className="nav-link ms-3 my-1" href="#CoordsDB">CoordsDB</a>
                                        <a className="nav-link ms-3 my-1" href="#FarmDispensers">FarmDispensers</a>
                                    </nav>
                                </nav>
                            </nav>
                        </div>
                        <div className='text-muted'>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
            <div className='position-fixed bottom-0 end-0 p-3' style={{ zIndex: 2 }}>
                <div className='row'>
                    <div className='col-auto ms-auto'>
                        <button type="button" className="btn btn-light rounded-circle shadow" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvasLabel">
                            <i className='bi-list' style={{ fontSize: '1.5rem' }} />
                        </button>
                    </div>
                </div>
                <div ref={toastRef} className="toast mt-2" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">🍪 Cookie Usage</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        This site uses Google Analytics to monitor the usage of this website.Please see the Google Analytics <a href='https://www.google.com/policies/privacy/partners/'>Privacy &amp; Terms</a> and <a href='https://support.google.com/analytics/answer/6004245'>Data Collection</a> policy for more information. mmccall.dev <em>does not</em> collect, store, nor sell any Personally Identifiable Information.
                    </div>
                </div>
            </div>
            <main ref={scrollSpySrc}>
                <section id="MatthewMcCall">
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
                </section>
                <section id='AboutMe'>
                    <div className='shadow'>
                        <div className='container py-5'>
                            <h1>About Me</h1>
                            <p>My name is Matthew McCall, I am currently a C++ developer working on game engines!</p>
                            <ul>
                                <li>🤖 FRC 5599 BNCHS Sentinels</li>
                                <li>⚙️ C++ Game Engine Developer</li>
                                <li>☁️ AWS Certified Cloud Practitioner</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section id='Projects'>
                    <Wallpaper wallpaper={wallpapers[1]}>
                        <div className='container'>
                            <div className='py-5'>
                                <h1 className='display-3'>Projects</h1>
                            </div>
                            <div className='row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 pb-5'>
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
                </section>
                <section id='CertsAndEdu'>
                    <div className='shadow'>
                        <div className='container'>
                            <div className='row row-cols-1 row-cols-md-2'>
                                <div className='col py-5'>
                                    <div className='pb-3'>
                                        <h1>Certifications</h1>
                                    </div>
                                    <div className='card'>
                                        <div className='row g-0'>
                                            <div className='col-md-4 p-4'>
                                                <Image src={CloudPractitioner} alt="AWS Certified Cloud Practioner Badge" />
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='card-body'>
                                                    <h5 className='card-title'>AWS Certified Cloud Practicioner</h5>
                                                    <p className='card-text'>Issued 04 September, 2021.</p>
                                                    <a href="https://www.credly.com/badges/c769cb75-d5af-47f5-9d23-a86875acbdf0/public_url" className="btn btn-primary"><i className='bi-patch-check' /> View</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col py-md-5 pb-5 pb-md-0'>
                                    <div className='pb-3'>
                                        <h1>Education</h1>
                                    </div>
                                    <div className='card'>
                                        <div className='row g-0'>
                                            <div className='col-md-4 p-4' style={{ backgroundColor: 'red' }}>
                                                <Image src={RensselaerSeal} alt="AWS Certified Cloud Practioner Badge" />
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='card-body'>
                                                    <h5 className='card-title'>Rensselaer Polytechnic Institute</h5>
                                                    <p className='card-text'>Bachelor of Science - BS, Computer Science</p>
                                                    <p className="card-text"><small className="text-muted">June 2026</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='Minecraft'>
                    <div style={{ backgroundImage: 'url(minecraft.png)' }} className={`${WallpaperStyles.parallax} container-fluid`}>
                        <div className='min-vh-100 row'>
                            <div className='my-auto'>
                                <div className='container'>
                                    <div className='py-3'>
                                        <h1>Paper Minecraft Server Plugin</h1>
                                    </div>
                                    <div className='row row-cols-1 row-cols-md-2 g-3 pb-3'>
                                        <div id='CoordsDB' className='col'>
                                            <GlassPane fallbackColor='#e6be64'>
                                                <div className='p-3'>
                                                    <h3>CoordsDB</h3>
                                                    <p className='lead'>A plugin for saving coordinates for the Paper Minecraft Server.</p>
                                                    <p>Have you ever found yourself hitting F3 to get into that cluttered debug menu to save the coordinates of an important place such as your home base or nether portal? Maybe you have a whole album of screenshots or a Google Doc with all your coordinates. What if, there was a simpler in-game solution for saving your coordinates and getting easily all without leaving your game by using a few simple commands?</p>
                                                    <a href="https://coords.mmccall.dev" className="btn btn-primary">Learn More <i className='bi-box-arrow-up-right' /></a>
                                                </div>
                                            </GlassPane>
                                        </div>
                                        <div id='FarmDispensers' className='col'>
                                            <GlassPane fallbackColor='#e6be64'>
                                                <div className='p-3'>
                                                    <h3>Farm Dispensers</h3>
                                                    <p className='lead'>This plugin for 1.19 Paper Minecraft Servers makes it so that dispensers can plant seeds on tilled soil.</p>
                                                    <p>This plugin for 1.19 Paper Minecraft Servers makes it so that dispensers can plant seeds on tilled soil. Simply place a dispenser facing an air block above a farmland block to plant the seeds on the farmland block.</p>
                                                    <a href="https://farmdisp.mmccall.dev" className="btn btn-primary">Learn More <i className='bi-box-arrow-up-right' /></a>
                                                </div>
                                            </GlassPane>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <div className='container py-5'>
                    <div className='text-center'>
                        <Footer />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Home
