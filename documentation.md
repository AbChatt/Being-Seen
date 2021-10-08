## Routes
`/` : This is the homepage of our website. It is shown when you navigate to our website and are not logged in / when you are not authorised.

`/login` : This is the login page, accessed by clicking the login button on the website banner. POST requests are used to transfer informaton
from the frontend to the backend.

`/signup` : This is the signup page, accessed by clicking the signup button on the website banner. It allows you to choose what type of user
you want to login as. Each user type requires different information to be filled, which is represented by using a separate route (`/donor`,
`/merchant` or `/youth`). POST requests are used on this route to transfer information from the frontend to the backend.

`/validate` : We validate each user login using JWT tokens on this route. GET requests are used for sending user tokens and validating them.

`/profile` : This is the profile page for merchants, which they navigate to once they sign up / login. Each merchant gets a personalised profile
page, which they can use to advertise their store. POST requests are used on this route to transfer information from the frontend to the backend.

`/store` : This is the store page, which youth are directed to once they signup / login to the website. Youth can browse various storefronts
to find products that they wish to buy using their credits. POST requests are used on this route to transfer information from the frontend to
the backend.
