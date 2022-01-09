import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const visible = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const disabled = {
    display: null
  }

  const style = props.notification ? visible : null
  const text = props.notification ? props.notification[0] : ""

  return <div style={style}>{text}</div>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
