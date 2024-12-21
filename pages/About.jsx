const { useRef, useState } = React
const { Outlet, NavLink } = ReactRouterDOM
// const { PropTypes } = PropTypes

import { utilService } from '../services/util.service.js'
import { AboutTeam } from '../cmps/AboutTeam.jsx'
import { AboutVision } from '../cmps/AboutVision.jsx'

export function About() {
    const titleRef = useRef()
    const count = 1000001

    function onViewMore() {
        alert('curiosity killed the cat')
    }
    return (
        <section className="about">
            <h1 ref={titleRef}>About Todo App...</h1>
            <p>Welcome!
                <br></br>
                In this page you can find some info regarding our vision and team members.
                <br></br>
                Glad you are here!
            </p>
            <button onClick={() => {
                utilService.animateCSS(titleRef.current)
            }}>Animate</button>
                
            <br></br>
            <br></br>

            <nav>
                <NavLink to="/about/team">Team</NavLink> |
                <NavLink to="/about/vision">Vision</NavLink>
            </nav>

            <section>
                <Outlet />
            </section>
                       
            <hr />
            <FancyBox title="Hola!" onClose={() => console.log('ok, closing')}>
                <h3>{count.toLocaleString()} Followers</h3>
                <button onClick={onViewMore}>Tell me More</button>
            </FancyBox>
            <br></br>

            <hr />
            <h3>Click to resize:</h3>
            <SplitPane
                left={
                    <AboutTeam />
                }
                right={
                    <AboutVision />
                }
            />

            <hr />
            {/* <Title  />
            <Title txt="ab"  /> */}
        </section>
    )
}

function FancyBox({title = 'Hello', onClose, children}) {
    return <div className="fancy-box">
        <button style={{ float: 'right' }} onClick={onClose}>x</button>
        <h3>{title}</h3>
        {children}
    </div>
}

FancyBox.propTypes = {
    onClose: PropTypes.func.isRequired
}

function SplitPane(props) {

    const [width, setWidth] = useState(30)

    return (
        <div className="split-pane" style={{
            display: 'flex'
        }}>
            <div style={{ width: width + '%' }} onClick={() => {
                if (width + 10 <= 100) setWidth(width + 10)
            }}>
                {props.left}
            </div>
            <div style={{ flex: 1 }} onClick={() => {
                if (width > 10) setWidth(width - 10)
            }}>
                {props.right}
            </div>
        </div>
    )
}



const Title = (props) => <h1>Title: {props.txt}</h1>

Title.propTypes = {
   txt(props, propName, componentName){
      if(!(propName in props)){
         throw new Error(`missing ${propName}`)
      }
      if(props[propName].length < 6){
         throw new Error(`${propName} was too short`)
      }
   }
}
