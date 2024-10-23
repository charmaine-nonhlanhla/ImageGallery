import axios, { AxiosError, AxiosResponse } from "axios";
import { User, UserFormValues } from "../layout/models/user";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { Profile } from "../layout/models/profile";
import { Category } from "../layout/models/category";
import { Photo } from "../layout/models/photo";
import { PaginatedResult } from "../layout/models/pagination";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method == "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers["www-authenticate"]?.startsWith('Bearer error="invalid_token')
        ) {
          store.userStore.logout();
          toast.error("Session expired - please login again");
        } else {
          toast.error("unauthorized");
        }
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<User>("/account"),
  forgotPassword: (user: UserFormValues) =>
    requests.post<User>("/account/forgotPassword", user),
  resetPassword: (user: UserFormValues) =>
    requests.post<User>("/account/resetPassword", user),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
  refreshToken: () => requests.post<User>("/account/refreshToken", {}),
  fbLogin: (accessToken: string) =>
    requests.post<User>(`/account/fbLogin?accessToken=${accessToken}`, {}),
  verifyEmail: (token: string, email: string) =>
    requests.post<void>(
      `account/verifyEmail?token=${token}&email=${email}`,
      {}
    ),
  resendEmailConfirm: (email: string) =>
    requests.get(`/account/resendEmailConfirmationLink?email=${email}`),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (
    file: Blob,
    photoTitle?: string,
    categoryId?: number,
    photoDescription?: string
  ) => {
    let formData = new FormData();
    formData.append("File", file);

    if (photoTitle) {
      formData.append("PhotoTitle", photoTitle);
    }
    if (categoryId !== undefined) {
      formData.append("CategoryId", categoryId.toString());
    }
    if (photoDescription) {
      formData.append("PhotoDescription", photoDescription);
    }
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  updateFollowing: (username: string) =>
    requests.post(`/follow/${username}`, {}),
  updateProfile: (profile: Partial<Profile>) =>
    requests.put(`profiles`, profile),
  listFollowings: (username: string, predicate: string) =>
    requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
};

const Photos = {
  listByUser: (username: string, params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Photo[]>>(`/photos/${username}`, { params })
      .then(responseBody),
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Photo[]>>(`photos`, { params })
      .then(responseBody),
};

const Categories = {
  list: () => requests.get<Category[]>("/categories"),
};

const agent = {
  Account,
  Photos,
  Profiles,
  Categories,
};

export default agent;
