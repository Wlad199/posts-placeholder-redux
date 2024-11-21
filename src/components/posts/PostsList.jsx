import { useDispatch, useSelector } from "react-redux"
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postSlice"
import { useEffect } from "react"
import PostsExcept from "./PostsExcept"


export default function PostsList() {

	const dispatch = useDispatch()
	const posts = useSelector(selectAllPosts)
	const postsStatus = useSelector(getPostsStatus)
	const error = useSelector(getPostsError)

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts())
		}
	}, [postsStatus, dispatch])


	let content
	if (postsStatus === 'loading') {
		content = <p>Loading...</p>
	} else if (postsStatus === 'succeeded') {
		const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
		content = orderedPosts.map(post => (
			<PostsExcept key={post.id} post={post} />
		))
	} else if (postsStatus === 'failed') {
		content = <p>{error}</p>
	}

	return (
		<>
			<h2>Posts</h2>
			{content}
		</>
	)
}