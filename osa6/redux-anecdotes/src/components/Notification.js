import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  // const notification = useSelector(state => state.notification)

  const visible = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const disabled = {
    display: null
  }

  const style = props.notification ? visible : disabled

  return <div style={style}>{props.notification}</div>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
