import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({}) => (
  <footer>
    <div>
        <span className="footerCopyrights">
          © 2020 Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </span>
        <span className="footerCopyrights">
          Starter created by <a href="https://radoslawkoziel.pl">panr</a>
        </span>
    </div>
  </footer>
)

Footer.propTypes = {
  copyrights: PropTypes.string,
}

export default Footer
