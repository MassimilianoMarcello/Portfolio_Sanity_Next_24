import React from 'react'
import styles from './RepoAndWebSiteButtons.module.scss'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
    githubUrl: string;
    url: string;
}

const RepoAndWebSiteButtons: React.FC<Project> = (project) => {
    return (
        <div>
            <div className={styles.visitRepoAndWebsiteButtons}>
                <div className={styles.styledButtonGit}>
                    <Link href={project.githubUrl}>GitHub</Link>
                    <Image src="/github.svg" alt="external link" width={28} height={28} />
                </div>
                <div className={styles.styledButtonWebsite}>
                    <Link href={project.url}>
                        Visit Website
                        <Image src="/forward.svg" alt="external link" width={20} height={20} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RepoAndWebSiteButtons