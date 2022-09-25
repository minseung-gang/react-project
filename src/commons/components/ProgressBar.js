const ProgressBar = (props) => {
  const { bgcolor, completed } = props

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "rgba(74,75,81)",
    borderRadius: 5,
    margin: 0,
  }

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    transition: "width 1s ease-in-out",
    borderRadius: "inherit",
    textAlign: "right",
  }

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  )
}

export default ProgressBar
