'use client';

import style from "./singleProject.module.scss";

type ChallengeProps = {
  challengeId: string ;
  title: string;
};

const ChallengeLink = ({ challengeId, title }: ChallengeProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(challengeId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <li className={style.challengeListItem}>
      <a href={`#${challengeId}`} onClick={handleClick}>
        {title}
      </a>
    </li>
  );
};

export default ChallengeLink;
