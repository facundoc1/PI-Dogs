import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css'

export default function LandingPage(){
  return(
      <Fragment>
          <div className={styles.hero}>
              <h1 className={styles.title}>Welcome to the dog Wiki</h1>
              
              <Link to='/home'>
                  <button className={styles.bubblyButton}>Explore</button>
              </Link>
              
          </div>
      </Fragment>
  )
}