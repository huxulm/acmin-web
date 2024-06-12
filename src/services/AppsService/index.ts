"use client";

import { ApplicationsApi, Configuration } from "@/api";

class AuthService {
  appsAPI: ApplicationsApi;
  conf: Configuration;

  constructor() {
    this.conf = new Configuration({
      basePath: "",
    });
    this.appsAPI = new ApplicationsApi(this.conf);
  }

  page(
    id: string,
    page?: number,
    size?: number,
    includeRoles?: boolean,
    includeMenus?: boolean,
    includeResources?: boolean,
    menuTree?: boolean
  ): Promise<any> {
    return this.appsAPI
      .v1AppsGet(
        id,
        page,
        size,
        includeRoles,
        includeMenus,
        includeResources,
        menuTree
      )
      .then((res) => {
        if (res.status === 200 && res.data && res.data.status == 0) {
          return res.data;
        }
        throw Error(
          `failed get: ${res.statusText} ${res.data ? res.data.msg : ""}`
        );
      })
      .catch((err) => {
        return null;
      });
  }
}

export default new AuthService();
