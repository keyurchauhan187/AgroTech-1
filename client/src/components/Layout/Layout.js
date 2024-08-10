import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      {/* sco add */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: "Agrotech Solustuon",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Agrotech Solustuon",
};

export default Layout