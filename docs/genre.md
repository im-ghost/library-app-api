# The Genre Schema

## The genre model
```javascript
  name: {
    type: String
  },
  ownerId:{
    type: String
  },
  booksIds: {
    type: Array
  }
  ```
### View a genre
 To get all the genres in the db
```javascript
{
  genres{
    name,
    _id
  }
}
```
#### To get a single genre 
```javascript
{
  genre(_id:""){
    name,
    _id
    //etc.
  }
}
```
### Create a Genre
To create a genre,all fields are required including a user's token except the DOB

```javascript
mutation{
  addGenre(name:"test"/*etc*/){
    name,
    genreId{
      name
    }
  }
}
```

### Update a genre
To update a genre the genre id and a user login token is required, then any part of the user object that needs to be updated,if no update is done,it returns the original state of the genre
```javascript
mutation{
  UpdateGenre(_id:"",content:"tiff",token:""){
    name,
    content
  }
}
```


### Delete a Genre
To delete a genre only the genre id and a user's token is required

```javascript
mutation{
  delGenre(_id:"",token:""){
    
  }
}
```
#### Go to other Schema's


##### [The Home page](./index.md)
##### [The Author's Schema](./author.md)
##### [The Book's Schema](./book.md)