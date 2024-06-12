"use client";
import {
  AccountApi,
  Configuration,
} from "@/api";

class AuthService {
  accountAPI: AccountApi;
  conf: Configuration;

  constructor() {
    this.conf = new Configuration({
      basePath: "",
    });
    this.accountAPI = new AccountApi(this.conf);
  }

  _validateStringField(field: string, value: string) {
    if (typeof value !== "string" || !value.trim().length)
      throw Error(`${field} is not valid`);
  }

  _userId(userId: any) {
    if (typeof userId !== "undefined") {
      sessionStorage.setItem("uid", userId);
      return;
    }
    return sessionStorage.getItem("uid");
  }

  _isLogin() {
    // console.log('login invoke: ' + Date.now())
    return !!this._userId(undefined);
  }

  login(name: string, password: string): Promise<any> {
    return Promise.resolve().then(() => {
      this._validateStringField("name", name);
      this._validateStringField("password", password);

      let form = new FormData();
      form.append("username", name);
      form.append("password", password);

      return this.accountAPI
        .v1LoginPost({
          username: name,
          password: password,
        })
        .then((res) => {
          if (res.status === 200 && res.data && res.data.status == 0) {
            return res.data;
          }
          throw Error(
            `failed login: ${res.statusText} ${res.data ? res.data.msg : ""}`
          );
        })
        .then(({ data }) => {
          this._userId(data);
          return true;
        })
        .catch((err) => {
          return false;
        });
    });
  }

  logout(): Promise<any> {
    return Promise.resolve().then(() => {
      return this.accountAPI
        .v1LogoutPost()
        .then((res) => {
          if (res.status === 200) {
            return;
          }
          throw Error(
            `failed logout: ${res.statusText} ${res.data ? res.data.msg : ""}`
          );
        })
        .then(() => {
          this._userId(null);
          sessionStorage.removeItem("uid");
          return true;
        })
        .catch((err) => {
          return false;
        });
    });
  }

  retriveUser(): Promise<any> {
    return this.accountAPI
      .v1CurrentMeGet()
      .then((res) => {
        if (res.status === 200 && res.data && res.data.status == 0) {
            // console.log('fetch ok')
          return res.data;
        }
        throw Error(
          `failed get me: ${res.statusText} ${res.data ? res.data.msg : ""}`
        );
      })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        return null;
      });
  }
  retriveMenus(): Promise<any> {
    return this.accountAPI
      .v1CurrentMenusGet()
      .then((res) => {
        if (res.status === 200 && res.data && res.data.status == 0) {
            // console.log('fetch ok')
          return res.data;
        }
        throw Error(
          `failed get menus: ${res.statusText} ${res.data ? res.data.msg : ""}`
        );
      })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        return null;
      });
  }
}

export default new AuthService();
