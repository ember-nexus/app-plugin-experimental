const delay = (delayInMilliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));

export { delay };
