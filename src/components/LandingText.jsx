import React, { useEffect, useState } from "react"
import { TweenLite, TimelineMax, gsap, Power2 } from "gsap"
import ParrallaxBox from "./ParrallaxBox.jsx"

import "../styles/frontText.scss"
import { useStaticQuery, graphql } from "gatsby"

const ImageFlip = props => {
  const [current, updateCurrent] = useState(0)
  let ref
  let rect
  let lastScroll

  useEffect(() => {
    lastScroll = ref.getBoundingClientRect().y
    window.addEventListener("scroll", () => {
      if (ref != null) {
        rect = ref.getBoundingClientRect()
      } else if (ref === null || rect === undefined) {
        return
      }

      let currentScroll = rect.y
      if (Math.abs(currentScroll - lastScroll) > props.rate * 100) {
        if (current < props.images.length - 1) {
          updateCurrent(current + 1)
        } else {
          updateCurrent(0)
        }
        lastScroll = currentScroll
      }
    })
  })
  return (
    <img
      ref={div => (ref = div)}
      src={props.imgsrc}
      alt="img"
      className={props.className}
    />
  )
}

const Text = () => {
  const data = useStaticQuery(graphql`
      query
      landingText {
        strapiFrontPage {
          LandingText
            secondPhoto {
              publicURL
            }
        }
    strapiAboutPage{
    value1
    value2
    value3
}
  }
  `)
  const landingText = data.strapiFrontPage.LandingText;
  const imgsrc = data.strapiFrontPage.secondPhoto.publicURL;
  let ref
  let one
  let two
  let three
  let animated = false
  let tl = new TimelineMax()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (ref === null) {
        return
      }
      if (ref.getBoundingClientRect().y < window.innerHeight * (2 / 5)) {
        if (animated === false) {
          let items = []
          for (let each of one.childNodes) {
            items.push(each)
          }
          let next = ref.childNodes
          items.push(next[1])
//          items.push(next[2])

          tl.staggerTo(items,1,{
              opacity: 1,
              y: 0,
              rotate: "0deg",
              ease: Power2.easeOut,
            },0.1)

          animated = true
        }
      }
    })
  })
  return (
    <div ref={div => (ref = div)} className="frontText">
      <h1 ref={div => (one = div)}>
        <h1>{data.strapiAboutPage.value1}.</h1>
        <h1>{data.strapiAboutPage.value2}.</h1>
        <h1>{data.strapiAboutPage.value3}.</h1>
      </h1>
      <h2>
        {landingText}
      </h2>
      <div className="box1 imgContainer">
          <ParrallaxBox duration={0.1} speed={0.2} >
            <img src={imgsrc} alt="bugbVintage"/>
          </ParrallaxBox>
        </div>
    </div>
  )
}

export default Text
