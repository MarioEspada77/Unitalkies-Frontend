# README Modulo3
​
# Unitalkies
​
## Description
​
An app that helps students to have all the notes of the university on the same page.
​
## User Stories
​
**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
​
**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
​
**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
​
**Sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
​
**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account
​
**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
​
**Events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
​
**Events create** - As a user I want to create an event so that I can invite others to attend
​
**Events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend
​
**Attend event** - As a user I want to be able to attend to event so that the organizers can count me in
​
**University profile** As a user I want to be able to see the profile of my university and see all the notes.

**Search University** As a user I want be able to search my unversity.

**Post a Publication** As a user I want be able to make a post.

**Like and share Post** As a user I want be able to share or like a post.

**Follow Users** As a user I want be able to follow other users

**
## Backlog
​
List of other features outside of the MVPs scope
​
User profile: - see my profile - upload my profile picture - see other users profile - list of events created by the user - list events the user is attending
​
Geo Location: - add geolocation to events when creating - show event in a map in event detail page - show all events in a map in the event list page
​
Chat between two users 

Chat whit more than two users

Calendar whit next events

Order post by popularity
​
## Routes
​
/ - Page with the main info of the app
/signup - Signup page
/login - Login page
/home - Page with all the post of people I follow and list the popular universities
/profile/:nickname - Page with the info of the user
/profile/update - Update info of the user
/post/:nickname/:id - See detail of post
/post/:id/like - Make a like to the post
/post/:id/share - Share the post whit other users
/post/:id/delete - Delete Post
/post/:id/update - Update the post
/follow/:id - follow user
/unfollow/:id - Unfollow user
/user/block/:id - Block a user
/user/report/:id - Report a user
/event/:id - see ecent in detail
/event/:id/delete - delete event
/event/:id/:update - Update event
/event/:id/follow - Follow the event
/event/:id/Iwillassist - I will assist function
/university/:id/follow - follow a university
​
## Models
​
User model
​
    {
    	username: String
    	password: String
      university: String
      
    }
​
Event model
​
    { 
    	owner: ObjectId<User>
    	name: String
    	description: String
    	date: Date
    	location: String
        Follow: Array
        IWillAssist: Array
 
    
    }
    
    
Post Model 

{
    owner: ObjectId<User>
    text: String
    Likes: array
    share: array
    
}
​
## Links
​
### Git
​
The url to your repository and to your deployed project
​
[Repository Frontend Link](http://github.com/)
​
[Repository Backend Link](http://github.com/)
​
[Deploy Link](http://heroku.com/)
​
### Slides
​
[Slides Link](http://slides.com/)
