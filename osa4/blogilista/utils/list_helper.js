const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((favorite, blog) => {
    return (!favorite || blog.likes > favorite.likes) ? blog : favorite
  })
}

const mostBlogs = blogs => {
  return blogs
    .map(blog => {return { author: blog.author, blogs: 1 }})
    .reduce((list, blog) => {
      const index = list.findIndex(b => b.author === blog.author)
      if (index === -1) return list.concat(blog)
      list[index].blogs++
      return list
    }, [])
    .reduce((most, author) => {return (!most || author.blogs > most.blogs) ? author : most})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}