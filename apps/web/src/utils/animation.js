export const getFadeOutAndSlideKeyframes = (toLeft) => {
  if (typeof toLeft === "boolean") {
    return [
      { opacity: 1, transform: "translateX(0)", offset: 0 },
      { opacity: 0, transform: toLeft ? "translateX(-4rem)" : "translateX(4rem)", offset: 1 }
    ];
  } else {
    throw new Error("The to left parameter must be a boolean");
  }
}

export const getFadeInAndSlideKeyframes = (toLeft) => {
  if (typeof toLeft === "boolean") {
    return [
      { opacity: 0, transform: toLeft ? "translateX(4rem)" : "translateX(-4rem)", offset: 0 },
      { opacity: 1, transform: "translateX(0)", offset: 1 }
    ];
  } else {
    throw new Error("The to left parameter must be a boolean");
  }
}

export const fadeOutAndSlideY = [
  { opacity: 1, transform: "translateY(0)", offset: 0 },
  { opacity: 0, transform: "translateY(-1rem)", offset: 1 }
];

export const fadeInAndSlideY = [
  { opacity: 0, transform: "translateY(1rem)", offset: 0 },
  { opacity: 1, transform: "translateY(0)", offset: 1 }
];

export const getFadeAndSlideTiming = (duration) => {
  if (typeof duration === "number") {
    return {
      duration: duration,
      easing: "ease-in-out",
    }
  } else {
    throw new Error("The duration is not a number");
  }
}

export const pulseKeyframes = [
  { transform: "scale(1)", offset: 0 },
  { transform: "scale(1.5)", offset: 0.14 },
  { transform: "scale(1)", offset: 0.28 },
  { transform: "scale(1.5)", offset: 0.42 },
  { transform: "scale(1)", offset: 0.7 },
];

export const pulseTiming = {
  duration: 1000,
};