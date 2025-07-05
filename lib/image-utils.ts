export const findClosestAspectRatio = async (
  imageUrl: string
): Promise<string> => {
  const availableRatios = [
    { name: "21:9", value: 21 / 9 },
    { name: "16:9", value: 16 / 9 },
    { name: "4:3", value: 4 / 3 },
    { name: "1:1", value: 1 },
    { name: "3:4", value: 3 / 4 },
    { name: "9:16", value: 9 / 16 },
    { name: "9:21", value: 9 / 21 },
  ];

  try {
    const getDimensions = (): Promise<{ width: number; height: number }> =>
      new Promise((resolve, reject) => {
        // This code runs on the client, so `window.Image` is available.
        const img = new window.Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = (err) => reject(err);
        img.src = imageUrl;
      });

    const { width, height } = await getDimensions();
    const imageRatio = width / height;

    const closestRatio = availableRatios.reduce((prev, curr) =>
      Math.abs(curr.value - imageRatio) < Math.abs(prev.value - imageRatio)
        ? curr
        : prev
    );

    return closestRatio.name;
  } catch (e) {
    console.error("Failed to calculate aspect ratio, defaulting to 16:9", e);
    // Return a sensible default if calculation fails.
    return "16:9";
  }
};
