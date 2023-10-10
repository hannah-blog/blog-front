import { actions, HttpMethod } from './fetch-formatter'

enum RequestUrl {
	BLOG = 'blog',
	TAG = 'tag',
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
