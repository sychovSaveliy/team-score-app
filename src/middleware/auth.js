import { PATH_SIGN_IN } from "@/router";

export default function auth({ next, router }) {
  if (!localStorage.getItem("jwt")) {
    return router.push(PATH_SIGN_IN);
  }

  return next();
}
