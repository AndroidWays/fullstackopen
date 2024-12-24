const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    };

};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    const authorBlogCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + 1;
        return counts;
    }, {});

    const author = Object.keys(authorBlogCounts).reduce((max, author) => authorBlogCounts[author] > authorBlogCounts[max] ? author : max);

    return {
        author,
        blogs: authorBlogCounts[author]
    };
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;

    const authorLikeCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + blog.likes;
        return counts;
    }, {});

    const author = Object.keys(authorLikeCounts).reduce((max, author) => authorLikeCounts[author] > authorLikeCounts[max] ? author : max);

    return {
        author,
        likes: authorLikeCounts[author]
    };

};

const dummy = (blogs) => 1;

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    dummy
};
