export default function log({ next, to }) {
  console.log(to.path);

  return next();
}
