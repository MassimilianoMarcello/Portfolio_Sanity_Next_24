// app/(pages)/blog_post/[slug]/page.tsx
import { getPost } from '@/sanity/sanity.query';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../blog.module.scss';
import { blogPortableTextComponents } from '../blogPortableTextComponents';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <div className={styles.notFound}>Post not found.</div>;
  }

  return (
    <div className={styles.postContainer}>

      <aside className={styles.postSidebar}>
        <span className={styles.sidebarKicker}>Blog</span>
        <p className={styles.sidebarTitle}>{post.title}</p>

        {post.tags && post.tags.length > 0 && (
          <div className={styles.sidebarTags}>
            <span className={styles.sidebarTagsLabel}>Tags</span>
            <div className={styles.sidebarTagList}>
              {post.tags.map(tag => (
                <span key={tag._id} className={styles.sidebarTag}>
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {post.publishedAt && (
          <div className={styles.sidebarDate}>
            <span className={styles.sidebarDateLabel}>Published</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                day:   'numeric',
                month: 'long',
                year:  'numeric',
              })}
            </time>
          </div>
        )}

        <div className={styles.sidebarActions}>
          <Link href="/blog_post" className={styles.backLink}>
            ← All posts
          </Link>
        </div>
      </aside>

      <main className={styles.postMain}>
        <header className={styles.postHeader}>
          <span className={styles.postHeaderKicker}>Blog</span>
          <h1 className={styles.postTitle}>{post.title}</h1>
          {post.excerpt && (
            <p className={styles.postHeaderExcerpt}>{post.excerpt}</p>
          )}
          {post.coverImage?.url && (
            <figure className={styles.coverImageWrap}>
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                width={900}
                height={500}
                className={styles.coverImage}
                priority
              />
              {post.coverImage.caption && (
                <figcaption className={styles.coverCaption}>
                  {post.coverImage.caption}
                </figcaption>
              )}
            </figure>
          )}
        </header>

        <article className={styles.postContent}>
          <PortableText
            value={post.content}
            components={blogPortableTextComponents}
          />
        </article>
      </main>

    </div>
  );
}