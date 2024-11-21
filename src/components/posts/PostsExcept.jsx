import TimeAgo from "./TimeAgo"
import PostAuthor from "../users/PostAuthor"
import ReactionButton from "./ReactionButton"


export default function PostsExcept({ post }) {

	const uppercaseFirstLetter = (str) => {
		return str[0].toUpperCase() + str.slice(1)
	}

	const getShort = (str) => {
		if (str.length > 120) {
			return str.substring(0, 120) + '...'
		}
	}

	return (
		<article>
			<h3>{uppercaseFirstLetter(post.title)}</h3>
			<p>{getShort(uppercaseFirstLetter(post.body))}</p>
			<p className="post-info">
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButton post={post} />
		</article>
	)
}