const NO_REDUCED_MOTION_MQ = "(prefers-reduced-motion: no-preference)";

export const userAllowAnimation = () => {
  const noReducedMotionMQL = window.matchMedia(NO_REDUCED_MOTION_MQ);
  return noReducedMotionMQL.matches;
};