export const customModalStyle = {
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "min(90vw, 400px)", // Responsive width: max width 400px, but no more than 90% of viewport width
    maxHeight: "90vh",         // Make sure the modal doesn't exceed 90% of the viewport height
    padding: "20px",
    overflowY: "auto",         // Ensure the content is scrollable if it overflows vertically
    borderRadius: "16px",
    scrollbarWidth: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for better visibility
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
