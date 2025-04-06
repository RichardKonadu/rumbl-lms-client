# README (for marking purposes)

This app works as a proof of concept and is in good state to carried out a controlled demo, there are still a few unresolved issues, particularly for new users without any data, leagues, or predictions. I’m actively working on fixing these issues. All latest code is on develop branch on both client and server side.

Please note, it is responsive to an extent (everything works, just doesn't look fantastic) but I will be demoing this on mobile on thursday.

## Login Credentials

To evaluate the app's features, please use the following login credentials:

- **Email:** johndoe1@example.com
- **Password:** test

## Current Issues

- **New Users:** There are some issues with new users who don’t have any existing data, leagues, or predictions. At the time of submission, I’m still working on resolving this.
- **Global League Workaround:** To prevent the app from crashing, any user who signs up is automatically added to a global league as a temporary workaround.

## Error Handling

- The app currently handles errors well when the user is not logged in, with proper error catching and display in place.

## Working on

- A more comprehensive external facing README will be provided early next week.
- I want to put some of the repeated functions on the client side into helper files/folders.
- Most game logic is complete but I want to prevent users from joining a league that has already started and either stop users from making a predicition for a week they already have or it to edit their previous predicition.
