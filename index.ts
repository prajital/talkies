import fs from "fs-extra";
import xml from "xml";
import cheerio from "cheerio";
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
(async function createRssFeed() {
  console.log("creating feed");
  const posts = [
    {
      title: "Post One",
      date: "1/1/2020",
      slug: "post-one",
      content: "This is some content for post one.",
    },
    {
      title: "Post Two",
      date: "1/2/2020",
      slug: "post-two",
      content: "This is some content for post two.",
    },
    {
      title: "Post Three",
      date: "1/3/2020",
      slug: "post-three",
      content: "This is some content for post three.",
    },
    {
      title: "Post Four",
      date: "1/4/2020",
      slug: "post-four",
      content: "This is some content for post four.",
    },
  ];
  const feedObject = {
    rss: [
      {
        _attr: {
          version: "2.0",
          "xmlns:atom": "http://www.w3.org/2005/Atom",
        },
      },
      {
        channel: [
          {
            "atom:link": {
              _attr: {
                href: "http://talkies.online/feed.rss",
                rel: "self",
                type: "application/rss+xml",
              },
            },
          },
          {
            title: "talkies.online",
          },
          {
            link: "http://talkies.online/",
          },
          { description: "Exclusively for movies" },
          { language: "en-US" },
          ...(buildFeed(posts))
        ],
      },
    ],
  };

  const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);

  await fs.writeFile("./feed.rss", feed, "utf8");
})();
function buildFeed(
    posts: { title: string; date: string; slug: string; content: string }[]
  ) {
    const sortedPosts = posts.sort(function (first, second) {
      return new Date(second.date).getTime() - new Date(first.date).getTime();
    });
  
    const feedItems = [];
  
    feedItems.push(
      ...sortedPosts.map(function (post) {
          
        const feedItem = {
          item: [
            { title: post.title },
            {
              pubDate: new Date(post.date as string).toUTCString(),
            },
            {
              guid: [
                { _attr: { isPermaLink: true } },
                `https://talkies.online/${post.slug}/`,
              ],
            },
            {
              description: {
                _cdata: post.content,
              },
            },
          ],
        };
        return feedItem;
      })
    );
  
    return feedItems;
  }
  const getPosts = gql`
  query getPosts {
    posts(first: 10) {
      edges {
        cursor
        node {
        postId
        title
        slug
        link
        date
        excerpt
        content
        slug
        categories {edges{
          node {
          categoryId
          name
         } }
        }
        featuredImage {
          node {
          altText
          sourceUrl
          srcSet
          }
        }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      }
    }
    
  `;