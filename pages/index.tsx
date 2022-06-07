import type { NextPage } from 'next'
import VCenter from '../components/VCenter'
import Image from 'next/image'

import CloudPractitioner from '../public/aws-certified-cloud-practitioner.png'
import Widget from '../components/Widget'
import GlassButton from '../components/GlassButton'
import hex_inverse_bw from '../lib/InvHexColor'

async function getBackgroundImageData() {
    const res = await fetch('https://api.unsplash.com/photos/random?topics=wallpapers?orientation=landscape', {
            headers: {
                'Authorization': `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`
            }})

    return await res.json()
}

interface HomeProps {
    backgroundStyle?: any
}

export async function getStaticProps() : Promise<{ props: HomeProps, revalidate: Number }> {
    return {
        props: {
            backgroundStyle: await getBackgroundImageData()
        },
        revalidate: 86400
    }
}

const Home: NextPage = ({ backgroundStyle } : HomeProps) => {
    return (
        <>
        <div style={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${backgroundStyle.urls.full})`,
            zIndex: -1,
            position: 'fixed',
            color: hex_inverse_bw(backgroundStyle.color)
        }} className='vh-100 vw-100'>
            <div className='container-fluid'>
                <small>Photo by &nbsp;
                    <a href={backgroundStyle.links.html} className="text-reset">
                        {backgroundStyle.user.name}
                    </a>
                    &nbsp; on Unsplash
                </small>
            </div>
        </div>
            <div style={{color: hex_inverse_bw(backgroundStyle.color)}}  className='container-fluid vh-100 overflow-scroll'>
                <div className='row row-cols-1 row-cols-md-2 h-100'>
                    <div className='col'>
                        <div className='vh-100'>
                            <VCenter>
                                <div className='container'>
                                    <h1 className='display-1' style={{textShadow: '0 0 2em black'}}>Matthew McCall</h1>
                                    <p className='lead'>Always onto something...</p>
                                    <div className="d-flex flex-row flex-wrap">
                                        {
                                            [
                                                {icon: 'linkedin', url: 'https://linkedin.com/in/96d9'},
                                                {icon: 'github', url: 'https://github.com/mxtt-mmxix'},
                                                {icon: 'instagram', url: 'https://instagram.com/__mmccall'},
                                                {icon: 'twitch', url: 'https://twitch.tv/mmapptv'},
                                                {icon: 'twitter', url: 'https://twitter.com/__mmccall'},
                                                {icon: 'youtube', url: 'https://www.youtube.com/channel/UCW_31sZAGpg8DTO_aM09oeQ'},

                                            ].map(social => 
                                                <div key={social.icon} className='me-3 mb-3'>
                                                    <GlassButton  fallbackColor={backgroundStyle.color}>
                                                        <a className="text-reset" href={social.url}>
                                                            <i className={`bi-${social.icon}`} style={{fontSize: '1.5rem'}} />
                                                        </a>
                                                    </GlassButton>
                                                </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </VCenter>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='container'>
                            <div className='my-3'>
                                <Widget fallbackColor={backgroundStyle.color}>
                                    <h3>About Me</h3>
                                    <hr />
                                    <ul>
                                        <li>🤖 FRC 5599 BNCHS Sentinels</li>
                                        <li>⚙️ C++ Game Engine Developer</li>
                                        <li>☁️ AWS Certified Cloud Practitioner</li>
                                    </ul>
                                </Widget>
                            </div>
                            <Widget fallbackColor={backgroundStyle.color}>
                                <h3>Certifications</h3>
                                <hr />
                                <div className='d-flex flex-row'>
                                    <div className='col-6 col-md-3 rounded-4 p-3' style={{background: 'rgba(255, 255, 255, 0.2)'}}>
                                        <Image src={CloudPractitioner} alt='AWS Certified Cloud Practitioner' />
                                        <div className='text-center'>AWS Certified Cloud Practitioner</div>
                                    </div>
                                </div>
                            </Widget>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
