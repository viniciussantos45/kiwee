export function actionToClassName(consumer: string, action: string) {
  const className = `${consumer}_${action}`
    .replaceAll(/[^a-zA-Z0-9]+(.)/g, (match, chr) =>
      chr ? chr.toUpperCase() : ""
    )
    .replaceAll(/\./g, "");

  return className.charAt(0).toUpperCase() + className.slice(1);
}

export function actionToKebabCase(action: string) {
  return action
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();
}
