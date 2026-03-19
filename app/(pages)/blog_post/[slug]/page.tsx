// app/(pages)/blog_post/[slug]/page.tsx
import { getPost } from '@/sanity/sanity.query';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../blog.module.scss';
import { blogPortableTextComponents, slugifyHeading } from '../blogPortableTextComponents';
import TableOfContents, { type TocItem } from './TableOfContents';

type Props = {
  params: Promise<{ slug: string }>;
};

// ─── Extract TOC items from Portable Text blocks (server-side) ───────────────
function extractTocItems(content: any[]): TocItem[] {
  if (!Array.isArray(content)) return [];
  return content.reduce<TocItem[]>((acc, block) => {
    if (block._type !== 'block') return acc;
    if (block.style !== 'h2' && block.style !== 'h3') return acc;
    const text = (block.children ?? [])
      .filter((c: any) => c._type === 'span')
      .map((c: any) => c.text ?? '')
      .join('');
    if (!text) return acc;
    acc.push({
      id:    slugifyHeading(text),
      text,
      level: block.style === 'h2' ? 2 : 3,
    });
    return acc;
  }, []);
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <div className={styles.notFound}>Post not found.</div>;
  }

  const tocItems = extractTocItems(post.content);

  return (
    <div className={styles.postContainer}>

      <aside className={styles.postSidebar}>
        <span className={styles.sidebarKicker}>Blog</span>
        <p className={styles.sidebarTitle}>{post.title}</p>

        {/* TOC prima dei tag */}
        {tocItems.length > 0 && (
          <div className={styles.sidebarToc}>
            <TableOfContents items={tocItems} />
          </div>
        )}

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
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M8 5H2M2 5L5 2M2 5L5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All posts
          </Link>
        </div>
      </aside>

      <main className={styles.postMain}>
        <header className={styles.postHeader}>
          <span className={styles.postHeaderKicker}>Article</span>
          <h1 className={styles.postHeadingTitle}>{post.title}</h1>
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

        <article className={styles.postArticle}>
          <PortableText
            value={post.content}
            components={blogPortableTextComponents}
          />
        </article>
      </main>

    </div>
  );
}