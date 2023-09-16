export default function includesObject(obj, includesKey) {
  const newObj = {};
  Object.keys(user)
    .filter((key) => includesKey.includes(key))
    .forEach((key) => (newObj[key] = obj[key]));
  return newObj;
}
