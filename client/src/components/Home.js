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
                    <div style={{width: '40%'}}>
                        <img src='https://www.dalat.org/web/wp-content/uploads/2018/04/re-CalendarHeader.jpg' style={{width: '100%'}}></img>
                    </div>
                    <div style={{width: '50%'}} className='textBox'>
                        <h1>Events With A Purpose</h1>
                        <span className='subText'>
                        Create events that channel your societal passions and drives for change as you united kindred spirits under your cause.
                        </span>
                    
                    </div>
                
                </div>
                <div className="about-section light">
                    <div style={{width: '50%'}} className='textBox'>
                        <h1>Make Expression Your Profession</h1>
                        <span className='subText'>
                        Customize your profile and events with images that you think best reflect the mood and tone you are going for.
                        </span>
                    
                    </div>
                    <div style={{width: '40%'}}>
                        <img src='https://www.lovingly.com/wp-content/uploads/2020/05/AdobeStock_224192267-912x1024.jpeg' style={{width: '100%', height: '100%', objectFit: 'cover'}}></img>
                    </div>
                </div>
                <div className="about-section dark">
                <div style={{width: '40%'}}>
                        <img src='https://images.ctfassets.net/n1no4gieqp7s/7El2NZYDUtWhqUyIHeTsAo/0e9d8e9d846cb86e1d6347daa3001063/questions-to-ask-neighborhoods-OG.png?w=1440&q=50' style={{width: '100%', height: '100%', objectFit: 'cover'}}></img>
                    </div>
                    <div style={{width: '50%'}} className='textBox'>
                        <h1>Do Good In Your Neighborhood</h1>
                        <span className='subText'>
                        Find events created by changemakers like yourself that are based in zip codes within 10 miles of your own
                        </span>
                    
                    </div>
                </div>
            </section>

            <style jsx>{`
                .top-level {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    
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
                    display: flex;
                    justify-content: space-evenly
                    
                }
                .light {
                    background-color: white;
                    color: black;
                }
                .dark {
                    background-color: #97C4B8;
                    color: #e9f9f8;
                }
                .textBox {
                    display: flex;
                    flex-direction: column;
                    
                    justify-content: center;
                }
                .subText {
                    font-family: 'Oswald';
                    font-size: 2em
                }
                h1 {
                    font-size: 3em;
                    margin: 0;
                }
            `}</style>
        </div>
    )
}

export default Home