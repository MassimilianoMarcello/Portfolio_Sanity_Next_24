import type { ProjectStatus } from "@/lib/projects";
import styles from "./StatusPill.module.scss";

const LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  wip: "In progress",
  archived: "Archived",
};

export default function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className={styles.pill} data-status={status}>
      <span className={styles.dot} aria-hidden="true" />
      {LABEL[status]}
    </span>
  );
}
