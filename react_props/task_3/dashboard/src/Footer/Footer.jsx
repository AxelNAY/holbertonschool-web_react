import './Footer.css'
import { getCurrentYear, getFooterCopy } from '../utils/utils.js'

function Footer() {
  return (
    <div className="Footer">
      <p>Copyright { getCurrentYear() } - { getFooterCopy(true) }</p>
    </div>
  )
}

export default Footer
