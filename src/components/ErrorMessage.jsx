function ErrorMessage({ title, message, onRetry }) {
  return (
    <section className="state-card state-card-error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry ? (
        <button className="secondary-button" onClick={onRetry} type="button">
          Try again
        </button>
      ) : null}
    </section>
  )
}

export default ErrorMessage
