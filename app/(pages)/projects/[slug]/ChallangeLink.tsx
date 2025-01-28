'use client';

import style from "./singleProject.module.scss";

type ChallengeProps = {
  challengeId: string;
  title: string;
};

const ChallengeLink = ({ challengeId, title }: ChallengeProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(challengeId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <li className={style.challengeListItem}>
      <a href={`#${challengeId}`} onClick={handleClick}>
        {title}
      </a>
      {/* Pulsante Back to Top sempre visibile */}

    </li>
  );
};

export default ChallengeLink;


