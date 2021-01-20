import React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/blog/"}}
      sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;

interface MarkdownRemarkNode {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    date: Date;
    title: string;
    description: string;
  };
}

interface Props extends PageProps {
  data: {
    allMarkdownRemark: {
      nodes: MarkdownRemarkNode[];
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

// TODO: compact/archive view
const Blog = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post: MarkdownRemarkNode) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    {/* relative link to e.g. /posts/post1-slug/ */}
                    <Link to={`.${post.fields.slug}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export { Blog as default, pageQuery };
