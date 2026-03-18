// sanity/schemas/post.ts
// PortableText potenziato — ogni blocco può essere:
// testo ricco, immagine con caption, blocco codice

const post = {
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Breve descrizione per liste e anteprime',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    },
    // PortableText potenziato — cuore del blog
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        // Blocco testo standard con marks estesi
        {
          type: 'block',
          styles: [
            { title: 'Normal',     value: 'normal'     },
            { title: 'H2',         value: 'h2'         },
            { title: 'H3',         value: 'h3'         },
            { title: 'H4',         value: 'h4'         },
            { title: 'Quote',      value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold',          value: 'strong' },
              { title: 'Italic',        value: 'em'     },
              { title: 'Inline code',   value: 'code'   },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule: any) =>
                      Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                  },
                ],
              },
            ],
          },
        },

        // Immagine inline con caption opzionale
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },

        // Blocco codice — richiede il plugin @sanity/code-input
        // npm install @sanity/code-input
        {
          type: 'code',
          options: {
            language: 'typescript',
            languageAlternatives: [
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TSX',        value: 'tsx'        },
              { title: 'JSX',        value: 'jsx'        },
              { title: 'CSS',        value: 'css'        },
              { title: 'SCSS',       value: 'scss'       },
              { title: 'Bash',       value: 'bash'       },
              { title: 'JSON',       value: 'json'       },
            ],
            withFilename: false, // non hai il campo filename nello schema
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      title:    'title',
      media:    'coverImage',
      subtitle: 'publishedAt',
    },
  },
};

export default post;