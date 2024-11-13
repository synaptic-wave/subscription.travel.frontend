function calculateDimensions(aspectRatio, maxWidth, maxHeight) {
  let width, height

  if (aspectRatio > 1) {
    // Width is greater than height (e.g., 1.53:1)
    if (maxWidth / aspectRatio <= maxHeight) {
      // Width is the limiting factor
      width = maxWidth
      height = maxWidth / aspectRatio
    } else {
      // Height is the limiting factor
      height = maxHeight
      width = maxHeight * aspectRatio
    }
  } else {
    // Height is greater than width (e.g., 1:1.53)
    const inverseAspectRatio = 1 / aspectRatio
    if (maxHeight / inverseAspectRatio <= maxWidth) {
      // Height is the limiting factor
      height = maxHeight
      width = maxHeight / inverseAspectRatio
    } else {
      // Width is the limiting factor
      width = maxWidth
      height = maxWidth * inverseAspectRatio
    }
  }

  return { width, height }
}

export default calculateDimensions
