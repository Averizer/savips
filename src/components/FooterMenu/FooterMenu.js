import React from 'react'
import UserImage from '../../assets/png/userblack.png'
import { Icon, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../utils/firebase'
import 'firebase/auth'
import './FooterMenu.scss'

function FooterMenu(props) {
  const { user } = props
  const logout = () => {
    firebase.auth().signOut()
  }
  return (
    <div className="footer">
      <table>
        <tr>
          <div className="footer__imagen">
            <Image src={user.photoURL ? user.photoURL : UserImage} />
          </div>
        </tr>
        <tr>
          <div className="footer__nombre-icono">
            <td>
              <Link to="/settings">{user.displayName}</Link>
            </td>
            <td>
              <Icon name="power off" onClick={logout} />
            </td>
          </div>
        </tr>
      </table>
    </div>
  )
}

export default withRouter(FooterMenu)
