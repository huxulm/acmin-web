"use client";
import AuthService from "@/services/AuthService";
import { useState, useEffect } from "react";

const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export default function useUserQuery() {
  // const [user, setUser] = useState<any>();
  // const [status, setStatus] = useState(STATUS.LOADING);
  // useEffect(() => {
  //   setStatus(STATUS.LOADING);

  //   AuthService.retriveUser()
  //     .then((user) => {
  //       console.log(user);
  //       setUser(user);
  //       setStatus(STATUS.SUCCESS);
  //     })
  //     .catch((err) => {
  //       setStatus(STATUS.ERROR);
  //     });
  // }, []);
  return {
    // loading: status === STATUS.LOADING,
    // error: status === STATUS.ERROR,
    // data: user,
  };
}
