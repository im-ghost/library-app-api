# The Author Schema

## The author model
```javascript
  name: {
    type: String
  },
  ownerId:{
    type: String
  },
  booksIds: {
    type: Array
  },
  DOB:{
    type:Date
},
  DOD:{
    type:Date
}
  ```
### View a author
 To get all the authors in the db
```javascript
{
  authors{
    name,
    _id
  }
}
```
#### To get a single author 
```javascript
{
  author(_id:""){
    name,
    _id
    //etc.
  }
}
```
### Create a Author
To create a author,all fields are required including a user's token except the DOB

```javascript
mutation{
  addAuthor(name:"test"/*etc*/){
    name,
    authorId{
      name
    }
  }
}
```

### Update a author
To update a author the author id and a user login token is required, then any part of the user object that needs to be updated,if no update is done,it returns the original state of the author
```javascript
mutation{
  UpdateAuthor(_id:"",content:"tiff",token:""){
    name,
    content
  }
}
```


### Delete a Author
To delete a author only the author id and a user's token is required

```javascript
mutation{
  delAuthor(_id:"",token:""){
    
  }
}
```
#### Go to other Schemas


##### [The Home page](./index.md)
##### [The Genre's Schema](./genre.md)
##### [The Book's Schema](./book.md)