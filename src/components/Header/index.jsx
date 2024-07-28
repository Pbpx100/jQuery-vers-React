// Header.js
import React from "react"
import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types'
import styles from './header.module.css'

export default function Header({ picture, arrayNav, formatting }) {
    return (
        <header className={`${styles.container__header} ${styles[formatting]}`}>
            <div className="title-logo">

                {picture &&
                    <img className={`${styles.header__logo} ${styles[formatting]}`} src={picture} alt="Logo" />
                }
                <p className={styles.title_logo}>WEALT HEALTH</p>
            </div>
            <nav>
                <ul className={styles.header__nav__ul}>
                    {arrayNav.map((nav, index) => (
                        <li className={`${styles["header__nav__ul--li"]} ${styles[formatting]}`} key={`${index}-${nav.linkNav}`}>
                            <NavLink className={({ isActive }) => (
                                isActive ? styles.navLink_active : styles.link
                            )} to={nav.linkNav}>
                                {nav.titleNav}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

Header.propTypes = {
    picture: PropTypes.string,
    arrayNav: PropTypes.arrayOf(PropTypes.shape({
        linkNav: PropTypes.string.isRequired,
        titleNav: PropTypes.string.isRequired,
    })).isRequired,
    formatting: PropTypes.string,
}