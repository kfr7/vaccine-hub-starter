import { Link, useNavigate } from "react-router-dom"
import moment from "moment"
import medicalCare from "../../assets/undraw_medical_care_deep_blue.svg"

import "./CancelPortal.css"

export default function CancelPortal({ user, setAppState }) {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(user?.email)

  const handleOnLogout = () => {
    setAppState({})
    navigate("/")
  }

  const title = isAuthenticated ? "Cancelled Successfully" : "Please login to immediately cancel your set appointment. (Log in on different page to see appointment details.)"

  const content = isAuthenticated ? (
    <>
      <p className="apptAndLocation">Your appointment on {moment(new Date(user.date)).format('DD MMMM YYYY')} at <strong>{user.location}</strong> has been cancelled.</p>
    </>
  ) : (
    <p className="appt">Thank you!</p>
  )

  const button = isAuthenticated ? (
    <button className="btn primary" onClick={handleOnLogout}>
      Logout
    </button>
  ) : (
    <Link to="/login">
      <button className="btn primary">Login</button>
    </Link>
  )

  return (
    <div className="CancelPortal">
      <div className="content">
        {isAuthenticated ? <h1>Welcome, {user.firstName}!</h1> : null}

        <div className="card">
          <div className="header">
            <div className={`title ${isAuthenticated ? "green" : ""}`}>{title}</div>
          </div>
          <div className="content">{content}</div>
          <div className="footer">{button}</div>
        </div>
      </div>

      <div className="media">
        <img src={medicalCare} alt="medical care" />
      </div>
    </div>
  )
}
