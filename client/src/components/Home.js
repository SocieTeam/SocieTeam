import StateContext from './contexts/StateContext'
import { useState, useContext, useEffect } from 'react'

function Home () {

    const { loggedUser, setNavbarLinks } = useContext(StateContext)

    useEffect(() => {
        if (!loggedUser) {
            setNavbarLinks(['login', 'signup'])
        } else {
            setNavbarLinks([])
        }
    }, [loggedUser])

    return (
        <div className="top-level">
            <div className="name-jumbotron">Welcome to SocieTeam</div>
            <section className="about">
                <div className="about-section dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet ante a elementum pretium. Vivamus interdum orci in sem pulvinar lobortis. Donec vel nunc libero. Praesent rhoncus ultrices est, malesuada auctor turpis vestibulum non. Morbi pretium scelerisque orci at imperdiet. Donec maximus lacus ac tellus rutrum imperdiet. Praesent faucibus turpis eu orci cursus, eu dignissim lorem finibus. Donec eleifend ex dolor. Nulla a tellus nec diam tincidunt porttitor. Vivamus id libero sit amet tortor finibus faucibus. Vivamus lacinia sodales imperdiet.
                </div>
                <div className="about-section light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet ante a elementum pretium. Vivamus interdum orci in sem pulvinar lobortis. Donec vel nunc libero. Praesent rhoncus ultrices est, malesuada auctor turpis vestibulum non. Morbi pretium scelerisque orci at imperdiet. Donec maximus lacus ac tellus rutrum imperdiet. Praesent faucibus turpis eu orci cursus, eu dignissim lorem finibus. Donec eleifend ex dolor. Nulla a tellus nec diam tincidunt porttitor. Vivamus id libero sit amet tortor finibus faucibus. Vivamus lacinia sodales imperdiet.
                </div>
                <div className="about-section dark">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet ante a elementum pretium. Vivamus interdum orci in sem pulvinar lobortis. Donec vel nunc libero. Praesent rhoncus ultrices est, malesuada auctor turpis vestibulum non. Morbi pretium scelerisque orci at imperdiet. Donec maximus lacus ac tellus rutrum imperdiet. Praesent faucibus turpis eu orci cursus, eu dignissim lorem finibus. Donec eleifend ex dolor. Nulla a tellus nec diam tincidunt porttitor. Vivamus id libero sit amet tortor finibus faucibus. Vivamus lacinia sodales imperdiet.
                </div>
                <div className="about-section light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet ante a elementum pretium. Vivamus interdum orci in sem pulvinar lobortis. Donec vel nunc libero. Praesent rhoncus ultrices est, malesuada auctor turpis vestibulum non. Morbi pretium scelerisque orci at imperdiet. Donec maximus lacus ac tellus rutrum imperdiet. Praesent faucibus turpis eu orci cursus, eu dignissim lorem finibus. Donec eleifend ex dolor. Nulla a tellus nec diam tincidunt porttitor. Vivamus id libero sit amet tortor finibus faucibus. Vivamus lacinia sodales imperdiet.
                </div>
            </section>

            <style jsx>{`
                .top-level {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    overflow-y: scroll;
                }
                .name-jumbotron {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2em;
                    padding: 1em 0;
                }
                .about {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }
                .about-section {
                    height: 20em;
                    padding: 1.5em;
                }
                .light {
                    background-color: white;
                    color: black;
                }
                .dark {
                    background-color: black;
                    color: white;
                }
            `}</style>
        </div>
    )
}

export default Home