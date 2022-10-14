var {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} = require('graphql');
const jwt= require('jsonwebtoken')
var Book = require("./models/book");
var Genre = require("./models/genre");
var Author = require("./models/author");
var User = require("./models/user")
const {
  createBook
} = require("./controllers/book.js")
const {} = require("@/controllers/author.js")
const {} = require("@/controllers/user.js")
const {} = require("@/controllers/genre.js")
const ensureAuth = require("./middlewares/authMiddleware.js");
const authorType = new GraphQLObjectType({
  name: 'author',
  fields: ()=>({
    name: {
      type: GraphQLString
    },
    ownerId: {
      type: GraphQLString
    },
    
    DOB: {
      type: GraphQLString
   
    },
    DOD: {
      type: GraphQLString
    },
    booksIds: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return Book.find({authorId:parent._id})
      }
    },
    _id: {
      type: GraphQLID
    },
  })
})
const userType = new GraphQLObjectType({
  name: 'user',
  fields: ()=>({
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    token:{
      type:GraphQLString
    },
    password: {
      type: GraphQLString
   
    },
    stars: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return Book.find({authorId:parent._id})
      }
    },
    _id: {
      type: GraphQLID
    },
  })
})
const genreType = new GraphQLObjectType({
  name: 'genre',
  fields: ()=>({
    name: {
      type: GraphQLString
    },
     ownerId: {
      type: GraphQLString
    },
    booksIds: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return Book.find({
          genreId: parent._id
        })
      }
    },
    _id: {
      type: GraphQLID
    },
  })
})
const bookType = new GraphQLObjectType({
  name: 'book',
  fields: ()=>({
    name: {
      type: GraphQLString
    },
    authorId: {
      type: authorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)
      }
    },
    _id: {
      type: GraphQLID
    },
    genreId: {
      type:genreType,
      resolve(parent, args) {
        return Genre.findById(parent.genreId)
      }
    },
    DOB: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    }
  })
})
const Mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    addBook: {
      type: bookType,
      args: {
        name: {
          type: GraphQLString
        },
        authorId: {
          type: GraphQLID
        },
        content: {
          type: GraphQLString
        },
        genreId: {
          type: GraphQLID
        },
        token:{
          type:GraphQLString
        }
      },
     async resolve(parent, args) {
       return ensureAuth(createBook,args,args.token)
      
      }
    },
    addGenre: {
      type: genreType,
      args: {
        name: {
          type: GraphQLString
        },
 ownerId: {
      type: GraphQLString
    },
    token:{
      type:GraphQLString
    }
      },
      resolve(parent, args) {
      const addGenreFn = () =>{  let genre = new Genre({
          name: args.name,
          books: [],
          ownerId:args.ownerId
        })
        return genre.save()
      }
     return ensureAuth(addGenreFn,null,args.token)
      }
    },
    addAuthor: {
      type: authorType,
      args: {
        name: {
          type: GraphQLString
        },
        DOD: {
          type: GraphQLString
        },
        DOB: {
          type: GraphQLString
        },
         ownerId: {
      type: GraphQLString
    },
    token:{
      type:GraphQLString
    }
      },
      resolve(parent, args) {
       const AuthorFn = ()=>{
         let author = new Author({
          name: args.name,
          booksIds: [],
          DOD: args.DOD,
          DOB: args.DOB,
          ownerId:args.ownerId
        })
        return author.save()
      }
      return ensureAuth(AuthorFn,null,args.token)
      }
    },
    addUser: {
      type: userType,
      args: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          stars: [],
          email: args.email,
          password: args.password,
        
        })
        const id = user._id;
        user.token =  jwt.sign({id }, "secret ", {
    expiresIn: '30d',
  })
        return user.save()
      }
    },
    loginUser: {
      type: userType,
      args: {
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
     async resolve(parent, args) {
        const fn =async () =>{
          
       const user = await User.findOne({email:args.email});
       //,(err,user)=>{
          if(!user){
             
         throw new Error("User not found")
       
          }
          if(user){
           // console.log(user)
          if(user.password===args.password){
         //   console.log(user.password)
           // console.log(args.password)
            const id= user._id;
            user.token =  jwt.sign({ id }, "secret ", {
    expiresIn: '30d',
  })
            return user
          }
          else{
     
           // console.log(args.password)
            throw new Error("incorrect password ")
          } 
          }

       
        }
        const ff = () => fn().
        then((user)=>{
      //  console.log(user)
       return user
        })
        return ff()
      }
    },
    delBook:{
      type:bookType,
      args:{
        _id:{
          type:GraphQLString
},token:{
  type:GraphQLString
}},
      async resolve(parent,args){
       let delB = async ()=>{ await Book.findByIdAndRemove(args._id)
         return Book.find({})
}
     return  ensureAuth(delB, null,args.token)
       
      }
    },
    delGenre:{
      type: genreType,
      args:{_id:{type:GraphQLString},token:{
  type:GraphQLString
}},
      async resolve(parent,args){
       const delG =async () =>{ await Genre.findByIdAndRemove(args._id)
         return Genre.find({})
       }
       return ensureAuth(delG,null,args.token)
      }
    },
    delAuthor:{
      type: authorType,
      args:{_id:{type:GraphQLString},token:{
  type:GraphQLString
}},
      async resolve(parent,args){
       const delA =async () =>{
         await Author.findByIdAndRemove(args._id)
         return Author.find({})
       }
       return ensureAuth(delA,null,args.token)
      }
    },
    delUser:{
      type: userType,
      args:{
        _id:{
          type:GraphQLString
},token:{
  type:GraphQLString
}
        
      },
      async resolve(parent,args){
     const delU =async () =>{
       
      await User.findByIdAndRemove(args._id)
         return User.find({})
      }
      return ensureAuth(delU,null,args.token)
    }
    },
  },

});
const RootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    book: {
      type: bookType,
      args: {
        _id: {
          type: GraphQLID
        }},
      resolve(parent,
        args) {
          return Book.findById(args._id)
        }
    },
    author: {
      type: authorType,
      args: {
        _id: {
          type: GraphQLID
        }},
      resolve(parent,
        args) {
          return Author.findById(args._id)
        }
    },
    user: {
      type: userType,
      args: {
        _id: {
          type: GraphQLID
        }},
      resolve(parent,
        args) {
          return User.findById(args._id)
        }
    },
    genre: {
      type: genreType,
      args: {
        _id: {
          type: GraphQLID
        }},
      resolve(parent,
        args) {
          return Genre.findById(args._id)
        }
    },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent,
        args) {
          return Book.find({})
        }
    },
    authors: {
      type: new GraphQLList(authorType),
      resolve(parent,
        args) {
          return Author.find({})
        }
    },
    users: {
      type: new GraphQLList(userType),
      args:{
        token:{
  type:GraphQLString
}
      },
      resolve(parent,
        args) {
          const allU = async()=> await User.find({})
          return ensureAuth(allU,null,args.token)
        }
    },
    genres: {
      type: new GraphQLList(authorType),
      resolve(parent,
        args) {
          return Genre.find({})
        }
    },
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})