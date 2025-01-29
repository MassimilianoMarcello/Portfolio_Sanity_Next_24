const challenge = {
    name: "challenge",
    title: "Challenge",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string"
      },
      {
        name: "description",
        title: "Description Problem",
        type: "text"
      },
      {
        name: "solution",
        title: "Description Solution",
        type: "text"
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: { source: "title" }
      },

      {
        name: "content",
        title: "Content",
        type: "array",
        of: [
          { type: "block" }, 
          { type: "code" },  
        ],
      }
    ]
  };
  
  export default challenge;
  