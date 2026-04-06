export function PremiumBackground() {
  return (
    <div className="premium-background" aria-hidden="true">
      <div className="premium-background__base" />
      <div className="premium-background__glows">
        <span className="premium-background__blob premium-background__blob--violet" />
        <span className="premium-background__blob premium-background__blob--indigo" />
        <span className="premium-background__blob premium-background__blob--cyan" />
        <span className="premium-background__blob premium-background__blob--pink" />
      </div>
      <div className="premium-background__grain" />
    </div>
  );
}
