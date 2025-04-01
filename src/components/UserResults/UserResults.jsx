import "./UserResults.scss";
import axios from "axios";
import { useEffect, useState } from "react";

// we will have recieved the user id in question.
// we need to get the predictions from this user for this specific league
// league will be passed from league standings as well as user ID.

export default function UserResults({ selectedLeague, user }) {
  console.log(user);
  console.log(selectedLeague);
}
