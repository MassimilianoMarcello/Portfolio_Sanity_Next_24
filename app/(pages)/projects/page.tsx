import { redirect } from "next/navigation";

// /projects non ha contenuto proprio: l'elenco dei progetti vive in home.
export default function MyProjects() {
  redirect("/");
}
