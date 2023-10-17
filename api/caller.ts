import { actions, HttpMethod } from './fetch-formatter'

enum RequestUrl {
	BLOG = 'blog',
	TAG = 'tag',
	PORTFOLIO = 'portfolio',
}

export type Tag = {
	id: number,
	name: string,
};

export type Post = {
	id: number,
	title: string,
	content: string,
	thumbnailUrl: string,
	tags: Tag[],
	createdDate: string,
};

export type CreatePost = {
	title: string,
	content: string,
	thumbnailUrl: string,
	tagIds: number[],
}

export type Portfolio = {
	id: number,
	title: string,
	content: string,
	thumbnailUrl: string,
	createdDate: string,
	modifiedDate: string,
}

export type CreatePortfolio = {
	title: string,
	content: string,
	thumbnailUrl: string,
}

export const fetchBlogs = async (): Promise<Post[]> => {
	return actions(RequestUrl.BLOG, HttpMethod.GET, null);
}

export const fetchBlog = async (id: number): Promise<Post> => {
	return actions(`${RequestUrl.BLOG}/${id}`, HttpMethod.GET, null);
}

export const fetchCreateBlog = async (request: CreatePost): Promise<Post> => {
	return actions(RequestUrl.BLOG, HttpMethod.POST, request);
}

export const fetchUpdateBlog = async (id: number, request: CreatePost): Promise<Post> => {
	return actions(`${RequestUrl.BLOG}/${id}`, HttpMethod.PATCH, request);
}

export const fetchDeleteBlog = async (id: number) => {
	return actions(`${RequestUrl.BLOG}/${id}`, HttpMethod.DELETE,  null);
}

export const fetchTags = async (): Promise<Tag[]> => {
	return actions(RequestUrl.TAG, HttpMethod.GET, null);
}

export const fetchPortfolios = async (): Promise<Portfolio[]> => {
	return actions(RequestUrl.PORTFOLIO, HttpMethod.GET, null);
}

export const fetchPortfolio = async (id: number): Promise<Portfolio> => {
	return actions(`${RequestUrl.PORTFOLIO}/${id}`, HttpMethod.GET, null);
}

export const fetchCreatePortfolio = async (request: CreatePortfolio): Promise<Portfolio> => {
	return actions(RequestUrl.PORTFOLIO, HttpMethod.POST, request);
}

export const fetchUpdatePortfolio = async (id: number, request: CreatePortfolio): Promise<Portfolio> => {
	return actions(`${RequestUrl.PORTFOLIO}/${id}`, HttpMethod.PATCH, request);
}

export const fetchDeletePortfolio = async (id: number) => {
	return actions(`${RequestUrl.PORTFOLIO}/${id}`, HttpMethod.DELETE,  null);
}
