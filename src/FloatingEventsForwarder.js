export default function FloatingEventsForwarder() {
  const forward = (e) => {
    const canvas = document.querySelector(".floating-lines-container canvas");
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ev = new MouseEvent("pointermove", {
      clientX: e.clientX - rect.left,
      clientY: e.clientY - rect.top,
      bubbles: true,
    });

    canvas.dispatchEvent(ev);
  };

  return (
    <div
      onMouseMove={forward}
      className="floating-events-forwarder"
    />
  );
}
