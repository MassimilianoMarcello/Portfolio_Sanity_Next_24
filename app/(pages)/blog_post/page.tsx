// app/(pages)/blog_post/page.tsx
// Server Component
import { getPosts } from '@/sanity/sanity.query';
import { Post } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';
import styles from './blog.module.scss';

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return (
    <div className={styles.blogContainer}>
      <header className={styles.blogHeader}>
        <span className={styles.headerKicker}>Writing</span>
        <h1 className={styles.blogTitle}>Blog</h1>
        <p className={styles.blogSubtitle}>
          Thoughts on code, design, and the things built in between.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet. Check back soon.</p>
      ) : (
        <ul className={styles.postList}>
          {posts.map((post, i) => (
            <li key={post._id} className={styles.postItem}>
              <Link href={`/blog_post/${post.slug}`} className={styles.postLink}>
                <span className={styles.postIndex}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {post.coverImage?.url && (
                  <div className={styles.postThumb}>
                    <Image
                      src={post.coverImage.url}
                      alt={post.coverImage.alt || post.title}
                      fill
                      sizes="120px"
                      className={styles.postThumbImg}
                    />
                  </div>
                )}

                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    {post.publishedAt && (
                      <time className={styles.postDate} dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day:   'numeric',
                          month: 'short',
                          year:  'numeric',
                        })}
                      </time>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className={styles.postTags}>
                        {post.tags.map(tag => (
                          <span key={tag._id} className={styles.postTag}>
                            {tag.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  {post.excerpt && (
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                  )}
                  <span className={styles.postReadMore}>
                    Read
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}