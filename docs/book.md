# The Book Schema

## The book model
```javascript
  name: {
    type: String
  },
  authorId: {
    type: String
  },
  genreId: {
    type: String
  },
  DOB: {
    type: Date,
    default:new Date()
  },
  content: {
    type: String
  }
  ```
### View a book
 To get all the books in the db
```javascript
{
  books{
    name,
    _id
  }
}
```
#### To get a single book 
```javascript
{
  book(_id:""){
    name,
    _id
    //etc.
  }
}
```
### Create a Book
To create a book,all fields are required except the DOB

```javascript
mutation{
  addBook(name:"test"/*etc*/){
    name,
    genreId{
      name
    }
  }
}
```

### Update a book
To update a book the book id and a user login token is required, then any part of the user object that needs to be updated,if no update is done,it returns the original state of the book
```javascript
mutation{
  UpdateBook(_id:"",content:"tiff",token:""){
    name,
    content
  }
}
```


### Delete a Book
To delete a book only the book id is required

```javascript
mutation{
  delBook(_id:""){
    
  }
}
```
#### Go to other Schema's


##### [The Home page](./index.md)
##### [The Author's Schema](./author.md)
##### [The Genre's Schema](./genre.md)