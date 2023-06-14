import Notification from "./Notification";

const LoginForm = (
  {notificationMessage, notificationType, onSubmit, username, onChangeUsername, password, onChangePassword }
) => {
  return (
    <div>
      <h2>log in to application</h2>
      {notificationMessage && Notification({message: notificationMessage, type: notificationType})}
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
  )};

export default LoginForm;