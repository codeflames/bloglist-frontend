import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = (
  { notificationMessage, notificationType, onSubmit, username, onChangeUsername, password, onChangePassword }
) => {
  LoginForm.propTypes = {
    notificationMessage: PropTypes.string.isRequired,
    notificationType: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    password: PropTypes.object.isRequired,
    onChangePassword: PropTypes.func.isRequired
  }

  return (
    <div>
      <h2>log in to application</h2>
      {notificationMessage && Notification({ message: notificationMessage, type: notificationType })}
      <form onSubmit={onSubmit}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Email"
            onChange={(e) => onChangeUsername(e.target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password.value}
            name="Password"
            onChange={(e) => onChangePassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )}

export default LoginForm