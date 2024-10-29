export function actionToClassName(consumer: string, action: string) {
  return `${consumer}_${action}`
    .replaceAll(/[^a-zA-Z0-9]+(.)/g, (match, chr) =>
      chr ? chr.toUpperCase() : ""
    )
    .replaceAll(/\./g, "");
}

export function actionToKebabCase(action: string) {
  return action
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();
}
