require("dotenv").config()
const { UserInputError } = require("apollo-server")
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        const books = await Book.aggregate([
          {
            $redact: {
              $cond: [
                {
                  $or: [{ $in: [args.genre, "$genres"] }, !args.genre],
                },
                "$$KEEP",
                "$$PRUNE",
              ],
            },
          },
          {
            $lookup: {
              from: Author.collection.name,
              localField: "author",
              foreignField: "_id",
              as: "author",
            },
          },
          { $unwind: "$author" },
          {
            $redact: {
              $cond: [
                {
                  $or: [{ $eq: [args.author, "$author.name"] }, !args.author],
                },
                "$$KEEP",
                "$$PRUNE",
              ],
            },
          },
          {
            $addFields: {
              id: { $toObjectId: "$_id" },
            },
          }
        ])
        return books
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      },
    },
    Author: {
      bookCount: async (root, args) => {
        const count = await Book.aggregate([
          {
            $lookup: {
              from: Author.collection.name,
              localField: "author",
              foreignField: "_id",
              as: "author",
            },
          },
          { $unwind: "$author" },
          {
            $match: {
              "author.name": root.name,
            },
          },
          {
            $count: "bookCount",
          },
        ])
        return count[0].bookCount
      },
    },
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
  
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          try {
            author = await newAuthor.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }
        const book = new Book({ ...args, author: author })
        try {
          book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish("BOOK_ADDED", {bookAdded: book})
        
        return book
      },
      editAuthor: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
  
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        try {
          return user.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if (!user || args.password !== "secret") {
          throw new UserInputError("wrong credentials")
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
        }
    }
  }
  
module.exports = resolvers