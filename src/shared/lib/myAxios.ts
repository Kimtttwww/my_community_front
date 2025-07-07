import { GuestPath } from "@/entity/guest/model/GuestPath";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface MyAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean
}

let isRefreshing = false;
let failedQueue: {
	resolve: (value?: any) => void,
	reject: (error: any) => void
}[] = [];

const myAxios = axios.create({ withCredentials: true })

myAxios.interceptors.response.use((res) => res, async (error: AxiosError) => {
	// 인터셉터는 비동기성 객체임(해당 axios 인스턴스를 사용하는 모든 요청이 이 인터셉터를 비동기적으로 사용함)
	const originalRequest = error.config as MyAxiosRequestConfig;

	// refresh 요청도 실패한 경우(무한 루프 방지)
	if (originalRequest?.url === GuestPath.REFRESH) {
		gotoLoginPage();
		return Promise.reject(error);
	}

	if (error.response?.status === 403 && !originalRequest._retry) {
		originalRequest._retry = true;

		// 다른 요청이 이미 token 재발급을 받는 중인 경우 queue에 추가만
		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({ resolve, reject });
			}).then(() => myAxios(originalRequest));
		}

		isRefreshing = true;

		try {
			// refresh token으로 access token 재발급
			await myAxios.get(GuestPath.REFRESH);

			// 같은 이유로 실패한 다른 요청들을 새 access token으로 재실행
			processQueue(null);
			return myAxios(originalRequest); // 그리고 자신도 새 access token으로 요청 재실행
		} catch (refreshError) {
			processQueue(refreshError);
			gotoLoginPage();
			return Promise.reject(refreshError);
		} finally {
			isRefreshing = false;
		}
	}

	return Promise.reject(error);
});

function processQueue(error: any = null) {
	failedQueue.forEach(({ resolve, reject }) => {
		error ? reject(error) : resolve();
	});
	failedQueue = [];
}

function gotoLoginPage() {
	if (typeof window !== 'undefined') {
		window.location.href = '/login';
	}
}

export default myAxios;
