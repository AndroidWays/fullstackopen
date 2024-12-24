const listHelper = require('../utils/list_helper');

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = [];
        const result = listHelper.dummy(blogs);
        expect(result).toBe(1);
    });
});

describe('total likes', () => {
    const listWithOneBlog = [
        { _id: '1', title: 'First Blog', author: 'Author One', likes: 5, __v: 0 }
    ];

    const listWithMultipleBlogs = [
        { _id: '1', title: 'First Blog', author: 'Author One', likes: 5, __v: 0 },
        { _id: '2', title: 'Second Blog', author: 'Author Two', likes: 10, __v: 0 },
        { _id: '3', title: 'Third Blog', author: 'Author One', likes: 15, __v: 0 }
    ];

    const emptyList = [];

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test('when list has multiple blogs, equals the sum of likes', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs);
        expect(result).toBe(30); // 5 + 10 + 15
    });

    test('when list is empty, equals zero', () => {
        const result = listHelper.totalLikes(emptyList);
        expect(result).toBe(0);
    });
});

describe('favorite blog', () => {
    const listWithOneBlog = [
        { _id: '1', title: 'First Blog', author: 'Author One', likes: 5, __v: 0 }
    ];

    const listWithMultipleBlogs = [
        { _id: '1', title: 'First Blog', author: 'Author One', likes: 5, __v: 0 },
        { _id: '2', title: 'Second Blog', author: 'Author Two', likes: 10, __v: 0 },
        { _id: '3', title: 'Third Blog', author: 'Author One', likes: 15, __v: 0 }
    ];

    const emptyList = [];

    test('when list has only one blog, equals that blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toEqual({ title: 'First Blog', author: 'Author One', likes: 5 });
    });

    test('when list has multiple blogs, equals the blog with most likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs);
        expect(result).toEqual({ title: 'Third Blog', author: 'Author One', likes: 15 });
    });

    test('when list is empty, equals null', () => {
        const result = listHelper.favoriteBlog(emptyList);
        expect(result).toBeNull();
    });
});

describe('most blogs', () => {
    const listWithOneBlog = [
        { _id: '1', title: 'First Blog', author: 'Author One', likes: 5, __v: 0 }
    ];

    const listWithMultipleBlogs = [
        { _id: '1', title: 'First Blog', author: 'Author One', likes: 5, __v: 0 },
        { _id: '2', title: 'Second Blog', author: 'Author Two', likes: 10, __v: 0 },
        { _id: '3', title: 'Third Blog', author: 'Author One', likes: 15, __v: 0 }
    ];

    const emptyList = [];

    test('when list has only one blog, equals the author of that blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog);
        expect(result).toEqual({ author: 'Author One', blogs: 1 });
    });

    test('when list has multiple blogs, equals the author with most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs);
        expect(result).toEqual({ author: 'Author One', blogs: 2 });
    });

    test('when list is empty, equals null', () => {
        const result = listHelper.mostBlogs(emptyList);
        expect(result).toBeNull();
    });
});

describe('most likes', () => {
    const listWithOneBlog = [
        { _id: '1', title: 'First Blog', author: 'Author One', likes: 5, __v: 0 }
    ];

    const listWithMultipleBlogs = [
        { _id: '1', title: 'First Blog', author: 'Author One', likes: 5, __v: 0 },
        { _id: '2', title: 'Second Blog', author: 'Author Two', likes: 10, __v: 0 },
        { _id: '3', title: 'Third Blog', author: 'Author One', likes: 15, __v: 0 }
    ];

    const emptyList = [];

    test('when list has only one blog, equals the author of that blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog);
        expect(result).toEqual({ author: 'Author One', likes: 5 });
    });

    test('when list has multiple blogs, equals the author with most likes', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs);
        expect(result).toEqual({ author: 'Author One', likes: 20 }); // 5 + 15
    });

    test('when list is empty, equals null', () => {
        const result = listHelper.mostLikes(emptyList);
        expect(result).toBeNull();
    });
});
